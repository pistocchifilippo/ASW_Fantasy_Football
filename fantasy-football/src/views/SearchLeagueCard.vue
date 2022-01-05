<template >
  <v-container class="back2 pt-0 rounded px-0">
    <v-card-title class="px-0 blue fill justify-center infocard">
    SEARCH AND JOIN A LEAGUE 
    <v-icon @click="close()" right color="red">mdi-close</v-icon>
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
        />
        <!--         <v-btn class="my-auto px-4 fill white blue--text" @click="search()">
          Search
        </v-btn> -->
      </v-container>
      <v-simple-table
        style="overflow-y: scroll"
        class="mx-4 px-2 mb-2 rounded searchtable"
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
// import { utils } from "../helpers/utils";
import { api } from "../helpers/helpers";
import SearchRow from "@/views/SearchRow.vue";

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
