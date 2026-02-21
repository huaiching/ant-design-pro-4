export const getAllData = async (): Promise<any> => {
  await new Promise((res) => setTimeout(res, 100)) // 模擬延遲

  const data = {
    sampleText: '這是示範資料'
  }

  return data
}
