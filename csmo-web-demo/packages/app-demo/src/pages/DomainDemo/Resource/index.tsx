import { MliFormRow, MliFormCol } from '@mli-csmo/base';
import { Card } from 'antd';
import React from 'react';

const Navigate: React.FC = () => {
  const publicPath = (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  
  const javaUrl = `${publicPath}pdf/JavaSE.pdf`;
  

  const navigateList = [
    {
      key: 'javaSE',
      title: 'Java SE 基礎教學',
      desc: '基本 Java 語法 的 教學文件',
      url: javaUrl
    },
  ]


  // 計算欄位寬度，一行最多四個
  const colSize = (4 / navigateList.length < 1) ? 1 : (4 / navigateList.length)

  return (
    <MliFormRow gutter={[8, 8]}>
      {navigateList.map((navigate, index) => (
        <MliFormCol colSize={colSize} key={navigate.key}>
          <Card
            title={<span style={{ fontSize: 18 }}>{navigate.title}</span>}
            type="inner"
            hoverable
            style={{ textAlign: 'center', height: 150 }}
            onClick={() => window.open(navigate.url, '_blank')}
          >
            {navigate.desc}
          </Card>
        </MliFormCol>
      ))}
    </MliFormRow>
  )
}

export default Navigate;
