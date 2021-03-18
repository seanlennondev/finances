import { Model } from '@vuex-orm/core'

export default class WallerTransfer extends Model {
  static entity = 'walletTransfer'

  static primaryKey = ['wallet_id', 'transfer_id']

  static fields () {
    return {
      wallet_id: this.uid(null),
      transfer_id: this.uid(null)
    }
  }
}
