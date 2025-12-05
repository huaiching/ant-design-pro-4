import { PageContainer } from "@ant-design/pro-components"
import CodeView from '@/utils/CodeView'
import { Button, Typography } from "antd"

const { Title, Paragraph } = Typography

const CreateProject = () => {

  const initUrl = () => {
    return (
      <Button
        type='link'
        onClick={() => window.open('https://start.spring.io/', '_blank')}
      >Spring Initializr 網站</Button>
    )
  }

  return (
    <PageContainer>
      <Typography>
        <Paragraph type="danger">此為 如何架設 原生專案方式，CSMO 專案建立方式 請看 EQUI 的教學</Paragraph>

        <Title level={3}>1. 透過 Spring Initalizr 建立 Spring Boot 專案</Title>

        <ol>
          <li>
            前往 {initUrl()}
          </li>
          <li>
            於 Dependencies 設定中，加入以下相依套件：
            <ul>
              <li>
                <code>Spring Web</code>：Spring Boot 的 Web服務模組
              </li>
              <li>
                <code>Spring Data JPA</code>：Spring Boot 的 數據操作模組 (ORM)
              </li>
              <li>
                <code>H2 Database</code>：簡易的 DB 數據庫，方便開發測試使用
              </li>
            </ul>
          </li>
          <li>
            Project 選擇 <code>Maven Project</code>
          </li>
          <li>
            Language 選擇 <code>Java</code>
          </li>
          <li>
            版本隨便選擇，之後要降版 為 2.7.18
          </li>
          <li>
            Project Metadata 可依需求調整
          </li>
        </ol>

        <Title level={3}>2. 調整專案的 pom.xml</Title>
        <Paragraph>
          透過 IDE 開啟專案後，調整 <code>pom.xml</code> 內容如下：
        </Paragraph>

        <ol>
          <li>
            調降 Spring Boot 的版本
            <ul>
              <li>
                將 <code>spring-boot-starter-parent</code> 版本調降為 <code>2.7.18</code>。
                <CodeView code={`<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter-parent</artifactId>
<version>2.7.18</version>`} />
              </li>
              <li>
                將 <code>Java</code> 調降為 <code>11</code>。
                <CodeView code={`<properties>
	<java.version>11</java.version>
</properties>`} />
              </li>
            </ul>
          </li>
          <li>
            安裝 <code>swagger</code> <br />
            在 <code>dependencies</code> 中，加入以下內容：
            <CodeView code={`<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-ui</artifactId>
    <version>1.8.0</version>
</dependency>
<dependency>
    <groupId>org.webjars</groupId>
    <artifactId>swagger-ui</artifactId>
    <version>5.11.10</version>
</dependency>`} />
          </li>
        </ol>

        <Title level={3}>3. 設定環境變數 application 文件</Title>
        <Paragraph>
          在 <code>src/main/resources/</code> 目錄下，將 <code>application.properties</code> 修改為 <code>application.yml</code>，並加入以下內容：
        </Paragraph>
        <CodeView code={`server:
  port: 9010
# ==================== SpringBoot ====================
spring:
  application:
    name: example-demo    # 設定專案名稱，可依需求調整
  datasource:
    url: jdbc:h2:file:./database/mydb
    driver-class-name: org.h2.Driver
    username: sa
    password:
    # Hikari 連線池（Spring Boot 預設）可自行調整
    hikari:
      maximum-pool-size: 20
  h2:
    console:
      enabled: true
      path: /h2-console
      settings:
        web-allow-others: false
  # H2 資料庫初始化設定 (可選)
  sql:
    init:
      mode: always
      continue-on-error: true
  jpa:
    hibernate:
      ddl-auto: none    # 不會對資料表進行任何異動
    show-sql: true
    properties:
      hibernate:
        format_sql: true

# ==================== Springdoc / Swagger ====================
springdoc:
  api-docs:
    enabled: true
    path: /api-docs
  swagger-ui:
    version: 5.11.10
    path: /swagger-ui.html`} />

        <Title level={3}>4. 設定 swagger config</Title>
        <Paragraph>
          於 <code>Application</code> 主程式同目錄下，新增資料夾 <code>config</code>，並在其中 新增檔案 <code>SpringDocConfig.java</code> ，並加入以下內容：
        </Paragraph>
        <CodeView language='java' code={`import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition
@Configuration
public class SwaggerDocConfig {
    @Bean
    public OpenAPI baseOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("測試範例")
                        .version("v0.0.1")
                );
    }
}`} />

        <Title level={3}>5. 建立 H2 初始化 SQL 文件 (可選)</Title>
        <Paragraph>
          於 <code>src/main/resources/</code> 新增檔案 <code>schema.sql</code>，並在 這個檔案中，設定 專案啟動時 要自動執行的 SQL 指令，例如：
        </Paragraph>
        <CodeView code={`-- 客戶資料檔
CREATE TABLE IF NOT EXISTS clnt ( 
    clinet_id   CHAR(10),   -- 客戶證號
    names       CHAR(40),   -- 客戶姓名
    sex         CHAR(1),    -- 客戶性別
    age         INTEGER     -- 客戶年齡
);

-- 客戶地址檔
CREATE TABLE IF NOT EXISTS addr (
    client_id   CHAR(10),   -- 客戶姓名
    addr_ind    CHAR(1),    -- 地址指示
    address     CHAR(72),   -- 地址
    tel         CHAR(11)    -- 電話
);`} />

        <Title level={3}>6. 專案啟動</Title>
        <Paragraph>
          專案啟動後，可透過以下連結，進入 swagger 頁面 以及 H2 控制台：
        </Paragraph>
        <ul>
          <li>
            <code>swagger 頁面</code>：http://localhost:9010/swagger-ui/index.html
          </li>
          <li>
            <code>H2 控制台 (可執行 SQL 指令)</code>：http://localhost:9010/h2-console
          </li>
        </ul>

      </Typography>
    </PageContainer>
  )
}

export default CreateProject