<template>
    <transition appear
        enter-active-class="animated slideInUp"
        leave-active-class="animated slideInDown"
    >
        <q-layout view="lHh lpr lFf">
            <q-header class="bg-dark">
                <q-toolbar>
                    <q-btn dense icon="arrow_back" round flat @click.prevent="$router.back()" />
                    <q-toolbar-title class="text-weight-bolder">
                        Transações
                    </q-toolbar-title>
                </q-toolbar>
                <q-toolbar>
                    <q-toolbar-title>
                        <q-item class="q-px-xl q-pt-md">
                            <q-item-section avatar>
                                <q-btn flat round icon ="arrow_back_ios" @click="previous()" />
                            </q-item-section>
                            <q-item-section class="text-center text-weight-bolder text-h6" @click.prevent="openCalendar()">
                               {{calendar | calendarDay}}
                            </q-item-section>
                            <q-item-section avatar>
                                <q-btn flat round icon="arrow_forward_ios" @click="next()" />
                            </q-item-section>
                        </q-item>
                    </q-toolbar-title>
                </q-toolbar>
            </q-header>

            <q-page-container>
                <q-page class="q-py-md q-pl-md">
                    <div
                        v-for="item in transfers"
                        :key="item.id"
                         style="height:145px"
                    >
                        <div class="row items-start justify-start">
                            <div style="height:145px" class="col-1 q-gutter-y-xs column items-center justify-between">
                                <div class="">
                                    <q-btn unelevated :size="!item.other ? '10px' : '7px'" round color="blue-4" :icon="item | icon" />
                                </div>
                                <div class="col bg-blue-4" style="width: 2px; height:100%;" />
                            </div>

                            <q-list dense class="col q-px-none text-subtitle1 text-weight-bolder">
                                <q-item v-if="!item.other">
                                    <div class="text-subtitle2 text-weight-bolder text-blue-4">
                                        {{item.date | calendarDay}}
                                    </div>
                                </q-item>
                                <q-item class="q-mt-md" :class="{'q-mt-xl': item.other}">
                                    <q-item-section>
                                        {{item.wallet_destination}}
                                    </q-item-section>
                                    <q-item-section avatar class="text-red-4">
                                        - R$ {{item.amount.toFixed(2)}}
                                    </q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section>
                                        {{item.wallet_sender}}
                                    </q-item-section>
                                    <q-item-section avatar class="text-green-4">
                                        + R$ {{item.amount.toFixed(2)}}
                                    </q-item-section>
                                    <q-separator spaced />
                                </q-item>
                            </q-list>
                        </div>
                    </div>
                </q-page>
            </q-page-container>

            <q-page-sticky position="bottom-right" :offset="[18, 18]">
                <q-fab icon="add" vertical-actions-align="right" direction="up" color="blue-4"
                    @click="$router.push('/new/transaction')"
                >
                </q-fab>
            </q-page-sticky>
            <q-footer class="bg-dark">
                <q-toolbar class="text-white -weight-bolder q-py-sm">
                    <div class="text-weight-bolder">
                        <q-icon name="trending_up" color="green" /> R$ {{revenues}}
                    </div>
                    <q-toolbar-title class="text-center">
                        <q-icon name="payment" color="yellow" /> R$ 0
                    </q-toolbar-title>
                    <div class="text-weight-bolder">
                        <q-icon name="trending_down" color="red" /> R$ {{expenses}}
                    </div>
                </q-toolbar>
            </q-footer>
        </q-layout>
    </transition>
</template>

<script>
import { date } from 'quasar'

import Transfer from 'src/store/entities/Transfer'
import Revenue from 'src/store/entities/Revenue'
import Expense from 'src/store/entities/Expense'

export default {
  data: () => {
    return {
      calendar: date.formatDate(Date.now(), 'YYYY/MM/DD HH:mm:ss'),
      transfers: []
    }
  },

  computed: {
    revenues: function () {
      return Revenue.query().sum('amount').toFixed(2) || 0
    },

    expenses: function () {
      return Expense.query().sum('amount').toFixed(2) || 0
    }
  },

  filters: {
    formatCalendar: function (value) {
      return date.formatDate(value, 'MMMM YYYY')
    },

    calendarDay: function (value) {
      return date.formatDate(value, 'ddd, D MMM YYYY')
    },

    icon: function (transfer) {
      return transfer.other ? undefined : 'event'
    }
  },

  methods: {
    next: function () {
      this.changeDate(1)
    },

    previous: function () {
      this.changeDate(-1)
    },

    openCalendar: function () {
      this.$q.dialog({
        component: () => import('src/components/Calendar.vue'),
        parent: this,
        calendar: this.calendar
      }).onOk((calendar) => {
        this.transfers = this.getTransfers(calendar)
        this.calendar = date.formatDate(calendar, 'YYYY/MM/DD HH:mm:ss')
      })
    },

    changeDate: function (month) {
      const calendar = date.addToDate(this.calendar, {
        month: month
      })
      this.calendar = date.formatDate(calendar, 'YYYY/MM/DD HH:mm:ss')
      this.transfers = this.getTransfers(calendar)
    },

    getTransfers: function (calendar) {
      const today = date.formatDate(calendar, 'YYYY/MM')
      const transfers = Transfer
        .query()
        .orderBy('date', 'desc')
        .where('date', (value) => date.isSameDate(today, date.formatDate(value, 'YYYY/MM')))
        .get()
      transfers.forEach(x => {
        x.date = date.formatDate(x.date, 'YYYY/MM/DD')
      })
      transfers.forEach((calendar, index, array) => {
        const i = index += 1
        if (date.isSameDate(array[i]?.date, calendar.date)) {
          array[index].other = true
        }
      })
      return transfers
    },

    openMenu: function () {
      this.$store.state.menu = !this.$store.state.memu
    }
  },

  created () {
    this.transfers = this.getTransfers(Date.now())
  }
}
</script>
