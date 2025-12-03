# @mli-csmo/base

### react-shim.js

通常是一個墊片（Shim）文件，用於在特定環境下模擬 React 或相關庫的功能，以確保相容性或解決依賴問題。它的具體作用取決於項目的上下文，但以下是常見的用途

1. 解決全域 React 依賴問題在一些傳統專案或非模組化環境中（例如直接透過 <script> 標籤引入 React），可能需要確保 React 和 ReactDOM 作為全域變數存在。

react-shim.js 可能會匯出這些全域變量，例如：

window.React = require('react'); window.ReactDOM = require('react-dom'); 2. 相容非模組化系統如果專案使用 AMD、CommonJS 或 ES Modules 混合環境，墊片可能負責橋接不同模組系統的匯出方式。

例如：將 React 的模組導出轉為全域變量，或相反。

3. 模擬 React 的測試環境在單元測試中，可能需要一個輕量級的 React 模擬實作（例如不依賴真實的 DOM），此時 react-shim.js 可能是一個模擬版本。

4. 修復版本衝突當專案依賴的多個庫需要不同版本的 React 時，墊片可能用於協調版本衝突（例如透過 alias 或代理匯出）。

5. Polyfill 功能為舊瀏覽器提供 React 所需的現代 JavaScript 特性（如 Promise、Object.assign 等）。

範例程式碼一個簡單的 react-shim.js 可能長這樣：

// 將 React 和 ReactDOM 暴露為全域變量 import React from 'react'; import ReactDOM from 'react-dom';

window.React = React; window.ReactDOM = ReactDOM;

### tsconfig.json

是 TypeScript 專案的配置文件，用於定義 TypeScript 編譯器的行為和選項。它告訴 TypeScript 如何處理 .ts 和 .tsx 檔案，並生成對應的 JavaScript 檔案。這個文件在 TypeScript 專案中非常重要，因為它決定了編譯過程的細節，例如模組解析、目標 JavaScript 版本、是否啟用嚴格模式等。

主要作用定義編譯選項：設定 TypeScript 編譯器的行為，例如目標 JavaScript 版本、模組系統、是否啟用嚴格模式等。指定專案結構：定義哪些檔案需要被編譯，以及如何處理這些檔案。優化開發體驗：通過配置選項，提升開發效率，例如啟用自動類型檢查、路徑別名等。與工具整合：與編輯器（如 VS Code）、建置工具（如 Webpack）和測試工具（如 Jest）整合，提供更好的開發和除錯體驗。

常見配置項以下是一些常見的 tsconfig.json 配置選項：

配置項 說明 compilerOptions 編譯器的選項設定，例如目標版本、模組系統、是否啟用嚴格模式等。 include 指定需要編譯的檔案或目錄。 exclude 指定不需要編譯的檔案或目錄。 extends 繼承其他配置檔案，例如共用配置或基礎配置。 files 明確列出需要編譯的檔案（不常用）。 references 用於專案參考（Project References），支援多專案結構。 compilerOptions 常見選項以下是一些常見的 compilerOptions 選項：

選項 說明 預設值 target 編譯後的 JavaScript 目標版本，例如 "es5"、"es6" 或 "esnext"。 "es3" module 模組系統，例如 "commonjs"、"es6" 或 "umd"。 "commonjs" strict 是否啟用所有嚴格類型檢查選項。 false noImplicitAny 是否禁止隱式的 any 類型。 false outDir 指定編譯後的 JavaScript 檔案輸出目錄。 無 rootDir 指定 TypeScript 檔案的根目錄。 無 baseUrl 設定模組解析的基礎路徑，通常與 paths 一起使用。 無 paths 設定路徑別名，簡化模組導入路徑。 無 allowJs 是否允許編譯 JavaScript 檔案。 false checkJs 是否檢查 JavaScript 檔案的類型。 false jsx 指定 JSX 的處理方式，例如 "preserve" 或 "react"。 "preserve" sourceMap 是否生成 Source Map 檔案，用於除錯。 false

### package.json

package.json 是前端項目的核心配置文件，承擔項目元數據管理、依賴控制、腳本執行等關鍵職能，具體作用如下：

一、‌ 基礎元數據描述 ‌ ‌ 項目標識 ‌：通過 name（唯一套件名）和 version（語義化版本號）定義項目身份，確保依賴關係準確 ‌13。 ‌ 信息補充 ‌：description（項目描述）、author（作者）、license（許可證）等字段提供項目背景及合規性說明 ‌15。二、‌ 依賴管理 ‌ ‌ 生產依賴（dependencies）‌ 記錄項目運行必需的第三方套件（如 react、vue），安裝時通過 npm install --save 自動更新 ‌12。 ‌ 開發依賴（devDependencies）‌ 儲存僅在開發階段使用的工具（如 webpack、eslint），通過 npm install --save-dev 添加 ‌25。 ‌ 對等依賴（peerDependencies）‌ 聲明插件類庫與宿主環境的版本兼容性（如 react 插件需指定宿主框架版本）‌25。三、‌ 腳本與任務管理 ‌ ‌ 自定義命令（scripts）‌：定義自動化腳本（如 start、build、test），通過 npm run 執行建構、測試等流程 ‌15。 ‌ 環境整合 ‌：例如 preinstall 或 postbuild 鉤子實現安裝前後或建構後的自定義操作 ‌56。四、‌ 項目配置管理 ‌ ‌ 私有化控制 ‌：private: true 禁止項目被誤發佈到公共 npm 倉庫 ‌25。 ‌ 運行環境約束 ‌：engines 指定 Node.js 或 npm 的版本要求，確保環境兼容性 ‌25。 ‌ 模組入口定義 ‌：通過 main（CommonJS 入口）、module（ES Module 入口）、types（TypeScript 類型聲明）支援模組化加載 ‌25。五、‌ 發佈與協作支援 ‌ ‌ 發佈配置 ‌：publishConfig 指定私有倉庫地址，files 控制發佈到 npm 的目錄範圍 ‌25。 ‌ 協作標準化 ‌：統一團隊依賴版本及工具鏈配置，避免因環境差異導致運行問題 ‌15。六、‌ 擴展功能整合 ‌ ‌ 工作區管理（workspaces）‌：支援 monorepo 項目結構，管理多套件依賴關係 ‌25。 ‌ 關鍵詞標記（keywords）‌：提升 npm 倉庫中的搜尋可見性 ‌25。總結 package.json 是前端工程的「中樞文件」，通過標準化配置實現依賴版本鎖定、腳本自動化、環境約束及協作規範化，是項目初始化、建構、發佈全流程的基石 ‌。其結構化設計大幅提升了開發效率和跨團隊協作的可靠性。

### MLI-CSMO-WEB-COMMON 項目公共組件說明

1. field 表單項 目前包含 AutoComplete、Cascader、Checkbox、DatePicker、DateRangePicker、DateTimePicker、DateTimeRangePicker、Digit、Image、Money、Password、Radio、RichTextEditor、Select、Slider、Switch、Text、TextArea、TimePicker、TimeRangePicker、TreeSelect、Upload 等 22 個表單項組件，基於 ant design pro 表單項上做了擴充，添加組件入參。

2. table 表格基於 ant design pro 表格進行二次封裝，修改篩選欄佈局，添加查詢、清除等表單觸發點的 hooks，添加瀏覽器緩存保存查詢條件。

3. form 表單佈局基於 ant design Grid 栅格組件二次封裝，默認添加柵格配置，可實現按照瀏覽器寬度自動調整頁面佈局

4. login 登錄節目 提供基礎登錄界面，可根據需求在具體項目中調整
