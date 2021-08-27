import axios from 'axios';
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';
import VueCookie from 'vue-cookie';
import User from '@/models/user';
import Token from '@/models/token';

const ERROR = 0;

Vue.use(VueCookie, 
  VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true
  }
});

const vm = new Vue();
const baseURL = 'http://localhost:3000/';

const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    vm.flash(`${error.response}: ${error.data}`, 'error');
});

async function auth(payload) {
  const res = await axios.post(baseURL + "users/auth", payload);
  if(res.data.error == '' && res.data.value.id != ''){
    return res
  }
  return ERROR;
}

async function checktkn(payload) {
  const res = await axios.post(baseURL + "users/checktkn", payload);
  if(res.data.error == '' && res.data.value.id != ''){
    return res.data.value.id;
  }
  return ERROR;
}

async function getuser(id) {
  const res = await axios.get(baseURL + "users/" + id);
  if(res.data.error == '' && res.data.value != ''){
    return res.data.value;
  }  
  return ERROR;
}

export const api = {
  readToken: name => {
    return new Token(Vue.cookie.get(name));
  },
  setToken: (name, value) => {
    Vue.cookie.set(name, value, '60MIN');
  },
  newUser: () => {
    return new User('','','','','');
  },
  fillUser: (user) => {
   return new User(user._id, user.name, user.username, user.email, user.password);
  },
  buildUser(id, name, username, email, password) { return new User(id, name, username, email, password) },
  checkUser: handleError(async payload => {
    const res = await axios.post(baseURL+ "authenticate/", payload)
    return res.data;
  }),
  getUser: handleError(async id => getuser(id)),
  getusers: handleError(async () => {
    const res = await axios.get(baseURL + "users/");
    return res.data;
  }),
  getuserbyusername: handleError(async username => {
    const res = await axios.get(baseURL + "users/" + username);
    return res.data;
  }),
  deleteuser: handleError(async id => {
    const res = await axios.delete(baseURL + "users/" + id);
    return res.data;
  }),
  createuser: handleError(async payload => {
    const res = await axios.post(baseURL + "users/", payload);
    return res.data;
  }),
  updateuser: handleError(async payload => {
    const res = await axios.put(baseURL + "users/" + payload._id, payload);
    return res.data;
  }),
  register: handleError(async payload => {
    const ret = await axios.post(baseURL + "users/check", payload);
    if(!ret.data.value){
      const register = await axios.post(baseURL + "users/register", payload);
      return register;
    }
    return ret;
  }),
  login: handleError(async payload => auth(payload)),
  checkToken: handleError(async payload => checktkn(payload)),
}    

