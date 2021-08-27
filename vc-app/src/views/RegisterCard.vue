<template>
  <v-card class="mx-auto my-12" max-width="40%">
    <v-card-title flat class="justify-center mobile-title desktop-title" style="font-family:Guardian Headline;font-weight:bold;">
      Fantasy Football
    </v-card-title>
    <v-card-title class="justify-center mobile-subtitle desktop-subtitle" style="font-family:Guardian Headline;font-weight:bold;">
      Create you team. <br/>Join a league. <br/>Support your Champions!
    </v-card-title> 
    <v-card-text class="justify-center">
      <v-text-field label="E-Mail" 
        prepend-icon="mdi-email" 
        type="email" 
        style="font-family:Guardian Headline"/>
        <v-text-field label="Username" 
        style="font-family:Guardian Headline"
        prepend-icon="mdi-account-circle"/>
      <v-text-field label="Password" 
        style="font-family:Guardian Headline"
        prepend-icon="mdi-lock" 
        :type="showPassword ? 'text' : 'password'" 
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword=!showPassword"/>
      <v-text-field label="Repeat Password" 
        style="font-family:Guardian Headline"
        prepend-icon="mdi-lock" 
        :type="showRepeatedPassword ? 'text' : 'password'" 
        :append-icon="showRepeatedPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showRepeatedPassword=!showRepeatedPassword"/>
    </v-card-text> 
    <v-card-actions class="justify-center card-mobile">
      <v-btn class="button-mobile button-desktop" style="font-family:Guardian Headline" color="success">Signon</v-btn>
    </v-card-actions>
    <v-divider></v-divider>
    <v-card-title flat class="ma-0 pa-0 justify-center" style="font-family:Guardian Headline;font-size:12px">
      Already a member? Log in!
    </v-card-title> 
    <v-card-actions class="justify-center card-mobile"> 
      <router-link class="justify-center card-mobile" to="/login" style="text-decoration: none;">
        <v-btn center class="justify-center button-mobile" style="font-family:Guardian Headline;color:white;" color="blue">Login</v-btn>
      </router-link>
    </v-card-actions>
    

  </v-card>
</template>
<script>
export default {
  data(){
    return{
      showPassword:false,
      showRepeatedPassword:false
    }
  }
}
</script>