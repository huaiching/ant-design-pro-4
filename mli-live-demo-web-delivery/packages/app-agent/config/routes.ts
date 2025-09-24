export default [
  {
    path: '/',
    redirect: '/agent/info'
  },
  {
    path: '/home',
    // name: 'home',
    // icon: 'HomeOutlined',
    // component: '@/pages/Home',
    redirect: '/agent/info'
  },
  {
    path: '/agent',
    name: 'agent',
    icon: 'UserOutlined',
    routes: [
      {
        path: '/agent/info',
        name: 'agentinfo',
        routes: [
          {
            path: '/agent/info',
            component: '@/pages/Agent/Info'
          }
        ]
      }
    ]
  }
]
