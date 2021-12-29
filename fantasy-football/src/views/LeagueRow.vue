<template>
  <tbody class="striped1" :key="this.$props.pl.length">
    <tr v-for="(player, index) in this.players" :key="player.id">
      <td>{{ player.username }}</td>
      <td>{{ player.score }}</td>
      <td>{{ getPosition(index) }}</td>
    </tr>
  </tbody>
</template>

<script>
import Vue from "vue";

import { api } from "../helpers/helpers";
import { utils } from "../helpers/utils";
import Notifications from "vue-notification";

Vue.use(Notifications);

export default {
  props: ["pl"],
  data: () => ({
    players: [],
  }),
  created() {
    this.$props.pl.forEach((player) => {
      api.loadParticipant(player).then((participant) => {
        this.players.push(participant);
        this.players = this.players.sort((a, b) => this.sortTable(a, b));
      });
    });
  },
  methods: {
    sortTable(a, b) {
      return utils.sortTable(a, b);
    },
    getPosition(pos) {
      return utils.getPosition(pos);
    },
  },
};
</script>
