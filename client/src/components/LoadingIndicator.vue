<template>
  <div>
    <i id="loading" class="loadingIndicator fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
    <i id="success" class="loadingIndicator fa fa-check" aria-hidden="true"></i>
    <i id="failure" class="loadingIndicator fa fa-times" aria-hidden="true"></i>
  </div>
</template>

<script>

  export default {
    created: () => {
      console.log(store.loadingIndicator)
    }
  }

</script>

<style scoped>
  .loadingIndicator {
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 40px;
  }

  #loading {

  }

  #success {
    color: #5cb85c;
  }

  #failure {
    color: #d9534f;
  }
</style>