/**
 * 資料平均分配
 * @param dataList 資料陣列
 * @param totalItems 總筆數
 * @returns 新的陣列，會新增一個欄位 count 紀錄資料分配數量
 */
export const distributeToData = <T extends object>(
  dataList: T[],
  totalItems: number
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
      count: base + extra,
    };
  });
};
