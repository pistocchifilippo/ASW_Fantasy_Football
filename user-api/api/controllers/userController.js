const db = require('../helpers/helper');
const ERR = 'Some error occurred!';
const ERR_ADV = 'Cannot advace MatchDay!';

function Return(value, error) {
  this.value = value;
  this.error = error;
}

function TableUser(id, username, score) {
  this.username = username;
  this.score = score;
  this.id = id;
}

function Param(param1, param2) {
  this.param1 = param1;
  this.param2 = param2;
}

function Profile(userid, initialBudget, initialScore) {
  this.userID = userid;
  this.budget = initialBudget;
  this.score = initialScore;
  this.team = [];
  this.lineups = [
    Array(11),
    Array(11),
    Array(11),
    Array(11),
    Array(11),
    Array(11),
    Array(11),
  ];
}

/* ---- USERS ---- */

//get all users
exports.list_all_users = async (_, res) => {
  const ret = await db.getUsers()
  res.json(ret);
};

//get user by ID
exports.read_a_user = async (req, res) => {
  var ret = new Return(0, '');
  const usr = await db.getUser(req.params.userId);
  if (usr._id != '') {
    ret.value = usr;
  } else {
    ret.value = 0;
    ret.error = 'User not found on database.'
  }
  res.json(ret);
};

//read a user by profileID and return some data to display in a table
exports.getTableUser = async (req, res) => {
  var ret = new Return(0, ERR);
  const prof = (await db.getProfile(req.params.profileID))[0];
  if (prof._id != '') {
    const usr = await db.getUser(prof.userID);
    if (usr._id.valueOf() != '') {
      var tuser = new TableUser(usr._id.valueOf(), usr.username, prof.score);
      ret.error = '';
      ret.value = tuser;
    }
  }
  res.json(ret);
};

//check if the user exists or not
exports.checkUser = async (req, res) => {
  var ret = new Return(0, '');
  const usr = await db.checkUser(req.body.username, req.body.email);
  if (usr != undefined || usr != null) {
    ret.value = 1;
    ret.error = 'Email yet registered or username not valid!'
  }
  res.json(ret);
};

//register a new user, creating a new profile
exports.register = async (req, res) => {
  const err = "Try again: we had some issues during registering process!";
  var ret = new Return(0, err);
  const conf = await db.get_config();
  if (conf._id != '') {
    const newuser = await db.saveUser(req.body);
    if (!(newuser._id == '' || newuser == undefined)) {
      const p = new Profile(newuser._id, conf.initialBudget, conf.initialScore);
      const newprofile = await db.saveProfile(p);
      if (!(newprofile._id == '' || newprofile == undefined)) {
        ret.value = 1;
        ret.error = '';
      }
    }
  }
  res.json(ret);
};

//edit an user
exports.editUser = async (req, res) => {
  var ret = new Return(1, '');
  const upd = await db.update_a_user(req.body);
  if (upd != undefined) {
    ret.value = upd;
  } else {
    ret.error = 'Failed to upload your data, try again later!';
  }
  res.json(ret);
};

//check user credentials on login
exports.checkOnLogin = async (req, res) => {
  var ret = new Return(0, '');
  const usr = await db.checkLogin(req.body.username, req.body.password);
  if (usr._id != '') {
    ret.value = usr._id;
  } else {
    ret.error = 'The credentials you provided are incorrect!'
  }
  res.json(ret);
};

//update an user
exports.update_a_user = async (req, _) => {
  const __ = await db.update_a_user(req.body);
};

//delete an user: remove him from leagues, delete his profile and then delete the user entry
exports.delete_a_user = async (req, res) => {
  const uid = req.params.userId;
  const prof = await db.getProfileByUserID(uid);
  const pid = prof._id.toString();
  var leagues = await db.getleaguesbyuser(pid);
  //remove player from each league
  leagues.forEach(async l => await db.removeuserfromleague(pid, l._id.toString()));
  //remove user profile
  await db.deleteProfile(pid);
  //remove user
  await db.deleteUser(uid);
};

/* ---- PROFILE ---- */

exports.editProfile = async (req, res) => {
  var ret = new Return(1, '');
  var team = req.body.team.map(player => player._id);
  req.body.team = team;
  const upd = await db.update_a_profile(req.body);
  if (upd != undefined) {
    ret.value = upd;
  } else {
    ret.error = 'Failed to upload your data, try again later!';
  }
  res.json(ret);
};

/* ---- UTILS ---- */

//check if the game can proceed to the next MatchDay
exports.canAdvanceDay = async (_, res) => {
  const canAdvance = await db.can_advance();
  res.json(canAdvance);
}

//return actual MatchDay
exports.getCurrentDay = async (_, res) => {
  var ret = new Return('', '');
  const day = await db.get_current_day();
  if (day.matchDay != undefined && day._id != undefined) {
    ret.value = day.matchDay;
    ret.error = ''
  } else {
    ret.error = ERR;
    ret.value = 0;
  }
  res.json(ret);
}

//advance the MatchDay (if possible), updating score for every user
exports.advanceDay = async (_, res) => {
  var ret = new Return('', '');
  const canAdvance = await db.can_advance();
  const current = await db.get_current_day();
  const dayIndex = current.matchDay - 1;
  var votes = [];
  const result = await db.get_votes();
  votes = result.data.value;
  if (canAdvance == true) {
    const profiles = await db.getProfiles();
    // for each profile    
    for (let i = 0; i < profiles.length; i++) {
      var points =  profiles[i].score;
      // the daily line up
      const lineup = profiles[i].lineups[dayIndex];
      if (lineup != undefined) {
        // for each player
        lineup.forEach(async player => {
          if (player != null) {
            const x = votes.find(el => el.id == player).score[dayIndex];
            points += x;
          }
        })
      }
      // update player score
      await db.updateScore(profiles[i]._id, points);
    }
    const conf = await db.get_config();
    const nextMD = current.matchDay + 1
    //update matchday
    await db.updateMD(conf._id, nextMD);
    ret.value = 1;
    ret.error = '';
  } else {
    ret.value = 0;
    ret.error = ERR_ADV;
  }
  res.json(ret);
}

/* ---- CONFIG ---- */

//return system configurations
exports.getConfig = async (_, res) => {
  var ret = new Return('', '');
  const conf = await db.get_config();
  if (conf._id != undefined) {
    ret.value = conf;
    ret.error = ''
  } else {
    ret.error = 'Some error occurred!'
    ret.value = 0;
  }
  res.json(ret);
};

//return profile
exports.getProfile = async (req, res) => {
  var ret = new Return(0, ERR);
  var i = 0;
  var team = [];
  var lineup = [];
  const current = await db.get_current_day();
  if (req.params.id == 0) {
    ret.error = 'Try again: we had some issues';
    res.json(ret);
  } else {
    const prof = await db.getProfileByUserID(req.params.id);
    if (prof != undefined && prof._id != '') {
      if (prof.team.length > 0) {
        prof.team.forEach(async player => {
          const result = await db.get_player(player);
          team.push(result.data.value);
          if (prof.lineups[current.matchDay - 1].includes(player)) {
            lineup.push(result.data.value);
          }
          i++;
          if (i == prof.team.length) {
            prof.team = team;
            if(lineup.length==0){
              lineup = new Array(11);
            }
            prof.lineups[current.matchDay - 1] = lineup;
            ret = new Return(prof, '');
            res.json(ret);
          }
        });
      } else {
        ret = new Return(prof, '');
        res.json(ret);
      }
    } else { res.json(ret); }
  }
};

//return all leagues of the player
exports.getLeaguesByUser = async (req, res) => {
  var pid = req.params.profileID;
  var ret = new Return([], '');
  ret.value = await db.getleaguesbyuser(pid);
  res.json(ret);
}

//return username of the player with given profileID
exports.getUsername = async (req, res) => {
  var ret = new Return(0, '');
  var uid = await db.getUserIDFromProfile(req.params.profileID);
  if (uid != undefined && uid.userID != '') {
    var user = await db.getUser(uid.userID);
    if (user != undefined) {
      ret.value = user.username;
    } else {
      ret.error = 'An error has occurred!'
    }
  }
  res.json(ret);
}

//get some leagues based on searched string
exports.getSearchResult = async (req, res) => {
  var ret = new Return('', '');
  const result = await db.getSearchResult(req.params.key);
  if (result != undefined) {
    ret.value = result;
    ret.error = '';
  } else {
    ret.error = 'An error has occurred!'
    ret.value = 0;
  }
  res.json(ret);
};

/* ---- LEAGUE ---- */

//return all leagues
exports.getAllLeagues = async (_, res) => {
  var ret = new Return(0, '');
  const leagues = await db.get_leagues();
  if (leagues != undefined) {
    ret.value = leagues
  } else {
    ret.error = 'An error has occurred!'
  }
  res.json(ret);
};

//remove the user from the league
exports.leaveLeague = async (req, res) => {
  var ret = new Return(0, '');
  var profileid = req.body[0];
  var leagueid = req.body[1];
  const league = await db.get_league(leagueid);
  if (league != undefined && league._id != '') {
    if (league.players.includes(profileid)) {
      league.players = league.players.filter(player => player != profileid);
      const upd = await db.update_a_league(league);
      if (upd) {
        ret.value = upd;
      } else {
        ret.value = 0;
        req.error = 'Failed to upload your data, try again later!';
      }
    }
  }
  res.json(ret);
};

//insert the player in the league (if not full!)
exports.joinLeague = async (req, res) => {
  var ret = new Return(0, '');
  var profileid = req.body[0];
  var leagueid = req.body[1];
  const league = await db.get_league(leagueid);
  if (league._id != '' && league != undefined) {
    if (league.players.length < league.max_players) {
      if (!league.players.includes(profileid)) {
        league.players.push(profileid);
        const res = await db.update_a_league(league);
        if (res != undefined) {
          ret.value = res;
        } else {
          ret.error = 'Failed to upload your data, try again later!';
        }
      }
    }
  }
  res.json(ret);
};

//insert a new league
exports.postNewLeague = async (req, res) => {
  var ret = new Return(0, '');
  const nl = await db.saveLeague(req.body)
  if (nl) {
    ret.value = nl;
  } else {
    ret.error = ERR;
  }
  res.json(ret);
};

/* ---- API for token handling ---- */

exports.login = async (req, res) => {
  var ret = new Return(0, '');
  const usr = await db.getUser(req.body.id);
  if (usr._id = ! '') {
    const result = await db.login(req.body.id);
    ret.value = result.data.value;
    ret.error = result.data.error;
  } else {
    ret.error = 'An error has occurred!';
  }
  res.json(ret);
};

exports.checkToken = async (req, res) => {
  const result = await db.check_token(req.body);
  res.json(result.data);
};

/* ---- Admin section ---- */

exports.checkOnAdminLogin = async (req, res) => {
  var ret = new Return('', '');
  const conf = await db.getAdminConfig(req.body.username, req.body.password);
  if (conf != null) {
    ret.value = conf._id;
  } else {
    ret.error = 'The credentials you provided are incorrect!'
  }
  res.json(ret);
};

exports.adminLogin = async (req, res) => {
  var ret = new Return(0, '');
  const log = await db.adminLogin(req.body.id);
  if (log.data.value != '' && log.data.error == '') {
    ret.value = log.data;
  } else {
    ret.error = ERR;
  }
  res.json(ret);
};