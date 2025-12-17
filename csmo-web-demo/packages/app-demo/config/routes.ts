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
        path: '/antdDemo/navigate',
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
      {
        // Spring Boot 範例
        name: 'springBoot',
        path: 'springBoot',
        routes: [
          {
            path: 'createProject',
            name: 'createProject',
            component: './DomainDemo/springBoot/Demo01_CreateProject'
          },
          {
            path: 'entity',
            name: 'entity',
            component: './DomainDemo/springBoot/Demo02_Entity'
          },
          {
            path: 'repository',
            name: 'repository',
            component: './DomainDemo/springBoot/Demo03_Repository'
          },
          {
            path: 'dtoAndVo',
            name: 'dtoAndVo',
            component: './DomainDemo/springBoot/Demo04_DtoAndVo'
          },
          {
            path: 'constants',
            name: 'constants',
            component: './DomainDemo/springBoot/Demo05_Constants'
          },
          {
            path: 'util',
            name: 'util',
            component: './DomainDemo/springBoot/Demo06_Util'
          },
          {
            path: 'service',
            name: 'service',
            component: './DomainDemo/springBoot/Demo07_Service'
          },
          {
            path: 'controller',
            name: 'controller',
            component: './DomainDemo/springBoot/Demo08_Controller'
          },
          {
            path: 'exception',
            name: 'exception',
            component: './DomainDemo/springBoot/Demo09_Exception'
          },
          {
            path: 'pageApi',
            name: 'pageApi',
            component: './DomainDemo/springBoot/Demo10_PageApi'
          },
          {
            path: 'beanUtils',
            name: 'beanUtils',
            component: './DomainDemo/springBoot/Demo11_BeanUtils'
          },
          {
            path: 'transactional',
            name: 'transactional',
            component: './DomainDemo/springBoot/Demo12_Transactional'
          },
        ],
      },
      {
        // 報表製作
        name: 'export',
        path: 'export',
        routes: [
          {
            // Excel
            path: 'Excel',
            name: 'Excel',
            component: './DomainDemo/Export/Excel'
          },
          {
            // Excel 轉 PDF
            path: 'ExcelToPdf',
            name: 'ExcelToPdf',
            component: './DomainDemo/Export/ExcelToPdf'
          },
          {
            // Word
            path: 'Word',
            name: 'Word',
            component: './DomainDemo/Export/Word'
          },
          {
            // Word 轉 PDF
            path: 'WordToPdf',
            name: 'WordToPdf',
            component: './DomainDemo/Export/WordToPdf'
          },
          {
            // Html 轉 Pdf
            path: 'HtmlToPdf',
            name: 'HtmlToPdf',
            component: './DomainDemo/Export/HtmlToPdf'
          },
          {
            // PDF 合併
            path: 'MergePdf',
            name: 'MergePdf',
            component: './DomainDemo/Export/MergePdf'
          },
          {
            // Tif 套印 生成 PDF
            path: 'TifToPdf',
            name: 'TifToPdf',
            component: './DomainDemo/Export/TifToPdf'
          },
        ]
      },
      {
        // 常用工具類
        name: 'utilityCode',
        path: 'utilityCode',
        routes: [
          {
            // 民國年日期工具
            path: 'DateUtil',
            name: 'DateUtil',
            component: './DomainDemo/UtilityCode/DateUtil'
          },
          {
            // 文字處理工具
            path: 'Big5Util',
            name: 'Big5Util',
            component: './DomainDemo/UtilityCode/Big5Util'
          },
          {
            // zip 檔案壓縮工具
            path: 'ZipUtil',
            name: 'ZipUtil',
            component: './DomainDemo/UtilityCode/ZipUtil'
          },
          {
            // 物件欄位比較工具
            path: 'FieldComparerUtil',
            name: 'FieldComparerUtil',
            component: './DomainDemo/UtilityCode/FieldComparerUtil'
          },
        ]
      },
      {
        // 相關資源
        name: 'resource',
        path: 'resource',
        component: './DomainDemo/resource'
      },
    ]
  },
]
