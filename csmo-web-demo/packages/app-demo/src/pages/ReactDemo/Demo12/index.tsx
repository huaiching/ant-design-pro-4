import { PageContainer } from '@ant-design/pro-components'
import { Typography } from 'antd'
import CodeView from '@/utils/CodeView';

const { Paragraph, Title } = Typography;

const RegexAppendixPage: React.FC = () => {
  return (
    <PageContainer title="附錄 - 正規表達式">
      <Typography>
        <Paragraph>
          <Title level={2}>1. `^`：開頭符號 / `$`：結尾符號</Title>
          範例：<br />
          <code>/^a/</code>：代表 a 開頭<br />
          <code>/a$/</code>：代表 a 結尾<br />
          <code>/^a$/</code>：代表 a 開頭 + a結尾 = 只能是 a<br />
          <code>/a/</code>：沒有 開頭符號 也沒有 結尾符號，代表 字串只要有 a 就可以
        </Paragraph>

        <Paragraph>
          <Title level={2}>2. 宣告方式有兩種寫法</Title>
        </Paragraph>

        <Paragraph>
          靜態：(效能較佳) — 使用「/」將正規表達式夾起來：
        </Paragraph>
        <CodeView code=
          {`const re = /^a$/`}
        />

        <Paragraph>
          動態：透過 new RegExp() 進行封裝：
        </Paragraph>
        <CodeView code=
          {`const re = new RegExp("^a$")`}
        />

        <Paragraph>
          <Title level={2}>3. 條件檢核</Title>
        </Paragraph>
        <Paragraph>
          透過 test() 判斷是否符合正規表達式規則：
        </Paragraph>
        <CodeView code=
          {`正規表達式.test(要檢查的數值)`}
        />
        <Paragraph>true = 符合；false = 不符合</Paragraph>

        <Paragraph>
          <Title level={2}>4. 正規表達式的其他規則</Title>
        </Paragraph>

        <Paragraph>
          <Title level={3}>4.1. 驗證字元</Title>
          <code>.*</code>：任意字串
        </Paragraph>

        <Paragraph>
          <Title level={3}>4.2. 特定字元</Title>
          <code>0-9</code>：接受數字0-9<br />
          <code>\d</code>：數字<br />
          <code>\D</code>：非數字<br />
          <code>\w</code>：數字字母與底線，等同 [A-Za-z0-9_]<br />
          <code>\W</code>：非數字字母與底線，等同 [^A-Za-z0-9_]<br />
          <code>\s</code>：空白字元<br />
          <code>\S</code>：非空白字元
        </Paragraph>

        <Paragraph>
          <Title level={3}>4.3. 次數</Title>
          <code>*</code>：0次以上<br />
          <code>+</code>：1次以上<br />
          <code>?</code>：0次或1次<br />
          <code>{`{m}`}</code>：m次<br />
          <code>{`{n,}`}</code>：最少n次<br />
          <code>{`{m,n}`}</code>：m次到n次<br />
          <code>{`{m,n}?`}</code>：m次到n次之間最少次的
        </Paragraph>

        <Paragraph>
          <Title level={3}>4.4. 跳脫特殊字元</Title>
          <code>.</code>、<code>^</code>、<code>&</code>、<code>\</code>… 等特殊符號若要做為文字使用，必須在前面加上 <code>\</code>
        </Paragraph>
        <Paragraph>
          例如：<br />
          <code>\.</code> 為 <code>.</code> 這個文字<br />
          <code>\\</code> 為 <code>\</code> 這個文字
        </Paragraph>
      </Typography>
    </PageContainer>
  );
}

export default RegexAppendixPage;