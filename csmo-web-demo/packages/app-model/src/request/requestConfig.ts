import notification from 'antd/es/notification'
import type { AxiosResponse } from 'axios'
import type { RequestConfig } from '@mli-csmo/base'
import {message} from "antd";

enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9
}

interface ErrorInfoStructure {
  success: boolean
  data?: any
  errorCode?: string
  errorMessage?: string
  showType?: ErrorShowType
  traceId?: string
  host?: string

  [key: string]: any
}

const LOGOUT_PATH = '/logout'
const TOKEN_PREFIX = 'Authorization'
const DEFAULT_ERROR_PAGE = '/exception'

const isLoginPage = location.pathname.indexOf('/login') !== -1

/**
 *
 * @param response 响應的攔截器
 * @returns
 */
const customizeResponseInterceptors = (response: AxiosResponse) => {
  const token = response.headers[TOKEN_PREFIX]
  if (token != null) {
    localStorage.setItem(TOKEN_PREFIX, token)
  }
  const url = response.request?.url
  if (url && url.includes(LOGOUT_PATH)) {
    localStorage.removeItem(TOKEN_PREFIX)
  }
  return response
}

const errorHandler = (error: any, opts: any) => {
  if (opts?.skipErrorHandler) throw error
  if (error.response && error.response.status === 401) {
    const redirectUri = encodeURIComponent(location.pathname + location.search)
    const isLoginApi =
      error.responseURL && error.responseURL?.indexOf('common/Security/getLoginUserInfo') !== -1
    if (isLoginApi) {
      const { data = {} } = error as any
      if (
        data.statusCode === 401 &&

        data.message.includes(
          'Invalid credential for request /common/Security/getLoginUserInfo for user'
        )
      ) {
        console.error('用戶名或密碼錯誤')
      } else {
        console.error('無操作權限')
      }
    }
    if (isLoginPage) {
      // 登錄頁面抛出錯誤，由頁面定制
      throw error
    } else {
      // 非登錄頁面重定向
      // message.error('登錄信息已過期，請重新登錄')
      // setTimeout(() => {
      //   window.location.href = `/login?redirectUri=${redirectUri}`
      // }, 1000)
      throw error
    }
  }

  const fileRead = (file: any, type: 'text') => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = function (event) {
        resolve(event.target?.result)
      }
      reader.onerror = function (event) {
        reject(event)
      }
      reader.readAsText(file)
    })
  }

  let errorInfo: ErrorInfoStructure = {
    ...error.response,
    success: error.response?.status >= 200 && error.response?.status < 300,
    errorCode: error.response?.data?.errorCode || error.code,
    errorMessage: error.response?.data?.errorMessage || error.message,
    showType:
      error?.response?.status >= 400 && error?.response?.status < 500
        ? ErrorShowType.NOTIFICATION
        : ErrorShowType.ERROR_MESSAGE
  }
  if (error.name === 'AxiosError' && error.request) {
    if (
      error?.request?.options?.responseType === 'blob' &&
      error?.response?.status >= 400 &&
      error?.response?.status <= 500 &&
      error.response?.data
    ) {
      //  處理下載文件的報錯信息
      fileRead(error.response.data, 'text').then((data) => {
        const errorJson = JSON.parse((data as string) || '{}')
        errorInfo!.errorMessage = errorJson.message
      })
    }
    if (errorInfo.errorCode && ['500', '404', '408', '400', '422'].includes(errorInfo.errorCode)) {
      if (error?.length) {
        let errMsg = ''
        errorInfo.errors.map((item: any) => {
          message.error(item.message)
          errMsg = errMsg + '；' + item.message
        })
        errorInfo.errorMessage = errMsg
      } else if (errorInfo?.message?.length) {
        errorInfo.errorMessage = errorInfo?.message
      } else {
        errorInfo.errorMessage = '很抱歉，您訪問的頁面有誤！'
      }
    }
    // 當连接后端服务异常时，优化友好提示
    if (errorInfo?.errorCode === 'ERR_NETWORK') {
      errorInfo.errorMessage = '很抱歉，後端服務連接有誤！'
    }
    if (errorInfo.errorCode === '409') {
      errorInfo.errorMessage = '數據已被修改，請重新加載！'
    }
    if (
      errorInfo?.errorMessage &&
      errorInfo?.errorMessage?.indexOf('Unable to deserialize data') !== -1
    ) {
      errorInfo.errorMessage = '資料錄入有誤！'
    }
    error.message = errorInfo?.errorMessage || error.message
    error.info = errorInfo
  } else if (!!error.info) {
    errorInfo = error.info
  } else {
    message.error('很抱歉，您訪問的頁面有誤！', 5)
    throw error
  }

  if (errorInfo) {
    const errorMessage = errorInfo?.errorMessage
    const errorCode = errorInfo?.errorCode

    switch (errorInfo?.showType) {
      case ErrorShowType.SILENT:
        break
      case ErrorShowType.WARN_MESSAGE:
        message.warning(errorMessage, 5)
        break
      case ErrorShowType.ERROR_MESSAGE:
        message.error(errorMessage, 5)
        break
      case ErrorShowType.NOTIFICATION:
        notification.open({
          description: errorMessage,
          message: errorCode
        })
        break
      case ErrorShowType.REDIRECT:
        // @ts-ignore
        window.location.href = DEFAULT_ERROR_PAGE
        // 跳轉錯誤頁面
        break
      default:
        message.error(errorMessage, 5)
        break
    }
    throw error
  } else {
    message.error(error.message || 'Request error, please retry.', 5)
    throw error
  }
}

const requestInterceptors = async (url: any, options: any) => {
  let token = ''
  return {
    url,
    options: {
      ...options,
      interceptors: true,
      headers: {
        ...options.headers,
        Authorization: token,
        ['Accept-Language']: 'zh_TW',
        ['X-Locale']: 'zh_TW',
      }
    }
  }
}

/**
 * @name 錯誤處理
 * pro 自帶的錯誤處理， 可以在這裡做自己的改動
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  timeout: 120 * 1000,
  errorConfig: {
    // 錯誤接收及處理
    errorHandler
  },
  // 請求攔截器
  requestInterceptors: [requestInterceptors],

  // 回應攔截器
  responseInterceptors: [customizeResponseInterceptors]
}
