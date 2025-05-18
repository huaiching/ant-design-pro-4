// 圖標使用參考：https://4x.ant.design/components/icon-cn/

export default [
  // 用戶登錄相關路由（已註釋掉）
  // {
  //   path: '/user',
  //   component: '../layouts/UserLayout',  // 用戶佈局組件
  //   routes: [
  //     {
  //       name: 'login',  // 路由名稱
  //       path: '/user/login',  // 路由路徑
  //       component: './User/login',  // 組件路徑
  //     },
  //   ],
  // },
  
  // 主應用路由
  {
    path: '/',  // 根路徑
    component: '../layouts/BasicLayout',  // 基礎佈局組件
    // authority: ['admin', 'user'],  // 可訪問權限（已註釋）
    routes: [
      // 默認重定向
      {
        path: '/',
        redirect: '/welcome',  // 訪問根路徑時重定向到歡迎頁
      },
      
      // 歡迎頁面
      {
        path: '/welcome',
        name: 'welcome',  // 路由名稱（用於顯示在菜單中）
        icon: 'smile',  // 菜單圖標
        component: './Welcome',  // 組件路徑
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
        name: 'antdDemo',  // 路由名稱
        icon: 'AntDesignOutlined',  // Ant Design 圖標
        path: '/antdDemo',  // 路徑
        component: './AntdDemo',  // 組件路徑
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
      
      // 404 頁面（匹配當前布局下的未匹配路由）
      {
        component: './404',
      },
    ],
  },
  
  // 全局 404 頁面（匹配所有未定義路由）
  {
    component: './404',
  },
];