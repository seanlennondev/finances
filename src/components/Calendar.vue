<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card>
      <q-date no-unset today-btn color="primary" v-model="calendar" />
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="onCancelClick()" />
        <q-btn flat label="ok" @click="onOKClick(calendar)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    calendar: {
      type: Date,
      required: true
    }
  },

  methods: {
    show () {
      this.$refs.dialog.show()
    },

    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      this.$emit('hide')
    },

    onOKClick (calendar) {
      this.$emit('ok', calendar)
      this.hide()
    },

    onCancelClick () {
      this.hide()
    }
  }
}
</script>
