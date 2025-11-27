// src/pages/UseReducerIntro/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const UseReducerIntroPage: React.FC = () => {
  return (
    <PageContainer title="useReducer 管理複雜邏輯的狀態機">
      <Typography>

        <Paragraph>
          useState 和 useReducer 都是狀態機，數值改變時，都會觸發畫面的重新渲染，
        </Paragraph>
        <Paragraph>
          <ol>
            <li>
              useState<br />
              用於 變數 的狀態更新機制單純，每次都是 整體完全更新
            </li>
            <li>
              useReducer<br />
              可以視為 複雜的 useState，需要 自行設定 狀態改變函式<br />
              能夠根據不同類型，執行不同的 狀態改變函式
            </li>
          </ol>
        </Paragraph>
        <Paragraph>
          - useState 就是 簡化版的 useReducer，<br />
          &nbsp;&nbsp;直接幫你設定好 狀態改變函式 (僅直接取代原有狀態值)
        </Paragraph>

        <Divider />

        <Title level={2}>語法</Title>

        <Paragraph>
          <ol>
            <li>宣告 useReducer</li>
          </ol>
        </Paragraph>
        <pre><code>{`const [狀態變數, 狀態改變方法] = useReducer(狀態改變對應函式, 初始值)`}</code></pre>

        <Paragraph>
          <ol start={2}>
            <li>設定 狀態改變對應函式</li>
          </ol>
        </Paragraph>
        <Paragraph>
          - 參數 state<br />
          &nbsp;&nbsp;代表 狀態變數 目前的數值<br /><br />
          - 參數 action<br />
          &nbsp;&nbsp;代表 執行的操作物件，通常至少會有兩個參數：<br />
          &nbsp;&nbsp;&nbsp;&nbsp;- type: 操作類型<br />
          &nbsp;&nbsp;&nbsp;&nbsp;- value: 操作值
        </Paragraph>
        <pre><code>{`const 狀態改變對應函式 = (state: any, action: any) => {
  // 透過 switch 來設定 不同類型 要執行的操作
  switch (action.type) {
    case "類型A":
      類型A 要做的邏輯處理
      return 類型A處理後的 狀態變數值
    case "類型B":
      類型B 要做的邏輯處理
      return 類型B處理後的 狀態變數值
    ......
    default:
      其他情況 要做的邏輯處理
      return 其他情況處理後的 狀態變數值，通常會直接丟出 state
  }
}`}
        </code></pre>

        <Paragraph>
          <ol start={3}>
            <li>使用 狀態改變方法</li>
          </ol>
        </Paragraph>
        <Paragraph>
          - 於事件中 呼叫 狀態改變方法(執行的操作物件)<br />
          &nbsp;&nbsp;該方法 會自動 呼叫 狀態改變對應函式(目前狀態變數值, 執行的操作物件)
        </Paragraph>
        <pre><code>{`onClick={() => 狀態改變方法({type: "操作類型", value: 操作值})}`}</code></pre>

        <Divider />

        <Title level={2}>範例</Title>
        <pre>
          <code>
{`import { PageContainer } from '@ant-design/pro-layout';
import { Button, Row, Space } from 'antd';
import React, { useReducer } from 'react';

const MyComponent: React.FC = () => {
  /**
   * reducer函式: 自定義的狀態改變函式
   * @param state 目前的狀態機變數
   * @param action 執行的操作物件，通常至少會有兩個參數：
   * type: 操作類型
   * value: 操作值
   * @returns
   */
  const cityReducer = (state: any, action: any) => {
    // 根據 操作類型(action.type) 來判斷要執行的改變公式
    switch (action.type) {
      // 類型台北: 會進行數量的加減
      case "taipei":
        return {
          ...state,
          taipei: state.taipei + action.value
        }
      // 類型台中: 會進行數量的加減
      case "taichung":
        return {
          ...state,
          taichung: state.taichung + action.value
        }
      // 類型高雄: 會進行數量的加減
      case "kaohsiung":
        return {
          ...state,
          kaohsiung: state.kaohsiung + action.value
        }
        // 其他類型: 不進行改變
      default:
        return state
    }
  }

  /**
   * useReducer的宣告
   * const [變數, 狀態改變方法] = useReducer(狀態改變方法會啟動的函式, 初始值)
   */
  const [cityState, cityDispatch] = useReducer(cityReducer, {
    taipei: 0,
    taichung: 0,
    kaohsiung: 0,
  })

  // 要執行 useReducer 的狀態改變，需要呼叫 狀態改變方法
  return (
    <PageContainer>
      <Row>
        <Space>
          <h3>台北報名人數: {cityState.taipei}</h3>
          <Button onClick={() => cityDispatch({type: "taipei", value: 1})}>+ 1</Button>
          <Button onClick={() => cityDispatch({type: "taipei", value: -1})}>- 1</Button>
        </Space>
      </Row>
      <Row>
        <Space>
          <h3>台中報名人數: {cityState.taichung}</h3>
          <Button onClick={() => cityDispatch({type: "taichung", value: 1})}>+ 1</Button>
          <Button onClick={() => cityDispatch({type: "taichung", value: -1})}>- 1</Button>
        </Space>
      </Row>
      <Row>
        <Space>
          <h3>高雄報名人數: {cityState.kaohsiung}</h3>
          <Button onClick={() => cityDispatch({type: "kaohsiung", value: 1})}>+ 1</Button>
          <Button onClick={() => cityDispatch({type: "kaohsiung", value: -1})}>- 1</Button>
        </Space>
      </Row>
    </PageContainer>
  );
};

export default MyComponent;`}
          </code>
        </pre>

      </Typography>
    </PageContainer>
  );
};

export default UseReducerIntroPage;