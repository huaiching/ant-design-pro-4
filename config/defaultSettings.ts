import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  // navTheme: 'dark',
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#f16c23',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  // title: 'Ant Design Pro',
  title: '三商美邦人壽',
  pwa: false,
  iconfontUrl: '',
};

export type { DefaultSettings };

export default proSettings;
