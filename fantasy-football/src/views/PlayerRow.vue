<template>
  <tbody>
    <tr v-for="player in this.list" :key="player._id">
      <td>
        <PlayerInfo :player="player" :team="getTeam(player)" />
      </td>
      <td>{{ player.name }}</td>
      <td>{{ player.position }}</td>
      <td>{{ player.nationality }}</td>
      <td>
        <img
          class="middle"
          height="20px"
          :src="require(`../assets/flags/${getFlag(player)}.png`)"
        />
      </td>
      <td>{{ player.value }}</td>
      <td v-if="btn">
        <v-btn
          v-if="showBuy(player) && btn==true"
          :disabled="disabledBuy(player)"
          @click="purchase(player)"
          text
          color="blue"
          class="buy"
        >
          Buy
          <v-icon right color="blue">mdi-account-plus</v-icon>
        </v-btn>
        <v-btn
          v-if="showSell(player) && btn==true"
          @click="sell(player)"
          text
          color="orange"
        >
          Sell
          <v-icon right color="orange">mdi-account-minus</v-icon>
        </v-btn>
      </td>
    </tr>
  </tbody>
</template>
<script>
/* import { api } from "../helpers/helpers";*/
import { utils } from "../helpers/utils";
import PlayerInfo from "@/views/PlayerInfo.vue";

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
    search() {
      this.sBar = !this.sBar;
      console.log("search");
    },
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