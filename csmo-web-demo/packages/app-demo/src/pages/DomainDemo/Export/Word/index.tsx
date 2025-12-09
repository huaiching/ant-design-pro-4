import CodeJava from "@/utils/CodePre/CodeJava"
import CodeXML from "@/utils/CodePre/CodeXML"
import { PageContainer } from "@ant-design/pro-components"
import { Table, Typography, Image } from "antd"
import ImgSample01 from './Image/sample_01.png'
import ImgSample02 from './Image/sample_02.png'
import ImgSample03 from './Image/sample_03.png'
import ImgSampleList01 from './Image/sampleList_01.png'
import ImgSampleList02 from './Image/sampleList_02.png'
import ImgSampleList03 from './Image/sampleList_03.png'

const { Title, Paragraph } = Typography

const Word: React.FC = () => {
  return (
    <PageContainer title={false}>
      <Typography>
        <Paragraph>
          <code>Word 生成</code> 是透過 apache.poi 和 poi-tl 這些套件 生成 <br />
          運作原理為 <code>Java 設定變數</code> 後， 將變數 <code>套印</code> 至 <code>Word 樣版檔</code>。 <br />
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
    <groupId>com.deepoove</groupId>
    <artifactId>poi-tl</artifactId>
    <version>1.12.1</version>
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
          │　　├─ 📄 WordUtil.java　　# Word 的檔案生成工具  <br />
          <br />
          resources  <br />
          ├─ 📁 templates  <br />
          │　　├─ 📄 樣板檔.docx
        </Paragraph>

        <hr />

        <Title level={3}>2. 運作方式</Title>
        <ol>
          <li>
            設定 樣版檔
            <ul>
              <li>
                樣板變數 <code>{`{{ }}`}</code>。 <br />
                <Image
                  width={400}
                  src={ImgSample01}
                />
              </li>
              <li>
                清單數據時，使用 <code>{`[ ]`}</code> 來設定 欄位。 <br />
                <Image
                  width={400}
                  src={ImgSampleList01}
                />
              </li>
            </ul>
          </li>
          <li>
            設定 Java 資料內容
            <ul>
              <li>
                宣告 <code>{`Map<String, Object> context = new HashMap<>();`}</code>
              </li>
              <li>
                使用 <code>{`context.put("變數名稱", 數值);`}</code> 設定資料內容
                <ul>
                  <li><code>key</code>：樣版檔 變數名稱</li>
                  <li><code>value</code>：顯示的數值</li>
                </ul>
              </li>
            </ul>
            <CodeJava code={`Map<String, Object> context = new HashMap<>();
context.put("clientId", userId);
context.put("names", userName);
context.put("addr", addrList);`} />
          </li>
          <li>
            將 樣板檔位置 及 資料內容 傳入 <code>工具程式</code>，產出 Word 檔案。
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
            { name: '產生 Word 檔案 (單筆資料)', method: 'generateWord(String modelFile, Map<String, Object> context)' },
            { name: '產生 Word 檔案 (相同樣板 + 多筆資料)', method: 'generateWordList(String modelFile, Configure configure, Map<String, Object> context)' },
            { name: '產生 Word 檔案 (合併列印)', method: 'generateWordMerge(String modelFile, List<Map<String, Object>> contextList)' },
            { name: 'Word 多檔合併', method: 'mergeWord(List<byte[]> wordFileList)' },
          ]}
          pagination={false}
        />
        <CodeJava code={`
import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.config.Configure;
import com.deepoove.poi.xwpf.NiceXWPFDocument;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.xwpf.usermodel.BreakType;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.CollectionUtils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * Word 匯出工具
 */
public class WordUtil {
    /**
     * 產生 Word 檔案 (單筆資料)
     *
     * @param modelFile 樣版路徑 (resources/templates/{modelFile})
     * @param context   資料內容（Map 對應樣版中 {{key}} 欄位）
     * @return 產出的 Word 檔案資料流（byte[]）
     */
    public static byte[] generateWord(String modelFile, Map<String, Object> context) {
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
                InputStream inputStream = new ClassPathResource(model).getInputStream();
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream()
        ) {
            // 載入樣版並填入資料
            XWPFTemplate template = XWPFTemplate.compile(inputStream).render(context);

            // 將結果寫入 outputStream 並關閉資源
            template.writeAndClose(outputStream);

            return outputStream.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Word 產生失敗，樣版路徑：" + modelFile, e);
        }
    }

    /**
     * 產生 Word 檔案 (相同樣板 + 多筆資料)
     *
     * @param modelFile 樣版路徑 (resources/templates/{modelFile})
     * @param configure 列表渲染設定
     * @param context 資料內容（Map 對應樣版中 {{key}} 欄位）
     * @return 產出的 Word 檔案資料流（byte[]）
     */
    public static byte[] generateWordList(String modelFile, Configure configure, Map<String, Object> context) {
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
                InputStream inputStream = new ClassPathResource(model).getInputStream();
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream()
        ) {
            // 載入樣版並填入資料
            XWPFTemplate template = XWPFTemplate.compile(inputStream, configure).render(context);

            // 將結果寫入 outputStream 並關閉資源
            template.writeAndClose(outputStream);

            return outputStream.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Word 產生失敗，樣版路徑：" + modelFile, e);
        }
    }

    /**
     * 產生 Word 檔案 (合併列印)
     *
     * @param modelFile 樣版路徑 (resources/templates/{modelFile})
     * @param contextList   資料內容 清單（Map 對應樣版中 {{key}} 欄位）
     * @return 產出的 Word 檔案資料流（byte[]）
     */
    public static byte[] generateWordMerge(String modelFile, List<Map<String, Object>> contextList) {
        // 參數驗證
        if (StringUtils.isEmpty(modelFile)) {
            throw new RuntimeException("樣版路徑 不可空白!!");
        }
        if (CollectionUtils.isEmpty(contextList)) {
            throw new RuntimeException("資料內容 不可空白!!");
        }

        // 產生檔案
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            // 使用第一個文件作為基礎
            var firstWord = generateWord(modelFile, contextList.get(0));
            NiceXWPFDocument mainWord = new NiceXWPFDocument(new ByteArrayInputStream(firstWord));

            try {
                // 合併後續文件
                for (int i = 1; i < contextList.size(); i++) {
                    // 在合併前先加入分頁符
                    XWPFParagraph paragraph = mainWord.createParagraph();
                    XWPFRun run = paragraph.createRun();
                    run.addBreak(BreakType.PAGE);
                    // 產出 並 合併 後續文件
                    var tmpWord = generateWord(modelFile, contextList.get(i));
                    NiceXWPFDocument subWord = new NiceXWPFDocument(new ByteArrayInputStream(tmpWord));
                    mainWord = mainWord.merge(subWord);
                    subWord.close();
                }

                mainWord.write(outputStream);
                return outputStream.toByteArray();

            } catch (Exception e) {
                throw new RuntimeException("Word 合併失敗：", e);
            } finally {
                mainWord.close();
            }
        } catch (IOException e) {
            throw new RuntimeException("Word 產生失敗，樣版路徑：" + modelFile, e);
        }
    }

    /**
     * Word 多檔合併
     *
     * @param wordFileList 要合併的 Word 資料流 清單
     * @return 產出的 Word 檔案資料流（byte[]）
     */
    public static byte[] mergeWord(List<byte[]> wordFileList) {
        // 產生檔案
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            // 使用第一個文件作為基礎
            NiceXWPFDocument mainWord = new NiceXWPFDocument(new ByteArrayInputStream(wordFileList.get(0)));

            try {
                // 合併後續文件
                for (int i = 1; i < wordFileList.size(); i++) {
                    // 在合併前先加入分頁符
                    XWPFParagraph paragraph = mainWord.createParagraph();
                    XWPFRun run = paragraph.createRun();
                    run.addBreak(BreakType.PAGE);
                    // 合併後續文件
                    NiceXWPFDocument subWord = new NiceXWPFDocument(new ByteArrayInputStream(wordFileList.get(i)));
                    mainWord = mainWord.merge(subWord);
                    subWord.close();
                }

                mainWord.write(outputStream);
                return outputStream.toByteArray();

            } catch (Exception e) {
                throw new RuntimeException("Word 合併失敗：", e);
            } finally {
                mainWord.close();
            }
        } catch (IOException e) {
            throw new RuntimeException("Word 產生失敗", e);
        }

    }
}`} />
        <hr />

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例：簡單樣板 + 單筆資料</summary>
          <Image
            width={400}
            src={ImgSample02}
          />
          <Title level={4}>樣版檔</Title>
          <Paragraph>
            於 <code>/resources/templates/</code> 新增 Word檔案 <code>sample.docx</code> <br />
            並 根據下圖方式，設定樣版檔
          </Paragraph>
          <ul>
            <li><code>{`{{names}}`}</code>：Java 傳入 `names` 設定 姓名。</li>
            <li><code>{`{{clientId}}`}</code>：Java 傳入 `clientId` 設定 身分證字號。</li>
            <li><code>{`{{sex}}`}</code>：Java 傳入 `sex` 設定 性別。</li>
          </ul>
          <Image
            width={400}
            src={ImgSample01}
          />

          <Title level={4}>Service</Title>
          <ul>
            <li>取得 來源資料 後，根據 樣版檔 的設定，將對應資料 寫入 <code>context</code> 中。</li>
            <li>最後透過 工具 產生 Word。</li>
          </ul>
          <CodeJava code={`public byte[] generateWord(String clientId) {
    String clntSql = "SELECT * FROM clnt " +
            "WHERE client_id = :clientId ";
    Map<String, Object> clntParams = new HashMap<>();
    clntParams.put("clientId", clientId);
    List<ClntVo> clntVoList = namedParameterJdbcTemplate.query(clntSql, clntParams, new BeanPropertyRowMapper<>(ClntVo.class));
    if (CollectionUtils.isEmpty(clntVoList)) {
        throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, "資料不存在");
    }
    ClntVo clntVo = clntVoList.get(0);
    Map<String, Object> context = new HashMap<>();
    context.put("names", clntVo.getNames());
    context.put("clientId", clntVo.getClientId());
    context.put("sex", SexEnum.getDescByCode(clntVo.getSex()));
    return WordUtil.generateWord("sample.docx", context);
}`} />
        </details>

        <hr />

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例：簡單樣板 + 多筆資料</summary>
          <Image
            width={400}
            src={ImgSample03}
          />
          <Title level={4}>樣版檔</Title>
          <Paragraph>
            於 <code>/resources/templates/</code> 新增 Word檔案 <code>sample.docx</code> <br />
            並 根據下圖方式，設定樣版檔
          </Paragraph>
          <ul>
            <li><code>{`{{names}}`}</code>：Java 傳入 `names` 設定 姓名。</li>
            <li><code>{`{{clientId}}`}</code>：Java 傳入 `clientId` 設定 身分證字號。</li>
            <li><code>{`{{sex}}`}</code>：Java 傳入 `sex` 設定 性別。</li>
          </ul>
          <Image
            width={400}
            src={ImgSample01}
          />

          <Title level={4}>Service</Title>
          <ul>
            <li>取得 來源資料 後，根據 樣版檔 的設定，將對應資料 寫入 <code>context</code> 中。</li>
            <li>因為是 多筆資料，所以 要整理成 <code>{`List<Map<String, Object>>`}</code>。</li>
            <li>最後透過 工具 產生 Word。</li>
          </ul>
          <CodeJava code={`public byte[] generateWordMerge(List<ClientIdDto> clientIdDtoList) {
    List<Map<String, Object>> contextList = new ArrayList<>();
    for (ClientIdDto clientIdDto : clientIdDtoList) {
        String clientId = clientIdDto.getClientId();
        // 基本資料
        String clntSql = "SELECT * FROM clnt " +
                "WHERE client_id = :clientId ";
        Map<String, Object> clntParams = new HashMap<>();
        clntParams.put("clientId", clientId);
        List<ClntVo> clntVoList = namedParameterJdbcTemplate.query(clntSql, clntParams, new BeanPropertyRowMapper<>(ClntVo.class));
        if (CollectionUtils.isEmpty(clntVoList)) {
            throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, "資料不存在");
        }
        ClntVo clntVo = clntVoList.get(0);
        Map<String, Object> context = new HashMap<>();
        context.put("names", clntVo.getNames());
        context.put("clientId", clntVo.getNames());
        context.put("sex", SexEnum.getDescByCode(clntVo.getSex()));
        contextList.add(context);
    }
    return WordUtil.generateWordMerge("sample.docx", contextList);
}`} />

        </details>

        <hr />

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例：陣列樣板</summary>
          <Image
            width={400}
            src={ImgSampleList02}
          />
          <Title level={4}>樣版檔</Title>
          <Paragraph>
            於 <code>/resources/templates/</code> 新增 Word檔案 <code>sampleList.docx</code> <br />
            並 根據下圖方式，設定樣版檔
          </Paragraph>
          <ul>
            <li>
              <code>{`{{clientId}}`}</code>：Java 傳入 `clientId` 設定 身分證字號。
            </li>
            <li>
              <code>{`{{names}}`}</code>：Java 傳入 `names` 設定 姓名。
            </li>
            <li>
              陣列資料 設定
              <ul>
                <li>於 表格 的 `第一格` 設定 清單的變數 <code>{`{{addr}}`}</code>。</li>
                <li>表格的內容，使用 <code>{`[ ]`}</code> 設定 資料對應的欄位。</li>
              </ul>
            </li>
          </ul>
          <Image
            width={400}
            src={ImgSampleList01}
          />

          <Title level={4}>Service</Title>
          <ul>
            <li>
              針對 陣列類型 的資料，要設定渲染規則，讓 poi-tl 能夠知道 這個變數要使用 列表渲染。 <br/>
              有多筆的話，就設定 多個  <code>{`.bind()`}</code>。
              <CodeJava code={`Configure configure = Configure.builder().bind("addr", new LoopRowTableRenderPolicy()).build();`} />
            </li>
            <li>
              取得 來源資料 後，根據 樣版檔 的設定，將對應資料 寫入 <code>context</code> 中。
            </li>
            <li>
              最後透過 工具 產生 Word。
            </li>
          </ul>
          <CodeJava code={`public byte[] generateWordList(String clientId) {
    // 基本資料
    String clntSql = "SELECT * FROM clnt " +
            "WHERE client_id = :clientId ";
    Map<String, Object> clntParams = new HashMap<>();
    clntParams.put("clientId", clientId);
    List<ClntVo> clntVoList = namedParameterJdbcTemplate.query(clntSql, clntParams, new BeanPropertyRowMapper<>(ClntVo.class));
    if (CollectionUtils.isEmpty(clntVoList)) {
        throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, "clnt 資料不存在");
    }
    ClntVo clntVo = clntVoList.get(0);
    // 地址資料
    String addrSql = "SELECT * FROM addr " +
            "WHERE client_id = :clientId ";
    Map<String, Object> addrParams = new HashMap<>();
    addrParams.put("clientId", clientId);
    List<AddrVo> addrVoList = namedParameterJdbcTemplate.query(addrSql, addrParams, new BeanPropertyRowMapper<>(AddrVo.class));
    List<Map<String, Object>> addrList = new ArrayList<>();
    for (AddrVo addrVo : addrVoList) {
        Map<String, Object> addr = new HashMap<>();
        addr.put("addrInd", addrVo.getAddrInd());
        addr.put("address", addrVo.getAddress());
        addr.put("tel", addrVo.getTel());
        addrList.add(addr);
    }
    // 設定 列表規則
    Configure configure = Configure.builder().bind("addr", new LoopRowTableRenderPolicy()).build();
    // 設定 資料內容
    Map<String, Object> context = new HashMap<>();
    context.put("clientId", clntVo.getClientId());
    context.put("names", clntVo.getNames());
    context.put("addr", addrList);
    return WordUtil.generateWordList("sampleList.docx", configure, context);
}`} />

        </details>

      </Typography>
    </PageContainer>
  )
}

export default Word