<template>
  <v-main>
    <Toolbar title="header" />
    <v-card class="mx-auto my-12 mobile-login desktop-login">
      <v-form
        id="loginForm"
        v-model="isFormValid"
        name="login"
        @submit.prevent="handleLogin"
      >
        <v-card-title
          flat
          class="myfont justify-center mobile-title desktop-title"
        >
          Fantasy Football
        </v-card-title>
        <v-card-title
          class="myfont justify-center mobile-subtitle desktop-subtitle"
        >
          Create you team. <br />Join a league. <br />Support your Champions!
        </v-card-title>

        <v-card-text class="justify-center">
          <v-text-field
            v-model="user.username"
            :rules="required"
            hide-details="auto"
            label="Username"
            style="font-family: Guardian Headline"
            prepend-icon="mdi-account-circle"
          />
          <v-text-field
            v-model="user.password"
            label="Password"
            style="font-family: Guardian Headline"
            :rules="required"
            prepend-icon="mdi-lock"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-card-text>
        <v-card-actions class="justify-center card-mobile">
          <v-btn
            :disabled="!isFormValid"
            type="submit"
            form="loginForm"
            class="button-mobile button-desktop"
            style="font-family: Guardian Headline"
            color="success"
          >
            Login
          </v-btn>
        </v-card-actions>
        <v-card-title class="error-card justify-center" flat>{{
          this.errore
        }}</v-card-title>
        <v-divider></v-divider>
        <v-card-title
          flat
          class="justify-center"
          style="font-family: Guardian Headline; font-size: 12px"
        >
          If you don't have an account... Join us!
        </v-card-title>
        <v-card-actions class="justify-center card-mobile">
          <router-link
            class="justify-center card-mobile"
            to="/signon"
            style="text-decoration: none"
          >
            <v-btn
              center
              class="justify-center button-mobile"
              style="font-family: Guardian Headline; color: white"
              color="blue"
              >Sign-on</v-btn
            >
          </router-link>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-footer color="blue" bottom fixed class="justify-center">
      <Footer title="footer" />
    </v-footer>
  </v-main>
</template>

<script>
import LoginUser from "@/models/loginUser";
import TokenUser from "@/models/tokenUser";
import Token from "@/models/token";
import { api } from "../helpers/helpers";
import { utils } from "../helpers/utils";
import Vue from "vue";
import VueCookie from "vue-cookie";
import Toolbar from "@/views/Toolbar.vue";
import Footer from "@/views/Footer.vue";

Vue.use(VueCookie);

export default {
  components: {
    Toolbar,
    Footer,
  },
    watch: {
    title: {
      immediate: true,
      handler() {
        document.title = 'Login | ' + utils.title;
      },
    },
  },
  data: () => ({
    errore: "",
    isFormValid: true,
    user: utils.newUser(),
    loginUser: utils.newUser(),
    showPassword: false,
    rememberMe: false,
    required: [(value) => !!value || "Required."],
  }),
  created() {
    this.errore = "";
    let token = api.readToken("auth");
    if (token.value != "" && token.value != null) {
      api
        .checkToken(token)
        .then((id) => {
          if (id != undefined || id != 0) {
            this.$router.push(`/main`);
          }
        })
        .catch(() => {
          this.$router.push(`/unauthorized`);
        });
    }
  },
  required: [(value) => !!value || "Required."],
  methods: {
    handleLogin: async function () {
      this.errore = "";
      this.loginUser = utils.cryptoMD5(
        new LoginUser(this.user.username, this.user.password)
      );
      /* login -> check delle credenziali */
      var check = await api.checkUser(this.loginUser);
      if (check.value != 0 && check.error == "") {
        /* login -> ottenimento del token */
        let tknUser = new TokenUser(check.value, this.loginUser.password);
        var ret = await api.login(tknUser);
        console.log(ret.data.value.value);
        if (ret.data.value.value != "") {
          this.token = new Token(ret.data.value.value);
          api.setToken("auth", this.token.value);
          /* login -> validazione del token */
          var retval = await api.checkToken(this.token);
          if (retval != 0) {
            this.$router.push(`/main`);
          } else {
            this.$router.push(`/unauthorized`);
          }
        } else {
          this.errore = ret.data.error;
        }
      } else {
        this.errore = check.error;
      }
    },
  },
};
</script>