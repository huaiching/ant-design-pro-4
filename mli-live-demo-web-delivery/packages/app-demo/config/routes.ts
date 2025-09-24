export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    redirect: '/table/mli'
    // name: 'home',
    // icon: 'HomeOutlined',
    // component: '@/pages/Home'
  },
  {
    path: '/table',
    name: 'table',
    icon: 'TableOutlined',
    routes: [
      {
        path: '/table/mli',
        name: 'mli',
        routes: [
          {
            path: '/table/mli',
            component: '@/pages/Demo/Table/Mli'
          }
        ]
      },
      {
        path: '/table/original',
        name: 'original',
        routes: [
          {
            path: '/table/original',
            component: '@/pages/Demo/Table/Original'
          }
        ]
      },
      {
        path: '/table/date',
        name: 'date',
        routes: [
          {
            path: '/table/date',
            component: '@/pages/Demo/Table/Date'
          },{
            path: '/table/date/hello',
            component: '@/pages/Demo/Table/Date/Component/DateHello'
          }
        ]
      }
    ]
  },
  {
    path: '/form',
    name: 'form',
    icon: 'FormOutlined',
    routes: [
      {
        path: '/form/mli',
        name: 'mli',
        routes: [
          {
            path: '/form/mli',
            component: '@/pages/Demo/Form/Mli'
          }
        ]
      },
      {
        path: '/form/original',
        name: 'original',
        routes: [
          {
            path: '/form/original',
            component: '@/pages/Demo/Form/Original'
          }
        ]
      }
    ]
  },
  {
    path: '/icon',
    name: 'icon',
    icon: 'BulbOutlined',
    routes: [
      {
        path: '/icon/corporate-identity',
        name: 'corporateIdentity',
        routes: [
          {
            path: '/icon/corporate-identity',
            component: '@/pages/Demo/Icon/CorporateIdentity'
          }
        ]
      },
      {
        path: '/icon/mli',
        name: 'mli',
        routes: [
          {
            path: '/icon/mli',
            component: '@/pages/Demo/Icon/Mli'
          }
        ]
      },
      {
        path: '/icon/ant',
        name: 'ant',
        routes: [
          {
            path: '/icon/ant',
            component: '@/pages/Demo/Icon/Ant'
          }
        ]
      },
      {
        path: '/icon/fontawesome',
        name: 'fontawesome',
        routes: [
          {
            path: '/icon/fontawesome',
            component: '@/pages/Demo/Icon/FontAwesome'
          }
        ]
      }
    ]
  },
  {
    path: '/rowandcol',
    name: 'rowandcol',
    icon: 'NumberOutlined',
    routes: [
      {
        path: '/rowandcol/mli',
        name: 'mli',
        routes: [
          {
            path: '/rowandcol/mli',
            component: '@/pages/Demo/RowAndCol/Mli'
          }
        ]
      },
      {
        path: '/rowandcol/original',
        name: 'original',
        routes: [
          {
            path: '/rowandcol/original',
            component: '@/pages/Demo/RowAndCol/Original'
          }
        ]
      }
    ]
  },
  {
    path: '/editabletable',
    name: 'editabletable',
    icon: 'EditOutlined',
    routes: [
      {
        path: '/editabletable/mli',
        name: 'mli',
        routes: [
          {
            path: '/editabletable/mli',
            component: '@/pages/Demo/EditableTable/Mli'
          }
        ]
      },
      {
        path: '/editabletable/original',
        name: 'original',
        routes: [
          {
            path: '/editabletable/original',
            component: '@/pages/Demo/EditableTable/Original'
          }
        ]
      }
    ]
  },
  {
    path: '/color',
    name: 'color',
    icon: 'BgColorsOutlined',
    routes: [
      {
        path: '/color/brand',
        name: 'brandColor',
        routes: [
          {
            path: '/color/brand',
            component: '@/pages/Demo/Color/Brand'
          }
        ]
      },
      {
        path: '/color/function',
        name: 'functionalColor',
        routes: [
          {
            path: '/color/function',
            component: '@/pages/Demo/Color/Function'
          }
        ]
      },
      {
        path: '/color/nature',
        name: 'naturalColor',
        routes: [
          {
            path: '/color/nature',
            component: '@/pages/Demo/Color/Nature'
          }
        ]
      }
    ]
  },
  {
    path: '/support',
    name: 'support',
    icon: 'TeamOutlined',
    routes: [
      {
        path: '/support/keyboard',
        name: 'keyboard',
        routes: [
          {
            path: '/support/keyboard',
            component: '@/pages/Demo/Support/Keyboard'
          }
        ]
      },
      {
        path: '/support/mouse',
        name: 'mouse',
        routes: [
          {
            path: '/support/mouse',
            component: '@/pages/Demo/Support/Mouse'
          }
        ]
      }
    ]
  },
  {
    path: '/alert',
    name: 'alert',
    icon: 'WarningOutlined',
    routes: [
      {
        path: '/alert/edit-guard',
        name: 'edit-guard',
        routes: [
          {
            path: '/alert/edit-guard',
            component: '@/pages/Demo/Alert/EditGuard'
          }
        ]
      }
    ]
  }
]