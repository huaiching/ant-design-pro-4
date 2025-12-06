import CodeView from '@/utils/CodeJava'
import { PageContainer } from '@ant-design/pro-components'
import { Divider, Table, Typography } from 'antd'

const { Title, Paragraph } = Typography

const SpELDemo: React.FC = () => {
  return (
    <PageContainer>
      <Typography>
        <Paragraph>
          <b>Spring Expression Language (SpEL)</b> 是 Spring 框架提供的 Java 表達式語言， 常用於{' '}
          <b>動態運算</b> 與 <b>邏輯判斷</b>。
        </Paragraph>

        <Title level={2}>語法格式</Title>

        <Title level={3}>1. 變數</Title>
        <Paragraph>
          變數需要使用 <code>Map&lt;String, Object&gt;</code> 保存：
        </Paragraph>
        <ul>
          <li><code>key</code>：變數名稱</li>
          <li><code>value</code>：變數值</li>
        </ul>

        <CodeView language='java'
          code={`Map<String, Object> result = new HashMap<>();
result.put("age", 30);
result.put("income", 50000);
result.put("planClasCode", "9A21");`}
        />

        <Title level={3}>2. 基本結構</Title>

        <CodeView language='java'
          code={`ExpressionParser parser = new SpelExpressionParser();
EvaluationContext context = new StandardEvaluationContext();
變數Map.forEach(context::setVariable);

String 判斷式 = "spEL 表達式 ? 符合結果 : 不符合結果";
結果型態 result = parser.parseExpression(判斷式)
        .getValue(context, 結果型態.class);`}
        />

        <Paragraph>
          <Title level={4}>說明：</Title>
          <ul>
            <li>
              <code>#</code>：代表變數，如 <code>#age</code>
            </li>
            <li>判斷式可使用三元運算子</li>
            <li>
              <code>getValue()</code> 第二個參數為輸出型態
            </li>
            <li>
              若 結果 為 Boolean，則 可以不使用 三元表達式，直接使用<code>spEL 表達式</code>
            </li>
          </ul>
          <Title level={4}>優化：</Title>
          <Paragraph>
            為了提升效能，可將 SpEL 表達式 進行 <b>緩存</b>，避免每次都重新解析：
          </Paragraph>
          <CodeView language='java'
            code={`// SpEL 表達式解析器全局單例: 避免 多次 new 浪費記憶體
private static final ExpressionParser PARSER = new SpelExpressionParser();

// 表達式緩存
// - Key: SpEL 檢核規則 字串
// - Value: 已解析的 Expression 對象
private final Map<String, Expression> expressionCache = new ConcurrentHashMap<>();`}
          />
          <Paragraph>
            此時，使用下述方法進行 SpEL 表達式 解析
          </Paragraph>
          <CodeView language='java'
            code={`// 從緩存獲取或解析（Key 是完整的 ruleCode）
Expression expression = expressionCache.computeIfAbsent(ruleCode, code -> {
    // 檢查緩存大小，防止無限增長
    if (expressionCache.size() >= 1000) {
        evictOldestEntries(expressionCache);
    }
    return PARSER.parseExpression(code);
});
Boolean result = expression.getValue(context, Boolean.class);`}
          />
          <Paragraph>
            為了避免 緩存無限增長，可在每次新增前，檢查緩存大小，並適當清除舊的緩存資料
          </Paragraph>
          <CodeView language='java'
            code={`private void evictOldestEntries(Map<String, Expression> expressionCache) {
    int removeCount = 1000 / 5; // 清除 20%
    Iterator<String> iterator = expressionCache.keySet().iterator();
    int removed = 0;
    while (iterator.hasNext() && removed < removeCount) {
        iterator.next();
        iterator.remove();
        removed++;
    }
    log.info("已清除 {} 個舊的表達式緩存項目", removed);
}`}
          />
        </Paragraph>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例 (基本用法)</summary>
          <CodeView language='java'
            code={`@Service
public class SampleSpelService {
    private static final Logger log = LoggerFactory.getLogger(SampleSpelService.class);

    public ResultVo spelDemo() {
        // 設定 變數資料
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("age", 40);
        dataMap.put("income", 50000);
        dataMap.put("address", "台北市內湖區石潭路58號1樓");

        // 設定 SpEL 解析器
        ExpressionParser parser = new SpelExpressionParser();

        // SpEL 變數 載入
        EvaluationContext context = new StandardEvaluationContext();
        dataMap.forEach(context::setVariable);

        String ruleCode = "#age >= 30 and #income > 10000 and #address matches '.*台北市.*'";

        // SpEL 方法解析
        Boolean result = Boolean.FALSE;
        try {
            String expression = ruleCode + " ? true : false";
            result = parser.parseExpression(expression).getValue(context, Boolean.class);
        } catch (ParseException e) {
            // 語法錯誤（規則寫錯）
            log.error("【SpEL 語法錯誤】檢核規則={} 錯誤訊息={}",
                    ruleCode, e.getMessage());
        } catch (EvaluationException e) {
            // 執行期錯誤（變數 null、類型不符等）
            log.error("【SpEL 執行失敗】檢核規則={} 錯誤訊息={}",
                    ruleCode, e.getMessage());
        } catch (Exception e) {
            // 其他未知錯誤
            log.error("【SpEL 未知異常】檢核規則={}",
                    ruleCode, e);
        }

        // 設定輸出
        ResultVo output = new ResultVo();
        output.setRule(ruleCode);
        output.setResult(result);

        return output;
    }
}`}
          />
        </details>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例 (優化)</summary>
          <CodeView language='java'
            code={`@Service
public class Demo1Service {
    private static final Logger log = LoggerFactory.getLogger(Demo1Service.class);

    /**
     * SpEL 表達式解析器全局單例: 避免 多次 new 浪費記憶體
     */
    private static final ExpressionParser PARSER = new SpelExpressionParser();

    /**
     * 表達式緩存
     * - Key: SpEL 檢核規則 字串
     * - Value: 已解析的 Expression 對象
     */
    private final Map<String, Expression> expressionCache = new ConcurrentHashMap<>();

    /**
     * 規則範例
     */
    public ResultVo spelDemo() {
        // 設定 變數資料
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("age", 40);
        dataMap.put("income", 50000);
        dataMap.put("address", "台北市內湖區石潭路58號1樓");

        // SpEL 變數 載入
        EvaluationContext context = new StandardEvaluationContext();
        dataMap.forEach(context::setVariable);

        // 設定規則
        String ruleCode = "#age >= 30 and #income > 10000 and #address matches '.*台北市.*'";

        // SpEL 方法解析
        Boolean result = Boolean.FALSE;
        try {
            // 從緩存獲取或解析（Key 是完整的 ruleCode）
            Expression expression = expressionCache.computeIfAbsent(ruleCode, code -> {
                // 檢查緩存大小，防止無限增長
                if (expressionCache.size() >= 1000) {
                    log.warn("表達式緩存已達上限 {}，清除最舊的 20% 項目", 1000);
                    evictOldestEntries(expressionCache);
                }
                return PARSER.parseExpression(code);
            });

            result = expression.getValue(context, Boolean.class);
        } catch (ParseException e) {
            // 語法錯誤（規則寫錯）
            log.error("【SpEL 語法錯誤】檢核規則={} 錯誤訊息={}",
                    ruleCode, e.getMessage());
        } catch (EvaluationException e) {
            // 執行期錯誤（變數 null、類型不符等）
            log.error("【SpEL 執行失敗】檢核規則={} 錯誤訊息={}",
                    ruleCode, e.getMessage());
        } catch (Exception e) {
            // 其他未知錯誤
            log.error("【SpEL 未知異常】檢核規則={}",
                    ruleCode, e);
        }

        // 設定輸出
        ResultVo output = new ResultVo();
        output.setRule(ruleCode);
        output.setResult(result);

        return output;
    }

    /**
     * 當緩存滿時，清除最舊的 20% 項目
     */
    private void evictOldestEntries(Map<String, Expression> expressionCache) {
        int removeCount = 1000 / 5; // 清除 20%
        Iterator<String> iterator = expressionCache.keySet().iterator();

        int removed = 0;
        while (iterator.hasNext() && removed < removeCount) {
            iterator.next();
            iterator.remove();
            removed++;
        }

        log.info("已清除 {} 個舊的表達式緩存項目", removed);
    }
}`}
          />
        </details>

        <Divider />

        {/* ======================== 表格內容 ======================== */}

        <Title level={2}>SpEL 表達式</Title>
        <Title level={3}>1. 比較運算子</Title>
        <Table
          size="small"
          bordered
          columns={[
            { title: '運算子', dataIndex: 'op', width: 100 },
            { title: '說明', dataIndex: 'desc', width: 120 },
            { title: '範例', dataIndex: 'example' }
          ]}
          dataSource={[
            { key: 1, op: '==', desc: '等於', example: '#age == 18' },
            { key: 2, op: '!=', desc: '不等於', example: "#planClasCode != '9A21'" },
            { key: 3, op: '>', desc: '大於', example: '#income > 30000' },
            { key: 4, op: '<', desc: '小於', example: '#age < 65' },
            { key: 5, op: '>=', desc: '大於等於', example: '#age >= 18' },
            { key: 6, op: '<=', desc: '小於等於', example: '#income <= 100000' }
          ]}
          pagination={false}
        />

        <Divider />

        {/* ---------- 算術運算子 ---------- */}
        <Title level={3}>2. 算術運算子</Title>
        <Table
          size="small"
          bordered
          columns={[
            { title: '運算子', dataIndex: 'op', width: 100 },
            { title: '說明', dataIndex: 'desc', width: 120 },
            { title: '範例', dataIndex: 'example' }
          ]}
          dataSource={[
            { key: 1, op: '+', desc: '加法', example: '#x + #y == 10' },
            { key: 2, op: '-', desc: '減法', example: '#x - #y > 0' },
            { key: 3, op: '*', desc: '乘法', example: '#price * #quantity > 100' },
            { key: 4, op: '/', desc: '除法', example: '#income / 12' },
            { key: 5, op: '%', desc: '餘數', example: '#age % 2 == 0' },
            { key: 6, op: '^', desc: '次方', example: '#x ^ 2 > 25' }
          ]}
          pagination={false}
        />

        <Divider />

        {/* ---------- 邏輯運算子 ---------- */}
        <Title level={3}>3. 邏輯運算子</Title>
        <Table
          size="small"
          bordered
          columns={[
            { title: '運算子', dataIndex: 'op', width: 100 },
            { title: '說明', dataIndex: 'desc', width: 200 },
            { title: '範例', dataIndex: 'example' }
          ]}
          dataSource={[
            { key: 1, op: 'and', desc: '且', example: "#age >= 18 and #status == 'OK'" },
            { key: 2, op: 'or', desc: '或', example: "#status == 'OK' or #count > 0" },
            {
              key: 3,
              op: 'not',
              desc: '反轉（true ⇄ false）',
              example: "not (#status == 'OK' or #count > 0)"
            }
          ]}
          pagination={false}
        />

        <Divider />

        {/* ---------- 正則 ---------- */}
        <Title level={3}>4. 正則比對</Title>
        <Table
          size="small"
          bordered
          columns={[
            { title: '運算子', dataIndex: 'op', width: 120 },
            { title: '說明', dataIndex: 'desc', width: 200 },
            { title: '範例', dataIndex: 'example' }
          ]}
          dataSource={[
            {
              key: 1,
              op: 'matches',
              desc: '正則運算式比對',
              example: "#email matches '^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$'"
            }
          ]}
          pagination={false}
        />

        <Divider />

        {/* ---------- 集合 ---------- */}
        <Title level={3}>5. 集合操作</Title>
        <Table
          size="small"
          bordered
          columns={[
            { title: '用法', dataIndex: 'usage', width: 200 },
            { title: '說明', dataIndex: 'desc', width: 200 },
            { title: '範例', dataIndex: 'example' }
          ]}
          dataSource={[
            { key: 1, usage: '集合變數[index]', desc: '取得指定索引的元素', example: '#list[0]' },
            { key: 2, usage: 'size()', desc: '取得集合長度', example: '#list.size()' },
            { key: 3, usage: 'contains()', desc: '是否包含元素', example: "#list.contains('A')" }
          ]}
          pagination={false}
        />

        <Divider />

        {/* ---------- 函式 ---------- */}
        <Title level={3}>6. 函式</Title>
        <Table
          size="small"
          bordered
          columns={[
            { title: '函式', dataIndex: 'func', width: 200 },
            { title: '說明', dataIndex: 'desc', width: 150 },
            { title: '範例', dataIndex: 'example' }
          ]}
          dataSource={[
            { key: 1, func: 'toUpperCase()', desc: '轉為大寫', example: '#name.toUpperCase()' },
            { key: 2, func: 'toLowerCase()', desc: '轉為小寫', example: '#name.toLowerCase()' },
            {
              key: 3,
              func: 'substring(start,end)',
              desc: '擷取字串',
              example: '#name.substring(0,2)'
            },
            { key: 4, func: 'isEmpty()', desc: '是否為空字串', example: '#name.isEmpty()' },
            {
              key: 5,
              func: 'contains(text)',
              desc: '是否包含指定文字',
              example: "#planClasCode.contains('9A')"
            },
            {
              key: 6,
              func: 'startsWith(text)',
              desc: '字首比對',
              example: "#planClasCode.startsWith('9')"
            },
            {
              key: 7,
              func: 'endsWith(text)',
              desc: '字尾比對',
              example: "#planClasCode.endsWith('1')"
            }
          ]}
          pagination={false}
        />

        <Divider />

        {/* ======================== 物件資料 ======================== */}

        <Title level={3}>7. 物件資料</Title>
        <Paragraph>
          SpEL 不僅可操作基本型別，也能直接使用 <code>物件 (DTO)</code> 中的屬性。 <br />
          當變數為物件時，可透過 <code>#變數.屬性</code> 方式存取屬性值，甚至支援 巢狀屬性存取（如{' '}
          <code>#user.department.name</code>）。
        </Paragraph>
        <ul>
          <li>
            安全導向運算子 <code>?.</code> <br />
            當物件屬性可能為 <code>null</code> 時，若直接使用 <code>#user.deptName</code>，會拋出{' '}
            <code>NullPointerException</code>。 <br />
            此時可使用 安全運算子 <code>#user?.name</code> 來避免異常，讓表達式會回傳{' '}
            <code>null</code>。
          </li>
        </ul>

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <ul>
            <li>
              DTO
              <CodeView language='java'
                code={`public class UserDto {
    private String userCode;
    private String userName;
    private String userDept;

    // Getter / Setter 省略
}`}
              />
            </li>
            <li>
              取值範例
              <CodeView language='java'
                code={`Map<String, Object> dataMap = new HashMap<>();
dataMap.put("user", new UserDto("ABC001", "測試人員", "90250"));

ExpressionParser parser = new SpelExpressionParser();
EvaluationContext context = new StandardEvaluationContext();
dataMap.forEach(context::setVariable);

String userCode = parser.parseExpression("#user.userCode")
        .getValue(context, String.class);

System.out.println(userCode); // 輸出：ABC001`}
              />
            </li>
            <li>
              判斷範例
              <CodeView language='java'
                code={`Map<String, Object> dataMap = new HashMap<>();
dataMap.put("user", new UserDto("ABC001", "測試人員", "90250"));

ExpressionParser parser = new SpelExpressionParser();
EvaluationContext context = new StandardEvaluationContext();
dataMap.forEach(context::setVariable);

String rule = "#user.userDept == '90250' ? '同部門' : '其他部門'";
String result = parser.parseExpression(rule)
        .getValue(context, String.class);

System.out.println(result); // 輸出：同部門`}
              />
            </li>
          </ul>
        </details>

        <Divider />

        {/* ======================== 數值運算 ======================== */}

        <Title level={3}>8. 數值計算</Title>
        <Paragraph>spEL 表達式 可以用來進行 數值計算，並且 可以使用 JAVA 的函式</Paragraph>

        <Title level={4}>語法</Title>
        <CodeView language='java' code={`T(import).函式名稱(輸入參數)`} />

        <Title level={4}>範例</Title>
        <CodeView language='java' code={`T(java.lang.Math).max(#V001, #V002)`} />

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>完整範例</summary>
          <CodeView language='java'
            code={`@Service
public class Demo3Service {
    private static final Logger log = LoggerFactory.getLogger(Demo3Service.class);

    /**
     * SpEL 表達式解析器全局單例: 避免 多次 new 浪費記憶體
     */
    private static final ExpressionParser PARSER = new SpelExpressionParser();

    /**
     * 表達式緩存
     * - Key: SpEL 檢核規則 字串
     * - Value: 已解析的 Expression 對象
     */
    private final Map<String, Expression> expressionCache = new ConcurrentHashMap<>();

    /**
     * 金額計算範例: 三者取其大
     */
    public Double spelDemo() {
        // 設定變數
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("V001", 500);
        dataMap.put("V002", 1000);
        dataMap.put("V003", 700);
        dataMap.put("V004", 450);

        // SpEL 變數 載入
        EvaluationContext context = new StandardEvaluationContext();
        dataMap.forEach(context::setVariable);

        // 設定規則
        String ruleCode = "T(java.lang.Math).max(#V001, T(java.lang.Math).max(#V002, (#V003 + #V004)))";

        // SpEL 方法解析
        Double result = 0.0;
        try {
            // 從緩存獲取或解析（Key 是完整的 ruleCode）
            Expression expression = expressionCache.computeIfAbsent(ruleCode, code -> {
                // 檢查緩存大小，防止無限增長
                if (expressionCache.size() >= 1000) {
                    evictOldestEntries(expressionCache);
                }
                return PARSER.parseExpression(code);
            });

            result = expression.getValue(context, Double.class);
        } catch (ParseException e) {
            // 語法錯誤（規則寫錯）
            log.error("【SpEL 語法錯誤】檢核規則={} 錯誤訊息={}",
                    ruleCode, e.getMessage());
        } catch (EvaluationException e) {
            // 執行期錯誤（變數 null、類型不符等）
            log.error("【SpEL 執行失敗】檢核規則={} 錯誤訊息={}",
                    ruleCode, e.getMessage());
        } catch (Exception e) {
            // 其他未知錯誤
            log.error("【SpEL 未知異常】檢核規則={}",
                    ruleCode, e);
        }

        return result;
    }

    /**
     * 當緩存滿時，清除最舊的 20% 項目
     */
    private void evictOldestEntries(Map<String, Expression> expressionCache) {
        int removeCount = 1000 / 5; // 清除 20%
        Iterator<String> iterator = expressionCache.keySet().iterator();

        int removed = 0;
        while (iterator.hasNext() && removed < removeCount) {
            iterator.next();
            iterator.remove();
            removed++;
        }

        log.info("已清除 {} 個舊的表達式緩存項目", removed);
    }
}`}
          />
        </details>

        <Divider />

        {/* ======================== 自製函式 ======================== */}

        <Title level={3}>9. 使用 自製函式</Title>
        <Paragraph>
          spEL 表達式 可以使用 自製的函式，但需要進行函式註冊，且 需要 <code>try-catch</code>。{' '}
          <br />
        </Paragraph>

        <Title level={4}>註冊 自製函式</Title>
        <CodeView language='java'
          code={`Method calcMethod = 自製函式程式.class.getDeclaredMethod("自製函式名稱", 輸入參數型態.class, ...);
context.registerFunction("自製函式名稱", calcMethod);`}
        />

        <Title level={4}>使用 自製函式</Title>
        <CodeView language='java' code={`#自製函式名稱(參數...)`} />

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <CodeView language='java'
            code={`@Service
public class Demo4Service {
    private static final Logger log = LoggerFactory.getLogger(Demo4Service.class);

    /**
     * SpEL 表達式解析器全局單例: 避免 多次 new 浪費記憶體
     */
    private static final ExpressionParser PARSER = new SpelExpressionParser();

    /**
     * 表達式緩存
     * - Key: SpEL 檢核規則 字串
     * - Value: 已解析的 Expression 對象
     */
    private final Map<String, Expression> expressionCache = new ConcurrentHashMap<>();

    /**
     * 自製 Method 範例: 金額計算
     */
    public Double spelDemo() {
        // 設定 變數資料
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("baseSalary", 50000);  // 基本薪資
        dataMap.put("bonus", 8000);        // 獎金
        dataMap.put("taxRate", 0.9);       // 稅率

        // SpEL 變數 載入
        StandardEvaluationContext context = new StandardEvaluationContext();
        dataMap.forEach(context::setVariable);

        try {
            // 將自製方法註冊進 SpEL 環境
            spelRegister(context);

            // 設定規則
            String ruleCode = "#calcTotalAmount(#baseSalary, #bonus, #taxRate)";

            // SpEL 方法解析
            Double result = 0.0;
            try {
                // 從緩存獲取或解析（Key 是完整的 ruleCode）
                Expression expression = expressionCache.computeIfAbsent(ruleCode, code -> {
                    // 檢查緩存大小，防止無限增長
                    if (expressionCache.size() >= 1000) {
                        evictOldestEntries(expressionCache);
                    }
                    return PARSER.parseExpression(code);
                });

                result = expression.getValue(context, Double.class);
            } catch (ParseException e) {
                // 語法錯誤（規則寫錯）
                log.error("【SpEL 語法錯誤】檢核規則={} 錯誤訊息={}",
                        ruleCode, e.getMessage());
            } catch (EvaluationException e) {
                // 執行期錯誤（變數 null、類型不符等）
                log.error("【SpEL 執行失敗】檢核規則={} 錯誤訊息={}",
                        ruleCode, e.getMessage());
            } catch (Exception e) {
                // 其他未知錯誤
                log.error("【SpEL 未知異常】檢核規則={}",
                        ruleCode, e);
            }

            return result;

        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 將自製方法註冊進 SpEL 環境
     * @param context
     * @throws NoSuchMethodException
     */
    private void spelRegister(StandardEvaluationContext context) throws NoSuchMethodException {
        Method calcMethod = CalcService.class.getDeclaredMethod("calcTotalAmount", Double.class, Double.class, Double.class);
        context.registerFunction("calcTotalAmount", calcMethod);
    }

    /**
     * 當緩存滿時，清除最舊的 20% 項目
     */
    private void evictOldestEntries(Map<String, Expression> expressionCache) {
        int removeCount = 1000 / 5; // 清除 20%
        Iterator<String> iterator = expressionCache.keySet().iterator();

        int removed = 0;
        while (iterator.hasNext() && removed < removeCount) {
            iterator.next();
            iterator.remove();
            removed++;
        }

        log.info("已清除 {} 個舊的表達式緩存項目", removed);
    }
}`}
          />
        </details>
      </Typography>
    </PageContainer>
  )
}

export default SpELDemo
