<template>
  <transition appear enter-active-class="animated slideInUp" leave-active-class="animated slideInDown"
  >
  <q-layout>
    <q-header>
      <q-toolbar class="bg-dark">
        <div>
          <q-btn round dense icon="arrow_back" flat @click="$router.back()" />
        </div>
        <q-toolbar-title>
          Today's Expenses
        </q-toolbar-title>
      </q-toolbar>

      <q-toolbar class="bg-dark">
        <q-toolbar-title>
          <q-item class="q-px-xl q-pt-md">
            <q-item-section side>
              <q-btn flat round icon ="arrow_back_ios" />
            </q-item-section>
            <q-item-section class="text-center">
              Mar, 10
            </q-item-section>
            <q-item-section side>
              <q-btn flat round icon="arrow_forward_ios" />
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
            <q-item-section side :class="expense.total < 0 ? 'text-red-4' : 'text-blue-4'">
              {{expense.total}}
            </q-item-section>
          </q-item>
        </q-list>
        </q-page>
      </q-page-container>
    </q-layout>
  </transition>
</template>

<script>
import Expense from '../store/entities/Expense'

export default {
  // name: 'PageName',
  computed: {
    expenses () {
      return Expense.query().all()
    }
  }
}
</script>
