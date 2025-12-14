import CodeJava from "@/utils/CodePre/CodeJava"
import CodeXML from "@/utils/CodePre/CodeXML"
import { PageContainer } from "@ant-design/pro-components"
import { Table, Typography, Image } from "antd"
import ImgTifToPdfDemo1 from './Image/TifToPdfDemo1.png'
import ImgTifToPdfDemo2 from './Image/TifToPdfDemo2.png'

const { Title, Paragraph } = Typography

const MergePdf: React.FC = () => {
  return (
    <PageContainer title={false}>
      <Typography>
        <Paragraph>
          <code>Tif 套印 生成 PDF</code> 是透過 pdfBox 這個套件，使用時 <code>pom.xml</code> 需要先設定此套件。
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

        <Title level={3}>建立方式</Title>
        <Paragraph>
          藉由 <code>pdfBox</code> 可以將 <code>tif 圖檔</code>，作為 <code>PDF 底圖</code> <br/>
          並在 底圖 上，<code>指定座標</code> 處，插入文字，達成 報表製作
        </Paragraph>
        
        <Paragraph type='danger'>
          <code>pdfBox</code> 只能 套印 <code>一頁式</code> tif 檔，如果是 <code>多頁式</code> tif 檔，請 <code>每頁一個檔案</code> <br/>
          並 產生 多個 PDF 後，透過 <code>PDF 合併工具</code> 生成最後的 PDF。
        </Paragraph>
        
        <Paragraph type='danger'>
          PDF 為 封閉式 檔案結構，必須要載入 <code>中文字型</code>，才能正確地顯示文字。
        </Paragraph>
        
        <Title level={4}>報表產生方式，參考此範例</Title>
          <Image
            width={400}
            src={ImgTifToPdfDemo1}
          />
          <Image
            width={400}
            src={ImgTifToPdfDemo2}
          />


        <Title level={5}>PDPageContentStream - 編輯模式 常用方法</Title>
        <Table
          size="small"
          bordered
          columns={[
            { title: '方法', dataIndex: 'name', width: 250 },
            { title: '函式', dataIndex: 'method', width: 400 },
            { title: '備註', dataIndex: 'note' }
          ]}
          dataSource={[
            { name: '設定 文字顏色', method: 'contentStream.setNonStrokingColor(Color.XXX);', note: '顏色會套用後方所有文字' },
            { name: '開始 文字模式', method: 'contentStream.beginText();', note: '' },
            { name: '設定 字體與字型大小', method: 'contentStream.setFont(font, fontSize);', note: '' },
            { name: '設定 文字起始位置', method: 'contentStream.newLineAtOffset(x, y);', note: '以頁面左下角為 (0,0)' },
            { name: '設定 要顯示的文字', method: 'contentStream.showText("要顯示的文字");', note: '' },
            { name: '設定 行距', method: 'contentStream.setLeading(位移量);', note: '' },
            { name: '移動到下一行', method: 'contentStream.newLine();', note: '需要先設定行句，否則會在同一行疊加文字' },
            { name: '結束 文字模式', method: 'contentStream.endText();', note: '' },
          ]}
          pagination={false}
        />

        <Title level={5}>範例</Title>
        <CodeJava code={`import com.example.demo.util.MergePdfUtil;
import com.example.demo.vo.AddrVo;
import com.example.demo.vo.ClntVo;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.apache.pdfbox.pdmodel.graphics.image.LosslessFactory;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

@Service
public class TifToPdfService {
    @Autowired
    private ClntService clntService;
    @Autowired
    private AddrService addrService;

    /**
     * Tif 套印 產生 PDF 範例 <br/>
     * 需要多頁，請分別產生後，透過 PDF 合併工具 進行合併 <br/>
     * tif 套印 只支援 一頁式 的類型
     * @param clientId 客戶證號
     * @return PDF (byte[])
     */
    public byte[] TifToPdfDemo(String clientId) {
        return MergePdfUtil.mergePDF(Arrays.asList(
                Page01(),
                Page02(clientId)
        ));
    }

    /**
     * 第一頁 - 無底圖 + 標示頁面座標
     * @return
     */
    private byte[] Page01() {
        try {
            // 設定 PDF 頁面大小
            PDDocument document = new PDDocument();
            // 設定 頁面大小為 A4
            PDPage page = new PDPage(PDRectangle.A4);
            // 插入 新頁面
            document.addPage(page);


            // 取得 A4 頁面的實際寬高
            float pageWidth = page.getMediaBox().getWidth();
            float pageHeight = page.getMediaBox().getHeight();

            // 載入 中文字型
            PDFont font;
            try (InputStream fontIs = new ClassPathResource("templates/fonts/kaiu.ttf").getInputStream()) {
                font = PDType0Font.load(document, fontIs, false);
            }

            // 繪製內容
            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                // --- 區塊 1 ---
                contentStream.beginText();
                contentStream.setFont(font, 14);                // 字型 + 字體大小
                contentStream.newLineAtOffset(0, 5);            // 位置座標 (x, y)
                contentStream.setNonStrokingColor(Color.RED);   // 文字顏色 (後面的文字 都會生效)
                contentStream.showText("．(0, 0)");                // 顯示文字
                contentStream.endText();

                // --- 區塊 2 ---
                contentStream.beginText();
                contentStream.setFont(font, 14);
                contentStream.newLineAtOffset(pageWidth/2, 5);
                contentStream.setNonStrokingColor(Color.BLACK);   // 文字顏色 (後面的文字 都會生效)
                contentStream.showText("．(" + pageHeight/2 + ", 0)");
                contentStream.endText();

                // --- 區塊 3 ---
                contentStream.beginText();
                contentStream.setFont(font, 14);
                contentStream.newLineAtOffset(0, pageHeight/2);
                contentStream.showText("．(0, " + pageHeight/2 + ")");
                contentStream.endText();

                // --- 區塊 4 ---
                contentStream.beginText();
                contentStream.setFont(font, 14);
                contentStream.newLineAtOffset(pageWidth-160, pageHeight-20);
                contentStream.showText("(" + pageHeight + ", " + pageHeight + ")．");
                contentStream.endText();
            }

            // 儲存到 ByteArrayOutputStream 並返回 byte[]
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            document.save(baos);
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("PDF 生成失敗", e);
        }
    }


    /**
     * 第二頁 - tif 底圖 + 顯示資料
     * @return
     */
    private byte[] Page02(String clientId) {
        // 取得資料
        ClntVo clntVo = clntService.getClnt(clientId);
        List<AddrVo> addrVoList = addrService.queryAddrByClientId(clientId);
        AddrVo addrVo = addrVoList.get(0);

        try {
            // 載入 tif 圖檔
            BufferedImage bim;
            String tifFlie = "套印測試底圖.tif";
            try (InputStream tiffIs = new ClassPathResource("templates/" + tifFlie).getInputStream()) {
                bim = ImageIO.read(tiffIs);
                if (bim == null) {
                    throw new IOException("無法讀取 Classpath 中的圖片: " + tifFlie);
                }
            }


            // 設定 PDF 頁面大小
            PDDocument document = new PDDocument();
            // 設定 頁面大小為 A4
            PDPage page = new PDPage(PDRectangle.A4);
            // 插入 新頁面
            document.addPage(page);


            // 取得 A4 頁面的實際寬高
            float pageWidth = page.getMediaBox().getWidth();
            float pageHeight = page.getMediaBox().getHeight();

            // 將 BufferedImage 轉換為 PDFBox 圖片物件
            PDImageXObject img = LosslessFactory.createFromImage(document, bim);

            // 載入 中文字型
            PDFont font;
            try (InputStream fontIs = new ClassPathResource("templates/fonts/kaiu.ttf").getInputStream()) {
                font = PDType0Font.load(document, fontIs, false);
            }

            // 繪製內容
            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                // 將圖片繪製為底圖
                contentStream.drawImage(img, 0, 0, pageWidth, pageHeight);

                // --- 區塊 1 ---
                contentStream.beginText();
                contentStream.setFont(font, 14);
                contentStream.newLineAtOffset(20, pageHeight - 200);
                contentStream.showText(clntVo.getNames() + "  收");
                contentStream.endText();

                // --- 區塊 2 ---
                contentStream.beginText();
                contentStream.setFont(font, 14);
                contentStream.newLineAtOffset(20, pageHeight - 240);
                contentStream.showText("114  " + addrVo.getAddress());
                contentStream.endText();
            }

            // 儲存到 ByteArrayOutputStream 並返回 byte[]
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            document.save(baos);
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("PDF 生成失敗", e);
        }
    }
}`} />

      </Typography>
    </PageContainer>
  )
}

export default MergePdf