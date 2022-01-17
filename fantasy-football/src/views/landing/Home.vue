<template>
  <v-main>
    <Toolbar title="header" />
    <v-card flat class="mx-auto mobile-login desktop-login">
      <v-container fluid>
        <v-row dense>
          <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
            <v-card flat :to="card.to" dense class="justify-center">
              <v-img
                :to="card.to"
                :src="card.src"
                class="align-end"
                height="100%"
              ></v-img>
              <v-card-title
                class="main justify-center"
                color="black"
                v-text="card.title"
              ></v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-footer color="blue" app bottom fixed class="justify-center">
      <Footer title="footer" />
    </v-footer>
  </v-main>
</template>

<script>
import { api } from "@/helpers/helpers";
import { utils } from "@/helpers/utils";
import Toolbar from "@/views/toolbar/Toolbar.vue";
import Footer from "@/views/toolbar/Footer.vue";

export default {
  components: {
    Toolbar,
    Footer,
  },
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = "Welcome | " + utils.title;
      },
    },
  },
  name: "users",
  data() {
    return {
      users: [],
      cards: utils.getHomeCards(),
      mySVG: require("@/assets/ball.svg"),
    };
  },
  methods: {},
  async mounted() {
    this.users = await api.getUsers();
  },
};
</script>
