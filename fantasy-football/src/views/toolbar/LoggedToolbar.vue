<template>
  <v-toolbar title="toolbar" flat class="blue flex-grow-0">
    <v-toolbar-title color="blue" class="text-uppercase toolbar-title">
      Fantasy Football
    </v-toolbar-title>
    <img :src="mySVG" height="100%" />
    <v-spacer></v-spacer>
    <LoggedToolbarModal v-if="this.user.username!=''" :username="this.user.username" />
    <div
      class="nav-link pr-3 mobile-nav toolbar-element"
      v-for="item in items"
      :key="item.title"
    >
      <router-link
        class="nav-link pr-3 mobile-nav toolbar-element"
        :to="item.to"
      >
        <v-btn
          @click="item.function ? logout() : nothing()"
          text
          rounded
          color="white"
          >{{ item.title }}
          <v-icon right color="white">{{ item.icon }}</v-icon>
        </v-btn>
      </router-link>
    </div>
  </v-toolbar>
</template>

<script>
import { api } from "@/helpers/helpers";
import { utils } from "@/helpers/utils";
import LoggedToolbarModal from "@/views/toolbar/LoggedToolbarModal.vue";

export default {
  components: {
    LoggedToolbarModal,
  },
  title: "Toolbar",
  name: "Toolbar",
  props: ["userid"],
  data: () => ({
    items: [],
    user: utils.newUser(),
    mySVG: require("@/assets/ball.svg"),
  }),
  created() {
    api
      .getUser(this.$props.userid)
      .then((result) => {
        if (result != 0) {
          this.user = utils.fillUser(result);
          this.items = utils.getLoggedItems(this.user.username);
        }
      })
      .catch(() => {
        this.$router.push(`/unauthorized`);
      });
  },
  methods: {
    nothing: function () {},
    logout: async function () {
      utils.removeToken("auth");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.$router.push(`/login`);
    },
  },
};
</script>