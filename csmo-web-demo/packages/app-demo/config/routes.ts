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
        // 頁面導引
        name: 'Link',
        path: '/antdDemo/Link',
        component: './AntdDemo/Link',
      },
      {
        // 路由設定
        name: 'Routes',
        path: '/antdDemo/Routes',
        component: './AntdDemo/Routes',
      },
      {
        // Ant Design 組件介紹與說明
        name: 'Demo',
        path: '/antdDemo/Demo',
        routes: [
          {
            // 表單輸入元件 (Form)
            name: 'Form',
            path: '/antdDemo/Demo/Form',
            routes: [
              {
                name: 'MliFormRow',
                path: '/antdDemo/Demo/Form/MliFormRow',
                component: './AntdDemo/Demo/Form/demo01_MliFormRow',
              },
              {
                name: 'ProFormText',
                path: '/antdDemo/Demo/Form/ProFormText',
                component: './AntdDemo/Demo/Form/demo02_ProFormText',
              },
              {
                name: 'ProFormTextArea',
                path: '/antdDemo/Demo/Form/ProFormTextArea',
                component: './AntdDemo/Demo/Form/demo03_ProFormTextArea',
              },
              {
                name: 'ProFormDigit',
                path: '/antdDemo/Demo/Form/ProFormDigit',
                component: './AntdDemo/Demo/Form/demo04_ProFormDigit',
              },
              {
                name: 'ProFormSelect',
                path: '/antdDemo/Demo/Form/ProFormSelect',
                component: './AntdDemo/Demo/Form/demo05_ProFormSelect',
              },
              {
                name: 'ProFormCascader',
                path: '/antdDemo/Demo/Form/ProFormCascader',
                component: './AntdDemo/Demo/Form/demo06_ProFormCascader',
              },
              {
                name: 'ProFormTreeSelect',
                path: '/antdDemo/Demo/Form/ProFormTreeSelect',
                component: './AntdDemo/Demo/Form/demo07_ProFormTreeSelect',
              },
              {
                name: 'ProFormDatePicker',
                path: '/antdDemo/Demo/Form/ProFormDatePicker',
                component: './AntdDemo/Demo/Form/demo08_ProFormDatePicker',
              },
              {
                name: 'ProFormTimePicker',
                path: '/antdDemo/Demo/Form/ProFormTimePicker',
                component: './AntdDemo/Demo/Form/demo09_ProFormTimePicker',
              },
              {
                name: 'ProFormSwitch',
                path: '/antdDemo/Demo/Form/ProFormSwitch',
                component: './AntdDemo/Demo/Form/demo10_ProFormSwitch',
              },
              {
                name: 'ProFormRadio',
                path: '/antdDemo/Demo/Form/ProFormRadio',
                component: './AntdDemo/Demo/Form/demo11_ProFormRadio',
              },
              {
                name: 'ProFormCheckbox',
                path: '/antdDemo/Demo/Form/ProFormCheckbox',
                component: './AntdDemo/Demo/Form/demo12_ProFormCheckbox',
              },
              {
                name: 'ProFormUploadButton',
                path: '/antdDemo/Demo/Form/ProFormUploadButton',
                component: './AntdDemo/Demo/Form/demo13_ProFormUploadButton',
              },
              {
                name: 'ProFormGroup',
                path: '/antdDemo/Demo/Form/ProFormGroup',
                component: './AntdDemo/Demo/Form/demo14_ProFormGroup',
              },
              {
                name: 'ProFormitem',
                path: '/antdDemo/Demo/Form/ProFormitem',
                component: './AntdDemo/Demo/Form/demo15_ProFormitem',
              },
              {
                name: 'AutoComplete',
                path: '/antdDemo/Demo/Form/AutoComplete',
                component: './AntdDemo/Demo/Form/demo16_AutoComplete',
              },
              {
                name: 'ProFormList',
                path: '/antdDemo/Demo/Form/ProFormList',
                component: './AntdDemo/Demo/Form/demo17_ProFormList',
              },
              {
                name: 'CaseFlow',
                path: '/antdDemo/Demo/Form/CaseFlow',
                component: './AntdDemo/Demo/Form/demo18_CaseFlow',
              },
              {
                name: 'MultiSelectTable',
                path: '/antdDemo/Demo/Form/MultiSelectTable',
                component: './AntdDemo/Demo/Form/demo19_MultiSelectTable',
              },
              {
                name: 'Typography',
                path: '/antdDemo/Demo/Form/Typography',
                component: './AntdDemo/Demo/Form/demo20_Typography',
              },
              {
                name: 'FloatButton',
                path: '/antdDemo/Demo/Form/FloatButton',
                component: './AntdDemo/Demo/Form/demo21_FloatButton',
              },
            ]
          },
          {
            // 表單容器 (Container)
            name: 'Container',
            path: '/antdDemo/Demo/Container',
            routes: [
              {
                name: 'ModalForm',
                path: '/antdDemo/Demo/Container/ModalForm',
                component: './AntdDemo/Demo/Container/demo01_ModalForm'
              },
              {
                name: 'DrawerForm',
                path: '/antdDemo/Demo/Container/DrawerForm',
                component: './AntdDemo/Demo/Container/demo02_DrawerForm'
              },
              {
                name: 'StepsForm',
                path: '/antdDemo/Demo/Container/StepsForm',
                component: './AntdDemo/Demo/Container/demo03_StepsForm'
              },
            ]
          },
          {
            // 表格 (Table)
            name: 'Table',
            path: '/antdDemo/Demo/Table',
            routes: [
              {
                name: 'ProTable',
                path: '/antdDemo/Demo/Table/ProTable',
                component: './AntdDemo/Demo/Table/demo01_ProTable'
              },
              {
                name: 'SearchProTable',
                path: '/antdDemo/Demo/Table/SearchProTable',
                component: './AntdDemo/Demo/Table/demo02_SearchProTable'
              },
              {
                name: 'NestedProTable',
                path: '/antdDemo/Demo/Table/NestedProTable',
                component: './AntdDemo/Demo/Table/demo03_NestedProTable'
              },
              {
                name: 'ShowRowProTable',
                path: '/antdDemo/Demo/Table/ShowRowProTable',
                component: './AntdDemo/Demo/Table/demo04_ShowRowProTable'
              },
              {
                name: 'EditProTable',
                path: '/antdDemo/Demo/Table/EditProTable',
                component: './AntdDemo/Demo/Table/demo05_EditProTable'
              },
              {
                name: 'EditableProTable',
                path: '/antdDemo/Demo/Table/EditableProTable',
                component: './AntdDemo/Demo/Table/demo06_EditableProTable'
              },
              {
                name: 'InputEditableProTable',
                path: '/antdDemo/Demo/Table/InputEditableProTable',
                component: './AntdDemo/Demo/Table/demo07_InputEditableProTable'
              },
              {
                name: 'NestedEditableProTable',
                path: '/antdDemo/Demo/Table/NestedEditableProTable',
                component: './AntdDemo/Demo/Table/demo08_NestedEditableProTable'
              },
              {
                name: 'DragSortTable',
                path: '/antdDemo/Demo/Table/DragSortTable',
                component: './AntdDemo/Demo/Table/demo09_DragSortTable'
              },
              {
                name: 'EditableAmountTable',
                path: '/antdDemo/Demo/Table/EditableAmountTable',
                component: './AntdDemo/Demo/Table/demo10_EditableAmountTable'
              },
              {
                name: 'CaseSearchTable',
                path: '/antdDemo/Demo/Table/CaseSearchTable',
                component: './AntdDemo/Demo/Table/demo11_CaseSearchTable'
              },
              {
                name: 'BatchEditablePolicyTable',
                path: '/antdDemo/Demo/Table/BatchEditablePolicyTable',
                component: './AntdDemo/Demo/Table/demo12_BatchEditablePolicyTable'
              },
            ]
          },
          {
            // 佈局與視覺元件 (LayoutUi)
            name: 'LayoutUi',
            path: '/antdDemo/Demo/LayoutUi',
            routes: [
              {
                name: 'ProCard',
                path: '/antdDemo/Demo/LayoutUi/ProCard',
                component: './AntdDemo/Demo/LayoutUi/demo01_ProCard'
              },
              {
                name: 'Notification',
                path: '/antdDemo/Demo/LayoutUi/Notification',
                component: './AntdDemo/Demo/LayoutUi/demo02_Notification'
              },
              {
                name: 'Modal',
                path: '/antdDemo/Demo/LayoutUi/Modal',
                component: './AntdDemo/Demo/LayoutUi/demo03_Modal'
              },
              {
                name: 'PageContainer',
                path: '/antdDemo/Demo/LayoutUi/PageContainer',
                component: './AntdDemo/Demo/LayoutUi/demo04_PageContainer'
              },
              {
                name: 'BackTop',
                path: '/antdDemo/Demo/LayoutUi/BackTop',
                component: './AntdDemo/Demo/LayoutUi/demo05_BackTop'
              },
              {
                name: 'Splitter',
                path: '/antdDemo/Demo/LayoutUi/Splitter',
                component: './AntdDemo/Demo/LayoutUi/demo06_Splitter'
              },
              {
                name: 'Space',
                path: '/antdDemo/Demo/LayoutUi/Space',
                component: './AntdDemo/Demo/LayoutUi/demo07_Space'
              },
              {
                name: 'Flex',
                path: '/antdDemo/Demo/LayoutUi/Flex',
                component: './AntdDemo/Demo/LayoutUi/demo08_Flex'
              },
              {
                name: 'ConfigProvider',
                path: '/antdDemo/Demo/LayoutUi/ConfigProvider',
                component: './AntdDemo/Demo/LayoutUi/demo09_ConfigProvider'
              },
              {
                name: 'PopoverImage',
                path: '/antdDemo/Demo/LayoutUi/PopoverImage',
                component: './AntdDemo/Demo/LayoutUi/demo10_PopoverImage'
              },
            ]
          },
          {
            // 資料顯示元件 (DataDisplay)
            name: 'DataDisplay',
            path: '/antdDemo/Demo/DataDisplay',
            routes: [
              {
                name: 'List',
                path: '/antdDemo/Demo/DataDisplay/List',
                component: './AntdDemo/Demo/DataDisplay/demo01_List'
              },
              {
                name: 'Descriptions',
                path: '/antdDemo/Demo/DataDisplay/Descriptions',
                component: './AntdDemo/Demo/DataDisplay/demo02_Descriptions'
              },
            ]
          },
          {
            // 工具類與整合範例 (Utility)
            name: 'Utility',
            path: '/antdDemo/Demo/Utility',
            routes: [
              {
                name: 'Navigate',
                path: '/antdDemo/Demo/Utility/Navigate',
                component: './AntdDemo/Demo/Utility/demo01_Navigate'
              },
              {
                name: 'xlsx',
                path: '/antdDemo/Demo/Utility/xlsx',
                component: './AntdDemo/Demo/Utility/demo02_xlsx'
              },
              {
                name: 'EditGuard',
                path: '/antdDemo/Demo/Utility/EditGuard',
                component: './AntdDemo/Demo/Utility/demo03_EditGuard'
              },
              {
                name: 'DistributeToData',
                path: '/antdDemo/Demo/Utility/DistributeToData',
                component: './AntdDemo/Demo/Utility/demo04_DistributeToData'
              },
            ]
          },
          {
            // 頁面樣板 (PageTemplates)
            name: 'PageTemplates',
            path: '/antdDemo/Demo/PageTemplates',
            routes: [
              {
                name: 'Worklist',
                path: '/antdDemo/Demo/PageTemplates/Worklist',
                component: './AntdDemo/Demo/PageTemplates/demo01_Worklist'
              },
              {
                name: 'EditForm',
                path: '/antdDemo/Demo/PageTemplates/EditForm',
                component: './AntdDemo/Demo/PageTemplates/demo02_EditForm'
              },
              {
                name: 'SearchForm',
                path: '/antdDemo/Demo/PageTemplates/SearchForm',
                component: './AntdDemo/Demo/PageTemplates/demo03_SearchForm'
              },
              {
                name: 'SearchTagCard',
                path: '/antdDemo/Demo/PageTemplates/SearchTagCard',
                component: './AntdDemo/Demo/PageTemplates/demo04_SearchTagCard'
              },
            ]
          }
        ]
      },
      {
        // 小工具
        name: 'Utility',
        path: '/antdDemo/Utility',
        routes: [
          {
            // 民國年日期工具
            name: 'rocDateUtils',
            path: '/antdDemo/Utility/rocDateUtils',
            component: './AntdDemo/Utility/RocDateUtils'
          },
          {
            // 民國年日期工具
            name: 'stringUtils',
            path: '/antdDemo/Utility/stringUtils',
            component: './AntdDemo/Utility/StringUtils'
          },
          {
            // 民國年日期工具
            name: 'digitUtils',
            path: '/antdDemo/Utility/digitUtils',
            component: './AntdDemo/Utility/DigitUtils'
          },
        ]
      },
      {
        // 開發模板
        name: 'Sample',
        path: '/antdDemo/Sample',
        routes: [
          {
            // 一般模板
            name: 'Normal',
            path: '/antdDemo/Sample/Normal',
            component: './AntdDemo/Sample/Normal'
          },
          {
            // 編輯模板
            name: 'Edit',
            path: '/antdDemo/Sample/Edit',
            component: './AntdDemo/Sample/Edit'
          },
          {
            // 查詢模板
            name: 'Search',
            path: '/antdDemo/Sample/Search',
            component: './AntdDemo/Sample/Search'
          },
        ]
      },
    ]
  },
  {
    path: '/antdDemo/demo/PageTemplates/Query',
    component: './AntdDemo/Demo/PageTemplates/demo02_EditForm',
  },
  {
    path: '/antdDemo/demo/PageTemplates/Edit',
    component: './AntdDemo/Demo/PageTemplates/demo02_EditForm',
  },
  {
    path: '/antdDemo/demo/PageTemplates/Create',
    component: './AntdDemo/Demo/PageTemplates/demo02_EditForm',
  },
  {
    path: '/antdDemo/navigate',
    component: './AntdDemo/Demo/Utility/demo01_Navigate/Components/Navigate'
  },
  {
    path: '/antdDemo/sessionStorage',
    component: './AntdDemo/Demo/Utility/demo01_Navigate/Components/SessionStorage'
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
          {
            // Excel 讀取工具
            path: 'LoadExcelUtil',
            name: 'LoadExcelUtil',
            component: './DomainDemo/UtilityCode/LoadExcelUtil'
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
