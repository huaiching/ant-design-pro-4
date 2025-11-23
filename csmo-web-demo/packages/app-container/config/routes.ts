export default [
  {
    path: '/login',
    layout: false,
    component: './login'
  },
  {
    path: '/login-auth',
    layout: false,
    component: './login/auth'
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: './home'
  },
  {
    component: './exception/404'
  }
]
