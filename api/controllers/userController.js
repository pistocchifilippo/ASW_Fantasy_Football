var mongoose = require('mongoose');
const user = require("../model/userModel.js")(mongoose);
const axios = require('axios');
const baseURL = 'http://localhost:3008/';

exports.list_all_users = (_, res) => {
  user.find({}, (err, users) => {
    if (err) res.send(err);
    res.json(users);
  });
};

function Return(value, error)  {
  this.value = value;
  this.error = error;
}

const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    vm.flash(`${error.response}: ${error.data}`, 'error');
});

exports.checkOnLogin = (req, res) => { 
  var ret = new Return('', '');
  user.findOne({ $and : [ {username: req.body.username}, {password: req.body.password} ] }, (err, user) => {  
    if(user != undefined){
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
  var ret = new Return('', '');
  user.findOne({ _id: req.params.userId }, function(err, result) {
    if (err)
      res.send(err);
    if(result==null){
      ret.error='User not found on database.'
    }
    else {
      ret.value = result
      res.json(ret);
    }
  });
};


exports.checkUser = (req, res) => { 
  var ret = new Return('', '');
  user.findOne({ $or: [ {username: req.body.username}, {email: req.body.email} ] }, (err, user) => {
    if (err) res.send(err);
    ret.value = 0;
    if (user){
      ret.value = 1;
      ret.error = 'Email yet registered or username not valid!'
    } 
    res.json(ret);
  });
};

exports.register = (req, res) => {
  var ret = new Return('', '');
  var newUser = new user(req.body);
  newUser.save((err, user) => {
    if (err) res.send(err);
    ret.value = 1;
    if (!user) {
      ret.value = 0;
      ret.error = "Try again: we had some issues during registering process!";
    }
    res.json(ret);
  });
};

exports.login = async (req, res) => {
    await axios
      .post(baseURL + 'login/', { id: req.body.id })
      .then(result => {
        res.json(result.data);
      })
      .catch(err => console.log(err));
};

exports.checkToken = async (req, res) => {
  await axios
    .post(baseURL + 'check/', req.body)
    .then(result => {
      res.json(result.data);
    })
    .catch(err => console.log(err));
};

exports.create_a_user = (req, res) => {
  const newUser = new user(req.body);
  newUser.save((err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.update_a_user = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    req.body,
    { new: true },
    (err, user) => {
      if (err) res.send(err);
      res.json(user);
    }
  );
};

exports.delete_a_user= (req, res) => {
  console.log(req.params)
  /* User.deleteOne({ _id: req.params.userId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'user successfully deleted',
     _id: req.params.userId
    });
  }); */
};