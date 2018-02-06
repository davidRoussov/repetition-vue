<template>
  <div id="studyComponent">
    <h2 id="heading">Study</h2>
    <input 
      :disabled="!selectedTopic"
      id="inputQuestion" 
      class="form-control" 
      type="text" 
      placeholder="Modify question"
    >
    <textarea 
      :disabled="!selectedTopic"
      id="inputAnswer" 
      class="form-control" 
      type="textarea" 
      placeholder="Modify answer"
    ></textarea>

    <div class="btn-group btn-group-justified">
      <a href="#" class="btn btn-primary">Hide</a>
      <a href="#" class="btn btn-success">Good</a>
      <a href="#" class="btn btn-warning">Pass</a>
      <a href="#" class="btn btn-danger">Bad</a>
    </div>

  </div>  
</template>

<script>
  import store from '@/store'
  import { mapState } from 'vuex';

  export default {
    computed: mapState({
      selectedTopic: state => state.selectedTopic
    })
  }
</script>

<style scoped>
  #studyComponent {
    height: 100%;
    padding: 20px;
    text-align: center;
  }

  #heading {
    margin: 0px;
    color: #2C3E50;
    margin-bottom: 20px;
  }

  #inputQuestion {
    width: 100%;
    margin-bottom: 20px;
  }

  #inputAnswer {
    width: 100%;
    height: 65vh;
    margin-bottom: 20px;
  }
</style>