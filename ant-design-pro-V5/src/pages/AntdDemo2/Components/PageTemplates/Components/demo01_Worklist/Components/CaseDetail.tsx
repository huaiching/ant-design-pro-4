import React, { useEffect, useMemo, useState } from 'react';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Input, message } from 'antd';
import { ToolOutlined } from '@ant-design/icons';

interface Props {
  caseType: string;
}

// 模擬資料產生函式，移除不必要的 key 欄位
const generateDetails = (type: string) =>
  Array.from({ length: 5 }, (_, i) => ({
    policyNo: `PL${10000 + i}`,
    receiveNo: `RC${20000 + i}`,           // 唯一識別碼
    receiveDate: `114/08/${10 + i}`,
    ownerName: `王小明 ${i}`,
    accessUser: `處理人 ${i}`,
  }));

const CaseDetail: React.FC<Props> = ({ caseType }) => {
  const [data, setData] = useState<any[]>([]); // 初始化為空陣列

  useEffect(() => {
    const fetchData = () => {
      const details = generateDetails(caseType);
      setData(details);
    };

    fetchData(); // 初始化資料
    const interval = setInterval(fetchData, 60000); // 每 60 秒刷新
    return () => clearInterval(interval);
  }, [caseType]);

  
  const [searchText, setSearchText] = useState('')             // 快速搜尋輸入文字狀態
  // 利用 useMemo 篩選 data ，依 searchText 過濾資料，避免每次渲染都重複計算
  const filteredData = useMemo(() => {
    if (!searchText) return data
    // 將 搜尋文字 轉為 小寫
    const lowerSearch = searchText.toLowerCase()
    // 過濾資料，將原始資料 轉為小寫 後 進行比較
    return data.filter((item) =>
      item.policyNo?.toLowerCase().includes(lowerSearch)    ||
      item.receiveNo?.toLowerCase().includes(lowerSearch)   ||
      item.receiveDate?.toLowerCase().includes(lowerSearch) ||
      item.ownerName?.toLowerCase().includes(lowerSearch)   ||
      item.accessUser?.toLowerCase().includes(lowerSearch)
    )
  }, [searchText, data])
  

  const columns: ProColumns[] = [
    {
      title: '保單號碼',
      dataIndex: 'policyNo',
      valueType: 'text'
    },
    {
      title: '受理號碼',
      dataIndex: 'receiveNo',
      valueType: 'text'
    },
    {
      title: '受理日期',
      dataIndex: 'receiveDate',
      valueType: 'text'
    },
    {
      title: '要保人',
      dataIndex: 'ownerName',
      valueType: 'text'
    },
    {
      title: '承辦人',
      dataIndex: 'accessUser',
      valueType: 'text'
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => (
        <Button
          icon={<ToolOutlined />}
          onClick={() => {
            message.info(`處理此案件(${record.receiveNo})`);
          }}
        />
      ),
    },
  ];

  return (
    <ProTable
      rowKey="receiveNo"                     // 唯一識別欄位為 receiveNo
      headerTitle={`案件類型：${caseType}`}   // 顯示當前案件類型
      size="small"                           // 表格顯示為小尺寸
      search={false}                         // 關閉搜尋框
      options={false}                        // 關閉選單
      pagination={{ pageSize: 5 }}           // 每頁 5 筆
      dataSource={data}                      // 表格數據來源
      columns={columns}                      // 欄位資料
      toolBarRender={() => [
        <Input
          key='search'
          placeholder="快速搜尋"
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      ]}
    />
  );
};

export default CaseDetail;
