import { PageContainer } from '@ant-design/pro-components'
import { Divider, Typography } from 'antd'
import CodeJava from '@/utils/CodePre/CodeJava'

const { Title, Paragraph } = Typography

const SqlDemo: React.FC = () => {
  return (
    <PageContainer>
      <Typography>
        <Title level={2}>1. Criterion：條件設定</Title>
        <Paragraph type="danger">此為 csmo 客製化 工具</Paragraph>

        <Title level={3}>一個變數</Title>
        <pre>Criterion.single(欄位, 運算符號, 數值)</pre>
        <ul>
          <li>
            欄位：使用<code>小駝峰</code>。
          </li>
          <li>
            常用的運算符號
            <ul>
              <li>
                等於：<code>QueryOperator.EQUAL</code>
              </li>
              <li>
                不等於：<code>QueryOperator.NOT_EQUAL</code>
              </li>
              <li>
                小於：<code>QueryOperator.LESS_THAN</code>
              </li>
              <li>
                小於等於：<code>QueryOperator.LESS_THAN_OR_EQUAL</code>
              </li>
              <li>
                大於：<code>QueryOperator.GREATER_THAN</code>
              </li>
              <li>
                大於等於：<code>QueryOperator.GREATER_THAN_OR_EQUAL</code>
              </li>
              <li>
                以指定字串開頭：<code>QueryOperator.START_WITH</code>
              </li>
              <li>
                不以指定字串開頭：<code>QueryOperator.NOT_START_WITH</code>
              </li>
              <li>
                以指定字串結尾：<code>QueryOperator.END_WITH</code>
              </li>
              <li>
                不以指定字串結尾：<code>QueryOperator.NOT_END_WITH</code>
              </li>
              <li>
                包含指定字串：<code>QueryOperator.LIKE</code>
              </li>
              <li>
                不包含指定字串：<code>QueryOperator.NOT_LIKE</code>
              </li>
              <li>
                值為NULL：<code>QueryOperator.NULL</code>
              </li>
              <li>
                值不為NULL：<code>QueryOperator.NOT_NULL</code>
              </li>
            </ul>
          </li>
          <li>
            範例
            <CodeJava 
              code={`Criterion criterion =  Criterion.single("clientId", Criterion.QueryOperator.EQUAL, clientId)`} />
          </li>
        </ul>

        <Title level={3}>多個變數</Title>
        <ul>
          <li>{`Criterion.between(欄位, 前數值, 後數值)`}</li>
          <li>{`Criterion.in(欄位, LIST<Object> 數值)`}</li>
          <li>{`Criterion.notIn(欄位, LIST<Object> 數值)`}</li>
        </ul>
        <ul>
          <li>
            範例
            <CodeJava 
              code={`List<Object> policyNoList = poclList.stream()
                .map(PoclEntity::getPolicyNo).distinct().collect(Collectors.toList());
Criterion criterion =  Criterion.in("policyNo", policyNoList);`} />
          </li>
        </ul>

        <Title level={3}>多個條件</Title>
        <CodeJava 
          code={`Criterion.and(
    Criterion.single(欄位, 運算符號, 數值),
    Criterion.in(欄位, LIST<Object> 數值),
    ......
)`} />
        <ul>
          <li>
            範例
            <CodeJava 
              code={`Criterion criterion = Criterion.and(
    Criterion.single("clientId", Criterion.QueryOperator.EQUAL, addrKey.getClientId()),
    Criterion.single("addrInd", Criterion.QueryOperator.EQUAL, addrKey.getAddrInd())
);`} />
          </li>
        </ul>

        <Divider />

        <Title level={2}>2. 簡單的查詢</Title>
        <Paragraph type="danger">此為 csmo 客製化 工具</Paragraph>
        <Paragraph type="success">
          若 entity 的 主鍵欄位 數值有 null 時，不可使用此方法抓取資料。 (抓取的資料會顯示 null)
        </Paragraph>

        <Title level={3}>查詢 - 一筆資料</Title>
        <Paragraph>
          透過 <code>viewQueryService.findOneSpec</code> 進行查詢，回傳型態為
          <code>{`Optional<?>`}</code>。
        </Paragraph>
        <CodeJava 
          code={`Optional<?> 變數 = viewQueryService.findOneSpec(Entity.class, Criterion條件);`} />

        <ul>
          <li>
            範例
            <CodeJava 
              code={`@Autowired
private ViewQueryService viewQueryService;

public ClntEntity queryClntByClientId(String clientId) {
    // 透過 Criterion 設定 查詢的 where
    Criterion criterion =  Criterion.single("clientId", Criterion.QueryOperator.EQUAL, clientId);
    // 查詢資料 僅 一筆，透過 viewQueryService.findOneSpec 進行查詢
    Optional<?> clntOptional = viewQueryService.findOneSpec(ClntEntity.class, criterion);
    // 查詢完畢 需要 針對 無資料 進行處理
    if(clntOptional.isEmpty()){
        return null;
    }
    ClntEntity clntEntity = (ClntEntity)clntOptional.get();
    return clntEntity ;
}`} />
          </li>
        </ul>

        <Title level={3}>查詢 - 多筆資料</Title>
        <Paragraph>
          透過 <code>viewQueryService.findOneSpec</code> 進行查詢，回傳型態為
          <code>{`List<Entity>`}</code>。
        </Paragraph>
        <pre>{`List<Entity> 變數 = viewQueryService.findOneSpec(Entity.class, Criterion條件);`}</pre>
        <ul>
          <li>
            範例
            <CodeJava 
              code={`@Autowired
private ViewQueryService viewQueryService;

public List<AddrEntity> queryAddrByClientId(String clientId) {
    // 透過 Criterion 設定 查詢的 where
    Criterion criterion = Criterion.and(
            Criterion.single("clientId", Criterion.QueryOperator.EQUAL, clientId)
            // 有 多個 查詢條件 繼續往下設定
    );
    // 查詢資料 有 多筆，透過 viewQueryService.querySpec 進行查詢
    List<AddrEntity> addrList = viewQueryService.querySpec(AddrEntity.class, criterion);
    // 查詢完畢 需要 針對 無資料 進行處理
    if (addrList.isEmpty()) {
        return null;
    }
    return viewQueryService.querySpec(AddrEntity.class, criterion);
}`} />
          </li>
        </ul>

        <Divider />

        <Title level={2}>3. 複雜的查詢 - QueryHandler</Title>
        <Paragraph type="danger">此為 csmo 客製化 工具</Paragraph>
        <Paragraph>
          此方式 是透過 <code>nativeQuery</code> 的方式，來執行 <code>複雜的SQL</code> 查詢。
        </Paragraph>
        <ul>
          <li>
            程式放置於 <code>handler.query</code> 裡面。
          </li>
          <li>
            class 上方要有
            <ul>
              <li>@QueryHandler</li>
              <li>@MethodOverloadForbidden</li>
            </ul>
          </li>
          <li>
            透過 <code>viewQueryService.executeByServiceMethod()</code> 執行。
          </li>
          <li>
            <code>@QueryMethod</code>：查詢內容設定
            <ul>
              <li>
                <code>name</code>：對應 方法名稱
              </li>
              <li>
                <code>nativeQuery = true</code>：代表使用 nativeQuery 的原生SQL 查詢
              </li>
              <li>
                <code>resultRecordType</code>：回傳保存的 DTO/VO class
              </li>
              <li>
                <code>value</code>: 你的 SQL 語句
                <ul>
                  <li>
                    若 SQL 語句有 WHERE，則 必須設定 <code>hasSqlWhere = true</code>
                  </li>
                </ul>
              </li>
              <li>
                <code>hasSqlWhere</code>: SQL 語句 是否 <code>包含 WHERE</code>
                <ul>
                  <li>
                    <code>hasSqlWhere = false</code>：不包含(預設值)，此選項 會將{' '}
                    <code>Criterion</code> 的條件 前面加上 <code>WHERE</code>
                  </li>
                  <li>
                    <code>hasSqlWhere = true</code>：包含，此選項 <code>Criterion</code> 的條件 不會
                    加上 <code>WHERE</code>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <code>@QueryFilter</code>：條件設定
            <ul>
              <li>
                <code>name</code>：Criterion 裡面的欄位名稱
              </li>
              <li>
                <code>expr</code>：SQL語句中，<code>where</code> 的欄位名稱
              </li>
            </ul>
          </li>
          <li>
            範例
            <CodeJava 
              code={`@QueryHandler
@MethodOverloadForbidden
public class CmntQueryHandler {
    @Autowired
    @Lazy //避免循環引用
    private ViewQueryService viewQueryService;

    /**
     * 取得 批註主要資料
     * @param criterion
     * @return List<QueryCmntMainDTO>
     */
    @QueryMethod(name = "queryCmntMain", nativeQuery = true, resultRecordType = QueryCmntMainDTO.class, hasSqlWhere = false,
            value = "SELECT trim(a.policy_no) AS policyNo " +
                    "      ,trim(a.process_date) AS processDate " +
                    "      ,trim(a.process_time) AS procesTime " +
                    "      ,trim(cancel_date) AS cancelDate " +
                    "      ,trim(a.function_code) AS functionCode " +
                    "      ,trim(desc) AS functionDesc " +
                    "      ,a.coverage_no AS coverageNo " +
                    "      ,trim(plan_code) AS planCode " +
                    "      ,trim(rate_scale) AS rateScale " +
                    "      ,trim(a.comments[109,110]) AS cmntYear " +
                    "      ,trim(a.comments[1,100]) AS comments1 " +
                    "FROM cmnt a " +
                    "JOIN etab b " +
                    "ON b.e_type = a.function_code " +
                    "AND b.code = 'CT' " +
                    "LEFT OUTER JOIN pscm c " +
                    "ON a.client_id = c.client_id " +
                    "AND a.policy_no = c.policy_no " +
                    "AND a.process_date = c.process_date "  +
                    "AND a.function_code[1] IN ('N','P') " +
                    "AND a.function_code = c.cmnt_class ")
    @QueryFilter(name = "clientId", expr = "a.client_id")
    public List<QueryCmntMainDTO> queryCmntMain(Criterion criterion) {
        return viewQueryService.executeByServiceMethod(criterion);
    }
}`} />
          </li>
        </ul>

        <Divider />

        <Title level={2}>4. 複雜的查詢 - NamedParameterJdbcTemplate</Title>
        <Paragraph type="success">
          此方式 是透過 Jpa 的 NamedParameterJdbcTemplate 方法 進行查詢
        </Paragraph>

        <ol>
          <li>
            注入 <code>NamedParameterJdbcTemplate</code>
            <CodeJava 
              code={`@Autowired
private NamedParameterJdbcTemplate namedParameterJdbcTemplate;`} />
          </li>
          <li>
            撰寫 SQL 語法
            <ul>
              <li>
                變數 前面要使用 <code>:</code> 標示，如: <code>:address</code>
              </li>
              <CodeJava 
                code={`String sql1 = "SELECT * FROM addr " +
              "WHERE address LIKE :address";
String sql2 = "UPDATE addr " +
              "SET client_id = :clientIdNew " +
              "   ,addr_ind = :addrIndNew " +
              "   ,address = :addressNew " +
              "   ,tel = :telNew " +
              "WHERE client_id = :clientIdOri " +
              "  AND addr_ind = :addrIndOri " +
              "  AND address = :addressOri " +
              "  AND tel = :telOri ";`} />
              <li>
                若 變數為集合，要使用 <code>( )</code> 包起來
              </li>
            </ul>
            <CodeJava 
              code={`String sql = "SELECT * FROM gico " +
           "WHERE client_id IN (:clientIdList)";`} />
          </li>
          <li>
            透過 Map 設定參數
            <CodeJava 
              code={`Map<String, Object> params1 = new HashMap<>();
params1.put("address", "%" + address + "%");`} />
            <CodeJava 
              code={`Map<String, Object> params2 = new HashMap<>();
params2.put("clientIdNew", entityNew.getClientId());
params2.put("addrIndNew", entityNew.getAddrInd());
params2.put("addressNew", entityNew.getAddress());
params2.put("telNew", entityNew.getTel());
params2.put("clientIdOri", entityOri.getClientId());
params2.put("addrIndOri", entityOri.getAddrInd());
params2.put("addressOri", entityOri.getAddress());
params2.put("telOri", entityOri.getTel());`} />
          </li>
          <li>
            執行 SQL
            <ul>
              <li>
                <code>單筆查詢</code> 透過 <code>namedParameterJdbcTemplate.queryForObject</code>{' '}
                執行。
                <CodeJava 
                  code={`Long count = namedParameterJdbcTemplate.queryForObject(countSql + whereSql, params, Long.class);`} />
              </li>
              <li>
                <code>多筆查詢</code> 透過 <code>`namedParameterJdbcTemplate.query</code> 執行。
                <CodeJava 
                  code={`List<Addr> addrList = namedParameterJdbcTemplate.query(sql1, params1, new BeanPropertyRowMapper<>(Addr.class));`} />
              </li>
              <li>
                <code>增刪修</code> 透過 <code>namedParameterJdbcTemplate.update</code> 執行。
                <CodeJava 
                  code={`namedParameterJdbcTemplate.update(sql2, params2);`} />
              </li>
            </ul>
          </li>
        </ol>

        <Divider />

        <Title level={2}>5. 新增</Title>
        <Paragraph type="danger">此為 csmo 客製化 工具</Paragraph>
        <Paragraph>
          先想辦法 取得 要新增的 entity 資料， <br />
          再透過 <code>entityWriteService.applyCommand()</code> 和 <code>SystemCommands.createCommand()</code> 執行。 <br />
          因 新增 可能失敗，所以需要有 <code>try-catch</code>。
        </Paragraph>
        <CodeJava 
          code={`@Autowired
private EntityWriteService entityWriteService;

public void insertAddr(AddrEntity addrEntity) {
    try {
        entityWriteService.applyCommand(SystemCommands.createCommand("AddrEntity", addrEntity));
    } catch (Exception e) {
        throw new RuntimeException(e);
    }
}`} />

        <Divider />

        <Title level={2}>6. 修改</Title>
        <Paragraph type="danger">此為 csmo 客製化 工具</Paragraph>
        <Paragraph>
          先想辦法 取得 要新增的 entity 資料， <br />
          再透過 <code>entityWriteService.applyCommand()</code> 和 <code>SystemCommands.updateCommand()</code> 執行。 <br />
          執行 修改 時，會根據 entity 設定的 唯一值 修改對應的資料。 <br />
          因 修改 可能失敗，所以需要有 <code>try-catch</code>。
        </Paragraph>
        <CodeJava 
          code={`@Autowired
private EntityWriteService entityWriteService;

public void updateAddr(AddrEntity addrEntityNew) {
    try {
        entityWriteService.applyCommand(SystemCommands.updateCommand("AddrEntity", addrEntityNew));
    } catch (Exception e) {
        throw new RuntimeException(e);
    }
}`} />

        <Divider />

        <Title level={2}>7. 刪除</Title>
        <Paragraph type="danger">此為 csmo 客製化 工具</Paragraph>
        <Paragraph>
          先想辦法 取得 要新增的 entity 資料， <br />
          再透過 <code>entityWriteService.applyCommand()</code> 和 <code>SystemCommands.deleteCommand()</code> 執行。 <br />
          執行 刪除 時，會根據 entity 設定的 唯一值 刪除對應的資料。 <br />
          因 刪除 可能失敗，所以需要有 <code>try-catch</code>。
        </Paragraph>
        <CodeJava 
          code={`@Autowired
private EntityWriteService entityWriteService;

public void deleteAddr(AddrKey addrKey) {
    // 根據 AddrKey 取得 要刪除的 Addr 資料
    Criterion criterion = Criterion.and(
            Criterion.single("clientId", Criterion.QueryOperator.EQUAL, addrKey.getClientId()),
            Criterion.single("addrInd", Criterion.QueryOperator.EQUAL, addrKey.getAddrInd())
    );
    List<AddrEntity> addrList = viewQueryService.querySpec(AddrEntity.class, criterion);
    // 有資料，進行刪除作業
    if (!addrList.isEmpty()) {
        AddrEntity addrEntity = addrList.get(0);
        try {
            entityWriteService.applyCommand(SystemCommands.deleteCommand("AddrEntity", addrEntity));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}`} />
      </Typography>
    </PageContainer>
  )
}

export default SqlDemo
