import React from 'react'
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-form'
import { BackTop, Typography } from 'antd'
import MliFormRow from '@/common/components/form/MliFormRow'
import ProCard from '@ant-design/pro-card'

const MyForm: React.FC = () => {
  return (
    <>
      <Typography.Title level={3}>BackTop</Typography.Title>
      <ProForm grid layout="vertical" submitter={false}>
        <ProCard
          ghost
          id="tabContent"
          style={{
            maxHeight: 'calc(100vh - 300px)', // 設定最大高度為視窗高度減去固定區塊（例如頁首、頁尾）
            overflowY: 'auto', // 垂直方向允許滾動
            position: 'relative', // 為了讓 BackTop 的 absolute 定位能以此為基準
            scrollBehavior: 'smooth', // 滾動時平滑過渡
            width: '100%', // 寬度占滿父容器
          }}
        >
          <ProFormText name="failed3_1" label="failed3_1" allowClear={false} />
          {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <>
              <ProFormText name={`failed3_${i}`} label={`failed3_${i}`} allowClear={false} />
              <ProFormText name={`failed3_${i}`} label={`failed3_${i}`} allowClear={false} />
            </>
          ))}
          <BackTop
            target={() => document.getElementById('tabContent') || window}
            style={{
              position: 'fixed',
              right: 60,
              bottom: 100,
            }}
          />
        </ProCard>
      </ProForm>
    </>
  )
}

export default MyForm
