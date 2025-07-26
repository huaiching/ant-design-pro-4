import React from 'react';
import { Descriptions, Card, DescriptionsProps } from 'antd';
import dayjs from 'dayjs';
import { ProCard } from '@ant-design/pro-components';

// 民國年格式化
const formatROC = (dateStr: string) => {
  const date = dayjs(dateStr);
  const rocYear = (date.year() - 1911).toString().padStart(3, '0');
  return `${rocYear}/${date.format('MM/DD')}`;
};

// 模擬資料
const userInfo = {
  name: '王小明',
  gender: '男',
  age: 28,
  birthday: '2024-01-10',
  address: '台北市內湖區石潭路58號6樓',
};

// 使用 DescriptionsProps['items'] 定義欄位
const items: DescriptionsProps['items'] = [
  {
    key: 'name',
    label: '姓名',
    children: userInfo.name,
    span: 1,
  },
  {
    key: 'gender',
    label: '性別',
    children: userInfo.gender,
    span: 1,
  },
  {
    key: 'age',
    label: '年齡',
    children: userInfo.age,
    span: 1,
  },
  {
    key: 'birthday',
    label: '生日',
    children: formatROC(userInfo.birthday),
    span: 1,
  },
  {
    key: 'address',
    label: '地址',
    children: userInfo.address,
    span: 2,
  },
];

const DescriptionPage: React.FC = () => {
  return (
    <>
        <ProCard title="個人資料明細 (無邊框)" ghost>
        <Descriptions
            title="基本資料"  // 整體區塊標題
            column={2}         // 一列顯示兩個欄位
            items={items}      // 欄位資料來源
            layout='horizontal' // 排列方式: horizontal.水平(預設) / vertical.垂直
        />
        </ProCard>

        <br/>

        <ProCard title="個人資料明細 (有邊框)" ghost>
        <Descriptions
            title="基本資料"  // 整體區塊標題
            bordered           // 顯示邊框
            column={2}         // 一列顯示的欄位數量
            items={items}      // 欄位資料來源
            layout='horizontal' // 排列方式: horizontal.水平(預設) / vertical.垂直
        />
        </ProCard>
    </>
  );
};

export default DescriptionPage;
