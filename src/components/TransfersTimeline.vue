<template>

                            <div class="row items-start justify-start">
                                <div style="height:120px" class="col-1 q-gutter-y-xs column items-center justify-between">
                                    <div class="">
                                        <q-btn unelevated size="10px" round color="blue-4" />
                                    </div>
                                    <div class="col bg-blue-4" style="width: 2px; height:100%;" />
                                </div>

                                <q-list dense class="col q-px-none text-subtitle1 text-weight-bolder">
                                    <q-item v-if="!other">
                                        <div class="text-subtitle2 text-uppercase text-weight-bolder text-grey">
                                            {{date | calendarDay}}
                                        </div>
                                    </q-item>
                                    <q-item class="text-h">
                                        <q-item-section>
                                            {{wallet_destination}}
                                        </q-item-section>
                                        <q-item-section avatar class="text-red-4">
                                            - R$ {{amount.toFixed(2)}}
                                        </q-item-section>
                                    </q-item>
                                    <q-item class="text-h">
                                        <q-item-section>
                                            {{wallet_sender}}
                                        </q-item-section>
                                        <q-item-section avatar class="text-green-4">
                                            + R$ {{amount.toFixed(2)}}
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
</template>

<script>
import { date } from 'quasar'

export default {
  props: {
    amount: {
      type: Number,
      required: true,
      default: 0.00
    },
    wallet_destination: {
      type: String,
      required: true,
      default: ''
    },
    wallet_sender: {
      type: String,
      required: true,
      default: ''
    },
    date: {
      type: Date,
      required: true,
      default: Date.now()
    },
    other: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  filters: {
    formatCalendar: function (value) {
      return date.formatDate(value, 'MMMM YYYY')
    },
    calendarDay: function (value) {
      return date.formatDate(value, 'ddd, D MMM YYYY')
    },
    icon: function (value) {
      return value ? undefined : 'event'
    }
  }
}
</script>
