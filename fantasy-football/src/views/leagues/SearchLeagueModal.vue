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
          {{ "Search and Join a League".toUpperCase() }}
        </v-card-title>
      </v-card>
    </template>
    <SearchLeagueCard
      class="card-mobile high-full"
      :pid="this.$props.profileID"
      @close="close()"
      @insert="insert"
      v-if="dialog && this.$props.profileID"
    />
  </v-dialog>
</template>

<script>
import SearchLeagueCard from "@/views/leagues/SearchLeagueCard.vue";

export default {
  props: ["profileID"],
  components: {
    SearchLeagueCard,
  },
  data: () => ({
    dialog: false,
  }),
  created() {},
  methods: {
    close() {
      this.dialog = false;
    },
    insert: function () {},
  },
};
</script>
