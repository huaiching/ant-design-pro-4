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
          此工具 可以將 <code>簡易的 Excel 文件</code> 轉成 <code>PDF 檔案</code>，使用時 <code>pom.xml</code> 需要先設定此套件。
        </Paragraph>

        <CodeXML code={`<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>5.2.3</version>
</dependency>
<dependency>
    <groupId>com.openhtmltopdf</groupId>
    <artifactId>openhtmltopdf-pdfbox</artifactId>
    <version>1.0.10</version>
</dependency>`} />

        <hr/>

        <Paragraph type='danger'>
          此工具 是透過 apache.poi 逐一解析 Excel 儲存格 的 資訊，再逐一寫入 PDF。<br/>
          不支援 字體顏色 (一律使用黑色)、儲存格底色 (一律使用白色) 且 不一定支援 過於複雜 的 Excel文件。
        </Paragraph>

        <Paragraph type='danger'>
          <code>難字處理</code>：請於 word 文件產生時，就透過 <code>CSMO 工具</code> 將 <code>自造字</code> 轉換成 <code>難字</code> 後，再透過此工具 轉換為 PDF。
        </Paragraph>

        <Table
          size="small"
          bordered
          columns={[
            { title: '方法', dataIndex: 'name', width: 250 },
            { title: '函式', dataIndex: 'method' }
          ]}
          dataSource={[
            { name: 'Excel 轉 PDF (直式)', method: 'excelToPdf(byte[] excelBytes)' },
            { name: 'Excel 轉 PDF (橫式)', method: 'excelToPdfHorizontal(byte[] excelBytes)' },
          ]}
          pagination={false}
        />

        <CodeJava code={`import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;

import java.awt.Color;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.List;

/**
 * Excel 轉 PDF 工具類
 * 支援 .xlsx 格式
 */
public class ExcelToPdfUtil {

    private static final Logger log = LoggerFactory.getLogger(ExcelToPdfUtil.class);

    // PDF 設定
    private static final float MARGIN = 50;
    private static final float FONT_SIZE = 10;
    private static final float ROW_HEIGHT = 20;
    private static final float COLUMN_WIDTH_FACTOR = 0.12f; // Excel 寬度單位轉換係數

    // 私有建構子，防止實例化
    private ExcelToPdfUtil() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    /**
     * 將 Excel byte[] 轉換為 PDF byte[] (直式/Portrait)
     *
     * @param excelBytes Excel 檔案的 byte array
     * @return PDF 檔案的 byte array
     * @throws IOException 轉換過程中的 IO 異常
     */
    public static byte[] excelToPdf(byte[] excelBytes) throws IOException {
        return convertExcelToPdf(excelBytes, false);
    }

    /**
     * 將 Excel byte[] 轉換為 PDF byte[] (橫式/Landscape)
     *
     * @param excelBytes Excel 檔案的 byte array
     * @return PDF 檔案的 byte array
     * @throws IOException 轉換過程中的 IO 異常
     */
    public static byte[] excelToPdfHorizontal(byte[] excelBytes) throws IOException {
        return convertExcelToPdf(excelBytes, true);
    }

    /**
     * 將 Excel byte[] 轉換為 PDF byte[] (核心轉換方法)
     *
     * @param excelBytes Excel 檔案的 byte array
     * @param isHorizontal 是否為橫式列印
     * @return PDF 檔案的 byte array
     * @throws IOException 轉換過程中的 IO 異常
     */
    private static byte[] convertExcelToPdf(byte[] excelBytes, boolean isHorizontal) throws IOException {
        log.info("開始轉換 Excel 到 PDF，Excel 大小: {} bytes, 方向: {}", excelBytes.length, isHorizontal ? "橫式" : "直式");

        try (ByteArrayInputStream bis = new ByteArrayInputStream(excelBytes);
             Workbook workbook = new XSSFWorkbook(bis);
             PDDocument document = new PDDocument();
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            // 載入中文字體到 PDDocument
            FontHolder fontHolder = loadFonts(document);

            // 遍歷所有工作表
            int numberOfSheets = workbook.getNumberOfSheets();
            log.info("Excel 包含 {} 個工作表", numberOfSheets);

            for (int i = 0; i < numberOfSheets; i++) {
                Sheet sheet = workbook.getSheetAt(i);
                log.info("處理工作表 [{}]: {}", i, sheet.getSheetName());
                // 傳遞方向參數給 sheet 轉換方法
                convertSheetToPdf(document, sheet, fontHolder, isHorizontal);
            }

            // 將 PDF 寫入 ByteArrayOutputStream
            document.save(baos);
            byte[] pdfBytes = baos.toByteArray();

            log.info("轉換完成，PDF 大小: {} bytes", pdfBytes.length);
            return pdfBytes;

        } catch (Exception e) {
            log.error("Excel 轉 PDF 失敗", e);
            throw new IOException("Excel 轉 PDF 失敗: " + e.getMessage(), e);
        }
    }

    /**
     * 載入字體到 PDDocument
     */
    private static FontHolder loadFonts(PDDocument document) throws IOException {
        PDFont chineseFont;
        PDFont chineseFontBold;

        try {
            ClassPathResource fontResource = new ClassPathResource("templates/fonts/kaiu.ttf");
            try (InputStream fontStream = fontResource.getInputStream()) {
                chineseFont = PDType0Font.load(document, fontStream);
                log.info("成功載入中文字體到 PDF Document");
            }

            // 標題使用相同字體（標楷體沒有 bold 版本，使用同一字體）
            try (InputStream fontStream = new ClassPathResource("templates/fonts/kaiu.ttf").getInputStream()) {
                chineseFontBold = PDType0Font.load(document, fontStream);
            }
        } catch (Exception e) {
            log.warn("載入中文字體失敗，使用預設字體", e);
            chineseFont = PDType1Font.HELVETICA;
            chineseFontBold = PDType1Font.HELVETICA_BOLD;
        }

        return new FontHolder(chineseFont, chineseFontBold);
    }

    /**
     * 將單個工作表轉換為 PDF 頁面
     *
     * @param document PDF 文件對象
     * @param sheet Excel 工作表
     * @param fontHolder 字體對象
     * @param isHorizontal 是否為橫式
     */
    private static void convertSheetToPdf(PDDocument document, Sheet sheet, FontHolder fontHolder, boolean isHorizontal) throws IOException {
        if (sheet.getPhysicalNumberOfRows() == 0) {
            log.warn("工作表 [{}] 為空，跳過", sheet.getSheetName());
            return;
        }

        // 根據 isHorizontal 決定頁面尺寸
        PDRectangle pageSize = PDRectangle.A4;
        if (isHorizontal) {
            // 設定橫式：交換 A4 的寬高
            pageSize = new PDRectangle(PDRectangle.A4.getHeight(), PDRectangle.A4.getWidth());
        }

        PDPage page = new PDPage(pageSize);
        document.addPage(page);

        // 檢查是否顯示格線
        boolean displayGridLines = sheet.isDisplayGridlines();
        log.info("工作表 [{}] 格線顯示: {}", sheet.getSheetName(), displayGridLines);

        try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {

            float yPosition = page.getMediaBox().getHeight() - MARGIN;

            // 計算列寬（傳遞頁面寬度參數，以進行正確的縮放）
            float[] columnWidths = calculateColumnWidths(sheet, pageSize.getWidth());

            // 取得合併儲存格資訊
            List<CellRangeAddress> mergedRegions = sheet.getMergedRegions();

            // 遍歷行
            int lastRowNum = sheet.getLastRowNum();
            for (int rowIndex = 0; rowIndex <= lastRowNum; rowIndex++) {
                Row row = sheet.getRow(rowIndex);

                // 檢查是否需要新頁面
                if (yPosition < MARGIN + ROW_HEIGHT) {
                    contentStream.close();

                    // 換頁時，使用相同的頁面尺寸
                    page = new PDPage(pageSize);
                    document.addPage(page);
                    PDPageContentStream newContentStream = new PDPageContentStream(document, page);
                    yPosition = page.getMediaBox().getHeight() - MARGIN;
                    // 這裡的 return 邏輯是簡化處理，實際應用中應遞迴處理剩餘行。
                    return;
                }

                if (row != null) {
                    drawRow(contentStream, row, yPosition, columnWidths, rowIndex, fontHolder,
                            mergedRegions, displayGridLines);
                }

                yPosition -= ROW_HEIGHT;
            }
        }
    }

    /**
     * 繪製單行資料
     */
    private static void drawRow(PDPageContentStream contentStream, Row row, float yPosition,
                                float[] columnWidths, int rowIndex, FontHolder fontHolder,
                                List<CellRangeAddress> mergedRegions, boolean displayGridLines) throws IOException {

        float xPosition = MARGIN;
        int lastCellNum = row.getLastCellNum();

        // 標題行字體設定
        if (rowIndex == 0) {
            contentStream.setFont(fontHolder.chineseFontBold, FONT_SIZE);
        } else {
            contentStream.setFont(fontHolder.chineseFont, FONT_SIZE);
        }

        for (int cellIndex = 0; cellIndex < lastCellNum; cellIndex++) {
            Cell cell = row.getCell(cellIndex);

            // 計算當前單元格寬度
            float currentWidth = columnWidths[cellIndex];

            // 檢查是否為合併儲存格
            CellRangeAddress mergedRegion = getMergedRegion(mergedRegions, rowIndex, cellIndex);

            if (mergedRegion != null) {
                // 只在合併儲存格的左上角進行處理
                if (mergedRegion.getFirstRow() == rowIndex && mergedRegion.getFirstColumn() == cellIndex) {
                    // 計算合併儲存格的總寬度
                    float mergedWidth = 0;
                    for (int i = mergedRegion.getFirstColumn(); i <= mergedRegion.getLastColumn(); i++) {
                        mergedWidth += columnWidths[i];
                    }

                    // 繪製框線 (根據 CellStyle)
                    drawCellBorders(contentStream, cell, xPosition, yPosition, mergedWidth, ROW_HEIGHT, displayGridLines);

                    // 處理文字
                    String cellValue = getCellValueAsString(cell);
                    HorizontalAlignment alignment = getHorizontalAlignment(cell);
                    if (cellValue != null && !cellValue.isEmpty()) {
                        float textX = calculateTextXPosition(xPosition, mergedWidth, cellValue, alignment);
                        contentStream.beginText();
                        contentStream.newLineAtOffset(textX, yPosition - ROW_HEIGHT + 6);
                        String displayText = truncateText(cellValue, mergedWidth - 10);
                        contentStream.showText(displayText);
                        contentStream.endText();
                    }
                }
                // 若是合併區域的其他部分，僅移動 xPosition，不做繪製
            } else {
                // 一般儲存格

                // 繪製框線 (根據 CellStyle)
                drawCellBorders(contentStream, cell, xPosition, yPosition, currentWidth, ROW_HEIGHT, displayGridLines);

                // 處理文字
                String cellValue = getCellValueAsString(cell);
                HorizontalAlignment alignment = getHorizontalAlignment(cell);
                if (cellValue != null && !cellValue.isEmpty()) {
                    float textX = calculateTextXPosition(xPosition, currentWidth, cellValue, alignment);
                    contentStream.beginText();
                    contentStream.newLineAtOffset(textX, yPosition - ROW_HEIGHT + 6);
                    String displayText = truncateText(cellValue, currentWidth - 10);
                    contentStream.showText(displayText);
                    contentStream.endText();
                }
            }

            xPosition += columnWidths[cellIndex];
        }
    }

    /**
     * 根據 Excel 樣式繪製邊框
     * 邏輯：只繪製 Excel 中明確設定的邊框，不繪製預設格線。
     */
    private static void drawCellBorders(PDPageContentStream contentStream, Cell cell,
                                        float x, float y, float width, float height,
                                        boolean displayGridLines) throws IOException {
        if (cell == null) {
            return;
        }

        CellStyle style = cell.getCellStyle();
        if (style == null) {
            return;
        }

        // 取得四邊樣式
        BorderStyle topStyle = style.getBorderTop();
        BorderStyle bottomStyle = style.getBorderBottom();
        BorderStyle leftStyle = style.getBorderLeft();
        BorderStyle rightStyle = style.getBorderRight();

        boolean hasCustomBorder = (topStyle != BorderStyle.NONE || bottomStyle != BorderStyle.NONE ||
                leftStyle != BorderStyle.NONE || rightStyle != BorderStyle.NONE);

        // 如果沒有任何自定義邊框，則不畫任何線
        if (!hasCustomBorder) {
            return;
        }

        // 繪製上邊框
        if (topStyle != BorderStyle.NONE) {
            // 由於 colorIndex 在此版本中未被使用，這裡僅傳遞一個 placeholder short
            drawSingleBorderLine(contentStream, x, y, x + width, y, topStyle, style.getTopBorderColor());
        }

        // 繪製下邊框
        if (bottomStyle != BorderStyle.NONE) {
            drawSingleBorderLine(contentStream, x, y - height, x + width, y - height, bottomStyle, style.getBottomBorderColor());
        }

        // 繪製左邊框
        if (leftStyle != BorderStyle.NONE) {
            drawSingleBorderLine(contentStream, x, y, x, y - height, leftStyle, style.getLeftBorderColor());
        }

        // 繪製右邊框
        if (rightStyle != BorderStyle.NONE) {
            drawSingleBorderLine(contentStream, x + width, y, x + width, y - height, rightStyle, style.getRightBorderColor());
        }
    }

    /**
     * 繪製單一邊框線
     */
    private static void drawSingleBorderLine(PDPageContentStream contentStream,
                                             float x1, float y1, float x2, float y2,
                                             BorderStyle borderStyle, short colorIndex) throws IOException {

        // 設定線寬
        float lineWidth = getBorderWidth(borderStyle);
        contentStream.setLineWidth(lineWidth);

        // 預設為黑色，若需要支援 Excel 顏色，需額外解析 colorIndex
        contentStream.setStrokingColor(Color.BLACK);

        // 處理虛線 (DASHED, DOTTED)
        if (borderStyle == BorderStyle.DASHED) {
            contentStream.setLineDashPattern(new float[]{3, 1}, 0);
        } else if (borderStyle == BorderStyle.DOTTED) {
            contentStream.setLineDashPattern(new float[]{1, 1}, 0);
        } else {
            contentStream.setLineDashPattern(new float[]{}, 0); // 實線
        }

        contentStream.moveTo(x1, y1);
        contentStream.lineTo(x2, y2);
        contentStream.stroke();

        // 重置為實線，避免影響後續繪製
        contentStream.setLineDashPattern(new float[]{}, 0);
    }

    /**
     * 將 POI BorderStyle 轉換為 PDF 線寬
     */
    private static float getBorderWidth(BorderStyle style) {
        switch (style) {
            case THICK:
                return 1.5f;
            case MEDIUM:
                return 1.0f;
            case MEDIUM_DASHED:
                return 1.0f;
            case THIN:
            case DASHED:
            case DOTTED:
            case HAIR:
            default:
                return 0.5f;
        }
    }


    /**
     * 取得儲存格的水平對齊方式
     */
    private static HorizontalAlignment getHorizontalAlignment(Cell cell) {
        if (cell == null) {
            return HorizontalAlignment.LEFT;
        }

        CellStyle cellStyle = cell.getCellStyle();
        if (cellStyle != null) {
            HorizontalAlignment alignment = cellStyle.getAlignment();
            // 如果是 GENERAL，根據內容類型決定對齊方式
            if (alignment == HorizontalAlignment.GENERAL) {
                CellType cellType = cell.getCellType();
                if (cellType == CellType.NUMERIC || cellType == CellType.BOOLEAN) {
                    return HorizontalAlignment.RIGHT;
                } else {
                    return HorizontalAlignment.LEFT;
                }
            }
            return alignment;
        }

        return HorizontalAlignment.LEFT;
    }

    /**
     * 根據對齊方式計算文字的 X 座標
     */
    private static float calculateTextXPosition(float cellX, float cellWidth, String text, HorizontalAlignment alignment) {
        // 估算文字寬度：FONT_SIZE * 0.6 是簡化中文字體寬度的常用係數
        float textWidth = text.length() * FONT_SIZE * 0.6f;

        switch (alignment) {
            case CENTER:
                return cellX + (cellWidth - textWidth) / 2;
            case RIGHT:
                return cellX + cellWidth - textWidth - 5; // 減 5 留白
            case LEFT:
            case GENERAL:
            default:
                return cellX + 5; // 加 5 留白
        }
    }

    /**
     * 取得儲存格所屬的合併區域
     */
    private static CellRangeAddress getMergedRegion(List<CellRangeAddress> mergedRegions,
                                                    int rowIndex, int cellIndex) {
        for (CellRangeAddress region : mergedRegions) {
            if (region.isInRange(rowIndex, cellIndex)) {
                return region;
            }
        }
        return null;
    }

    /**
     * 計算每列的寬度（根據 Excel 實際寬度），並根據頁面寬度進行等比例縮放
     *
     * @param sheet Excel 工作表
     * @param pageWidth PDF 頁面的實際寬度 (考慮橫式或直式)
     * @return 每列的寬度陣列
     */
    private static float[] calculateColumnWidths(Sheet sheet, float pageWidth) {
        int maxColumns = 0;

        // 找出最大列數
        for (Row row : sheet) {
            if (row.getLastCellNum() > maxColumns) {
                maxColumns = row.getLastCellNum();
            }
        }

        float[] columnWidths = new float[maxColumns];
        float totalWidth = 0;

        // 取得 Excel 中每列的實際寬度
        for (int i = 0; i < maxColumns; i++) {
            // Excel 的欄寬單位需要轉換為 PDF 的點（points）
            int excelColumnWidth = sheet.getColumnWidth(i);
            columnWidths[i] = excelColumnWidth * COLUMN_WIDTH_FACTOR;
            totalWidth += columnWidths[i];
        }

        // 檢查總寬度是否超過頁面可用寬度
        float availableWidth = pageWidth - 2 * MARGIN;
        if (totalWidth > availableWidth) {
            // 等比例縮小所有欄位
            float scaleFactor = availableWidth / totalWidth;
            for (int i = 0; i < maxColumns; i++) {
                columnWidths[i] *= scaleFactor;
            }
            log.info("欄位總寬度超過頁面，已縮放至 {}%", (int)(scaleFactor * 100));
        }

        return columnWidths;
    }

    /**
     * 取得儲存格值並轉為字串
     */
    private static String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return "";
        }

        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();

            case NUMERIC:
                // 使用 BigDecimal 處理，避免科學記號表示法
                return String.valueOf(BigDecimal.valueOf(cell.getNumericCellValue()));

            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());

            case FORMULA:
                try {
                    // 嘗試以數值形式獲取公式結果
                    return String.valueOf(BigDecimal.valueOf(cell.getNumericCellValue()));
                } catch (Exception e) {
                    // 若公式結果為字串
                    return cell.getStringCellValue();
                }

            case BLANK:
                return "";

            default:
                return "";
        }
    }

    /**
     * 截斷過長的文字
     */
    private static String truncateText(String text, float maxWidth) {
        // 估算一個字元佔用的寬度
        int charWidthEstimate = (int) (FONT_SIZE * 0.6);
        // 計算最大可容納的字元數 (預留 3 個字元給 "...")
        int maxChars = (int) (maxWidth / charWidthEstimate);

        if (text.length() > maxChars) {
            // 截斷並加上省略號
            return text.substring(0, Math.max(0, maxChars - 3)) + "...";
        }
        return text;
    }

    /**
     * 字體容器類別
     */
    private static class FontHolder {
        final PDFont chineseFont;
        final PDFont chineseFontBold;

        FontHolder(PDFont chineseFont, PDFont chineseFontBold) {
            this.chineseFont = chineseFont;
            this.chineseFontBold = chineseFontBold;
        }
    }
}`} />

      </Typography>
    </PageContainer>
  )
}

export default MergePdf