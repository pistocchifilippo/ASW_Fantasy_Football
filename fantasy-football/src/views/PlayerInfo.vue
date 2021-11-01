<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="350">
      <template v-slot:activator="{ on, attrs }">
        <v-icon color="blue" v-bind="attrs" v-on="on"> mdi-information </v-icon>
      </template>
      <PlayerCard
        @close="close()"
        v-if="dialog"
        :player="this.$props.player"
        :team="this.$props.team"
        :btn="true"
      />
    </v-dialog>
  </v-row>
</template>

<script>
import PlayerCard from "@/views/PlayerCard.vue";

export default {
  components: {
    PlayerCard,
  },
  props: ["player", "team"],
  data: () => ({
    dialog: false,
    path: "",
  }),
  methods: {
    close() {
      this.dialog = false;
    },
  },
};
</script>
