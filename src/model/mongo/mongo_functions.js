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

const find_multiple = async (query,collection) => {
    try {
        await client.connect()
        const database = client.db(mongo_settings.mongo_db)
        const coll = database.collection(collection)
        const cursor = await coll.find(query)
        const array = await cursor.toArray()
        return array
    } finally {
        await client.close()
    }
}

const insert_one = async (document, collection) => {
    try {
        await client.connect()
        const database = client.db(mongo_settings.mongo_db)
        const coll = database.collection(collection)
        await coll.insertOne(document)
    } finally {
        await client.close()
    }
}

const insert_many = async (document, collection) => {
    try {
        await client.connect()
        const database = client.db(mongo_settings.mongo_db)
        const coll = database.collection(collection)
        await coll.insertMany(document)
    } finally {
        await client.close()
    }
}

const update = async (query, update, collection) => {
    try {
        await client.connect()
        const database = client.db(mongo_settings.mongo_db)
        const coll = database.collection(collection)
        const updateDoc = {
            $set: update
        }
        await coll.updateOne(query, updateDoc)
    } finally {
        await client.close()
    }
}

exports.find_one = find_one
exports.find_multiple = find_multiple
exports.insert_one = insert_one
exports.insert_many = insert_many
exports.update = update


