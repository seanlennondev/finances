<template>
  <transition
    appear
    enter-active-class="animated slideInUp"
    leave-active-class="animated slideInDown"
  >
    <q-layout>
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
          New Revenue
        </q-toolbar-title>
        <q-btn label="Salvar" flat @click="save()" />
      </q-toolbar>
    </q-header>
      <q-page-container>
        <q-page>
          <q-form @submit="onSubmit()">
            <q-input input-class="text-h3 text-blue-4 text-weight-bolder" class="q-pa-md" borderless v-model="revenue.amount" mask="#.##" fill-mask="0" reverse-fill-mask>
              <template #prepend>
                <div class="text-weight-bolder text-blue-4 text-h3">
                  R$
            </div>
          </template>
      </q-input>

            <q-separator />

            <q-list separator padding>
              <q-item>
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>
          <q-item-section>
            <q-input input-class="text-h6" placeholder="Description" borderless color="blue-4" v-model="revenue.description" />
          </q-item-section>
        </q-item>

              <q-item>
          <q-item-section avatar>
            <q-icon name="account_balance" />
          </q-item-section>
          <q-item-section>
            <q-select borderless v-model="wallet" :options="wallets" class="text-weight-bolder text-h6" />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon name="event">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date no-unset today-btn v-model="revenue.date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </q-item-section>
          <q-item-section>
            <q-input item-aligned color="blue-4" class="q-pl-none" input-class="text-h6 text-weight-bold" borderless v-model="revenue.date" mask="####/##/##" fill-mask="0" :rules="['date']">
            </q-input>
          </q-item-section>
        </q-item>
            </q-list>
          </q-form>
        </q-page>
      </q-page-container>
    </q-layout>
  </transition>
</template>

<script>
import Revenue from 'src/store/entities/Revenue'
import Wallet from 'src/store/entities/Wallet'

import { date } from 'quasar'

export default {
  data () {
    return {
      revenue: new Revenue({
        amount: 0.00,
        description: 'Empréstimo',
        date: date.formatDate(Date.now(), 'YYYY/MM/DD')
      }),
      wallet: null,
      wallets: null
    }
  },

  filters: {
    getName: function (value) {
      return value.map(x => x.name)
    },

    formatDate: function (value) {
      return date.formatDate(value, 'DD/MM/YYYY')
    }
  },

  methods: {
    save: function () {
      Wallet.update({
        where: this.wallet.id,
        data: {
          balance: this.wallet.balance += parseInt(this.revenue.amount)
        }
      })

      Revenue.insert({
        data: {
          description: this.revenue.description,
          amount: this.revenue.amount,
          wallet_id: this.wallet.id,
          date: this.revenue.date
        }
      })
      this.$router.back()
    }
  },

  created () {
    this.wallets = Wallet.all()
  }
}
</script>
