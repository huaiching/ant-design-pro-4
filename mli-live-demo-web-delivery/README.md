# **mli-live-demo-web**

項目由 react、umijs、ant design pro、lerna、qiankun 搭建成一個微前端系統。

### **快速入門**

<br/>

如果想啟動項目，請使用 yarn && yarn start

如果想構建項目，請使用 yarn && yarn build

<br/>

### **添加新子應用程式**

<br/>

請參閱 [this doc](./docs/AddNewProject.md)

<br/>

### **挿件使用**

<br/>

請參閱 [this doc](./docs/Plugins.md)

### **提交訊息**

<br/>

大致如下:

```sh
type(範圍？): 主題  #範圍是可選的；支持多個範圍（目前的分隔符選項："/"、"\" 和 ","）
```

現實世界的例子可以是這樣的：

```text
chore: 在 travis ci 上運行測試
```

```text
fix(server): 發送 cors 標頭
```

```text
feat(blog): 添加評論區塊
```

根據 commitlint-config-conventional（基於 Angular 約定），常見的類型可以是：

- build
- chore
- ci
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

js配置文件說明
### commitlintrc.js
是一個用於規範 Git Commit 訊息格式的配置文件，通常用於前端項目（但也可用於其他類型的項目）。它的作用是確保團隊成員提交的 Commit 訊息遵循統一的格式，從而提高程式碼庫的可讀性和可維護性。
主要作用
統一 Commit 訊息格式：確保所有 Commit 訊息遵循相同的規範，例如使用固定的標題格式、類型標籤等。
提高可讀性：通過清晰的 Commit 訊息，方便團隊成員理解每次提交的內容和目的。
自動化檢查：與 Git Hook（如 husky）結合，可以在提交時自動檢查 Commit 訊息是否符合規範，不符合時阻止提交。
支援協作：特別是在多人開發的項目中，統一的 Commit 格式有助於生成清晰的自動化變更日誌（CHANGELOG）。

### .editorconfig
是一個用於統一不同編輯器和 IDE 的程式碼風格設置，確保團隊成員使用相同的編碼規範。它通常用於前端項目，但也可用於其他類型的項目
主要作用
統一程式碼風格：確保團隊成員使用相同的縮排、字元編碼、換行符等。
跨編輯器兼容：支援多種編輯器和 IDE，如 VS Code、Sublime Text、IntelliJ IDEA 等。
減少衝突：通過統一的格式設置，減少程式碼合併時的衝突。
常見配置項
root：指定是否為根配置文件。
indent_style：縮排風格，可選 tab 或 space。
indent_size：縮排大小，通常為 2 或 4。
tab_width：Tab 寬度，通常與 indent_size 一致。
end_of_line：換行符風格，可選 lf、cr 或 crlf。
charset：字元編碼，如 utf-8。
trim_trailing_whitespace：是否刪除行尾空格。
insert_final_newline：是否在檔案末尾插入空行。

### .eslintignore.js
文件的作用是讓 ESLint 工具忽略特定檔案或目錄的檢查。ESLint 是一個用於檢查 JavaScript 程式碼風格和錯誤的工具，而 eslintignore.js 則是用來排除不需要檢查的檔案或目錄，類似於 .gitignore 的功能。
主要作用->忽略特定檔案或目錄：
讓 ESLint 跳過對某些檔案或目錄的檢查，例如第三方函式庫、自動生成的檔案或測試資料。
提升檢查效率：
減少 ESLint 檢查的範圍，避免對不必要的檔案進行檢查，從而提升執行速度。
避免誤報：
某些檔案（如壓縮後的 JavaScript 檔案或配置文件）可能不符合 ESLint 的規則，忽略這些檔案可以避免不必要的錯誤提示。
使用方式
在專案根目錄創建一個 .eslintignore 檔案（注意：檔案名稱以 . 開頭）。
在檔案中指定需要忽略的檔案或目錄，每個規則佔一行。
ESLint 會自動讀取 .eslintignore 檔案並忽略指定的內容。
常見配置範例
# 忽略 node_modules 目錄
node_modules/
# 忽略所有 JavaScript 壓縮檔案
*.min.js
# 忽略 build 目錄
build/
# 忽略測試資料
test-data/
# 忽略特定檔案
config.js
dist/

### prettierignore.js
prettierignore 文件的作用是讓 Prettier 格式化工具忽略特定的檔案或目錄。Prettier 是一個用於自動格式化程式碼的工具，而 .prettierignore 文件則是用來排除不需要格式化的檔案或目錄，類似於 .gitignore 和 .eslintignore 的功能。

### prettierrc.js
文件是 Prettier 工具的配置文件，用於定義程式碼格式化的規則。Prettier 是一個流行的程式碼格式化工具，支援多種程式語言（如 JavaScript、TypeScript、CSS、HTML、JSON 等），並通過統一的風格來確保程式碼的可讀性和一致性。
主要作用
統一程式碼風格：

通過定義統一的格式化規則，確保團隊成員的程式碼風格一致。
自動格式化：
Prettier 可以根據配置文件自動格式化程式碼，減少手動調整的時間。
減少風格爭議：
通過強制執行統一的風格，減少團隊成員之間關於程式碼風格的爭議。
與其他工具整合：
Prettier 可以與 ESLint、編輯器（如 VS Code）和版本控制工具（如 Git）整合，進一步提升開發效率。
常見配置項
以下是一些常見的 Prettier 配置選項：

配置項	說明	預設值
printWidth	每行的最大字元數，超過時會自動換行。	80
tabWidth	縮排的空格數。	2
useTabs	是否使用 Tab 進行縮排。	false
semi	是否在語句末尾添加分號。	true
singleQuote	是否使用單引號。	false
quoteProps	物件屬性的引號處理方式，可選 "as-needed" 或 "consistent"。	"as-needed"
trailingComma	是否在多行結構的末尾添加逗號，可選 "none"、"es5" 或 "all"。	"es5"
bracketSpacing	是否在物件字面量的大括號之間添加空格。	true
arrowParens	箭頭函式的參數是否加上括號，可選 "always" 或 "avoid"。	"always"
endOfLine	換行符風格，可選 "lf"、"crlf" 或 "auto"。	"lf"
proseWrap	Markdown 文件的換行方式，可選 "always"、"never" 或 "preserve"。	"preserve"

### stylelintrc.js
是 Stylelint 工具的配置文件，用於定義 CSS（或 CSS 預處理器，如 SCSS、Less）程式碼的檢查規則。Stylelint 是一個強大的 CSS 程式碼檢查工具，可以幫助開發者發現並修復 CSS 程式碼中的錯誤、不一致性和風格問題
主要作用
檢查 CSS 程式碼質量：
發現並修復 CSS 程式碼中的錯誤，例如無效的語法、未使用的選擇器或重複的樣式。
統一程式碼風格：
通過定義統一的風格規則，確保團隊成員的 CSS 程式碼風格一致。
提高可維護性：
通過強制執行最佳實踐，減少程式碼中的潛在問題，從而提高程式碼的可維護性。
與其他工具整合：
Stylelint 可以與編輯器（如 VS Code）、版本控制工具（如 Git）和建置工具（如 Webpack）整合，進一步提升開發效率。

常見配置項
以下是一些常見的 Stylelint 配置選項：
配置項	說明
rules	定義具體的檢查規則，例如縮排、選擇器命名、屬性順序等。
extends	繼承現有的配置，例如官方推薦的配置或社群提供的配置。
plugins	擴展 Stylelint 的功能，例如支援 SCSS、Less 或自定義規則。
ignoreFiles	忽略特定的檔案或目錄，類似於 .stylelintignore 的功能。
defaultSeverity	設定規則的預設嚴重程度，可選 "warning" 或 "error"。
overrides	針對特定檔案或目錄覆寫規則。

### lerna.json
l是 Lerna 工具的配置文件，用於管理 Monorepo（單一倉庫多套件）架構的前端專案。Lerna 是一個流行的工具，專門用於優化 Monorepo 的管理，特別適合包含多個相互依賴套件的前端專案（例如 Babel、React、Jest 等開源專案）。
主要作用
管理多套件專案：
在 Monorepo 架構中，一個倉庫可能包含多個套件（packages），Lerna 可以幫助管理這些套件的版本、依賴和發佈。
自動化版本控制：
Lerna 可以自動化套件的版本號更新，並根據套件之間的依賴關係進行版本管理。
優化依賴安裝：
通過 hoist 功能，將共用的依賴提升到根目錄的 node_modules，減少重複安裝。
簡化發佈流程：
提供一鍵發佈功能，自動更新版本號、生成變更日誌（CHANGELOG）並發佈到 npm。

常見配置項
以下是一些常見的 lerna.json 配置選項：

配置項	說明
version	當前 Monorepo 的版本號，可選 "independent" 或固定版本（如 "0.0.0"）。
npmClient	指定使用的套件管理工具，例如 "npm"、"yarn" 或 "pnpm"。
useWorkspaces	是否使用 Yarn Workspaces 或 pnpm Workspaces 來管理套件。
packages	定義套件的存放路徑，通常為 ["packages/*"]。
command.publish.ignoreChanges	發佈時忽略特定檔案或目錄的變更。
command.bootstrap.hoist	是否將共用的依賴提升到根目錄的 node_modules。
command.bootstrap.nohoist	指定不提升的依賴套件。

### tsconfig.json
是 TypeScript 專案的配置文件，用於定義 TypeScript 編譯器的行為和選項。它告訴 TypeScript 如何處理 .ts 和 .tsx 檔案，並生成對應的 JavaScript 檔案。這個文件在 TypeScript 專案中非常重要，因為它決定了編譯過程的細節，例如模組解析、目標 JavaScript 版本、是否啟用嚴格模式等。

主要作用
定義編譯選項：
設定 TypeScript 編譯器的行為，例如目標 JavaScript 版本、模組系統、是否啟用嚴格模式等。
指定專案結構：
定義哪些檔案需要被編譯，以及如何處理這些檔案。
優化開發體驗：
通過配置選項，提升開發效率，例如啟用自動類型檢查、路徑別名等。
與工具整合：
與編輯器（如 VS Code）、建置工具（如 Webpack）和測試工具（如 Jest）整合，提供更好的開發和除錯體驗。

常見配置項
以下是一些常見的 tsconfig.json 配置選項：

配置項	說明
compilerOptions	編譯器的選項設定，例如目標版本、模組系統、是否啟用嚴格模式等。
include	指定需要編譯的檔案或目錄。
exclude	指定不需要編譯的檔案或目錄。
extends	繼承其他配置檔案，例如共用配置或基礎配置。
files	明確列出需要編譯的檔案（不常用）。
references	用於專案參考（Project References），支援多專案結構。
compilerOptions 常見選項
以下是一些常見的 compilerOptions 選項：

選項	說明	預設值
target	編譯後的 JavaScript 目標版本，例如 "es5"、"es6" 或 "esnext"。	"es3"
module	模組系統，例如 "commonjs"、"es6" 或 "umd"。	"commonjs"
strict	是否啟用所有嚴格類型檢查選項。	false
noImplicitAny	是否禁止隱式的 any 類型。	false
outDir	指定編譯後的 JavaScript 檔案輸出目錄。	無
rootDir	指定 TypeScript 檔案的根目錄。	無
baseUrl	設定模組解析的基礎路徑，通常與 paths 一起使用。	無
paths	設定路徑別名，簡化模組導入路徑。	無
allowJs	是否允許編譯 JavaScript 檔案。	false
checkJs	是否檢查 JavaScript 檔案的類型。	false
jsx	指定 JSX 的處理方式，例如 "preserve" 或 "react"。	"preserve"
sourceMap	是否生成 Source Map 檔案，用於除錯。	false

### package.json
package.json 是前端項目的核心配置文件，承擔項目元數據管理、依賴控制、腳本執行等關鍵職能，具體作用如下：

一、‌基礎元數據描述‌
‌項目標識‌：通過 name（唯一套件名）和 version（語義化版本號）定義項目身份，確保依賴關係準確‌13。
‌信息補充‌：description（項目描述）、author（作者）、license（許可證）等字段提供項目背景及合規性說明‌15。
二、‌依賴管理‌
‌生產依賴（dependencies）‌
記錄項目運行必需的第三方套件（如 react、vue），安裝時通過 npm install --save 自動更新‌12。
‌開發依賴（devDependencies）‌
儲存僅在開發階段使用的工具（如 webpack、eslint），通過 npm install --save-dev 添加‌25。
‌對等依賴（peerDependencies）‌
聲明插件類庫與宿主環境的版本兼容性（如 react 插件需指定宿主框架版本）‌25。
三、‌腳本與任務管理‌
‌自定義命令（scripts）‌：定義自動化腳本（如 start、build、test），通過 npm run 執行建構、測試等流程‌15。
‌環境整合‌：例如 preinstall 或 postbuild 鉤子實現安裝前後或建構後的自定義操作‌56。
四、‌項目配置管理‌
‌私有化控制‌：private: true 禁止項目被誤發佈到公共 npm 倉庫‌25。
‌運行環境約束‌：engines 指定 Node.js 或 npm 的版本要求，確保環境兼容性‌25。
‌模組入口定義‌：通過 main（CommonJS 入口）、module（ES Module 入口）、types（TypeScript 類型聲明）支援模組化加載‌25。
五、‌發佈與協作支援‌
‌發佈配置‌：publishConfig 指定私有倉庫地址，files 控制發佈到 npm 的目錄範圍‌25。
‌協作標準化‌：統一團隊依賴版本及工具鏈配置，避免因環境差異導致運行問題‌15。
六、‌擴展功能整合‌
‌工作區管理（workspaces）‌：支援 monorepo 項目結構，管理多套件依賴關係‌25。
‌關鍵詞標記（keywords）‌：提升 npm 倉庫中的搜尋可見性‌25。
總結
package.json 是前端工程的「中樞文件」，通過標準化配置實現依賴版本鎖定、腳本自動化、環境約束及協作規範化，是項目初始化、建構、發佈全流程的基石‌。其結構化設計大幅提升了開發效率和跨團隊協作的可靠性。

<br/>

### RELEASE NOTE

#### 20250911
    
    - 使用@mli-csmo/base 1.10.0

#### 20250911

    - 使用@mli-csmo/base 1.9.0

#### 20250828

    - 子應用demo，新增DateTable，內容包含說明、日期轉換函數測試與日期表格，日期表格用於測試保存查詢條件

#### 20250820

    - 使用@mli-csmo/base 1.7.0

#### 20250819

    - 子應用demo，新增告警選單，新增編輯保護模式，包含說明與示範

#### 20250807

    - 子應用demo，新增輔助與易用性選單，新增鍵盤操作與游標聚焦，包含說明與示範

#### 20250805

    - 子應用demo，icon選單，新增企業識別，包含說明與下載

#### 20250801

    - 子應用demo，新增色彩體系選單，新增主題色、功能色、中性色，包含說明

#### 20250723

    - 新增業務員子應用