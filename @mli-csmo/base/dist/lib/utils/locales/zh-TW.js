"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.commonLocales = void 0;
var _common = _interopRequireDefault(require("./zh-TW/common"));
var _component = _interopRequireDefault(require("./zh-TW/component"));
var _microApp = _interopRequireDefault(require("./zh-TW/microApp"));
var _zh_TW = _interopRequireDefault(require("antd/lib/locale/zh_TW.js"));
var _lodash = require("lodash");
var _zhTW$DatePicker;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(0, _lodash.merge)((_zhTW$DatePicker = _zh_TW.default.DatePicker) === null || _zhTW$DatePicker === void 0 ? void 0 : _zhTW$DatePicker.lang, {
  yearFormat: 'TTT年',
  cellYearFormat: 'TTT年',
  fieldDateFormat: 'TTT/MM/DD',
  fieldDateTimeFormat: 'TTT/MM/DD HH:mm:ss',
  dateFormat: 'TTT年M月D日',
  dateTimeFormat: 'TTT年M月D日 HH時mm分ss秒'
});
(0, _lodash.merge)(_zh_TW.default.Upload, {
  downloadFile: '下載文件'
});
var commonLocales = exports.commonLocales = _objectSpread(_objectSpread(_objectSpread({
  'navBar.lang': '語言',
  'app.copyright.produced': '益進信息',
  'pagination.total.item': '資料筆數：',
  'layout.header.title': 'CMS通路管理系統'
}, _component.default), _common.default), _microApp.default);
var _default = exports.default = commonLocales;