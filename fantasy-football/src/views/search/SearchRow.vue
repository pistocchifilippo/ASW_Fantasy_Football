<template>
  <tbody class="striped1" :key="this.$props.pl.length">
    <tr v-for="league in this.leagues" :key="league.id">
      <td><span class="ristrext">{{ league.name }}</span></td>
      <td><span class="ristrext">{{ league.username }}</span></td>
      <td class="nopadding">
        <v-btn v-if="!league.bit" @click="join(league.id)" text color="success">
          <span class="ristrext m-0 px-0">JOIN</span>
          <v-icon right color="success">mdi-plus-box</v-icon>
        </v-btn>
      </td>
    </tr>
  </tbody>
</template>

<script>
import Vue from "vue";
import { api } from "@/helpers/helpers";
import { utils } from "@/helpers/utils";
import searchLeague from "@/models/searchLeague";
import Notifications from "vue-notification";

Vue.use(Notifications);

export default {
  props: ["pl", "pid"],
  data: () => ({
    leagues: [],
  }),
  created() {
    this.$props.pl.forEach((league) => {
      var sl = new searchLeague(
        league._id,
        league.name,
        league.admin,
        league.players
      );
      api.getUsername(league.admin).then((username) => {
        sl.username = username;
        sl.bit = sl.players.includes(this.$props.pid);
        this.leagues.push(sl);
      });
    });
  },
  methods: {
    join: async function (lid) {
      var ret = await api.joinLeague(this.$props.pid, lid);
      if (ret._id == lid) {
        utils.join_not(this, ret.name, "success");
      } else {
        utils.join_not(this, ret.name, "error");
      }
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.$router.go();
    },
  },
};
</script>
