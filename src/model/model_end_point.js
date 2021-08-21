const express = require("express")
const app = express()
const routes = require("./routes.json")
const mongo_settings = require("./mongo_settings.json")
const MongoClient = require('mongodb').MongoClient

app.use(express.json());

const match_pattern_mongo = async (pattern,res,collection) => {
    MongoClient.connect(mongo_settings.mongo_address + mongo_settings.mongo_db, (err, client) => {
        if(err) throw err
    
        // Connect to the db
        var db = client.db(mongo_settings.mongo_db);
        db.collection(collection).find(pattern).toArray((err, items) => {
            if(err) throw err;    
            res.json(items)
            client.close()           
        });
    });
}

app.get(routes.teams_route, (req,res) => {
    const pattern = req.body
    match_pattern_mongo(pattern,res,mongo_settings.teams_collection)
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






