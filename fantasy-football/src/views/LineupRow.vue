<template>
  <tbody :key="this.$props.lineup.length">
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
      <td>
        <v-btn
          v-if="squad.map((p) => p._id).includes(player._id) == false"
          @click="add(player)"
          text
          color="success"
        >
          Add to lineup
          <v-icon right color="success">mdi-account-minus</v-icon>
        </v-btn>
        <!--         <v-btn v-else @click="remove(player)" text color="orange">
          Remove
          <v-icon right color="orange">mdi-account-minus</v-icon>
        </v-btn> -->
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
  props: ["players", "teams", "team", "lineup"],
  components: {
    PlayerInfo,
  },
  data: () => ({
    pos: [],
    allPlayers: Array,
    allTeams: Array,
    list: Array,
    squad: Array,
  }),
  updated() {
    this.squad = this.$props.lineup;
  },
  created() {
    this.allPlayers = this.$props.players;
    this.allTeams = this.$props.teams;
    this.list = this.$props.team;
    this.squad = this.$props.lineup;
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
    add(player) {
      var temp = [...this.squad];
      if (!utils.isLineupComplete(temp)) {
        temp.push(player);
        this.$emit("add", temp);
      } else {
        utils.failure_add(this, "error");
      }
    },
  },
};
</script>
