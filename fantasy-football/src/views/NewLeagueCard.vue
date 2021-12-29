<template >
  <v-card class="back2 mx-auto" tile>
    <v-card-title class="px-0 blue justify-center infocard">
      {{ "Start a new League".toUpperCase() }}
    </v-card-title>
    <v-col class="pr-0">
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
              prepend-icon="mdi-account-group"
              type="number"
          /></v-list-item-subtitle>
        </v-list-item-content>
        <v-col class="ltext fill pr-0">
          <v-card-actions class="pa-2 fill" right>
            <v-btn class="mx-auto green--text fill" @click="insert()"
              >Insert</v-btn
            >
          </v-card-actions>
          <v-card-actions class="pa-2" right>
            <v-btn class="mx-auto red--text fill" @click="close()">Close</v-btn>
          </v-card-actions>
        </v-col>
      </v-list-item>
    </v-col>
  </v-card>
</template>

<script>
import { utils } from "../helpers/utils";
//import { api } from "../helpers/helpers";

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
      this.$emit("close");
      this.$emit("insert", this.league);
    },
  },
};
</script>
