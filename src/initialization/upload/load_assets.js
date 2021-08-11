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
const mongo_collection = "Stats"

const fs = require("fs")
const players_path = "./src/initialization/download/downloaded_asset/players.json"
const teams_path = "./src/initialization/download/downloaded_asset/teams.json"

const transformations = require("./transformations.js")

const random_price = () => {
    return Math.floor(Math.random() * 13) + 5
}

const load_players = async (players,db) => {
    for (let i = 0; i < players.length; i++) {
        const p = players[i].map(pl => {
            pl.price = random_price()
            return pl
        })
        await db.collection(mongo_collection).insertMany(p)
    }
}

const load_teams = async (teams,db) => {
    await db.collection(mongo_collection).insertMany(teams)
}

const load_assets = async () => {
    players = JSON.parse(fs.readFileSync(players_path, 'utf8'))
    players = players.map(ps => ps.map(transformations.map_player))
    teams = JSON.parse(fs.readFileSync(teams_path, 'utf8'))
    teams = teams.map(x => transformations.map_team(x))

    MongoClient.connect(mongo_address + mongo_db, async (err, client) => {
        if(err) throw err

        // Connect to the db
        var db = client.db(mongo_db);

        // Loading players
        await load_teams(teams,db)
        // await load_players(players,db)//.then(_ => client.close())
        client.close()
    });
}

load_assets()
// players = JSON.parse(fs.readFileSync(players_path, 'utf8'))
// p = players.flatMap(e => e)

module.exports.load_assets = load_assets