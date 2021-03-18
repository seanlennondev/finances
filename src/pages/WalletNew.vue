<template>
  <transition appear enter-active-class="animated slideInUp" leave-active-class="animated slideInDown"
  >
  <q-layout>
    <q-header>
      <q-toolbar class="bg-dark">
        <div>
          <q-btn round dense icon="arrow_back" flat @click="$router.back()" />
        </div>
        <q-toolbar-title>
          Nova Carteira
        </q-toolbar-title>
        <q-btn flat label="salvar" @click="save(wallet)" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <div class="text-h6 text-blue-4 items-start">
          Saldo da conta
        </div>
        <div class="row items-center q-pb-md">
          <div class="col-2 text-weight-bolder text-h3 text-blue-4">
            R$
          </div>
          <div class="col-10">
            <q-input borderless
              input-class="text-h3 text-weight-bolder text-blue-4"
              v-model="wallet.balance" mask="#.##" fill-mask="0" reverse-fill-mask />
          </div>
        </div>

        <q-input v-model="wallet.name" color="blue-4" placeholder="Nome" input-class="text-h6 text-weight-bolder" />
        <q-select v-model="wallet.category" :options="categories.map(x => x.name)" color="blue-4" class="col-10 text-h6 text-weight-bolder" input-class="text-h6 text-weight-bolder" popup-content-class="text-h6 text-weight-bolder" />
      </q-page>
    </q-page-container>

    <q-footer class="q-pa-md bg-dark text-weight-bold">
      <!-- An account is anywhere you keep money, whether in your wallet, bank or piggy bank. -->
      Uma conta é qualquer lugar aonde você guarde dinheiro, banco ou cofrinho.
    </q-footer>
  </q-layout>
  </transition>
</template>

<script>
import Wallet from '../store/entities/Wallet'

export default {
  data: () => {
    return {
      wallet: new Wallet({
        name: '',
        category: 'Cash',
        balance: 0.00
      }),
      categories: [
        {
          name: 'Cash'
        },
        {
          name: 'CC'
        },
        {
          name: 'CP'
        },
        {
          name: 'Others'
        }
      ]
    }
  },

  methods: {
    save: function (wallet) {
      if (wallet.name === '') {
        this.$q.dialog({
          title: 'Por favor entre com um nome para a carteira',
          ok: {
            label: 'Fechar',
            color: 'blue-4',
            flat: true
          }
        }).onOk(() => {
          this.$q.dialog().hide()
        })
      } else {
        Wallet.insert({
          data: {
            name: wallet.name,
            balance: parseFloat(wallet.balance),
            category: wallet.category,
            value: wallet.name,
            label: wallet.name
          }
        })
        this.$router.back()
      }
    }
  }
}
</script>
