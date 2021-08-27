<template>
  <v-toolbar title="toolbar" flat class="blue flex-grow-0">
    <v-toolbar-title color="blue" class="text-uppercase toolbar-title">
      Fantasy Football 
    </v-toolbar-title>
    <img :src="mySVG" height="100%" />
  <v-spacer></v-spacer>
    <v-menu left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mobile-menu desktop-menu" dark icon v-bind="attrs" v-on="on">
          <v-icon class="mobile-menu desktop-menu">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list class="mobile-menu desktop-menu">
        <v-list-item to="/main">
          <v-list-item-title>Home</v-list-item-title><v-icon right color="blue">mdi-home-variant</v-icon>
        </v-list-item>
        <v-list-item to="/profile">
          <v-list-item-title>{{this.user.username}}</v-list-item-title><v-icon right color="blue">mdi-cog-outline</v-icon>
        </v-list-item>
      </v-list>
    </v-menu>
    <router-link class="nav-link pr-3 mobile-nav toolbar-element" to="/profile">
      <v-btn text rounded color="white">{{this.user.username}}
        <v-icon right color="white">mdi-cog-outline</v-icon>
      </v-btn>
    </router-link>
    <router-link class="nav-link pr-3 mobile-nav toolbar-element" to="/main">
      <v-btn text rounded color="white">Home
        <v-icon right color="white">mdi-home</v-icon>
      </v-btn>
    </router-link>
  </v-toolbar>

</template>

<script>
  import { api } from '../helpers/helpers';

  export default {
    
    title:'Toolbar',
    name: 'Toolbar',
    props: {
        id: String
      },
    data: () => ({
      user: api.newUser(),
      mySVG: require('@/assets/ball.svg'), 
    }),
    created(){
      api.getUser(this.id)
        .then(result => {
          if(result != 0){
            this.user = api.fillUser(result);
          }
        }).catch(() => {
          this.$router.push(`/unauthorized`);
        });
    }
  };
</script>