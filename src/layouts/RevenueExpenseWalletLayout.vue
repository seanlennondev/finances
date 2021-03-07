<template>
  <transition
    appear
    enter-active-class="animated slideInUp"
    leave-active-class="animated slideInDown"
  >
  <q-layout view="hHh Lpr fFf">
    <q-header>
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
        <q-btn label="Salvar" flat @click="save" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="$route.path == '/add/wallet'">
      <q-toolbar class="q-py-md text-weight-bold bg-dark">
      An account is anywhere you keep money, whether in your wallet, bank or piggy bank.
      </q-toolbar>
    </q-footer>

  </q-layout>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('Wallets', ['getWallet']),
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
  },
  methods: {
    ...mapActions('Wallets', ['addWallet']),

    save: function () {
      this.$q.notify('Wallet created successfully')
      this.$router.back()
    }
  }
}
</script>
