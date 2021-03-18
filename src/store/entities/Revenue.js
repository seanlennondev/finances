import { Model } from '@vuex-orm/core'
// import Wallet from './wallet'
import { uid, date } from 'quasar'

export default class Revenue extends Model {
  static entity = 'revenues'

  static fields () {
    return {
      id: this.uid(() => uid()),
      wallet_id: this.uid(),
      description: this.string(''),
      date: this.attr(() => date.formatDate(Date.now(), 'YYYY/MM/DD HH:mm')),
      amount: this.number(0.00)
    }
  }

  get total () {
    return this.amount.toFixed(2)
  }
}
