export default [
  {
    path: '/',
    redirect: '/claim/claimrecord'
  },
  {
    path: '/home',
    redirect: '/claim/claimrecord'
    //   name: 'home',
    //   icon: 'HomeOutlined',
    //   component: '@/pages/home'
  },
  {
    path: '/claim',
    name: 'claim',
    icon: 'DiffOutlined',
    routes: [
      {
        path: '/claim/claimrecord',
        name: 'claimrecord',
        routes: [
          {
            path: '/claim/claimrecord',
            component: '@/pages/Claim/ClaimRecord'
          }
        ]
      }
    ]
  }
]
