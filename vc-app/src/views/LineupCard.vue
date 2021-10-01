<template>
  <v-dialog v-model="dialog" persistent max-width="350">
    <template v-slot:activator="{ on, attrs }">
      <v-avatar class="field-avatar" color="primary" v-bind="attrs" v-on="on">
        {{ getName() }}
      </v-avatar>
    </template>
    <PlayerCard
      @close="close()"
      v-if="dialog"
      :player="this.$props.player"
      :team="this.$props.team"
      :btn="true"
    />
  </v-dialog>
</template>

<script>
import PlayerCard from "@/views/PlayerCard.vue";
import { utils } from "../helpers/utils";

export default {
  components: {
    PlayerCard,
  },
  props: ["player", "team"],
  data: () => ({
    dialog: false,
    path: "",
  }),
  created() {},
  methods: {
    getName() {
      return utils.getInitials(this.$props.player.name);
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>
