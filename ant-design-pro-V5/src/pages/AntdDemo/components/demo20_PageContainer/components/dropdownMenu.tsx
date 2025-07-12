import { Menu } from 'antd';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DropdownMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuClick = (info: any) => {
    let url = location.pathname;

    if (info.key === '1') {
      url += '?activeKey=ProFormText';
    }
    if (info.key === '2') {
      url += '?activeKey=ProFormSelect';
    }

    // 打開新視窗
    window.open(url, '_blank');
  };

  return (
    <Menu onClick={menuClick}>
      <Menu.Item key="1">單行文本輸入</Menu.Item>
      <Menu.Item key="2">下拉選擇框</Menu.Item>
    </Menu>
  );
};

export default DropdownMenu;
