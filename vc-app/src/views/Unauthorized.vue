<template>
    <div style="height:100%"> non autorizzato 
        <v-img  height="100%" width="100%" src="@/assets/unauthorized.jpeg"/>
    </div>
</template>


<script>
    import Vue from 'vue';
    import VueCookie from 'vue-cookie';
    Vue.use(VueCookie);
    
export default {
    data : () => ({
    }), 
    created(){
        //console.log('bc');
        //Vue.cookie.remove('auth');
    },
    methods: {
    }
}
/* eliminerei il cookie */
</script>
