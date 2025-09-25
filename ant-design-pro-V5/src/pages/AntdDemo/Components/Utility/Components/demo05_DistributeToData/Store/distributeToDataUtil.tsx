/**
 * 平均分配總筆數給每個人
 * @param dataList 資料陣列
 * @param totalItems 總筆數
 * @returns 新的陣列，每個人多一個欄位表示分到的數量
 */
export const distributeToData = <T extends object>(
  dataList: T[],
  totalItems: number,
  fieldName: string = "count"
): (T & { [key: string]: number })[] => {
  const n = dataList.length;
  if (n === 0) return [];

  const base = Math.floor(totalItems / n); // 平均值
  let remainder = totalItems % n;          // 餘數

  return dataList.map((data) => {
    const extra = remainder > 0 ? 1 : 0;
    if (remainder > 0) remainder--; // 減掉已分配的餘數
    return {
      ...data,
      [fieldName]: base + extra,
    };
  });
};
