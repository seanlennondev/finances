import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import Global from './Global/index'
import Wallets from './Wallets/index'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      Global,
      Wallets
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
