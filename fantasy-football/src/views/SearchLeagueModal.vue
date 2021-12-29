<template>
  <v-dialog v-model="dialog" persistent max-width="350">
    <template v-slot:activator="{ on, attrs }">
      <v-card
        v-bind="attrs"
        v-on="on"
        flat
        color="red"
        class="pa-0 half justify-center mobile-login desktop-login"
      >
        <v-card-title class="px-0 justify-center infocard">
          {{ "Search and Join a League".toUpperCase() }}
        </v-card-title>
      </v-card>
    </template>
    <SearchLeagueCard :pid="this.$props.profileID" @close="close()" @insert="insert" v-if="dialog && this.$props.profileID" />
  </v-dialog>
</template>

<script>
/* import { api } from "../helpers/helpers";
 */
import SearchLeagueCard from "@/views/SearchLeagueCard.vue";
/* import InfoCard from "@/views/InfoCard.vue";
 */
export default {
  props: ["profileID"],
  components: {
    SearchLeagueCard,
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
    insert: function () {
/*       league.admin = this.$props.profileID;
      league.players.push(this.$props.profileID);
      api.newLeague(league).then(() => {
        this.$router.go();
      }); */
    },
  },
};
</script>
