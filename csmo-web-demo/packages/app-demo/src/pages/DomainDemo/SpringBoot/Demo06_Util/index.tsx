import { PageContainer } from "@ant-design/pro-components"
import CodeJava from '@/utils/CodePre/CodeJava'
import CodeSQL from '@/utils/CodePre/CodeSQL'
import { Typography } from "antd"

const { Title, Paragraph } = Typography

const Util = () => {
  return (
    <PageContainer>
      <Typography>
        <Paragraph>
          工具類別 (Util Classes) 是在 Spring Boot 專案中用來封裝常用的靜態方法或功能的類別。<br />
          這些類別通常不會被實例化，而是直接透過類別名稱來呼叫其方法。<br />
          工具類別可以幫助減少重複程式碼，並提高程式碼的可讀性和維護性。
        </Paragraph>

        <hr/>

        <Title level={3}>1. 資料夾結構</Title>
        <Paragraph>
          java  <br />
          ├─ 📁util <br />
          │　　　├─ 📄工具類別檔
        </Paragraph>

        <hr/>

        <Title level={3}>2. 結構特徵</Title>
        <Paragraph>
          工具類別通常包含以下特徵：
        </Paragraph>
        <ul>
          <li>方法 會設定為 <code>public static</code></li>
        </ul>
        
        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <Paragraph>
            建立 日期處理工具，提供 系統 的 日期(民國年) 與 時間。
          </Paragraph>
          <CodeJava code={`public class DateUtil {
    private final static String FORMAT_YYYY_MM_DD = "yyyy/MM/dd";
    private final static String FORMAT_HH_MM_SS = "HH:mm:ss";

    /**
     * 民國年 轉 西元年
     * @param TwDate 民國年
     * @return 西元年
     */
    public static String twToAdDate(String TwDate) {
        if (TwDate == null) return "";

        return (Integer.parseInt(TwDate.substring(0,3)) + 1911) + TwDate.substring(3);
    }

    /**
     * 西元年 轉 民國年
     * @param AdDate 西元年
     * @return 民國年
     */
    public static String adToTwDate(String AdDate) {
        if (AdDate == null) return "";

        return (Integer.parseInt(AdDate.substring(0,4)) - 1911) + AdDate.substring(4);
    }

    /**
     * 取得系統日 (民國年)
     * @return 系統日 (民國年)
     */
    public static String getToday() {
        String adDate = new SimpleDateFormat(FORMAT_YYYY_MM_DD).format(new Date());

        return adToTwDate(adDate);
    }

    /**
     * 取得系統時間
     * @return 系統時間
     */
    public static String getTime() {

        return new SimpleDateFormat(FORMAT_HH_MM_SS).format(new Date());
    }
}`} />
        </details>
        
      </Typography>
    </PageContainer>
  )
}

export default Util