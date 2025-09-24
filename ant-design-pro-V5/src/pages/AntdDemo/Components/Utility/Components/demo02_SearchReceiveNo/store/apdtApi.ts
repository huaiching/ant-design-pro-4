

export const fetchData = async (): Promise<any[]> => {

  const data = Array.from({ length: 9 }, (_, index) => ({
  poChgReceNo: `P003698${index + 1}`,
  poChgStsCode: 'C',
  poChgReceDate: `114/01/0${index + 1}`
}))

  // 模擬等待
  await new Promise((resolve) => {setTimeout(resolve, 3)})

  return data
}
