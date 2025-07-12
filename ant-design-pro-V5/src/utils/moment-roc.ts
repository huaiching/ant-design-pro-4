import moment from 'moment';
import 'moment/locale/zh-tw';

moment.defineLocale('zh-tw-roc', {
  parentLocale: 'zh-tw',
  longDateFormat: {
    LTS: 'HH:mm:ss',
    LT: 'HH:mm',
    L: 'tYY/MM/DD',
    LL: 'tYY年MM月DD日',
    LLL: 'tYY年MM月DD日 HH:mm',
    LLLL: 'tYY年MM月DD日dddd HH:mm'
  },
preparse(str: string): string {
    return str.replace(
        /t(\d{2,3})[\/\-](\d{2})[\/\-](\d{2})/,
        (_: string, y: string, m: string, d: string) => `${parseInt(y) + 1911}/${m}/${d}`
    );
},
  postformat(str: string) {
    return str.replace(
      /(\d{4})[\/\-](\d{2})[\/\-](\d{2})/,
      (_, y, m, d) => `t${parseInt(y) - 1911}/${m}/${d}`
    );
  },
});

moment.locale('zh-tw-roc');

export default moment;
