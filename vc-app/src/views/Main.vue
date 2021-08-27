<template>
    <v-main>
        <LoggedToolbar v-bind:id="this.user.id" />
        <v-card class="mx-auto my-12 mobile-login desktop-login">        
            <v-form id="loginForm" name="login"  >
                <v-card-title flat class="myfont justify-center mobile-title desktop-title">
                    Welcome: this is Fantasy Football
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
        <v-footer color="blue" bottom class="justify-center">
            <Footer title="footer"/>
        </v-footer>
    </v-main>
</template>

<script>
    import Vue from 'vue';
    import VueCookie from 'vue-cookie';
    import {api} from '../helpers/helpers';
    import LoggedToolbar from '@/views/LoggedToolbar.vue';
    import Footer from '@/views/Footer.vue';

    Vue.use(VueCookie);

    export default {
        components: {
            LoggedToolbar, Footer
        },
        data : () => ({
            user: api.newUser(),
        }), 
        created(){
            let token = api.readToken("auth");
            if (token!=""){
                api.checkToken(token)
                    .then(id => {
                        if(id == undefined || id == 0){
                            this.error401;
                        }
                        /* vado a leggere le informazioni dell'utente mediante id */
                        api.getUser(id)
                            .then(result => {
                                if(result != 0){
                                    this.user = api.fillUser(result)
                                } else {
                                    this.error401;
                                }
                            }).catch(() => {
                                this.error401;
                            });
                    })
                    .catch(() => {
                        this.error401;
                    });
            } else {
                this.error401;
            }
        },
        methods: {
            error401: () => {
                this.$router.push(`/unauthorized`);
            }
        }
    }
</script>