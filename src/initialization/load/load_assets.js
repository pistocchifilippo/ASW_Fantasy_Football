/**
 * The following code snippet is the responsible to set-up assets into MongoDB.
 * 
 * Assets will be firstly saved on the file system and then loaded into the database.
 * The main motivation is related to the possibility of fail form the api,
 * since the team is using a free plan with limited number of requests.
 */

const mongo_settings = require("../../model/mongo/mongo_settings.json")

const fs = require("fs")
const players_path = "./src/initialization/download/downloaded_asset/players.json"
const teams_path = "./src/initialization/download/downloaded_asset/teams.json"
const mongo = require("../../model/mongo/mongo_functions.js")

const load_players = async (players) => {
    for (let i = 0; i < players.length; i++) {
        await mongo.insert_many(players[i],mongo_settings.players_collection)
    }
}

const load_teams = async (teams) => {
    await mongo.insert_many(teams,mongo_settings.teams_collection)
}

const load_assets = async () => {
    const players = JSON.parse(fs.readFileSync(players_path, 'utf8'))
    const teams = JSON.parse(fs.readFileSync(teams_path, 'utf8'))
    await load_teams(teams)
    await load_players(players)
}

load_assets()

module.exports.load_assets = load_assets