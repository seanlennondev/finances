<template>
  <q-page>
    <q-list padding separator>
      <q-item>
        <q-item-section>
         Night mode
        </q-item-section>

        <q-item-section avatar>
          <q-toggle @input="toggle()" v-model="dark" />
        </q-item-section>
      </q-item>

      <q-item exact v-for="link in links" :key="link.path" :to="link.path">
        <q-item-section avatar>
          <q-icon :name="link.icon" />
        </q-item-section>
        <q-item-section>
          {{link.name}}
        </q-item-section>
      </q-item>

      <q-item to="/settings/contact">
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>
        <q-item-section>
          Logoff
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

const links = [
  {
    path: '/settings/activity-summary',
    name: 'Activity Summary',
    icon: 'leaderboard'
  },
  {
    path: '/settings/share',
    name: 'Share',
    icon: 'share'
  },
  {
    path: '/settings/contact',
    name: 'Contact',
    icon: 'email'
  },
  {
    path: '/settings/about',
    name: 'About',
    icon: 'help'
  }
]

export default {
  data: () => {
    return {
      title: '',
      dark: false,
      links
    }
  },
  computed: {
    ...mapGetters('Global', ['getDarkMode'])
  },
  methods: {
    toggle: function (value, evt) {
      this.$q.dark.toggle()
      this.$q.localStorage.set('darkmode', this.dark)
    }
  },
  created () {
    this.dark = this.$q.dark.isActive
  },
  updated () {
    this.dark = this.$q.dark.isActive
  }
}
</script>
