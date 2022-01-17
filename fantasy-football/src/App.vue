<template>
  <v-app>
    <v-main>
      <router-view></router-view>
      <notifications position="bottom right" group="notify" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = "Fantasy Football";
      },
    },
  },
  components: {},
  data: () => ({}),
};
</script>
