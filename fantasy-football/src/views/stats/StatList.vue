<template>
  <v-card flat :key="this.$props.lineup.length">
    <v-simple-table v-if="this.matchday > 0" height="100%" dense fixed-header>
      <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left">Name</th>
          <th class="text-left">Position</th>
          <th :colspan="2" class="text-left">Team</th>
          <th v-for="elem in this.matchday" :key="elem">MD {{ elem }}</th>
        </tr>
      </thead>
      <StatRow
        v-if="this.squad.length > 0"
        :teams="this.teams"
        :team.sync="this.user_team"
        :lineup.sync="this.squad"
        :matchDay="this.matchday"
        :prof="this.prof"
      />
    </v-simple-table>
  </v-card>
</template>
<script>
import StatRow from "@/views/stats/StatRow.vue";

export default {
  components: {
    StatRow,
  },
  props: ["teams", "team", "lineup", "matchDay", "profile"],
  data: () => ({
    user_team: Array,
    allTeams: Array,
    squad: Array,
    matchday: 0,
    prof: 0,
  }),
  created() {
    this.user_team = this.$props.team;
    this.allTeams = this.$props.teams;
    this.squad = this.$props.lineup;
    this.matchday = this.$props.matchDay;
    this.prof = this.$props.profile;
  },
};
</script>