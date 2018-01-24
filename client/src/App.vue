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
import MenuBar from '@/components/MenuBar'
import SideBar from '@/components/SideBar'
import LoadingIndicator from '@/components/LoadingIndicator'

import { SIDEBAR_WIDTH } from '@/config'

export default {
  name: 'app',
  components: {
    MenuBar,
    SideBar,
    LoadingIndicator
  },
  created: () => setTimeout(() => {
    document.getElementById('content').style.marginLeft = SIDEBAR_WIDTH
  })
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
