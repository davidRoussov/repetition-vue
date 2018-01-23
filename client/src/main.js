// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    loadingIndicator: 'loading'
  },
  mutations: {
    setLoading(state) { state.loadingIndicator = 'loading' },
    setSuccess(state) { state.loadingIndicator = 'success' },
    setFailure(state) { state.loadingIndicator = 'failure' },
    setHidden(state) { state.loadingIndicator = 'hidden' }
  }
})

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

