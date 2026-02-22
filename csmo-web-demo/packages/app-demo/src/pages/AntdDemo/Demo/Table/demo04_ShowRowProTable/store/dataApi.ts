export const fetchAllData = async (): Promise<any[]> => {
  const data = [
  {
    policyNo: 'P123456789',
    poStsCode: 'A1',
    basicPlanCode: 'H001',
    basicRateScale: '2',
    poIssueDate: '112/01/10',
    o1Name: '王小明',
    i1Name: '李大華',
    address: '台北市信義區信義路100號',
    phone: '0912345678',
    eMail: 'test@example.com'
  },
  {
    policyNo: 'P987654321',
    poStsCode: 'B2',
    basicPlanCode: 'C002',
    basicRateScale: '3',
    poIssueDate: '113/03/15',
    o1Name: '陳美麗',
    i1Name: '陳小美',
    address: '新北市板橋區中山路1段123號',
    phone: '0922333444',
    eMail: 'meili@example.com'
  }
]

  return data
}
