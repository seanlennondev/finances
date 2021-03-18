<template>
  <q-page>
    <q-list separator>
      <q-item class="q-py-md" v-for="(wallet, index) in wallets" :key="index" :to="`/edit/wallet/${wallet.id}`">
        <q-item-section side>
          <q-icon round flat name="account_balance" color="blue-4" />
        </q-item-section>
        <q-item-section class="text-weight-bolder text-h6 text">
          {{wallet.name}}
          </q-item-section>
        <q-item-section side class="text-weight-bolder text-h6" :class="wallet.balance < 0 ? 'text-red-5' : 'text-green-5'">
          R$ {{wallet.balance
           | fixedAmount}}
        </q-item-section>
      </q-item>
      <q-separator v-if="wallets.length !== 0" />
    </q-list>

    <q-footer class="bg-dark">
      <q-toolbar class="text-white text-weight-bolder q-py-sm">
        <q-toolbar-title class="text-weight-bold text-h6">
          Saldo total
        </q-toolbar-title>
        <div class="text-h6 text-weight-bolder" :class="total < 0 ? 'text-red-4' : 'text-green-4'">
          R$ {{total | fixedAmount}}
        </div>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import Wallet from '../store/entities/Wallet'

export default {
  computed: {
    wallets: function () {
      return Wallet.query().all()
    },

    total: function () {
      return Wallet.query().sum('balance')
    }
  },

  filters: {
    fixedAmount (value) {
      return value.toFixed(2)
    }
  }
}
</script>
