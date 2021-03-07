function setWallets (state, payload) {
  state.push(payload)
}

function setWallet (state, payload) {
  state.wallet = payload
}

function setName (state, name) {
  state.wallet.name = name
}

function setCategory (state, category) {
  state.wallet.category = category
}

export {
  setCategory,
  setName,
  setWallet,
  setWallets
}
