export const fetchAllData = async (): Promise<any[]> => {
  const data = [
    {
      policyNo: 'P123456789',
      poStsCode: '有效',
      basicPlanCode: 'A001',
      basicRateScale: 'V1',
      poIssueDate: '114/01/04',
      o1Name: '王大明',
      i1Name: '王小明',
      address: '台北市信義區',
      phone: '0912345678',
      eMail: 'example@mail.com'
    }
  ]

  return data
}
