export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    icon: 'HomeOutlined',
    component: '@/pages/home'
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
        component: './ReactDemo/Demo01'
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
            component: './ReactDemo/Demo02/Demo02-01'
          },
          {
            // 變數宣告與型態設定
            name: 'demo02-02',
            path: 'demo02-02',
            component: './ReactDemo/Demo02/Demo02-02'
          },
          {
            // 複雜型別(type)使用
            name: 'demo02-03',
            path: 'demo02-03',
            component: './ReactDemo/Demo02/Demo02-03'
          },
          {
            // 介面(interface)使用
            name: 'demo02-04',
            path: 'demo02-04',
            component: './ReactDemo/Demo02/Demo02-04'
          },
          {
            // 陣列操作
            name: 'demo02-05',
            path: 'demo02-05',
            component: './ReactDemo/Demo02/Demo02-05'
          },
          {
            // 函式定義與使用
            name: 'demo02-06',
            path: 'demo02-06',
            component: './ReactDemo/Demo02/Demo02-06'
          },
          {
            // 多型別變數(聯集)
            name: 'demo02-07',
            path: 'demo02-07',
            component: './ReactDemo/Demo02/Demo02-07'
          },
          {
            // 多型別變數(交集)
            name: 'demo02-08',
            path: 'demo02-08',
            component: './ReactDemo/Demo02/Demo02-08'
          },
          {
            // JS 語句示例
            name: 'demo02-09',
            path: 'demo02-09',
            component: './ReactDemo/Demo02/Demo02-09'
          },
          {
            // 樣板字串使用
            name: 'demo02-10',
            path: 'demo02-10',
            component: './ReactDemo/Demo02/Demo02-10'
          },
          {
            // 空值判斷
            name: 'demo02-11',
            path: 'demo02-11',
            component: './ReactDemo/Demo02/Demo02-11'
          }
        ]
      },
      {
        // useState 狀態管理
        name: 'demo03',
        path: 'demo03',
        component: './ReactDemo/Demo03'
      },
      {
        // props 組件通信
        name: 'demo04',
        path: 'demo04',
        component: './ReactDemo/Demo04'
      },
      {
        // useReducer 複雜狀態管理
        name: 'demo05',
        path: 'demo05',
        component: './ReactDemo/Demo05'
      },
      {
        // useContext 跨組件通信
        name: 'demo06',
        path: 'demo06',
        component: './ReactDemo/Demo06'
      },
      {
        // useEffect 副作用處理
        name: 'demo07',
        path: 'demo07',
        component: './ReactDemo/Demo07'
      },
      {
        // useRef DOM 引用
        name: 'demo08',
        path: 'demo08',
        component: './ReactDemo/Demo08'
      },
      {
        // useSyncExternalStore 外部資料訂閱
        name: 'demo09',
        path: 'demo09',
        component: './ReactDemo/Demo09',
      },
      {
        // 附錄 - Button 的 onClick 呼叫函式的寫法
        name: 'demo10',
        path: 'demo10',
        component: './ReactDemo/demo10',
      },
      {
        // 附錄 - 下載後端API產出的檔案
        name: 'demo11',
        path: 'demo11',
        component: './ReactDemo/demo11',
      },
      {
        // 附錄 - 正規表達式
        name: 'demo12',
        path: 'demo12',
        component: './ReactDemo/demo12',
      },
    ]
  },
  // Mobx 使用範例
  {
    name: 'mobXDemo',  // 路由名稱
    icon: 'ApiFilled',  // Ant Design 圖標
    path: '/mobXDemo',  // 路徑
    routes: [  // 嵌套路由
      {
        // Mobx 使用範例
        name: 'demo01',
        path: 'demo01',  // 相對路徑，實際為 /reactDemo/demo01
        component: './MobxDemo/01_MobxDocs'
      },
      {
        // 使用範例
        name: 'demo02',
        path: 'demo02',  // 相對路徑，實際為 /reactDemo/demo01
        component: './MobxDemo/02_MobxExample'
      }
    ]
  },
  // Ant Design 範例
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
        name: 'antdDemoRoutes',
        path: '/antdDemo/routes',
        component: './AntdDemo/Components/Routes',
      },
      {
        // Ant Design 組件介紹與說明
        name: 'antdDemo',
        path: '/antdDemo/demo',
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
    path: '/antdDemo/demo/PageTemplates/Query',
    component: './AntdDemo/Components/PageTemplates/Components/demo02_EditForm',
  },
  {
    path: '/antdDemo/demo/PageTemplates/Edit',
    component: './AntdDemo/Components/PageTemplates/Components/demo02_EditForm',
  },
  {
    path: '/antdDemo/demo/PageTemplates/Create',
    component: './AntdDemo/Components/PageTemplates/Components/demo02_EditForm',
  },
  {
    path: '/antdDemo/navigate',
    component: './AntdDemo/Components/Utility/Components/demo01_Navigate/Components/Navigate'
  },
  {
    path: '/antdDemo/sessionStorage',
    component: './AntdDemo/Components/Utility/Components/demo01_Navigate/Components/SessionStorage'
  },
  //後端開發
  {
    name: 'domain',
    icon: 'RocketOutlined',
    path: '/domain',
    routes: [
      {
        // 後端的增刪改查
        name: 'crud',
        path: 'crud',
        component: './DomainDemo/CRUD'
      },
      {
        // 後端的增刪改查
        name: 'spel',
        path: 'spel',
        component: './DomainDemo/SpEL'
      },
    ]
  },
]
