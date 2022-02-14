<template>
  <v-dialog
    v-model="dialog"
    persistent
    content-class="search-modal high-350 desktop-login mobile-login"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-card
        v-bind="attrs"
        v-on="on"
        flat
        color="green"
        class="pa-0 seventyfive justify-center mobile-login desktop-login"
      >
        <v-card-title class="px-0 justify-center infocard">
          {{ "Start a new League".toUpperCase() }}
        </v-card-title>
      </v-card>
    </template>
    <NewLeagueCard
      class="high-full card-mobile"
      @close="close()"
      @notify="notify"
      @insert="insert"
      v-if="dialog"
    />
  </v-dialog>
</template>

<script>
import { api } from "@/helpers/helpers";
import NewLeagueCard from "@/views/leagues/NewLeagueCard.vue";

export default {
  props: ["profileID"],
  components: {
    NewLeagueCard,
  },
  data: () => ({
    dialog: false,
  }),
  created() {},
  methods: {
    notify: function (param) {
      this.$emit("notify", param);
    },
    close() {
      this.dialog = false;
    },
    insert: function (league) {
      league.admin = this.$props.profileID;
      league.players.push(this.$props.profileID);
      api.newLeague(league).then(() => {
        this.$emit("notify", "ok");
      });
    },
  },
};
</script>
