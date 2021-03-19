<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-dark">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click.prevent="openMenu()"
        />

        <q-toolbar-title class="text-weight-bolder">
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

      <!-- <q-toolbar class="bg-dark q-px-xl q-py-sm" v-if="$route.path == '/transactions'">
        <div>
          <q-btn flat round icon="arrow_back_ios" />
        </div>
        <q-toolbar-title class="text-center">
          Março, 2021
        </q-toolbar-title>
        <div>
          <q-btn flat round icon="arrow_forward_ios" />
        </div>
      </q-toolbar> -->
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
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
        color="primary"
      >
        <q-fab-action @click="$router.push('/new/wallet')" color="blue" label="Carteira" />
        <q-fab-action @click="$router.push('/new/expense')" color="red" label="Despesa" />
        <q-fab-action @click="$router.push('/new/revenue')" color="green" label="Receita" />
        <q-fab-action @click="$router.push('/new/transaction')" color="deep-purple" label="Transação" />
      </q-fab>

      <q-fab
        v-if="$route.path == '/wallets'"
        icon="add"
        vertical-actions-align="right"
        direction="up"
        color="blue-4"
        @click="$router.push('/new/wallet')"
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

    <q-footer class="bg-dark" v-if="$route.path == '/transactions'">
      <q-toolbar class="text-white text-weight-bolder q-py-sm">
        <div>
          <q-icon name="trending_up" color="green" /> R$ {{revenue}}
        </div>
        <q-toolbar-title class="text-center">
          <q-icon name="payment" color="yellow" /> R$ 0
        </q-toolbar-title>
        <div>
          <q-icon name="trending_down" color="red" /> R$ {{expense}}
        </div>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Revenue from '../store/entities/Revenue'
import Expense from '../store/entities/Expense'
// import Open from 'src/store/entities/Open'

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
    ...mapGetters(['getMenu']),

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
    },

    revenue () {
      return Revenue.query().sum('amount')
    },

    expense () {
      return Expense.query().sum('amount')
    }
  },
  methods: {
    ...mapActions('addManu'),

    openMenu: function () {
      // this.$store.state.menu = !this.$store.state.menu
      // = !this.$store.state.menu
      // this.addManu(!this.getMenu)
      this.leftDrawerOpen = !this.leftDrawerOpen
      /* const open = Open.first()
      open.update({
        data: {
          menu: !this.leftDrawerOpen
        }
      }) */
    }
  }
}
</script>
