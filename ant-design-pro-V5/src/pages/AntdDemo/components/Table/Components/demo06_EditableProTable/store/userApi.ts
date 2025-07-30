
export interface TableItem {
  id: number
  name: string
  age: number
  birthday: string // 新增生日欄位
  gender: string
}

const mockData: TableItem[] = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  age: 20 + (index % 10),
  birthday: `199${index % 10}-0${(index % 12) + 1}-15`, // 模擬生日
  gender: '男',
}))

export const fetchTableData = async (
  params: { name?: string; age?: number; current?: number; pageSize?: number; birthday?: string }
): Promise<{ data: TableItem[]; total: number }> => {
  const { name, age, birthday, current = 1, pageSize = 10 } = params

  let filteredData = mockData

  if (name) {
    filteredData = filteredData.filter((item) => item.name.includes(name))
  }

  if (age) {
    filteredData = filteredData.filter((item) => item.age === age)
  }

  if (birthday) {
    filteredData = filteredData.filter((item) => item.birthday === birthday)
  }

  const startIndex = (current - 1) * pageSize
  const endIndex = startIndex + pageSize

  // 模擬等待 1 秒
  await new Promise((resolve) => setTimeout(resolve, 100))

  return {
    data: filteredData.slice(startIndex, endIndex),
    total: filteredData.length,
  }
}
