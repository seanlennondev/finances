<template>
  <q-layout view="hHh Lpr fFf">
    <q-header>
      <q-toolbar class="bg-dark">
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          Header
        </q-toolbar-title>
        <div>
          <q-btn flat @click="$router.back()" label="Salvar" />
        </div>
      </q-toolbar>

    </q-header>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',

  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>
