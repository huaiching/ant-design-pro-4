import type { ProLayoutProps } from '@ant-design/pro-components'
import { layoutDefaultSettings } from '@mli-csmo/app-common/src/config/mircoConfig'

const Settings: ProLayoutProps & {
  pwa?: boolean
  logo?: string
} = {
  ...layoutDefaultSettings
}

export default Settings
