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
import { api } from "../helpers/helpers";
import { utils } from "../helpers/utils";
import Toolbar from "@/views/Toolbar.vue";
import Footer from "@/views/Footer.vue";

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
      cards: [
        {
          title: "FANTASY FOOTBALL",
          src: require("@/assets/ball.svg"),
          flex: 12,
          to: "",
        },
        {
          title: "LOGIN",
          src: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80",
          flex: 6,
          to: "/login",
        },
        {
          title: "REGISTER",
          src: "https://i.pinimg.com/originals/8d/60/00/8d600098f8aaecf7ead5591c26d1f9f3.jpg",
          flex: 6,
          to: "/signon",
        },
      ],
      mySVG: require("@/assets/ball.svg"),
    };
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm("Are you sure?");
      if (!sure) return;
      await api.deleteuser(id);
      this.flash("user deleted sucessfully!", "success");
      const newusers = this.users.filter((user) => user._id !== id);
      this.users = newusers;
    },
  },
  async mounted() {
    this.users = await api.getusers();
  },
};
</script>
