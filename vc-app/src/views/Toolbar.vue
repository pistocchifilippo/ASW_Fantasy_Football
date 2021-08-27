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
        <v-list-item to="/">
          <v-list-item-title>Home</v-list-item-title><v-icon right color="blue">mdi-home-variant</v-icon>
        </v-list-item>
        <v-list-item to="/login">
          <v-list-item-title>Login</v-list-item-title><v-icon right color="blue">mdi-account-outline</v-icon>
        </v-list-item>
        <v-list-item to="/signon">
          <v-list-item-title>Sign-On</v-list-item-title><v-icon right color="blue">mdi-account-plus-outline</v-icon>
        </v-list-item>
      </v-list>
    </v-menu>
    <router-link class="nav-link pr-3 mobile-nav toolbar-element" to="/login">
      <v-btn text rounded color="white">Login
        <v-icon right color="white">mdi-account</v-icon>
      </v-btn>
    </router-link>
    <router-link class="nav-link pr-3 mobile-nav toolbar-element" to="/signon">
      <v-btn text rounded color="white">Sign-On
        <v-icon right color="white">mdi-account-plus</v-icon>
      </v-btn>
    </router-link>
    <router-link class="nav-link pr-3 mobile-nav toolbar-element" to="/">
      <v-btn text rounded color="white">Home
        <v-icon right color="white">mdi-home</v-icon>
      </v-btn>
    </router-link>
  </v-toolbar>

</template>

<script>

  export default {
    title:'Toolbar',
    name: 'Toolbar',
    props: {
        title: {
          type: String,
          required: true,
        },
      },
    data: () => ({
      mySVG: require('@/assets/ball.svg'), 
      items: [
        { title: 'Home', redirect:"/" },
        { title: 'Login', redirect:"/login" },
        { title: 'Sign-On', redirect:"/signon" }
      ]
    }),
  };
</script>