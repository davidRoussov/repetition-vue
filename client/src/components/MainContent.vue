<template>
  <div id="mainContent">
    <split-pane>
      <section slot="left">
        <study></study>
      </section>
      <section slot="right">
        <add></add>
      </section>
    </split-pane>
  </div>
</template>

<script>
import SplitPane from 'vue-split-pane'

import Add from '@/components/Add'
import Study from '@/components/Study'

export default {
  components: {
    Add,
    Study,
    SplitPane
  }
}
</script>

<style scoped>
  #mainContent {
    height: 100%;
  }
</style>