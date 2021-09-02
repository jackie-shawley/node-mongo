exports.insertDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    return coll.insertOne(document); //because we've removed the callback, it will automatically return a promise, so we added the return keyword in front of the method call
};

exports.findDocuments = (db, collection) => {
    const coll = db.collection(collection); 
    return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update }, null);
};

//the update operator is { $set: update } which is an object that MongoDB will see and understand that we want to overwrite information