<template>
  <div id="sidebar">
    <div v-for="topic in topics" class="btn-group topic-button-container">

      <a 
        href="#" 
        v-on:click="handleClickTopic(topic.id)" 
        v-bind:class="[isSelectedTopic(topic.id) ? selectedTopicClasses : normalTopicClasses]"
      >{{ topic.Name }}
      </a>
      <a 
        href="#" 
        class="btn btn-default dropdown-toggle topic-button-dropdown"
        v-bind:class="[isSelectedTopic(topic.id) ? selectedTopicClassesDropdown : normalTopicClassesDropdown]"
        data-toggle="dropdown" 
        aria-expanded="false"
      >
        <span class="caret"></span>
      </a>

      <ul class="dropdown-menu">
        <li><a href="#">Edit</a></li>
        <li><a href="#" v-on:click="showDeleteTopicModal = true">Delete</a></li>
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




  <delete-topic-modal 
    v-on:hide="showDeleteTopicModal = false"
    :visible="showDeleteTopicModal"
  ></delete-topic-modal>




  </div>
</template>

<script>
import { SIDEBAR_WIDTH } from '@/config'
import { SERVER_URL } from '@/config'
import store from '@/store'
import { mapState } from 'vuex';
import DeleteTopicModal from '@/components/DeleteTopicModal';

export default {
  components: {
    DeleteTopicModal
  },
  created: () => setTimeout(() => {
    const topicButtonWidth = (SIDEBAR_WIDTH.split('px').join('') - 27.98) + 'px'

    document.getElementById('sidebar').style.width = SIDEBAR_WIDTH
    const elements = document.getElementsByClassName('topic-button')
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      element.style.width = topicButtonWidth
    }

  }, 0),
  computed: mapState({
    topics: state => state.topics,
    selectedTopic: state => state.selectedTopic
  }),
  data: function () {
    return {
      newTopicName: '',
      selectedTopicClasses: 'btn btn-success topic-button',
      normalTopicClasses: 'btn btn-default topic-button',
      selectedTopicClassesDropdown: 'btn btn-success dropdown-toggle topic-button-dropdown',
      normalTopicClassesDropdown: 'btn btn-default dropdown-toggle topic-button-dropdown',
      isSelectedTopic: topicID => this.selectedTopic === topicID,
      showDeleteTopicModal: false
    }
  },
  methods: {
    handleClickTopic(topicID) {
      store.dispatch('selectTopic', topicID);
    },
    submitNewTopic: function (e) {
      e.preventDefault()
      $('#addTopicModal').modal('hide')
      const newTopicName = this.$data.newTopicName
      store.dispatch('createTopic', newTopicName)
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
    width: 75%;
  }

  .topic-button-dropdown {
    border-radius: 0px;
    width: 25%;
  }

  #addTopicButton {
    margin-top: 20px;
  }

</style>