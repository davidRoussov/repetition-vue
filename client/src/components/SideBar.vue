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

    <!-- ADD NEW TOPIC BUTTON -->
    <button id="addTopicButton" type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#addTopicModal">Add new topic</button>

    <!-- MODAL FOR ADDING NEW TOPIC -->
    <div id="addTopicModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Add a new topic</h4>
          </div>
          <form class="form-horizontal" v-on:submit="submitNewTopic">
            <div class="modal-body">
                <div class="form-group">
                  <div class="col-lg-10">
                    <input class="form-control" id="inputEmail" placeholder="Enter new topic name" type="text" v-model="newTopicName">
                  </div>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
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
  }, 0),
  data: function () {
    return {
      newTopicName: ''
    }
  },
  methods: {
    submitNewTopic: function () {
      console.log('meow')
      console.log(this.$data)
      console.log(this.$data.newTopicName)
      const newTopicName = this.$data.newTopicName;
    }
  }
}
</script>

<style scoped>
  #sidebar {
    height: 100%;
    float: left;
    background-color: #95a5a6;
    text-align: center;
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

  #addTopicButton {
    margin-top: 20px;
  }

</style>