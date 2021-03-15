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
              R$ {{total}}
            </div>
          </q-card-actions>
            </q-item-section>
        </q-item>
      </q-card>

      <q-card class="q-pl-md q-py-md">
        <div class="q-gutter-y-sm">
          <div class="text-weight-bolder text-subtitle1 q-pb-sm q-pr-md row items-center justify-between">
            <div>
              Resumo diário
            </div>
              <div>
              {{now | calendarFormat}}
            </div>
          </div>

        <q-item dense clickable class="q-px-sm rounded-borders" to="/today-expenses">
          <q-item-section>
            <q-card-actions align="between" class="text-weight-bolder text-subtitle1">
              <div>
                Despesas
              </div>
              <div :class="expense < 0 ? 'text-red-4' : 'text-green-4'">
                  R$ {{expense}}
              </div>
            </q-card-actions>
          </q-item-section>
        </q-item>

        <q-item dense clickable class="q-px-sm rounded-borders" to="/today-revenues">
          <q-item-section>
            <q-card-actions align="between" class="text-weight-bolder text-subtitle1">
              <div>
                Receitas
              </div>
              <div :class="balance < 0 ? 'text-red-4' : 'text-green-4'">
                  R$ {{revenue}}
              </div>
            </q-card-actions>
          </q-item-section>
        </q-item>
        </div>
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
      const balance = Wallet.query().withAll().sum('balance')
      const revenue = Revenue.query().sum('amount')
      const expense = Expense.query().sum('amount')
      const total = balance + revenue + expense
      return total.toFixed(2)
    },

    balance: function () {
      return Wallet.query().sum('balance').toFixed(2)
    },
    expense: function () {
      return Expense.query().sum('amount').toFixed(2)
    },
    revenue: function () {
      return Revenue.query().sum('amount').toFixed(2)
    },
    revenues: function () {
      return Revenue.all()
    }
  },

  filters: {
    calendarFormat (value) {
      return date.formatDate(value, 'MMM, D')
    }
  }
}
</script>
