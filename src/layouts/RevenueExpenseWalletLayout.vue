<template>
  <transition
    appear
    enter-active-class="animated slideInUp"
    leave-active-class="animated slideInDown"
  >
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar class="bg-dark">
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          @click="$router.back()"
        />
        <q-toolbar-title>
          {{title}}
        </q-toolbar-title>
        <q-btn label="Salvar" flat />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
  </transition>
</template>

<script>

export default {
  computed: {
    title: function () {
      if (this.$route.path === '/add/revenue') {
        return 'Revenue'
      } else if (this.$route.path === '/add/expense') {
        return 'Expense'
      } else if (this.$route.path === '/add/wallet') {
        return 'Wallet'
      } else if (this.$route.path === '/add/credit-cards') {
        return 'Credit Card'
      } else {
        return 'Credit Card'
      }
    }
  }
}
</script>
