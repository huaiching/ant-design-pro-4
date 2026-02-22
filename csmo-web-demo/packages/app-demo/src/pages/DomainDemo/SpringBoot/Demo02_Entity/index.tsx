import { PageContainer } from "@ant-design/pro-components"
import CodeJava from '@/utils/CodePre/CodeJava'
import CodeSQL from '@/utils/CodePre/CodeSQL'
import { Button, Typography } from "antd"

const { Title, Paragraph } = Typography

const Entity = () => {
  return (
    <PageContainer>
      <Typography>
        <Paragraph type="danger">此為 Entity 的基本結構，<code>CSMO 專案</code> 請依照 EQUI 的教學，透過 工具建立。</Paragraph>

        <Paragraph>
          使用 Spring Data JPA 作為 ORM (Object-Relational Mapping) 工具時，需要建立 Entity 類別來對應資料庫中的資料表。<br />
          而且 資料表 必需要有 主鍵 (Primary Key)，才能讓 JPA 正確識別每一筆資料。
          根據 主鍵 數量的不同，Entity 可以分為 <code>單一主鍵</code> 和 <code>複合主鍵</code> 兩種情況。
        </Paragraph>

        <hr/>

        <Title level={3}>1. 資料夾結構</Title>
        <Paragraph>
          java  <br />
          ├─ 📁entity <br />
          │　　　├─ 📄entity 類別檔 <br />
          ├─ 📁uniqueKey <br />
          │　　　├─ 📄複合主鍵 的 主鍵類別檔
        </Paragraph>

        <hr/>

        <Title level={3}>2. 單一主鍵</Title>
        <Title level={5}>單一主鍵 的 Entity Class 需要有以下註解：</Title>
        <ul>
          <li><code>@Entity</code>：標註此類別為 JPA 的 Entity。</li>
          <li><code>@Table(name = "table_name")</code>：指定對應的資料表名稱。</li>
          <li><code>@Schema(description = "swagger說明")</code>：Swagger 的說明註解。</li>
        </ul>

        <Title level={5}>Entity 內部 由下面幾的部分組成：</Title>
        <ol>
          <li>
            屬性欄位
            <ul>
              <li><code>@Id</code> 標註 主鍵欄位</li>
              <li><code>@Column(name = "column_name")</code> 指定對應的資料庫欄位名稱</li>
              <li><code>@Schema(description = "swagger說明")</code>：Swagger 的說明註解</li>
            </ul>
          </li>
          <li>
            Getter / Setter 方法
            <ul>
              <li>由 IDE 自動產生</li>
              <li>
                因為 CHAR 的資料，會有尾部空白，需要特別處理。 <br />
                因此可以在 Getter 方法中，加入 <code>trim()</code> 來去除空白。
              </li>
            </ul>
          </li>
          <li>
            空白建構子
            <ul>
              <li>由 IDE 自動產生</li>
            </ul>
          </li>
          <li>
            equals() 和 hashCode() 方法
            <ul>
              <li>由 IDE 自動產生 (僅建立 <code>@Id</code> 欄位)</li>
            </ul>
          </li>
        </ol>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <Paragraph>
            我們透過 下面這個 TABLE 來示範 單一主鍵 的 Entity 建立方式：
          </Paragraph>

          <CodeSQL sql={`-- 客戶資料檔
CREATE TABLE IF NOT EXISTS clnt (
    client_id   CHAR(10),   -- 客戶證號
    names       CHAR(40),   -- 客戶姓名
    sex         CHAR(1),    -- 客戶性別
    age         INTEGER     -- 客戶年齡
);`} />
          <Paragraph>
            主鍵為 <code>clinet_id</code>，以下是對應的 Entity 類別：
          </Paragraph>

          <CodeJava code={`@Entity
@Table(name = "clnt")
@Schema(description = "客戶資料檔")
public class ClntEntity {
    @Id
    @Schema(description = "客戶證號")
    @Column(name = "client_id")
    private String clientId;

    @Schema(description = "客戶姓名")
    @Column(name = "names")
    private String names;

    @Schema(description = "客戶性別")
    @Column(name = "sex")
    private String sex;

    @Schema(description = "客戶年齡")
    @Column(name = "age")
    private Integer age;

    public ClntEntity() {
    }

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

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ClntEntity that = (ClntEntity) o;
        return Objects.equals(clientId, that.clientId);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(clientId);
    }
}`} />
        </details>

        <hr/>

        <Title level={3}>3. 複合主鍵</Title>
        <Title level={5}>複合主鍵 的 Entity Class 需要有以下註解：</Title>
        <ul>
          <li><code>@Entity</code>：標註此類別為 JPA 的 Entity。</li>
          <li><code>@Table(name = "table_name")</code>：指定對應的資料表名稱。</li>
          <li><code>@IdClass(主鍵類別.class)</code>：指定 複合主鍵 的 主鍵類別。</li>
          <li><code>@Schema(description = "swagger說明")</code>：Swagger 的說明註解。</li>
        </ul>

        <Title level={5}>Entity 內部 由下面幾的部分組成：</Title>
        <ol>
          <li>
            屬性欄位
            <ul>
              <li><code>@Id</code> 標註 主鍵欄位</li>
              <li><code>@Column(name = "column_name")</code> 指定對應的資料庫欄位名稱</li>
              <li><code>@Schema(description = "swagger說明")</code>：Swagger 的說明註解</li>
            </ul>
          </li>
          <li>
            Getter / Setter 方法
            <ul>
              <li>由 IDE 自動產生</li>
              <li>
                因為 CHAR 的資料，會有尾部空白，需要特別處理。 <br />
                因此可以在 Getter 方法中，加入 <code>trim()</code> 來去除空白。
              </li>
            </ul>
          </li>
          <li>
            空白建構子
            <ul>
              <li>由 IDE 自動產生</li>
            </ul>
          </li>
          <li>
            equals() 和 hashCode() 方法
            <ul>
              <li>由 IDE 自動產生 (僅建立 <code>@Id</code> 欄位)</li>
            </ul>
          </li>
        </ol>

        <Title level={5}>複合主鍵 的 主鍵類別 Class 建立時有以下重點：</Title>
        <ol>
          <li>
            需要 <code>implements Serializable</code>
          </li>
          <li>
            entity 主鍵 所有 <code>@Id</code> 欄位
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
            空白建構子
            <ul>
              <li>由 IDE 自動產生</li>
            </ul>
          </li>
          <li>
            equals() 和 hashCode() 方法
            <ul>
              <li>由 IDE 自動產生 (所有欄位)</li>
            </ul>
          </li>
        </ol>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <Paragraph>
            我們透過 下面這個 TABLE 來示範 複合主鍵 的 Entity 建立方式：
          </Paragraph>

          <CodeSQL sql={`-- 客戶地址檔
CREATE TABLE IF NOT EXISTS addr (
    client_id   CHAR(10),   -- 客戶姓名
    addr_ind    CHAR(1),    -- 地址指示
    address     CHAR(72),   -- 地址
    tel         CHAR(11)    -- 電話
);`} />
          <Paragraph>
            主鍵為 <code>client_id</code> 和 <code>addr_ind</code>，建立 複合主鍵 的 主鍵類別：
          </Paragraph>

          <CodeJava code={`@Schema(description = "客戶地址檔 - 主鍵")
public class AddrKey implements Serializable {
    @Schema(description = "客戶姓名")
    private String clientId;

    @Schema(description = "地址指示")
    private String addrInd;

    public AddrKey() {
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getAddrInd() {
        return addrInd;
    }

    public void setAddrInd(String addrInd) {
        this.addrInd = addrInd;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        AddrKey addrKey = (AddrKey) o;
        return Objects.equals(clientId, addrKey.clientId) && Objects.equals(addrInd, addrKey.addrInd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(clientId, addrInd);
    }
}`} />

          <Paragraph>
            主鍵為 <code>client_id</code> 和 <code>addr_ind</code>，以下是對應的 Entity 類別：
          </Paragraph>

          <CodeJava code={`@Entity
@Table(name = "addr")
@IdClass(AddrKey.class)
@Schema(description = "客戶地址檔")
public class AddrEntity {
    @Id
    @Schema(description = "客戶姓名")
    @Column(name = "client_id")
    private String clientId;

    @Id
    @Schema(description = "地址指示")
    @Column(name = "addr_ind")
    private String addrInd;

    @Schema(description = "地址")
    @Column(name = "address")
    private String address;

    @Schema(description = "電話")
    @Column(name = "tel")
    private String tel;

    public AddrEntity() {
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getAddrInd() {
        return addrInd;
    }

    public void setAddrInd(String addrInd) {
        this.addrInd = addrInd;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        AddrEntity that = (AddrEntity) o;
        return Objects.equals(clientId, that.clientId) && Objects.equals(addrInd, that.addrInd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(clientId, addrInd);
    }
}`} />
        </details>

      </Typography>
    </PageContainer>
  )
}

export default Entity