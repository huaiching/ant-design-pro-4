import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

export const useMount = (fn: () => void) => {
  useEffect(
    () => {
      fn?.()
    },
    []
  )
}

/**
 * 跳過第一次render
 * @param effectFn
 * @param deps
 */
export const useUpdateEffect = (effectFn: EffectCallback, deps?: DependencyList) => {
  const isFirst = useRef(false)

  useEffect(() => {
    return () => {
      isFirst.current = false
    }
  }, [])

  useEffect(() => {
    if (!isFirst.current) {
      isFirst.current = true
    } else {
      return effectFn()
    }
  }, deps)
}
