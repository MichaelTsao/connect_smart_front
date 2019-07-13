import Vue from 'vue'
import VueRouter from 'vue-router'
import './plugins/vuetify'
import App from './App.vue'
import Friends from './components/Friends'
import Stat from './components/Stat'

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  {path: '/friends', component: Friends},
  {path: '/', component: Stat}
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
