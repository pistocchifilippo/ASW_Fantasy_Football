/**
 * The following code snippet is the responsible to set-up assets into MongoDB.
 * 
 * Assets will be firstly saved on the file system and then loaded into the database.
 * The main motivation is related to the possibility of fail form the api,
 * since the team is using a free plan with limited number of requests.
 */

const MongoClient = require('mongodb').MongoClient
const mongo_address = "mongodb://localhost:27017/"
const mongo_db = "FantasyFootball"
const players_collection = "Players"
const teams_collection = "Teams"

const fs = require("fs")
const players_path = "./src/initialization/download/downloaded_asset/players.json"
const teams_path = "./src/initialization/download/downloaded_asset/teams.json"

const load_players = async (players,db) => {
    for (let i = 0; i < players.length; i++) {
        await db.collection(players_collection).insertMany(players[i])
    }
}

const load_teams = async (teams,db) => {
    await db.collection(teams_collection).insertMany(teams)
}

const load_assets = async () => {
    const players = JSON.parse(fs.readFileSync(players_path, 'utf8'))
    const teams = JSON.parse(fs.readFileSync(teams_path, 'utf8'))

    MongoClient.connect(mongo_address + mongo_db, async (err, client) => {
        if(err) throw err

        // Connect to the db
        var db = client.db(mongo_db);

        // Loading players
        await load_teams(teams,db)
        await load_players(players,db)
        client.close()
    });
}

load_assets()

module.exports.load_assets = load_assets