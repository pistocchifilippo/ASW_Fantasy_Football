<template>
  <tbody v-if="this.matchday > 0">
    <tr v-for="player in this.list" :key="player._id">
      <td class="nopadding">
        <PlayerInfo :player="player" :team="getTeam(player)" />
      </td>
      <td class="nopadding">
        <span class="ristrext">{{ player.name }}</span>
      </td>
      <td class="nopadding">
        <span class="ristrext2">{{ player.position }}</span>
      </td>
      <td class="nopadding">
        <span class="ristrext2">{{ player.nationality }}</span>
      </td>
      <td class="nopadding">
        <img
          class="middle img"
          height="20px"
          :src="require(`@/assets/flags/${getFlag(player)}.png`)"
        />
      </td>
      <td class="" v-for="elem in matchday" :key="elem">
        <span
          class="green--text ristrext2 text--darken-4"
          v-if="
            getLen(profile.lineups[elem - 1]) > 0 &&
            profile.lineups[elem - 1]
              .map((player) => player._id)
              .includes(player._id)
          "
        >
          {{ player.score[elem - 1] }}
        </span>
        <span
          class="red--text"
          v-if="
            getLen(profile.lineups[elem - 1]) == 0 ||
            !profile.lineups[elem - 1]
              .map((player) => player._id)
              .includes(player._id)
          "
        >
          -
        </span>
      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td v-for="elem in matchday" :key="elem">
        <b
          ><span v-if="getLen(profile.lineups[elem - 1]) > 0">
            {{
              profile.lineups[elem - 1]
                .map((player) => player.score[elem - 1])
                .reduce((p, s) => p + s)
            }}
            pts
          </span></b
        >
      </td>
    </tr>
  </tbody>
</template>

<script>
import Vue from "vue";
import { utils } from "@/helpers/utils";
import PlayerInfo from "@/views/players/PlayerInfo.vue";
import Notifications from "vue-notification";

Vue.use(Notifications);

export default {
  props: ["teams", "team", "lineup", "matchDay", "prof"],
  components: {
    PlayerInfo,
  },
  data: () => ({
    pos: [],
    allTeams: Array,
    list: Array,
    squad: Array,
    matchday: 0,
    profile: 0,
  }),
  created() {
    this.allTeams = this.$props.teams;
    this.list = this.$props.team;
    this.squad = this.$props.lineup;
    this.matchday = this.$props.matchDay;
    this.profile = this.$props.prof;
    var i = 0;
     while (i < this.matchDay - 1) {
      this.profile.lineups[i] = this.profile.lineups[i].map((idp) =>
        this.profile.team.find((player) => (player._id == idp))
      );
      i++;
    }
  },
  methods: {
    getFlag(player) {
      let nationality = this.$props.teams.filter(
        (team) => team._id == player.team_id
      )[0].shortName;
      return utils.mapTheFlag(nationality);
    },
    getTeam(player) {
      let nationality = this.$props.teams.filter(
        (team) => team._id == player.team_id
      )[0].shortName;
      return nationality;
    },
    getLen(lineup) {
      var i = 0;
      lineup.forEach((element) => {
        if (element != null) {
          i++;
        }
      });
      return i;
    },
  },
};
</script>
