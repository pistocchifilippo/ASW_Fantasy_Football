<template>
  <v-main>
    <LoggedToolbar v-if="this.user.id" :userid="this.user.id" />
    <v-container>
      <ProfileMenu
        v-if="this.user.id"
        :username="this.user.username"
        :budget="this.profile.budget"
        :score="this.profile.score"
      />
    </v-container>
    <v-card flat class="mx-auto mobile-login desktop-login">
      <v-container fluid>
        <v-row dense>
          <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
            <v-card :to="card.to" dense class="justify-center">
              <v-img
                :to="card.to"
                :src="card.src"
                class="align-end"
                height="200px"
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

    <v-footer color="blue" bottom class="justify-center">
      <Footer title="footer" />
    </v-footer>
  </v-main>
</template>

<script>
import Vue from "vue";
import VueCookie from "vue-cookie";
import { api } from "../helpers/helpers";
import { utils } from "../helpers/utils";
import LoggedToolbar from "@/views/LoggedToolbar.vue";
import ProfileMenu from "@/views/ProfileMenu.vue";
import Footer from "@/views/Footer.vue";

Vue.use(VueCookie);

export default {
  components: {
    LoggedToolbar,
    Footer,
    ProfileMenu,
  },
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = "Main | " + utils.title;
      },
    },
  },
  data: () => ({
    cards: [
      {
        title: "Insert lineups",
        src: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/soccer-ball-sports-stadium-tunnel-allan-swart.jpg",
        flex: 12,
        to: "/lineups",
      },
      {
        title: "Build Your Team",
        src: "https://olympics.nbcsports.com/wp-content/uploads/sites/10/2021/03/GettyImages-1309639270-e1616975233389.jpg?w=893",
        flex: 6,
        to: "/team",
      },
      {
        title: "Profile Settings",
        src: "https://durfeelawgroup.com/wp-content/uploads/2014/09/webview.gif",
        flex: 6,
        to: "/profile",
      },
      {
        title: "Your Leagues",
        src: "https://olympics.nbcsports.com/wp-content/uploads/sites/10/2021/03/GettyImages-1309639270-e1616975233389.jpg?w=893",
        flex: 12,
        to: "/leagues",
      },
    ],
    user: utils.newUser(),
    profile: utils.newProfile(),
  }),
  beforeMount() {
    let token = api.readToken("auth");
    api.loadData(token, this.$router).then((result) => {
      var error = result.error;
      if (error == "") {
        this.user = result.user;
        this.profile = result.profile;
      } else {
        this.$router.push(`/unauthorized`);
      }
    });
  },
  methods: {},
};
</script>