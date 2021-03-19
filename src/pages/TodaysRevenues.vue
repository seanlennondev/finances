<template>
  <transition appear enter-active-class="animated slideInUp" leave-active-class="animated slideInDown"
  >
    <q-layout view="lHh lpr lFf">
      <q-header class="bg-dark">
        <q-toolbar>
          <q-btn round dense icon="arrow_back" flat @click="$router.back()" />
          <q-toolbar-title>
            Receitas de hoje
          </q-toolbar-title>
        </q-toolbar>

        <q-toolbar>
          <q-toolbar-title>
            <q-item class="q-px-xl q-pt-md">
              <q-item-section avatar>
                <q-btn flat round icon ="arrow_back_ios" @click="previous()" />
              </q-item-section>
              <q-item-section class="text-center text-weight-bolder text-h6" @click.prevent="openCalendar()">
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
                <q-item-section avatar :class="revenue.total < 0 ? 'text-red-4' : 'text-green-4'">
                  {{revenue.total}}
                </q-item-section>
              </q-item>
            <!-- </transition-group> -->
          </q-list>
        </q-page>
      </q-page-container>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-fab
            icon="add"
            vertical-actions-align="right"
            direction="up"
            color="green-4"
            @click="$router.push('/new/revenue')"
          >
          </q-fab>
        </q-page-sticky>
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
