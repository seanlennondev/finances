import Vue from 'vue'
import Vuex from 'vuex'

import VuexORM from '@vuex-orm/core'
import Wallet from './entities/Wallet'
import Expense from './entities/Expense'
import Revenue from './entities/Revenue'

// import example from './module-example'
import Global from './Global/index'

const database = new VuexORM.Database()

database.register(Wallet)
database.register(Revenue)
database.register(Expense)

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      Global
    },
    plugins: [VuexORM.install(database)],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
