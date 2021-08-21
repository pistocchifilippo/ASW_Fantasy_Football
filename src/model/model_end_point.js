const express = require("express")
const app = express()
const routes = require("./routes.json")
const mongo_settings = require("./mongo_settings.json")
// const MongoClient = require('mongodb').MongoClient
const { MongoClient } = require("mongodb");
const client = new MongoClient(mongo_settings.mongo_address);


app.use(express.json());

const match_pattern_mongo = async (pattern,collection) => {
    try{
        await client.connect()
        const database = client.db(mongo_settings.mongo_db);
        const coll = database.collection(collection);
        const x = await coll.findOne(pattern);
        return x
    } finally {
        await client.close()
    }
}

app.get(routes.teams_route, async (req,res) => {
    const pattern = req.body
    const x = await match_pattern_mongo(pattern,mongo_settings.teams_collection)
    res.json(x)
})
app.get(routes.players_route, (req,res) => {
    const pattern = req.body
    match_pattern_mongo(pattern,res,mongo_settings.players_collection)
})

app.use((req,res,next) => {
    res.setHeader('Content-Type', 'text/plain')
    res.status(404).send("Page not found...");
})

app.listen(8080)






