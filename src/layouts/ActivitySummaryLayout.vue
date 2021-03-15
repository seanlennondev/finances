<template>
  <transition
    appear
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideInLeft"
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
        <div v-for="item in titles" :key="item.name">
          <q-toolbar-title v-if="$route.path == item.path">
            {{item.name}}
          </q-toolbar-title>
        </div>
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
  data () {
    return {
      titles: [
        {
          path: '/settings/activity-summary',
          name: 'Activity Summary'
        },
        {
          path: '/settings/about',
          name: 'Contact'
        },
        {
          path: '/settings/contact',
          name: 'About'
        },
        {
          path: '/settings/share',
          name: 'Share'
        }
      ]
    }
  }
}
</script>
