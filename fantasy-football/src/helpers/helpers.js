import axios from 'axios';
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';
import VueCookie from 'vue-cookie';
import Token from '@/models/token';
import { utils } from "./utils";

const vm = new Vue();
const userURL = 'http://localhost:3002/';
const assetURL = 'http://localhost:3001/';
const ERROR = 0;

Vue.use(VueCookie,
  VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true
  }
});

function Return(error, user, profile, config = null) {
  this.error = error;
  this.user = user;
  this.profile = profile;
  this.config = config;
}

const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    vm.flash(`${error.response}: ${error.data}`, 'error');
  });

async function auth(payload) {
  const res = await axios.post(userURL + "users/auth", payload);
  if (res.data.error == '' && res.data.value.id != '') {
    return res
  }
  return ERROR;
}

async function loaddata(token) {
  var error = "";
  if (token.value != "") {
    const id = await checktkn(token);
    if (id == undefined || id == 0 || id == "") {
      error = "Can't get ID"
    }
    var res = await getuser(id)
    if (res == 0) {
      error = "Can't get user"
    }
    const user = utils.fillUser(res);
    res = await getprofile(id);
    if (res == 0) {
      error = "Can't get profile"
    }
    const profile = utils.fillProfile(res);
    const ret = new Return(error, user, profile);
    return ret;
  }
}

async function loadalldata(token) {
  var error = "";
  if (token.value != "") {
    const id = await checktkn(token);
    if (id == undefined || id == 0 || id == "") {
      error = "Can't get ID"
    }
    var res = await getuser(id)
    if (res == 0) {
      error = "Can't get user"
    }
    const user = utils.fillUser(res);
    res = await getprofile(id);
    if (res == 0) {
      error = "Can't get profile"
    }
    const profile = utils.fillProfile(res);
    res = await getconfig();
    if (res == 0) {
      error = "Can't get config"
    }
    const config = utils.fillConfig(res);
    const ret = new Return(error, user, profile, config);
    return ret;
  }
}

async function checktkn(payload) {
  const res = await axios.post(userURL + "users/checktkn", payload);
  if (res.data.error == '' && res.data.value.id != '') {
    return res.data.value.id;
  }
  return ERROR;
}

async function getplayer(id) {
  const res = await axios.get(assetURL + "players/" + id);
  if (res.data.error == '' && res.data.value.id != '') {
    return res.data.value.id;
  }
  return ERROR;
}

async function getplayers(teamID) {
  const res = await axios.get(assetURL + "team/" + teamID);
  if (res.data.error == '' && res.data.value.id != '') {
    return res.data.value.id;
  }
  return ERROR;
}

async function getallplayers() {
  const res = await axios.get(assetURL + "players/");
  if (res.data.error == '' && res.data.value != '') {
    return res.data.value;
  }
  return ERROR;
}

async function getallteams() {
  const res = await axios.get(assetURL + "teams/");
  if (res.data.error == '' && res.data.value != '') {
    return res.data.value;
  }
  return ERROR;
}

async function getconfig() {
  const res = await axios.get(userURL + "config/");
  if (res.data.error == '' && res.data.value != '') {
    return res.data.value[0];
  }
  return ERROR;
}

async function getuser(id) {
  const res = await axios.get(userURL + "users/" + id);
  if (res.data.error == '' && res.data.value != '') {
    return res.data.value;
  }
  return ERROR;
}

async function getprofile(id) {
  const res = await axios.get(userURL + "users/profile/" + id);
  if (res.data.error == '' && res.data.value != '') {
    return res.data.value;
  }
  return ERROR;
}

async function edituser(user) {
  const res = await axios.put(userURL + "users/edit/" + user.id, user);
  return res.data;
}

async function editprofile(profile) {
  const res = await axios.put(userURL + "users/profile/" + profile.id, profile);
  return res.data;
}

function parsename(name) {
  return name.replace("æ", "ae");
}

async function getphoto(name) {
  var param = parsename(name);
  const URL = 'https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=' + param;
  const res = await axios.get(URL);
  return res.data;
}

export const api = {
  //user
  readToken: name => {
    return new Token(Vue.cookie.get(name));
  },
  //user
  setToken: (name, value) => {
    Vue.cookie.set(name, value, 1);
  },
  //user
  checkUser: handleError(async payload => {
    const res = await axios.post(userURL + "authenticate/", payload)
    return res.data;
  }),
  //user
  getUser: handleError(async id => getuser(id)),
  //user
  getProfile: handleError(async id => getprofile(id)),
  //user
  editUser: handleError(async user => edituser(user)),
  //user
  editProfile: handleError(async profile => editprofile(profile)),
  //user
  getusers: handleError(async () => {
    const res = await axios.get(userURL + "users/");
    return res.data;
  }),
  //user
  getuserbyusername: handleError(async username => {
    const res = await axios.get(userURL + "users/" + username);
    return res.data;
  }),
  //user
  deleteuser: handleError(async id => {
    const res = await axios.delete(userURL + "users/" + id);
    return res.data;
  }),
  //user
  createuser: handleError(async payload => {
    const res = await axios.post(userURL + "users/", payload);
    return res.data;
  }),
  //user
  updateuser: handleError(async payload => {
    const res = await axios.put(userURL + "users/" + payload._id, payload);
    return res.data;
  }),
  //user
  register: handleError(async payload => {
    const ret = await axios.post(userURL + "users/check", payload);
    if (!ret.data.value) {
      const register = await axios.post(userURL + "users/register", payload);
      return register;
    }
    return ret;
  }),
  //user
  login: handleError(async payload => auth(payload)),
  //user
  checkToken: handleError(async payload => checktkn(payload)),
  //asset
  getPlayer: handleError(async id => getplayer(id)),
  //asset
  getPlayers: handleError(async teamID => getplayers(teamID)),
  //asset
  getAllPlayers: handleError(async () => getallplayers()),
  //asset
  getAllTeams: handleError(async () => getallteams()),
  //asset
  getPhoto: handleError(async name => getphoto(name)),
  //asset
  getConfig: handleError(async () => getconfig()),
  //user
  loadData: handleError(async (token) => loaddata(token)),
  //user
  loadAllData: handleError(async (token) => loadalldata(token)),
}


