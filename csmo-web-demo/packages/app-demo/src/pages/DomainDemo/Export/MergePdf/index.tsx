import CodeJava from "@/utils/CodePre/CodeJava"
import CodeXML from "@/utils/CodePre/CodeXML"
import { PageContainer } from "@ant-design/pro-components"
import { Table, Typography } from "antd"

const { Title, Paragraph } = Typography

const MergePdf: React.FC = () => {
  return (
    <PageContainer title={false}>
      <Typography>
        <Paragraph>
          <code>PDF 合併</code> 是透過 pdfBox 這個套件，使用時 <code>pom.xml</code> 需要先設定此套件。
        </Paragraph>

        <CodeXML code={`<dependency>
    <groupId>org.apache.pdfbox</groupId>
    <artifactId>pdfbox</artifactId>
    <version>2.0.30</version>
</dependency>`} />

        <Paragraph type='danger'>
          CSMO 專案 已包含此套件，不需要設定
        </Paragraph>

        <hr/>

        <Table
          size="small"
          bordered
          columns={[
            { title: '方法', dataIndex: 'name', width: 250 },
            { title: '函式', dataIndex: 'method' }
          ]}
          dataSource={[
            { name: 'PDF 檔案合併', method: 'mergePDF(List<byte[]> pdfFileList' },
          ]}
          pagination={false}
        />

        <CodeJava code={`import org.apache.pdfbox.multipdf.PDFMergerUtility;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

/**
 * PDF 匯出工具
 */
public class MergePdrUtil {
    /**
     * PDF 檔案合併
     *
     * @param pdfFileList 要合併的 PDF 清單
     * @return PDF 資料流
     */
    public static byte[] mergePDF(List<byte[]> pdfFileList) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            PDFMergerUtility merger = new PDFMergerUtility();
            // 設定輸出流
            merger.setDestinationStream(outputStream);

            // 加入每個 PDF
            for (byte[] pdfFile : pdfFileList) {
                merger.addSource(new ByteArrayInputStream(pdfFile));
            }

            // 合併
            merger.mergeDocuments(null);

        } catch (Exception e) {
            throw new RuntimeException("PDF 合併失敗: ", e);
        }
        return outputStream.toByteArray();
    }
}`} />

      </Typography>
    </PageContainer>
  )
}

export default MergePdf