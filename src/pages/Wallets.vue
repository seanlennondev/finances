<template>
  <q-page>
    <q-list padding>
      <q-item v-for="wallet in wallets" :key="wallet.name">
          <q-item-section avatar>
            <q-icon round flat color="red" name="leaderboard" />
          </q-item-section>
          <q-item-section>
            {{wallet.name}}
          </q-item-section>
      </q-item>
      {{total}}
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => {
    return {
      wallet: {
        name: '',
        category: 'Money',
        check: false
      }
    }
  },
  computed: {
    ...mapGetters('Wallets', ['getWallets', 'getCategories', 'getTotal']),
    wallets () {
      return this.getWallets
    },
    categories () {
      return this.getCategories
    },
    total () {
      return this.getTotal
    }
  },
  methods: {
    addWallet: function () {
      this.addWallet(this.wallet)
    }
  }
}
</script>
