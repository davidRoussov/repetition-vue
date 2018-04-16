import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import items from './modules/items'
import topics from './modules/topics'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    items,
    topics
  }
})
