import { Model } from '@vuex-orm/core'
import Revenue from './Revenue'
import Expense from './Expense'

import { uid } from 'quasar'

export default class Wallet extends Model {
  static entity = 'wallets'

  static fields () {
    return {
      id: this.uid(() => uid()),
      balance: this.number(1000.00),
      name: this.string('Itau'),
      value: this.string('Itau'),
      label: this.string('Itau'),
      category: this.string('CP'),
      revenues: this.hasMany(Revenue, 'wallet_id'),
      expenses: this.hasMany(Expense, 'wallet_id')
    }
  }

  get total () {
    return this.balance.toFixed(2)
  }
}
