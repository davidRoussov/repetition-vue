<template>
  <div id="addComponent">
    <h2 id="heading">Add</h2>
    <input 
      :disabled="!selectedTopic" 
      v-model="question"
      id="inputNewQuestion" 
      class="form-control" 
      type="text" 
      placeholder="Enter new problem"
    >
    <textarea 
      :disabled="!selectedTopic" 
      v-model="answer"
      id="inputNewAnswer" 
      class="form-control" 
      type="textarea" 
      placeholder="Enter the solution"
    ></textarea>
    <button 
      type="button" 
      class="btn btn-primary"
      v-on:click="handleSubmitItem"
    >Submit</button>
  </div>  
</template>

<script>
  import store from '@/store'
  import { mapState } from 'vuex';

  export default {
    data: function() {
      return {
        question: '',
        answer: ''
      }
    },
    computed: mapState({
      selectedTopic: state => state.selectedTopic
    }),
    methods: {
      handleSubmitItem() {
        const newItem = {
          question: this.question,
          answer: this.answer
        }
        store.dispatch('createItem', newItem);
      }
    }
  }
</script>

<style scoped>
  #addComponent {
    height: 100%;
    padding: 20px;
    text-align: center;
  }

  #heading {
    margin: 0px;
    color: #2C3E50;
    margin-bottom: 20px;
  }

  #inputNewQuestion {
    width: 100%;
    margin-bottom: 20px;
  }

  #inputNewAnswer {
    width: 100%;
    height: 65vh;
    margin-bottom: 20px;
  }
</style>