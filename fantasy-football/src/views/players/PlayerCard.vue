<template>
  <v-container class="back2 justify-center high-full pt-0 rounded px-0">
    <v-card-title class="px-2 py-2 pt-3 rounded blue infocard">
      <span class="mx-2">PLAYER INFO</span>
      <v-container right class="py-0 px-0 rounded red icon">
        <v-icon @click="close()" class="justify-center" color="white"
          >mdi-close</v-icon
        >
      </v-container>
    </v-card-title>
    <v-col>
      <v-avatar class="px-2 py-2 profile" color="grey" size="164" tile>
        <v-img :src="this.path"> </v-img>
      </v-avatar>
      <v-list-item class="px-0 pt-2">
        <v-container class="fill white">
          <v-list-item-content class="py-0">
            <v-list-item-title class="m-0 text-h5">
              {{ $props.player.name }}
            </v-list-item-title>
            <hr class="blue" />
            <v-list-item-subtitle class="m-0 text-h8">
              {{ $props.player.position }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="m-0 text-h8">
              {{
                getAge(
                  $props.player.dateOfBirth.substring(0, 10).replaceAll("-", "")
                )
              }} years - {{$props.team}}&nbsp; 
              <img
                class="middle"
                height="15px"
                :src="require(`@/assets/flags/${getFlag()}.png`)"
              />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-container>
      </v-list-item>
    </v-col>
  </v-container>
</template>

<script>
import { utils } from "@/helpers/utils";

export default {
  props: ["player", "team", "btn"],
  data: () => ({
    dialog: false,
    path: "",
  }),
  created() {},
  methods: {
    getFlag() {
      return utils.mapTheFlag(this.$props.team);
    },
    close() {
      this.$emit("close");
    },
    getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(
        dateString.substring(0, 4),
        dateString.substring(4, 6),
        dateString.substring(6, 8)
      );
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
  },
};
</script>
