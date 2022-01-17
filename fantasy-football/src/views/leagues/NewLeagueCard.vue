<template >
  <v-container class="back2 justify-center high-full pt-0 rounded px-0">
    <v-card-title class="px-2 py-2 pt-3 rounded blue infocard">
      <span class="mx-2">START A NEW LEAGUE</span>
      <v-container right class="py-0 px-0 rounded red icon">
        <v-icon @click="close()" class="justify-center" color="white"
          >mdi-close</v-icon
        >
      </v-container>
    </v-card-title>
    <v-col class="px-0 py-6">
      <v-list-item>
        <v-list-item-content class="white rounded">
          <v-list-item-title class="text-h6 ltext">
            <v-text-field
              label="Name"
              v-model="league.name"
              single-line
              class="ma-2 mr-4"
              style="font-family: Guardian Headline"
              prepend-icon="mdi-tournament"
            />
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-text-field
              v-model="league.max_players"
              label="Players"
              class="ma-2 mr-4"
              min="0"
              prepend-icon="mdi-account-group"
              type="number"
          /></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-col>
    <v-container class="half">
      <v-btn class="my-auto px-4 my-6 fill white green--text" @click="insert()">
        Confirm &nbsp;
        <v-icon @click="insert()" class="justify-center" color="green"
          >mdi-check</v-icon
        >
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
import { utils } from "@/helpers/utils";

export default {
  data: () => ({
    dialog: false,
    path: "",
    league: utils.newLeague(),
  }),
  methods: {
    close() {
      this.$emit("close");
    },
    insert() {
      if (this.league.name == "" || this.league.max_players === 0) {
        this.$emit("notify", "err1");
      } else if (this.league.max_players == 1) {
        this.$emit("notify", "err2");
      } else {
        this.$emit("insert", this.league);
      }
      this.$emit("close");
    },
  },
};
</script>
