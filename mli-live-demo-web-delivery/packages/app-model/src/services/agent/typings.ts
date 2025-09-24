export declare namespace agent {
  export type AgentDetailClientVO = {
    /** 業務員代碼 */
    agentCode?: string
    /** 業務員姓名 */
    names?: string
    /** 業務員性別 */
    sex?: string
    /** 業務員出生日期 */
    birthDate?: string
    /** 業務員職級 */
    level?: string
    /** 業務員的部門代碼 */
    deptCode?: string
    /** 業務員的部門名稱 */
    deptName?: string
    /** 業務員的部門主管 */
    deptHead?: string
  }

  export type Criterion = {
    relativeTo?: string
    field?: string
    queryOperator?: string
    value?: string
    values?: string[]
    compoundOperator?: string
    sorts?: Sort[]
    ignoreCase?: boolean
    nested?: Criterion[]
  }

  export type loggerNameParams = {
    loggerName: string
  }

  export type LogLevelClientVO = {
    name?: string
    currentLevel?: string
    originalLevel?: string
    modified?: boolean
  }

  export type QueryClaimHistoryClientVO = {
    examineName?: string
    claimCurrency?: string
    approveDate?: string
    clExamineDesc?: string
    policyNo?: string
    claimYear?: string
    claimDesc?: string
    clEventDesc?: string
    claimSeq?: number
    clcmInd?: string
    clStsDesc?: string
    eventName?: string
    claimAmt?: number
    examineUser?: string
    eventDate?: string
  }

  export type QueryClaimHistoryDTO = {
    /** 保單號碼 */
    policyNo?: string
    /** 被保險人ID */
    insuredId?: string
    /** 年度 */
    claimYear?: string
  }

  export type Sort = {
    field?: string
    direction?: string
  }
}
