<template>
  <transition appear enter-active-class="animated slideInUp" leave-active-class="animated slideInDown"
  >
  <q-layout>
    <q-header>
      <q-toolbar class="bg-dark">
        <div>
          <q-btn round dense icon="arrow_back" flat @click="back()" />
        </div>
        <q-toolbar-title>
          Edit Wallet
        </q-toolbar-title>
        <q-btn icon="archive" flat round />
        <q-btn icon="delete" flat round @click="remove(wallet)" />
        <q-btn flat round icon="done" @click="save(wallet)" />
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
            <q-input type="number" placeholder="0,00" borderless
              input-class="text-h3 text-weight-bolder text-blue-4"
              v-model="wallet.balance" mask="#,##" />
          </div>
        </div>

        <q-input v-model="wallet.name" color="blue-4" label="Name" />
        <q-select v-model="wallet.category" :options="categories.map(x => x.name)" label="" color="blue-4" class="col-10" />
      </q-page>
    </q-page-container>
  </q-layout>
  </transition>
</template>

<script>
import Wallet from '../store/entities/Wallet'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      wallet: {},
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
      if (this.wallet.name === '') {
        this.$q.dialog({
          title: 'Please enter a name for the account',
          ok: {
            label: 'Fechar',
            color: 'blue-4',
            flat: true
          }
        }).onOk(() => {
          this.$q.dialog().hide()
        })
      } else {
        wallet.$save()
        this.$router.back()
      }
    },

    remove: function (wallet) {
      this.$q.dialog({
        title: 'Deseja mesmo excluir essa carteira?',
        cancel: {
          label: 'Cancel',
          flat: true,
          color: 'white'
        },
        ok: {
          label: 'excluir',
          color: 'blue-4',
          flat: true
        }
      }).onOk(() => {
        wallet.$delete()
        this.$router.back()
      }).onCancel()
    },

    back: function () {
      if (this.wallet.name === '') {
        this.$q.dialog({
          title: 'Please enter a name for the account',
          ok: {
            label: 'fechar',
            color: 'blue-4',
            flat: true
          }
        })
      } else {
        this.$router.back()
      }
    }
  },

  created () {
    this.wallet = Wallet.find(this.id)
  }
}
</script>
