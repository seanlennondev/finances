export default function () {
  return {
    wallets: [
      {
        name: 'Minha Carteira',
        expense: [
          {
            title: 'Almoço',
            amount: 25.59
          },
          {
            title: 'Lanche',
            amount: 15.99
          }
        ],
        revenue: [
          {
            title: 'Cliente',
            amount: 12.59
          }
        ]
      }
    ],
    categories: [
      {
        id: 1,
        name: 'Cash',
        icon: 'save',
        color: 'green'
      },
      {
        id: 2,
        name: 'Investment',
        icon: '',
        color: ''
      },
      {
        id: 3,
        name: 'Current Account',
        icon: '',
        color: ''
      },
      {
        id: 4,
        name: 'Saving Account',
        icon: '',
        color: ''
      },
      {
        id: 5,
        name: 'Others',
        icon: '',
        color: ''
      }
    ],
    wallet: {
      name: '123',
      category: 'Money'
    }
  }
}
