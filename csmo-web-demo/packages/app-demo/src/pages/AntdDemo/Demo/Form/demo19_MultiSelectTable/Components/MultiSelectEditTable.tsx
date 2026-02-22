import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  EditableProTable,
  ProColumns,
  ProForm,
  ProFormInstance,
} from '@ant-design/pro-components';
import { AutoComplete, Button, message, Popconfirm, Space, Form } from 'antd';
import React, { useEffect, useState } from 'react';

// 定義選項資料的型別（來自下拉選單的資料，第一個欄位必須是 code）
interface OptionData {
  code: string;
  [key: string]: any;
}

// 元件 Props 定義
interface Props {
  optionsData: OptionData[];                    // 下拉選單的來源資料
  label: string;                                // ProForm.Item 的標籤文字
  name: string;                                 // 對應 ProForm.Item 的欄位名稱（用來儲存陣列資料）
  column: any[];                                // 自訂表格欄位設定（除了操作欄）
  placeholder?: string;                         // AutoComplete 的 placeholder
  formRef?: React.MutableRefObject<ProFormInstance | undefined>; // 外部 ProForm 的 formRef，用於同步值
  required?: boolean;                           // 是否必填
  buttonType?: boolean;                         // true = 顯示「+」新增按鈕，false = 直接選取就新增
  onChange?: (value: any[]) => void;            // 資料變更時的外部回調
  validator?: (value: any[]) => Promise<void>;  // 自訂整體驗證規則（如最多 3 筆）
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
  // 表格顯示的資料來源（陣列）
  const [dataSource, setDataSource] = useState<any[]>([]);
  
  // AutoComplete 目前輸入的值
  const [inputValue, setInputValue] = useState('');
  
  // 目前處於編輯狀態的行 key（code）
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);

  // 建立一個獨立的 Ant Design Form 實例，專門給 EditableProTable 使用
  // 這讓我們可以手動觸發表格內所有欄位的驗證規則（包含 columns 中的 formItemProps.rules）
  const [internalForm] = Form.useForm();

  // 從外部 ProForm 同步初始值（如果外部有預設值）
  useEffect(() => {
    if (!formRef?.current) return;
    const value = formRef.current.getFieldValue(name);
    const arrayValue = Array.isArray(value) ? value : [];
    setDataSource(arrayValue);
    setEditableKeys(arrayValue.map((item) => item.code));
  }, [formRef?.current, name]);

  // 當資料變更時，同步到外部 ProForm 與 onChange 回調
  const syncToForm = (newData: any[]) => {
    setDataSource(newData);
    setEditableKeys(newData.map((item) => item.code));
    formRef?.current?.setFieldValue(name, newData);
    onChange?.(newData);
  };

  // 處理新增一筆資料（從 AutoComplete 選取或按鈕）
  const handleAdd = (currentInput: string) => {
    // 根據輸入文字找到對應的完整資料
    const found = optionsData.find((item) => Object.values(item).join(' ') === currentInput);
    if (!found) {
      message.error('找不到對應的資料');
      return;
    }

    // 避免重複加入相同 code
    if (dataSource.some((item) => item.code === found.code)) {
      message.warning('資料已存在');
      setInputValue('');
      return;
    }

    const newRecord = { ...found };
    const newData = [...dataSource, newRecord];
    syncToForm(newData);
    setInputValue('');
  };

  // 刪除單筆資料
  const handleDelete = (code: string) => {
    const newData = dataSource.filter((item) => item.code !== code);
    syncToForm(newData);
  };

  // AutoComplete 的選項（自動過濾已選的項目）
  const autoOptions = optionsData
    .filter((item) => !dataSource.some((sel) => sel.code === item.code))
    .map((item) => ({
      value: Object.values(item).join(' '), // 顯示所有欄位文字，方便搜尋
    }));

  // 表格完整欄位設定：操作欄 + 使用者自訂欄位
  const tableColumns: ProColumns<any>[] = [
    {
      title: '操作',
      valueType: 'option',
      width: 60,
      align: 'center',
    },
    ...customColumns,
  ];

  // 外層 ProForm.Item 的驗證規則（多條合併）
  const rules = [
    // 1. 如果輸入框還有文字但沒按新增，禁止送出
    ...(inputValue.length > 0
      ? [{ validator: async () => Promise.reject('選擇後，請點擊新增按鈕') }]
      : []),

    // 2. 整體必填檢查
    ...(required
      ? [{
          validator: async (_: any, value: any[]) => {
            if (!value || value.length === 0) {
              return Promise.reject(`${label} 為必填欄位`);
            }
            return Promise.resolve();
          },
        }]
      : []),

    // 3. 使用者自訂驗證器（例如最多 3 筆）
    ...(validator
      ? [{ validator: async (_: any, value: any[]) => validator(value) }]
      : []),

    // 4. 關鍵：觸發表格內部所有欄位的驗證規則（包含 columns 中的 required、pattern 等）
    {
      validator: async (_: any, tableData: any[]) => {
        if (!tableData?.length) return Promise.resolve();

        try {
          // 強制驗證所有欄位（即使沒焦點過的欄位也檢查）
          await internalForm.validateFields();
          return Promise.resolve();
        } catch (errorInfo: any) {
          // 錯誤訊息更具體，顯示錯誤數量
          const errorCount = errorInfo.errorFields?.length || 0;
          console.log('表格驗證錯誤：', errorInfo);
          return Promise.reject(
            `表格內有 ${errorCount} 個欄位未正確填寫`
          );
        }
      },
    },
  ];

  return (
    <ProForm.Item label={label} name={name} rules={rules} required={required}>
      {/* 上方的 AutoComplete + 新增按鈕 */}
      <Space.Compact style={{ width: '100%' }}>
        <AutoComplete
          options={autoOptions}
          value={inputValue}
          placeholder={placeholder}
          onChange={(value) => {
            setInputValue(value);
            if (!buttonType) {
              handleAdd(value); // 無按鈕模式：選取後直接新增
            }
          }}
        />
        {buttonType && (
          <Button
            color="primary"
            variant="filled"
            icon={<PlusOutlined />}
            onClick={() => handleAdd(inputValue)} // 有按鈕模式：點擊才新增
          />
        )}
      </Space.Compact>

      {/* 當有資料時才顯示表格 */}
      {dataSource.length > 0 && (
        <EditableProTable
          rowKey="code"
          columns={tableColumns}
          value={dataSource}
          size="small"
          controlled // 使用 controlled 模式，讓我們自己完全控制資料
          recordCreatorProps={false} // 禁用底部新增按鈕
          search={false}
          pagination={false}
          options={false}
          toolBarRender={false}
          editable={{
            type: 'multiple', // 支援多行同時編輯
            editableKeys,
            onChange: setEditableKeys,
            onValuesChange: (changedRecord, newDataSource) => {
              syncToForm(newDataSource);
              // 這裡可以加即時驗證（選填）
              setTimeout(() => internalForm.validateFields().catch(() => {}), 300);
            },
            actionRender: (row) => [
              <Popconfirm
                key="delete"
                title="確定刪除嗎？"
                onConfirm={() => handleDelete(row.code)}
              >
                <DeleteOutlined style={{ color: 'red' }} />
              </Popconfirm>,
            ],
            // 關鍵：把內部 Form 實例傳入，讓所有 cell 的 Form.Item 共用同一個 form
            form: internalForm,
          }}
        />
      )}
    </ProForm.Item>
  );
};

export default MultiSelectEditTable;