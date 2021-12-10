var mongoose = require('mongoose');

const user = require("../models/userModel.js")(mongoose);
const profile = require("../models/profileModel.js")(mongoose);
const config = require("../models/configModel.js")(mongoose);
const league = require("../models/leagueModel.js")(mongoose);
const axios = require('axios');
const baseURL = 'http://localhost:3008/';
const selfURL = 'http://localhost:3002/';

function Return(value, error) {
  this.value = value;
  this.error = error;
}

function TableUser(id, username, score){
  this.username = username;
  this.score = score;
  this.id = id;
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
        et.value = 0;
        req.error = 'Failed to upload your data, try again later!';
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
  profile.findOne({ userID: req.params.id }, (err, prof) => {
    if (prof != undefined) {
      ret.value = prof;
      ret.error = ''
    } else {
      ret.error = 'The credentials you provided are incorrect!'
      ret.value = 0;
    }
    res.json(ret);
  });
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
    if (err) res.send(err);
    if (result == null) {
      ret.value = 0;
      ret.error = 'User not found on database.'
      res.json(ret);
    }
    else {
      ret.value = result
      res.json(ret);
    }
  });
};

exports.checkUser = (req, res) => {
  var ret = new Return('', '');
  User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] }, (err, user) => {
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
  console.log(2)
  var ret = new Return('', '');
  league.findOne({ players: req.body.profileID }, (err, leagues) => {
    if (leagues != undefined) {
      ret.value = leagues;
      ret.error = ''
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
      res.json(ret);
    } else {
      ret.error = 'An error has occurred!'
      ret.value = 0;
      res.json(ret);
    }
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

/* exports.putNewLeague = (req, res) => {
  var ret = new Return('', '');
  League.find({}, (err, leagues) => {
      if (leagues != undefined) {
          ret.value = leagues;
          ret.error = ''
      } else {
          ret.error = 'Some error occurred!'
          ret.value = 0;
      }
      res.json(ret);
  });
}; */

exports.delete_a_user = (req, res) => {
  /* User.deleteOne({ _id: req.params.userId }, err => {
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
            res.json(ret);
          })
          .catch(err => {
            ret.error = 'An error has occurred!';
            res.json(ret);
          });
      } else {
        ret.error = 'An error has occurred!';
        res.json(ret);
      }
    })
    .catch(err => res.json(err));
};

exports.checkToken = async (req, res) => {
  await axios
    .post(baseURL + 'check/', req.body)
    .then(result => {
      res.json(result.data);
    })
    .catch(err => res.json(err));
};
