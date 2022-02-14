import axios from 'axios';
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';
import { utils } from "./utils";

const vm = new Vue();
const userURL = 'http://localhost:3002/';
const assetURL = 'http://localhost:3001/';
const ERROR = 0;

Vue.use(VueFlashMessage, {
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

export const api = {
  //user
  checkUser: handleError(async payload => checkuser(payload)),
  //user
  checkAdmin: handleError(async payload => checkadmin(payload)),
  //user
  getUser: handleError(async id => getuser(id)),
  //user
  getProfile: handleError(async id => getprofile(id)),
  //user
  editUser: handleError(async user => edituser(user)),
  //user
  editProfile: handleError(async profile => editprofile(profile)),
  //user
  getUsers: handleError(async () => getusers()),
  //user
  getUserByUsername: handleError(async username => getuserbyusername(username)),
  //user
  deleteUser: handleError(async id => deleteuser(id)),
  //user
  register: handleError(async payload => registeruser(payload)),
  //user
  login: handleError(async payload => auth(payload)),
  //user
  adminLogin: handleError(async payload => adminAuth(payload)),
  //user
  checkToken: handleError(async payload => checktkn(payload)),
  //user
  loadData: handleError(async (token) => loaddata(token)),
  //user
  loadAllData: handleError(async (token) => loadalldata(token)),
  //user
  loadUserLeagues: handleError(async (profileID) => loaduserleagues(profileID)),
  //user
  loadLeagues: handleError(async () => loadleagues()),
  //user
  loadParticipant: handleError(async (profile) => loadparticipant(profile)),
  //user
  newLeague: handleError(async (league) => newleague(league)),
  //user
  getSearchResult: handleError(async (key) => getsearchresult(key)),
  //user
  getUsername: handleError(async (profileID) => getusername(profileID)),
  //user
  joinLeague: handleError(async (profileID, leagueID) => joinleague(profileID, leagueID)),
  //user
  getCurrentMatchday: handleError(async () => getcurrentmatchday()),
  //user
  advanceMatchday: handleError(async () => advanceMD()),
  //asset
  getPlayer: handleError(async id => getplayer(id)),
  //asset
  getPlayers: handleError(async teamID => getplayers(teamID)),
  //asset
  getTeam: handleError(async teamID => getteam(teamID)),
  //asset
  getAllPlayers: handleError(async () => getallplayers()),
  //asset
  getAllTeams: handleError(async () => getallteams()),
  //asset
  getInfo: handleError(async name => getinfo(name)),
  //asset
  getConfig: handleError(async () => getconfig()),
}

async function auth(payload) {
  const res = await axios.post(userURL + "user/auth", payload);
  if (res.data.error == '' && res.data.value.id != '') {
    return res
  }
  return ERROR;
}

async function adminAuth(payload) {
  const res = await axios.post(userURL + "private/auth", payload);
  if (res.data.error == '' && res.data.value.id != '') {
    return res;
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

async function loaduserleagues(profileID) {
  const res = await axios.get(userURL + "leagues/" + profileID);
  if (res.data.error == '') {
    return res.data.value;
  }
  return ERROR;
}

async function loadleagues() {
  const res = await axios.get(userURL + "leagues");
  if (res.data.error == '' && res.data.value != '') {
    return res.data.value;
  }
  return ERROR;
}

async function getsearchresult(key) {
  const res = await axios.get(userURL + "search/" + key);
  if (res.data.error == '' && res.data.value != '') {
    return res.data.value;
  }
  return ERROR;
}

async function joinleague(profileID, leagueID) {
  var parameters = [];
  parameters.push(profileID);
  parameters.push(leagueID);
  const res = await axios.post(userURL + "leagues/join", parameters);
  if (res.data.error == '' && res.data.value != '') {
    return res.data.value;
  }
  return ERROR;
}

async function getusername(profileID) {
  const res = await axios.get(userURL + "users/username/" + profileID);
  if (res.data.error == '' && res.data.value != '') {
    return res.data.value;
  }
  return ERROR;
}

async function loadparticipant(profileID) {
  const res = await axios.get(userURL + "members/" + profileID);
  if (res.data.error == '' && res.data.value != '') {
    return res.data.value;
  }
  return ERROR;
}

async function newleague(league) {
  const res = await axios.post(userURL + "leagues", league);
  if (res.data.error == '' && res.data.value != '') {
    return res.data.value;
  }
  return ERROR;
}

async function checktkn(payload) {
  const res = await axios.post(userURL + "user/checktkn", payload);
  if (res.data.error == '' && res.data.value.id != '') {
    return res.data.value.id;
  }
  return ERROR;
}

async function getplayer(id) {
  const res = await axios.get(assetURL + "players/" + id);
  if (res.data.error == '' && res.data.value.id != '') {
    return res.data.value;
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

async function getteam(teamID) {
  const res = await axios.get(assetURL + "teams/" + teamID);
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
    return res.data.value;
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
  const res = await axios.put(userURL + "users/" + user.id, user);
  return res.data;
}

async function editprofile(profile) {
  const res = await axios.put(userURL + "users/profile/" + profile.id, profile);
  return res.data;
}

function parsename(name) {
  return name.replace(" ", "%20").replace("æ", "ae");
}

async function getinfo(name) {
  var param = parsename(name);
  const URL = 'https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=' + param;
  const res = await axios.get(URL);
  return res.data.player[0];
}

async function advanceMD() {
  const bool = await canAdvance();
  if (bool) {
    await axios.post(userURL + "config/advance");
  }
}

async function getcurrentmatchday() {
  const res = await axios.get(userURL + "config/day")
  return res.data;
}

async function canAdvance() {
  const res = await axios.get(userURL + "config/advance")
  return res.data;
}

async function checkuser(payload) {
  const res = await axios.post(userURL + "authenticate/", payload)
  return res.data;
}

async function checkadmin(admin) {
  const res = await axios.post(userURL + "private/authenticate/", admin);
  return res.data;
}

async function getusers() {
  const res = await axios.get(userURL + "users/");
  return res.data;
}

async function getuserbyusername(username) {
  const res = await axios.get(userURL + "users/" + username);
  return res.data;
}

async function deleteuser(id) {
  const res = await axios.delete(userURL + "users/" + id);
  return res.data;
}

async function registeruser(payload) {
  const ret = await axios.post(userURL + "users/check", payload);
  if (!ret.data.value) {
    const register = await axios.post(userURL + "users/", payload);
    return register;
  }
  return ret;
}

