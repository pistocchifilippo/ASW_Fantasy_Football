var mongoose = require('mongoose');

const user = require("../models/userModel.js")(mongoose);
const profile = require("../models/profileModel.js")(mongoose);
const config = require("../models/configModel.js")(mongoose);
const league = require("../models/leagueModel.js")(mongoose);

const axios = require('axios');
const leagueModel = require('../models/leagueModel.js');
const baseURL = 'http://localhost:3008/';
const selfURL = 'http://localhost:3002/';

function Return(value, error) {
  this.value = value;
  this.error = error;
}

function TableUser(id, username, score) {
  this.username = username;
  this.score = score;
  this.id = id;
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

exports.list_all_users = (_, res) => {
  user.find({}, (err, users) => {
    if (err) res.send(err);
    res.json(users);
  });
};

exports.editUser = (req, res) => {
  var ret = new Return(1, '');
  user.findOneAndUpdate(
    { _id: req.params.userId },
    req.body,
    { new: true },
    (err, user) => {
      if (err) res.send(err);
      if (user == undefined) {
        et.value = 0;
        req.error = 'Failed to upload your data, try again later!';
      }
      res.json(ret);
    }
  );
};

exports.editProfile = (req, res) => {
  var ret = new Return(1, '');
  profile.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, profile) => {
      if (err) res.send(err);
      if (profile == undefined) {
        ret.value = 0;
        ret.error = 'Failed to upload your data, try again later!';
      }
      res.json(ret);
    }
  );
};

exports.getConfig = (req, res) => {
  var ret = new Return('', '');
  config.find({}, (err, config) => {
    if (config != undefined) {
      ret.value = config;
      ret.error = ''
    } else {
      ret.error = 'Some error occurred!'
      ret.value = 0;
    }
    res.json(ret);
  });
};

exports.getProfile = (req, res) => {
  var ret = new Return('', '');
  if (req.params.id == 0) {
    ret.error = 'Try again: we had some issues';
    ret.value = 0;
    res.json(ret);
  } else {
    profile.findOne({ userID: req.params.id }, (err, prof) => {
      if (prof != undefined) {
        ret.value = prof;
        ret.error = ''
        res.json(ret);
      } else {
        ret.error = 'The credentials you provided are incorrect!'
        ret.value = 0;
        res.json(ret);
      }
    });
  }
};

exports.checkOnLogin = (req, res) => {
  var ret = new Return('', '');
  user.findOne({ $and: [{ username: req.body.username }, { password: req.body.password }] }, (err, user) => {
    if (user != undefined) {
      ret.value = user._id;
      ret.error = ''
    } else {
      ret.error = 'The credentials you provided are incorrect!'
      ret.value = 0;
    }
    res.json(ret);
  });
};

exports.read_a_user = (req, res) => {
  var ret = new Return(0, '');
  user.findOne({ _id: req.params.userId }, function (err, result) {
    if (err) { ret.error = err }
    if (result == null) {
      ret.value = 0;
      ret.error = 'User not found on database.'
    } else {
      ret.value = result
    }
    res.json(ret);
  });
};

exports.checkUser = (req, res) => {
  var ret = new Return('', '');
  user.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] }, (err, user) => {
    if (err) res.send(err);
    ret.value = 0;
    if (user) {
      ret.value = 1;
      ret.error = 'Email yet registered or username not valid!'
    }
    res.json(ret);
  });
};

exports.create_a_user = (req, res) => {
  const newUser = new user(req.body);
  newUser.save((err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};


exports.register = (req, res) => {
  var ret = new Return(1, '');
  var newUser = new user(req.body);
  config.findOne({}, (err, config) => {
    if (err) res.send(err);
    if (config != undefined) {
      ret.error = ''
      newUser.save((error, user) => {
        if (error) res.send(error);
        if (!user) {
          ret.value = 0;
          ret.error = "Try again: we had some issues during registering process!";
          res.json(ret);
        }
        let p = new Profile(user._id, config.initialBudget, config.initialScore);
        var newProfile = new profile(p);
        newProfile.save((error, prof) => {
          if (error) res.send(error);
          if (!prof) {
            ret.value = 0;
            ret.error = "Try again: we had some issues during registering process!";
            res.json(ret);
          }
        });
      });
    } else {
      ret.error = 'Try again: we had some issues during registering process!'
      ret.value = 0;
    }
    res.json(ret);
  });

};

exports.update_a_user = (req, res) => {
  user.findOneAndUpdate(
    { _id: req.params.userId },
    req.body,
    { new: true },
    (err, user) => {
      if (err) res.send(err);
      res.json(user);
    }
  );
};

exports.getLeaguesByUser = (req, res) => {
  var pid = req.params.profileID;
  var ret = new Return([], '');
  league.find({}, (err, leagues) => {
    if (leagues != undefined) {
      leagues.forEach(league => {
        if (league.players.includes(pid)) {
          ret.value.push(league);
        }
      });
      ret.error = ''
    } else {
      ret.error = 'An error has occurred!'
      ret.value = 0;
    }
    res.json(ret);
  });
};

exports.getUsername = (req, res) => {
  var ret = new Return('', '');
  var query = profile.findOne({ _id: req.params.profileID }).select('userID');
  query.exec(function (err, profile) {
    if (profile != undefined) {
      var query2 = user.findOne({ _id: profile.userID }).select('username');
      query2.exec(function (err, user) {
        if (user != undefined) {
          ret.value = user.username;
          ret.error = ''
        } else {
          ret.error = 'An error has occurred!'
          ret.value = 0;
        }
        res.json(ret);
      }
      );
    } else {
      ret.error = 'An error has occurred!'
      ret.value = 0;
    }
  });
}

exports.getSearchResult = (req, res) => {
  var ret = new Return('', '');
  var query = league
    .find({ name: { $regex: req.params.key } })
    .select('name admin _id players');
  query.exec(function (err, result) {
    if (result != undefined) {
      ret.value = result;
      ret.error = '';
    } else {
      ret.error = 'An error has occurred!'
      ret.value = 0;
    }
    res.json(ret);
  });
};

exports.getAllLeagues = (_, res) => {
  var ret = new Return('', '');
  league.find({}, (err, leagues) => {
    if (err) res.send(new Return('', 'An error has occurred!'));
    if (leagues) {
      ret.value = leagues
      ret.error = '';
    } else {
      ret.error = 'An error has occurred!'
      ret.value = 0;
    }
    res.json(ret);
  });
};

exports.getTableUser = (req, res) => {
  var ret = new Return('', '');
  profile.findOne({ _id: req.params.profileID }, (err, profile) => {
    if (err) res.send(new Return('', 'An error has occurred!'));
    if (profile) {
      user.findOne({ _id: profile.userID }, (err, user) => {
        if (err) res.send(new Return('', 'An error has occurred!'));
        if (user) {
          var tuser = new TableUser(user._id.toHexString(), user.username, profile.score);
          ret.error = '';
          ret.value = tuser;
          res.json(ret);
        } else {
          ret.error = 'An error has occurred!'
          ret.value = 0;
        }
      });
      ret.error = '';
    } else {
      ret.error = 'An error has occurred!'
      ret.value = 0;
      res.json(ret);
    }
  });
};

exports.joinLeague = (req, res) => {
  var ret = new Return('', '');
  var profileid = req.body[0];
  var leagueid = req.body[1];
  league.findOne({ _id: leagueid }, (err, l) => {
    if (l) {
      if (!l.players.length == l.max_players) {
        if (!l.players.includes(profileid)) {
          l.players.push(profileid);
          league.findOneAndUpdate(
            { _id: leagueid },
            l,
            { new: true },
            (err, lg) => {
              if (lg) {
                ret.value = lg;
                ret.error = '';
              } else {
                ret.value = 0;
                req.error = 'Failed to upload your data, try again later!';
              }
            }
          );
        } else {
          ret.value = 0;
          req.error = 'You are already a member of ' + l.name + '!';
        }
      } else {
        ret.value = 0;
        req.error = 'This league is already full!';
      }
      res.json(ret);
    }
  });
};

exports.postNewLeague = (req, res) => {
  const newLeague = new league(req.body);
  var ret = new Return('', '');
  newLeague.save((err, league) => {
    if (err) {
      ret.error = 'An error has occurred!'
      ret.value = 0;
      res.json(ret);
    } else {
      ret.value = 1;
      ret.error = '';
      res.json(ret);
    }
  });
};

exports.delete_a_user = (req, res) => {
  /* user.deleteOne({ _id: req.params.userId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'user successfully deleted',
     _id: req.params.userId
    });
  }); */
};


/* API for token handling  */

exports.login = async (req, res) => {
  var ret = new Return(0, '');
  await axios
    .get(selfURL + 'users/' + req.body.id)
    .then(async result => {
      if (result.data.value._id != undefined) {
        await axios
          .post(baseURL + 'login/', { id: req.body.id })
          .then(result => {
            ret.value = result.data;
          })
        /* .catch(err => {
          ret.error = 'An error has occurred!';
          res.json(ret);
        }); */
      } else {
        ret.error = 'An error has occurred!';
      }
    })
    .catch(/* err => res.json(err) */);
  res.json(ret);
};

exports.checkToken = async (req, res) => {
  await axios
    .post(baseURL + 'check/', req.body)
    .then(result => {
      res.json(result.data);
    })
    .catch(/* err => res.json(err) */);
};
