<template>
  <div id="app">
    <menu-bar></menu-bar>
    <side-bar></side-bar>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MenuBar from '@/components/MenuBar'
import SideBar from '@/components/SideBar'

import { SIDEBAR_WIDTH } from '@/config'

export default {
  name: 'app',
  components: {
    MenuBar,
    SideBar
  },
  created: () => setTimeout(() => {
    document.getElementById('content').style.marginLeft = SIDEBAR_WIDTH
  }, 0)
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
}

#content {
  height: 100%;
}

body, html, #app {
  width: 100%;
  height: 100%;
}
</style>
