
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
        path: '/transactions',
        component: () => import('pages/Transactions.vue')
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
  /* {
    path: '/reports',
    component: () => import('layouts/ReportsLayout.vue'),
    children: [
      {
        path: 'transactions',
        component: () => import('pages/Transactions.vue')
      }
    ]
  }, */
  {
    path: '/settings',
    component: () => import('layouts/SettingsLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Settings.vue')
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
