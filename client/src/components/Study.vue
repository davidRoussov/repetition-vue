<template>
  <div id="studyComponent">
    <h2 id="heading">Study</h2>
    <input 
      :disabled="!selectedTopic"
      id="inputQuestion" 
      class="form-control" 
      type="text" 
      placeholder="Modify question"
      v-model="currentItem.Question"
    >
    <textarea 
      :disabled="!selectedTopic || answerHidden"
      id="inputAnswer" 
      class="form-control" 
      v-bind:class="{ 'answer-hidden': answerHidden }"
      type="textarea" 
      placeholder="Modify answer"
      v-model="currentItem.Answer"
    ></textarea>

    <div class="btn-group btn-group-justified">
      <a 
        href="#" 
        class="btn btn-primary"
        v-on:click="answerHidden = !answerHidden"
      >{{ answerHidden ? 'Show' : 'Hide' }}</a>
      <a 
        href="#" 
        class="btn btn-success"
        v-on:click="handleClickGood"
      >Good</a>
      <a 
        href="#" 
        class="btn btn-warning"
        v-on:click="handleClickPass"
      >Pass</a>
      <a 
        href="#" 
        class="btn btn-danger"
        v-on:click="handleClickBad"
      >Bad</a>
    </div>

  </div>  
</template>

<script>
  import store from '@/store'
  import { mapState } from 'vuex';

  export default {
    data: function() {
      return {
        answerHidden: true
      }
    },
    computed: mapState({
      selectedTopic: state => state.selectedTopic,
      currentItem: state => state.currentItem
    }),
    methods: {
      handleClickGood() {
        store.dispatch('goodItem')
      },
      handleClickPass() {
        store.dispatch('passItem')
      },
      handleClickBad() {
        store.dispatch('badItem')
      }
    }
  }
</script>

<style scoped>
  .answer-hidden {
    color: transparent;
    user-select: none;
    -webkit-user-select: none;
  }

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