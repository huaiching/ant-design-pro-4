import { PageContainer } from "@ant-design/pro-components"
import { Typography, Image, Table } from "antd"
import ImgMergeExcel01 from './Image/mergeExcel_01.png'
import ImgMergeExcel02 from './Image/mergeExcel_02.png'
import ImgSampleEach01 from './Image/sampleEach_01.png'
import ImgSampleEach02 from './Image/sampleEach_02.png'
import ImgSampleEach03 from './Image/sampleEach_03.png'
import ImgSampleGrid01 from './Image/sampleGrid_01.png'
import ImgSampleGrid02 from './Image/sampleGrid_02.png'
import CodeXML from "@/utils/CodePre/CodeXML"
import CodeJava from "@/utils/CodePre/CodeJava"
import CodeText from "@/utils/CodePre/CodeText"

const { Title, Paragraph } = Typography

const Excel: React.FC = () => {
  return (
    <PageContainer title={false}>
      <Typography>
        <Paragraph>
          <code>Excel 生成</code> 是透過 apache.poi 和 JXLS 2 這些套件 生成 <br />
          運作原理為 <code>Java 設定變數</code> 後， 將變數 <code>套印</code> 至 <code>Excel 樣版檔</code>。 <br />
          使用時 <code>pom.xml</code> 需要先設定此套件。
        </Paragraph>

        <CodeXML code={`<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi</artifactId>
    <version>5.2.3</version>
</dependency>
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>5.2.3</version>
</dependency>
<dependency>
    <groupId>org.jxls</groupId>
    <artifactId>jxls-poi</artifactId>
    <version>2.12.0</version>
    <exclusions>
        <exclusion>
            <groupId>org.apache.poi</groupId>
            <artifactId>*</artifactId>
        </exclusion>
    </exclusions>
</dependency>`} />

        <Paragraph type='danger'>
          CSMO 專案 已包含此套件，不需要設定
        </Paragraph>

        <hr />

        <Title level={3}>1. 資料結構</Title>
        <Paragraph>
          java  <br />
          ├─ 📁constants  <br />
          ├─ 📁controller  <br />
          │　　├─ 📄 API 呼叫入口.java  <br />
          ├─ 📁service  <br />
          │　　├─ 📄 報表邏輯處理(生成資料數據).java  <br />
          ├─ 📁dto  <br />
          │　　├─ 📄 資料傳輸物件.java  <br />
          ├─ 📁util  <br />
          │　　├─ 📄 ExcelUtil.java　　# Excel 的檔案生成工具  <br />
          <br />
          resources  <br />
          ├─ 📁 templates  <br />
          │　　├─ 📄 樣板檔.xlsx
        </Paragraph>

        <hr />

        <Title level={3}>2. 運作方式</Title>
        <ol>
          <li>
            設定 樣版檔
            <ul>
              <li>
                樣板變數 <code>{`\${ }`}</code>。
              </li>
              <li>
                透過 Excel 的 註解 來 撰寫 jxls code。
              </li>
              <li>
                支援 Excel 的 公式 與 設定。
              </li>
            </ul>
            <Image
              width={600}
              src={ImgSampleEach01}
            />
          </li>
          <li>
            設定 Java 資料內容
            <ul>
              <li>
                宣告 <code>{`Context context = new Context();`}</code>
              </li>
              <li>
                使用 <code>{`context.putVar("變數名稱", 數值);`}</code> 設定資料內容
                <ul>
                  <li><code>key</code>：樣版檔 變數名稱</li>
                  <li><code>value</code>：顯示的數值</li>
                </ul>
              </li>
            </ul>
            <CodeJava code={`Context context = new Context();
context.putVar("clientId", userId);
context.putVar("names", userName);
context.putVar("addr", addrList);`} />
          </li>
          <li>
            將 樣板檔位置 及 資料內容 傳入 <code>工具程式</code>，產出 Excel 檔案。
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
            { name: '產生 Excel 檔案 (單筆資料)', method: 'generateExcel(String modelFile, Context context)' },
            { name: '產生 Excel 檔案 (相同樣板 + 多筆資料)', method: 'generateExcelList(String modelFile, Map<String, Context> dataList)' },
            { name: 'Excel 檔案合併 (針對一個工作表的檔案)', method: 'mergeExcel(Map<String, byte[]> fileList)' },
          ]}
          pagination={false}
        />
        <CodeJava code={`
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.jxls.common.Context;
import org.jxls.util.JxlsHelper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.CollectionUtils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * Excel 匯出工具
 */
public class ExcelUtil {
    /**
     * 產生 Excel 檔案 (單筆資料)
     *
     * @param modelFile 樣版路徑 (resources/templates/{modelFile})
     * @param context   JXLS Context，包含資料模型與變數（例如 context.putVar("users", userList)）
     * @return 產出的 Excel 檔案資料流（byte[]）
     */
    public static byte[] generateExcel(String modelFile, Context context) {
        // 參數驗證
        if (StringUtils.isEmpty(modelFile)) {
            throw new RuntimeException("樣版路徑 不可空白!!");
        }
        if (context == null) {
            throw new RuntimeException("資料內容 不可空白!!");
        }

        // 樣板位置
        String model = "/templates/" + modelFile;

        // 產生檔案
        try (
                // 讀取 classpath 下的樣版 Excel 檔案
                InputStream inputStream = new ClassPathResource(model).getInputStream();

                // 建立輸出流，用來儲存產生的 Excel 內容
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream()
        ) {
            // 處理 Excel 樣版，產生新的 Excel 並寫入 outputStream
            JxlsHelper.getInstance()
                    .setEvaluateFormulas(true) // 啟用 Excel 公式自動計算
                    .processTemplate(inputStream, outputStream, context);

            // 回傳產生好的 byte[]
            return outputStream.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Excel 產生失敗，樣版路徑: " + modelFile, e);
        }
    }

    /**
     * 產生 Excel 檔案 (相同樣板 + 多筆資料)
     *
     * @param modelFile 樣版路徑 (resources/templates/{modelFile})
     * @param dataList  資料內容 清單 (Map key = 分頁名稱 / Map value = context)
     * @return 產出的 Excel 檔案資料流（byte[]）
     */
    public static byte[] generateExcelList(String modelFile, Map<String, Context> dataList) {
        // 參數驗證
        if (StringUtils.isEmpty(modelFile)) {
            throw new RuntimeException("樣版路徑 不可空白!!");
        }
        if (CollectionUtils.isEmpty(dataList)) {
            throw new RuntimeException("資料內容 不可空白!!");
        }

        try (
                Workbook mergedWorkbook = new XSSFWorkbook();
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream()
        ) {

            int i = 0;
            for (Map.Entry<String, Context> data : dataList.entrySet()) {
                // 取得資料
                String sheetName = data.getKey();
                Context context = data.getValue();
                // 產生檔案
                byte[] file = generateExcel(modelFile, context);
                // 合併資料
                try (InputStream inputStream = new ByteArrayInputStream(file);
                     Workbook workbook = WorkbookFactory.create(inputStream)) {

                    // 取得第一個工作表
                    Sheet originalSheet = workbook.getSheetAt(0);

                    // 建立新工作表
                    sheetName = sheetName != null ? sheetName : "Sheet" + (i + 1);
                    Sheet newSheet = mergedWorkbook.createSheet(sheetName);

                    // 複製工作表內容
                    copySheet(mergedWorkbook, originalSheet, newSheet);
                }
                // 計數
                i++;
            }

            mergedWorkbook.write(outputStream);
            return outputStream.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Excel 產生失敗，樣版路徑: " + modelFile, e);
        }
    }

    /**
     * Excel 檔案合併 (針對一個工作表的檔案)
     *
     * @param fileList 資料內容 清單 (Map key = 檔案名稱 / Map value = 檔案資料流)
     * @return 產出的 Excel 檔案資料流（byte[]）
     */
    public static byte[] mergeExcel(Map<String, byte[]> fileList) {
        // 參數驗證
        if (CollectionUtils.isEmpty(fileList)) {
            throw new RuntimeException("檔案清單 不可空白!!");
        }

        try (
                Workbook mergedWorkbook = new XSSFWorkbook();
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream()
        ) {

            int i = 0;
            for (Map.Entry<String, byte[]> data : fileList.entrySet()) {
                // 取得資料
                String sheetName = data.getKey();
                byte[] file = data.getValue();
                // 合併資料
                try (InputStream inputStream = new ByteArrayInputStream(file);
                     Workbook workbook = WorkbookFactory.create(inputStream)) {

                    // 取得第一個工作表
                    Sheet originalSheet = workbook.getSheetAt(0);

                    // 建立新工作表
                    sheetName = sheetName != null ? sheetName : "Sheet" + (i + 1);
                    Sheet newSheet = mergedWorkbook.createSheet(sheetName);

                    // 複製工作表內容
                    copySheet(mergedWorkbook, originalSheet, newSheet);
                }
                // 計數
                i++;
            }

            mergedWorkbook.write(outputStream);
            return outputStream.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Excel 產生失敗", e);
        }
    }

    /**
     * 複製工作表內容 (包含合併儲存格)
     */
    private static void copySheet(Workbook mergedWorkbook, Sheet originalSheet, Sheet newSheet) {
        // 1. 先處理合併儲存格區域
        copyMergedRegions(originalSheet, newSheet);

        // 2. 複製欄寬設定
        for (int i = 0; i < originalSheet.getRow(0).getLastCellNum(); i++) {
            newSheet.setColumnWidth(i, originalSheet.getColumnWidth(i));
        }

        // 3. 複製每一行
        for (int i = 0; i <= originalSheet.getLastRowNum(); i++) {
            Row originalRow = originalSheet.getRow(i);
            if (originalRow == null) {
                continue;
            }

            Row newRow = newSheet.createRow(i);

            // 4. 複製每個儲存格
            for (int j = 0; j < originalRow.getLastCellNum(); j++) {
                Cell originalCell = originalRow.getCell(j);
                if (originalCell == null) {
                    continue;
                }

                Cell newCell = newRow.createCell(j);
                copyCellValue(originalCell, newCell);
                copyCellStyle(mergedWorkbook, originalCell, newCell);
            }
        }
    }

    /**
     * 複製合併儲存格區域
     */
    private static void copyMergedRegions(Sheet originalSheet, Sheet newSheet) {
        // 取得原始工作表的所有合併區域
        List<CellRangeAddress> mergedRegions = originalSheet.getMergedRegions();

        // 將每個合併區域複製到新工作表
        for (CellRangeAddress mergedRegion : mergedRegions) {
            newSheet.addMergedRegion(mergedRegion);
        }
    }

    /**
     * 複製儲存格值
     */
    private static void copyCellValue(Cell originalCell, Cell newCell) {
        switch (originalCell.getCellType()) {
            case NUMERIC:
                newCell.setCellValue(originalCell.getNumericCellValue());
                break;
            case BOOLEAN:
                newCell.setCellValue(originalCell.getBooleanCellValue());
                break;
            case FORMULA:
                newCell.setCellFormula(originalCell.getCellFormula());
                break;
            case BLANK:
                newCell.setBlank();
                break;
            default:
                newCell.setCellValue(originalCell.getStringCellValue());
        }
    }

    /**
     * 複製儲存格樣式
     */
    private static void copyCellStyle(Workbook mergedWorkbook, Cell originalCell, Cell newCell) {
        CellStyle newCellStyle = mergedWorkbook.createCellStyle();
        newCellStyle.cloneStyleFrom(originalCell.getCellStyle());
        newCell.setCellStyle(newCellStyle);
    }
}`} />

        <hr />

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例：Each 遞迴表格 - 單筆資料</summary>
          <Image
            width={600}
            src={ImgSampleEach02}
          />
          <Title level={4}>樣版檔</Title>
          <Paragraph>
            於 <code>/resources/templates/</code> 新增 Excel檔案 <code>sampleEach.xlsx</code> <br />
            並 根據下圖方式，設定樣版檔
          </Paragraph>
          <ul>
            <li>
              A1 儲存格：設定 掃瞄範圍
              <CodeText code={`jx:area(lastCell="C5")`} />
              <ul>
                <li><code>lastCell="C5"</code>：模板範圍 (A1 ~ C5)</li>
              </ul>
            </li>
            <li>
              A2 儲存格：
              <ul>
                <li><code>{`\${clientId}`}</code>：Java 傳入 <code>clientId</code> 設定 客戶ID。</li>
                <li><code>{`\${names}`}</code>：Java 傳入 <code>names</code> 設定 客戶姓名。</li>
              </ul>
            </li>
            <li>
              A4 儲存格：設定 遞迴表格
              <CodeText code={`jx:each(items="addr" var="a" orderBy="a.addrInd ASC" lastCell="C4")`} />
            </li>
            <li>
              <code>jx:each(...)</code>：遞迴表格 的語法
              <ul>
                <li>
                  <code>items="addr"</code>：Java 傳入 <code>addr</code> 設定 地址清單資料來源
                </li>
                <li>
                  <code>var="a"</code>：樣版 端 設定 變數別名
                </li>
                <li>
                  <code>orderBy="a.addrInd ASC"</code>：資料排序
                </li>
                <li>
                  <code>lastCell="C4"</code>：設定 迴圈 的 結尾；A2 設定 代表 模板範圍 (A2 ~ C4)
                </li>
                <li>
                  <code>{`\${addr.size()}`}</code>：透過 Jxls 的 函式 <code>.size()</code> 計算筆數， <br />
                  也可用 Excel 公式取代。
                </li>
              </ul>
            </li>
          </ul>
          <Image
            width={800}
            src={ImgSampleEach01}
          />

          <Title level={4}>Service</Title>
          <ul>
            <li>取得 來源資料 後，根據 樣版檔 的設定，將對應資料 寫入 <code>context</code> 中。</li>
            <li>最後透過 工具 產生 Excel。</li>
          </ul>
          <CodeJava code={`public byte[] sampleEach(String clientId) {
        // 基本資料
        String clntSql = "SELECT * FROM clnt " +
                "WHERE client_id = :clientId ";

        Map<String, Object> clntParams = new HashMap<>();
        clntParams.put("clientId", clientId);

        List<ClntVo> clntVoList = namedParameterJdbcTemplate.query(clntSql, clntParams, new BeanPropertyRowMapper<>(ClntVo.class));
        String names = "";
        if (!CollectionUtils.isEmpty(clntVoList)) {
            names = clntVoList.get(0).getNames();
        }
        
        // 地址資料
        String addrSql = "SELECT * FROM addr " +
                "WHERE client_id = :clientId ";

        Map<String, Object> addrParams = new HashMap<>();
        addrParams.put("clientId", clientId);

        List<AddrVo> addrVoList = namedParameterJdbcTemplate.query(addrSql, addrParams, new BeanPropertyRowMapper<>(AddrVo.class));


        // 設定 資料內容
        Context context = new Context();
        context.putVar("clientId", clientId);
        context.putVar("names", names);
        context.putVar("addr", addrVoList);

        return ExcelUtil.generateExcel("sampleEach.xlsx", context);
    }`} />
        </details>

        <hr />

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例：Each 遞迴表格 - 多筆資料</summary>
          <Image
            width={600}
            src={ImgSampleEach03}
          />
          <Title level={4}>樣版檔</Title>
          <Paragraph>
            於 <code>/resources/templates/</code> 新增 Excel檔案 <code>sampleEach.xlsx</code> <br />
            並 根據下圖方式，設定樣版檔
          </Paragraph>
          <ul>
            <li>
              A1 儲存格：設定 掃瞄範圍
              <CodeText code={`jx:area(lastCell="C5")`} />
              <ul>
                <li><code>lastCell="C5"</code>：模板範圍 (A1 ~ C5)</li>
              </ul>
            </li>
            <li>
              A2 儲存格：
              <ul>
                <li><code>{`\${clientId}`}</code>：Java 傳入 <code>clientId</code> 設定 客戶ID。</li>
                <li><code>{`\${names}`}</code>：Java 傳入 <code>names</code> 設定 客戶姓名。</li>
              </ul>
            </li>
            <li>
              A4 儲存格：設定 遞迴表格
              <CodeText code={`jx:each(items="addr" var="a" orderBy="a.addrInd ASC" lastCell="C4")`} />
            </li>
            <li>
              <code>jx:each(...)</code>：遞迴表格 的語法
              <ul>
                <li>
                  <code>items="addr"</code>：Java 傳入 <code>addr</code> 設定 地址清單資料來源
                </li>
                <li>
                  <code>var="a"</code>：樣版 端 設定 變數別名
                </li>
                <li>
                  <code>orderBy="a.addrInd ASC"</code>：資料排序
                </li>
                <li>
                  <code>lastCell="C4"</code>：設定 迴圈 的 結尾；A2 設定 代表 模板範圍 (A2 ~ C4)
                </li>
                <li>
                  <code>{`\${addr.size()}`}</code>：透過 Jxls 的 函式 <code>.size()</code> 計算筆數， <br />
                  也可用 Excel 公式取代。
                </li>
              </ul>
            </li>
          </ul>
          <Image
            width={800}
            src={ImgSampleEach01}
          />

          <Title level={4}>Service</Title>
          <ul>
            <li>取得 來源資料 後，根據 樣版檔 的設定，將對應資料 寫入 <code>context</code> 中。</li>
            <li>
              多筆資料，要整理成 <code>{`Map<String, Context>`}</code> 中。
              <ul>
                <li><code>key</code>：工作表 分頁名稱</li>
                <li><code>valse</code>：工作表 的 資料內容</li>
              </ul>
            </li>
            <li>最後透過 工具 產生 Excel。</li>
          </ul>
          <CodeJava code={`public byte[] sampleEachList(List<ClientIdDto> clientIdDtoList) {
        Map<String, Context> dataMap = new HashMap<>();
        for (ClientIdDto clientIdDto : clientIdDtoList) {
            String clientId = clientIdDto.getClientId();
            // 基本資料
            String clntSql = "SELECT * FROM clnt " +
                    "WHERE client_id = :clientId ";

            Map<String, Object> clntParams = new HashMap<>();
            clntParams.put("clientId", clientId);

            List<ClntVo> clntVoList = namedParameterJdbcTemplate.query(clntSql, clntParams, new BeanPropertyRowMapper<>(ClntVo.class));
            String names = "";
            if (!CollectionUtils.isEmpty(clntVoList)) {
                names = clntVoList.get(0).getNames();
            }

            // 地址資料
            String addrSql = "SELECT * FROM addr " +
                    "WHERE client_id = :clientId ";

            Map<String, Object> addrParams = new HashMap<>();
            addrParams.put("clientId", clientId);

            List<AddrVo> addrVoList = namedParameterJdbcTemplate.query(addrSql, addrParams, new BeanPropertyRowMapper<>(AddrVo.class));


            // 設定 資料內容
            Context context = new Context();
            context.putVar("clientId", clientId);
            context.putVar("names", names);
            context.putVar("addr", addrVoList);

            dataMap.put(clientId, context);
        }

        return ExcelUtil.generateExcelList("sampleEach.xlsx", dataMap);
    }`} />
        </details>

        <hr />

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例：Grid 動態表格</summary>
          <Image
            width={600}
            src={ImgSampleGrid02}
          />
          <Title level={4}>樣版檔</Title>
          <Paragraph>
            於 <code>/resources/templates/</code> 新增 Excel檔案 <code>sampleGrid.xlsx</code> <br />
            並 根據下圖方式，設定樣版檔
          </Paragraph>
          <ul>
            <li>
              A1 儲存格：設定 掃瞄範圍
              <CodeText code={`jx:area(lastCell="A4")`} />
              <ul>
                <li><code>lastCell="A4"</code>：模板範圍 (A1 ~ A4)</li>
              </ul>
            </li>
            <li>
              A1 儲存格：Java 傳入 <code>title</code> 設定 報表標題。
            </li>
            <li>
              A2 儲存格：設定 動態表格
              <CodeText code={`jx:grid(lastCell="A3" headers="headers" 
data="dataList" areas=["A2:A2","A3:A3"])")`} />
            </li>
            <li>
              <code>jx:grid(...)</code>：動態表格 的語法
              <ul>
                <li><code>lastCell="A3"</code>：動態表格 的 模板範圍 (A2 ~ A3)</li>
                <li><code>headers="headers"</code>：Java 傳入 <code>headers</code> 設定 標題</li>
                <li><code>data="dataList"</code>：Java 傳入 <code>dataList</code> 設定 資料內容</li>
                <li>
                  <code>areas=["A2:A2","A3:A3"]</code>：模板區塊
                  <ul>
                    <li>參數 1 <code>"A2:A2"</code> 代表 標題 的位置，此位置要設定 <code>{`\${header}`}</code></li>
                    <li>參數 2 <code>"A3:A3"</code> 代表 內容 的位置，此位置要設定 <code>{`\${cell}`}</code></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <code>{`\${dataList.size()}`}</code>：透過 Jxls 的 函式 <code>.size()</code> 計算筆數， <br/>
              也可用 Excel 公式取代。
            </li>
          </ul>
          <Image
            width={800}
            src={ImgSampleGrid01}
          />

          <Title level={4}>Service</Title>
          <ul>
            <li>取得 來源資料 後，根據 樣版檔 的設定，將對應資料 寫入 <code>context</code> 中。</li>
            <li>
              需要設定 報表名稱、標題、資料內容，這三個部分。
              <ul>
                <li><code>標題</code>：對應 <code>樣本的 headers</code>，格式為 <code>{`List<String>`}</code>。</li>
                <li><code>資料內容</code>：對應 <code>樣本的 dataList</code>，格式為 <code>{`List<List<Object>>`}</code>。</li>
              </ul>
            </li>
            <li>最後透過 工具 產生 Excel。</li>
          </ul>
          <CodeJava code={`public byte[] excelGrid(List<ClientIdDto> clientIdDtoList) {
        // 設定 headers
        List<String> headers = Arrays.asList("姓名", "客戶證號", "性別");
        // 設定 數據
        List<List<Object>> dataList = new ArrayList<>();
        for (ClientIdDto clientIdDto : clientIdDtoList) {
            String clientId = clientIdDto.getClientId();
            // 基本資料
            String clntSql = "SELECT * FROM clnt " +
                    "WHERE client_id = :clientId ";

            Map<String, Object> clntParams = new HashMap<>();
            clntParams.put("clientId", clientId);

            List<ClntVo> clntVoList = namedParameterJdbcTemplate.query(clntSql, clntParams, new BeanPropertyRowMapper<>(ClntVo.class));
            if (!CollectionUtils.isEmpty(clntVoList)) {
                for (ClntVo clntVo : clntVoList) {
                    List<Object> data = new ArrayList<>();
                    data.add(clntVo.getNames());
                    data.add(clntVo.getClientId());
                    data.add(SexEnum.getDescByCode(clntVo.getSex()));
                    dataList.add(data);
                }
            }
        }

        // 設定 資料內容
        Context context = new Context();
        context.putVar("title", "Grid 測試表格");
        context.putVar("headers", headers);
        context.putVar("dataList", dataList);

        return ExcelUtil.generateExcel("sampleGrid.xlsx", context);
    }`} />
        </details>

      </Typography>
    </PageContainer>
  )
}

export default Excel