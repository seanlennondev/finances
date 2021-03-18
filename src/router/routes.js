
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/wallets',
        component: () => import('pages/Wallets.vue')
      },
      {
        path: '/graphics',
        component: () => import('pages/Graphics.vue')
      },
      {
        path: '/credit-cards',
        component: () => import('pages/CreditCards.vue')
      },
      {
        path: '/budget',
        component: () => import('pages/Budget.vue')
      }
    ]
  },
  {
    path: '/transactions',
    component: () => import('pages/Transactions.vue')
  },
  {
    path: '/new/transaction',
    component: () => import('pages/TransactionNew.vue')
  },
  {
    path: '/new/revenue',
    component: () => import('pages/Revenue.vue')
  },
  {
    path: '/new/expense',
    component: () => import('pages/Expense.vue')
  },

  {
    path: '/add',
    component: () => import('layouts/RevenueExpenseWalletLayout.vue'),
    children: [
      {
        path: 'revenue',
        component: () => import('pages/Revenue.vue')
      },
      {
        path: 'expense',
        component: () => import('pages/Expense.vue')
      },
      {
        path: 'wallet',
        component: () => import('pages/Wallet.vue')
      },
      {
        path: 'credit-cards',
        component: () => import('pages/CreditCards.vue')
      }
    ]
  },

  {
    path: '/today-expenses',
    component: () => import('pages/TodaysExpenses.vue')
  },
  {
    path: '/today-revenues',
    component: () => import('pages/TodaysRevenues.vue')
  },

  {
    path: '/new/wallet',
    component: () => import('pages/WalletNew.vue')
  },
  {
    path: '/edit/wallet/:id',
    component: () => import('pages/WalletEdit.vue'),
    props: true
  },

  {
    path: '/settings',
    component: () => import('layouts/SettingsLayout.vue'),
    exact: true,
    children: [
      {
        path: '',
        component: () => import('pages/Settings.vue')
      }
    ]
  },

  {
    path: '/settings',
    component: () => import('layouts/ActivitySummaryLayout.vue'),
    exact: true,
    children: [
      {
        path: 'activity-summary',
        component: () => import('pages/ActivitySummary.vue')
      },
      {
        path: 'share',
        component: () => import('pages/Share.vue')
      },
      {
        path: 'contact',
        component: () => import('pages/Contact.vue')
      },
      {
        path: 'about',
        component: () => import('pages/About.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
