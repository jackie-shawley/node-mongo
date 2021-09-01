const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations'); //dboper is short for database operations

const url = 'mongodb://localhost:27017/';  //common mongodb protocol 
const dbname = 'nucampsite';

//use the MongoClient.connect method to connect to the MongoDB server
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);  //allows us to check if the first value is true, the second argument is the second value that we're checking against (are the two values strictly equal?); If the actual and expected arguments match, the code will just continue. If it fails, it will throw an error and terminate the entire application and log the error to the console. 
        //assert is a core method
    console.log('Connected correctly to server');

    const db = client.db(dbname);


    //drop means delete. be careful when using drop, because deleted items can be hard to recover
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" },
            'campsites', result => {
                console.log('Insert Document: ', result.ops);  //this is the callback used in the operations insertDocument method

                dboper.findDocuments(db, 'campsites', docs => {
                    console.log('Found Documents: ', docs);

                    dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" }, 
                        { description: "Updated Test Description" }, 'campsites', 
                        result => {
                            console.log('Updated Document Count: ', result.result.nModified);

                            dboper.findDocuments(db, 'campsites', docs => {
                                console.log('Found Documents: ', docs);

                                dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                                    'campsites', result => {
                                        console.log('Deleted Document Count: ', result.deletedCount);

                                        client.close();
                                    }
                                );
                            });
                        }
                    );
                });
            });
        });
    });


