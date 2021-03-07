/*
export function someAction (context) {
}
*/

function addWallets ({ commit }, payload) {
  commit('setWallets', payload)
}

function addWallet ({ commit }, payload) {
  commit('setWallets', payload)
}

function addName ({ commit }, name) {
  commit('setTitle', name)
}

function addCategory ({ commit }, category) {
  commit('setCategory', category)
}

export {
  addName,
  addWallet,
  addWallets,
  addCategory
}
