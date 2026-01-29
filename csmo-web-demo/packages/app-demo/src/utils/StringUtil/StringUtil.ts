/**
 * 文字轉為半形
 * @param str 要處理的字串
 * @returns 轉換後字串 (全形 轉 半形)
 */
export const toHalfWidth = (str: string): string => {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode >= 0xFF01 && charCode <= 0xFF5E) {
      result += String.fromCharCode(charCode - 0xFEE0);
    } else {
      result += str[i];
    }
  }
  return result;
}

/**
 * 文字轉為全形
 * @param str 要處理的字串
 * @returns 轉換後字串 (半形 轉 全形)
 */
export const toFullWidth = (str: string): string => {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode >= 0x21 && charCode <= 0x7E) {
      result += String.fromCharCode(charCode + 0xFEE0);
    } else {
      result += str[i];
    }
  }
  return result;
}

/**
 * 僅保留英數字（a-z A-Z 0-9），其他字元全部移除
 * @param str 要處理的字串
 * @param toUpper 是否轉成全大寫（預設 false）
 * @returns 只包含英數字的新字串
 */
export const onlyAlnum = (input: unknown, toUpper: boolean = false): string => {
  // 強制轉為字串，處理 null/undefined/非字串情況
  const str = String(input ?? '');  // null/undefined 轉成空字串

  const cleaned = str.replace(/[^a-zA-Z0-9]/g, '');
  return toUpper ? cleaned.toUpperCase() : cleaned;
};