import { Model } from '@vuex-orm/core'
// import WalletTransfer from './WalletTransfer'
// import Wallet from './Wallet'

import { date, uid } from 'quasar'

export default class Transfer extends Model {
  static entity = 'transfers'

  static fields () {
    return {
      id: this.uid(() => uid()),
      amount: this.number(null),
      wallet_destination: this.string(''),
      wallet_sender: this.string(''),
      date: this.attr(() => date.formatDate(Date.now(), 'YYYY/MM/DD HH:mm:ss'))
    }
  }
}
