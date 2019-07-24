import Vue from 'vue'
import VueRouter from 'vue-router'
import './plugins/vuetify'
import App from './App.vue'
import Friends from './components/Friends'
import Connect from './components/Connect'
import Stat from './components/Stat'
import NotFound from './components/NotFound'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.prototype.$http = require('axios');

const routes = [
    {path: '/', component: Stat},
  {path: '/friends', component: Friends},
  {path: '/connects', component: Connect},
    {path: '*', component: NotFound},
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
