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
import { api } from "@/helpers/helpers";
import { utils } from "@/helpers/utils";
import LoggedToolbar from "@/views/toolbar/LoggedToolbar.vue";
import ProfileMenu from "@/views/user/ProfileMenu.vue";
import Footer from "@/views/toolbar/Footer.vue";

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
    cards: utils.getMainCards(),
    user: utils.newUser(),
    profile: utils.newProfile(),
  }),
  beforeMount() {
    let token = utils.readToken("auth");
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