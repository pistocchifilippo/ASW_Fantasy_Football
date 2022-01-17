<template>
  <v-toolbar title="toolbar" flat class="blue flex-grow-0">
    <v-toolbar-title color="blue" class="text-uppercase toolbar-title">
      Fantasy Football
    </v-toolbar-title>
    <img :src="mySVG" height="100%" />
    <v-spacer></v-spacer>
    <div right class="nav-link pr-3 toolbar-element">
      <v-btn text @click="logout()" rounded color="white"
        >LOGOUT
        <v-icon right color="white">mdi-logout-variant</v-icon>
      </v-btn>
    </div>
  </v-toolbar>
</template>

<script>
import { utils } from "@/helpers/utils";

export default {
  title: "Toolbar",
  name: "Toolbar",
  props: ["userid"],
  data: () => ({
    user: utils.newUser(),
    mySVG: require("@/assets/ball.svg"),
  }),
  methods: {
    logout: async function () {
      utils.removeToken("pvt_auth");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.$router.push(`/login`);
    },
  },
};
</script>