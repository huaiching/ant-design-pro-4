/**
 * 根據每個分配者的數量，把資料陣列分配給對應分配者
 * @param dataList 資料陣列 (T extends object)
 * @param assignees 分配者陣列，必須包含 count 欄位，其餘欄位自訂
 * @param assignedField 在資料上填寫分配者名稱的欄位，預設 'processUser'
 * @returns 回傳新的資料陣列，每筆資料包含 assignedField
 */
export const assignDataToAssignees = <
  T extends object,
  U extends { count: number; [key: string]: any }
>(
  dataList: T[],
  assignees: U[],
  assignedField: string = 'processUser'
): (T & { [key: string]: any })[] => {
  const result: (T & { [key: string]: any })[] = []
  let dataIndex = 0

  for (const assignee of assignees) {
    const { count } = assignee
    const assigneeName = assignee.name || assignee.id || 'unknown'
    for (let i = 0; i < count && dataIndex < dataList.length; i++) {
      result.push({ ...dataList[dataIndex], [assignedField]: assigneeName })
      dataIndex++
    }
  }

  // 剩餘資料填 null
  for (; dataIndex < dataList.length; dataIndex++) {
    result.push({ ...dataList[dataIndex], [assignedField]: null })
  }

  return result
}
