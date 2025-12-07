import { PageContainer } from "@ant-design/pro-components"
import CodeJava from '@/utils/CodeJava'
import { Typography } from "antd"

const { Title, Paragraph } = Typography

const Constants = () => {
  return (
    <PageContainer>
      <Typography>
        <Paragraph>
          在 Spring Boot 專案中，常會使用 <code>Enum</code> 來定義一組固定的常數值。<br />
          這些常數值可以用來表示狀態、類型或其他需要固定選項的情況。<br />
          使用 Enum 可以提高程式碼的可讀性和維護性。
        </Paragraph>

        <hr/>

        <Title level={3}>1. 資料夾結構</Title>
        <Paragraph>
          java  <br />
          ├─ 📁constants <br />
          │　　　├─ 📄Enum 類別檔
        </Paragraph>

        <hr/>

        <Title level={3}>2. 基本結構</Title>
        <Paragraph>
          Enum 類別通常包含以下部分：
        </Paragraph>
        <ol>
          <li>
            列舉常數值
            <ul>
              <li>每個常數值通常會有一個名稱和對應的值</li>
              <li>建議加上 JavaDoc 註解，說明每個常數的意義</li>
              <CodeJava code={`/** 1.男性 */
VALUE_1("1","男性"),
/** 2.女性 */
VALUE_2("2","女性");`}/>
            </ul>
          </li>
          <li>
            屬性欄位
          </li>
          <li>
            建構子
            <ul>
              <li>由 IDE 自動產生 (所有欄位)</li>
            </ul>
          </li>
          <li>
            Getter 方法
            <ul>
              <li>由 IDE 自動產生</li>
              <li>因為 常數 不可修改，所以不需要 Setter 方法</li>
            </ul>
          </li>
          <li>
            其他自訂方法
            <ul>
              <li><code>getEnumByCode</code>：根據 值 取得對應的 Enum 常數</li>
              <li><code>getDescByCode</code>：根據 值 取得對應的描述文字</li>
            </ul>
          </li>
        </ol>
        
        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <Paragraph>
            設定 性別 的 Enum，內容為： 1.男性 / 2.女性。
          </Paragraph>
          <CodeJava code={`public enum SexEnum {
    /** 1.男性 */
    VALUE_1("1","男性"),
    /** 2.女性 */
    VALUE_2("2","女性");

    private String code;
    private String desc;

    SexEnum(String code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public String getCode() {
        return code;
    }

    public String getDesc() {
        return desc;
    }

    /**
     * 根據 代碼 取得 Enum
     * @param code 代碼
     * @return SexEnum
     */
    public static SexEnum getEnumByCode(String code) {
        for (SexEnum sexEnum : SexEnum.values()) {
            if (sexEnum.getCode().equals(code)) {
                return sexEnum;
            }
        }
        return null;
    }

    /**
     * 根據 代碼 查詢 中文
     * @param code 要查詢的代碼
     * @return 對應的中文
     */
    public static String getDescByCode(String code) {
        SexEnum sexEnum = getEnumByCode(code);
        if (sexEnum == null) {
            return "";
        } else {
            return sexEnum.getDesc();
        }
    }
}`} />
        </details>

        
      </Typography>
    </PageContainer>
  )
}

export default Constants