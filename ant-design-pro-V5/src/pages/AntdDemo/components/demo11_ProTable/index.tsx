import React, { useRef } from 'react';
import { fetchTableData } from './store/userApi';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form';
import { Space } from 'antd';

const ProTableDemo: React.FC = () => {
  const formRef = useRef<ProFormInstance>(undefined)
  const actionRef = useRef<ActionType>(undefined)
  const momentTW = require('moment-taiwan');

  const genderInd = [
    {
      label: '男',
      value: '1'
    },
    {
      label: '女',
      value: '2'
    }
  ]

  const columns: ProColumns<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'digit',
      search: false,
      hideInTable: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (dom, entity)=> [
        <a onClick={()=>{
          console.log('dom',dom)
          console.log('entity',entity)
        }}>明細</a>
      ]
    },
    {
      title: '姓名',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [
          { required: true, message: '請輸入名稱！' }
        ],
      },
    },
    {
      title: '年齡',
      dataIndex: 'age',
      valueType: 'digit',
      sorter: '1',
      copyable: true
    },
    {
      title: '地址',
      dataIndex: 'address',
      valueType: 'text',
      search: false,
      sorter: '2',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'select',
      fieldProps: {
        placeholder: '請選擇性別',
        options: genderInd
      },
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      valueType: 'date',
      fieldProps: {
        format: (data: any) => momentTW(data, 'YYYY-MM-DD').format('tYY/MM/DD'),
      },
    },
  ];

  // 數據請求函式
  const requestData = async (params: any) => {
    const response = await fetchTableData(params);
    return {
      data: response.data,
      success: true,
      total: response.total,
    };
  }

  return (
    <ProTable
      name="testTable"
      columns={columns}
      formRef={formRef}       // 查詢框 的 欄位變數
      actionRef={actionRef}   // 表格控制的變數實體
      request={requestData}   // 數據請求函式
      rowKey="id"             // 設定 資料唯一值 欄位
      search={{
        labelWidth: 'auto',
      }}
      form={{
        ignoreRules: false,
      }}
      headerTitle="模擬 API 表格"
      toolBarRender={()=>[
        <div>toolBarRender</div>
      ]}
      options={{
        density: true,    // 密度
        fullScreen: true, // 全螢幕
        reload: true,     // 刷新
        setting: true,    // 列設置
        search: true,     // 搜尋欄
      }}
      pagination={{
        showQuickJumper: true
      }}
      rowSelection={{
        selections: true,
        type: 'checkbox',
      }}
      tableAlertRender={({
          selectedRowKeys, // 選取行的key
          selectedRows,    // 選取行的資料
        }) => {
          return (
            <Space size={16}>
              <a onClick={()=>{
                console.log(selectedRowKeys, selectedRows);
              }}>導出數據</a>
            </Space>
          );
      }}
    />
  );
};
export default ProTableDemo;
