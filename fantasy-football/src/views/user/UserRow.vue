<template>
  <tbody
    v-if="this.$props.users"
    class="striped1"
    :key="this.$props.users.length"
  >
    <tr v-for="user in this.$props.users" :key="user.id">
      <td>{{ user.name }}</td>
      <td>{{ user.username }}</td>
      <td>
        <v-btn @click="deletePlayer(user._id)" text color="error">
          DELETE
          <v-icon right color="error">mdi-plus-box</v-icon>
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
      console.log("delete player id", id);
    },
  },
};
</script>
