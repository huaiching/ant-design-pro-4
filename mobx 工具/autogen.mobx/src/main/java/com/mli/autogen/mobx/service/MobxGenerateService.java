package com.mli.autogen.mobx.service;

import com.mli.autogen.mobx.utils.MobxStoreGenerator;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.*;
import java.util.*;

/**
 * MobxGenerateService
 *
 * 透過讀取資源目錄下的 mobx-config.json 配置檔，
 * 自動產生對應的 MobX Store TypeScript 檔案，
 * 實作放在 src/main/resources/mobx 資料夾中。
 */
@Service
public class MobxGenerateService {

    /**
     * 啟動後執行，自動從配置檔讀取設定並產生 MobX Store TS 檔案
     */
    @PostConstruct
    public void generateFromConfig() throws Exception {
        // 讀取 mobx-config.json 的內容 (整個檔案字串)
        String json = readResourceFile("mobx-config.json");

        // 移除可能的最外層中括號 (如果是陣列格式)
        json = json.trim();
        if (json.startsWith("[")) json = json.substring(1);
        if (json.endsWith("]")) json = json.substring(0, json.length() - 1);

        // 以 '},{' 作為分割，取得多筆 JSON 物件字串
        String[] objects = json.split("\\},\\s*\\{");

        // 確保輸出目錄存在（src/main/resources/mobx）
        Path outputDir = Paths.get("src/main/resources/mobx");
        Files.createDirectories(outputDir);

        // 逐筆處理每個 JSON 物件字串
        for (String obj : objects) {
            String cleanObj = obj.trim();

            // 若字串非以 '{' 開頭，自動補上（補齊成合法 JSON）
            if (!cleanObj.startsWith("{")) {
                cleanObj = "{" + cleanObj + "}";
            }

            // 從 JSON 字串中擷取 interfaceName 屬性值
            String interfaceName = extractValue(cleanObj, "interfaceName");
            if (interfaceName == null || interfaceName.isEmpty()) {
                System.err.println("⚠️ interfaceName 必須設定，略過此設定");
                continue;  // 若沒有 interfaceName 就跳過該設定
            }

            // 解析 fields 與 comments 兩個物件映射
            Map<String, String> fields = extractMap(cleanObj, "fields");
            Map<String, String> comments = extractMap(cleanObj, "comments");

            // 產生 Store 類名與實例變數名 (命名規則：interfaceName + Store)
            String storeName = interfaceName + "Store";
            String instanceName = lowerFirst(interfaceName) + "Store";

            // 由 MobxStoreGenerator 產生對應的 TypeScript 代碼
            String tsCode = MobxStoreGenerator.generateMobxStore(
                    interfaceName,
                    fields,
                    comments,
                    storeName,
                    instanceName
            );

            // 輸出到指定資料夾下，檔名為 Store 類名 + ".ts"
            Path outFile = outputDir.resolve(storeName + ".ts");
            Files.writeString(outFile, tsCode);

            // 印出完成訊息（含絕對路徑）
            System.out.println("✅ 已生成: " + outFile.toAbsolutePath());
        }
    }

    /**
     * 從資源目錄讀取指定檔案內容，並以 UTF-8 解碼成字串回傳
     * @param filename 資源檔案名稱
     * @return 檔案全文字串
     * @throws Exception 讀取失敗時拋出例外
     */
    private String readResourceFile(String filename) throws Exception {
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(getClass().getClassLoader().getResourceAsStream(filename), "UTF-8"))) {
            StringBuilder sb = new StringBuilder();
            String line;
            // 一行行讀取檔案並累加到 StringBuilder
            while ((line = reader.readLine()) != null) {
                sb.append(line).append("\n");
            }
            return sb.toString();
        }
    }

    /**
     * 從 JSON 字串擷取指定 key 的字串值
     * 只支援簡單格式："key": "value"
     * @param json JSON 字串
     * @param key 欲擷取的 key 名稱
     * @return key 對應的字串值，找不到回傳 null
     */
    private String extractValue(String json, String key) {
        String regex = "\"" + key + "\"\\s*:\\s*\"([^\"]+)\"";
        java.util.regex.Matcher m = java.util.regex.Pattern.compile(regex).matcher(json);
        return m.find() ? m.group(1) : null;
    }

    /**
     * 從 JSON 字串擷取指定 key 的物件映射 (key-value map)
     * 僅支援格式類似："key": {"k1":"v1", "k2":"v2"}
     * 並且不支援巢狀物件
     * @param json JSON 字串
     * @param key 欲擷取的 key 名稱
     * @return 對應 Map，若無或格式錯誤為空 Map
     */
    private Map<String, String> extractMap(String json, String key) {
        Map<String, String> map = new LinkedHashMap<>();
        String regex = "\"" + key + "\"\\s*:\\s*\\{([^}]*)\\}";
        java.util.regex.Matcher m = java.util.regex.Pattern.compile(regex).matcher(json);
        if (m.find()) {
            String inner = m.group(1);
            // 以逗號切割成多個 "key":"value" 配對字串
            String[] pairs = inner.split(",");
            for (String pair : pairs) {
                // 對每組用冒號切割成 key 與 value
                String[] kv = pair.split(":");
                if (kv.length == 2) {
                    // 移除雙引號與空白
                    String k = kv[0].replaceAll("[\"\\s]", "");
                    String v = kv[1].replaceAll("[\"\\s]", "");
                    map.put(k, v);
                }
            }
        }
        return map;
    }

    /**
     * 將字串首字母改為小寫
     * @param str 輸入字串
     * @return 首字母小寫後字串
     */
    private String lowerFirst(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toLowerCase() + str.substring(1);
    }
}
