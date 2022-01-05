<template>
  <tbody v-if="this.matchday > 0">
    <tr v-for="player in this.list" :key="player._id">
      <td>
        <PlayerInfo :player="player" :team="getTeam(player)" />
      </td>
      <td>{{ player.name }}</td>
      <td>{{ player.position }}</td>
      <td>{{ player.nationality }}</td>
      <td>
        <img
          class="middle"
          height="20px"
          :src="require(`../assets/flags/${getFlag(player)}.png`)"
        />
      </td>
      <td v-for="elem in matchday" :key="elem">
        <span class="green--text text--darken-4"
          v-if="
            profile.lineups[elem - 1]
              .map((player) => player._id)
              .includes(player._id)
          "
        >
          {{ player.score[elem - 1] }}
        </span>
        <span class="red--text"
          v-if="
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
        <b><span>
          {{
            profile.lineups[elem - 1]
              .map((player) => player.score[elem - 1])
              .reduce((p, s) => p + s)
          }}
          pts
        </span></b>
      </td>
    </tr>
  </tbody>
</template>

<script>
import Vue from "vue";
import { utils } from "../helpers/utils";
import PlayerInfo from "@/views/PlayerInfo.vue";
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
  },
};
</script>
