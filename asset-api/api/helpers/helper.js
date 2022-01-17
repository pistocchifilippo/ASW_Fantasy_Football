var mongoose = require('mongoose');
const team = require("../models/teamModel.js")(mongoose);
const player = require("../models/playerModel.js")(mongoose);

exports.getTeams = async () => {
    return await team.find({});
}

exports.getTeam = async (id) => {
    return await team.find({ _id: id });
}

exports.get_all_players = async () => {
    return await player.find({});
}

exports.getPlayer = async (id) => {
    return await player.find({ _id: id });
}