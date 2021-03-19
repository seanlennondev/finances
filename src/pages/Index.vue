<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-card style="border-top: 6px solid purple; ">
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
          <q-item dense clickable class="no-border-radius text-weight-bolder text-subtitle1 q-mr-none q-ml-md expense-left-border" to="/today-expenses" >
            <q-item-section>
              Despesas
            </q-item-section>
            <q-item-section side class="text-red-4">
              R$ {{expense}}
            </q-item-section>
          </q-item>

          <q-item dense clickable class="no-border-radius text-weight-bolder text-subtitle1 q-mr-none q-ml-md revenue-left-border" to="/today-revenues" >
            <q-item-section>
              Receita
            </q-item-section>
            <q-item-section side class="text-green-4">
              R$ {{revenue}}
            </q-item-section>
          </q-item>

          <q-item dense clickable class="no-border-radius text-weight-bolder text-subtitle1 q-mr-none q-ml-md transfer-left-border" to="/transactions" >
            <q-item-section>
              Transações
            </q-item-section>
            <q-item-section side class="text-deep-purple-4">
              R$ {{transfers}}
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
    },
    transfers: function () {
      return this.$store.$db().model('transfers')
        .query()
        // .where('date', (value) => {
        // const today = date.formatDate(value, 'YYYY/MM/DD')
        // const dateToday = date.formatDate(Date.now(), 'YYYY/MM/DD')
        // date.isSameDate(value, Date.now())
        // })
        .sum('amount')
        .toFixed(2)
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

  async created () {
    if (!Wallet.exists()) {
      Wallet.new()
      const wallet = await Wallet.insert({
        data: {
          name: 'PagBank',
          balance: 2000.00,
          value: 'PagBank',
          label: 'PagBank'
        }
      })
      const revenue = await Revenue.insert({
        data: {
          description: 'Salário',
          wallet_id: wallet.id,
          amount: 100.00
        }
      })

      wallet.update({
        where: wallet.id,
        data: {
          balance: wallet.balance += revenue.amount
        }
      })
    }
  }
}
</script>

<style lang="scss">
    .revenue-left-border {
        border-left: solid 4px $green-4
    }
    .expense-left-border {
        border-left: solid 4px $red-4
    }
    .transfer-left-border {
        border-left: solid 4px $deep-purple-4
    }
</style>
