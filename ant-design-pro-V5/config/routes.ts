/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Admin',
      },
    ],
  },
  // React 基礎語法示例區塊
  {
    name: 'reactDemo',  // 路由組名稱
    icon: 'TrademarkCircleFilled',  // 菜單圖標
    path: '/reactDemo',  // 基礎路徑
    routes: [  // 嵌套路由
      {
        // 頁面文件基本結構示例
        name: 'demo01',
        path: 'demo01',  // 相對路徑，實際為 /reactDemo/demo01
        component: './ReactDemo/Demo01',
      },
      {
        // JS 與 TypeScript 語法示例
        name: 'demo02',
        path: 'demo02',
        routes: [  // 多級嵌套路由
          {
            // CSS 樣式處理
            name: 'demo02-01',
            path: 'demo02-01',  // 實際路徑：/reactDemo/demo02/demo02-01
            component: './ReactDemo/Demo02/Demo02-01',
          },
          {
            // 變數宣告與型態設定
            name: 'demo02-02',
            path: 'demo02-02',
            component: './ReactDemo/Demo02/Demo02-02',
          },
          {
            // 複雜型別(type)使用
            name: 'demo02-03',
            path: 'demo02-03',
            component: './ReactDemo/Demo02/Demo02-03',
          },
          {
            // 介面(interface)使用
            name: 'demo02-04',
            path: 'demo02-04',
            component: './ReactDemo/Demo02/Demo02-04',
          },
          {
            // 陣列操作
            name: 'demo02-05',
            path: 'demo02-05',
            component: './ReactDemo/Demo02/Demo02-05',
          },
          {
            // 函式定義與使用
            name: 'demo02-06',
            path: 'demo02-06',
            component: './ReactDemo/Demo02/Demo02-06',
          },
          {
            // 多型別變數(聯集)
            name: 'demo02-07',
            path: 'demo02-07',
            component: './ReactDemo/Demo02/Demo02-07',
          },
          {
            // 多型別變數(交集)
            name: 'demo02-08',
            path: 'demo02-08',
            component: './ReactDemo/Demo02/Demo02-08',
          },
          {
            // JS 語句示例
            name: 'demo02-09',
            path: 'demo02-09',
            component: './ReactDemo/Demo02/Demo02-09',
          },
          {
            // 樣板字串使用
            name: 'demo02-10',
            path: 'demo02-10',
            component: './ReactDemo/Demo02/Demo02-10',
          },
        ]
      },
      {
        // useState 狀態管理
        name: 'demo03',
        path: 'demo03',
        component: './ReactDemo/Demo03',
      },
      {
        // props 組件通信
        name: 'demo04',
        path: 'demo04',
        component: './ReactDemo/Demo04',
      },
      {
        // useReducer 複雜狀態管理
        name: 'demo05',
        path: 'demo05',
        component: './ReactDemo/Demo05',
      },
      {
        // useContext 跨組件通信
        name: 'demo06',
        path: 'demo06',
        component: './ReactDemo/Demo06',
      },
      {
        // useEffect 副作用處理
        name: 'demo07',
        path: 'demo07',
        component: './ReactDemo/Demo07',
      },
      {
        // useRef DOM 引用
        name: 'demo08',
        path: 'demo08',
        component: './ReactDemo/Demo08',
      },
    ],
  },

  // Ant Design 組件示例區塊
  {
    name: 'antd',  // 路由名稱
    icon: 'AntDesignOutlined',  // Ant Design 圖標
    path: '/antdDemo',  // 路徑
    routes: [      
      {
        // Ant Design 組件介紹與說明
        name: 'antdDemoComponents',
        path: '/antdDemo/components',
        component: './AntdDemo/Components/Navigate',
      },
      {
        // Ant Design 組件介紹與說明
        name: 'antdDemo',
        path: '/antdDemo/demo',
        // component: './AntdDemo',  // 組件路徑
        routes: [
          {
            name: 'Form',
            path: '/antdDemo/demo/Form',
            component: './AntdDemo/Components/Form'
          },
          {
            name: 'Container',
            path: '/antdDemo/demo/Container',
            component: './AntdDemo/Components/Container'
          },
          {
            name: 'Table',
            path: '/antdDemo/demo/Table',
            component: './AntdDemo/Components/Table'
          },
          {
            name: 'LayoutUi',
            path: '/antdDemo/demo/LayoutUi',
            component: './AntdDemo/Components/LayoutUi'
          },
          {
            name: 'DataDisplay',
            path: '/antdDemo/demo/DataDisplay',
            component: './AntdDemo/Components/DataDisplay'
          },
          {
            name: 'Utility',
            path: '/antdDemo/demo/Utility',
            component: './AntdDemo/Components/Utility'
          },
          {
            name: 'PageTemplates',
            path: '/antdDemo/demo/PageTemplates',
            component: './AntdDemo/Components/PageTemplates'
          }
        ]
      }
    ]
  },
  {
    path: '/antdDemo/navigate',
    component: './AntdDemo/Components/Utility/Components/demo01_Navigate/Components/Navigate',
  },
  {
    path: '/antdDemo/sessionStorage',
    component: './AntdDemo/Components/Utility/Components/demo01_Navigate/Components/SessionStorage',
  },

  // api 呼叫範例
  {
    name: 'apiDemo',  // 路由名稱
    icon: 'ApiFilled',  // Ant Design 圖標
    path: '/apiDemo',  // 路徑
    routes: [  // 嵌套路由
      {
        // 頁面文件基本結構示例
        name: 'demo01',
        path: 'demo01',  // 相對路徑，實際為 /reactDemo/demo01
        component: './ApiDemo/Demo01',
      },
      {
        // 頁面文件基本結構示例
        name: 'demo02',
        path: 'demo02',  // 相對路徑，實際為 /reactDemo/demo01
        component: './ApiDemo/Demo02',
      },
    ]
  },

  // Mobx 使用範例
  {
    name: 'mobXDemo',  
    icon: 'ApiFilled',  
    path: '/mobXDemo',  
    routes: [ 
      {
        // 使用說明
        name: 'demo01',
        path: 'demo01',
        component: './MobxDemo/01_MobxDocs',
      },
      {
        //   'menu.mobXDemo.demo02': '使用範例',
        name: 'demo02',
        path: 'demo02',
        component: './MobxDemo/02_MobxExample',
      },
    ]
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
