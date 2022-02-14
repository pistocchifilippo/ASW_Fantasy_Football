<template>
  <v-container class="back2 justify-center high-full pt-0 rounded px-0">
    <v-card-title class="px-2 py-2 pt-3 blue infocard">
      <span class="mx-2">PLAYER INFO</span>
      <v-container right class="py-0 px-0 rounded red icon">
        <v-icon @click="close()" class="justify-center" color="white"
          >mdi-close</v-icon
        >
      </v-container>
    </v-card-title>
    <v-col>
      <v-avatar class="px-2 py-2 player" tile>
        <v-img contain :src="this.path"> </v-img>
      </v-avatar>
      <v-list-item class="px-0 pt-2">
        <v-container class="fill pb-0 white">
          <v-list-item-content class="py-0">
            <v-list-item-title class="m-0 text-h5">
              <span class="ristrext"> {{ $props.player.name }}</span>
            </v-list-item-title>
            <hr class="blue" />
            <v-list-item-subtitle class="m-0 text-h8">
              <span class="ristrext2">{{ $props.player.position }}</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="m-0 text-h8">
              <span class="ristrext2">{{
                getAge(
                  $props.player.dateOfBirth.substring(0, 10).replaceAll("-", "")
                )
              }}
              years - {{ $props.team }}&nbsp;</span>
              <img
                class="middle"
                height="15px"
                :src="require(`@/assets/flags/${getFlag()}.png`)"
              />
              <v-list-item-subtitle class="p-0 mx-0 my-0 text-h8">
                <v-btn
                  v-if="this.instagram != ''"
                  class="social"
                  :href="'https://' + this.instagram"
                  target="_blank"
                  text
                  color="white"
                >
                  <v-img
                    class="social-img"
                    v-if="this.instagram != ''"
                    height="15px"
                    contain
                    :src="require(`@/assets/social/insta.png`)"
                  />
                </v-btn>
                <v-btn
                  v-if="this.facebook != ''"
                  class="social"
                  :href="'https://' + this.facebook"
                  target="_blank"
                  text
                  color="white"
                >
                  <v-img
                    class="social-img"
                    v-if="this.facebook != ''"
                    height="15px"
                    contain
                    :src="require(`@/assets/social/face.png`)"
                  />
                </v-btn>
                <v-btn
                  v-if="this.twitter != ''"
                  class="social p-0 m-0"
                  :href="'https://' + this.twitter"
                  target="_blank"
                  text
                  color="white"
                >
                  <v-img
                    class="social-img"
                    v-if="this.twitter != ''"
                    height="15px"
                    contain
                    :src="require(`@/assets/social/tweet.png`)"
                  />
                </v-btn>
              </v-list-item-subtitle>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-container>
      </v-list-item>
    </v-col>
  </v-container>
</template>

<script>
import { utils } from "@/helpers/utils";
import { api } from "@/helpers/helpers";

export default {
  props: ["player", "team", "btn"],
  data: () => ({
    dialog: false,
    path: "",
    instagram: "",
    twitter: "",
    facebook: "",
  }),
  created() {
    api.getInfo(this.$props.player.name).then((player) => {
      this.path = player.strThumb;
      this.instagram = player.strInstagram;
      this.twitter = player.strTwitter;
      this.facebook = player.strFacebook;
    });
  },
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
