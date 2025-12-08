import { PageContainer } from "@ant-design/pro-components"
import CodeJava from '@/utils/CodeJava'
import { Typography } from "antd"
const { Title, Paragraph } = Typography

const PageAPI = () => {
  return (
    <PageContainer>
      <Typography>
        <Paragraph>
          當 查詢 API 回傳的資料 <code>數量龐大</code> 時，需透過 <code>Page</code> 進行 <code>分頁回傳</code>，避免 <code>後端機器無法負荷</code>。
        </Paragraph>

        <Paragraph type="success">
          <strong>統一回傳類型：</strong><code>ResponseEntity&lt;Page&lt;XXXVo&gt;&gt;</code>，前端 <code>ProTable</code> 會自動進行 分頁資料顯示。
        </Paragraph>

        <Paragraph type='danger'>
          因 Page 的 回傳值格式 略有不同，前端使用時 需注意 <code>後端實際的回傳格式</code>。
        </Paragraph>

        <hr />

        <Title level={3}>1. 建立 分頁結構</Title>
        <Paragraph>
          <code>Page API</code> 的 <code>輸入DTO</code>，必須要有 <code>當前頁數</code> 和 <code>每頁大小</code> 這兩個資料。 <br />
          因此 可以定義 <code>PageRequestDto</code> 來讓相關 <code>輸入DTO</code> 可以 繼承使用。
        </Paragraph>

        <Title level={5}>PageRequestDto</Title>
        <CodeJava code={`@Schema(description = "分頁設定")
public class PageRequestDto {
    @Schema(description = "當前頁數", example = "1")
    private Integer pageCurrent = 1;

    @Schema(description = "每頁大小", example = "10")
    private Integer pageSize = 10;

    // getter & setter
    public Integer getPageCurrent() { return pageCurrent; }
    public void setPageCurrent(Integer pageCurrent) { this.pageCurrent = pageCurrent; }
    public Integer getPageSize() { return pageSize; }
    public void setPageSize(Integer pageSize) { this.pageSize = pageSize; }
}`} />

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>使用範例</summary>
          <CodeJava code={`@Schema(description = "客戶證號 (分頁查詢)")
public class SexPageDto extends PageRequestDto {
    @Schema(description = "性別", example = "M")
    private String sex;

    public String getSex() { return sex; }
    public void setSex(String sex) { this.sex = sex; }
}`} />
        </details>

        <hr />

        <Title level={3}>2. 分頁工具類 - PageUtil</Title>
        <Paragraph>
          <code>Page&lt;XXXVo&gt;</code> 的 <code>return</code>，格式必須為
        </Paragraph>
        <CodeJava code={`return new PageImpl<>(分頁資料, PageRequest.of(當前頁數, 每頁大小), 總筆數);`} />
        <Paragraph>
          為了避免 <code>每次手動 new</code>，需要同時處理 <code>資料拆分</code> 和 <code>總筆數計算</code>，建立 工具方法 來統一處理。
        </Paragraph>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>PageUtil</summary>
          <CodeJava code={`/**
 * 分頁查詢 資料整理工具
 */
public class PageUtil {
    public PageUtil() {
    }

    public static <T> Page<T> of(List<T> list, Pageable pageable) {
        if (CollectionUtils.isEmpty(list)) {
            return new PageImpl(Collections.emptyList(), pageable, 0L);
        } else {
            Class<T> clazz = list.get(0).getClass();
            Stream<T> stream = list.stream();
            if (!IterableUtils.isEmpty(pageable.getSort())) {
                stream = stream.sorted(getComparator(pageable.getSort(), clazz));
            }

            List<T> slice = (List)stream.skip((long)pageable.getPageNumber() * (long)pageable.getPageSize()).limit((long)pageable.getPageSize()).collect(Collectors.toList());
            return new PageImpl(slice, pageable, (long)list.size());
        }
    }
}`} />
        </details>

        <hr />

        <Title level={3}>3. Service</Title>
        <ul>
          <li>
            輸出格式為 <code>Page&lt;XXXVo&gt;</code>
          </li>
          <li>
            <code>return</code>，格式必須為 要使用 <code>PageUtil.of()</code>
          </li>
        </ul>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <CodeJava code={`@Service
public class PageService {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public Page<ClntVo> queryClntBySex(SexPageDto dto) {
        // 轉換頁數（前端 1 → Java 0）
        int page = dto.getPageCurrent() != null && dto.getPageCurrent() > 0
                   ? dto.getPageCurrent() - 1 : 0;
        int size = dto.getPageSize() != null && dto.getPageSize() > 0
                   ? dto.getPageSize() : 10;

        String sql = "SELECT * FROM clnt WHERE sex = :sex";
        Map<String, Object> params = new HashMap<>();
        params.put("sex", dto.getSex());

        List<ClntVo> list = namedParameterJdbcTemplate.query(
            sql, params, new BeanPropertyRowMapper<>(ClntVo.class));

        // 使用 PageUtil 封裝
        return PageUtil.of(rtnList, PageRequest.of(dto.getPageCurrent(), dto.getPageSize()) ;
    }
}`} />
        </details>

        <hr />

        <Title level={3}>4. Controller</Title>
        <Paragraph>
          輸出格式為 <code>ResponseEntity&lt;Page&lt;XXXVo&gt;&gt;</code>，其餘與 一般Controller 並無不同。
        </Paragraph>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <CodeJava code={`@RestController
@RequestMapping("/page")
@Tag(name = "Page Controller", description = "分頁查詢 API 接口")
public class PageController {

    @Autowired
    private PageService pageService;

    @Operation(summary = "根據 性別 查詢 客戶資料 (分頁查詢)")
    @PostMapping("/queryClntBySex")
    public ResponseEntity<Page<ClntVo>> queryClntBySex(@RequestBody SexPageDto sexPageDto) {
        Page<ClntVo> page = pageService.queryClntBySex(sexPageDto);
        return ResponseEntity.ok(page);
    }
}`} />
        </details>

      </Typography>
    </PageContainer >
  )
}

export default PageAPI
