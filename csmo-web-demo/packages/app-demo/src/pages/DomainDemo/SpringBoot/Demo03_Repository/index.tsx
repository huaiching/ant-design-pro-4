import { PageContainer } from "@ant-design/pro-components"
import CodeJava from '@/utils/CodeJava'
import { Table, Typography } from "antd"

const { Title, Paragraph } = Typography

const Repository = () => {
  return (
    <PageContainer>
      <Typography>
        <Paragraph type="danger">此為 原生專案 才需要的部分，<code>CSMO 專案</code> 會另外封裝，請忽略。</Paragraph>

        <Paragraph>
          Repository 是 Spring Data JPA 提供的一個介面，用於定義資料存取操作的方法。<br />
          通常會為每個 Entity 建立一個對應的 Repository interface，並繼承自 Spring Data JPA 提供的 JpaRepository。
        </Paragraph>

        <hr />

        <Title level={3}>1. 資料夾結構</Title>
        <Paragraph>
          java  <br />
          ├─ 📁repository <br />
          │　　　├─ 📄repository 類別檔
        </Paragraph>

        <hr />

        <Title level={3}>2. 基本結構</Title>
        <Title level={5}>Repository interface 需要有以下註解：</Title>
        <ul>
          <li><code>@Repository</code>：標註此介面為 Spring Data JPA 的 Repository。</li>
          <li><code>extends JpaRepository&lt;EntityClass, PrimaryKeyType&gt;</code>：繼承 JpaRepository，並指定 Entity 類別和主鍵類型。</li>
        </ul>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <Paragraph>
            單一主鍵 Entity：
          </Paragraph>

          <CodeJava code={`@Repository
public interface ClntRepository extends JpaRepository<ClntEntity, String> {
}`} />
          <Paragraph>
            複合主鍵 Entity：
          </Paragraph>

          <CodeJava code={`@Repository
public interface AddrRepository extends JpaRepository<AddrEntity, AddrKey> {
}`} />
        </details>
        <hr />

        <Title level={3}>3. 簡單 SQL 的處理</Title>
        <Paragraph>
          對於 <code>簡單 SQL</code> 我們會透過下面三種方法取得 <code>entity</code> 的 <code>CRUD</code> 方法。
        </Paragraph>

        <Title level={4}>3.1 繼承 JpaRepository 獲得針對主鍵的 CRUD</Title>
        <Paragraph>
          會有兩個參數要定義，分別是 <code>entity</code> 和 <code>主鍵型態</code>。
        </Paragraph>
        <ul>
          <li><code>單一主鍵</code>：主鍵的屬性型態。</li>
          <li><code>多重主鍵</code>：<code>@IdClass</code> 設定的 <code>主鍵類別</code>。</li>
        </ul>

        <Paragraph>
          透過 <code>JpaRepository</code> 自動生成的 <code>CRUD</code> 方法，常用的有：
        </Paragraph>

        <Title level={5}>save</Title>
        <ul>
          <li>根據 <code>主鍵</code> 進行 <code>新增</code> 或 <code>更新</code> 資料。(單筆)</li>
          <li>(無資料 = 新增 / 有資料 = 更新)</li>
        </ul>
        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <CodeJava code={`Clnt savedEntity = clntRepository.save(entity);
Addr savedEntity = addrRepository.save(entity);`} />
        </details>

        <Title level={5}>saveAll</Title>
        <ul>
          <li>根據 <code>主鍵</code> 進行 <code>新增</code> 或 <code>更新</code> 資料。(多筆)</li>
          <li>(無資料 = 新增 / 有資料 = 更新)</li>
        </ul>
        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <CodeJava code={`List<Clnt> savedEntityList = clntRepository.saveAll(entityList);
List<Addr> savedEntityList = addrRepository.saveAll(entityList);`} />
        </details>

        <Title level={5}>findById</Title>
        <ul>
          <li>根據 <code>主鍵</code> 查詢資料 (單筆)</li>
        </ul>
        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <CodeJava code={`Clnt entity = clntRepository.findById(id).orElse(null);
Addr entity = addrRepository.findById(id).orElse(null);`} />
        </details>

        <Title level={5}>findAllById</Title>
        <ul>
          <li>根據 <code>主鍵</code> 查詢資料 (多筆)</li>
        </ul>
        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <CodeJava code={`List<Clnt> entityList = clntRepository.findAllById(idList);
List<Addr> entityList = addrRepository.findAllById(idList);`} />
        </details>

        <Title level={5}>deleteById</Title>
        <ul>
          <li>根據 <code>主鍵</code> 刪除資料 (單筆)</li>
        </ul>
        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <CodeJava code={`clntRepository.deleteById(id);
addrRepository.deleteById(id);`} />
        </details>

        <Title level={5}>deleteAllById</Title>
        <ul>
          <li>根據 <code>主鍵</code> 刪除資料 (多筆)</li>
        </ul>
        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <CodeJava code={`clntRepository.deleteAllById(idList);
addrRepository.deleteAllById(idList);`} />
        </details>

        <Title level={5}>existsById</Title>
        <ul>
          <li>判斷 <code>主鍵</code> 是否有資料。(true = 有資料 / false = 無資料)</li>
        </ul>
        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <CodeJava code={`Boolean clntExists = clntRepository.existsById(id);
Boolean addrExists = addrRepository.existsById(id);`} />
        </details>

        <hr />

        <Title level={4}>3.2 根據命名規則產生 CRUD 方法</Title>
        <Paragraph>
          根據下面的規則組合方法名稱，<code>JPA</code> 會自動生成 <code>SQL 方法</code> 提供使用。<br />
          ＊規則 = <code>關鍵字</code> + <code>屬性條件</code> (至少一個屬性) + <code>排序</code> (選填)
        </Paragraph>
        <CodeJava code={`List<Addr> findByClientId(String clientId);`} />

        <Title level={5}>關鍵字</Title>
        <Table
          columns={[
            { title: '命名規則', dataIndex: 'rule', key: 'rule' },
            { title: '定義', dataIndex: 'definition', key: 'definition' },
          ]}
          dataSource={[
            { key: '1', rule: 'findBy', definition: '查詢結果 (多筆)' },
            { key: '2', rule: 'countBy', definition: '計算符合條件的數量' },
            { key: '3', rule: 'existsBy', definition: '檢查是否存在' },
          ]}
          pagination={false}
          bordered
          size="small"
        />

        <Title level={5} style={{ marginTop: '20px' }}>屬性條件：欄位名稱 + 連接符號</Title>
        <Table
          columns={[
            { title: '連接符號', dataIndex: 'connector', key: 'connector' },
            { title: '對應 SQL', dataIndex: 'sql', key: 'sql' },
          ]}
          dataSource={[
            { key: '1', connector: 'And', sql: 'AND' },
            { key: '2', connector: 'Or', sql: 'OR' },
            { key: '3', connector: 'Between', sql: 'BETWEEN' },
            { key: '4', connector: 'LessThan', sql: '<' },
            { key: '5', connector: 'LessThanEqual', sql: '<=' },
            { key: '6', connector: 'GreaterThan', sql: '>' },
            { key: '7', connector: 'GreaterThanEqual', sql: '>=' },
            { key: '8', connector: 'Like', sql: 'LIKE' },
            { key: '9', connector: 'NotLike', sql: 'NOT LIKE' },
            { key: '10', connector: 'StartingWith', sql: "LIKE 'value%'" },
            { key: '11', connector: 'EndingWith', sql: "LIKE '%value'" },
            { key: '12', connector: 'Containing', sql: "LIKE '%value%'" },
            { key: '13', connector: 'In', sql: 'IN' },
            { key: '14', connector: 'NotIn', sql: 'NOT IN' },
          ]}
          pagination={false}
          bordered
          size="small"
        />

        <Title level={5} style={{ marginTop: '20px' }}>排序</Title>
        <Table
          columns={[
            { title: '排序規則', dataIndex: 'rule', key: 'rule' },
            { title: '定義', dataIndex: 'definition', key: 'definition' },
            { title: '命名範例', dataIndex: 'example', key: 'example' },
          ]}
          dataSource={[
            { key: '1', rule: 'OrderBy + 屬性 + Asc', definition: '升序排列', example: 'findByAgeOrderByNameAsc' },
            { key: '2', rule: 'OrderBy + 屬性 + Desc', definition: '降序排列', example: 'findByAgeOrderByCreateDateDesc' },
          ]}
          pagination={false}
          bordered
          size="small"
        />

        <hr />

        <Title level={4}>3.3 透過 nativeQuery 執行簡單的自定義 SQL</Title>
        <ul>
          <li><code>@Query(value = "SQL語句", nativeQuery = true)</code></li>
          <li>SQL語句中，變數要用 <code>:</code> 標示。</li>
          <li>方法的參數要使用 <code>@Param("SQL變數")</code> 標示。</li>
        </ul>
        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <CodeJava code={`@Query(value = "SELECT * FROM clnt " +
               "WHERE client_id IN :clientIdList", nativeQuery = true)
List<Clnt> queryClntByClientIdList(@Param("clientIdList") List<String> clientIdList);`} />
        </details>


        <hr />

        <Title level={3}>4. 複雜 SQL 的處理</Title>
        <Paragraph>
          此方式 是透過 JPA 的 <code>NamedParameterJdbcTemplate</code> 方法 進行查詢
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

      </Typography>
    </PageContainer>
  )
}

export default Repository