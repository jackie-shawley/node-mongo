const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';  //common mongodb protocol 
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);  //allows us to check if the first value is true, the second argument is the second value that we're checking against (are the two values strictly equal?); If the actual and expected arguments match, the code will just continue. If it fails, it will throw an error and terminate the entire application and log the error to the console. 

    console.log('Connected correctly to server');

    const db = client.db(dbname);


    //drop means delete. be careful when using drop, because deleted items can be hard to recover
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        const collection = db.collection('campsites');

        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops); //result is a property short for operations, and depending on the method, it will return different values

            //to return all of the documents, give .find and empty parameter list
            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                client.close();
            });
        });
    });
});