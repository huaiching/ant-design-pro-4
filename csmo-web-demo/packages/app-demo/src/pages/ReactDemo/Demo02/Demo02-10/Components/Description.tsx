// src/pages/TemplateLiterals/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const TemplateLiteralsPage: React.FC = () => {
  return (
    <PageContainer title="JS 介紹 - 樣板字串 (Template Literals)">
      <Typography>

        <Title level={2}>什麼是樣板字串？</Title>
        <Paragraph>
          傳統 JS 字串串接非常麻煩：
        </Paragraph>
        <pre><code>{'const msg = "我是 " + user.name + "，今年 " + user.age + " 歲，住在 " + user.city + " 。"'}</code></pre>

        <Paragraph>
          ES6 推出 <Text strong>樣板字串</Text>，讓你輕鬆插入變數、換行、保持格式！
        </Paragraph>

        <Title level={3}>正確寫法（反引號 + ${'{}'}）</Title>
        <pre><code>{'const msg2 = `我是 ${user.name}，今年 ${user.age} 歲，住在 ${user.city} 。`'}</code></pre>

        <Title level={3}>三大優勢</Title>
        <Paragraph>
          <ol>
            <li>使用 <Text code>` `</Text>（反引號）包住整個字串</li>
            <li>變數用 <Text code>${'{變數}'}</Text> 直接插入</li>
            <li>支援換行、縮排、特殊符號（用 \ 跳脫）</li>
          </ol>
        </Paragraph>

        <Divider />

        <Title level={2}>完整範例</Title>
        <pre>
          <code>
{`import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const VDOM: React.FC = () => {
    const user = {
      name: '小明',
      age: 18,
      city: '台北'
    }

    const msg1 = "我是 " + user.name + "，今年 " + user.age + " 歲，住在 " + user.city + " 。"

    const msg2 = \`我是 \${user.name}，今年 \${user.age} 歲，住在 \${user.city} 。\`

    return (
      <PageContainer>
        <h1>傳統字串：{msg1}</h1>
        <h1>樣板字串：{msg2}</h1>
      </PageContainer>
    );
}

export default VDOM`}
          </code>
        </pre>

        <Paragraph type="secondary" style={{ marginTop: 32 }}>
          <Text strong>顯示技巧小提醒：</Text><br />
          在 &lt;pre&gt;&lt;code&gt; 中要顯示 <Text code>${'{變數}'}</Text> 時，必須在 $ 前加反斜線轉義：<Text code>\${'{變數}'}</Text><br />
          否則會被 React 當成真的表達式執行而出錯
        </Paragraph>

      </Typography>
    </PageContainer>
  );
};

export default TemplateLiteralsPage;