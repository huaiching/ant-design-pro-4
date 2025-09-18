export const fetchAllData = async (): Promise<any[]> => {
  await new Promise((res) => setTimeout(res, 100)) // 模擬延遲

  const data = Array.from({ length: 50 }, (_, i) => {
    const id = i + 1
    
    return {
      key: String(id),
      receiveNo: `O1141${id.toString().padStart(3, '0')}`,
      receiveStsCode: id % 4 === 0 ? '承辦' : 
                      id % 4 === 1 ? '變更完成' : 
                      id % 4 === 2 ? '照會補件' : '結案',
      accessUser: id % 3 === 0 ? 'A123456789 張三' :
                  id % 3 === 1 ? 'B234567890 李四' : 'C345678901 王五',
      processUser: id % 2 === 0 ? 'A123456789 張三' : 'C345678901 王五',
      receiveDate: `114/01/${(id % 30 + 1).toString().padStart(2, '0')}`,
    }
  })

  return data
}
