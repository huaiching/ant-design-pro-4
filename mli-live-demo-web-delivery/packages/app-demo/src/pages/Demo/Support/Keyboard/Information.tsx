import { Divider, Typography } from 'antd'

const { Title, Paragraph } = Typography

const KeyboardOperationInfomation: React.FC = () => {

  return (
    <Typography>
      <Title level={3}>快捷鍵</Title>

      <Paragraph>
        本章節提供下列3個快捷鍵作為示範，快捷鍵可於「操作示範」頁籤內使用
      </Paragraph>

      <Paragraph>
        1. Alt + s
        <blockquote>聚焦在第一個欄位上</blockquote>
        2. Enter
        <blockquote>啟用欄位查詢，搜尋符合搜尋欄位的內容</blockquote>
        3. Alt + c
        <blockquote>啟用欄位清除，移除搜尋欄位的內容</blockquote>
      </Paragraph>

      <Divider />

      <Title level={3}>如何設計快捷鍵 ?</Title>
      <Paragraph>
        CSMO前端框架未設置accessKey這個屬性，因此需自行撰寫快捷鍵函數，方式如下 :
      </Paragraph>

      <Paragraph>
        <pre>
          {`
  // 快捷鍵Alt + c，以清除搜尋欄位
  useEffect(() => {
    // 設置鍵盤事件
    const handler = (e: KeyboardEvent) => {

      // 設置鍵盤行為，ALT 與 c 鍵同時按下
      if (e.altKey && e.key.toLowerCase() === 'c') {
        // 關閉鍵盤事件預設行為
        e.preventDefault()

        // 選擇到清除的按鈕
        const button = Array.from(document.querySelectorAll('button')).find(btn => {
          const span = btn.querySelector('span')
          return span?.textContent?.trim() === '清 除'
        })

        // 綁定鍵盤行為與清除的按鈕
        button?.click()
      }
    }
    // 以設置好的鍵盤事件監聽「鍵盤按下」行為
    window.addEventListener('keydown', handler)
    // 移除監聽事件
    return () => window.removeEventListener('keydown', handler)
  }, [])
  `}
        </pre>
      </Paragraph>
      <Divider />
      <Title level={3}>注意事項</Title>
      <Paragraph>
        快捷鍵不得與瀏覽器的快捷鍵產生衝突，否則快捷功能無效
      </Paragraph>
      <Divider />

    </Typography>
  )
}

export default KeyboardOperationInfomation