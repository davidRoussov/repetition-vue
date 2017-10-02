<template>
  <div id="sidebar">
    <div class="btn-group topic-button-container">
      <a href="#" class="btn btn-default topic-button">Default</a>
      <a href="#" class="btn btn-default dropdown-toggle topic-button-dropdown" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span></a>
      <ul class="dropdown-menu">
        <li><a href="#">Action</a></li>
        <li><a href="#">Another action</a></li>
        <li><a href="#">Something else here</a></li>
        <li class="divider"></li>
        <li><a href="#">Separated link</a></li>
      </ul>
    </div>
    <div class="btn-group topic-button-container">
      <a href="#" class="btn btn-default topic-button">Two</a>
      <a href="#" class="btn btn-default dropdown-toggle topic-button-dropdown" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span></a>
      <ul class="dropdown-menu">
        <li><a href="#">Action</a></li>
        <li><a href="#">Another action</a></li>
        <li><a href="#">Something else here</a></li>
        <li class="divider"></li>
        <li><a href="#">Separated link</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { SIDEBAR_WIDTH } from '@/config'

export default {
  created: () => setTimeout(() => {
    const topicButtonWidth = (SIDEBAR_WIDTH.split('px').join('') - 27.98) + 'px'

    document.getElementById('sidebar').style.width = SIDEBAR_WIDTH
    const elements = document.getElementsByClassName('topic-button')
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      element.style.width = topicButtonWidth
    }
  }, 0)
}
</script>

<style scoped>
  #sidebar {
    height: 100%;
    float: left;
    background-color: #95a5a6;
  }
  
  .topic-button-container {
    width: 100%;
    border-radius: 0px;
  }

  .topic-button {
    border-radius: 0px;
    /* width: 102.02px; */
  }

  .topic-button-dropdown {
    border-radius: 0px;
  }

</style>