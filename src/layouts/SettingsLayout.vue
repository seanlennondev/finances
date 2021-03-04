<template>
  <transition
    appear
    enter-active-class="animated slideInUp"
    leave-active-class="animated slideInDown"
  >
  <q-layout view="hHh Lpr fFf">
    <q-header>
      <q-toolbar class="bg-dark">
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          @click="$router.back()"
        />
      </q-toolbar>
      <q-toolbar class="bg-dark">
        <q-item class="q-pb-md q-pt-lg">
          <q-item-section thumbnail>
            <q-avatar size="100px">
              <img src="../assets/img-profile.jpg" />
            </q-avatar>
          </q-item-section>
          <q-item-section side class="text-white text-weight-bolder">
            <q-item-label class="text-h6">
              Sean Lennon
            </q-item-label>
            <q-item-label caption>
              Conta vinculada ao google
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
  </transition>
</template>

<script>
export default {
  // name: 'LayoutName',

  data () {
    return {
      //
    }
  }
}
</script>
