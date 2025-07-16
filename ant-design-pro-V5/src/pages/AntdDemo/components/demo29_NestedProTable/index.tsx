import React, { useEffect, useRef, useState } from 'react';
import { ProForm, ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType, ProFormInstance } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import type { FormInstance } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

// 保障項目資料型別
type Coverage = {
  key: string;
  coverageNo: string;
  planCode: string;
  rateScale: string;
  coStsCode: string;
  coIssueDate: string;
};

// 保單資料型別
type Policy = {
  key: string;
  policyNo: string;
  poStsCode: string;
  poIssueDate: string;
  coverages?: Coverage[]; // 子資料：保障清單
};

// 模擬 API：一次取得所有保單與保障資料
const fetchAllData = async (): Promise<Policy[]> => {
  await new Promise((res) => setTimeout(res, 300)); // 模擬延遲
  return [
    {
      key: '1',
      policyNo: 'P20250716001',
      poStsCode: '有效',
      poIssueDate: '2025-01-01',
      coverages: [
        {
          key: '1-1',
          coverageNo: 'C001',
          planCode: 'A1',
          rateScale: '01',
          coStsCode: '有效',
          coIssueDate: '2025-01-01',
        },
        {
          key: '1-2',
          coverageNo: 'C002',
          planCode: 'B2',
          rateScale: '02',
          coStsCode: '失效',
          coIssueDate: '2025-03-01',
        },
      ],
    },
    {
      key: '2',
      policyNo: 'P20250716002',
      poStsCode: '失效',
      poIssueDate: '2024-12-20',
      coverages: [
        {
          key: '2-1',
          coverageNo: 'C003',
          planCode: 'C3',
          rateScale: '01',
          coStsCode: '有效',
          coIssueDate: '2024-12-20',
        },
      ],
    },
  ];
};

// 主表格欄位（保單）
const policyColumns: ProColumns<Policy>[] = [
  { title: '保單號碼', dataIndex: 'policyNo' },
  { title: '保單狀態', dataIndex: 'poStsCode' },
  { title: '保單生效日', dataIndex: 'poIssueDate', valueType: 'date' },
];

// 子表格欄位（保障清單）
const coverageColumns: ProColumns<Coverage>[] = [
  { title: '保障序號', dataIndex: 'coverageNo' },
  { title: '險種代碼', dataIndex: 'planCode' },
  { title: '險種版數', dataIndex: 'rateScale' },
  { title: '保障狀態', dataIndex: 'coStsCode' },
  { title: '保障生效日', dataIndex: 'coIssueDate', valueType: 'date' },
];

export default () => {
  const formRef = useRef<ProFormInstance>(undefined)    // 表單參照，讀取/寫入資料
  const actionRef = useRef<ActionType>(undefined)       // 表格操作引用（如 reload）
  const [dataSource, setDataSource] = useState<Policy[]>([]);  // 主表資料
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // 勾選中的保單 key

  // ✅ 頁面初始化：取得資料並設定到 form 與畫面
  useEffect(() => {
    fetchAllData().then((data) => {
      setDataSource(data);                                 // 給 table 顯示
      formRef.current?.setFieldsValue({ policies: data }); // 存入 form 中
    });
  }, []);

  // ✅ 導出按鈕事件：從 formRef 中取得 policies，再過濾出勾選的
  const handleExport = () => {
    const allData: Policy[] = formRef.current?.getFieldValue('policies') || [];
    const selectedData = allData.filter((item) => selectedRowKeys.includes(item.key));
    console.log('✅ 勾選導出資料：', selectedData);
    message.success(`已導出 ${selectedData.length} 筆資料到 console`);
  };

  return (
    <ProForm
      formRef={formRef}       // 表單參考對象（可透過 get/set 取值）
      submitter={false}       // 不顯示提交按鈕
      layout="vertical"       // 垂直排列表單項目
    >
      <ProTable<Policy>
        rowKey="key"                  // 每筆唯一 key
        actionRef={actionRef}        // 表格操作參考
        columns={policyColumns}      // 表格欄位
        dataSource={dataSource}      // 表格資料
        search={false}               // 關閉搜尋欄
        pagination={false}           // 關閉分頁
        rowSelection={{              // ✅ 開啟勾選功能
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
        expandable={{                // ✅ 展開子表格
          expandedRowRender: (record) => (
            <ProTable<Coverage>
              rowKey="key"
              columns={coverageColumns}
              dataSource={record.coverages}
              pagination={false}
              search={false}
              options={false}
            />
          ),
        }}
        headerTitle="保單清單"
        toolBarRender={() => [
          <Button
            key="export"
            icon={<DownloadOutlined />}
            onClick={handleExport}
            disabled={selectedRowKeys.length === 0} // 沒選資料就停用按鈕
          >
            導出勾選（console）
          </Button>,
        ]}
      />
    </ProForm>
  );
};
