<template>
  <transition appear enter-active-class="animated slideInUp" leave-active-class="animated slideInDown"
  >
    <q-layout view="lHh lpr lFf">
      <q-header>
        <q-toolbar class="bg-dark">
          <q-btn round dense icon="arrow_back" flat @click="$router.back()" />
          <q-toolbar-title>
            Today's Revenues
          </q-toolbar-title>
        </q-toolbar>

        <q-toolbar class="bg-dark">
          <q-toolbar-title>
            <q-item class="q-px-xl q-pt-md">
              <q-item-section avatar>
                <q-btn flat round icon ="arrow_back_ios" @click="previous()" />
              </q-item-section>
              <q-item-section class="text-center" @click.prevent="openCalendar()">
                 {{calendar | calendarFormat}}
              </q-item-section>
              <q-item-section avatar>
                <q-btn flat round icon="arrow_forward_ios" @click="next()" />
              </q-item-section>
            </q-item>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page>
          <q-list separator>
            <!-- <transition-group appear enter-active-class="animated puls" leave-active-class="animated puls"> -->
              <q-item v-for="revenue in revenues" :key="revenue.id" class="q-py-md text-weight-bolder text-subtitle1">
                <q-item-section>
                  {{revenue.description}}
                </q-item-section>
                <q-item-section side :class="revenue.total < 0 ? 'text-red-4' : 'text-blue-4'">
                  {{revenue.total}}
                </q-item-section>
              </q-item>
            <!-- </transition-group> -->
          </q-list>
        </q-page>
      </q-page-container>
    </q-layout>
  </transition>
</template>

<script>
import Revenue from '../store/entities/Revenue'

import { date } from 'quasar'

export default {
  data () {
    return {
      revenues: [],
      calendar: date.formatDate(Date.now(), 'YYYY/MM/DD')
    }
  },

  filters: {
    calendarFormat: function (value) {
      return date.formatDate(value, 'ddd, D MMM YYYY')
    }
  },

  methods: {
    next: function () {
      this.changeDate(1)
    },

    previous: function () {
      this.changeDate(-1)
    },

    changeDate: function (day) {
      const calendar = date.addToDate(this.calendar, {
        days: day
      })
      this.calendar = date.formatDate(calendar, 'YYYY/MM/DD')
      this.revenues = this.getRevenuesByDay(calendar)
    },

    openCalendar: function () {
      this.$q.dialog({
        component: () => import('src/components/Calendar.vue'),
        parent: this,
        calendar: this.calendar
      }).onOk((calendar) => {
        this.revenues = this.getRevenuesByDay(calendar)
        this.calendar = calendar
      })
    },

    getRevenuesByDay: function (calendar) {
      return Revenue.query().where('date', (value) => date.isSameDate(calendar, value)).get()
    }
  },

  created () {
    this.revenues = Revenue.query().where('date', (value) => date.isSameDate(date.formatDate(Date.now(), 'YYYY/MM/DD'), value)).get()
  }
}
</script>
