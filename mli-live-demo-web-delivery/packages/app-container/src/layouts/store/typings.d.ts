declare namespace Login {
  // 登入請求
  type LoginRequest = {
    username?: string
    password?: string
  }

  // 登入回應
  type LoginResponse = {
    success?: boolean
    message?: string
  }

  // 目前用戶
  type CurrentUserResponse = {
    id?: bigint
    username?: string
    avatar?: string
    phone?: number
    status?: number
    roleIds?: string
    roleAccesses?: Access[]
  }

  // 權限
  type Access = {
    menuId?: bigint
    routerPath: string
    handlerCodes?: string[]
    dimension?: number
  }
}
