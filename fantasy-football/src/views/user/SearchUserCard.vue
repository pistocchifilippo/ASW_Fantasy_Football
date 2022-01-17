<template >
  <v-container class="back2 justify-center high-full pt-0 rounded px-0">
    <v-card-title class="blue px-2 py-2 pt-3 rounded infocard">
      <span class="mx-2">SEARCH PLAYERS</span>
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
            <th class="text-left">Player</th>
            <th class="text-left">Username</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <UserRow v-if="loaded" :users="this.users_s" />
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script>
import { api } from "@/helpers/helpers";
import UserRow from "@/views/user/UserRow.vue";

export default {
  data: () => ({
    dialog: false,
    path: "",
    searchKey: "",
    users: [],
    users_s: [],
    loaded: false,
  }),
  components: {
    UserRow,
  },
  created: async function () {
    await api.getUsers().then((result) => {
      this.users = result;
      this.users_s = result;
      this.loaded = true;
    });
  },
  methods: {
    close() {
      this.searchKey = "";
      this.users_s = this.users;
      this.$emit("close");
    },
    search() {
      this.users_s = this.users.filter(
        (element) =>
          element.name.includes(this.searchKey) ||
          element.username.includes(this.searchKey)
      );
    },
    insert() {
      this.$emit("close");
      this.$emit("insert", this.league);
    },
  },
};
</script>
