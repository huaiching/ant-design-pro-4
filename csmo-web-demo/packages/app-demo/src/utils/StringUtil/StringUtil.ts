/**
 * 文字轉為半形
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