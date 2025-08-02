"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utc2Dayjs = exports.toTaiwan = exports.isUtc = exports.getLocalTimeString = exports.getDayjsObject = exports.getDateObject = exports.genTimeCriterion = exports.dateToROCMonth = exports.dateToROCDateWithFormat = exports.dateToROCDate = exports.dateToADYear = exports.dateToADMonth = exports.dateToADDate = exports.dateTimeToUTC = exports.currentTimeROCAmPm = void 0;
var _dayjs = _interopRequireDefault(require("dayjs"));
var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * 將西元年份轉換為台灣民國年格式
 * @param gYear - 西元年份(1912年為民國元年)
 * @param month - 可選月份(1-12)
 * @param day - 可選日期(1-31)
 * @returns 台灣格式年月日物件，年份用3位數字符串表示(補零)
 */
var toTaiwan = exports.toTaiwan = function toTaiwan(gYear, month, day) {
  return {
    year: gYear <= 1911 ? (gYear - 1912).toString().padStart(3, '0') : (gYear - 1911).toString().padStart(3, '0'),
    month: month,
    day: day
  };
};
_dayjs.default.extend(_utc.default);
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
    if (_dayjs.default.isDayjs(dateString)) {
      return dateString.format(ADFormatMap[type]);
    }
    //TT/MM/DD
    var shortRocFormat = /^(\d{2})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
    if (shortRocFormat.test(dateString)) {
      // 在年份前補零
      dateString = "0".concat(dateString);
    }
    if (dateString < DIVIDE_YEAR) {
      // 台灣年
      var dateMoment = (0, _dayjs.default)(dateString, formatMessage({
        id: "common.".concat(type)
      }));
      if (dateMoment.isValid()) {
        return dateMoment.format(ADFormatMap[type]);
      }
    }
    // 本身是公元年
    return dateString;
  }
  return dateString;
};
var dateToADDate = exports.dateToADDate = function dateToADDate(dateString, formatMessage) {
  return dateToAD(dateString, formatMessage, 'date');
};
var dateToADYear = exports.dateToADYear = function dateToADYear(dateString, formatMessage) {
  return dateToAD(dateString, formatMessage, 'year');
};
var dateToADMonth = exports.dateToADMonth = function dateToADMonth(dateString, formatMessage, valueType) {
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
    if (_dayjs.default.isDayjs(dateString)) {
      return dateString.format(ROCFormatMap[type]);
    }
    if (dateString >= DIVIDE_YEAR) {
      // 西元年
      var dateMoment = (0, _dayjs.default)(dateString, formatMessage({
        id: "common.".concat(type)
      }));
      if (dateMoment.isValid()) {
        return dateMoment.format(ROCFormatMap[type]);
      }
    }
    return dateString;
  }
  return dateString;
};
var dateToROCDateWithFormat = exports.dateToROCDateWithFormat = function dateToROCDateWithFormat(dateString, format) {
  if (dateString) {
    if (_dayjs.default.isDayjs(dateString)) {
      return dateString.format(ROCFormatMap['date']);
    }
    if (dateString >= DIVIDE_YEAR) {
      // 西元年
      var dateMoment = (0, _dayjs.default)(dateString, format);
      if (dateMoment.isValid()) {
        return dateMoment.format(ROCFormatMap['date']);
      }
    }
    return dateString;
  }
  return dateString;
};
var dateToROCMonth = exports.dateToROCMonth = function dateToROCMonth(dateString, formatMessage) {
  return dateToROC(dateString, formatMessage, 'month');
};
var dateToROCDate = exports.dateToROCDate = function dateToROCDate(dateString, formatMessage) {
  return dateToROC(dateString, formatMessage, 'date');
};
var dateTimeToUTC = exports.dateTimeToUTC = function dateTimeToUTC(dateString, formatMessage) {
  if (dateString) {
    var _dayjsObject;
    var dayjsObject;
    var ROCDate = (0, _dayjs.default)(dateString, formatMessage({
      id: 'common.dateTime'
    }));
    if (ROCDate.isValid()) {
      dayjsObject = ROCDate;
    } else {
      var ADDate = (0, _dayjs.default)(dateString, 'YYYY-MM-DD HH:mm:ss');
      if (ADDate.isValid()) dayjsObject = ADDate;
    }
    return (_dayjsObject = dayjsObject) === null || _dayjsObject === void 0 ? void 0 : _dayjsObject.utc();
  }
  return undefined;
};
var getDayjsObject = exports.getDayjsObject = function getDayjsObject(dateString, formatMessage) {
  if (dateString) {
    var ROCDate = (0, _dayjs.default)(dateString, formatMessage({
      id: 'common.date'
    }));
    if (ROCDate.isValid()) return ROCDate;
    var ADDate = (0, _dayjs.default)(dateString, 'YYYY-MM-DD');
    if (ADDate.isValid()) return ADDate;
  }
  return undefined;
};
var getDateObject = exports.getDateObject = function getDateObject(dateString, formatMessage) {
  if (dateString) {
    var ROCDate = (0, _dayjs.default)(dateString, formatMessage({
      id: 'common.date'
    }));
    if (ROCDate.isValid()) return ROCDate;
    var ADDate = (0, _dayjs.default)(dateString, 'YYYY-MM-DD');
    if (ADDate.isValid()) return ADDate;
  }
  return undefined;
};
var utc2Dayjs = exports.utc2Dayjs = function utc2Dayjs(dateString) {
  return dateString ? (0, _dayjs.default)(dateString) : null;
};

/**
 * 取得本地時間字符串(HH:mm:ss格式)
 * @param dateString - UTC時間字符串
 * @returns 轉換後的本地時間字符串，無效值返回空字符串
 */
var getLocalTimeString = exports.getLocalTimeString = function getLocalTimeString(dateString) {
  var _utc2Dayjs$local$form, _utc2Dayjs;
  return (_utc2Dayjs$local$form = (_utc2Dayjs = utc2Dayjs(dateString)) === null || _utc2Dayjs === void 0 || (_utc2Dayjs = _utc2Dayjs.local()) === null || _utc2Dayjs === void 0 ? void 0 : _utc2Dayjs.format('HH:mm:ss')) !== null && _utc2Dayjs$local$form !== void 0 ? _utc2Dayjs$local$form : '';
};

/**
 * 處理查詢條件中傳時間範圍，默認為UTC格式
 * start開始時間，end結束時間，columnName要轉換的字段，formatMessage必傳，因為從這裡取不到
 */
var genTimeCriterion = exports.genTimeCriterion = function genTimeCriterion(start, end, columnName, formatStr) {
  var startRes = start ? (0, _dayjs.default)(start).startOf('days').utc() : '';
  var endRes = end ? (0, _dayjs.default)(end).endOf('days').utc() : '';
  // 傳入格式化參數時，轉為入參形式
  startRes = formatStr && start ? (0, _dayjs.default)(start).startOf('days').format(formatStr) : startRes;
  endRes = formatStr && end ? (0, _dayjs.default)(end).endOf('days').format(formatStr) : endRes;
  return start && end ? [{
    field: columnName,
    values: [startRes, endRes],
    queryOperator: 'BETWEEN'
  }] : [{
    field: columnName,
    value: startRes,
    queryOperator: 'GE'
  }, {
    field: columnName,
    value: endRes,
    queryOperator: 'LE'
  }];
};
var isUtc = exports.isUtc = function isUtc(date) {
  if (!date) {
    return false;
  }
  var lastChart = date.charAt(date.length - 1);
  return lastChart === 'Z';
};
var currentTimeROCAmPm = exports.currentTimeROCAmPm = function currentTimeROCAmPm(formatMessage) {
  var current = (0, _dayjs.default)();
  var meridiem = current.hour() < 12 ? 'AM' : 'PM';
  return current.format("".concat(formatMessage({
    id: 'common.date'
  }), " hh:mm ")) + meridiem;
};