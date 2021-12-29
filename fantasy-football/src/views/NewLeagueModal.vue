<template>
  <v-dialog v-model="dialog" persistent max-width="350">
    <template v-slot:activator="{ on, attrs }">
      <!--<InfoCard
        class="half"
        color="green"
        :text="'Start a new League!'"
        v-bind="attrs"
        v-on="on"
      /> -->
      <v-card
        v-bind="attrs"
        v-on="on"
        flat
        color="green"
        class="pa-0 half justify-center mobile-login desktop-login"
      >
        <v-card-title class="px-0 justify-center infocard">
          {{ "Start a new League".toUpperCase() }}
        </v-card-title>
      </v-card>
    </template>
    <NewLeagueCard @close="close()" @insert="insert" v-if="dialog" />
  </v-dialog>
</template>

<script>
import { api } from "../helpers/helpers";

import NewLeagueCard from "@/views/NewLeagueCard.vue";
/* import InfoCard from "@/views/InfoCard.vue";
 */
export default {
  props: ["profileID"],
  components: {
    NewLeagueCard,
    /*     InfoCard,
     */
  },
  data: () => ({
    dialog: false,
  }),
  created() {
  },
  methods: {
    close() {
      this.dialog = false;
    },
    insert: function (league) {
      league.admin = this.$props.profileID;
      league.players.push(this.$props.profileID);
      api.newLeague(league).then(() => {
        this.$router.go();
      });
    },
  },
};
</script>
