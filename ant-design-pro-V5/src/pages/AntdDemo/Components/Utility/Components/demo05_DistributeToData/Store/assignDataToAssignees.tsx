
/**
 * 根據每個分配者的數量，把資料陣列分配給對應分配者
 * @param dataList 資料陣列 (T extends object)
 * @param assignees 分配者陣列，必須包含 count 欄位，其餘欄位自訂
 * @returns 回傳新的資料陣列，每筆資料包含 processUser 欄位
 */
export const assignDataToAssignees = <
  T extends object,
  U extends { count: number; [key: string]: any }
>(
  dataList: T[],
  assignees: U[]
): (T & { processUser: any })[] => {
  const result: (T & { processUser: any })[] = []
  let dataIndex = 0

  for (const assignee of assignees) {
    const { count } = assignee
    const assigneeName = assignee.name || assignee.id || 'unknown'
    for (let i = 0; i < count && dataIndex < dataList.length; i++) {
      result.push({ ...dataList[dataIndex], processUser: assigneeName })
      dataIndex++
    }
  }

  // 剩餘資料填 processUser = null
  for (; dataIndex < dataList.length; dataIndex++) {
    result.push({ ...dataList[dataIndex], processUser: null })
  }

  return result
}