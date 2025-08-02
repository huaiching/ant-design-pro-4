"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = require("lodash");
var _warning = require("rc-util/lib/warning");
var _react = _interopRequireDefault(require("react"));
var _MliFormAutoComplete = _interopRequireDefault(require("./components/MliFormAutoComplete"));
var _MliFormCheckbox = _interopRequireDefault(require("./components/MliFormCheckbox"));
var _MliFormDatePicker = _interopRequireDefault(require("./components/MliFormDatePicker"));
var _MliFormDateRangePicker = _interopRequireDefault(require("./components/MliFormDateRangePicker"));
var _MliFormDateTimePicker = _interopRequireDefault(require("./components/MliFormDateTimePicker"));
var _MliFormDigit = _interopRequireDefault(require("./components/MliFormDigit"));
var _MliFormMoney = _interopRequireDefault(require("./components/MliFormMoney"));
var _MliFormPassword = _interopRequireDefault(require("./components/MliFormPassword"));
var _MliFormRadio = _interopRequireDefault(require("./components/MliFormRadio"));
var _MliFormSelect = _interopRequireDefault(require("./components/MliFormSelect"));
var _MliFormSwitch = _interopRequireDefault(require("./components/MliFormSwitch"));
var _MliFormText = _interopRequireDefault(require("./components/MliFormText"));
var _MliFormTextArea = _interopRequireDefault(require("./components/MliFormTextArea"));
var _MliFormTimePicker = _interopRequireDefault(require("./components/MliFormTimePicker"));
var _MliFormTimeRangePicker = _interopRequireDefault(require("./components/MliFormTimeRangePicker"));
var _MliFormTreeSelect = _interopRequireDefault(require("./components/MliFormTreeSelect"));
var _dayjs = _interopRequireDefault(require("dayjs"));
var _advancedFormat = _interopRequireDefault(require("dayjs/plugin/advancedFormat"));
var _isoWeek = _interopRequireDefault(require("dayjs/plugin/isoWeek"));
var _localeData = _interopRequireDefault(require("dayjs/plugin/localeData"));
var _localizedFormat = _interopRequireDefault(require("dayjs/plugin/localizedFormat"));
var _weekday = _interopRequireDefault(require("dayjs/plugin/weekday"));
var _weekOfYear = _interopRequireDefault(require("dayjs/plugin/weekOfYear"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
_dayjs.default.extend(_localeData.default);
_dayjs.default.extend(_advancedFormat.default);
_dayjs.default.extend(_isoWeek.default);
_dayjs.default.extend(_weekOfYear.default);
_dayjs.default.extend(_weekday.default);
_dayjs.default.extend(_localizedFormat.default);
var REQUEST_VALUE_TYPE = ['select', 'radio', 'radioButton', 'checkbook'];
var defaultRenderText = function defaultRenderText(valueType, props) {
  var _props$fieldProps;
  var needValueEnum = REQUEST_VALUE_TYPE.includes(valueType);
  var hasValueEnum = !!(props.valueEnum || props.request || props.options || (_props$fieldProps = props.fieldProps) !== null && _props$fieldProps !== void 0 && _props$fieldProps.options);
  (0, _warning.noteOnce)(!needValueEnum || hasValueEnum, "If you set valueType to any of ".concat(REQUEST_VALUE_TYPE.join(','), ", you need to configure options, request or valueEnum."));
  var defaultProps = (0, _lodash.cloneDeep)(props);
  var filteredProps = (0, _lodash.omit)(props, ['key']);
  defaultProps.hidden = props.collapsed && props.hidden;

  // 如果是金額的值
  if (valueType === 'money') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormMoney.default, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是日期的值
  if (valueType === 'date') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormDatePicker.default, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是周的值
  if (valueType === 'dateWeek') {
    if (defaultProps.fieldProps) {
      defaultProps.fieldProps.picker = 'week';
    } else {
      defaultProps.fieldProps = {
        picker: 'week'
      };
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormDatePicker.default, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是月的值
  if (valueType === 'dateMonth') {
    if (defaultProps.fieldProps) {
      defaultProps.fieldProps.picker = 'month';
    } else {
      defaultProps.fieldProps = {
        picker: 'month'
      };
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormDatePicker.default, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是季度的值
  if (valueType === 'dateQuarter') {
    if (defaultProps.fieldProps) {
      defaultProps.fieldProps.picker = 'quarter';
    } else {
      defaultProps.fieldProps = {
        picker: 'quarter'
      };
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormDatePicker.default, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是年的值
  if (valueType === 'dateYear') {
    if (defaultProps.fieldProps) {
      defaultProps.fieldProps.picker = 'year';
    } else {
      defaultProps.fieldProps = {
        picker: 'year'
      };
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormDatePicker.default, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是日期範圍的值
  if (valueType === 'dateRange') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormDateRangePicker.default, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是日期加時間類型的值
  if (valueType === 'dateTime') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormDateTimePicker.default, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是日期加時間類型的值的值
  if (valueType === 'dateTimeRange') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormDateRangePicker.default, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是時間類型的值
  if (valueType === 'time') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormTimePicker.default, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是時間類型的值
  if (valueType === 'timeRange') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormTimeRangePicker.default, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是時間類型的值
  if (valueType === 'autoComplete') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormAutoComplete.default, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'textarea') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormTextArea.default, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'digit') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormDigit.default, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'select' || valueType === 'text' && (defaultProps.valueEnum || defaultProps.request)) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormSelect.default, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'checkbox') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormCheckbox.default, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'radio') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormRadio.default, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'radioButton') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormRadio.default.Button, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'switch') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormSwitch.default, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'password') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormPassword.default, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'treeSelect') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormTreeSelect.default, _objectSpread({}, filteredProps), defaultProps.key);
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MliFormText.default, _objectSpread({}, filteredProps), defaultProps.key);
};
var _default = exports.default = defaultRenderText;