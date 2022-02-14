<template>
  <tbody>
    <tr v-for="player in this.list" :key="player._id">
      <td>
        <PlayerInfo :player="player" :team="getTeam(player)" />
      </td>
      <td class="nopadding">
        <span class="ristrext2"><b>{{ player.name }}</b></span>
      </td>
      <td class="nopadding">
        <span class="ristrext2">{{ player.position }}</span>
      </td>
      <td class="pr-1">
        <span class="ristrext2">{{ player.nationality }}</span>
      </td>
      <td class="nopadding">
        <img
          class="middle img"
          height="20px"
          :src="require(`@/assets/flags/${getFlag(player)}.png`)"
        />
      </td>
      <td class="pr-1">
        <span class="ristrext2">&nbsp;{{ player.value }}</span>
      </td>
      <td class="nopadding buy" v-if="btn">
        <v-btn
          v-if="showBuy(player) && btn == true"
          :disabled="disabledBuy(player)"
          @click="purchase(player)"
          text
          color="blue"
          class="nopadding buy"
        >
          <span class="show-on-mobile">Buy</span>
          <v-icon right color="blue">mdi-account-plus</v-icon>
        </v-btn>
        <v-btn
          v-if="showSell(player) && btn == true"
          @click="sell(player)"
          text
          color="orange"
          class="nopadding"
        >
          <span class="show-on-mobile">Sell</span>
          <v-icon right color="orange">mdi-account-minus</v-icon>
        </v-btn>
      </td>
    </tr>
  </tbody>
</template>
<script>
import { utils } from "@/helpers/utils";
import PlayerInfo from "@/views/players/PlayerInfo.vue";

export default {
  components: {
    PlayerInfo,
  },
  props: ["players", "teams", "team", "flag", "budget", "buttons"],
  data: () => ({
    list: Array,
    controlList: Array,
    allTeams: Array,
    allPlayers: Array,
    money: 0,
    isTeam: Boolean,
    sBar: false,
    canBuy: false,
    btn: Boolean,
  }),
  created() {
    this.isTeam = this.$props.flag;
    if (!this.isTeam) {
      this.list = this.$props.players;
      this.controlList = this.$props.team;
    } else {
      this.list = this.$props.team;
      this.controlList = this.$props.players;
    }
    this.allTeams = this.$props.teams;
    this.allPlayers = this.$props.players;
    this.money = this.$props.budget;
    this.btn = this.$props.buttons;
  },
  methods: {
    getPlayer(id) {
      let player = this.allPlayers.filter((p) => p._id == id)[0];
      return player;
    },
    getFlag(player) {
      let nationality = this.$props.teams.filter(
        (team) => team._id == player.team_id
      )[0].shortName;
      return utils.mapTheFlag(nationality);
    },
    getTeam(player) {
      let nationality = this.$props.teams.filter(
        (team) => team._id == player.team_id
      )[0].shortName;
      return nationality;
    },
    disabledBuy(player) {
      return parseFloat(this.money) < parseFloat(player.value);
    },
    showBuy(player) {
      return (
        !this.isTeam && !this.controlList.map((p) => p._id).includes(player._id)
      );
    },
    showSell(player) {
      return this.isTeam == true || this.showBuy(player) == false;
    },
    save() {
      if (this.isTeam) {
        this.$emit("save", this.list);
      } else {
        this.$emit("save", this.controlList);
      }
    },
    purchase(player) {
      this.$emit("purchase", player);
    },
    sell(player) {
      this.$emit("sell", player);
      if (this.isTeam) {
        this.list = this.list.filter((p) => p._id != player._id);
      } else {
        this.controlList = this.controlList.filter((p) => p._id != player._id);
      }
    },
  },
};
</script>