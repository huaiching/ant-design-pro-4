import { chain, curry, Dictionary, forEach, isEmpty, merge } from 'lodash'
import { useEffect, useState } from 'react'

type LoadsLookupDetailsParams = {
  lookupName: string
  effectiveAsOfDate?: string
  fields?: string
  'Accept-Language'?: string
}

type BackOfficeLookupsLoadLookupResponse = {
  filters?: Record<string, any>
  displayValue?: string
  code?: string
  orderNo?: number
  effectiveDate?: string
  expirationDate?: string
}

type LoadsLookupDetailsFunc = (
  params: LoadsLookupDetailsParams & {
    'Accept-Language'?: string
  },
  body: Record<string, any>,
  options?: Record<string, any>
) => Promise<BackOfficeLookupsLoadLookupResponse[]>

export interface FormatLookups {
  label?: string
  value?: string
  filter?: Record<string, any>
}

type LookupGeneratorFunc = (
  value: BackOfficeLookupsLoadLookupResponse,
  index: number
) => FormatLookups | BackOfficeLookupsLoadLookupResponse

export interface LookupConfig {
  // 刷新傳入的lookup
  forceRefresh?: boolean
  // 自訂lookup的render 傳入會覆蓋lookups的內容
  customGeneratorFunc?: LookupGeneratorFunc
}

type LookupResult = {
  lookups: Dictionary<any>
  formatLookups: Dictionary<any>
  formatLookupsWithoutKey: Dictionary<any>
}

const LookupApi = (() => {
  let apiFunc: LoadsLookupDetailsFunc
  const LookupMemo: any = {
    lookups: {},
    formatLookups: {},
    formatLookupsWithoutKey: {}
  }
  return {
    registerApi(func: LoadsLookupDetailsFunc) {
      if (!func) return
      apiFunc = func
    },
    async request(lookupNames: string[], config?: LookupConfig, bodyParams?: any) {
      if (!apiFunc) {
        throw new Error('請配置Lookup Request API')
      }
      const readyList: LookupResult = {
        lookups: {},
        formatLookups: {},
        formatLookupsWithoutKey: {}
      }
      let unCacheLookups: string[] = []

      if (config?.forceRefresh) {
        unCacheLookups = lookupNames
      } else {
        forEach(lookupNames, (name) => {
          if (LookupMemo?.lookups[name]) {
            readyList.lookups[name] = LookupMemo.lookups[name]
            readyList.formatLookups[name] = LookupMemo.formatLookups[name]
            readyList.formatLookupsWithoutKey[name] = LookupMemo.formatLookupsWithoutKey[name]
          } else {
            unCacheLookups.push(name)
          }
        })
        if (unCacheLookups.length === 0) {
          return Promise.resolve(readyList)
        }
      }

      return Promise.allSettled(
        unCacheLookups.map((lookupName) => apiFunc({ lookupName }, bodyParams ?? {}))
      ).then((lookupsRes) => {
        function generateLookupValues(
          data: PromiseSettledResult<BackOfficeLookupsLoadLookupResponse[]>[],
          generateFunc: LookupGeneratorFunc
        ) {
          const valueRes = chain(data)
            .map((lookup, index) => {
              if (lookup.status === 'fulfilled') {
                if (bodyParams && !isEmpty(bodyParams?.sort)) {
                  return [unCacheLookups[index], lookup.value.map(generateFunc)]
                }
                return [
                  unCacheLookups[index],
                  chain(lookup.value).orderBy('orderNo').map(generateFunc).value()
                ]
              }
              // status === rejected
              return [unCacheLookups[index], []]
            })
            .fromPairs()
            .value()
          return valueRes
        }

        const defaultGenerator = (item: BackOfficeLookupsLoadLookupResponse) => item
        const formatWithKeyGenerator = (item: BackOfficeLookupsLoadLookupResponse) => ({
          label: `${item.code} ${item.displayValue}`,
          value: item.code,
          filter: item.filters
        })
        const formatWithoutKeyGenerator = (item: BackOfficeLookupsLoadLookupResponse) => ({
          label: `${item.displayValue}`,
          value: item.code,
          filter: item.filters
        })

        const curriedGenerator = curry(generateLookupValues)(lookupsRes)
        const lookups = curriedGenerator(config?.customGeneratorFunc || defaultGenerator)
        const formatLookups = curriedGenerator(formatWithKeyGenerator)
        const formatLookupsWithoutKey = curriedGenerator(formatWithoutKeyGenerator)

        merge(LookupMemo, { lookups, formatLookups, formatLookupsWithoutKey })
        return merge({}, readyList, {
          lookups,
          formatLookups,
          formatLookupsWithoutKey
        })
      })
    }
  }
})()

function useLookups(lookupNames: string[], config?: LookupConfig, bodyParams?: any) {
  const [resultCollection, setResultCollection] = useState<LookupResult>({
    lookups: {},
    formatLookups: {},
    formatLookupsWithoutKey: {}
  })

  useEffect(() => {
    LookupApi.request(lookupNames, config, bodyParams).then((res) => {
      setResultCollection({
        ...res
      })
    })
  }, [])

  return { ...resultCollection }
}

export { LookupApi, useLookups }
