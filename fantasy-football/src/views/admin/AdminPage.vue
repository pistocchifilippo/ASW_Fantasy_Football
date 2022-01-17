<template>
  <v-main>
    <AdminToolbar title="header" />
    <span></span>
    <v-card
      class="mx-auto my-12 centered justify-center mobile-login desktop-login"
    >
      <span class="fill">CURRENT MARCHDAY : {{ current }}</span>
      <v-btn @click="nextMD()" class="fill" text blue color="blue"
        >Avanza giornata
        <v-icon right color="blue">mdi-account</v-icon>
      </v-btn>
    </v-card>
    <SearchUserModal class="seventyfive" />
    <v-footer color="blue" bottom fixed class="justify-center">
      <Footer title="footer" />
    </v-footer>
  </v-main>
</template>
x
<script>
import { api } from "@/helpers/helpers";
import { utils } from "@/helpers/utils";
import Vue from "vue";
import VueCookie from "vue-cookie";
import AdminToolbar from "@/views/toolbar/AdminToolbar.vue";
import Footer from "@/views/toolbar/Footer.vue";
import SearchUserModal from "@/views/user/SearchUserModal.vue";

Vue.use(VueCookie);

export default {
  components: {
    AdminToolbar,
    Footer,
    SearchUserModal,
  },
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = "Admin Page | " + utils.title;
      },
    },
  },
  data: () => ({
    current: 0,
  }),
  created() {
    this.errore = "";
    let token = utils.readToken("pvt_auth");
    if (token.value != "" && token.value != null) {
      api
        .checkToken(token)
        .then(async (id) => {
          if (id == undefined || id == 0) {
            this.$router.push(`/unauthorized`);
          }
          await api.getCurrentMatchday().then((md) => {
            this.current = md.value;
          });
        })
        .catch(() => {
          this.$router.push(`/unauthorized`);
        });
    } else {
      this.$router.push(`/unauthorized`);
    }
  },
  methods: {
    nextMD: async function () {
      await api.advanceMatchday();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.$router.go();
    },
  },
};
</script>