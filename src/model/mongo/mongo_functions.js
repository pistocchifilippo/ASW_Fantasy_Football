const mongo_settings = require("./mongo_settings.json")
const { MongoClient } = require("mongodb")
const client = new MongoClient(mongo_settings.mongo_address)

const find_one = async (query,collection) => {
    try {
        await client.connect()
        const database = client.db(mongo_settings.mongo_db)
        const coll = database.collection(collection)
        const x = await coll.findOne(query)
        return x
    } finally {
        await client.close()
    }
}

const insert_one = async (document, collection) => {
    try {
        await client.connect()
        const database = client.db(mongo_settings.mongo_db)
        const coll = database.collection(collection)
        const x = await coll.insertOne(document)
    } finally {
        await client.close()
    }
}

const insert_many = async (document, collection) => {
    try {
        await client.connect()
        const database = client.db(mongo_settings.mongo_db)
        const coll = database.collection(collection)
        const x = await coll.insertMany(document)
    } finally {
        await client.close()
    }
}

exports.find_one = find_one
exports.insert_one = insert_one
exports.insert_many = insert_many


