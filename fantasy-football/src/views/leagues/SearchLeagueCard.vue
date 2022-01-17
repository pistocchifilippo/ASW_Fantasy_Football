<template >
  <v-container class="back2 justify-center high-full pt-0 rounded px-0">
    <v-card-title class="blue px-2 py-2 pt-3 rounded infocard">
      <span class="mx-2">SEARCH AND JOIN A LEAGUE</span>
      <v-container right class="py-0 px-0 rounded red icon">
        <v-icon @click="close()" class="justify-center" color="white"
          >mdi-close</v-icon
        >
      </v-container>
    </v-card-title>
    <v-card class="mx-auto transparent" tile>
      <v-container class="searchbar">
        <v-text-field
          label="Search"
          v-model="searchKey"
          single-line
          class="mx-auto px-4 pt-2 fill white rounded"
          style="font-family: Guardian Headline"
          :append-icon="'mdi-magnify'"
          @click:append="search()"
        />
      </v-container>
      <v-simple-table
        style="overflow-y: scroll"
        class="mx-4 high-350 px-2 mb-2 rounded"
        dense
        fixed-header
      >
        <thead>
          <tr>
            <th class="text-left">League</th>
            <th class="text-left">Admin</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <SearchRow
          v-if="loaded && this.$props.pid"
          :pid="this.$props.pid"
          :pl="this.leagues"
        />
      </v-simple-table>
      <!--       <v-container class="searchbar mx">
        <v-btn class="my-auto px-4 fill white red--text" @click="close()">
          Close
        </v-btn> 
      </v-container> -->
    </v-card>
  </v-container>
</template>

<script>
import { api } from "@/helpers/helpers";
import SearchRow from "@/views/search/SearchRow.vue";

export default {
  props: ["pid"],
  data: () => ({
    dialog: false,
    path: "",
    searchKey: "",
    leagues: [],
    loaded: false,
  }),
  components: {
    SearchRow,
  },
  methods: {
    close() {
      this.$emit("close");
    },
    search() {
      this.loaded = false;
      this.leagues = [];
      api.getSearchResult(this.searchKey).then((result) => {
        this.leagues = result;
        this.loaded = true;
      });
    },
    insert() {
      this.$emit("close");
      this.$emit("insert", this.league);
    },
  },
};
</script>
