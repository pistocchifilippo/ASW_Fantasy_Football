var mongoose = require('mongoose');
const team = require("../models/teamModel.js")(mongoose);
const player = require("../models/playerModel.js")(mongoose);
const axios = require('axios');
const baseURL = 'http://localhost:3008/';

function Return(value, error) {
    this.value = value;
    this.error = error;
}

exports.getAllTeams = (req, res) => {
    var ret = new Return('', '');
    team.find({}, (err, teams) => {
        if (teams != undefined) {
            ret.value = teams;
            ret.error = ''
        } else {
            ret.error = 'Some error occurred!'
            ret.value = 0;
        }
        res.json(ret);
    });
};

exports.getAllPlayers = (req, res) => {
    var ret = new Return('', '');
    player.find({}, (err, players) => {
        if (players != undefined) {
            ret.value = players;
            ret.error = ''
        } else {
            ret.error = 'Some error occurred!'
            ret.value = 0;
        }
        res.json(ret);
    });
};

exports.getPlayer = (req, res) => {
    var ret = new Return('', '');
    console.log(req.params);
    console.log(req.body);
    /*   player.findOne({ userID: req.params.id }, (err, prof) => {
        if (prof != undefined) {
          ret.value = prof;
          ret.error = ''
        } else {
          ret.error = 'The credentials you provided are incorrect!'
          ret.value = 0;
        }
        res.json(ret);
      }); */
};
