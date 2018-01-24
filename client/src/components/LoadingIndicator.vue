<template>
  <div>
    <i v-if="displayLoading" id="loading" class="loadingIndicator fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
    <i v-if="displaySuccess" id="success" class="loadingIndicator fa fa-check" aria-hidden="true"></i>
    <i v-if="displayFailure" id="failure" class="loadingIndicator fa fa-times" aria-hidden="true"></i>
  </div>
</template>

<script>
  import store from '../store';
  import { mapState } from 'vuex';

  export default {
    computed: mapState({
      displayLoading: state => state.loadingIndicator === 'loading',
      displaySuccess: state => state.loadingIndicator === 'success',
      displayFailure: state => state.loadingIndicator === 'failure'
    })
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