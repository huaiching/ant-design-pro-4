import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/zh-tw'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import minguoEra from './minguoEra'
import minguoEraParse from './minguoEraParse'

dayjs.locale('zh-tw')
dayjs.extend(customParseFormat)
dayjs.extend(minguoEra)
dayjs.extend(minguoEraParse)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export default dayjs
export { Dayjs }
