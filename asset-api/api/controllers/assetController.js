const db = require('../helpers/helper');
const ERR = 'Some error occurred!'

function Return(value, error) {
    this.value = value;
    this.error = error;
}

function Score(id, score) {
    this.id = id;
    this.score = score;
}

exports.getAllTeams = async (_, res) => {
    const teams = await db.getTeams();
    var ret = new Return('', '');
    if (teams.length > 0) {
        ret.value = teams;
    } else {
        ret.value = 0;
        ret.error = ERR;
    }
    res.json(ret);
};

exports.getTeam = async (req, res) => {
    const t = await db.getTeam(req.params.teamId);
    var ret = new Return('', '');
    if (t._id != '') {
        ret.value = t;
    } else {
        ret.value = 0;
        ret.error = ERR;
    }
    res.json(ret);
};

exports.getAllPlayers = async (req, res) => {
    const players = await db.get_all_players();
    var ret = new Return('', '');
    if (players.length > 0) {
        ret.value = players;
    } else {
        ret.value = 0;
        ret.error = ERR;
    }
    res.json(ret);
};

exports.getPlayer = async (req, res) => {
    const p = await db.getPlayer(req.params.playerId);
    var ret = new Return('', '');
    if (p[0]._id != '') {
        ret.value = p[0];
    } else {
        ret.value = 0;
        ret.error = ERR;
    }
    res.json(ret);
};

exports.getVotes = async (_, res) => {
    var ret = new Return('', '');
    var players = new Array;
    var result = await db.get_all_players();
    result.forEach(p => {
        var score = new Score(p._id, p.score);
        players.push(score);
    });
    ret.value = players;
    ret.error = ''
    res.json(ret);
};
