import Vue from 'vue'
import App from './App.vue'
import 'semantic-ui-css/semantic.css';
import router from './router/Router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
require('./assets/styles/style.css');

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')