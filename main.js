import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import maxios from './static/maxios/maxios.js';
import store from './store'

Vue.prototype.$store = store


Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(ElementUI)
Vue.prototype.$axios = maxios;
const app = new Vue({
	store,
    ...App
})
app.$mount()
