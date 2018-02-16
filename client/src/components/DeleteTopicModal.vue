<template>
  <div id="deleteTopicModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" v-on:click="hide">&times;</button>
          <h4 class="modal-title">Confirm topic deletion</h4>
        </div>
        <form class="form-horizontal">
          <div class="modal-body">
              <div class="form-group">
                <div class="col-lg-10">
                  <p> hey there!</p>
                </div>
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" v-on:click="hide">Close</button>
            <button type="submit" class="btn btn-danger">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['visible'],
  watch: {
    '$props': {
      handler: function (val) {
        const visible = val.visible
        if (visible) {
          $('#deleteTopicModal').modal('show')
          $('#deleteTopicModal').on('hidden.bs.modal', (e) => {
            this.$emit('hide')
          })
        } else {
          $('#deleteTopicModal').modal('hide')
          $('#deleteTopicModal').unbind('hidden.bs.modal')
        }
      },
      deep: true
    }
  },
  methods: {
    hide: function() {
      this.$emit('hide')
    }
  }
}
</script>

<style #scoped>

</style>