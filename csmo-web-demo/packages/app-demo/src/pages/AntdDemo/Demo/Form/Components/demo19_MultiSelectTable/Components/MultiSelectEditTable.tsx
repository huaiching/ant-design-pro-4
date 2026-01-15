import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  EditableProTable,
  ProColumns,
  ProForm,
  ProFormInstance,
} from '@ant-design/pro-components';
import { AutoComplete, Button, message, Popconfirm, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

interface OptionData {
  code: string;
  [key: string]: any;
}

interface Props {
  /** 下拉選單的來源資料，第一個欄位必須是 code */
  optionsData: OptionData[];

  /** ProForm.Item 的標籤文字 */
  label: string;

  /** 對應 ProForm.Item 的欄位名稱 */
  name: string;

  /** 表格欄位設定（除了操作欄）。請在這裡設定哪些欄位可編輯 */
  column: any[]

  /** AutoComplete 的 placeholder */
  placeholder?: string;

  /** 外部 ProForm 的 formRef，用於值同步 */
  formRef?: React.MutableRefObject<ProFormInstance | undefined>;

  /** 是否必填 */
  required?: boolean;

  /** 按鈕類型，true 表示顯示新增按鈕，false 表示不顯示 */
  buttonType?: true | false

  /** 資料異動回調 */
  onChange?: (value: any[]) => void;

  /** 自訂驗證 */
  validator?: (value: any[]) => Promise<void>;
}

const MultiSelectEditTable: React.FC<Props> = ({
  optionsData,
  label,
  name,
  column: customColumns,
  placeholder = '請選擇',
  formRef,
  required = false,
  buttonType = false,
  onChange,
  validator,
}) => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);

  // 從外部 form 同步初始值
  useEffect(() => {
    if (!formRef?.current) return;
    const value = formRef.current.getFieldValue(name);
    const arrayValue = Array.isArray(value) ? value : [];
    setDataSource(arrayValue);
    setEditableKeys(arrayValue.map((item) => item.code));
  }, [formRef?.current]);

  // 當 dataSource 改變時，同步到 ProForm 與外部 onChange
  const syncToForm = (newData: any[]) => {
    setDataSource(newData);
    setEditableKeys(newData.map((item) => item.code));
    formRef?.current?.setFieldValue(name, newData);
    onChange?.(newData);
  };

  /** 新增資料 */
  const handleAdd = (currentInput: string) => {
    const found = optionsData.find((item) => Object.values(item).join(' ') === currentInput)

    if (!found) {
      message.error('找不到對應的資料');
      return;
    }

    if (dataSource.some((item) => item.code === found.code)) {
      message.warning('資料已存在');
      setInputValue('');
      return;
    }

    // 新增一筆，所有欄位預設為「可編輯」狀態
    const newRecord = { ...found };
    const newData = [...dataSource, newRecord];
    syncToForm(newData);
    setInputValue('');
  };

  /** 刪除資料 */
  const handleDelete = (code: string) => {
    const newData = dataSource.filter((item) => item.code !== code);
    syncToForm(newData);
  };

  /** AutoComplete 選項（排除已選） */
  const autoOptions = optionsData
    .filter((item) => !dataSource.some((sel) => sel.code === item.code))
    .map((item) => ({
      value: Object.values(item).join(' '),
    }));

  /** 完整的表格欄位：操作欄 + 自訂欄位 */
  const tableColumns: ProColumns<any>[] = [
    {
      title: '操作',
      valueType: 'option',
      width: 60,
      align: 'center',
    },
    ...customColumns,
  ];

  /** 表單驗證規則 */
  const rules = [
    ...(required
      ? [
        {
          validator: async (_: any, value: any[]) => {
            if (!value || value.length === 0) {
              return Promise.reject(`${label} 為必填欄位`);
            }
          },
        },
      ]
      : []),
    ...(validator
      ? [
        {
          validator: async (_: any, value: any[]) => validator(value),
        },
      ]
      : []),
  ];

  return (
    <ProForm.Item label={label} name={name} rules={rules} required={required}>
      <Space.Compact style={{ width: '100%' }}>
        <AutoComplete
          options={autoOptions}
          value={inputValue}
          placeholder={placeholder}
          onChange={(value) => {
             setInputValue(value)
            if (!buttonType) {
              handleAdd(value)
            }
          }}
        />
        {buttonType && (
          <Button color="primary" variant="filled" icon={<PlusOutlined />} onClick={() => handleAdd(inputValue)} />
        )}
      </Space.Compact>

      {dataSource.length > 0 &&
        <EditableProTable
          rowKey="code"
          columns={tableColumns}
          value={dataSource}
          size="small"
          controlled // 重要：讓我們自己控制 dataSource 與 editableKeys
          recordCreatorProps={false} // 不允許底部新增
          search={false}
          pagination={false}
          options={false}
          toolBarRender={false}
          bordered
          editable={{
            type: 'multiple',
            editableKeys,
            onChange: setEditableKeys,
            onValuesChange: (changedRecord, newDataSource) => {
              syncToForm(newDataSource);
            },
            actionRender: (row) => {
              return [
                <Popconfirm
                  key="delete"
                  title="確定刪除嗎？"
                  onConfirm={() => handleDelete(row.code)}
                >
                  <DeleteOutlined style={{ color: 'red' }} />
                </Popconfirm>,
              ];
            },
          }}
        />
      }
    </ProForm.Item>
  );
};

export default MultiSelectEditTable;