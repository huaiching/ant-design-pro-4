"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertROCFormatToDayjs = convertROCFormatToDayjs;
exports.convertROCInISO8601 = convertROCInISO8601;
exports.utc2Dayjs = exports.toTaiwan = exports.isUtc = exports.ifISO8601ThanTransfer = exports.getLocalTimeString = exports.getDayjsObject = exports.getDateObject = exports.genTimeCriterion = exports.dateToROCMonth = exports.dateToROCDateWithFormat = exports.dateToROCDate = exports.dateToADYear = exports.dateToADMonth = exports.dateToADDate = exports.dateTimeToUTC = exports.currentTimeROCAmPm = void 0;
var _dayjs = _interopRequireWildcard(require("dayjs"));
var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// import timezone from 'dayjs/plugin/timezone'

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
// dayjs.extend(timezone)

var DIVIDE_YEAR = '1970';
var ADFormatMap = {
  date: 'YYYY-MM-DD',
  year: 'YYYY',
  month: 'YYYY-MM'
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

    // 判斷是否為AD，年份是4位數，就認為是AD
    var regexAD = /^(\d{4})(?:[\/-](0[1-9]|1[0-2]))?(?:[\/-](0[1-9]|[12]\d|3[01]))?$/;
    var matchAD = regexAD.exec(dateString);

    // 回傳原始值
    if (matchAD) {
      return (0, _dayjs.default)(dateString).format(ADFormatMap[type]);
    }

    // 驗證格式
    var regex = /^(\d{1,3})(?:[\/-](0[1-9]|1[0-2]))?(?:[\/-](0[1-9]|[12]\d|3[01]))?$/;
    var match = regex.exec(dateString);
    if (!match) {
      return null;
    }

    // 換成西元
    var era = parseInt(match[1], 10) + 1911;
    var month = match[2] ? parseInt(match[2], 10) - 1 : 0;
    var date = match[3] ? parseInt(match[3], 10) : 1;
    // dayjs化
    var aDDate = (0, _dayjs.default)(new Date(era, month, date));
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

    // 判斷是否為ROC，年份是3位數，就認為是ROC
    var regexROC = /^(\d{1,3})(?:[\/-](0[1-9]|1[0-2]))?(?:[\/-](0[1-9]|[12]\d|3[01]))?$/;
    var matchROC = regexROC.exec(dateString);

    // 回傳原始值
    if (matchROC) {
      return dateString;
    }

    // 驗證格式
    var regex = /^(\d{1,4})(?:[\/-](0[1-9]|1[0-2]))?(?:[\/-](0[1-9]|[12]\d|3[01]))?$/;
    var match = regex.exec(dateString);
    if (!match) {
      return null;
    }
    var era = parseInt(match[1], 10);
    var month = match[2] ? parseInt(match[2], 10) - 1 : 0;
    var date = match[3] ? parseInt(match[3], 10) : 1;

    // 西元年小於民國元年皆不計算
    if (era < 1912) {
      return null;
    }

    // 轉成民國年
    var minguoYear = era - 1911;
    var minguoDate = (0, _dayjs.default)(new Date(era, month, date));

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
var dateToROCDateWithFormat = exports.dateToROCDateWithFormat = function dateToROCDateWithFormat(dateString, format) {
  if (dateString) {
    if (_dayjs.default.isDayjs(dateString)) {
      return dateString.format(ROCFormatMap['date']);
    }

    // if (dateString >= DIVIDE_YEAR) {
    // 西元年
    var dateMoment = (0, _dayjs.default)(dateString, format);
    if (dateMoment.isValid()) {
      return dateMoment.format(ROCFormatMap['date']);
    }
    // }

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
    queryOperator: 'GREATER_THAN'
  }, {
    field: columnName,
    value: endRes,
    queryOperator: 'LESS_THAN'
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

/**
 * 解析傳入的Json字串，如果value包含時間格式，則自動轉換成西元格式(YYYY-MM-DD)
 * @param jsonString 傳入的Json字串
 * @returns 轉換好的json字串
 */
var ifISO8601ThanTransfer = exports.ifISO8601ThanTransfer = function ifISO8601ThanTransfer(jsonString) {
  if (!jsonString) {
    return '';
  }
  var jsonObject;
  try {
    jsonObject = JSON.parse(jsonString);
  } catch (e) {
    return '';
  }
  var result = {};
  for (var key in jsonObject) {
    var value = jsonObject[key];
    if (typeof value === 'string') {
      var candidate = value.trim();
      var regexDate = /^(\d{1,4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?Z$/;
      var matchDate = regexDate.exec(candidate);
      if (matchDate) {
        var _matchDate = _slicedToArray(matchDate, 4),
          _ = _matchDate[0],
          yearString = _matchDate[1],
          monthString = _matchDate[2],
          dayString = _matchDate[3];
        var year = parseInt(yearString, 10);
        var month = parseInt(monthString, 10);
        var day = parseInt(dayString, 10);
        year = isNaN(year) ? 1 : year;
        var safeMonth = isNaN(month) ? 1 : month;
        var safeDay = isNaN(day) ? 1 : day;
        if (year < 999) {
          year += 1911;
        }
        var parsed = (0, _dayjs.default)("".concat(year, "-").concat(safeMonth, "-").concat(safeDay), 'YYYY-M-D', true);
        if (parsed.isValid()) {
          result[key] = parsed.format('YYYY-MM-DD');
          continue;
        }
      }
      result[key] = value;
      continue;
    }
    result[key] = value;
  }
  return JSON.stringify(result);
};

/**
 * 如果傳入的內容為dayjs物件，則函數會檢查此物件的年份是否3位數，\
 * 如果是3位數，函數會加上1911
 * @param input 任何
 * @returns 任何或被轉換的dayjs物件
 */
function convertROCInISO8601(input) {
  if ((0, _dayjs.isDayjs)(input)) {
    var year = input.year();
    var month = input.month() + 1;
    var day = input.date();
    var hour = input.hour();
    var minute = input.minute();
    var second = input.second();
    var ms = input.millisecond();
    var adjustedYear = year;
    if (year < 1000) {
      adjustedYear = year + 1911;
    }
    var isoBase = "".concat(adjustedYear.toString().padStart(4, '0'), "-").concat(month.toString().padStart(2, '0'), "-").concat(day.toString().padStart(2, '0'), "T").concat(hour.toString().padStart(2, '0'), ":").concat(minute.toString().padStart(2, '0'), ":").concat(second.toString().padStart(2, '0'), ".").concat(ms.toString().padStart(3, '0'), "Z");
    var parsed = (0, _dayjs.default)(isoBase);
    if (!parsed.isValid()) {
      return input;
    }
    return parsed.toISOString();
  }
  return input;
}

/**
 * 如果是民國年格式的文字，如regex所示，\
 * 就轉換成西元年並變成Dayjs物件
 * @param input 任何
 * @returns 原本內容或轉換後的內容
 */
function convertROCFormatToDayjs(input) {
  if ((0, _dayjs.isDayjs)(input)) {
    return input;
  }
  var regexROC = /^(\d{1,3})(?:[\/-](0[1-9]|1[0-2]))?(?:[\/-](0[1-9]|[12]\d|3[01]))?$/;
  var matchROC = regexROC.exec(input);
  if (matchROC) {
    var era = parseInt(matchROC[1], 10);
    var month = matchROC[2] ? parseInt(matchROC[2], 10) - 1 : 0;
    var date = matchROC[3] ? parseInt(matchROC[3], 10) : 1;
    var aDear = era + 1911;
    var aDDate = (0, _dayjs.default)(new Date(aDear, month, date));
    return aDDate;
  } else {
    return input;
  }
}