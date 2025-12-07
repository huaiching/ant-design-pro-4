import { PageContainer } from "@ant-design/pro-components"
import CodeJava from '@/utils/CodeJava'
import CodeSQL from '@/utils/CodeSQL'
import { Typography } from "antd"
import CodeTsx from "@/utils/CodeTsx"

const { Title, Paragraph } = Typography

const Controller = () => {
  return (
    <PageContainer>
      <Typography>
        <Paragraph>
          Controller 是 Spring Boot 專案中的一個重要組件，負責處理來自客戶端的請求，並返回相應的響應。<br />
          其內部方法 不會進行 邏輯處理，而是將請求轉發給 Service 層進行處理，然後將結果返回給客戶端。
        </Paragraph>

        <hr />

        <Title level={3}>1. 資料夾結構</Title>
        <Paragraph>
          java  <br />
          ├─ 📁controller <br />
          │　　　├─ 📄控制器類別檔
        </Paragraph>

        <hr />

        <Title level={3}>2. 基本結構</Title>
        <Paragraph>
          Controller Class 通常包含以下部分：
        </Paragraph>
        <ul>
          <li>
            <code>@RestController</code>：標註此類別為控制器，並自動將方法回傳值轉換為 JSON 格式。
          </li>
          <li>
            <code>@RequestMapping</code>：定義控制器的路由路徑。
          </li>
          <li>
            <code>@Tag</code>：用於 Swagger 文件中，標註控制器的標籤和描述。
            <ul>
              <li>name：Controller 名稱 (不可使用 中文)</li>
              <li>description：標籤描述</li>
            </ul>
          </li>
        </ul>

        <Paragraph>
          Controller 內部的方法 通常包含以下部分：
        </Paragraph>
        <ul>
          <li>
            <code>@Operation</code>：用於 Swagger 文件中，描述方法的功能。
          </li>
          <li>
            HTTP 請求方法 <br />
            <Paragraph type="danger"><code>CSMO 專案</code> 請全部使用 <code>POST</code> 請求</Paragraph>
            <ul>
              <li><code>@PostMapping</code>：處理 POST 請求</li>，Input 搭配 <code>@RequestBody</code>
              <li><code>@GetMapping</code>：處理 GET 請求</li>，Input 搭配 <code>@RequestParam</code> 或 <code>@PathVariable</code>
            </ul>
          </li>
          <li>
            <Paragraph type="warning">需注意 import 要使用 <code>import org.springframework.web.bind.annotation.*;</code> 下的註解。</Paragraph>
          </li>
        </ul>

        <Paragraph>
          API 方法，需使用 <code>ResponseEntity&lt;回傳型態&gt;</code> 作為回傳類型，以便靈活控制 HTTP 狀態碼和響應內容。 <br />
          常用的回傳方式有兩種：
        </Paragraph>
        <ul>
          <li>
            <code>ResponseEntity.ok(回傳資料)</code>： 回傳 HTTP 狀態碼 200 (成功) 以及資料。
          </li>
          <li>
            <code>ResponseEntity.ok().build()</code>： 回傳 HTTP 狀態碼 200 (成功)，但不包含資料。
          </li>
        </ul>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <Paragraph>
            針對 addr 地址檔，建立 Controller，處理先前 於 Service 方法 的 API 請求。
          </Paragraph>

          <CodeJava code={`@RestController
@RequestMapping("/addr")
@Tag(name = "Addr Controller", description = "地址相關 API 接口")
public class AddrController {
    @Autowired
    private AddrService addrService;

    @Operation(summary = "根據 客戶證號 取得 地址資料", description = "根據 客戶證號 取得 地址資料")
    @PostMapping("/queryAddrByClientId")
    public ResponseEntity<List<AddrVo>> queryAddrByClientId(@RequestBody ClientIdDto clientIdDto) {
        List<AddrVo> addrVoList = addrService.queryAddrByClientId(clientIdDto.getClientId());
        return ResponseEntity.ok(addrVoList);
    }

    @Operation(summary = "查詢 客戶 是否存在 地址資料", description = "查詢 客戶 是否存在 地址資料 (Ture.存在 / False.不存在)")
    @PostMapping("/queryAddrExists")
    public ResponseEntity<Boolean> queryAddrExists(@RequestBody ClientIdDto clientIdDto) {
        Boolean addrExists = addrService.queryAddrExists(clientIdDto.getClientId());
        return ResponseEntity.ok(addrExists);
    }

    @Operation(summary = "更新地址", description = "更新地址")
    @PostMapping("/updateAddress")
    public ResponseEntity<Void> updateAddress(@RequestBody AddressSearchDto addressSearchDto) {
        addrService.updateAddress(addressSearchDto.getClientId(), addressSearchDto.getAddrInd(), addressSearchDto.getAddress());
        return ResponseEntity.ok().build();
    }
}`} />
        </details>

        <hr />

        <Title level={3}>3. 檔案下載 API</Title>
        <Paragraph>
          當需要讓前端「下載檔案」（PDF、Excel、圖片等）時，Controller 必須回傳 <code>ResponseEntity&lt;Resource&gt;</code>，並正確設定以下 Header：
        </Paragraph>
        <ul>
          <li><code>Content-Disposition: attachment; filename="檔案名稱"</code> → 強制瀏覽器下載</li>
          <li><code>Content-Type: application/octet-stream</code>（或具體 MIME，如 <code>application/pdf</code>）</li>
          <li>檔案內容使用 <code>ByteArrayResource</code> 包裝</li>
        </ul>

        <Paragraph type="warning">
          <strong>注意：</strong><br />
          檔名若有中文或特殊字元，務必使用 <code>URLEncoder.encode(fileName, StandardCharsets.UTF_8)</code> 編碼，否則會出現亂碼或檔名損毀。
        </Paragraph>

        <Title level={5}>範例</Title>
        <CodeJava code={`@RestController
@Tag(name = "PDF Controller", description = "PDF 報表匯出測試")
@RequestMapping("/export/htmlToPdf")
public class HtmlToPdfController {

    @Autowired
    private HtmlToPdfService htmlToPdfService;

    @Operation(summary = "openHtmlToPdf 報表測試",
               description = "使用 openHtmlToPdf 產生 PDF 並直接下載")
    @PostMapping("/generatePdf")
    public ResponseEntity<Resource> generatePdf() {
        byte[] pdfBytes = htmlToPdfService.generatePdf();
        String fileName = "客戶報表_2025.pdf";   // 可含中文與日期

        // 將 byte[] 包裝成 Resource
        Resource resource = new ByteArrayResource(pdfBytes);

        HttpHeaders headers = new HttpHeaders();
        // 關鍵：觸發下載並正確編碼檔名
        headers.setContentDispositionFormData("attachment",
                URLEncoder.encode(fileName, StandardCharsets.UTF_8));
        
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)   // 通用下載類型
                // .contentType(MediaType.APPLICATION_PDF)        // 也可以明確指定 PDF
                .contentLength(pdfBytes.length)
                .body(resource);
    }
}`} />

        <Paragraph type="success">
          <strong>前端呼叫方式</strong>
        </Paragraph>
        <CodeTsx code={`    
await 後端API方法(參數, {
  responseType: 'blob', // 回應請求設定為 blob (二進位檔案)
  getResponse: true     // 需要完整的回應物件 (包含 標題 等)
})
.then((res: any) => {
  // data = 檔案流 ； response = 標題資訊
  const { data, response } = res
  // 從 標題資訊 取得 content-disposition 的 數值 (裡面會有檔案名資訊)
  const str: string | null = response.headers.get('content-disposition') || ''
  // 從 content-disposition 解析出 檔名資訊
  const filename = str?.split(';')[1]?.split('filename=')[1] || ''
  // 產生 檔案下載，檔名從 content-disposition 取得
  FileSaver.saveAs(data, decodeURIComponent(filename))
})
`} />














      </Typography>
    </PageContainer>
  )
}

export default Controller