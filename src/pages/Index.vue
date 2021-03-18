<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-card style="border-top: 8px solid purple; ">
        <q-item clickable class="q-px-sm" to="/wallets">
            <q-item-section>
              <q-card-actions align="between" class="text-weight-bolder text-subtitle1">
            <div>
              Saldo de contas
            </div>
            <div :class="balance < 0 ? 'text-red-4' : 'text-blue-4'">
              R$ {{total | fixedAmount}}
            </div>
          </q-card-actions>
            </q-item-section>
        </q-item>
      </q-card>

      <q-card>
        <q-card-section class="text-weight-bolder text-subtitle1 q-pb-md row items-center justify-between">
            <div>
              Resumo diário
            </div>
              <div>
              {{now | calendarFormat}}
            </div>
        </q-card-section>
        <q-list class="q-gutter-y-md q-pb-md">
          <q-item clickable class="rounded-borders text-weight-bolder text-subtitle1 q-mr-none q-ml-md" to="/today-expenses" style="border-left: solid tomato 1px;">
            <q-item-section>
              Despesas
            </q-item-section>
            <q-item-section side class="text-red-4">
              R$ {{expense}}
            </q-item-section>
          </q-item>

          <q-item clickable class="rounded-borders text-weight-bolder text-subtitle1 q-mr-none q-ml-md" to="/today-revenues" style="border-left: solid green 1px;">
            <q-item-section>
              Receita
            </q-item-section>
            <q-item-section side class="text-green-4">
              R$ {{revenue}}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import Wallet from 'src/store/entities/Wallet'
import Expense from 'src/store/entities/Expense'
import Revenue from 'src/store/entities/Revenue'

import { date } from 'quasar'

export default {
  name: 'PageIndex',
  data () {
    return {
      now: new Date()
    }
  },

  computed: {
    total: function () {
      return Wallet.query().sum('balance')
    },

    balance: function () {
      return Wallet.query().sum('balance').toFixed(2)
    },
    expense: function () {
      return Expense.query().where('date', (value) => date.formatDate(Date.now(), 'YYYY/MM/DD') === value).sum('amount').toFixed(2)
    },
    revenue: function () {
      return Revenue.query().where('date', (value) => date.formatDate(Date.now(), 'YYYY/MM/DD') === value).sum('amount').toFixed(2)
    },
    revenues: function () {
      return Revenue.all()
    }
  },

  filters: {
    calendarFormat (value) {
      return date.formatDate(value, 'MMM, D')
    },
    fixedAmount (value) {
      return value.toFixed(2)
    }
  },

  created () {
    if (!Wallet.exists()) {
      Wallet.new()
      Wallet.insert({
        data: {
          name: 'PagBank',
          balance: 2000.00,
          value: 'PagBank',
          label: 'PagBank'
        }
      })
    }
  }
}
</script>
