<template>
  <div id="app">
    <menu-bar></menu-bar>
    <side-bar></side-bar>
    <div id="content">
      <router-view></router-view>
    </div>
    <loading-indicator></loading-indicator>
  </div>
</template>

<script>
import Vuex from 'vuex';
import MenuBar from '@/components/MenuBar'
import SideBar from '@/components/SideBar'
import LoadingIndicator from '@/components/LoadingIndicator'

import { SIDEBAR_WIDTH } from '@/config'

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

export default {
  name: 'app',
  store,
  components: {
    MenuBar,
    SideBar,
    LoadingIndicator
  },
  created: () => setTimeout(() => {
    document.getElementById('content').style.marginLeft = SIDEBAR_WIDTH
  }, 0)
}
</script>

<style>
#app {
  overflow: hidden;
}

#content {
  height: 100%;
}

body, html, #app {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
}
</style>
