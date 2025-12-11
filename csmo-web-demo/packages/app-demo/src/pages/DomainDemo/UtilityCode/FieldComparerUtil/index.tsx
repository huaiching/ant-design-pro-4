import { PageContainer } from "@ant-design/pro-components"
import CodeJava from '@/utils/CodePre/CodeJava'
import CodeSQL from '@/utils/CodePre/CodeSQL'
import CodeXML from '@/utils/CodePre/CodeXML'
import CodeYAML from '@/utils/CodePre/CodeYAML'
import { Button, Table, Typography } from "antd"

const { Title, Paragraph } = Typography

const ZipUtil = () => {

  return (
    <PageContainer>
      <Typography>
        <Paragraph>
          此為 物件欄位比較工具 的 工具程式，可以簡單比較 兩個DTO 名稱相同的欄位，資料是否相同。 <br/>
          相同：回傳 <code>null</code> <br/>
          不同：回傳 <code>第一個不同的欄位名稱</code>
        </Paragraph>

        <Table
          size="small"
          bordered
          columns={[
            { title: '方法', dataIndex: 'name', width: 250 },
            { title: '函式', dataIndex: 'method' }
          ]}
          dataSource={[
            { name: '比較兩個 DTO 物件的相同欄位', method: 'equals(Object obj1, Object obj2)' },
          ]}
          pagination={false}
        />

        <CodeJava code={`import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.*;


/**
 * 物件欄位比較工具
 */
public class FieldComparerUtil {
    private static final Logger log = LoggerFactory.getLogger(FieldComparerUtil.class);

    public FieldComparerUtil() {
    }


    /**
     * 比較兩個 DTO 物件的相同欄位
     *
     * @param obj1 第一個物件
     * @param obj2 第二個物件
     * @return 第一個數值不同的欄位名稱，如果全部相同則返回空字串
     */
    public static String equals(Object obj1, Object obj2) {
        if (obj1 == null || obj2 == null) {
            log.warn("比較物件為 null");
            return "";
        }

        // 取得兩個物件的所有欄位
        Map<String, Field> fields1 = getAllFieldsMap(obj1.getClass());
        Map<String, Field> fields2 = getAllFieldsMap(obj2.getClass());

        // 找出共同的欄位名稱
        Set<String> commonFieldNames = new HashSet<>(fields1.keySet());
        commonFieldNames.retainAll(fields2.keySet());

        // 排序欄位名稱以確保比較順序一致
        List<String> sortedFieldNames = new ArrayList<>(commonFieldNames);
        Collections.sort(sortedFieldNames);

        // 逐一比較共同欄位的值
        for (String fieldName : sortedFieldNames) {
            Field field1 = fields1.get(fieldName);
            Field field2 = fields2.get(fieldName);

            try {
                field1.setAccessible(true);
                field2.setAccessible(true);

                Object value1 = field1.get(obj1);
                Object value2 = field2.get(obj2);

                // 比較兩個值
                if (!areValuesEqual(value1, value2)) {
                    return fieldName;
                }
            } catch (IllegalAccessException e) {
                log.error("無法存取欄位: {}", fieldName, e);
            }
        }

        // 所有共同欄位的值都相同
        return "";
    }

    /**
     * 取得類別的所有欄位（包含父類別的欄位）
     *
     * @param clazz 類別
     * @return 欄位名稱與欄位物件的 Map
     */
    private static Map<String, Field> getAllFieldsMap(Class<?> clazz) {
        Map<String, Field> fieldMap = new HashMap<>();

        Class<?> currentClass = clazz;
        while (currentClass != null && currentClass != Object.class) {
            Field[] fields = currentClass.getDeclaredFields();
            for (Field field : fields) {
                // 只加入尚未存在的欄位（子類別優先）
                if (!fieldMap.containsKey(field.getName())) {
                    fieldMap.put(field.getName(), field);
                }
            }
            currentClass = currentClass.getSuperclass();
        }

        return fieldMap;
    }

    /**
     * 比較兩個值是否相等
     * 支援不同數值類型間的比較
     *
     * @param value1 第一個值
     * @param value2 第二個值
     * @return 是否相等
     */
    private static boolean areValuesEqual(Object value1, Object value2) {
        // 兩者都為 null
        if (value1 == null && value2 == null) {
            return true;
        }

        // 其中一個為 null
        if (value1 == null || value2 == null) {
            return false;
        }

        // 類型相同，直接使用 equals 比較
        if (value1.getClass().equals(value2.getClass())) {
            return value1.equals(value2);
        }

        // 類型不同，嘗試智慧比較
        return compareWithTypeConversion(value1, value2);
    }

    /**
     * 不同類型間的智慧比較
     *
     * @param value1 第一個值
     * @param value2 第二個值
     * @return 是否相等
     */
    private static boolean compareWithTypeConversion(Object value1, Object value2) {
        // 嘗試數值類型比較
        if (isNumericType(value1) && isNumericType(value2)) {
            return compareNumericValues(value1, value2);
        }

        // 嘗試字串類型比較
        if (value1 instanceof CharSequence || value2 instanceof CharSequence) {
            return value1.toString().equals(value2.toString());
        }

        // 其他情況使用 equals
        return value1.equals(value2);
    }

    /**
     * 判斷是否為數值類型
     *
     * @param value 值
     * @return 是否為數值類型
     */
    private static boolean isNumericType(Object value) {
        return value instanceof Number || value instanceof BigDecimal;
    }

    /**
     * 比較數值類型的值
     * 支援 Integer, Long, Double, Float, BigDecimal 等類型間的比較
     *
     * @param value1 第一個值
     * @param value2 第二個值
     * @return 是否相等
     */
    private static boolean compareNumericValues(Object value1, Object value2) {
        try {
            // 統一轉換為 BigDecimal 進行比較
            BigDecimal bd1 = convertToBigDecimal(value1);
            BigDecimal bd2 = convertToBigDecimal(value2);

            if (bd1 == null || bd2 == null) {
                return false;
            }

            // 使用 compareTo 比較，可以正確處理精度問題
            return bd1.compareTo(bd2) == 0;
        } catch (Exception e) {
            log.warn("數值比較失敗: {} vs {}", value1, value2, e);
            return false;
        }
    }

    /**
     * 將數值類型轉換為 BigDecimal
     *
     * @param value 數值
     * @return BigDecimal
     */
    private static BigDecimal convertToBigDecimal(Object value) {
        if (value == null) {
            return null;
        }

        if (value instanceof BigDecimal) {
            return (BigDecimal) value;
        }

        if (value instanceof Integer) {
            return BigDecimal.valueOf((Integer) value);
        }

        if (value instanceof Long) {
            return BigDecimal.valueOf((Long) value);
        }

        if (value instanceof Double) {
            return BigDecimal.valueOf((Double) value);
        }

        if (value instanceof Float) {
            return BigDecimal.valueOf((Float) value);
        }

        if (value instanceof Short) {
            return BigDecimal.valueOf((Short) value);
        }

        if (value instanceof Byte) {
            return BigDecimal.valueOf((Byte) value);
        }

        // 嘗試從字串轉換
        try {
            return new BigDecimal(value.toString());
        } catch (NumberFormatException e) {
            log.warn("無法轉換為 BigDecimal: {}", value);
            return null;
        }
    }
}`} />

      </Typography>
    </PageContainer>
  )
}

export default ZipUtil