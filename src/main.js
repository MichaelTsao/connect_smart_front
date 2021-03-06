import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'

import Friends from './components/Friends'
import Connect from './components/Connect'
import Stat from './components/Stat'
import NotFound from './components/NotFound'

Vue.config.productionTip = false;
Vue.prototype.$http = require('axios');
Vue.use(VueRouter)

const routes = [
    {path: '/', component: Stat},
    {path: '/friends', component: Friends},
    {path: '/connects', component: Connect},
    {path: '*', component: NotFound},
];

const router = new VueRouter({
    routes
});

new Vue({
    router,
    vuetify,
    render: h => h(App),
}).$mount('#app')
