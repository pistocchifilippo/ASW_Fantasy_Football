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

    </v-container>
    <v-container class="justify-center mb-1">
      <v-row dense>
        <v-col>
          <StatList
            name="pl1"
            @updateLineup="update"
            v-if="
              this.teams.length > 0 &&
              this.user_team.length > 0 &&
              this.lineup.length > 0
            "
            :teams="this.teams"
            :team.sync="this.user_team"
            :lineup.sync="this.lineup"
            :matchDay="this.config.matchDay"
            :profile="this.profile"
          />
        </v-col>
      </v-row>
      <br/>
      <hr class="blue"/>
      <br/>

    </v-container>
    <v-footer color="blue" class="justify-center">
      <Footer title="footer" />
    </v-footer>
  </v-main>
</template>

<script>
import { api } from "@/helpers/helpers";
import { utils } from "@/helpers/utils";
import LoggedToolbar from "@/views/toolbar/LoggedToolbar.vue";
import Footer from "@/views/toolbar/Footer.vue";
import ProfileMenu from "@/views/user/ProfileMenu.vue";
import StatList from "@/views/stats/StatList.vue";

export default {
  components: {
    LoggedToolbar,
    Footer,
    ProfileMenu,
    StatList,
  },
  props: [],
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = "Lineups | " + utils.title;
      },
    },
  },
  data: () => ({
    prov_budget: null,
    user_team: [],
    lineup: [],
    teams: Array,
    temp: Array,
    path: "",
    money: 0,
    isTeam: false,
    sBar: false,
    user: utils.newUser(),
    profile: utils.newProfile(),
    config: utils.newConfig(),
  }),
  created() {
    api.getAllTeams().then((ret) => {
      this.teams = ret;
    });
  },
  beforeMount() {
    let token = utils.readToken("auth");
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
    getPhoto(player) {
      api
        .getPhoto(player.name)
        .then((result) => {
          return result.player[0].strThumb;
        })
        .catch(() => {});
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
    getFlag(player) {
      let nationality = this.teams.filter(
        (team) => team._id == player.team_id
      )[0].shortName;
      return utils.mapTheFlag(nationality);
    },
    getTeam(player) {
      let nationality = this.teams.filter(
        (team) => team._id == player.team_id
      )[0].shortName;
      return nationality;
    },
    remove(player) {
      this.lineup = this.lineup.filter((p) => p._id != player._id);
    },
    update(squad) {
      this.lineup = squad.sort((a, b) =>
        utils.sortLineup(a.position, b.position)
      );
    },
    save: async function (lineup) {
      let pos = this.config.matchDay - 1;
      this.profile.lineups[pos] = lineup;
      var ret = await api.editProfile(this.profile);
      if (ret.value != 0) {
        utils.lineup_saved(this, "success");
      } else {
        utils.lineup_err_saved(this, "error");
      }
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.$router.go();
    },
  },
};
</script>