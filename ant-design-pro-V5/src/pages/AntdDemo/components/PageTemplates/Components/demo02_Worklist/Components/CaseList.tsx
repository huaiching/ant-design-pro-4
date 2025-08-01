import React, { useEffect, useState } from 'react';
import { ProColumns, ProTable } from '@ant-design/pro-components';

// 案件項目資料型別定義
export interface CaseItem {
  caseType: string;   // 案件類型（例如：進件、承辦中等）
  caseCount: number;  // 對應案件數量
}

// 元件接收的 props：用於傳回點選的案件類型
interface Props {
  onSelectType: (type: string) => void;  // 點擊列時呼叫此方法
  selectedType: string | null;           // 目前選中的案件類型（用來做反白效果）
}

// 預設的案件類型列表(假資料使用)
const caseTypes = ['進件', '承辦中', '照會', '變更完成'];

// 模擬產生資料（每個類型隨機產生數量）
const generateData = (): CaseItem[] =>
  caseTypes.map((type) => ({
    caseType: type,
    caseCount: Math.floor(Math.random() * 20) + 1, // 隨機數量 1~20
  }));

// 案件清單元件
const CaseList: React.FC<Props> = ({ onSelectType, selectedType }) => {
  const [data, setData] = useState<CaseItem[]>([]);

  // 使用 useEffect 負責初始化資料 + 每 10 秒更新資料
  useEffect(() => {
    const fetchData = () => {
      const result = generateData(); // 可換成 API 呼叫
      setData(result);
    };

    fetchData(); // 初始化時執行一次

    const interval = setInterval(() => {
      fetchData(); // 每 10 秒更新一次
    }, 10000);

    return () => clearInterval(interval); // 離開時清除定時器
  }, []);

  // 表格欄位定義
  const columns: ProColumns<CaseItem>[] = [
    {
      title: '案件類型',
      dataIndex: 'caseType',
      valueType: 'text',
    },
    {
      title: '案件數量',
      dataIndex: 'caseCount',
      valueType: 'digit', 
    },
  ];

  return (
    <ProTable<CaseItem>
      rowKey="caseType"             // 唯一 key 為案件類型
      size="small"                  // 表格顯示為小尺寸
      columns={columns}             // 欄位資料
      dataSource={data}             // 表格數據來源
      search={false}                // 關閉內建搜尋欄
      pagination={false}            // 關閉分頁（全部顯示）
      toolBarRender={false}         // 關閉工具欄
      options={false}               // 不顯示設定等功能選單
        // 點擊行時的事件處理
      onRow={(record) => ({
        onClick: () => onSelectType(record.caseType),
      })}
        // 選中行 設定為 反白背景
      rowClassName={(record) =>
        selectedType === record.caseType ? 'ant-table-row-selected' : ''
      }
    />
  );
};

export default CaseList;
