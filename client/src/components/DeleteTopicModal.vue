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
                  <p> confirm you wish to delete: <span style="font-weight: bold;">{{ topic && topic.Name }}</span> </p>
                  <p> <span style="font-weight: bold;">warning:</span> this will delete all associated items</p>
                </div>
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" v-on:click="hide">Close</button>
            <button type="submit" class="btn btn-danger" v-on:click="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  props: ['visible', 'topic'],
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
    },
    submit: function() {
      store.dispatch('deleteTopic', this.topic.id)
      this.$emit('hide')
    }
  }
}
</script>

<style #scoped>

</style>