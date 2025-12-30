import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef, TableProps } from 'antd';
import { Form, Input, Popconfirm, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './index.css'

// Ant Design v5 中取得 Form Instance 的正確型別
type FormInstance<T> = GetRef<typeof Form<T>>;

// 用來在 EditableCell 中存取當前 row 的 Form 實例
const EditableContext = React.createContext<FormInstance<any> | null>(null);

// 資料結構（原本的 Item，僅用在 EditableCell 型別定義）
interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

// 可編輯 Row 元件：每筆資料的 <tr> 都會被包在一層 Form 內
interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm(); // 為每一行建立獨立的 Form
  return (
    <Form form={form} component={false}> {/* component={false} 不渲染多餘 DOM */}
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

// 可編輯 Cell 元件屬性
interface EditableCellProps {
  title: React.ReactNode;     // 欄位標題（用於驗證訊息）
  editable: boolean;          // 是否允許編輯
  dataIndex: keyof Item;      // 對應資料欄位名稱
  record: Item;               // 當前整筆資料
  handleSave: (record: Item) => void; // 儲存編輯後的回呼
}

// 可編輯儲存格實作
const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false); // 是否處於編輯狀態
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!; // 取得當前行 Form

  // 進入編輯模式時自動聚焦輸入框
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  // 切換編輯／顯示模式，並將目前值填入 Form
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  // 儲存編輯內容（Enter 或失焦時觸發）
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit(); // 離開編輯模式
      handleSave({ ...record, ...values }); // 合併新值後回傳
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  // 若該欄位可編輯
  if (editable) {
    childNode = editing ? (
      // 編輯狀態：顯示 Input 並綁定 Form.Item 驗證
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} 是必填欄位` }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      // 顯示狀態：點擊可進入編輯
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

// Table 資料型別（實際使用）
interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
}

// 取出 Table columns 的正確型別（排除 undefined）
type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

const App: React.FC = () => {
  // 資料來源
  const [dataSource, setDataSource] = useState<DataType[]>([
    { key: '0', name: '澤村榮純', age: '32', address: '日本' },
    { key: '1', name: '茂野吾郎', age: '40', address: '日本' },
  ]);

  // 基礎欄位定義（加入自訂 editable 屬性）
  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: '操作',
      dataIndex: 'option',
      width: 60,
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="確定刪除嗎？"
            onConfirm={() => {
              // 刪除該筆資料
              const newData = dataSource.filter((item) => item.key !== record.key);
              setDataSource(newData);
            }}
          >
            <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: 16 }} />
          </Popconfirm>
        ) : null,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: '年齡',
      dataIndex: 'age',
      editable: true,
    },
    {
      title: '地址',
      dataIndex: 'address',
      editable: true,
    },
  ];

  // 編輯儲存邏輯：找到對應資料並更新
  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    newData.splice(index, 1, { ...newData[index], ...row });
    setDataSource(newData);
  };

  // 自訂 components：替換 Table 的 row 與 cell
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  // 為可編輯欄位加上 onCell（傳入必要 props 給 EditableCell）
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Table<DataType>
        components={components}
        rowClassName={() => 'editable-row'} // 可自行加入 hover 樣式
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes} // 型別斷言（此寫法在 AntD v5 常見）
        pagination={false}
      />
    </div>
  );
};

export default App;