// icons: https://4x.ant.design/components/icon-cn/

export default [
  // {
  //   path: '/user',
  //   component: '../layouts/UserLayout',
  //   routes: [
  //     {
  //       name: 'login',
  //       path: '/user/login',
  //       component: './User/login',
  //     },
  //   ],
  // },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        redirect: '/welcome',
      },
      {
        // 首頁: 歡迎頁面
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      {
        // React 基本語法範例
        name: 'reactDemo',
        icon: 'TrademarkCircleFilled',
        path: '/reactDemo',
        routes: [
          {
            // 頁面檔的基本結構
            name: 'demo01', 
            path: 'demo01',
            component: './ReactDemo/Demo01',
          },
          {
            // JS 與 TypeScript
            name: 'demo02', 
            path: 'demo02',
            routes: [
              {
                // CSS 樣式
                name: 'demo02-01',
                path: 'demo02-01',
                component: './ReactDemo/Demo02/Demo02-01',
              },
              {
                // 變數宣告 與 型態設定
                name: 'demo02-02',
                path: 'demo02-02',
                component: './ReactDemo/Demo02/Demo02-02',
              },
              {
                // 複雜型別(type)
                name: 'demo02-03',
                path: 'demo02-03',
                component: './ReactDemo/Demo02/Demo02-03',
              },
              {
                // 介面(interface)
                name: 'demo02-04',
                path: 'demo02-04',
                component: './ReactDemo/Demo02/Demo02-04',
              },
              {
                // 陣列
                name: 'demo02-05',
                path: 'demo02-05',
                component: './ReactDemo/Demo02/Demo02-05',
              },
              {
                // 函式
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
                // JS 語句
                name: 'demo02-09',
                path: 'demo02-09',
                component: './ReactDemo/Demo02/Demo02-09',
              },
              {
                // 樣板字串
                name: 'demo02-10',
                path: 'demo02-10',
                component: './ReactDemo/Demo02/Demo02-10',
              },
            ]
          },
          {
            // useState 狀態機
            name: 'demo03', 
            path: 'demo03',
            component: './ReactDemo/Demo03',
          },
          {
            // props 組件的信息傳遞
            name: 'demo04', 
            path: 'demo04',
            component: './ReactDemo/Demo04',
          },
          {
            // useReducer 管理複雜邏輯的狀態機
            name: 'demo05', 
            path: 'demo05',
            component: './ReactDemo/Demo05',
          },
          {
            // useContext 遠端的信息傳遞
            name: 'demo06', 
            path: 'demo06',
            component: './ReactDemo/Demo06',
          },
          {
            // useEffect 效果鉤子
            name: 'demo07', 
            path: 'demo07',
            component: './ReactDemo/Demo07',
          },
          {
            // useRef 從輸入框獲取值
            name: 'demo08', 
            path: 'demo08',
            component: './ReactDemo/Demo08',
          },
        ],
      },
      {
        // antd 元件範例
        name: 'antdDemo',
        icon: 'AntDesignOutlined',
        path: '/antdDemo',
        component: './AntdDemo',

      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
