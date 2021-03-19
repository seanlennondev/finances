<template>
  <transition appear enter-active-class="animated slideInUp" leave-active-class="animated slideInDown"
  >
  <q-layout>
    <q-header class="bg-dark">
      <q-toolbar>
        <div>
          <q-btn round dense icon="arrow_back" flat @click="$router.back()" />
        </div>
        <q-toolbar-title>
          Despesas de hoje
        </q-toolbar-title>
      </q-toolbar>

      <q-toolbar>
        <q-toolbar-title>
          <q-item class="q-px-xl q-pt-md">
            <q-item-section avatar>
              <q-btn flat round icon ="arrow_back_ios" @click.prevent="previous()" />
            </q-item-section>
            <q-item-section class="text-center text-weight-bolder text-h6"
               @click.prevent="openCalendar()"
            >
              {{calendar | calendarFormat}}
            </q-item-section>
            <q-item-section avatar>
              <q-btn flat round icon="arrow_forward_ios" @click.prevent="next()" />
            </q-item-section>
          </q-item>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-m">
        <q-list separator>
          <q-item v-for="expense in expenses" :key="expense.id" class="q-py-md text-weight-bolder text-subtitle1">
            <q-item-section>
              {{expense.description}}
            </q-item-section>
            <q-item-section side :class="expense.total < 0 ? 'text-red-4' : 'text-green-4'">
              {{expense.total}}
            </q-item-section>
          </q-item>
        </q-list>
        </q-page>
      </q-page-container>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-fab
            icon="add"
            vertical-actions-align="right"
            direction="up"
            color="red-4"
            @click="$router.push('/new/expense')"
          >
          </q-fab>
        </q-page-sticky>
    </q-layout>
  </transition>
</template>

<script>
import Expense from '../store/entities/Expense'
import { date } from 'quasar'

export default {
  // name: 'PageName',
  data () {
    return {
      calendar: date.formatDate(Date.now(), 'YYYY/MM/DD HH:mm:ss'),
      expenses: []
    }
  },

  filters: {
    formatDate: function (value) {
      return date.formatDate(value, 'YYYY/MM/DD HH:mm:ss')
    },

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
      const newDate = date.addToDate(this.calendar,
        {
          days: day
        })
      this.calendar = date.formatDate(newDate, 'YYYY/MM/DD')
      this.getExpenses(this.calendar)
    },
    getExpenses: function (calendar) {
      const expenses = Expense
        .query()
        .where('date', (value) => date.isSameDate(value, calendar))
        .get()
      this.expenses = expenses
    },
    openCalendar: function () {
      this.$q.dialog({
        component: () => import('src/components/Calendar.vue'),
        parent: this,
        calendar: this.calendar
      }).onOk((calendar) => {
        this.getExpenses(date.formatDate(calendar, 'YYYY/MM/DD'))
        this.calendar = calendar
      })
    }
  },

  created () {
    this.getExpenses(date.formatDate(Date.now(), 'YYYY/MM/DD'))
  }
}
</script>
