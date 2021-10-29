<template>
  <div style="height: 100%">
    non autorizzato
    <v-img height="100%" width="100%" src="@/assets/unauthorized.jpeg" />
  </div>
</template>


<script>
import { utils } from "../helpers/utils";
import Vue from "vue";
import VueCookie from "vue-cookie";
Vue.use(VueCookie);

export default {
  data: () => ({}),
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = "Unauthorized | " + utils.title;
      },
    },
  },
  created() {
    console.log(Vue.cookie.get("auth"));
    Vue.cookie.set("auth", "", 0);
    this.waitAndRedirect();
  },
  methods: {
    waitAndRedirect: async function () {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      this.$router.push(`/login`);
    },
  },
};
/* eliminerei il cookie */
</script>
