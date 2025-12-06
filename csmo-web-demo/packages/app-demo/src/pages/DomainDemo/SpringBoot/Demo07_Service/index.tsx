import { PageContainer } from "@ant-design/pro-components"
import CodeJava from '@/utils/CodeJava'
import CodeSQL from '@/utils/CodeSQL'
import { Typography } from "antd"

const { Title, Paragraph } = Typography

const Service = () => {
  return (
    <PageContainer>
      <Typography>
        <Paragraph>
          在 Spring Boot 專案中，<code>Service</code> 層負責處理業務邏輯，並與資料存取層 (如：Repository) 進行互動。
        </Paragraph>

        <hr/>

        <Title level={3}>1. 資料夾結構</Title>
        <Paragraph>
          java  <br />
          ├─ 📁service <br />
          │　　　├─ 📄服務類別檔
        </Paragraph>

        <hr/>
        
        <Title level={3}>2. 基本結構</Title>
        <Paragraph>
          Service Class 需要有以下註解：
        </Paragraph>
        <ul>
          <li>
            <code>@Service</code>：標註此類別為 Service 層的組件，讓 Spring 能夠掃描並管理它。
          </li>
          <li>
            <code>@Transactional</code>：方法有 <code>INSERT</code>、<code>UPDATE</code>、<code>DELETE</code> 要加上此標註，讓執行錯誤時，可以 <code>ROLLBACK</code>。 <br/>
            <Paragraph type='danger'>import 要使用 <code>import org.springframework.transaction.annotation.Transactional;</code></Paragraph>
          </li>
        </ul>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <Paragraph>
            針對 addr 地址檔，建立 Service 類別，處理 <code>地址資料查詢</code>、<code>是否存在地址資料查詢</code>、<code>地址更新</code>。
          </Paragraph>

          <CodeJava code={`@Service
public class AddrService {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    /**
     * 根據 客戶證號 取得 地址資料
     * @param clientId 客戶證號
     * @return List<AddrVo>
     */
    public List<AddrVo> queryAddrByClientId(String clientId) {
        String sql = "SELECT * FROM addr " +
                     "WHERE client_id = :clientId ";

        Map<String, Object> params = new HashMap<>();
        params.put("clientId", clientId);

        List<AddrVo> addrVoList = namedParameterJdbcTemplate.query(sql, params, new BeanPropertyRowMapper<>(AddrVo.class));

        return addrVoList;
    }

    /**
     * 查詢 客戶 是否存在 地址資料
     * @param clientId 客戶證號
     * @return Ture.存在 / False.不存在
     */
    public Boolean queryAddrExists(String clientId) {
        String sql = "SELECT COUNT(*) FROM addr " +
                     "WHERE client_id = :clientId ";

        Map<String, Object> params = new HashMap<>();
        params.put("clientId", clientId);

        Long count = namedParameterJdbcTemplate.queryForObject(sql, params, Long.class);

        return count > 0 ? Boolean.TRUE : Boolean.FALSE;
    }

    /**
     * 更新地址
     * @param clientId 客戶證號
     * @param addrInd 地址指示
     * @param address 新地址
     */
    @Transactional
    public void updateAddress(String clientId, String addrInd, String address) {
        String sql = "UPDATE addr " +
                     "SET address = :address " +
                     "WHERE client_id = :clientId " +
                     "  AND addr_ind = :addrInd ";

        Map<String, Object> params = new HashMap<>();
        params.put("clientId", clientId);
        params.put("addrInd", addrInd);
        params.put("address", address);

        namedParameterJdbcTemplate.update(sql, params);
    }
}`} />
        </details>
      </Typography>
    </PageContainer>
  )
}

export default Service