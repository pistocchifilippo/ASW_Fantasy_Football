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
          this.user_team.length > 0 &&
          this.infoTheme != '' &&
          this.infoText != ''
        "
        :color.sync="this.infoTheme"
        :text.sync="this.infoText"
        class="half"
      />
    </v-container>
    <v-container class="justify-center mb-1">
      <v-row dense>
        <v-col>
          <LineupList
            name="pl1"
            @updateLineup="update"
            v-if="
              this.players.length > 0 &&
              this.teams.length > 0 &&
              this.user_team.length > 0 &&
              this.lineup.length > 0
            "
            :teams="this.teams"
            :team.sync="this.user_team"
            :lineup.sync="this.lineup"
          />
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-card
          v-if="this.lineup.length > 0"
          flat
          dense
          class="mobile-lineup desktop-field pa-0 field"
        >
          <FieldRow class="ma-0" :positions="[]" />
          <FieldRow
            class="ma-0"
            :positions="[2, 4]"
            :players="this.lineup.slice(1, 2).concat(this.lineup.slice(8, 9))"
          />
          <FieldRow
            class="ma-0"
            :positions="[3]"
            :players="this.lineup.slice(5, 6)"
          />
          <FieldRow
            class="ma-0"
            :positions="[2]"
            :players="this.lineup.slice(2, 3)"
          />
          <FieldRow
            class="ma-0 field-row-central"
            :positions="[1, 3, 4]"
            :players="
              this.lineup
                .slice(0, 1)
                .concat(this.lineup.slice(6, 7))
                .concat(this.lineup.slice(9, 10))
            "
          />
          <FieldRow
            class="ma-0"
            :positions="[2]"
            :players="this.lineup.slice(3, 4)"
          />
          <FieldRow
            class="ma-0"
            :positions="[3]"
            :players="this.lineup.slice(7, 8)"
          />
          <FieldRow
            class="ma-0"
            :positions="[2, 4]"
            :players="this.lineup.slice(4, 5).concat(this.lineup.slice(10, 11))"
          />
          <FieldRow class="ma-0" :positions="[]" />
        </v-card>
        <LineupPlayers
          v-if="this.lineup.length > 0"
          :lineup="this.lineup"
          :teams="this.teams"
          @remove="remove"
          @saveLineup="save"
          class="desktop-lineup"
        />
      </v-row>
    </v-container>
    <v-footer color="blue" class="justify-center">
      <Footer title="footer" />
    </v-footer>
  </v-main>
</template>

<script>
import { api } from "../helpers/helpers";
import { utils } from "../helpers/utils";
import LoggedToolbar from "@/views/LoggedToolbar.vue";
import Footer from "@/views/Footer.vue";
import ProfileMenu from "@/views/ProfileMenu.vue";
import LineupList from "@/views/LineupList.vue";
import InfoCard from "./InfoCard.vue";
import LineupPlayers from "./LineupPlayers.vue";
import FieldRow from "./FieldRow.vue";

export default {
  components: {
    LoggedToolbar,
    Footer,
    ProfileMenu,
    LineupList,
    InfoCard,
    LineupPlayers,
    FieldRow,
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
    players: Array,
    temp: Array,
    path: "",
    money: 0,
    isTeam: false,
    sBar: false,
    user: utils.newUser(),
    profile: utils.newProfile(),
    config: utils.newConfig(),
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
    getPhoto(player) {
      api
        .getPhoto(player.name)
        .then((result) => {
          console.log(result.player[0].strThumb);
          return result.player[0].strThumb;
        })
        .catch(() => {});
    },
    getPlayer(id) {
      let player = this.players.filter((p) => p._id == id)[0];
      return player;
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
      console.log(this.lineup.length);
      console.log("removed", player);
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