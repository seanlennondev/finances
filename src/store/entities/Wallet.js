import { Model } from '@vuex-orm/core'
import Revenue from './Revenue'
import Expense from './Expense'
import { uid } from 'Quasar'

export default class Wallet extends Model {
  static entity = 'wallets'

  static fields () {
    return {
      id: this.uid(() => uid()),
      balance: this.number(1000.57),
      name: this.string('My Wallet'),
      value: this.string('My Wallet'),
      label: this.string('My Wallet'),
      category: this.string('CC'),
      revenues: this.hasMany(Revenue, 'wallet_id'),
      expenses: this.hasMany(Expense, 'wallet_id')
    }
  }

  get total () {
    return this.balance.toFixed(2)
  }
}
