import { Modal } from 'antd';
import { useEffect } from 'react';

// 保護頁面，點擊選單時，跳出提示
const editGuard = (
  editMode: boolean,
  setEditMode: (v: boolean) => void
) => {
  useEffect(() => {
    // Ant Design的Element
    const isAntDeisgnFloatingLayer = (element: Element | null) =>
      !!element?.closest(
        '.ant-select-dropdown, .ant-picker-dropdown, .ant-dropdown, .ant-modal, .ant-popover, .ant-tooltip'
      );

    // 選擇到特定的button
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const button = target.closest('button');

      if (button && button.innerText.trim() === '新增一行資料') {
        setEditMode(true);
      }
    };

    // 處理邏輯
    const handler = (event: MouseEvent) => {
      // 在編輯的話，跳出邏輯
      if (!editMode) {
        return;
      }

      // 編輯頁面的容器
      const container = document.querySelector('.ant-pro-layout-container');
      const target = event.target as Element;
      // 如果是在頁面的容器，跳出邏輯
      if (!container || !target) {
        return;
      }

      // target為頁面左邊的選單
      const isMenuClick =
        target.closest('.ant-pro-base-menu-inline-item-title') ||
        target.closest('.ant-layout-sider') ||
        target.closest('.ant-menu-title') ||
        target.closest('.ant-menu-item');

      // target為頁籤
      const isTabClick = target.closest('.ant-tabs-tab')

      const isModalClick = target.closest('.ant-modal-content')

      // 點選到左邊選單的話
      const shouldIntercept =
        !container.contains(target) || isMenuClick || isTabClick || !isModalClick;

      // 如果點選到左邊選單的話，跳出邏輯
      if (!shouldIntercept || isAntDeisgnFloatingLayer(target)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      // 跳出警示
      Modal.confirm({
        title: '你確定離開編輯模式？',
        content: '未儲存的修改將會遺失',
        okText: '繼續編輯',
        cancelText: '結束編輯',
        cancelButtonProps: {
          danger: true,
          variant: 'outlined'
        },
        onCancel: () => {
          setEditMode(false);
        },
        maskClosable: true
      });
    };

    // 點擊事件
    document.addEventListener('click', handler, true);
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handler, true);
      document.removeEventListener('click', handleClick, true);
    };
  }, [editMode, setEditMode]);
};

export default editGuard;