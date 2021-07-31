const axios = require('axios');
const header = require("./authentication/credentials.js")

const all_teams = async () => {
    try {
        response = await axios.get("https://api.football-data.org/v2/competitions/EC/teams", header)
        return response.data.teams
    } catch (error) {
        return error
    }
}

const all_teams_code = async () => {
    try {
        response = await axios.get("https://api.football-data.org/v2/competitions/EC/teams", header)
        return response.data.teams.map(team => {
            return team.id
        })
    } catch (error) {
        return error
    }
}

//784 italy
const all_players_for_team = async (team) => {
    try {
        response = await axios.get("https://api.football-data.org/v2/teams/" + team, header)
        return response.data.squad
    } catch (error) {
        return error
    }
}

const all_players = async () => {
    try {
        teams_id = [759,760]//await all_teams_code()
        pl = teams_id.map(async (id) => {
            response = await axios.get("https://api.football-data.org/v2/teams/" + id, header)
            return response.data.squad
        })
        return Promise.all(pl)
    } catch (error) {
        return error
    }
}

fs = require('fs');

// all_teams().then(teams => {
//     fs.writeFileSync("./src/model/assets/football_data_api/materialized_assets/teams.json",JSON.stringify(teams))
// })
all_players().then(player => {
    fs.writeFileSync("./src/model/assets/football_data_api/materialized_assets/players.json",JSON.stringify(player))
})


