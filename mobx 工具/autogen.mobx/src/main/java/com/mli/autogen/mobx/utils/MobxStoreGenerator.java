package com.mli.autogen.mobx.utils;

import java.util.Map;

public class MobxStoreGenerator {

    public static String generateMobxStore(String interfaceName,
                                           Map<String, String> fields,
                                           Map<String, String> comments,
                                           String storeName,
                                           String instanceName) {

        StringBuilder sb = new StringBuilder();

        // 介面定義
        sb.append("import { makeAutoObservable } from 'mobx'\n\n");
        sb.append("// ").append(interfaceName).append("\n");
        sb.append("export interface ").append(interfaceName).append(" {\n");
        fields.forEach((name, type) -> {
            String fixedType = fixTypeForDate(type);
            String comment = (comments != null && comments.containsKey(name)) ? " // " + comments.get(name) : "";
            sb.append("    ").append(name).append(": ").append(fixedType).append(comment).append("\n");
        });
        sb.append("}\n\n");

        // Store 類別
        sb.append("class ").append(storeName).append(" {\n");
        sb.append("    ").append(lowerFirst(interfaceName)).append(": ").append(interfaceName).append(" = {\n");
        fields.forEach((name, type) -> {
            sb.append("        ").append(name).append(": ").append(getDefaultValue(type)).append(",\n");
        });
        sb.append("    }\n\n");

        sb.append("    constructor() {\n");
        sb.append("        makeAutoObservable(this)\n");
        sb.append("    }\n\n");

        // init
        sb.append("    // 初始化方法\n");
        sb.append("    init").append(interfaceName).append("() {\n");
        sb.append("        this.").append(lowerFirst(interfaceName)).append(" = {\n");
        fields.forEach((name, type) -> {
            sb.append("            ").append(name).append(": ").append(getDefaultValue(type)).append(",\n");
        });
        sb.append("        }\n");
        sb.append("    }\n\n");

        // set 整筆
        sb.append("    // set 整筆\n");
        sb.append("    set").append(interfaceName).append("(data: ").append(interfaceName).append(") {\n");
        sb.append("        this.").append(lowerFirst(interfaceName)).append(" = data\n");
        sb.append("    }\n\n");

        // get 整筆
        sb.append("    // get 整筆\n");
        sb.append("    get get").append(interfaceName).append("() {\n");
        sb.append("        return this.").append(lowerFirst(interfaceName)).append("\n");
        sb.append("    }\n\n");

        // set / get 個別欄位
        fields.forEach((name, type) -> {
            String fixedType = fixTypeForDate(type);
            String comment = (comments != null && comments.containsKey(name)) ? comments.get(name) : name;
            // set
            sb.append("    // set " + comment + "\n");
            sb.append("    set").append(capitalize(name)).append("(").append(name).append(": ").append(fixedType).append(") {\n");
            sb.append("        this.").append(lowerFirst(interfaceName)).append(".").append(name).append(" = ").append(name).append("\n");
            sb.append("    }\n\n");

            // get
            sb.append("    // get " + comment + "\n");
            sb.append("    get get").append(capitalize(name)).append("() {\n");
            sb.append("        return this.").append(lowerFirst(interfaceName)).append(".").append(name).append("\n");
            sb.append("    }\n\n");
        });

        sb.append("}\n");

        // 單例
        sb.append("const ").append(instanceName).append(" = new ").append(storeName).append("()\n");
        sb.append("export default ").append(instanceName).append("\n");

        return sb.toString();
    }

    /**
     * 如果欄位型別是純 Date，幫它加上 | null。
     * 例如 "Date" -> "Date | null"
     */
    private static String fixTypeForDate(String type) {
        if ("Date".equals(type)) {
            return "Date | null";
        }
        return type;
    }

    private static String getDefaultValue(String type) {
        switch (type) {
            case "string":
                return "''";
            case "number":
                return "0";
            case "boolean":
                return "false";
            case "string[]":
            case "number[]":
            case "boolean[]":
                return "[]";
            case "Date":
            case "Date | null":  // 同時處理兩種
                return "null";
            case "any":
                return "null";
            default:
                // 若是物件型別（interface）或不認識型別，預設 null
                return "null";
        }
    }

    private static String lowerFirst(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toLowerCase() + str.substring(1);
    }

    private static String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}
