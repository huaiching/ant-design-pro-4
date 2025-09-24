import { Divider, Typography } from 'antd'

const { Paragraph } = Typography

const EditGuardInfo: React.FC = () => {
  return (
    <Typography>
      <Paragraph>
        本頁面說明如何讓頁面擁有編輯保護模式，可以分成2點來看
      </Paragraph>

      <Paragraph>
        1. 編輯模式
        <br />
        讓頁面在特定條件下觸發編輯模式，可以幫使用者更好的認知現行狀況，以區分正常狀態與編輯模式
      </Paragraph>

      <Divider />

      <Paragraph>
        2. 編輯保護
        <br />
        若使用者意外點選到編輯頁面外，頁面會跳出警示視窗，確保不會中斷使用者的編輯狀態，直到使用者自行取消編輯模式
      </Paragraph>
    </Typography>
  )
}

export default EditGuardInfo