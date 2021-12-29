<template>
  <v-card flat :key="this.user_team.length">
    <InfoCard
      v-if="this.user_team.length > 0"
      class="half"
      :color="'blue'"
      :text="
        this.isTeam == true
          ? 'THIS IS YOUR TEAM!'
          : 'PICK YOUR FAVOURITE PLAYERS!'
      "
    />
    <v-simple-table height="400px" dense fixed-header>
      <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left">Name</th>
          <th class="text-left">Position</th>
          <th :colspan="2" class="text-left">Team</th>
          <th class="text-left">Value</th>
          <th class="text-left" v-if="this.btn"></th>
        </tr>
      </thead>
      <PlayerRow
        @sell="sell"
        @purchase="purchase"
        :players="this.players"
        :teams="this.teams"
        :team.sync="this.user_team"
        :flag="this.isTeam"
        :budget="this.money"
        :buttons="this.btn"
      />
    </v-simple-table>
    <v-btn
      v-if="this.isTeam && this.btn"
      @click="save()"
      style="width: 100%"
      text
      color="green"
    >
      Save
      <v-icon right color="green">mdi-content-save</v-icon>
    </v-btn>
    <v-btn
      v-if="this.isTeam == false && this.btn"
      :disabled="true"
      class="team-button"
      text
      color="success"
    >
      Remaining: {{ parseFloat($props.budget).toFixed(2) }} credits
    </v-btn>
  </v-card>
</template>
<script>
import { utils } from "../helpers/utils";
import PlayerRow from "@/views/PlayerRow.vue";
import InfoCard from "@/views/InfoCard.vue";

export default {
  components: {
    PlayerRow,
    InfoCard,
  },
  props: ["players", "teams", "team", "budget", "flag", "buttons"],
  data: () => ({
    user_team: Array,
    allTeams: Array,
    allPlayers: Array,
    temp: Array,
    money: 0,
    isTeam: false,
    sBar: false,
    btn: false,
  }),
  updated() {
    this.user_team = this.$props.team;
  },
  created() {
    this.user_team = this.$props.team;
    this.allTeams = this.$props.teams;
    this.allPlayers = this.$props.players;
    this.isTeam = this.$props.flag;
    this.money = this.$props.budget;
    this.btn = this.$props.buttons;
  },
  methods: {
    search() {
      this.sBar = !this.sBar;
    },
    getPlayer(id) {
      let player = this.players.filter((p) => p._id == id)[0];
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
    save() {
      this.$emit("save", this.user_team);
    },
    purchase(player) {
      this.user_team = this.$props.team;
      this.money = this.$props.budget;
      var temp = [];
      this.user_team.forEach((p) => {
        temp.push(p);
      });
      temp.push(player);
      if (utils.checkTeam(temp) == true) {
        this.user_team.push(player);
        let value = player.value.toFixed(2);
        this.money = parseFloat(this.money) - parseFloat(value);
        this.$emit("update", this.money, this.user_team);
        utils.purchase_not(this, player, "success");
      } else {
        utils.failure_purchase(this, "error");
      }
    },
    sell(player) {
      this.user_team = this.$props.team;
      this.money = this.$props.budget;
      this.user_team = this.user_team.filter((p) => p._id != player._id);
      let value = player.value.toFixed(2);
      this.money = parseFloat(this.money) + parseFloat(value);
      this.$emit("update", this.money, this.user_team);
      utils.sell_not(this, player, "warning");
    },
  },
};
</script>