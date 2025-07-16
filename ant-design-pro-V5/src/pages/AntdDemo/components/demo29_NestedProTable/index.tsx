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
      formRef={formRef}
      submitter={false}
      layout="vertical"
    >
      <ProTable<Policy>
        rowKey="key"
        actionRef={actionRef}
        columns={policyColumns}
        dataSource={dataSource}
        search={false}
        pagination={false}
        expandable={{
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
          <Button key="export" icon={<DownloadOutlined />} onClick={handleExport}>
            導出（console）
          </Button>,
        ]}
      />
    </ProForm>
  );
};
