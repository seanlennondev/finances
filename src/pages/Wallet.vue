<template>
  <q-page class="q-pa-md column justify-between">
    <div>
    <div class="text-h6 text-blue-4 items-start">
      Account Balance
    </div>
    <div class="text-h3 text-weight-bold text-blue-4 q-mb-sm">
      R$ 0,00
    </div>
    <q-input label="Name" v-model="wallet.name" color="blue-4" @input="addName" />
    <div class="row items-end justify-between">
      <q-select v-model="wallet.category" :options="categories" label="" color="blue-4" class="col-10" />
      <div style="height: 45px; width: 45px; border-radius: 50%;" class="bg-red col-2" />
    </div>

    <q-checkbox v-model="wallet.check" label="Somar ao total da tela inicial?" class="q-py-md text-weight-bold" color="blue-4" />

    <div>
      {{name}}
    </div>

    </div>

    <q-space />

    <!-- <div class="q-mb-sm text-weight-bold">
      An account is anywhere you keep money, whether in your wallet, bank or piggy bank.
    </div> -->

  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => {
    return {
      wallet: {
        name: '',
        category: 'Cash',
        check: false
      }
    }
  },
  computed: {
    ...mapGetters('Wallets', ['getWallets', 'getCategories', 'getName', 'getWallet']),
    wallets () {
      return this.getWallets
    },
    categories () {
      return this.getCategories
    },
    name () {
      return this.getName
    }
  },
  methods: {
    ...mapActions('Wallets', ['addWallet', 'addName']),
    addName () {
      this.$emit('wallet', this.wallet)
    }
  }
}
</script>
