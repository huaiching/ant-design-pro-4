import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
/**
 * 將西元年份轉換為台灣民國年格式
 * @param gYear - 西元年份(1912年為民國元年)
 * @param month - 可選月份(1-12)
 * @param day - 可選日期(1-31)
 * @returns 台灣格式年月日物件，年份用3位數字符串表示(補零)
 */
export var toTaiwan = function toTaiwan(gYear, month, day) {
  return {
    year: gYear <= 1911 ? (gYear - 1912).toString().padStart(3, '0') : (gYear - 1911).toString().padStart(3, '0'),
    month: month,
    day: day
  };
};
dayjs.extend(utc);
var DIVIDE_YEAR = '1970';
var ADFormatMap = {
  date: 'YYYY-MM-DD',
  year: 'YYYY',
  month: 'YYYYMM'
};

/**
 * 通用日期轉換函數(轉為西元格式)
 * @param dateString - 輸入日期(Dayjs物件或字符串)
 * @param formatMessage - 國際化格式化函數
 * @param type - 日期格式類型(date/year/month)
 * @returns 格式化後的西元日期字符串，保留原始無效值
 */
var dateToAD = function dateToAD(dateString, formatMessage, type) {
  if (dateString) {
    if (dayjs.isDayjs(dateString)) {
      return dateString.format(ADFormatMap[type]);
    }
    //TT/MM/DD
    var shortRocFormat = /^(\d{2})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
    if (shortRocFormat.test(dateString)) {
      // 在年份前補零
      dateString = "0".concat(dateString);
    }

    // 判斷是否為AD，年份是4位數，就認為是AD
    var regexAD = /^(\d{4})[\/-](0[1-9]|1[0-2])[\/-](0[1-9]|[12]\d|3[01])$/;
    var matchAD = regexAD.exec(dateString);

    // 回傳原始值
    if (matchAD) {
      return dayjs(dateString).format(ADFormatMap[type]);
    }

    // 驗證格式
    var regex = /^(\d{1,3})[\/-](0[1-9]|1[0-2])[\/-](0[1-9]|[12]\d|3[01])$/;
    var match = regex.exec(dateString);
    if (!match) {
      return null;
    }

    // 換成西元
    var era = parseInt(match[1], 10) + 1911;
    var month = parseInt(match[2], 10) - 1;
    var date = parseInt(match[3], 10);
    // dayjs化
    var aDDate = dayjs(new Date(era, month, date));
    if (aDDate.isValid()) {
      return aDDate.format(ADFormatMap[type]);
    }

    // if (dateString < DIVIDE_YEAR) {
    // 台灣年
    // const dateMoment = dayjs(dateString, formatMessage({ id: `common.${type}` }))
    // if (dateMoment.isValid()) {
    //   return dateMoment.format(ADFormatMap[type])
    // }
    // }
    // 
    // 本身是公元年
    // return dateString
  }
  return dateString;
};
export var dateToADDate = function dateToADDate(dateString, formatMessage) {
  return dateToAD(dateString, formatMessage, 'date');
};
export var dateToADYear = function dateToADYear(dateString, formatMessage) {
  return dateToAD(dateString, formatMessage, 'year');
};
export var dateToADMonth = function dateToADMonth(dateString, formatMessage, valueType) {
  var ADString = dateToAD(dateString, formatMessage, 'month');
  return valueType === 'number' ? Number(ADString === null || ADString === void 0 ? void 0 : ADString.replace(/-/g, '')) : ADString;
};
var ROCFormatMap = {
  date: 'TTT/MM/DD',
  year: 'TTT',
  month: 'TTT/MM'
};

/**
 * 通用日期轉換函數(轉為民國格式)
 * @param dateString - 輸入日期(Dayjs物件或字符串)
 * @param formatMessage - 國際化格式化函數
 * @param type - 日期格式類型(date/year/month)
 * @returns 格式化後的民國日期字符串，保留原始無效值
 */
var dateToROC = function dateToROC(dateString, formatMessage, type) {
  if (dateString) {
    if (dayjs.isDayjs(dateString)) {
      return dateString.format(ROCFormatMap[type]);
    }

    // 判斷是否為ROC，年份是3位數，就認為是ROC
    var regexROC = /^(\d{1,3})[\/-](0[1-9]|1[0-2])[\/-](0[1-9]|[12]\d|3[01])$/;
    var matchROC = regexROC.exec(dateString);

    // 回傳原始值
    if (matchROC) {
      return dateString;
    }

    // 驗證格式
    var regex = /^(\d{1,4})[\/-](0[1-9]|1[0-2])[\/-](0[1-9]|[1-2]\d|3[01])$/;
    var match = regex.exec(dateString);
    if (!match) {
      return null;
    }
    var era = parseInt(match[1], 10);
    var month = parseInt(match[2], 10) - 1;
    var date = parseInt(match[3], 10);

    // 西元年小於民國元年皆不計算
    if (era < 1912) {
      return null;
    }

    // 轉成民國年
    var minguoYear = era - 1911;
    var minguoDate = dayjs(new Date(era, month, date));

    // 民國年不超過3位數，為符合預設格式
    if (minguoYear > 999) {
      return null;
    }
    if (minguoDate.isValid()) {
      return minguoDate.format(ROCFormatMap[type]);
    }

    // let minguoEraDate = `${minguoYear}/${minguoDate.format('MM')}/${minguoDate.format('DD')}`
    // return minguoEraDate

    // if (dateString >= DIVIDE_YEAR) {
    // 西元年
    // const dateMoment = dayjs(dateString, formatMessage({ id: `common.${type}` }))
    // if (dateMoment.isValid()) {
    //   return dateMoment.format(ROCFormatMap[type])
    // }
    // }
    // 
    // return dateString
  }
  return dateString;
};
export var dateToROCDateWithFormat = function dateToROCDateWithFormat(dateString, format) {
  if (dateString) {
    if (dayjs.isDayjs(dateString)) {
      return dateString.format(ROCFormatMap['date']);
    }

    // if (dateString >= DIVIDE_YEAR) {
    // 西元年
    var dateMoment = dayjs(dateString, format);
    if (dateMoment.isValid()) {
      return dateMoment.format(ROCFormatMap['date']);
    }
    // }

    return dateString;
  }
  return dateString;
};
export var dateToROCMonth = function dateToROCMonth(dateString, formatMessage) {
  return dateToROC(dateString, formatMessage, 'month');
};
export var dateToROCDate = function dateToROCDate(dateString, formatMessage) {
  return dateToROC(dateString, formatMessage, 'date');
};
export var dateTimeToUTC = function dateTimeToUTC(dateString, formatMessage) {
  if (dateString) {
    var _dayjsObject;
    var dayjsObject;
    var ROCDate = dayjs(dateString, formatMessage({
      id: 'common.dateTime'
    }));
    if (ROCDate.isValid()) {
      dayjsObject = ROCDate;
    } else {
      var ADDate = dayjs(dateString, 'YYYY-MM-DD HH:mm:ss');
      if (ADDate.isValid()) dayjsObject = ADDate;
    }
    return (_dayjsObject = dayjsObject) === null || _dayjsObject === void 0 ? void 0 : _dayjsObject.utc();
  }
  return undefined;
};
export var getDayjsObject = function getDayjsObject(dateString, formatMessage) {
  if (dateString) {
    var ROCDate = dayjs(dateString, formatMessage({
      id: 'common.date'
    }));
    if (ROCDate.isValid()) return ROCDate;
    var ADDate = dayjs(dateString, 'YYYY-MM-DD');
    if (ADDate.isValid()) return ADDate;
  }
  return undefined;
};
export var getDateObject = function getDateObject(dateString, formatMessage) {
  if (dateString) {
    var ROCDate = dayjs(dateString, formatMessage({
      id: 'common.date'
    }));
    if (ROCDate.isValid()) return ROCDate;
    var ADDate = dayjs(dateString, 'YYYY-MM-DD');
    if (ADDate.isValid()) return ADDate;
  }
  return undefined;
};
export var utc2Dayjs = function utc2Dayjs(dateString) {
  return dateString ? dayjs(dateString) : null;
};

/**
 * 取得本地時間字符串(HH:mm:ss格式)
 * @param dateString - UTC時間字符串
 * @returns 轉換後的本地時間字符串，無效值返回空字符串
 */
export var getLocalTimeString = function getLocalTimeString(dateString) {
  var _utc2Dayjs$local$form, _utc2Dayjs;
  return (_utc2Dayjs$local$form = (_utc2Dayjs = utc2Dayjs(dateString)) === null || _utc2Dayjs === void 0 || (_utc2Dayjs = _utc2Dayjs.local()) === null || _utc2Dayjs === void 0 ? void 0 : _utc2Dayjs.format('HH:mm:ss')) !== null && _utc2Dayjs$local$form !== void 0 ? _utc2Dayjs$local$form : '';
};

/**
 * 處理查詢條件中傳時間範圍，默認為UTC格式
 * start開始時間，end結束時間，columnName要轉換的字段，formatMessage必傳，因為從這裡取不到
 */
export var genTimeCriterion = function genTimeCriterion(start, end, columnName, formatStr) {
  var startRes = start ? dayjs(start).startOf('days').utc() : '';
  var endRes = end ? dayjs(end).endOf('days').utc() : '';
  // 傳入格式化參數時，轉為入參形式
  startRes = formatStr && start ? dayjs(start).startOf('days').format(formatStr) : startRes;
  endRes = formatStr && end ? dayjs(end).endOf('days').format(formatStr) : endRes;
  return start && end ? [{
    field: columnName,
    values: [startRes, endRes],
    queryOperator: 'BETWEEN'
  }] : [{
    field: columnName,
    value: startRes,
    queryOperator: 'GREATER_THAN'
  }, {
    field: columnName,
    value: endRes,
    queryOperator: 'LESS_THAN'
  }];
};
export var isUtc = function isUtc(date) {
  if (!date) {
    return false;
  }
  var lastChart = date.charAt(date.length - 1);
  return lastChart === 'Z';
};
export var currentTimeROCAmPm = function currentTimeROCAmPm(formatMessage) {
  var current = dayjs();
  var meridiem = current.hour() < 12 ? 'AM' : 'PM';
  return current.format("".concat(formatMessage({
    id: 'common.date'
  }), " hh:mm ")) + meridiem;
};