export declare namespace claim {
  export type ClaimBasicInfoVO = {
    /** 查詢結果(0:成功，1:失敗) */
    resultInd?: number
    /** 生效日期 */
    poIssueDate?: string
    /** 受理日期 */
    receiveDate?: string
    /** 事故日期 */
    eventDate?: string
    /** 文件齊全日 */
    paperOkDate?: string
    /** 結案日期 */
    approveDate?: string
    /** 事故人ID */
    eventId?: string
    /** 事故人姓名 */
    eventName?: string
    /** 理賠型態碼 */
    claimType?: string
    /** 理賠型態 */
    claimDesc?: string
    /** 事故原因1 */
    clEventDesc1?: string
    /** 事故原因2 */
    clEventDesc2?: string
    /** 事故原因3 */
    clEventDesc3?: string
    /** 事故原因4 */
    clEventDesc4?: string
    /** 事故型態碼 */
    clEventType?: string
    /** 事故型態 */
    clEventDesc?: string
    /** 審核員ID */
    examineId?: string
    /** 審核員姓名 */
    examineName?: string
    /** 受理地區碼 */
    recDeptCode?: string
    /** 受理地區 */
    recDeptName?: string
    /** 理賠給付 */
    claimAmt?: number
    /** 紅利給付 */
    dividend?: number
    /** 覆核員ID */
    approveId?: string
    /** 覆核員姓名 */
    approveName?: string
    /** 覆核地區碼 */
    approveDeptCode?: string
    /** 覆核地區 */
    approveDeptName?: string
    /** 溢繳保費 */
    premSusp?: number
    /** 退整期保費 */
    miscSusp?: number
    /** 未到期保費 */
    unearnedPrem?: number
    /** 扣保單貸款本息 */
    loans?: number
    /** 扣保單墊繳本息 */
    apls?: number
    /** 扣應繳保費 */
    modePrem?: number
    /** 代扣其他款項 */
    suspense?: number
    /** 給付小計 */
    subAmt?: number
    /** 延息起算日 */
    deferBegDate?: string
    /** 延息結算日 */
    deferEndDate?: string
    /** 延滯利息 */
    deferInt?: number
    /** 結案型態碼 */
    clExamineCode?: string
    /** 結案型態 */
    clExamineDesc?: string
    /** 櫃檯受理 */
    clofApproveInd?: string
    /** 扣所得稅 */
    taxWithheld?: number
    /** 覆核型態碼 */
    clApproveCode?: string
    /** 覆核型態 */
    clApproveDesc?: string
    /** 給付金額 */
    disbAmt?: number
    /** 受益人 */
    benfName?: string
    /** 匯款帳號 */
    remitAccount?: string
    /** 保單關係人 */
    clientIdent?: string
    /** 保險種類 */
    type?: string
    /** 理賠狀態 */
    clStsDesc?: string
    /** 送件業務員姓名 */
    agentName?: string
    /** 營業單位 */
    agentDeptCode?: string
    /** 受理號碼 */
    receiveNo?: string
    /** 副本 */
    clcpInd?: string
    /** 幣別 */
    currency?: string
    /** 事故地區 */
    eventArea?: string
    /** 扣貸款本息 */
    loansApls?: number
    /** 扣欠繳保費 */
    minusPremSusp?: number
    /** 支票委託書 */
    clusInd?: string
    /** 差額證明 */
    clTypeOther?: string
    /** 學號 */
    studentNo?: string
    /** 事故原因1 */
    clEventCode1?: string
    /** 事故原因2 */
    clEventCode2?: string
    /** 事故原因3 */
    clEventCode3?: string
    /** 事故原因4 */
    clEventCode4?: string
    /** 解約金 */
    cvAmtOut?: number
    /** 扣健保補充保費 */
    additionPremium?: number
  }

  export type ClaimHistoryVO = {
    /** 保單號碼 */
    policyNo?: string
    /** 理賠年份 */
    claimYear?: string
    /** 理賠序號 */
    claimSeq?: number
    /** 理賠批註 */
    clcmInd?: string
    /** 事故日期 */
    eventDate?: string
    /** 事故人 */
    eventName?: string
    /** 理賠狀態 */
    clStsDesc?: string
    /** 理賠型態 */
    claimDesc?: string
    /** 結案型態 */
    clExamineDesc?: string
    /** 審核員員編 */
    examineUser?: string
    /** 審核員姓名 */
    examineName?: string
    /** 結案日期 */
    approveDate?: string
    /** 給付金額 */
    claimAmt?: number
    /** 給付幣別 */
    claimCurrency?: string
    /** 事故原因 */
    clEventDesc?: string
  }

  export type ClaimHospitalDetailVO = {
    /** 項目 */
    desc?: string
    /** 起日 */
    begDate?: string
    /** 時間 */
    begTime?: string
    /** 迄日 */
    endDate?: string
    /** 時間 */
    endTime?: string
    /** 天數 */
    clhdDay?: number
    /** 時數 */
    clhdHour?: string
    /** 次數 */
    times?: number
  }

  export type ClaimHospitalVO = {
    /** 查詢結果 */
    resultInd?: number
    /** 醫院代碼 */
    hiHospitalId?: string
    /** 醫院名稱 */
    hiHospitalName?: string
    /** 診別科目代碼+描述 */
    clmdDesc?: string
    /** 醫師姓名 */
    doctorName?: string
    /** 醫師身分證號 */
    doctorId?: string
    /** 就診明細序號 */
    clhnSeq?: number
  }

  export type QueryClaimBasicInfoDTO = {
    /** 保單號碼 */
    policyNo?: string
    /** 理賠序號 */
    claimSeq?: number
    /** 年度 */
    claimYear?: string
  }

  export type QueryClaimHistoryDTO = {
    /** 保單號碼 */
    policyNo?: string
    /** 被保險人ID */
    insuredId?: string
    /** 年度 */
    claimYear?: string
  }

  export type QueryClaimHospitalDetailDTO = {
    /** 保單號碼 */
    policyNo?: string
    /** 理賠序號 */
    claimSeq?: number
    /** 年度 */
    claimYear?: string
    /** 就診明細序號 */
    clhnSeq?: number
  }

  export type QueryClaimHospitalDTO = {
    /** 保單號碼 */
    policyNo?: string
    /** 理賠序號 */
    claimSeq?: number
    /** 年度 */
    claimYear?: string
  }
}
