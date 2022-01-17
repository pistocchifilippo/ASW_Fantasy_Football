var mongoose = require('mongoose');
const axios = require('axios');
const authURL = 'http://localhost:3008/';
const assetURL = 'http://localhost:3001/';
const user = require("../models/userModel.js")(mongoose);
const profile = require("../models/profileModel.js")(mongoose);
const config = require("../models/configModel.js")(mongoose);
const league = require("../models/leagueModel.js")(mongoose);

//save a new User 
exports.saveUser = async (usr) => {
    var newUser = new user(usr);
    return await newUser.save();
};

//save a new Profile
exports.saveProfile = async (prof) => {
    var newProfile = new profile(prof);
    return await newProfile.save();
};

//save a new League
exports.saveLeague = async (lg) => {
    var newLeague = new league(lg);
    return await newLeague.save();
};

exports.get_current_day = async () => {
    return await config.findOne({}).select('matchDay');
};

exports.get_max_day = async () => {
    return await config.findOne({}).select('maxDay');
};

exports.getProfiles = async () => {
    return await profile.find({});
};

exports.getProfile = async (id) => {
    return await profile.find({ _id: id });
};

exports.getUserIDFromProfile = async (id) => {
    return await profile.findOne({ _id: id }).select('userID');
};

exports.getSearchResult = async (key) => {
    const x = await league.find({ name: { $regex: key } }).select('name admin _id players');
    return x;
}

exports.getProfileByUserID = async (id) => {
    return await profile.findOne({ userID: id });
};

exports.getUsers = async () => {
    return await user.find({});
};

exports.getUser = async (id) => {
    return await user.findOne({ _id: id });
};

exports.checkUser = async (usr, mail) => {
    return await user.findOne({ $or: [{ username: usr }, { email: mail }] });
};

exports.checkLogin = async (usr, pwd) => {
    return await user.findOne({ $and: [{ username: usr }, { password: pwd }] });
};

exports.get_config = async () => {
    return await config.findOne({}).select('_id initialBudget initialScore matchDay maxDay');
};

exports.get_league = async (id) => {
    return await league.findOne({ _id: id });
};

exports.get_leagues = async () => {
    return await league.findOne({});
};

exports.can_advance = async () => {
    current = await this.get_current_day();
    max = await this.get_max_day();
    if (current != undefined && max != undefined) {
        return (current < max);
    } else {
        return false;
    }
};

exports.check_token = async (body) => {
    return await axios.post(authURL + 'check/', body);
};

exports.login = async (id) => {
    return await axios.post(authURL + 'login/', { id: id })
};

exports.update_a_league = async (l) => {
    return league
        .findOneAndUpdate({ _id: l._id }, l, { new: true })
        .clone();
};

exports.update_a_user = async (u) => {
    return user
        .findOneAndUpdate({ _id: u.id }, u, { new: true })
        .clone();
};

exports.update_a_profile = async (p) => {
    return profile
        .findOneAndUpdate({ _id: p.id }, p, { new: true })
        .clone();
};

exports.updateScore = async (pid, points) => {
    return profile.updateOne({ _id: pid }, { $set: { score: points } })
};

exports.updateMD = async (cid, nextMD) => {
    return config.updateOne({ _id: cid }, { $set: { matchDay: nextMD } })
};

exports.deleteProfile = async (id) => {
    return profile
        .findOneAndDelete({ _id: id })
        .clone();
};

exports.deleteUser = async (id) => {
    return user
        .findOneAndDelete({ _id: id })
        .clone();
};

exports.getleaguesbyuser = async (pid) => {
    return await league.find({ players: pid });
};

exports.removeuserfromleague = async (pid, lid) => {
    league = await get_league(lid);
    league.players = league.players.filter(player => player != pid);
    await update_a_league(league);
};

exports.get_votes = async () => {
    return await axios.get(assetURL + 'votes');
}

exports.get_player = async (id) => {
    return await axios.get(assetURL + 'players/' + id);
}

exports.getAdminConfig = async (usr, pwd) => {
    return await config.findOne({ $and: [{ adminUser: usr }, { adminPWD: pwd }] });
}

exports.adminLogin = async (id) => {
    return await axios.post(authURL + 'login/', { id: id });
}
