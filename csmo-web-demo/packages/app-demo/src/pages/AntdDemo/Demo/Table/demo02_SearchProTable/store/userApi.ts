
export interface TableItem {
  id: number
  name: string
  age: number
  address: string
  birthDate: string // 新增生日欄位
  sex: string
}

const mockData: TableItem[] = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  age: 20 + (index % 10),
  address: `Address ${index + 1}`,
  birthDate: `114/0${(index % 12) + 1}/15`, // 模擬生日
  sex: '男'
}))

export const fetchAllData = async (
  params: { name?: string; age?: number; current?: number; pageSize?: number; birthDate?: string }
): Promise<{ data: TableItem[]; success: boolean; total: number }> => {
  const { name, age, birthDate, current = 1, pageSize = 10 } = params

  let filteredData = mockData

  if (name) {
    filteredData = filteredData.filter((item) => item.name.includes(name))
  }

  if (age) {
    filteredData = filteredData.filter((item) => item.age === age)
  }

  if (birthDate) {
    filteredData = filteredData.filter((item) => item.birthDate === birthDate)
  }

  const startIndex = (current - 1) * pageSize
  const endIndex = startIndex + pageSize

  // 模擬等待 1 秒
  await new Promise((resolve) => {setTimeout(resolve, 1000)})

  return {
    data: filteredData.slice(startIndex, endIndex),
    success: true,
    total: filteredData.length
  }
}
