import React from 'react';
import { List } from 'antd';
import ProCard from '@ant-design/pro-card';

const App: React.FC = () => {
  const data = [
    {
      nbErrCode: 'VA14',
      nbErrDesc: '購買投資型保單須填委託結匯額度查詢暨結匯授權書',
      severity: '0',
    },
    {
      nbErrCode: 'PV76',
      nbErrDesc: '本保單無申請「投資標的停利機制及約定交易批註條款」',
      severity: '0',
    },
    {
      nbErrCode: 'UA53',
      nbErrDesc: '要保日晚於險種停售日',
      severity: '0',
    },
    {
      nbErrCode: 'P232',
      nbErrDesc: '需填寫「實支實付型商品特別提醒事項聲明書」',
      severity: '0',
    },
  ];

  return (
    <ProCard title='核保訊息'>
      <List
        itemLayout="horizontal"   // 布局:  horizontal (水平) (預設) | vertical (垂直)
        dataSource={data}         // 資料來源
        pagination ={{            // 開啟分頁設定
          position: 'bottom',      // 分頁切換位置: top | bottom
          pageSize: 5              // 每頁顯示的筆數
        }}
        renderItem={(item) => (   // 自定義畫面渲染
          <List.Item>
            <List.Item.Meta
              title={item.nbErrCode}          // 標題
              description={item.nbErrDesc}    // 內文
            />
            <h3>{`等級：${item.severity}`}</h3>
          </List.Item>
        )}
      />
    </ProCard>
  )
}
export default App;
