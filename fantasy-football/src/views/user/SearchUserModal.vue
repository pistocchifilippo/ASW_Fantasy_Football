<template>
  <v-dialog
    content-class="search-modal desktop-login mobile-login"
    hide-overlay
    v-model="dialog"
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <v-card
        v-bind="attrs"
        v-on="on"
        flat
        color="red"
        class="pa-0 seventyfive justify-center mobile-login desktop-login"
      >
        <v-card-title class="px-0 justify-center infocard">
          {{ "SEARCH PLAYERS" }}
        </v-card-title>
      </v-card>
    </template>
    <SearchUserCard
      class="card-mobile high-full"
      @close="close()"
      @insert="insert"
    />
  </v-dialog>
</template>

<script>

import SearchUserCard from "@/views/user/SearchUserCard.vue";

export default {
  props: ["profileID"],
  components: {
    SearchUserCard,
  },
  data: () => ({
    dialog: false,
  }),
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
