import React, { useRef, useState } from 'react';
import { ProTable, ActionType, ProColumns, ProCard } from '@ant-design/pro-components';
import { Button, Card, message } from 'antd';
import EditableDetailForm from './components/EditableDetailForm';

interface Policy {
  policyNo: string;
  poStsCode: string;
  basicPlanCode: string;
  basicRateScale: string;
  poIssueDate?: string;
  o1Name?: string;
  i1Name?: string;
  address?: string;
  phone?: string;
  eMail?: string;
}

const ShowPolicyTable: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [dataSource, setDataSource] = useState<Policy[]>([
    {
      policyNo: 'P123456789',
      poStsCode: '有效',
      basicPlanCode: 'A001',
      basicRateScale: 'V1',
      poIssueDate: '2023-01-01',
      o1Name: '王大明',
      i1Name: '王小明',
      address: '台北市信義區',
      phone: '0912345678',
      eMail: 'example@mail.com',
    },
  ]);

  const [editableRow, setEditableRow] = useState<Policy | undefined>();

  const columns: ProColumns<Policy>[] = [
    { title: '保單號碼', dataIndex: 'policyNo' },
    { title: '保單狀態', dataIndex: 'poStsCode' },
    { title: '主約險種代碼', dataIndex: 'basicPlanCode' },
    { title: '主約險種版數', dataIndex: 'basicRateScale' },
  ];

  const handleSave = (updated: Policy) => {
  if (formMode === 'edit') {
      // 修改
      setDataSource((prev) =>
        prev.map((item) => (item.policyNo === updated.policyNo ? updated : item))
      );
      message.success('修改成功');
    } else {
      // 新增
      const newRecord = { ...updated };
      setDataSource((prev) => [...prev, newRecord]);
      message.success('新增成功');
    }
    setEditableRow(undefined);
  };

  return (
    <ProCard ghost>
      <ProTable<Policy>
        columns={columns}
        dataSource={dataSource}
        actionRef={actionRef}
        rowKey="policyNo"
        search={false}
        pagination={false}
        rowClassName={(record) =>
          record.policyNo === editableRow?.policyNo ? 'ant-table-row-selected' : ''
        }
        onRow={(record) => ({
          onClick: () => {
            setEditableRow({ ...record });
            setFormMode('edit');
          },
        })}
        toolbar={{
          title: '保單清單',
          actions: [
            <Button key="new" type="primary"
              onClick={() => {
                setEditableRow({} as Policy);
                setFormMode('create');
              }}>
              新增
            </Button>,
          ],
        }}
      />

      {editableRow && (
        <EditableDetailForm
          mode={formMode}
          initialValues={editableRow}
          onSubmit={handleSave}
          onCancel={() => setEditableRow(undefined)}
        />
      )}
    </ProCard>
  );
};

export default ShowPolicyTable;
