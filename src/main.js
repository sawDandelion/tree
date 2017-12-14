// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min.js'
import jquery from 'jquery'
import App from './App'
import lodash from 'lodash'
import store from './store'
Vue.prototype.$lodash = Vue.lodash = lodash
import Frame from './components/Frame'
Vue.component(Frame.name, Frame)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    template: '<App/>',
    components: { App }
})
