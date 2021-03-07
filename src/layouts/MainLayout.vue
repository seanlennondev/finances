<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-dark">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          {{title}}
        </q-toolbar-title>
        <div v-if="$route.path == '/wallets'">
          <q-btn round flat icon="archive" />
          <q-btn round flat icon="upload_file" />
          <q-btn round flat icon="leaderboard" />
        </div>
        <div v-if="$route.path == '/'">
          <q-btn round flat icon="visibility" />
          <q-btn round flat icon="event" />
        </div>

        <div v-if="$route.path == '/transactions'">
          <q-btn round flat icon="search" />
          <q-btn round flat icon="upload_file" />
          <q-btn round flat icon="filter_list" />
        </div>
        <div v-if="$route.path == '/credit-cards'">
          <q-btn round flat icon="archive" />
        </div>
        <div v-if="$route.path == '/graphics'">
          <q-btn round flat icon="help_outline" />
        </div>
      </q-toolbar>

      <q-toolbar class="bg-dark q-px-xl q-py-sm" v-if="$route.path == '/transactions'">
        <div>
          <q-btn flat round icon="arrow_back_ios" />
        </div>
        <q-toolbar-title class="text-center">
          Março, 2021
        </q-toolbar-title>
        <div>
          <q-btn flat round icon="arrow_forward_ios" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class=""
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-"
        >
          FINANCE
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <br />
        <q-separator />
        <q-item-label header ="text-grey-">
          REPORTS
        </q-item-label>
        <ReportsLink v-for="link in reports" :key="link.title" v-bind="link" />
        <br />
        <q-separator />
        <q-item-label header class="text-grey-">
          PREFERENCES
        </q-item-label>
        <q-item clickable exact to="/settings">
          <q-item-section avatar>
            <q-icon name="settings"></q-icon>
          </q-item-section>
          <q-item-section class="text-weight-bolder">
            Settings
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        v-if="$route.path == '/'"
        icon="add"
        vertical-actions-align="right"
        direction="up"
        color="deep-purple"
      >
        <q-fab-action @click="$router.push('/add/wallet')" color="orange" label="Wallet" />
        <q-fab-action @click="$router.push('/add/expense')" color="red" label="Expense" />
        <q-fab-action @click="$router.push('/add/revenue')" color="green" label="Revenue" />
      </q-fab>

      <q-fab
        v-if="$route.path == '/wallets'"
        icon="add"
        vertical-actions-align="right"
        direction="up"
        color="deep-purple"
        @click="$router.push('/add/wallet')"
      >
      </q-fab>

      <q-fab
        v-if="$route.path == '/credit-cards'"
        icon="credit_score"
        vertical-actions-align="right"
        direction="up"
        color="deep-purple"
        @click="$router.push('/add/credit-cards')"
      >
      </q-fab>
   </q-page-sticky>

    <q-footer class="bg-dark" v-if="$route.path == '/wallets'">
      <q-toolbar class="text-white text-weight-bolder q-py-sm">
        <q-toolbar-title class="text-weight-bold text-h6">
          Total balance
        </q-toolbar-title>
        <div class="text-h6">
          R$ 0
        </div>
      </q-toolbar>
    </q-footer>

    <q-footer class="bg-dark" v-if="$route.path == '/transactions'">
      <q-toolbar class="text-white text-weight-bolder q-py-sm">
        <div>
          <q-icon name="trending_up" color="green" /> R$ 0
        </div>
        <q-toolbar-title class="text-center">
          <q-icon name="payment" color="yellow" /> R$ 0
        </q-toolbar-title>
        <div>
          <q-icon name="trending_down" color="red" /> R$ 0
        </div>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
const reports = [
  {
    title: 'Transactions',
    caption: 'Trans',
    icon: 'timeline',
    link: '/transactions'
  },
  {
    title: 'Graphics',
    caption: 'GF',
    icon: 'data_usage',
    link: '/graphics'
  }
]

const essentialLinks = [
  {
    title: 'Overview',
    caption: 'Geral',
    icon: 'dashboard',
    link: '/'
  },
  {
    title: 'Wallets',
    caption: 'My Wallets',
    icon: 'account_balance',
    link: '/wallets'
  },
  {
    title: 'Credit Cards',
    caption: 'CD',
    icon: 'credit_card',
    link: '/credit-cards'
  },
  {
    title: 'Budget',
    caption: 'CD',
    icon: 'money_off',
    link: '/budget'
  }
]

const fabs = [
  {
    path: '/wallets',
    icon: 'add',
    color: 'deep-purple',
    link: '/add/wallet'
  },
  {
    path: '/credit-cards',
    icon: 'credit_score',
    color: 'deep-purple',
    link: '/add/credit-cards'
  }
]

export default {
  name: 'MainLayout',
  components: {
    EssentialLink: () => import('components/EssentialLink.vue'),
    ReportsLink: () => import('components/ReportsLink.vue')
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks,
      reports,
      fabs
    }
  },
  computed: {
    title () {
      if (this.$route.path === '/') {
        return 'Finance'
      } else if (this.$route.path === '/wallets') {
        return 'Wallets'
      } else if (this.$route.path === '/transactions') {
        return 'Transactions'
      } else if (this.$route.path === '/graphics') {
        return 'Graphics'
      } else if (this.$route.path === '/credit-cards') {
        return 'Credit Cards'
      } else if (this.$route.path === '/budget') {
        return 'Budget'
      } else {
        return 'Settings'
      }
    }
  }
}
</script>
