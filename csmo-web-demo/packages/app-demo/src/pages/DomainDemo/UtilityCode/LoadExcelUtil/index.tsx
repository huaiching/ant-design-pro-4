import { PageContainer } from "@ant-design/pro-components"
import CodeJava from '@/utils/CodePre/CodeJava'
import { Table, Typography } from "antd"
import CodeXML from "@/utils/CodePre/CodeXML"

const { Title, Paragraph } = Typography

const LoadExcelUtil = () => {

  return (
    <PageContainer>
      <Typography>
        <Paragraph>
          Excel 讀取工具，提供將 Excel 檔案內容 讀取成 {`List<Object[]>`} 的功能，方便後續資料處理。
          <br />
          主要使用 Apache POI 來解析 Excel 檔案，使用前須要在專案中加入相關依賴：
        </Paragraph>

        <CodeXML code={`<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi</artifactId>
    <version>5.2.3</version>
</dependency>
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>5.2.3</version>
</dependency>`} />

        <Paragraph type='danger'>
          CSMO 專案 已包含此套件，不需要設定
        </Paragraph>

        <Table
          size="small"
          bordered
          columns={[
            { title: '方法', dataIndex: 'name', width: 250 },
            { title: '函式', dataIndex: 'method' }
          ]}
          dataSource={[
            { name: '從前端上傳的檔案讀取 Excel 資料', method: 'loadExcelFromMultipartFile(MultipartFile file, boolean hasHeader)' },
            { name: '從 resources 資料夾讀取 Excel 檔案', method: 'loadExcelFromResources(String resourcePath, boolean hasHeader)' },
          ]}
          pagination={false}
        />

        <CodeJava title="LoadExcelUtil" code={`import org.apache.poi.ss.usermodel.*;
        import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Excel 讀取工具
 */

public class LoadExcelUtil {
    /**
     * 從前端上傳的檔案讀取 Excel 資料
     *
     * @param file      Excel檔案
     * @param hasHeader true.存在標題列 / false.不存在標題列 (標題列不會讀取)
     */
    public static List<Object[]> loadExcelFromMultipartFile(MultipartFile file, boolean hasHeader)
            throws IOException, InvalidFormatException {
        try (InputStream inputStream = file.getInputStream()) {
            return readExcel(inputStream, hasHeader);
        }
    }

    /**
     * 從 resources 資料夾讀取 Excel 檔案
     *
     * @param resourcePath Excel檔案 (路徑)
     * @param hasHeader    true.存在標題列 / false.不存在標題列 (標題列不會讀取)
     */
    public static List<Object[]> loadExcelFromResources(String resourcePath, boolean hasHeader)
            throws IOException, InvalidFormatException {
        ClassPathResource resource = new ClassPathResource(resourcePath);
        try (InputStream inputStream = resource.getInputStream()) {
            return readExcel(inputStream, hasHeader);
        }
    }

    /**
     * 核心讀取邏輯：統一每行長度為整個 sheet 的最大欄數
     */
    private static List<Object[]> readExcel(InputStream inputStream, boolean hasHeader)
            throws IOException, InvalidFormatException {
        Workbook workbook = WorkbookFactory.create(inputStream);
        Sheet sheet = workbook.getSheetAt(0);
        List<Object[]> data = new ArrayList<>();

        if (sheet.getLastRowNum() < 0) {
            workbook.close();
            return data; // 空表直接回傳
        }

        // 第一階段：找出整個 sheet 的最大欄數（最右邊有值的欄位）
        int maxColumns = 0;
        int startRowIndex = hasHeader ? 1 : 0;

        for (int i = startRowIndex; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;

            // 找出這一行最後有值的儲存格位置（getLastCellNum() 會回傳下一個可能的欄位索引）
            int lastCellNum = row.getLastCellNum();
            if (lastCellNum > maxColumns) {
                maxColumns = lastCellNum;
            }
        }

        // 如果完全沒有資料行，maxColumns 還是 0，直接回傳空 list
        if (maxColumns == 0) {
            workbook.close();
            return data;
        }

        // 第二階段：真正讀取資料，並統一每行長度
        for (int i = startRowIndex; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) {
                // 整行為空 → 補滿 null 的陣列
                Object[] emptyRow = new Object[maxColumns];
                data.add(emptyRow);
                continue;
            }

            Object[] rowData = new Object[maxColumns];

            // 填入現有儲存格的值
            for (int j = 0; j < maxColumns; j++) {
                Cell cell = row.getCell(j, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
                rowData[j] = getCellValue(cell);
            }

            data.add(rowData);
        }

        workbook.close();
        return data;
    }

    /**
     * 取得單一儲存格的值
     */
    private static Object getCellValue(Cell cell) {
        if (cell == null) {
            return null;
        }

        CellType type = cell.getCellType();
        if (type == CellType.FORMULA) {
            type = cell.getCachedFormulaResultType();
        }

        return switch (type) {
            case STRING -> cell.getStringCellValue().trim();
            case NUMERIC -> {
                if (DateUtil.isCellDateFormatted(cell)) {
                    yield cell.getDateCellValue();
                }
                double num = cell.getNumericCellValue();
                if (num == Math.floor(num) && num <= Long.MAX_VALUE && num >= Long.MIN_VALUE) {
                    yield (long) num;
                } else {
                    yield num;
                }
            }
            case BOOLEAN -> cell.getBooleanCellValue();
            case BLANK -> null;
            default -> cell.toString().trim();  // 保險
        };
    }
}`} />

      </Typography>
    </PageContainer>
  )
}

export default LoadExcelUtil