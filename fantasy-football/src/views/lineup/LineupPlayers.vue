<template>
  <v-main>
    <v-card flat dense>
      <InfoCard
        v-if="this.$props.lineup.length > 0"
        color="blue"
        text="YOUR LINEUP"
        class="fill"
      />
      <v-simple-table dense fixed-header>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Role</th>
            <th class="text-left">Team</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in this.$props.lineup" :key="player._id">
            <td>{{ player.name }}</td>
            <td  class="middle">
              <v-avatar :class="getRoleClass(player.position)" class="lineup-avatar bordered">
                {{ getRole(player.position) }}
              </v-avatar>
            </td>
            <td>
              <img
                class="middle"
                height="20px"
                :src="require(`@/assets/flags/${getFlag(player)}.png`)"
              />
            </td>
            <td>
              <v-btn class="rem-btn" @click="remove(player)" text color="red">
                Remove
                <v-icon right color="red">mdi-close-thick</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-btn @click="save()" class="fill" text color="green">
        Save
        <v-icon right color="green">mdi-content-save</v-icon>
      </v-btn>
    </v-card>
  </v-main>
</template>

<script>
import { utils } from "@/helpers/utils";
import InfoCard from "../user/InfoCard.vue";

export default {
  components: {
    InfoCard,
  },
  props: ["lineup", "teams"],
  methods: {
    save() {
      if (utils.isLineupComplete(this.$props.lineup)) {
        var ret = this.$props.lineup.sort((a, b) =>
          utils.sortLineup(a.position, b.position)
        );
        this.$emit("saveLineup", ret);
      } else {
        utils.failure_save(this, "error");
      }
    },
    getRole(role) {
      return utils.getRoleInitial(role);
    },
    getRoleClass(role) {
      return utils.colorRole(utils.mapTheRole(role)) ;
    },
    remove(player) {
      this.$emit("remove", player);
    },
    getFlag(player) {
      let nationality = this.$props.teams.filter(
        (team) => team._id == player.team_id
      )[0].shortName;
      return utils.mapTheFlag(nationality);
    },
  },
};
</script>