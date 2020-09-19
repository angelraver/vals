<template>
  <div>
    <md-dialog-confirm
      :md-active.sync="active"
      v-bind:md-title="title"
      v-bind:md-content="content"
      v-bind:md-confirm-text="confirmText"
      v-bind:md-cancel-text="cancelText"
      @md-confirm="onConfirm" />

    <md-button class="md-primary md-raised" @click="active = true">{{buttonText}}</md-button>
  </div>
</template>

<script>
  export default {
    name: 'DialogConfirm',
    props: {
      buttonText: String,
      title: String,
      content: String,
      confirmText: String,
      cancelText: String,
      onConfirm: Function
    },
    data: () => ({
      active: false
    }),
    methods: {
      onCancel () {
        this.value = 'Disagreed'
      }
    }
  }
</script>
