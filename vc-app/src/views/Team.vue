<template>
  <v-main>
    <LoggedToolbar v-if="this.user.id" :userid="this.user.id" />
    <v-container>
      <ProfileMenu
        v-if="this.user.id"
        :username="this.user.username"
        :budget="this.profile.budget"
        :score="this.profile.score"
      />
      <InfoCard
        v-if="
          this.user_team != undefined &&
          this.infoTheme != '' &&
          this.infoText != ''
        "
        :color.sync="this.infoTheme"
        :text.sync="this.infoText"
        class="half"
      />
    </v-container>
    <v-container>
      <v-row dense>
        <v-col>
          <PlayerList
            name="pl1"
            @save="saveTeam"
            @update="update"
            v-if="
              this.players.length > 0 &&
              this.teams.length > 0 &&
              this.user_team != undefined &&
              this.prov_budget != null
            "
            :players="this.players"
            :teams="this.teams"
            :team.sync="this.user_team"
            :budget="this.prov_budget"
            :flag="true"
            :buttons="true"
          />
        </v-col>
        <v-col>
          <PlayerList
            @update="update"
            v-if="
              this.players.length > 0 &&
              this.teams.length > 0 &&
              this.user_team != undefined &&
              this.prov_budget != null
            "
            :players="this.players"
            :teams="this.teams"
            :team.sync="this.user_team"
            :budget="this.prov_budget"
            :flag="false"
            :buttons="true"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-footer color="blue" bottom class="justify-center">
      <Footer title="footer" />
    </v-footer>
  </v-main>
</template>

<script>
import Vue from "vue";
import VueCookie from "vue-cookie";
import { api } from "../helpers/helpers";
import { utils } from "../helpers/utils";
import LoggedToolbar from "@/views/LoggedToolbar.vue";
import PlayerList from "@/views/PlayerList.vue";
import ProfileMenu from "@/views/ProfileMenu.vue";
import Footer from "@/views/Footer.vue";
import InfoCard from "@/views/InfoCard.vue";
import Notifications from "vue-notification";

Vue.use(VueCookie);
Vue.use(Notifications);

export default {
  components: {
    LoggedToolbar,
    Footer,
    ProfileMenu,
    InfoCard,
    PlayerList,
  },
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = "Market | " + utils.title;
      },
    },
  },
  data: () => ({
    prov_budget: null,
    dialog: false,
    user_team: [],
    teams: [],
    players: [],
    user: utils.newUser(),
    profile: utils.newProfile(),
    loaded: false,
    temp: utils.newProfile(),
    key1: 0,
    infoTheme: "",
    infoText: "",
  }),
  created() {
    api.getAllTeams().then((ret) => {
      this.teams = ret;
      api.getAllPlayers().then((ret) => {
        this.players = ret
          .filter((p) => p.role == "PLAYER")
          .sort((a, b) => this.sortPlayers(a, b));
      });
    });
  },
  beforeMount() {
    let token = api.readToken("auth");
    api.loadAllData(token, this.$router).then((result) => {
      var error = result.error;
      if (error == "") {
        this.user = result.user;
        this.profile = result.profile;
        this.profile.team
          .sort((a, b) => this.sortTeam(a, b))
          .forEach((player) => {
            this.user_team.push(player);
          });
        if (utils.isTeamComplete(this.user_team) == true) {
          this.infoTheme = "success";
          this.infoText = "YOUR TEAM IS COMPLETE!!";
        } else {
          this.infoTheme = "error";
          this.infoText = "YOUR TEAM IS NOT COMPLETE";
        }
        this.prov_budget = this.profile.budget;
        this.config = result.config;
        this.lineup = this.profile.lineups[this.config.matchDay - 1];
        if (utils.isLineupEmpty(this.lineup)) {
          this.lineup = utils.initialLineup(this.user_team);
        }
      } else {
        this.$router.push(`/unauthorized`);
      }
    });
  },
  methods: {
    getTeam(player) {
      let nationality = this.teams.filter(
        (team) => team._id == player.team_id
      )[0].shortName;
      return nationality;
    },
    getPlayer(id) {
      let player = this.players.filter((p) => p._id == id)[0];
      return player;
    },
    update(money, team) {
      this.prov_budget = parseFloat(money.toFixed(2));
      this.user_team = team.sort((a, b) => this.sortTeam(a, b));
    },
    sortTeam(a, b) {
      var ret = utils.sortTeam(
        this.getTeam(a),
        this.getTeam(b),
        a.position,
        b.position
      );
      return ret;
    },
    sortPlayers(a, b) {
      var ret = utils.sort(
        this.getTeam(a),
        this.getTeam(b),
        a.position,
        b.position
      );
      return ret;
    },
    saveTeam: async function (team) {
      this.profile.budget = parseFloat(this.prov_budget.toFixed(2));
      this.profile.team = team;
      var ret = await api.editProfile(this.profile);
      if (ret.value != 0) {
        utils.confirm_save_not(this, "success");
      } else {
        utils.failure_save_not(this, "error");
      }
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.$router.go();
    },
  },
};
</script>