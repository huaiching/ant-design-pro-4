import dayjs from '@mli-csmo/app-common/src/util/dayjs'
import { requestConfig } from '@mli-csmo/app-model/src/request'
import { registerConfig } from '@mli-csmo/base'

registerConfig(requestConfig)

dayjs.locale('zh-tw')
