<template>
  <q-page class="q-pa-md column justify-between">
    <div>
    <div class="text-h6 text-blue-4 items-start">
      Account Balance
    </div>
    <div class="">
      R$ <q-input label="Name" v-model="wallet.name" color="blue-4" />
    </div>

    <div class="row items-end justify-between">
      <q-select v-model="wallet.category" :options="categories" label="" color="blue-4" class="col-10" />
      <div style="height: 45px; width: 45px; border-radius: 50%;" class="bg-red col-2" />
    </div>

    <br />

    <!-- <q-checkbox v-model="wallet.check" label="Somar ao total da tela inicial?" class="q-py-md text-weight-bold" color="blue-4" /> -->

    <div>
      {{wallet}}
    </div>

    </div>

  </q-page>
</template>

<script>
import Wallet from '../store/entities/Wallet'

export default {
  data: () => {
    return {
      wallet: new Wallet({
        id: 1,
        name: '',
        balence: 0.00,
        category: 'Cash'
      })
    }
  }
}
</script>
