import { Model } from '@vuex-orm/core'
import Revenue from './Revenue'
import Expense from './Expense'
import { uid } from 'Quasar'

export default class Wallet extends Model {
  static entity = 'wallets'

  static fields () {
    return {
      id: this.uid(() => uid()),
      balance: this.number(0.00),
      name: this.string(''),
      value: this.string(''),
      label: this.string(''),
      category: this.string(''),
      revenues: this.hasMany(Revenue, 'wallet_id'),
      expenses: this.hasMany(Expense, 'wallet_id')
    }
  }

  get total () {
    return this.balance.toFixed(2)
  }
}
