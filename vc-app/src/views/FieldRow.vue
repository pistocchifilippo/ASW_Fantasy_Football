<template>
  <v-row class="field-row">
    <v-col v-for="i in 4" :key="i" class="field-col pa-0 ma-0 centered">
      <v-dialog :retain-focus="false" v-model="dialog[i - 1]" max-width="350">
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            v-if="pos.includes(i)"
            class="field-avatar bordered"
            :color="getColor(i)"
            v-bind="attrs"
            v-on="on"
          >
            {{ getName(allPlayers.at(pos.indexOf(i))) }}
          </v-avatar>
        </template>
        <PlayerCard
          @close="close(i)"
          v-if="pos.includes(i)"
          :player="getPlayer(i)"
          :team="allTeams"
          :btn="false"
        />
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { utils } from "../helpers/utils";
import { api } from "../helpers/helpers";
import PlayerCard from "@/views/PlayerCard.vue";

export default {
  props: ["positions", "players", "teams"],
  components: {
    PlayerCard,
  },
  data: () => ({
    dialog: [false, false, false, false],
    pos: [],
    allPlayers: [],
    allTeams: [],
  }),
  created() {
    this.allPlayers = this.$props.players;
    this.allTeams = this.$props.teams;
    this.pos = this.$props.positions;
  },
  methods: {
    getImg(player) {
      return api.getPhoto(player.name);
    },
    getPlayer(i) {
      return this.allPlayers.at(this.pos.indexOf(i));
    },
    getName(player) {
      if (player == undefined) return "??";
      var ret = utils.getInitials(player.name);
      this.count += 1;
      return ret;
    },
    getColor(i) {
      return utils.colorRole(i);
    },
  },
};
</script>
