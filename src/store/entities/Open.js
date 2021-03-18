import { Model } from '@vuex-orm/core'

export default class Open extends Model {
  static entity = 'open'

  static fields () {
    return {
      menu: this.boolean(false)
    }
  }
}
