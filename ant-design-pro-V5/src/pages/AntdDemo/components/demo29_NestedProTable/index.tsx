import React, { useEffect, useRef, useState } from 'react';
import { ProForm, ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType, ProFormInstance } from '@ant-design/pro-components';
import { Table, Button, message } from 'antd';
import type { FormInstance } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

type Coverage = {
  key: string;
  coverageNo: string;
  planCode: string;
  rateScale: string;
  coStsCode: string;
  coIssueDate: string;
};

type Policy = {
  key: string;
  policyNo: string;
  poStsCode: string;
  poIssueDate: string;
  coverages?: Coverage[];
};

// ✅ 模擬一次取得所有保單 + 保障資料
const fetchAllData = async (): Promise<Policy[]> => {
  await new Promise((res) => setTimeout(res, 300));
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

const policyColumns: ProColumns<Policy>[] = [
  { title: '保單號碼', dataIndex: 'policyNo' },
  { title: '保單狀態', dataIndex: 'poStsCode' },
  { title: '保單生效日', dataIndex: 'poIssueDate', valueType: 'date' },
];

const coverageColumns: ProColumns<Coverage>[] = [
  { title: '保障序號', dataIndex: 'coverageNo' },
  { title: '險種代碼', dataIndex: 'planCode' },
  { title: '險種版數', dataIndex: 'rateScale' },
  { title: '保障狀態', dataIndex: 'coStsCode' },
  { title: '保障生效日', dataIndex: 'coIssueDate', valueType: 'date' },
];

export default () => {
  const [dataSource, setDataSource] = useState<Policy[]>([]);
  const formRef = useRef<ProFormInstance>(undefined)
  const actionRef = useRef<ActionType>(undefined)

  // 取得資料後存進 form
  useEffect(() => {
    fetchAllData().then((data) => {
      setDataSource(data);
      formRef.current?.setFieldsValue({ policies: data });
    });
  }, []);

  // ✅ 導出（從 formRef 拿資料）
  const handleExport = () => {
    const values = formRef.current?.getFieldValue('policies') || [];
    console.log('導出資料：', values);
    message.success('資料已輸出到 console');
  };

  return (
    <ProForm
      formRef={formRef}     // 表單引用，用來從外部讀取資料（如匯出）
      submitter={false}     // 不需要預設的送出按鈕
      layout="vertical"     // 垂直排列標籤與欄位
    >
      <ProTable<Policy>
        rowKey="key"                     // 每筆資料的唯一 key
        actionRef={actionRef}           // 可操作 table，例如重新整理
        columns={policyColumns}         // 主表格的欄位設定（保單）
        dataSource={dataSource}         // 資料來源（來自 API，保存在狀態中）
        search={false}                  // 關閉表格上方的搜尋功能
        pagination={false}              // 關閉分頁，全部資料一次顯示
        expandable={{                   // 開啟可展開行（嵌套子表格）
          expandedRowRender: (record) => (
            // 使用 ProTable 當作子表格，顯示保障項目
            <ProTable<Coverage>
              rowKey="key"              // 每個保障項目的 key
              columns={coverageColumns} // 子表格欄位（保障資料）
              dataSource={record.coverages}  // 子表格資料來自父層的 coverages
              pagination={false}        // 子表格也關閉分頁
              search={false}            // 子表格不需要搜尋
              options={false}           // 子表格不需要右上角設定欄
            />
          ),
        }}
        headerTitle="保單清單"           // 表格上方標題
        toolBarRender={() => [
          // 工具列：顯示一個按鈕，按下會從 formRef 中導出資料
          <Button key="export" icon={<DownloadOutlined />} onClick={handleExport}>
            導出（console）
          </Button>,
        ]}
      />
    </ProForm>
  );
};
