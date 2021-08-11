/**
 * The following script will be executed to connect to the Football Data API,
 * downloading basically the set-up assets related to a given league (teams and the line-up of each team).
 * 
 * The code is related to Euro 2020 competition.
 */

const axios = require('axios');
const { response } = require('express');
const header = require("./api_authentication/credentials.js")
const teams_path = "./src/initialization/download/downloaded_asset/teams.json"
const players_path = "./src/initialization/download/downloaded_asset/players.json"

const all_teams = async () => {
    try {
        const response = await axios.get("https://api.football-data.org/v2/competitions/EC/teams", header)
        return response.data.teams
    } catch (error) {
        return error
    }
}

const all_teams_code = async () => {
    try {
        const response = await axios.get("https://api.football-data.org/v2/competitions/EC/teams", header)
        return response.data.teams.map(team => {
            return team.id
        })
    } catch (error) {
        return error
    }
}

//784 italy
const all_players_for_team = async (team_id) => {
    try {
        const response = await axios.get("https://api.football-data.org/v2/teams/" + team_id, header)
        return response.data.squad
    } catch (error) {
        return error
    }
}

const all_players = async () => {
    try {
        teams_id = await all_teams_code()
        teams_id = teams_id.map(async x => {
            p = await all_players_for_team(x)
            p = p.map(player => {
                player.team_id = x
                return player
            })
            return p
        })
        return Promise.all(teams_id)
    } catch (error) {
        return error
    }
}

fs = require('fs');


// all_teams().then(console.log)
// all_teams_code().then(console.log)
// all_players().then(console.log)

// all_teams().then(teams => {
//     fs.writeFileSync(teams_path,JSON.stringify(teams))
// })
// all_players_for_team(784).then(console.log)
// all_teams_code().then(console.log)
// all_players().then(console.log)
all_players().then(player => {
    fs.writeFileSync(players_path,JSON.stringify(player))
})