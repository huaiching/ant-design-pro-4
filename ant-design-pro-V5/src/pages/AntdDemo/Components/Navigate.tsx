import { MliFormRow, MliFormCol } from '@mli-csmo/base';
import { Card } from 'antd';
import React from 'react';

const Navigate: React.FC = () => {
  const navigateList = [
    {
      key: 'antd',
      title: 'Ant Design 基本組件',
      desc: '包含 Button、Card、Form、Input、Modal、Select、Table、Tabs 等 基本UI組件',
      url: 'https://ant-design.antgroup.com/components/overview-cn'
    },
    {
      key: 'proComponents',
      title: 'Ant Design Pro 組件',
      desc: '包含 ProTable、ProForm、ProLayout 等 高級UI組件',
      url: 'https://procomponents.ant.design/components'
    },
    {
      key: 'icon',
      title: 'Ant Design Icons',
      desc: '包含 Ant Design 提供的各種圖示，方便在應用程式中使用',
      url: 'https://ant-design.antgroup.com/components/icon-cn'
    },
    {
      key: 'css',
      title: 'CSS 教學',
      desc: '包含 CSS 的基本用法與進階技巧，幫助你更好地使用 Ant Design',
      url: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS'
    }
  ]
  

  // 計算欄位寬度，一行最多四個
  const colSize = (4 / navigateList.length < 1) ? 1 : (4 / navigateList.length)

  return (
    <MliFormRow gutter={[8,8]}>
      {navigateList.map((navigate, index) => (
        <MliFormCol colSize={colSize} key={navigate.key}>
          <Card
            title={<span style={{ fontSize: 18 }}>{navigate.title}</span>}
            type="inner"
            hoverable
            style={{ textAlign: 'center', height: 150 }}
            onClick={() => window.open(navigate.url, '_blank')}
          >
            {navigate.desc} {colSize}
          </Card>
        </MliFormCol>
      ))}
    </MliFormRow>
  )
}

export default Navigate;
