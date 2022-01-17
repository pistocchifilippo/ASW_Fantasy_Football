<template>
  <v-card class="mx-auto" max-width="500" tile>
    <v-img
      height="100%"
      src="https://img-prod.sportmediaset.mediaset.it/images/2020/11/14/205830416-f8f6d8b5-fbe3-4e51-b3e3-6d81eebc5b7c.jpg"
    >
      <v-row align="end" class="fill-height">
        <v-col align-self="start" class="pa-0" cols="12">
          <v-avatar class="profile" color="grey" size="164" tile>
            <v-img :src="this.path"> </v-img>
          </v-avatar>
        </v-col>
      </v-row>
    </v-img>
    <v-col>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ $props.player.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $props.player.position }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{
              getAge(
                $props.player.dateOfBirth.substring(0, 10).replaceAll("-", "")
              )
            }}
            years - {{ $props.team }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-card-actions class="pa-0" right>
          <v-btn
            v-if="$props.btn"
            color="blue"
            width="20px"
            class="pa-0 ma-0"
            text
            @click="close()"
            >X</v-btn
          >
        </v-card-actions>
      </v-list-item>
    </v-col>
  </v-card>
</template>

<script>
import { api } from "@/helpers/helpers";

export default {
  props: ["player", "team", "btn"],
  data: () => ({
    dialog: false,
    path: "",
  }),
  created() {
    this.request();
  },
  methods: {
    request() {
      api
        .getPhoto(this.$props.player.name)
        .then((result) => {
          this.path = result.player[0].strThumb;
        })
        .catch(() => {
          this.$router.push(`/unauthorized`);
        });
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
