<template>
    <transition appear
        enter-active-class="animated slideInUp"
        leave-active-class="animated slideInDown"
    >
    <q-layout>
        <q-header class="bg-dark">
            <q-toolbar>
                <q-btn dense flat icon="close" @click="$router.back()" />
                <q-toolbar-title>
                    Nova Transação
                </q-toolbar-title>
                <q-btn label="salvar" flat @click="onSubmit()" />
            </q-toolbar>
        </q-header>
        <q-page-container>
            <q-page>
                <q-form>
                    <q-input
                        input-class="text-h3 text-deep-purple-4 text-weight-bolder"
                        class="q-pa-md"
                        borderless
                        v-model="transfer.amount"
                        mask="#.##" fill-mask="0"
                        reverse-fill-mask
                    >
                        <template #prepend>
                            <div class="text-weight-bolder text-deep-purple-4 text-h3">
                                R$
                            </div>
                        </template>
                    </q-input>
                    <q-separator />
                    <div>
                        <q-select popup-content-class="text-weight-bolder text-h6" color="blue-4" class="text-weight-bolder text-h6 q-px-md q-pt-sm" borderless v-model="transfer.from" :options="wallets">
                            <template #prepend>
                                <q-icon color="red-4" name="account_balance" flat dense  />
                            </template>
                        </q-select>
                        <div class="row items-center">
                            <q-icon class="q-px-md col-auto" size="sm" name="arrow_downward" />
                            <q-separator class="col" space />
                        </div>
                        <q-select popup-content-class="text-weight-bolder text-h6" color="blue-4" class="q-px-md q-pb-sm text-h6 text-weight-bolder" borderless v-model="transfer.to" :options="wallets">
                            <template #prepend>
                                <q-icon color="green-4" name="account_balance" flat dense />
                            </template>
                        </q-select>
                        <q-separator />
                        <q-item dense>
                          <q-item-section side>
                            <q-icon name="event" color="deep-purple-4">
                              <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-date color="deep-purple-4" no-unset today-btn v-model="transfer.date">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Fechar" flat />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </q-item-section>
                          <q-item-section>
                            <q-input item-aligned color="deep-purple-4" class="q-pl-none" input-class="text-h6 text-weight-bold" borderless v-model="transfer.date" mask="####/##/##" fill-mask="0" :rules="['date']">
                            </q-input>
                          </q-item-section>
                        </q-item>
                    </div>
                </q-form>
            </q-page>
        </q-page-container>
    </q-layout>
    </transition>
</template>

<script>
import Wallet from 'src/store/entities/Wallet'
import Transfer from 'src/store/entities/Transfer'
import { date } from 'quasar'

export default {
  data: () => ({
    transfer: {
      amount: null,
      from: null,
      to: null,
      date: date.formatDate(Date.now(), 'YYYY/MM/DD HH:mm:ss')
    },
    wallets: null
  }),

  methods: {
    onSubmit: function () {
      Wallet.update({
        where: this.transfer.from.id,
        data: {
          balance: this.transfer.from.balance -= parseFloat(this.transfer.amount)
        }
      })

      Wallet.update({
        where: this.transfer.to.id,
        data: {
          balance: this.transfer.to.balance += parseFloat(this.transfer.amount)
        }
      })

      const transfer = new Transfer({
        amount: parseFloat(this.transfer.amount).toFixed(2),
        wallet_destination: this.transfer.from.name,
        wallet_sender: this.transfer.to.name,
        date: date.formatDate(this.transfer.date, 'YYYY/MM/DD HH:mm:ss')
      })
      transfer.$save()
      this.$router.back()
    }
  },

  created () {
    this.wallets = Wallet.all()
  }
}
</script>
