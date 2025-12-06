import { PageContainer } from "@ant-design/pro-components"
import CodeJava from '@/utils/CodeJava'
import { Typography } from "antd"
const { Title, Paragraph } = Typography

const GlobalException = () => {
  return (
    <PageContainer>
      <Typography>
        <Paragraph>
          在 Spring Boot 專案中，全局異常處理是確保 API 接口在發生錯誤時，能統一、友好的返回錯誤訊息給前端的重要機制。<br />
          透過 <code>@RestControllerAdvice</code> + <code>@ExceptionHandler</code> 搭配自定義異常類別，可以避免每個 Controller 重複撰寫 try-catch，並讓錯誤回應格式一致。
        </Paragraph>

        <hr />

        <Title level={3}>1. 資料夾結構</Title>
        <Paragraph>
          java <br />
          ├─ 📁exception <br />
          │　　　├─ 📄全域異常處理器 <br />
          │　　　└─ 📄自定義業務異常
        </Paragraph>

        <hr />

        <Title level={3}>2. 自定義業務異常</Title>
        <Paragraph>
          用來在 Service 層主動拋出的異常，攜帶自訂錯誤碼、訊息與對應的 HTTP 狀態碼。
        </Paragraph>
        <ul>
          <li>
            繼承 <code>RuntimeException</code>，進行 非檢查型異常處理
          </li>
          <li>
            根據需求 設定欄位，例如：
            <ul>
              <li><code>code</code>：紀錄 Http 錯誤代碼</li>
              <li><code>message</code>：紀錄 想拋出的錯誤訊息</li>
              <li><code>code</code>：紀錄 Http 錯誤訊息</li>
            </ul>
          </li>
          <li>
            常用建構子可直接傳入 <code>HttpStatus</code> 與訊息
          </li>
        </ul>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <CodeJava code={`package com.example.demo.exception;

import org.springframework.http.HttpStatus;

/**
 * 自定義業務異常
 */
public class BusinessException extends RuntimeException {
    private final Integer code;
    private final String message;
    private final HttpStatus status;

    public BusinessException(HttpStatus status, String message) {
        super(message);
        this.code = status.value();
        this.message = message;
        this.status = status;
    }

    public BusinessException(Integer code, String message, HttpStatus status) {
        super(message);
        this.code = code;
        this.message = message;
        this.status = status;
    }

    public Integer getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public HttpStatus getStatus() {
        return status;
    }
}`} />
        </details>

        <hr />

        <Title level={3}>3. 全域異常處理器</Title>
        <Paragraph>
          使用 <code>@RestControllerAdvice</code> 宣告為全域處理器，會自動對所有 <code>@RestController</code> 生效。
        </Paragraph>
        <ul>
          <li><code>@ExceptionHandler(BusinessException.class)</code>：專門處理自訂業務異常</li>
          <li><code>@ExceptionHandler(Exception.class)</code>：兜底處理所有未捕捉的異常，返回 500</li>
          <li>依照需求，建立 統一的回傳格式</li>
        </ul>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <Paragraph>
            CSMO 前端 錯誤處理，需要
          </Paragraph>
          <ul>
            <li><code>status</code>：HTTP 狀態碼，如：400、500。</li>
            <li><code>message</code>：錯誤說明，給使用者看的提示訊息</li>
            <li><code>errorCode</code>：CSMO 顯示使用的 HTTP 狀態碼</li>
            <li><code>errorMessage</code>：CSMO 顯示使用的 錯誤說明</li>
          </ul>
          <CodeJava code={`package com.example.demo.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 全域異常處理器
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 處理自訂 BusinessException
     */
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<Map<String, Object>> handleCustomException(BusinessException exception) {
        Map<String, Object> body = new HashMap<>();
        body.put("status", exception.getStatus().value());
        body.put("message", exception.getMessage());
        body.put("errorCode", exception.getCode());
        body.put("errorMessage", exception.getMessage());
        body.put("timestamp", new Date());

        return ResponseEntity.status(exception.getStatus()).body(body);
    }

    /**
     * 處理所有未捕捉的 Exception（兜底）
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleOtherExceptions(Exception exception) {
        exception.printStackTrace(); // 建議記錄到日誌系統

        Map<String, Object> body = new HashMap<>();
        body.put("status", 500);
        body.put("message", "系統發生未預期的錯誤");
        body.put("errorCode", 500);
        body.put("errorMessage", "Internal Server Error");
        body.put("timestamp", new Date());

        return ResponseEntity.status(500).body(body);
    }
}`} />
        </details>

        <hr />

        <Title level={3}>4. 在 Service 中使用方式</Title>
        <Paragraph>
          當業務判斷失敗時，直接拋出 <code>BusinessException</code>，交給全域處理器統一處理。
        </Paragraph>
        <CodeJava code={`@Service
public class AddrService {

    public AddrVo queryAddrById(String clientId) {
        Addr addr = addrRepository.findByClientId(clientId);
        if (addr == null) {
            throw new BusinessException(HttpStatus.NOT_FOUND, "找不到該客戶的地址資料");
        }
        // ... 轉換成 VO 並返回
        return AddrVo.from(addr);
    }

    public void updateAddress(String clientId, String newAddr) {
        if (!clientRepository.existsById(clientId)) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "客戶證號不存在");
        }
        // 更新邏輯...
    }
}`} />

        <hr />

        <Title level={3}>5. 前端收到的錯誤格式範例</Title>
        <Paragraph>
          當拋出 <code>new BusinessException(HttpStatus.NOT_FOUND, "找不到該客戶的地址資料")</code> 時，前端會收到：
        </Paragraph>
        <CodeJava code={`{
  "status": 404,
  "message": "找不到該客戶的地址資料",
  "errorCode": 404,
  "errorMessage": "找不到該客戶的地址資料",
  "timestamp": "2025-12-06T10:23:45.123+08:00"
}`} />

      </Typography>
    </PageContainer>
  )
}

export default GlobalException

