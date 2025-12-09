import CodeJava from "@/utils/CodePre/CodeJava"
import CodeTsx from "@/utils/CodePre/CodeTsx"
import CodeXML from "@/utils/CodePre/CodeXML"
import { PageContainer } from "@ant-design/pro-components"
import { Table, Typography } from "antd"

const { Title, Paragraph } = Typography

const HtmlToPdf: React.FC = () => {
  return (
    <PageContainer title={false}>
      <Typography>
        <Paragraph>
          <code>Html 轉 PDF</code> 是透過 openhtmltopdf 這個套件 生成 <br/>
          運作原理為 <code>Java 設定變數</code> 後， 將變數 <code>套印</code> 至 <code>html 樣版檔</code>。
          使用時 <code>pom.xml</code> 需要先設定此套件。
        </Paragraph>

        <CodeXML code={`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
<dependency>
    <groupId>com.openhtmltopdf</groupId>
    <artifactId>openhtmltopdf-pdfbox</artifactId>
    <version>1.0.10</version>
</dependency>`} />

        <Paragraph type='danger'>
          CSMO 專案 已包含此套件，不需要設定
        </Paragraph>

        <hr />

        <Title level={3}>1. 資料結構</Title>
        <Paragraph>
          java  <br />
          ├─ 📁constants         <br />
          ├─ 📁controller                 <br />
          │　　├─ 📄 API 呼叫入口.java  <br />
          ├─ 📁service          <br />
          │　　├─ 📄 報表邏輯處理(生成資料數據).java  <br />
          ├─ 📁dto                          <br />
          │　　├─ 📄 資料傳輸物件.java  <br />
          ├─ 📁util                         <br />
          │　　├─ 📄 HtmlToPDFUtil.java　　# html 轉 PDF 的檔案生成工具  <br />
          <br />
          resources  <br />
          ├─ 📁 templates  <br />
          │　　├─ 📄 樣板檔.html  <br />
          │　　├─ 📁 fonts  <br />
          │　　　　├─ kaiu.ttf　　　　　　　　# 字型檔: 標楷體  <br />
          │　　　　├─ 3of9Barcode.ttf　　　　# 字型檔: 條碼 
        </Paragraph>

        <hr />

        <Title level={3}>2. 運作方式</Title>
        <ol>
          <li>
            <code>html 樣板檔</code> 設定 <code>底稿</code>、<code>套印變數</code>、<code>字型</code>。
            <ul>
              <li>
                <code>樣版檔</code>：放在 <code>resources/templates/</code> 資料夾。
              </li>
              <li>
                <code>字型</code>：放在 <code>resources/templates/fonts/</code> 資料夾。
              </li>
            </ul>
          </li>
          <li>
            取得資料，對應 樣板檔變數 <br />
            將資料整理成 <code>Context</code>，並透過 <code>context.setVariable(key, value);</code> 設定資料。
            <ul>
              <li>
                <code>key</code>：<code>樣板檔 變數名稱</code>
              </li>
              <li>
                <code>value</code>：<code>顯示的數值</code>
              </li>
            </ul>
            <CodeJava code={`Context context = new Context();
context.setVariable("names", names);
context.setVariable("sex", sex);
context.setVariable("age", age);
context.setVariable("addrList", addrList);
context.setVariable("policyList", policyList);`} />
          </li>
          <li>
            使用 <code>工具程式</code>，將 <code>TemplateEngine</code>、<code>樣版路徑</code>、<code>Map 變數資料</code> 作為參數傳入。
            <ul>
              <li>
                <code>TemplateEngine</code>：透過 spring boot 注入生成。
                <CodeJava code={`@Autowired
private TemplateEngine templateEngine;`} />
              </li>
              <li>
                <code>樣版路徑</code>：設定 <code>resources/templates/</code> 後面的路徑 <br />
                如：<code>resources/templates/policy.html</code> 只需要設定 <code>policy.html</code>
              </li>
            </ul>
          </li>
        </ol>

        <hr />

        <Title level={3}>3. 工具程式</Title>
        <Table
          size="small"
          bordered
          columns={[
            { title: '方法', dataIndex: 'name', width: 250 },
            { title: '函式', dataIndex: 'method' }
          ]}
          dataSource={[
            { name: 'Html 轉 PDF', method: 'htmlToPdf(TemplateEngine templateEngine, String modelFile, Map<String, Object> dataList)' },
          ]}
          pagination={false}
        />

        <CodeJava code={`package com.example.demo.util;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import org.springframework.core.io.ClassPathResource;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;

/**
 * PDF 匯出工具
 */
public class HtmlToPDFUtil {
    /**
     * Html 轉 PDF
     * @param templateEngine Thymeleaf 的 TemplateEngine，用於解析 HTML 樣板
     * @param modelFile 樣板檔案 (resources/templates/{templateName}.html)
     * @param dataList 資料內容
     * @return
     */
    public static byte[] htmlToPdf(TemplateEngine templateEngine, String modelFile, Map<String, Object> dataList) {
        // 設定變數
        Context context = new Context();
        context.setVariables(dataList);

        // 生成 HTML
        String html = templateEngine.process(modelFile, context);

        try (ByteArrayOutputStream os = new ByteArrayOutputStream()) {
            // HTML 轉 PDF
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();
            builder.withHtmlContent(html, null);
            // 設定中文字型
            ClassPathResource fontFile1 = new ClassPathResource("templates/fonts/kaiu.ttf");
            builder.useFont(() -> {
                try {
                    return fontFile1.getInputStream();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            },"標楷體");

            ClassPathResource fontFile2 = new ClassPathResource("templates/fonts/3of9Barcode.ttf");
            builder.useFont(() -> {
                try {
                    return fontFile2.getInputStream();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            },"條碼");
            // 資料輸出
            builder.toStream(os);
            builder.run();
            return os.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("PDF 生成失敗", e);
        }
    }
}`} />

        <hr />

        <Title level={3}>4. 樣板檔設定</Title>
        <Paragraph>
          基本上就是 手動設定 html 檔案，並搭配 pdfBox 的特殊語法 設定變數。 <br />
          下面的參考樣板，可提供使用者 複製後進行調整使用。
        </Paragraph>
        <Title level={4}>4.1. 頁面整體樣式</Title>
          <ul>
            <li>
              頁面 內文 的 整體的 字型設定 與 字體大小設定。
            </li>
            <li>
              必須要有 中文字型，否則 中文會顯示 <code>#</code>。
            </li>
            <li>
              若有 <code>自造字</code> 需求，需要引入 三商 的 自造字 字型檔。
            </li>
          </ul>
        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <CodeTsx code={`body {
  font-family: "標楷體";
  font-size: 14px; /* 預設字體大小 */
}`} />
        </details>

        <hr/>

        <Title level={4}>4.2. 頁眉、頁腳 與 頁面布局</Title>
        <Paragraph>
          透過 CSS 的 <code>@page</code> 規則，控制紙張大小、邊距、頁眉、頁腳。
        </Paragraph>
        
        <Title level={5}>每一頁都要顯示</Title>
        <ul>
          <li>
            <code>@top-center</code>：頁眉 設定
            <ul>
              <li>
                <code>padding-top</code>：上方的留白寬度設定
              </li>
              <li>
                若 頁眉 需要顯示 頁碼，則 該行 必須透過 CSS 進行設定 。 <br/>
                <ul>
                  <li>內容 設定在 <code>content</code> 中。</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <code>@bottom-center</code>：頁腳 設定
            <ul>
              <li>
                <code>padding-bottom</code>：下方的留白寬度設定
              </li>
            </ul>
          </li>
          <li>
            因為 <code>@top-center</code> 和 <code>@bottom-center</code> 不會吃 <code>@page</code> 裡面的邊寬設定， <br/>
            因此 需要另外進行設定。
          </li>
          <li>
             <code>headerInfo</code> 範例設定是 兩行，當行數不同時，需自行調整 邊寬 和 留白 設定。
          </li>
          <li>
            頁碼語法說明：
            <ul>
              <li>
                <code>counter(page)</code>：顯示當前頁碼，從 1 開始計數。
              </li>
              <li>
                <code>counter(pages)</code>：顯示總頁數，自動計算。
              </li>
              <li>
                範例輸出：<code>第 1 頁 / 共 5 頁</code>
              </li>
            </ul>
          </li>
        </ul>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <Title level={5}>．css</Title>
          <CodeTsx code={`@page {
  size: A4; /* 紙張樣式：A4 = 直式 A4 ; A4 landscape = 橫式 A4 */
  margin: 110pt 30pt 30pt 30pt; /* 頁面邊距：上下左右 30pt */
  @top-center {
    content: element(header) element(headerInfo); /* 頁眉顯示 header 和 headerInfo 元素內容 */
    padding-top: 30px;
  }
  @bottom-center {
    font-family: "標楷體"; /* 頁腳字體 */
    content: "第 " counter(page) " 頁 / 共 " counter(pages) " 頁"; /* 頁腳顯示頁碼 */
    padding-bottom: 30px;
  }
}

header {
  display: block; /* 頁眉為塊級元素 */
  text-align: center; /* 文字居中 */
  font-weight: bold; /* 文字加粗 */
  font-size: 16px; /* 頁眉字體大小 */
  position: running(header); /* 定義為運行元素，確保每頁顯示 */
}
.headerInfo {
  width: 100%; /* 表格寬度填滿容器 */
  font-size: 14px; /* 字體大小 */
  position: running(headerInfo); /* 定義為運行元素，確保每頁顯示 */
}
/* 頁碼顯示樣式 */
.page-number::after {
  content: "頁碼： " counter(page) " / " counter(pages) ;
  font-family: "標楷體";
  font-size: 14px;
}`} />

          <Title level={5}>．html</Title>
          <CodeTsx code={`<header class="header">
  <div>三商美邦人壽保險股份有限公司</div>
  <div>保單資料表</div>
</header>

<div class="headerInfo">
  <table>
    <tr style="border: none">
      <td style="border: none; text-align: left">報表代碼：text001</td>
      <td style="border: none; text-align: right">【機密資料】</td>
    </tr>
    <tr style="border: none">
      <td style="border: none; text-align: left">列印單位：90251</td>
      <td style="border: none; text-align: right" class="page-number"></td>
    </tr>
  </table>
  <hr/>
</div>`} />
        </details>
        
        <Title level={5}>第一頁才要顯示 / 第一頁不顯示</Title>
        <ul>
          <li>
            <code>@page :first</code>：第一頁 的設定
          </li>
          <li>
            <code>@page :not(:first)</code>：非 第一頁 的設定
          </li>
        </ul>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
        <Paragraph>
          此範例為 第一頁 右下角 顯示 條碼
        </Paragraph>
          <Title level={5}>．css</Title>
          <CodeTsx code={`@page :first {
  @bottom-right {
    content: element(bottomRight);
  }
}
@page :not(:first) {
  @bottom-right {
    content: none;
  }
}
.bottomRight {
  font-size: 14px;
  text-align: right;
  position: running(bottomRight); /* 定義為運行元素 */
}

/* 條碼樣式 */
.barcode {
  font-family: "條碼";
  font-size: 30px;
  text-align: right;
}`} />

          <Title level={5}>．html</Title>
          <CodeTsx code={`<div class="bottomRight">
  <div class="barcode">TEST123456</div>
  <div style="text-align: right">TEST123456</div>
</div>`} />

        </details>

        <hr/>

        <Title level={4}>4.3. 分隔線</Title>
        <Paragraph>
          <code>{`<hr/>`}</code> 用於區分報表區塊。 <br/>
          根據需要 可以調整 分隔線的 粗細設定。
        </Paragraph>
        <CodeTsx code={`hr {
  border: 0.1px solid #000; /* 細實線分隔 */
}`} />

        <hr/>

        <Title level={4}>4.4. 強制換頁</Title>
        <Paragraph>
          透過 CSS 來達成 強制換頁，有需要的可以直接使用。
        </Paragraph>
        <CodeTsx code={`.pageChange {
  page-break-before: always; /* 在元素前強制換頁 */
}`} />
        <Paragraph>
          使用範例
        </Paragraph>
        <CodeTsx code={`<div class="pageChange"></div>`} />

        <hr/>

        <Title level={4}>4.5. 重點文字</Title>
        <Paragraph>
          重點文字，可以透過 CSS 樣式 來調整 <code>文字顏色</code> 和 <code>底色</code>。
        </Paragraph>
        <CodeTsx code={`.highlight {
  color: red; /* 文字顏色 */
  background-color: #f5f5f5; /* 背景色 */
  font-weight: bold; /* 加粗 */
  padding: 2px 4px; /* 內間距 */
}`} />
        <Paragraph>
          使用範例
        </Paragraph>
        <CodeTsx code={`<span class="highlight">重點文字</span>`} />

        <hr/>

        <Title level={4}>4.6. 動態數據處理</Title>
        <Paragraph>
          變數使用 <code>{`\${變數名稱}`}</code> 標示，下面會簡單介紹如何使用。
        </Paragraph>
        <Title level={5}>單值數據</Title>
        <Paragraph>
          <code>{`th:text="\${policyNo}"`}</code> 顯示後端傳入的 <code>policyNo</code> 值。
        </Paragraph>
        <CodeTsx code={`<div>姓名：<span th:text="\${names}"></span></div>`} />

        <Title level={5}>表格數據循環</Title>
        <Paragraph>
          當有 陣列資料 需要顯示，可以透過 <code>{`<table>`}</code> 來呈現資料。 <br/>
          建議在設計欄位的時候，可以使用 <code>Excel</code> 進行設計， <br/>
          並用 合併儲存格 的方式，來調整寬度 (這樣會比較好控制)。 <br/>
          <br/>
        </Paragraph>
        <Paragraph>
          表格整體的 CSS 樣式設計，這裡設定為
        </Paragraph>
        <ul>
          <li>寬度 100% 佔滿畫面</li>
          <li>細框線 + 標題 淺藍色</li>
          <li>文字居中 + 字體 14px</li>
          <li>跨頁時 要重複顯示 標題。</li>
        </ul>
        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>CSS 範例</summary>
          <CodeTsx code={`/* 表格整體樣式 */
table {
  width: 100%; /* 表格寬度填滿容器 */
  border-collapse: collapse; /* 合併邊框，避免雙線效果 */
  -fs-table-paginate: paginate; /* 啟用表格分頁功能 */
  -fs-page-break-min-height: 1.5cm; /* 確保分頁時有足夠空間 */
}
/* 表格通用樣式 */
th, td {
  border: 0.1mm solid; /* 儲存格邊框為 0.1mm 實線 */
  padding: 6px; /* 儲存格內間距 */
  text-align: center; /* 文字居中 */
  font-size: 14px; /* 字體大小 */
  line-height: 1.2; /* 統一行高，確保對齊 */
}
/* 表格顏色樣式 - 表頭顏色 */
th {
  background-color: #66bce1; /* 表頭背景色為淺藍色 */
}
/* 表頭分頁設置 */
thead {
  display: table-header-group; /* 確保表頭在每頁重複顯示 */
}
/* 表格內容行分頁設置 */
tbody tr {
  page-break-inside: avoid; /* 避免行內分頁 */
  break-inside: avoid; /* 現代分頁控制，確保行完整性 */
}`} />
        </details>

        <Title level={5}>單行的表格</Title>
        <ul>
          <li>
            <code>{`<colgroup>`}</code>：表格的 欄位數量 與 占比。
            <ul>
              <li>透過 <code>width</code> 來調整 每一行 的占比。</li>
            </ul>
          </li>
          <li>
            <code>{`<thead>`}</code>：表格的 標題
            <ul>
              <li>寬度 在 <code>{`<colgroup>`}</code> 裡面設定。</li>
            </ul>
          </li>
          <li>
            <code>{`<tbody>`}</code>：表格的 內容 (顯示數據)
            <ul>
              <li>
                <code>{`<tbody class="color2">`}</code>：套用 CSS 樣式。
              </li>
              <li>
                <code>{`<tr th:each="a : \${addrList}">`}</code>：遍歷 `addrList` 列表，`a` 為單筆數據。
              </li>
              <li>
                <code>{`<td th:text="\${a.addrInd}"></td>`}</code>：顯示 `a` 物件的 `addrInd` 屬性數據。 <br/>
                有需要可以透過 <code>{`style="text-align: right;"`}</code> 調整 文字位置。
              </li>
            </ul>
          </li>
        </ul>
       
        <Paragraph>
          透過 CSS 設定 奇數行 為 淺灰色底，使其比較好閱讀。
        </Paragraph>
        <CodeTsx code={`.color2 tr:nth-child(odd) {
  background-color: #f2f2f2; /* 奇數行淺灰 */
}`} />

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>使用範例</summary>
          <CodeTsx code={`<table>
  <colgroup>
    <col style="width: 14%;"/>
    <col style="width: 56%;"/>
    <col style="width: 28%;"/>
  </colgroup>
  <thead>
    <tr>
      <th>地址指示</th>
      <th>地址</th>
      <th>電話</th>
    </tr>
  </thead>
  <tbody class="color2">
    <tr th:each="a : \${addrList}">
      <td th:text="\${a.addrInd}"></td>
      <td th:text="\${a.address}"></td>
      <td th:text="\${a.tel}"></td>
    </tr>
  </tbody>
</table>`} />
        </details>

        <Title level={5}>多行的表格</Title>
        <ul>
          <li>
            <code>{`<colgroup>`}</code>：表格的 欄位數量 與 占比。
            <ul>
              <li>每一行 的 欄位數量 必須相同。</li>
              <li>建議 每一欄都設定等寬，透過 合併儲存格 來調整 欄位的寬度。</li>
              <li>建議使用 Excel 來進行 版型設計。</li>
            </ul>
          </li>
          <li>
            <code>{`<thead>`}</code>：表格的 標題
            <ul>
              <li>假設 需要 兩行，就會有 兩組 <code>{`<tr>`}</code>。</li>
              <li>所有欄位 都透過 合併儲存格 來 設定 佔比，如：<code>{`colspan="2"`}</code>，數字為 佔幾格。</li>
            </ul>
          </li>
          <li>
            <code>{`<tbody>`}</code>：表格的 內容 (顯示數據)
            <ul>
              <li>
                所有欄位 都透過 合併儲存格 來 設定 佔比， <br/>
                與 <code>{`<thead>`}</code> 的設定相同。
              </li>
              <li>
                <code>{`th:each="d : \${b.coInfoList}"`}</code> <br/>
                遍歷 <code>{`coInfoList`}</code> 列表，<code>d</code> 為單筆數據。
              </li>
              <li>
                <code>{`th:text="\${d.clientIdent}"`}</code> <br/>
                顯示 <code>d</code> 物件的 <code>clientIdent</code> 屬性數據。
              </li>
              <li>
                <code>{`th:with="c=\${b.poInfo}"`}</code>：設定 別名。
              </li>
              <li>
                若 數據 需要 兩層迴圈 顯示。
                <ul>
                  <li>
                    第一層 設定在 <code>{`<tbody>`}</code>。 <br/>
                    如：<code>{`<tbody th:each="b : \${policyList}">`}</code> <br/>
                    　　此處 變數 為 JAVA 中 設定的名稱。
                  </li>
                  <li>
                    第二層 設定在 <code>{`<tr>`}</code>。 <br/>
                    如：<code>{`<tr class="color1" th:with="c=\${b.poInfo}">`}</code> <br/>
                    　　此數 變數 為 第一層數據 中的 陣列資料。
                  </li>
                </ul>
              </li>
              <li>
                <code>{`#numbers.formatDecimal(c.faceAmt, 0, 'COMMA', 2, 'POINT')`}</code>：
                <ul>
                  <li><code>參數 1 (c.faceAmt)</code>：要格式化的數字。</li>
                  <li><code>參數 2 (0)</code>：最小整數位數，0 表示不強制補零。</li>
                  <li><code>參數 3 ('COMMA')</code>：千位分隔符，使用逗號（,）；<code>NONE</code> 為 不需要。</li>
                  <li><code>參數 4 (2)</code>：小數點後位數，保留 2 位。</li>
                  <li><code>參數 5 ('POINT')</code>：小數點符號，使用點號（.）；<code>NONE</code> 為 不需要。</li>
                </ul>
                範例輸出：<code>1234567.89</code> 格式化為 <code>1,234,567.89</code>。
              </li>
            </ul>
          </li>
        </ul>
        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>使用範例</summary>
          <Title level={5}>html</Title>
          <CodeTsx code={`<table>
  <colgroup>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
  </colgroup>
  <thead>
    <tr>
      <th colspan="2">保單號碼</th>
      <th colspan="1">狀態</th>
      <th colspan="2">生效日期</th>
      <th colspan="2">繳費日期</th>
      <th colspan="1">理賠</th>
      <th colspan="1">批註</th>
      <th colspan="1">告知</th>
      <th colspan="1">弱體</th>
    </tr>
    <tr>
      <th colspan="1"></th>
      <th colspan="1">關係</th>
      <th colspan="2">險種</th>
      <th colspan="1">版數</th>
      <th colspan="2">保額</th>
      <th colspan="2">生效日期</th>
      <th colspan="2">變更生效日</th>
    </tr>
  </thead>
  <tbody th:each="b : \${policyList}">
    <tr class="color1" th:with="c=\${b.poInfo}">
      <td colspan="2" th:text="\${c.policyNo}"></td>
      <td colspan="1" th:text="\${c.poStsCode}"></td>
      <td colspan="2" th:text="\${c.poIssueDate}"></td>
      <td colspan="2" th:text="\${c.paidToDate}"></td>
      <td colspan="1" th:text="\${c.claimInd}"></td>
      <td colspan="1" th:text="\${c.remarkInd}"></td>
      <td colspan="1" th:text="\${c.informInd}"></td>
      <td colspan="1" th:text="\${c.weakInd}"></td>
    </tr>
    <tr th:each="d : \${b.coInfoList}">
      <td colspan="1"></td>
      <td colspan="1" th:text="\${d.clientIdent}"></td>
      <td colspan="2" th:text="\${d.planCode}"></td>
      <td colspan="1" th:text="\${d.rateScale}"></td>
      <td colspan="2" style="text-align: right;" th:text="\${#numbers.formatDecimal(d.faceAmt, 0, 'COMMA', 2, 'POINT')}"></td>
      <td colspan="2" th:text="\${d.coIssueDate}"></td>
      <td colspan="2" th:text="\${d.coChangeDate}"></td>
    </tr>
  </tbody>
</table>`} />
          <Title level={5}>java</Title>
          <CodeJava code={`public class PolicyDTO {
    private PoInfoDTO poInfo;
    private List<CoInfoDTO> coInfoList;

    ... setting 和 getting
}`} />
        </details>

        <hr/>

        <Title level={3}>5. 完整範例</Title>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>樣板檔</summary>
          <CodeTsx code={`
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
  <meta charset="UTF-8" />
  <style>
    /* 設置頁面整體樣式 */
    body {
      font-family: "標楷體", "Noto Serif CJK TC", sans-serif;
      font-size: 14px; /* 預設字體大小 */
    }

    /* 頁面佈局設定 */
    @page {
      size: A4; /* 紙張樣式：A4 = 直式 A4 ; A4 landscape = 橫式 A4 */
      margin: 110pt 30pt 60pt 30pt;
      @top-center {
        content: element(header) element(headerInfo); /* 頁眉顯示 header 和 headerInfo 元素內容 */
        padding-top: 30px;
      }
      @bottom-center {
        font-family: "標楷體"; /* 頁腳字體 */
        content: "第 " counter(page) " 頁 / 共 " counter(pages) " 頁"; /* 頁腳顯示頁碼 */
        padding-bottom: 30px;
      }
    }
    @page :first {
      @bottom-right {
        content: element(bottomRight);
      }
    }
    @page :not(:first) {
      @bottom-right {
        content: none;
      }
    }

    /* 頁眉樣式 */
    header {
      display: block; /* 頁眉為塊級元素 */
      text-align: center; /* 文字居中 */
      font-weight: bold; /* 文字加粗 */
      font-size: 16px; /* 頁眉字體大小 */
      position: running(header); /* 定義為運行元素，確保每頁顯示 */
    }
    .headerInfo {
      width: 100%; /* 表格寬度填滿容器 */
      font-size: 14px; /* 字體大小 */
      position: running(headerInfo); /* 定義為運行元素，確保每頁顯示 */
    }
    .bottomRight {
      font-size: 14px;
      text-align: right;
      position: running(bottomRight); /* 定義為運行元素 */
    }

    /* 分隔線樣式 */
    hr {
      border: 0.1px solid #000;
    }

    /* 強制換頁設定 */
    .pageChange {
      page-break-before: always;
    }

    /* 頁碼顯示樣式 */
    .page-number::after {
      content: "頁碼： " counter(page) " / " counter(pages) ;
      font-family: "標楷體";
      font-size: 14px;
    }

    /* 條碼樣式 */
    .barcode {
      font-family: "條碼";
      font-size: 30px;
      text-align: right;
    }

    /* 表格整體樣式 */
    table {
      width: 100%; /* 表格寬度填滿容器 */
      border-collapse: collapse; /* 合併邊框，避免雙線效果 */
      -fs-table-paginate: paginate; /* 啟用表格分頁功能 */
      -fs-page-break-min-height: 1.5cm; /* 確保分頁時有足夠空間 */
    }

    /* 表格通用樣式 */
    th, td {
      border: 0.1mm solid; /* 儲存格邊框為 0.1mm 實線 */
      padding: 6px; /* 儲存格內間距 */
      text-align: center; /* 文字居中 */
      font-size: 14px; /* 字體大小 */
      line-height: 1.2; /* 統一行高，確保對齊 */
    }

    /* 表格顏色樣式 - 表頭顏色 */
    th {
      background-color: #66bce1; /* 表頭背景色為淺藍色 */
    }
    /* 表格顏色樣式 - 表身顏色 */
    .color1 td {
      background-color: #c6dee8;
    }
    /* 表格顏色樣式 - 奇數行顏色 */
    .color2 tr:nth-child(odd) {
      background-color: #f2f2f2; /* 奇數行淺灰 */
    }

    /* 重點文字顏色樣式 */
    .highlight {
      color: red; /* 文字顏色 */
      background-color: #f5f5f5; /* 背景色 */
      font-weight: bold; /* 加粗 */
      padding: 2px 4px; /* 內間距 */
    }

    /* 表頭分頁設置 */
    thead {
      display: table-header-group; /* 確保表頭在每頁重複顯示 */
    }

    /* 表格內容行分頁設置 */
    tbody tr {
      page-break-inside: avoid; /* 避免行內分頁 */
      break-inside: avoid; /* 現代分頁控制，確保行完整性 */
    }
  </style>
</head>
<body>
<header class="header">
  <div>三商美邦人壽保險股份有限公司</div>
  <div>客戶資料表</div>
</header>

<div class="headerInfo">
  <table>
    <tr style="border: none">
      <td style="border: none; text-align: left">報表代碼：text001</td>
      <td style="border: none; text-align: right">【機密資料】</td>
    </tr>
    <tr style="border: none">
      <td style="border: none; text-align: left">列印單位：90251</td>
      <td style="border: none; text-align: right" class="page-number"></td>
    </tr>
  </table>
  <hr/>
</div>

<div class="bottomRight">
  <div class="barcode">TEST123456</div>
  <div style="text-align: right">TEST123456</div>
</div>

<h3>基本資料</h3>
<div>姓名：<span th:text="\${names}"></span></div>
<div>性別：<span th:text="\${sex}"></span></div>
<div>年齡：<span th:text="\${age}"></span></div>

<br/>

<h3>聯絡資料</h3>
<table>
  <colgroup>
    <col style="width: 14%;"/>
    <col style="width: 56%;"/>
    <col style="width: 28%;"/>
  </colgroup>
  <thead>
    <tr>
      <th style="width: 1%;">地址指示</th>
      <th style="width: 4%;">地址</th>
      <th style="width: 2%;">電話</th>
    </tr>
  </thead>
  <tbody class="color2">
    <tr th:each="a : \${addrList}">
      <td style="width: 1%; text-align: center;" th:text="\${a.addrInd}"></td>
      <td style="width: 4%; text-align: center;" th:text="\${a.address}"></td>
      <td style="width: 2%; text-align: center;" th:text="\${a.tel}"></td>
    </tr>
  </tbody>
</table>

<br/>

<h3>保單資料</h3>
<table>
  <colgroup>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
    <col style="width: 9%;"/>
  </colgroup>
  <thead>
    <tr>
      <th colspan="2">保單號碼</th>
      <th colspan="1">狀態</th>
      <th colspan="2">生效日期</th>
      <th colspan="2">繳費日期</th>
      <th colspan="1">理賠</th>
      <th colspan="1">批註</th>
      <th colspan="1">告知</th>
      <th colspan="1">弱體</th>
    </tr>
    <tr>
      <th colspan="1"></th>
      <th colspan="1">關係</th>
      <th colspan="2">險種</th>
      <th colspan="1">版數</th>
      <th colspan="2">保額</th>
      <th colspan="2">生效日期</th>
      <th colspan="2">變更生效日</th>
    </tr>
  </thead>
  <tbody th:each="b : \${policyList}">
    <tr class="color1" th:with="c=\${b.poInfo}">
      <td colspan="2" th:text="\${c.policyNo}"></td>
      <td colspan="1" th:text="\${c.poStsCode}"></td>
      <td colspan="2" th:text="\${c.poIssueDate}"></td>
      <td colspan="2" th:text="\${c.paidToDate}"></td>
      <td colspan="1" th:text="\${c.claimInd}"></td>
      <td colspan="1" th:text="\${c.remarkInd}"></td>
      <td colspan="1" th:text="\${c.informInd}"></td>
      <td colspan="1" th:text="\${c.weakInd}"></td>
    </tr>
    <tr th:each="d : \${b.coInfoList}">
      <td colspan="1"></td>
      <td colspan="1" th:text="\${d.clientIdent}"></td>
      <td colspan="2" th:text="\${d.planCode}"></td>
      <td colspan="1" th:text="\${d.rateScale}"></td>
      <td colspan="2" style="
      text-align: right;" th:text="\${#numbers.formatDecimal(d.faceAmt, 0, 'COMMA', 2, 'POINT')}"></td>
      <td colspan="2" th:text="\${d.coIssueDate}"></td>
      <td colspan="2" th:text="\${d.coChangeDate}"></td>
    </tr>
  </tbody>
</table>

<br/>

<div class="pageChange"/>
<p>備註：</p>
<p>此為<span class="highlight">練習用範例</span>，相關資料均為假資料。</p>
</body>
</html>`} />
        </details>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Service</summary>
          <CodeJava code={`@Service
public class PdfService {
    @Autowired
    private TemplateEngine templateEngine;

    public byte[] generatePolicyPdf() {
        // 模擬資料
        // 基本資料
        String names = "測試員 A123456789";
        String sex = "男性";
        Integer age = 25;
        // 聯絡資料
        List<AddrDTO> addrList = new ArrayList<>();
        for (int i = 1 ; i <= 10 ; i++) {
            AddrDTO addr = new AddrDTO();
            addr.setAddrInd(String.valueOf(i));
            addr.setAddress("台北市內湖區石潭路58號"+i+"樓");
            addr.setTel("02-23455511");
            addrList.add(addr);
        }
        // 保單資料
        List<PolicyDTO> policyList = new ArrayList<>();
        for (int i = 0 ; i < 5 ; i++) {
            PolicyDTO policyDTO = new PolicyDTO();
            // 保單
            PoInfoDTO poInfo = new PoInfoDTO();
            poInfo.setPolicyNo("10000000000"+i);
            poInfo.setPoStsCode("42");
            poInfo.setPoIssueDate("100/01/10");
            poInfo.setPaidToDate("115/01/10");
            poInfo.setClaimInd("N");
            poInfo.setRemarkInd("N");
            poInfo.setInformInd("N");
            poInfo.setWeakInd("N");
            policyDTO.setPoInfo(poInfo);
            // 保障
            List<CoInfoDTO> coInfoList = new ArrayList<>();
            for (int j = 1 ; j <= 3 ; j++) {
                CoInfoDTO coInfo = new CoInfoDTO();
                coInfo.setClientIdent("I1");
                coInfo.setPlanCode("ABCD"+i);
                coInfo.setRateScale("0");
                coInfo.setFaceAmt(1000000.00);
                coInfo.setCoIssueDate("100/01/10");
                coInfo.setCoChangeDate("100/01/20");
                coInfoList.add(coInfo);
            }
            policyDTO.setCoInfoList(coInfoList);
            policyList.add(policyDTO);
        }

        // 設定變數
        Context context = new Context();
        context.setVariable("names", names);
        context.setVariable("sex", sex);
        context.setVariable("age", age);
        context.setVariable("addrList", addrList);
        context.setVariable("policyList", policyList);

        return HtmlToPDFUtil.htmlToPdf(templateEngine, "客戶資料表.html", context);
    }
}`} />
        </details>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Controller</summary>
          <CodeJava code={`@RestController
public class PdfController {

    @Autowired
    private PdfService pdfService;

    @GetMapping("/policy/pdf")
    public ResponseEntity<Resource> generatePdf() {
        var file = pdfService.generatePolicyPdf();
        return ExportReponseUtil.responseEntity("policy.pdf", file);
    }
}`} />
        </details>

      </Typography>
    </PageContainer>
  )
}

export default HtmlToPdf