import Vue from 'vue'
import Vuex from 'vuex'

import VuexORM from '@vuex-orm/core'
import Wallet from './entities/Wallet'
import Expense from './entities/Expense'
import Revenue from './entities/Revenue'
import Transfer from './entities/Transfer'
// import WalletTransfer from './entities/WalletTransfer'

import Global from './Global/index'

const database = new VuexORM.Database()

database.register(Wallet)
database.register(Revenue)
database.register(Expense)
database.register(Transfer)
// database.register(WalletTransfer)

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      Global
    },
    state: {
      menu: false
    },
    getters: {
      getMenu: function (state) {
        return state.menu
      }
    },
    actions: {
      addMenu: function ({ commit }) {
        commit('setMenu')
      }
    },
    mutations: {
      setMenu: function (state) {
        state.menu = !state.menu
      }
    },
    plugins: [VuexORM.install(database)],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
