<template>
  <v-menu class="half">
    <template v-slot:activator="{ on, attrs }">
      <v-card
        flat
        color="blue"
        class="pa-0 mb-1 half justify-center mobile-login desktop-login"
      >
        <v-btn
          color="transparent"
          class="fill infocard"
          v-bind="attrs"
          v-on="on"
        >
          Profile
        </v-btn>
      </v-card>
    </template>
    <UserInfo
      :username="this.$props.username"
      :budget="this.$props.budget"
      :score="this.$props.score"
    />
  </v-menu>
</template>

<script>
import UserInfo from "@/views/UserInfo.vue";

export default {
  components: {
    UserInfo,
  },
  props: ["username", "budget", "score"],
  data: () => ({}),
  created() {},
  methods: {},
};
</script>
