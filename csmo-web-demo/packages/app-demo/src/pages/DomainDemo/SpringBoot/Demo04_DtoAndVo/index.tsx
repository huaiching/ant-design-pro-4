import { PageContainer } from "@ant-design/pro-components"
import CodeJava from '@/utils/CodePre/CodeJava'
import CodeSQL from '@/utils/CodePre/CodeSQL'
import { Typography } from "antd"

const { Title, Paragraph } = Typography

const DtoAndVo = () => {
  return (
    <PageContainer>
      <Typography>
        <Paragraph>
          <code>DTO</code> (Data Transfer Object) 和 <code>VO</code> (Value Object) 是兩種常用於 Spring Boot 專案中的資料傳輸物件。<br />
          兩者的差異為：
        </Paragraph>
        <ul>
          <li>
            <strong>DTO</strong>：用於在不同層之間傳輸資料，如：<code>Service</code>和<code>Controller</code>之間的資料傳輸。
          </li>
          <li>
            <strong>VO</strong>：用於<code>Controller</code>對外的資料傳輸。
          </li>
        </ul>

        <hr/>

        <Title level={3}>1. 資料夾結構</Title>
        <Paragraph>
          java  <br />
          ├─ 📁dto <br />
          │　　　├─ 📄DTO 類別檔 <br />
          ├─ 📁vo <br />
          │　　　├─ 📄VO 類別檔
        </Paragraph>

        <hr/>
        
        <Title level={3}>2. 基本結構</Title>
        <Paragraph>
          DTO 和 VO 類別通常包含以下部分：
        </Paragraph>
        <ol>
          <li>
            屬性欄位
            <ul>
              <li><code>@Schema(description = "swagger說明")</code>：Swagger 的說明註解</li>
            </ul>
          </li>
          <li>
            Getter / Setter 方法
            <ul>
              <li>由 IDE 自動產生</li>
            </ul>
          </li>
          <li>
            建構子
            <ul>
              <li>未建立時，會有預設的無參數建構子</li>
            </ul>
          </li>
        </ol>
        
        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <Paragraph>
            首先，建立一個 保存 客戶證號 的 DTO。
          </Paragraph>
          <CodeJava code={`@Schema(description = "客戶證號")
public class ClientIdDto {
    @Schema(description = "客戶證號")
    private String clientId;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }
}`} />

          <Paragraph>
            接著，建立一個 保存 下面 資料表 數據，並對外回傳使用的 的 VO。
          </Paragraph>

          <CodeSQL sql={`-- 客戶資料檔
CREATE TABLE IF NOT EXISTS clnt (
    client_id   CHAR(10),   -- 客戶證號
    names       CHAR(40),   -- 客戶姓名
    sex         CHAR(1),    -- 客戶性別
    age         INTEGER     -- 客戶年齡
);`} />
          <Paragraph>
            VO 類別如下：
          </Paragraph>

          <CodeJava code={`@Schema(description = "客戶資料檔")
public class ClntVo {

    @Schema(description = "客戶證號")
    private String clientId;

    @Schema(description = "客戶姓名")
    private String names;

    @Schema(description = "客戶性別")
    private String sex;

    @Schema(description = "客戶年齡")
    private Integer age;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getNames() {
        return names;
    }

    public void setNames(String names) {
        this.names = names;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}`} />
        </details>
      </Typography>
    </PageContainer>
  )
}

export default DtoAndVo