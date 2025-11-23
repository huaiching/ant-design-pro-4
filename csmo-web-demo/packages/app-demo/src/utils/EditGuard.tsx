import { message, Modal } from 'antd'
import { useEffect, useRef } from 'react'

// 保護頁面，點擊選單時，跳出提示
const editGuard = (
  editMode: boolean,
  setEditMode: (v: boolean) => void
) => {
  useEffect(() => {
    // 處理邏輯
    const handler = (event: MouseEvent) => {
      // 非編輯模式，不處理
      if (!editMode) return

      // 編輯頁面的容器
      const target = event.target as Element
      const container = document.querySelector('.ant-pro-layout-container')
      // 若無容器或目標元素，不處理
      if (!container || !target) return

      // 菜單伸縮，不處理
      if (target.closest('.ant-pro-sider-collapsed-button')) return
      // 伸縮菜單子選單，不處理
      if (target.closest('.ant-menu-submenu-title')) return

      // target為頁面左側選單
      const isMenuClick =
        target.closest('.ant-pro-base-menu-inline-item-title') ||   // 左側選單單一項目標題
        target.closest('.ant-layout-sider') ||                      // 左側側邊欄容器
        target.closest('.ant-menu-title') ||                        // 菜單群組標題，點擊可能展開子選單或導航
        target.closest('.ant-menu-item')                            // 菜單子項目，點擊會切換頁面

      // 非左側選單，不處理
      if (!isMenuClick) return

      // 攔截原始點擊
      event.preventDefault()
      event.stopPropagation()

      // 保存原始事件和目標，用於稍後恢復
      const originalTarget = target
      const originalEvent = event

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
        onCancel: () => {
          setEditMode(false)
          // 恢復原本操作
          setTimeout(() => {
            originalTarget.dispatchEvent(
              new MouseEvent(originalEvent.type, originalEvent)
            )
          }, 0)
        },
        maskClosable: false
      })
    }

    // 點擊事件
    document.addEventListener('click', handler, true)
    return () => {
      document.removeEventListener('click', handler, true)
    }
  }, [editMode, setEditMode])
}

export default editGuard
