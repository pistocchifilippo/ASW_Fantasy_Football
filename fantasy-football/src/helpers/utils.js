import md5 from 'js-md5'
import Vue from 'vue';
import User from '@/models/user';
import League from '@/models/league';
import Config from '@/models/config';
import Profile from '@/models/profile';
import VueCookie from 'vue-cookie';
import Token from '@/models/token';

const handleError = fn => (...params) => fn(...params);

function Params(first, second, third) {
  this.first = first;
  this.second = second;
  this.third = third;
}

Vue.use(VueCookie);

function get_params(param) {
  var ret = new Params("", "", "")
  switch (param) {
    case 'err1':
      ret.first = "Some data are missing"
      ret.second = "Please insert a valid name and a max of players"
      ret.third = "error"
      break;
    case 'err2':
      ret.first = "You can't play alone..."
      ret.second = "Invite some friends!"
      ret.third = "error"
      break;
    case 'ok':
      ret.first = "League created successfully..."
      ret.second = "Now you can invite your friends!"
      ret.third = "success"
      break;
    default:
      ret.first = ""
      ret.second = ""
      ret.third = "error"
      break;
  }
  return ret
}

export const utils = {

  title: 'Fantasy Football',

  readToken(name) {
    return new Token(Vue.cookie.get(name));
  },

  setToken(name, value) {
    Vue.cookie.set(name, value, 1);
  },

  removeToken(name) {
    Vue.cookie.delete(name)
  },

  cryptoMD5: handleError(payload => {
    payload.password = md5(payload.password);
    return payload;
  }),

  join_not(obj, league, type) {
    obj.$notify({
      type: type,
      group: "notify",
      title: "You joined " + league + "!"
    });
  },

  join_err(obj, league, type) {
    obj.$notify({
      type: type,
      group: "notify",
      title: "Impossible to join " + league + "!",
      text: "Try again later",
    });
  },

  sell_not(obj, player, type) {
    obj.$notify({
      type: type,
      group: "notify",
      title: "You sold " + player.name + " (" + obj.getTeam(player) + ")",
      text: "You gained " + player.value + " credits",
    });
  },

  not_insert(obj, param) {
    var params = get_params(param);
    obj.$notify({
      type: params.third,
      group: "notify",
      title: params.firs,
      text: params.second,
    });
  },

  notificate(obj, type, title, text = "") {
    obj.$notify({
      type: type,
      group: "notify",
      title: title,
      text: text,
    });
  },

  lineup_saved(obj, type) {
    obj.$notify({
      type: type,
      group: "notify",
      title: "Lineup saved successfully",
      text: "",
    });
  },


  lineup_err_saved(obj, type) {
    obj.$notify({
      type: type,
      group: "notify",
      title: "Your lineup has not been updated",
      text: "",
    });
  },

  confirm_save_not(obj, type) {
    obj.$notify({
      type: type,
      group: "notify",
      title: "Team saved successfully",
      text: "",
    });
  },

  failure_save_not(obj, type) {
    obj.$notify({
      type: type,
      group: "notify",
      title: "Your team has not been updated",
      text: "Try again please",
    });
  },

  failure_purchase(obj, type) {
    obj.$notify({
      type: type,
      group: "notify",
      title: "Your purchase cannot be processed!",
      text: "Maybe your team is full on that role...",
    });
  },

  purchase_not(obj, player, type) {
    obj.$notify({
      type: type,
      group: "notify",
      title: "You bought " + player.name + " (" + obj.getTeam(player) + ")",
      text: "It costed you " + player.value + " credits",
    });
  },

  failure_add(obj, type) {
    obj.$notify({
      type: type,
      group: "notify",
      title: "Player cannot be added!",
      text: "Maybe your lineup is full on that role...",
    });
  },

  failure_save(obj, type) {
    obj.$notify({
      type: type,
      group: "notify",
      title: "Lineup cannot be saved!",
      text: "Maybe your lineup is not complete...",
    });
  },

  getInitials(name) {
    var ret = "";
    name.split(" ").forEach(element => {
      ret += element.charAt(0);
    });
    return ret;
  },

  getRoleInitial(role) {
    return Array.from(role)[0];
  },

  initialLineup(team) {
    var gk = team.filter((player) => player.position == 'Goalkeeper').slice(0, 1);
    var df = team.filter((player) => player.position == 'Defender').slice(0, 4);
    var mf = team.filter((player) => player.position == 'Midfielder').slice(0, 3);
    var at = team.filter((player) => player.position == 'Attacker').slice(0, 3);
    return gk.concat(df).concat(mf).concat(at);
  },

  isLineupEmpty(lineup) {
    return (lineup.filter((p) => p != null).length == 0);
  },

  newUser: () => { return new User('', '', '', '', ''); },

  fillUser: (user) => { return new User(user._id, user.name, user.username, user.email, user.password); },

  buildUser(id, name, username, email, password) { return new User(id, name, username, email, password) },

  newProfile: () => { return new Profile('', '', '', '', '', Array(7)); },

  fillProfile: (profile) => { return new Profile(profile._id, profile.userID, profile.budget, profile.score, profile.team, profile.lineups); },

  buildProfile(id, userID, budget, score, team, lineups) { return new Profile(id, userID, budget, score, team, lineups) },

  newConfig: () => { return new Config('', '', '', '', ''); },

  fillConfig: (config) => { return new Config(config._id, config.initialBudget, config.initialScore, config.matchDay, config.modules); },

  buildConfig(id, initialBudget, initialScore, matchday, modules) { return new Profile(id, initialBudget, initialScore, matchday, modules) },

  newLeague: () => { return new League('', '', Array(), '', 0); },

  fillLeague: (league) => { return new League(league._id, league.participants, league.name, league.admin, league.max_players); },

  mapTheRole(position) {
    switch (position) {
      case 'Goalkeeper':
        return 1;
      case 'Defender':
        return 2;
      case 'Midfielder':
        return 3;
      case 'Attacker':
        return 4;
    }
  },

  countRole(team, role) {
    return team.filter((player) => player.position == role).length;
  },

  getMainCards() {
    return [
      {
        title: "Insert lineups",
        src: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/soccer-ball-sports-stadium-tunnel-allan-swart.jpg",
        flex: 6,
        to: "/lineups",
      },
      {
        title: "Build Your Team",
        src: "https://olympics.nbcsports.com/wp-content/uploads/sites/10/2021/03/GettyImages-1309639270-e1616975233389.jpg?w=893",
        flex: 6,
        to: "/team",
      },
      {
        title: "Your Leagues",
        src: "https://staticfanpage.akamaized.net/wp-content/uploads/sites/27/2021/06/GettyImages-1324550677-1024x683.jpg",
        flex: 6,
        to: "/leagues",
      },
      {
        title: "Stats",
        src: "https://img.ilgcdn.com/sites/default/files/styles/xl/public/foto/stadio_vuoto.jpg?_=1582637862",
        flex: 6,
        to: "/stats",
      },
      {
        title: "Profile Settings",
        src: "https://durfeelawgroup.com/wp-content/uploads/2014/09/webview.gif",
        flex: 12,
        to: "/profile",
      },
    ]
  },

  getToolbarItems() {
    return [
      {
        title: "Home",
        to: "/",
        icon: "mdi-home",
        mobile_icon: "mdi-home-variant",
      },
      {
        title: "Login",
        to: "/login",
        icon: "mdi-account",
        mobile_icon: "mdi-account-outline",
      },
      {
        title: "Sign-Up",
        to: "/signon",
        icon: "mdi-account-plus",
        mobile_icon: "mdi-account-plus-outline",
      },
/*       {
        title: "Admin",
        to: "/private/login",
        icon: "mdi-account-plus",
        mobile_icon: "mdi-account-plus-outline",
      }, */
    ]
  },

  getLoggedItems(username) {
    return [
      {
        title: username,
        to: "/profile",
        icon: "mdi-cog-outline",
        mobile_icon: "mdi-cog-outline",
        function: false
      },
      {
        title: "Your Team",
        to: "/team",
        icon: "mdi-account-group",
        mobile_icon: "mdi-account-group-outline",
        function: false
      },
      {
        title: "Home",
        to: "/main",
        icon: "mdi-home",
        mobile_icon: "mdi-home-variant",
        function: false
      },
      {
        title: "Logout",
        to: "",
        icon: "mdi-logout-variant",
        mobile_icon: "mdi-logout-variant",
        function: true
      }
    ]
  },

  getHomeCards() {
    return [
      {
        title: "FANTASY FOOTBALL",
        src: require("@/assets/ball.svg"),
        flex: 12,
        to: "",
      },
      {
        title: "LOGIN",
        src: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80",
        flex: 6,
        to: "/login",
      },
      {
        title: "REGISTER",
        src: "https://i.pinimg.com/originals/8d/60/00/8d600098f8aaecf7ead5591c26d1f9f3.jpg",
        flex: 6,
        to: "/signon",
      },
    ]
  },

  colorRole(i) {
    switch (i) {
      case 1:
        return 'yellow'
      case 2:
        return 'orange'
      case 3:
        return 'blue'
      case 4:
        return 'red'
      default:
        return 'grey';
    }
  },

  checkTeam(team) {
    var gk = this.countRole(team, 'Goalkeeper');
    var df = this.countRole(team, 'Defender');
    var mf = this.countRole(team, 'Midfielder');
    var at = this.countRole(team, 'Attacker');
    return ((gk <= 3) && (df <= 8) && (mf <= 8) && (at <= 6));
  },

  isTeamComplete(team) {
    var gk = team.filter((player) => player.position == 'Goalkeeper').length;
    var df = team.filter((player) => player.position == 'Defender').length;
    var mf = team.filter((player) => player.position == 'Midfielder').length;
    var at = team.filter((player) => player.position == 'Attacker').length;
    return ((gk == 3) && (df == 8) && (mf == 8) && (at == 6));
  },

  checkLineup(lineup) {
    var gk = this.countRole(lineup, 'Goalkeeper');
    var df = this.countRole(lineup, 'Defender');
    var mf = this.countRole(lineup, 'Midfielder');
    var at = this.countRole(lineup, 'Attacker');
    return ((gk <= 3) && (df <= 8) && (mf <= 8) && (at <= 6));
  },

  isLineupComplete(lineup) {
    var gk = lineup.filter((player) => player.position == 'Goalkeeper').length;
    var df = lineup.filter((player) => player.position == 'Defender').length;
    var mf = lineup.filter((player) => player.position == 'Midfielder').length;
    var at = lineup.filter((player) => player.position == 'Attacker').length;
    return ((gk == 1) && (df == 4) && (mf == 3) && (at == 3));
  },

  sort(teamA, teamB, posA, posB) {
    if (teamA.localeCompare(teamB) != 0) {
      return teamA.localeCompare(teamB);
    } else {
      if (this.mapTheRole(posA) < this.mapTheRole(posB)) {
        return -1;
      } else if (this.mapTheRole(posA) == this.mapTheRole(posB)) {
        return 1;
      }
      return 0;
    }
  },

  sortLineup(posA, posB) {
    if (this.mapTheRole(posA) < this.mapTheRole(posB)) {
      return -1;
    } else if (this.mapTheRole(posB) < this.mapTheRole(posA)) {
      return 1;
    } else {
      return 0;
    }
  },

  sortTeam(teamA, teamB, posA, posB) {
    if (this.mapTheRole(posA) < this.mapTheRole(posB)) {
      return -1;
    } else if (this.mapTheRole(posB) < this.mapTheRole(posA)) {
      return 1;
    } else {
      if (teamA.localeCompare(teamB) != 0) {
        return teamA.localeCompare(teamB)
      } else if (this.mapTheRole(posA) == this.mapTheRole(posB)) {
        return 1;
      }
      return 0;
    }
  },

  getPosition(pos) {
    pos++
    if (pos == 1) return "1st"
    else if (pos == 2) return "2nd"
    else if (pos == 3) return "3rd"
    else return pos + "th"
  },

  sortTable(playerA, playerB) {
    if (playerA.score >= playerB.score) {
      return -1;
    } else {
      return 1;
    }
  },

  mapTheFlag(nationality) {
    switch (nationality) {
      case 'Austria':
        return 'AUT'
      case 'Belgium':
        return 'BEL'
      case 'Croatia':
        return 'CRO'
      case 'Czech Republic':
        return 'CZE'
      case 'Denmark':
        return 'DEN'
      case 'England':
        return 'ENG'
      case 'Spain':
        return 'ESP'
      case 'Finland':
        return 'FIN'
      case 'France':
        return 'FRA'
      case 'Germany':
        return 'GER'
      case 'Hungary':
        return 'HUN'
      case 'Italy':
        return 'ITA'
      case 'Macedonia':
        return 'MKD'
      case 'Netherlands':
        return 'NED'
      case 'Poland':
        return 'POL'
      case 'Portugal':
        return 'POR'
      case 'Russia':
        return 'RUS'
      case 'Scotland':
        return 'SCO'
      case 'Switzerland':
        return 'SUI'
      case 'Slovakia':
        return 'SVK'
      case 'Sweden':
        return 'SWE'
      case 'Turkey':
        return 'TUR'
      case 'Ukraine':
        return 'UKR'
      case 'Wales':
        return 'WAL'
      default:
        return 'ITA';
    }
  },

  emptyTeamErr() {
    return 'YOUR TEAM IS EMPTY!';
  }

};
