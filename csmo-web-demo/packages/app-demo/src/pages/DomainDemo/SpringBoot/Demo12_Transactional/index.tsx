import { PageContainer } from "@ant-design/pro-components"
import CodeJava from '@/utils/CodePre/CodeJava'
import { Typography } from "antd"
const { Title, Paragraph } = Typography

const Transactional = () => {
  return (
    <PageContainer>
      <Typography>
        <Paragraph>
          <strong>@Transactional</strong> 是 Spring Boot 專案中最重要的事務管理註解，<br />
          所有涉及資料庫「新增、修改、刪除」操作的 Service 方法，<strong>一律必須加上 @Transactional</strong>，否則會導致資料不一致、髒寫、無法回滾等嚴重問題。
        </Paragraph>

        <hr />

        <Title level={3}>1. 基本用法</Title>

        <Paragraph type="danger" strong>
          只要 Service 方法內有任一資料庫寫入操作（insert / update / delete），<strong>必須加上 @Transactional</strong>
        </Paragraph>

        <ul>
          <li>加在 <code>public</code> 的 Service 方法上</li>
          <li>建議加在最外層的 Service 方法（不要加在 private 或被呼叫的方法）</li>
          <li>即使只有單一 update，也要加，防止未來擴充忘記加</li>
        </ul>

        <Title level={5}>範例</Title>
          <CodeJava code={`@Service
public class AddrService {

    @Transactional
    public void updateAddressAndLog(String clientId, String newAddr, String operator) {
        // 更新地址
        addrRepository.updateAddress(clientId, newAddr);
        
        // 寫入異動紀錄
        addrLogRepository.save(new AddrLog(clientId, newAddr, operator, LocalDateTime.now()));
        
        // 如果第二筆寫入失敗，第一筆會自動回滾
    }
}`} />

        <hr />

        <Title level={3}>2. 手動強制回滾</Title>

        <Paragraph>
          當業務判斷失敗，但又不想拋 Exception 中斷程式（或想拋自訂 BusinessException 又要回滾），<br />
          必須手動標記當前事務為「只回滾」。
        </Paragraph>
        <CodeJava code={`TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();`} />

        <Paragraph type="warning">
          <strong>只要呼叫此方法，即使後面程式繼續執行，資料庫操作最終都會被回滾！</strong>
        </Paragraph>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <CodeJava code={`@Service
public class OrderService {
    @Transactional
    public void createOrder(OrderDto dto) {
        // 1. 檢查庫存
        if (stockRepository.getStock(dto.getProductId()) < dto.getQty()) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "庫存不足");
        }

        // 2. 扣庫存
        stockRepository.deductStock(dto.getProductId(), dto.getQty());

        // 3. 業務規則：特定客戶不能下單
        if ("BLACKLIST".equals(clientRepository.findStatus(dto.getClientId()))) {
            // 不拋 Exception，但要回滾前面扣的庫存
            log.warn("黑名單客戶下單，強制回滾，clientId={}", dto.getClientId());
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new BusinessException(HttpStatus.FORBIDDEN, "您暫時無法下單，請聯繫客服");
        }

        // 4. 建立訂單
        orderRepository.save(...);
    }
}`} />
        </details>

        <hr />

        <Title level={3}>3. 獨立新事務</Title>

        <Paragraph>
          預設情況下，同一條執行緒內的 <code>@Transactional</code> 會共用同一個事務。<br />
          使用 <code>REQUIRES_NEW</code> 可以「暫停當前事務、開啟一個全新事務」，確保此方法「一定提交」，即使外層事務回滾也不影響。
        </Paragraph>
        <CodeJava code={`@Transactional(propagation = Propagation.REQUIRES_NEW)`} />

        <Paragraph type="success">
          <strong>最常見使用場景：</strong>
        </Paragraph>

        <ul>
          <li><strong>寫入操作日誌</strong>：即使交易失敗，也要記錄 LOG 資訊</li>
          <li><strong>萊斯送掃結果</strong>：無論 過帳 是否成功，都要記錄 萊斯送掃 的結果</li>
        </ul>

        <Paragraph type='danger'>
          <strong>注意：<code>@Transactional</code> 和 <code>@Transactional(propagation = Propagation.REQUIRES_NEW)</code> 必須放在 <code>不同 Class</code> 中，避免 設定失效。</strong>
        </Paragraph>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <CodeJava code={`@Service
public class OrderService {
    @Autowired
    private OperationLogService logService;

    @Transactional
    public void createOrderWithLog(OrderDto dto) {
        try {
            // 寫入日誌（使用 REQUIRES_NEW，保證一定入庫）
            logService.logOrderAction(dto.getClientId(), "CREATE", dto.getOperator());

            // 主業務（可能失敗回滾）
            stockRepository.deductStock(dto.getProductId(), dto.getQty());
            orderRepository.save(...);

        } catch (Exception e) {
            log.error("訂單建立失敗，已記錄日誌", e);
            throw e);
            throw e; // 外層回滾，但日誌已提交
        }
    }
}

@Service
public class OperationLogService {
    // 這個方法無論外層是否回滾，這筆日誌都會提交！
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logOrderAction(String clientId, String action, String operator) {
        operationLogRepository.save(new OperationLog(clientId, action, operator, LocalDateTime.now()));
    }
}`} />
        </details>

      </Typography>
    </PageContainer>
  )
}

export default Transactional