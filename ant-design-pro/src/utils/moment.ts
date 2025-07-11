// src/utils/moment.ts
import moment from 'moment';
import 'moment/locale/zh-tw';

moment.locale('zh-tw');

const originalMoment = moment;

// patch format 輸出民國年 tYY
const originalFormat = moment.fn.format;
moment.fn.format = function (formatStr: string) {
  if (typeof formatStr !== 'string') return originalFormat.call(this, formatStr);
  const rocYear = this.year() - 1911;
  const replaced = formatStr.replace(/tYY/g, `${rocYear}`);
  return originalFormat.call(this, replaced);
};

// 自訂解析民國年字串
function parseTaiwanDateString(dateString: string, formatStr: string) {
  if (!formatStr.includes('tYY')) return originalMoment(dateString, formatStr);

  // 用正則匹配民國年/月/日
  const regex = formatStr
    .replace(/tYY/g, '(\\d{2,3})')
    .replace(/MM/g, '(\\d{1,2})')
    .replace(/DD/g, '(\\d{1,2})');
  const match = new RegExp(`^${regex}$`).exec(dateString);
  if (!match) return originalMoment(null); // invalid moment

  const rocYear = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);
  const year = rocYear + 1911;

  return originalMoment(`${year}-${month}-${day}`, 'YYYY-M-D');
}

// 用 Proxy 攔截 moment 建構調用
const momentProxy = new Proxy(moment, {
  apply(target, thisArg, args) {
    const [arg1, arg2, ...rest] = args;
    if (typeof arg1 === 'string' && typeof arg2 === 'string' && arg2.includes('tYY')) {
      return parseTaiwanDateString(arg1, arg2);
    }
    return originalMoment(...args);
  },
});

export default momentProxy;
