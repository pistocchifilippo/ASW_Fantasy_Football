<template>
  <v-menu left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mobile-menu desktop-menu"
        dark
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon class="mobile-menu desktop-menu">mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list class="mobile-menu desktop-menu">
      <v-list-item v-for="item in items" :key="item.title" :to="item.to">
        <v-list-item-title>{{ item.title }}</v-list-item-title
        ><v-icon right color="blue">{{ item.mobile_icon }}</v-icon>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { utils } from "@/helpers/utils";

export default {
  components: {},
  data: () => ({
    items: utils.getToolbarItems(),
  }),
  methods: {
    close() {
      this.dialog = false;
    },
    insert: function () {
      /*       league.admin = this.$props.profileID;
      league.players.push(this.$props.profileID);
      api.newLeague(league).then(() => {
        this.$router.go();
      }); */
    },
  },
};
</script>
