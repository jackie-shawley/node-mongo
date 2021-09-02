const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations'); //dboper is short for database operations

const url = 'mongodb://localhost:27017/';  //common mongodb protocol 
const dbname = 'nucampsite';

//use the MongoClient.connect method to connect to the MongoDB server
MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
    
    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('campsites') //the result here is what is returned from the previous promise
    .then(result => {
        console.log('Dropped Collection: ', result);
    })
    .catch(err => console.log('No collection to drop')); //this error will not stop the code from running; the code will continue running even if there is an error here

    dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" }, 'campsites')
    .then(result => {
        console.log('Insert Document:', result.ops);

        return dboper.findDocuments(db, 'campsites'); //we want to return a promise here, so we use the return keyword and do not have a callback in the parameter list
    })
    .then(docs => {
        console.log('Found Documents:', docs);

        return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" }, { description: "Updated Test Description" }, 'campsites');
    })
    .then(result => {
        console.log('Updated Document Count: ', result.result.nModified);

        return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
        console.log('Found Documents:', docs);

        return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" }, 'campsites');
    })
    .then(result => {
        console.log('Deleted Document Count:', result.deletedCount);

        return client.close();
    })
    .catch(err => {
        console.log(err);
        client.close();
    });
})
.catch(err => console.log(err));
