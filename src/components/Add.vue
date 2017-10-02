<template>
  <div id="addComponent">
    <h2 id="heading">Add</h2>
    <input id="inputNewQuestion" class="form-control" type="text" placeholder="Enter new problem">
    <textarea id="inputNewAnswer" class="form-control" type="textarea" placeholder="Enter the solution"></textarea>
    <button type="button" class="btn btn-primary">Submit</button>
  </div>  
</template>

<script>
  export default {

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