/**
 * Assets will be firstly saved on the file system and then loaded into the database.
 * The main motivation is related to the possibility of fail form the api,
 * since the team is using a free plan with limited number of requests.
 */

const fs = require("fs")

const load_assets = async () => {
    const x = fs.readFileSync('./src/model/assets/football_data_api/materialized_assets/players.json', 'utf8')
    const y = fs.readFileSync('./src/model/assets/football_data_api/materialized_assets/teams.json', 'utf8')

    const players = JSON.parse(x)
    const teams = JSON.parse(y)

    // Loading teams
    players.forEach(team => {
        // Load team to Mongo
        console.log(team)
    })

    // Loading players
    players.forEach(player_per_nation => {
        player_per_nation.forEach(p => {
            // Load player to Mongo
            //setting also a random price between 
            p.price = Math.floor(Math.random() * 13) + 5
            console.log(p)
        })
    })
}

load_assets()

module.exports.load_assets = load_assets