declare module 'slash2'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '*.ttf'
declare module 'omit.js'
declare module 'numeral'
declare module '@antv/data-set'
declare module 'mockjs'
declare module 'react-fittext'
declare module 'bizcharts-plugin-slider'

declare let ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: 'site' | undefined

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false

declare namespace Common {
  type UpdateFormProps = {
    id?: string
  }

  type DetailFormProps = {
    id?: string
  }

  type HistoryProps = {
    entityId?: string
    trainingCode?: string
  }
}
