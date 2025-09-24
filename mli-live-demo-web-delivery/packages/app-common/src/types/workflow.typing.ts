import React from 'react'

export type WorkflowComponentsActions = {
  approve: (commitsVal: string) => Promise<void>
  reject: (commitsVal: string) => Promise<void>
  // 流程同意過程處理
  approveProcess?: (nextNodeId?: string) => Promise<void>
  // 流程拒絕過程處理
  rejectProcess?: (preNodeId?: string) => Promise<void> 
}

export type WorkflowComponentsBtnStatusAction = {
  setApprovedBtnDisable: React.Dispatch<React.SetStateAction<boolean>>
  setRejectBtnDisable: React.Dispatch<React.SetStateAction<boolean>>
}
