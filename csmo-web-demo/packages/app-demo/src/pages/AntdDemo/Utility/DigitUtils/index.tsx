import CodeTsx from '@/utils/CodePre/CodeTsx'
import { separatorProps, currencyProps, currencySelectProps } from '@/utils/FieldUtil/DigitUtil'
import { PageContainer, ProForm, ProFormDigit, ProFormInstance } from '@ant-design/pro-components'
import { MliFormRow } from '@mli-csmo/base'
import { Table, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'

const DateUtile: React.FC = () => {
  const { Title, Paragraph } = Typography
  const formRef = useRef<ProFormInstance>()
  const [currency, setCurrency] = useState('TWD')

  useEffect(() => {
    formRef.current?.setFieldValue('currency', currency)
  }, [currency])

  return (
    <PageContainer title={false}>
      <ProForm grid layout="vertical" formRef={formRef} submitter={false}>
        <Typography style={{ width: '100%' }}>
          <Title level={3}>數字輸入(digit) 相關工具</Title>
          <Paragraph>
            此工具為 提供 <code>Antd 數字輸入框</code> 的 相關工具，提供 <code>台/外幣 精度快速設定</code>、
            <code>千分位格式設定</code> 等相關工具。
            <br />
            使用時，可直接於 Antd 相關元件中，使用 <code>fieldProps 引用方法</code>。
          </Paragraph>
          <Table
            size="small"
            bordered
            columns={[
              { title: '方法', dataIndex: 'name', width: 300 },
              { title: '函式', dataIndex: 'method' }
            ]}
            dataSource={[
              { name: '顯示千分位逗號', method: 'separatorProps' },
              { name: '依照 台/外幣 動態設定 數值精度', method: 'currencyProps' },
              { name: '前置幣別選擇器', method: 'currencySelectProps' }
            ]}
            pagination={false}
          />

          <details>
            <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>工具程式碼</summary>
            <CodeTsx
              title='DigitUtil.tsx'
              code={`import { Select } from "antd";

/**
 * 顯示千分位逗號的 ProFormDigit 欄位屬性設定
 */
export const separatorProps = {
  // 顯示格式化：數字 → 帶千分位逗號
  formatter: (value?: number) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  // 解析輸入：移除逗號，轉成 number
  parser: (value?: string): number => {
    if (!value || value.trim() === '') return 0;

    const cleaned = value.replace(/,/g, '');
    const num = Number(cleaned);

    return isNaN(num) ? 0 : num;
  },
}

/**
 * 依照 台/外幣 動態設定 數值精度
 * @param currency 幣別
 * @returns 
 */
export const currencyProps = (currency: string = 'TWD') => {
  return {
    step: currency === 'TWD' ? 1 : 0.01,      // 每次改變的數值
    precision: currency === 'TWD' ? 0 : 2,    // 數值經度
  }
}

/**
 * 前置幣別選擇器
 * @param currency 幣別
 * @param setCurrency 幣別變更回調
 * @returns ReactNode
 */
export const currencySelectProps = (currency: string = 'TWD', setCurrency: (value: string) => void) => {
  return {
    addonBefore: (
      <Select value={currency} onChange={setCurrency} style={{ width: 90 }}>
        <Select.Option value="TWD">新台幣</Select.Option>
        <Select.Option value="USD">美元</Select.Option>
      </Select>
    ),
  }
}`}
            />
          </details>

          <hr />

          <Title level={3}>使用範例</Title>
          <MliFormRow>
            <ProFormDigit
              name='faceAmt'
              label='保額'
              placeholder='保額'
              colSize={1}
              fieldProps={{
                min: 0,
                ...separatorProps,      // 千分位格式化
                ...currencyProps(currency),  // 幣別精度設定
                ...currencySelectProps(currency, setCurrency),  // 幣別選擇器
              }}
            />
          </MliFormRow>

          <CodeTsx code={`<ProFormDigit
  name='faceAmt'
  label='保額'
  placeholder='保額'
  colSize={1}
  fieldProps={{
    min: 0,
    ...separatorProps,      // 千分位格式化
    ...currencyProps(currency),  // 幣別精度設定
    ...currencySelectProps(currency, setCurrency),  // 幣別選擇器
  }}
/>`} />
        </Typography>
      </ProForm>
    </PageContainer>
  )
}
export default DateUtile
