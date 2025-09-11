import { Modal } from 'antd'
import { useEffect, useRef } from 'react'

// 保護頁面，點擊選單時，跳出提示
const editGuard = (
  editMode: boolean,
  setEditMode: (v: boolean) => void
) => {
  // 監控 Model 是否開啟，因為要避免 Model 重複打開
  const isModalOpenRef = useRef(false)

  useEffect(() => {
    // Ant Design的Element
    const isAntDeisgnFloatingLayer = (element: Element | null) =>
      !!element?.closest(
        '.ant-select-dropdown, .ant-picker-dropdown, .ant-dropdown, .ant-modal, .ant-popover, .ant-tooltip'
      )

    // 處理邏輯
    const handler = (event: MouseEvent) => {
      // 在編輯的話，跳出邏輯
      if (!editMode) {
        return
      }

      // 編輯頁面的容器
      const container = document.querySelector('.ant-pro-layout-container')
      const target = event.target as Element
      // 如果是在頁面的容器，跳出邏輯
      if (!container || !target) {
        return
      }

      // 菜單伸縮，跳出邏輯
      if (target.closest('.ant-pro-sider-collapsed-button')) return
      // 伸縮菜單子選單，跳出邏輯
      if (target.closest('.ant-menu-submenu-title')) return
      // 按鈕，跳出邏輯
      if (target.closest('button')) return

      // target為頁面左邊的選單
      const isMenuClick =
        target.closest('.ant-pro-base-menu-inline-item-title') ||   // 左側選單單一項目標題
        target.closest('.ant-layout-sider') ||                      // 左側側邊欄容器
        target.closest('.ant-menu-title') ||                        // 菜單群組標題，點擊可能展開子選單或導航
        target.closest('.ant-menu-item')                            // 菜單子項目，點擊會切換頁面

      // 點選到左邊選單
      const shouldIntercept =
        !container.contains(target) || isMenuClick

      // 不是點選到左邊選單 或 左邊選單開啟子選單，跳出邏輯
      if (!shouldIntercept || isAntDeisgnFloatingLayer(target)) {
        return
      }

      // 攔截原始點擊
      event.preventDefault()
      event.stopPropagation()

      // 保存原始事件和目標，用於稍後恢復
      const originalTarget = target
      const originalEvent = event

      if (!isModalOpenRef.current) {
        isModalOpenRef.current = true
        // 跳出警示
        Modal.confirm({
          title: '確定要離開？',
          content: '未儲存的修改將會遺失',
          okText: '繼續作業',
          cancelText: '離開',
          cancelButtonProps: {
            danger: true,
            variant: 'outlined'
          },
          onOk: () => {
            isModalOpenRef.current = false
          },
          onCancel: () => {
            isModalOpenRef.current = false
            setEditMode(false)
            // 恢復原本操作
            setTimeout(() => {
              originalTarget.dispatchEvent(
                new MouseEvent(originalEvent.type, originalEvent)
              )
            }, 0)
          },
          maskClosable: true
        })
      }
    }

    // 點擊事件
    document.addEventListener('click', handler, true)
    return () => {
      document.removeEventListener('click', handler, true)
    }
  }, [editMode, setEditMode])
}

export default editGuard
