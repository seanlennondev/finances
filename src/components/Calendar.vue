<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card>
      <q-date :minimal="$router.path == '/transactions' ? true : false" default-view="Months" mask="YYYY/MM/DD HH:mm" no-unset today-btn color="blue-4" v-model="calendar" />
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="onCancelClick()" />
        <q-btn flat label="Ok" @click="onOKClick(calendar)" />
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
