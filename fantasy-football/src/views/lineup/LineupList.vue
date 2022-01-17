<template>
  <v-card flat :key="this.$props.lineup.length">
    <InfoCard
      v-if="this.user_team.length > 0"
      class="seventyfive"
      color="blue"
      text="THIS IS YOUR TEAM!"
    />
    <v-simple-table height="400px" dense fixed-header>
      <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left">Name</th>
          <th class="text-left">Position</th>
          <th :colspan="2" class="text-left">Team</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <LineupRow
        v-if="this.squad.length > 0"
        :players="this.players"
        :teams="this.teams"
        :team.sync="this.user_team"
        :lineup.sync="this.squad"
        @add="update"
      />
    </v-simple-table>
  </v-card>
</template>
<script>

import { utils } from "@/helpers/utils";
import InfoCard from "@/views/user/InfoCard.vue";
import LineupRow from "@/views/lineup/LineupRow.vue";

export default {
  components: {
    InfoCard,
    LineupRow,
  },
  props: ["players", "teams", "team", "lineup", "budget", "flag", "buttons"],
  data: () => ({
    user_team: Array,
    allTeams: Array,
    allPlayers: Array,
    squad: Array,
    money: 0,
    isTeam: false,
    sBar: false,
    btn: false,
  }),
  updated() {
    this.squad = this.$props.lineup;
  },
  created() {
    this.user_team = this.$props.team;
    this.allTeams = this.$props.teams;
    this.allPlayers = this.$props.players;
    this.isTeam = this.$props.flag;
    this.money = this.$props.budget;
    this.btn = this.$props.buttons;
    this.squad = this.$props.lineup;
  },
  methods: {
    update(data){
      this.$emit("updateLineup", data)
    },
    getPlayer(id) {
      let player = this.players.filter((p) => p._id == id)[0];
      return player;
    },
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