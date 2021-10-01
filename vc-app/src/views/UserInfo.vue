<template>
<!--   <v-card flat class="mx-auto justify-center ma-4 mobile-login desktop-login">
 -->  <v-card flat class="justify-center">
    <div v-if="$props.budget == ''" class="mx-auto">
      <v-progress-circular
        class="mx-auto"
        rounded
        indeterminate
        color="rgb(33, 150, 243)"
      ></v-progress-circular>
    </div>
    <v-card flat v-if="$props.budget != ''" dense class="blue justify-center">
      <v-row class="ma-0">
        <v-col class="pa-2">
          <v-card-title flat class="myfont_infobox">
            Logged user : {{ $props.username }}
          </v-card-title>
          <v-card-title flat class="myfont_infobox">
            Budget : {{ parseFloat($props.budget).toFixed(2) }} credits
          </v-card-title>
          <v-card-title flat class="myfont_infobox">
            Score : {{ parseFloat($props.score).toFixed(2) }} points
          </v-card-title>
        </v-col>
        <v-col align="center">
          <v-avatar
            class="profile"
            color="white"
            height="90px"
            width="90px"
            tile
          >
            <v-img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png"
            >
            </v-img>
          </v-avatar>
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
export default {
  props: ["username", "budget", "score"],
  data: () => ({}),
  created() {},
  methods: {},
};
</script>
