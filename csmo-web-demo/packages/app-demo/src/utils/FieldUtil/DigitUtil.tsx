import { Select } from "antd";

/**
 * 將數字轉成千分位格式的字串
 * @param value 數字
 * @returns 千分位逗號格式的字串
 */
export const toSeprator = (value: number | undefined): string => {
  if (value == null) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 顯示千分位逗號的 ProFormDigit 欄位屬性設定
 */
export const separatorProps = {
  // 顯示格式化：數字 → 帶千分位逗號
  formatter: (value?: number) => {
    return toSeprator(value);
  },

  // 解析輸入：移除逗號，轉成 number
  parser: (value?: string): number => {
    if (!value || value.trim() === '') return 0;

    const cleaned = value.replace(/,/g, '');
    const num = Number(cleaned);

    return isNaN(num) ? 0 : num;
  },
}

/**
 * 依照 台/外幣 動態設定 數值精度
 * @param currency 幣別
 * @returns 
 */
export const currencyProps = (currency: string = 'TWD') => {
  return {
    step: currency === 'TWD' ? 1 : 0.01,      // 每次改變的數值
    precision: currency === 'TWD' ? 0 : 2,    // 數值經度
  }
}

/**
 * 前置幣別選擇器
 * @param currency 幣別
 * @param setCurrency 幣別變更回調
 * @returns ReactNode
 */
export const currencySelectProps = (currency: string = 'TWD', setCurrency: (value: string) => void) => {
  return {
    addonBefore: (
      <Select value={currency} onChange={setCurrency} style={{ width: 90 }}>
        <Select.Option value="TWD">新台幣</Select.Option>
        <Select.Option value="USD">美元</Select.Option>
        <Select.Option value="AUD">澳幣</Select.Option>
        <Select.Option value="CNY">人民幣</Select.Option>
        <Select.Option value="EUR">歐元</Select.Option>
        <Select.Option value="NZD">紐幣</Select.Option>
        <Select.Option value="ZAR">南非幣</Select.Option>
      </Select>
    ),
  }
}

/**
 * 四捨五入
 * @param value 數字
 * @param decimals 小數位數，預設 0
 * @returns 四捨五入後的數字
 */
export const round = (value: number, decimals: number = 0): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

/**
 * 無條件進位
 * @param value 數字
 * @param decimals 小數位數，預設 0
 * @returns 無條件進位後的數字
 */
export const ceil = (value: number, decimals: number = 0): number => {
  const factor = Math.pow(10, decimals);
  return Math.ceil(value * factor) / factor;
};

/**
 * 無條件捨去
 * @param value 數字
 * @param decimals 小數位數，預設 0
 * @returns 無條件捨去後的數字
 */
export const floor = (value: number, decimals: number = 0): number => {
  const factor = Math.pow(10, decimals);
  return Math.floor(value * factor) / factor;
};