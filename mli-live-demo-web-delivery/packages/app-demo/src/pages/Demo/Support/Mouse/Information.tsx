import { Divider, Typography } from 'antd'

const { Title, Paragraph } = Typography

const Information: React.FC = () => {

  return (
    <Typography>
      <Paragraph></Paragraph>
      <Title level={3}>欄位聚焦</Title>
      <Paragraph>
        以「示範」頁籤的內容為例，若游標懸停至表格某一欄位，其欄位的背景色會轉換成淺灰色

        <blockquote>由MliTable中的rowHoverable控制，預設為true</blockquote>
      </Paragraph>

      <Divider />

      <Title level={3}>提示框</Title>
      <Paragraph>
        以「示範」頁籤的內容為例，若游標懸停至表格某一欄位上的文字，提示框會以黑底白字的方式呈現文字內容
      </Paragraph>
      <Divider />
    </Typography>
  )
}

export default Information