<template>
  <tbody
    v-if="this.$props.users"
    class="striped1"
    :key="this.$props.users.length"
  >
    <tr v-for="user in this.$props.users" :key="user.id">
      <td> <span class="ristrext">{{ user.name }}</span></td>
      <td> <span class="ristrext">{{ user.username }}</span></td>
      <td>
        <v-btn @click="deletePlayer(user._id)" text color="error">
          <span class="ristrext show-on-mobile">DELETE</span>
          <v-icon right color="error">mdi-minus-box</v-icon>
        </v-btn>
      </td>
    </tr>
  </tbody>
</template>

<script>
import { api } from "@/helpers/helpers";
import Vue from "vue";
import Notifications from "vue-notification";

Vue.use(Notifications);

export default {
  props: ["users"],
  data: () => ({}),
  created() {},
  methods: {
    deletePlayer: async function (id) {
      await api.deleteUser(id)
    },
  },
};
</script>
