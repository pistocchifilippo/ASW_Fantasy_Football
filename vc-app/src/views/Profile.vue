<template>
    <v-main>
        <LoggedToolbar v-bind:username="this.user.username" />
        <v-card class="mx-auto my-12 mobile-login desktop-login">
            <v-form name="content">
                <v-card-title flat class="myfont justify-center mobile-title desktop-title">
                    Welcome: this is your profile settings page
                </v-card-title>
                <v-card-title flat class="myfont show-on-mobile justify-center mobile-title desktop-title">
                    You're on mobile
                </v-card-title>
                <v-card-title flat class="myfont show-on-desktop justify-center mobile-title desktop-title">
                    You're on desktop
                </v-card-title>
                <v-card-title flat class="myfont justify-center mobile-title desktop-title">
                    You are : {{this.user.username}}
                </v-card-title>
            </v-form>
        </v-card>
        <v-card class="mx-auto my-12 mobile-login desktop-login">
            <v-form id="registerForm" v-model="isFormValid" name="form" @submit.prevent="handleRegister">
                <v-card-text class="justify-center">
                    <v-text-field label="Name" 
                        :rules="required"
                        prepend-icon="mdi-account-box" 
                        type="text"
                        v-model="user.name" 
                        style="font-family:Guardian Headline"/>
                    <v-text-field label="E-Mail" 
                        :rules="required.concat(emailRules)"
                        prepend-icon="mdi-email" 
                        type="email"
                        v-model="user.email" 
                        style="font-family:Guardian Headline"/>
                    <v-text-field label="Username" 
                        v-model="user.username"
                        :rules="required.concat(usernameRules)"
                        style="font-family:Guardian Headline"
                        prepend-icon="mdi-clipboard-account"/>
                    <v-text-field label="Password" 
                        style="font-family:Guardian Headline"
                        :rules="required.concat(passwordRules)"
                        prepend-icon="mdi-lock" 
                        v-model="user.password"
                        :type="showPassword ? 'text' : 'password'" 
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword=!showPassword"/>
                    <v-text-field label="Repeat Password" 
                        style="font-family:Guardian Headline"
                        prepend-icon="mdi-lock"
                        :rules="required.concat(passwordConfirmationRule)" 
                        v-model="rPassword"
                        :type="showRepeatedPassword ? 'text' : 'password'" 
                        :append-icon="showRepeatedPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showRepeatedPassword=!showRepeatedPassword"/>
                </v-card-text> 
                <v-card-actions class="justify-center card-mobile">
                    <v-btn :disabled="!isFormValid" type="submit" form="registerForm" class="button-mobile button-desktop"  style="font-family:Guardian Headline" color="success">
                        Signon
                    </v-btn>
                </v-card-actions>
                <v-card-title class="error-card justify-center" flat>{{this.errore}}</v-card-title> 
                <v-divider></v-divider>
                <v-card-title flat class="ma-0 pa-0 justify-center" style="font-family:Guardian Headline;font-size:12px">
                Already a member? Log in!
                </v-card-title> 
                <v-card-actions class="justify-center card-mobile"> 
                    <router-link class="justify-center card-mobile" to="/login" style="text-decoration: none;">
                        <v-btn center class="justify-center button-mobile" style="font-family:Guardian Headline;color:white;" color="blue">Login</v-btn>
                    </router-link>
                </v-card-actions>
            </v-form>
        </v-card>

        <v-footer color="blue" bottom class="justify-center">
            <Footer title="footer"/>
        </v-footer>    
    </v-main>
</template>


<script>
    import Vue from 'vue';
    import VueCookie from 'vue-cookie';
    import {api} from '../helpers/helpers';
    import Token from '@/models/token';
    import User from '@/models/user';
    import LoggedToolbar from '@/views/LoggedToolbar.vue';
    import Footer from '@/views/Footer.vue';


    Vue.use(VueCookie);

    export default {
        components: {
            LoggedToolbar, Footer
        },
        data : () => ({
            token: new Token(''),
            user: new User('', '', '', ''),
            required: [
                value => !!value || 'Required.',
            ],
            usernameRules: [
                value => (value && value.length >= 4) || 'Min 4 characters',
            ],
            pwdRules: [
                value => (value && value.length >= 8) || 'Min 8 characters',
            ],
            emailRules: [ 
                value => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'E-mail must be valid'
            ],
            passwordRules: [ 
                v => !!v || 'Password is required', 
                v => (v && v.length >= 5) || 'Password must have 5+ characters',
                v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character', 
                v => /(?=.*\d)/.test(v) || 'Must have one number', 
                v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]' 
            ],
        }), 
        created(){
            this.token = new Token(Vue.cookie.get('auth'));
            if (this.token){
                this.checkAuth()
                    .then(result => {
                        if(!result)
                            this.$router.push(`/unauthorized`);
                    })
                    .catch(() => {
                        this.$router.push(`/unauthorized`);
                    });
            } else {
                this.$router.push(`/unauthorized`);
            }
        },
        methods: {
            checkAuth : async function() {
                var ret = await api.check(this.token);
                console.log(ret.data.value.username);
                if(ret.data.error=='' && ret.data.value!=''){
                    this.user = new User('', ret.data.value.username, '', '');
                    return 1;
                } 
                return 0; 
            }
        }
    }
</script>