<template>
  <v-toolbar title="toolbar" flat class="blue flex-grow-0">
    <v-toolbar-title color="blue" class="text-uppercase toolbar-title">
      Fantasy Football
    </v-toolbar-title>
    <img :src="mySVG" height="100%" />
    <v-spacer></v-spacer>
    <ToolbarModal/>
    <div
      class="nav-link pr-3 mobile-nav toolbar-element"
      v-for="item in items"
      :key="item.title"
    >
      <router-link :to="item.to">
        <v-btn text rounded color="white"
          >{{ item.title }}
          <v-icon right color="white"> {{ item.icon }} </v-icon>
        </v-btn>
      </router-link>
    </div>
  </v-toolbar>
</template>

<script>
import ToolbarModal from "@/views/toolbar/ToolbarModal.vue";
import { utils } from "@/helpers/utils";

export default {
  components: {
    ToolbarModal,
  },
  title: "Toolbar",
  name: "Toolbar",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    mySVG: require("@/assets/ball.svg"),
    items: utils.getToolbarItems(), 
  }),
};
</script>