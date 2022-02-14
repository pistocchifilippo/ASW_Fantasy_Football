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
    <v-card class="mx-auto my-6 mobile-login desktop-login">
      <v-card-title class="error-card justify-center" flat>{{
        this.errore
      }}</v-card-title>
      <v-card-title
        flat
        class="myfont justify-center mobile-title desktop-title"
      >
        Edit your profile
      </v-card-title>
      <v-form
        id="registerForm"
        v-model="isFormValid"
        name="form"
        @submit.prevent="handleEdit"
      >
        <v-card-text class="justify-center">
          <v-text-field
            label="Username"
            v-model="user.username"
            disabled
            style="font-family: Guardian Headline"
            prepend-icon="mdi-clipboard-account"
          />
          <v-text-field
            label="Name"
            :rules="required"
            prepend-icon="mdi-account-box"
            type="text"
            v-model="user.name"
            style="font-family: Guardian Headline"
          />
          <v-text-field
            label="E-Mail"
            :rules="required.concat(emailRules)"
            prepend-icon="mdi-email"
            type="email"
            v-model="user.email"
            style="font-family: Guardian Headline"
          />
          <v-text-field
            label="Password"
            style="font-family: Guardian Headline"
            :rules="required.concat(passwordRules)"
            prepend-icon="mdi-lock"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            label="Repeat Password"
            style="font-family: Guardian Headline"
            prepend-icon="mdi-lock"
            :rules="required.concat(passwordConfirmationRule)"
            v-model="rPassword"
            :type="showRepeatedPassword ? 'text' : 'password'"
            :append-icon="showRepeatedPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showRepeatedPassword = !showRepeatedPassword"
          />
        </v-card-text>
        <v-card-actions class="justify-center card-mobile">
          <v-btn
            :disabled="!isFormValid"
            type="submit"
            form="registerForm"
            class="button-mobile button-desktop"
            style="font-family: Guardian Headline"
            color="success"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

    <v-footer color="blue" bottom fixed class="justify-center">
      <Footer title="footer" />
    </v-footer>
  </v-main>
</template>


<script>
import Vue from "vue";
import VueCookie from "vue-cookie";
import { api } from "@/helpers/helpers";
import Token from "@/models/token";
import LoggedToolbar from "@/views/toolbar/LoggedToolbar.vue";
import ProfileMenu from "@/views/user/ProfileMenu.vue";
import Footer from "@/views/toolbar/Footer.vue";
import { utils } from "@/helpers/utils";

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
        document.title = "Settings | " + utils.title;
      },
    },
  },
  data: () => ({
    isFormValid: true,
    errore: "",
    showPassword: false,
    showRepeatedPassword: false,
    token: new Token(""),
    user: utils.newUser(),
    updatedUser: utils.newUser(),
    password: "",
    rPassword: "",
    profile: utils.newProfile(),
    required: [(value) => !!value || "Required."],
    pwdRules: [(value) => (value && value.length >= 8) || "Min 8 characters"],
    emailRules: [
      (value) =>
        !value ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
        "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 5) || "Password must have 5+ characters",
      (v) => /(?=.*[A-Z])/.test(v) || "Must have one uppercase character",
      (v) => /(?=.*\d)/.test(v) || "Must have one number",
      (v) => /([!@$%])/.test(v) || "Must have one special character [!@#$%]",
    ],
  }),
  computed: {
    passwordConfirmationRule() {
      return () => this.password === this.rPassword || "Password must match";
    },
  },
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
  methods: {
    handleEdit: async function () {
      this.errore = "";
      this.updatedUser = utils.cryptoMD5(
        utils.buildUser(
          this.user.id,
          this.user.name,
          this.user.username,
          this.user.email,
          this.password
        )
      );
      var ret = await api.editUser(this.updatedUser);
      if (ret.value != 0) {
        utils.notificate(
          this,
          "success",
          "Profile successfully updated",
        );
        await new Promise((resolve) => setTimeout(resolve, 1500));
        this.$router.push(`/main`);
      } else {
        utils.notificate(
          this,
          "error",
          "Something has gone wrong",
          "Try again later!"
        );
      }
    },
  },
};
</script>