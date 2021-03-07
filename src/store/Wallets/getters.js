
export function getTotal (state) {
  return state.wallets.revenue.map(x => x).map(x => x.amount)
}

export function getWallets (state) {
  return state.wallets
}

export function getCategories (state) {
  return state.categories.map(x => x.name)
}

export function getWallet (state) {
  return state.wallet
}
