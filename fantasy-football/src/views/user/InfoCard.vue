<template>
  <v-card flat :color="this.theme" class="pa-0 justify-center mobile-login desktop-login">
      <v-card-title class="px-0 justify-center infocard ristrext" > {{ this.content }} </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: ["color", "text"],
  data: () => ({
    theme: String, 
    content: String, 
  }),
  created() {
    this.theme = this.$props.color;
    this.content = this.$props.text;
  },
  methods: {},
};
</script>
