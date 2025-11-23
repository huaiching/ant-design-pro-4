function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { cloneDeep, omit } from 'lodash';
import { noteOnce } from "rc-util/es/warning";
import React from 'react';
import MliFormAutoComplete from "./components/MliFormAutoComplete";
import MliFormCheckbox from "./components/MliFormCheckbox";
import MliFormDatePicker from "./components/MliFormDatePicker";
import MliFormDateRangePicker from "./components/MliFormDateRangePicker";
import MliFormDateTimePicker from "./components/MliFormDateTimePicker";
import MliFormDigit from "./components/MliFormDigit";
import MliFormMoney from "./components/MliFormMoney";
import MliFormPassword from "./components/MliFormPassword";
import MliFormRadio from "./components/MliFormRadio";
import MliFormSelect from "./components/MliFormSelect";
import MliFormSwitch from "./components/MliFormSwitch";
import MliFormText from "./components/MliFormText";
import MliFormTextArea from "./components/MliFormTextArea";
import MliFormTimePicker from "./components/MliFormTimePicker";
import MliFormTimeRangePicker from "./components/MliFormTimeRangePicker";
import MliFormTreeSelect from "./components/MliFormTreeSelect";
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { jsx as _jsx } from "react/jsx-runtime";
dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.extend(weekday);
dayjs.extend(localizedFormat);
var REQUEST_VALUE_TYPE = ['select', 'radio', 'radioButton', 'checkbook'];
var defaultRenderText = function defaultRenderText(valueType, props) {
  var _props$fieldProps;
  var needValueEnum = REQUEST_VALUE_TYPE.includes(valueType);
  var hasValueEnum = !!(props.valueEnum || props.request || props.options || (_props$fieldProps = props.fieldProps) !== null && _props$fieldProps !== void 0 && _props$fieldProps.options);
  noteOnce(!needValueEnum || hasValueEnum, "If you set valueType to any of ".concat(REQUEST_VALUE_TYPE.join(','), ", you need to configure options, request or valueEnum."));
  var defaultProps = cloneDeep(props);
  defaultProps.hidden = props.collapsed && props.hidden;
  var filteredProps = omit(defaultProps, ['key']);

  // 如果是金額的值
  if (valueType === 'money') {
    return /*#__PURE__*/_jsx(MliFormMoney, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是日期的值
  if (valueType === 'date') {
    return /*#__PURE__*/_jsx(MliFormDatePicker, _objectSpread({}, filteredProps), defaultProps.key);
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
    return /*#__PURE__*/_jsx(MliFormDatePicker, _objectSpread({}, filteredProps), defaultProps.key);
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
    return /*#__PURE__*/_jsx(MliFormDatePicker, _objectSpread({}, filteredProps), defaultProps.key);
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
    return /*#__PURE__*/_jsx(MliFormDatePicker, _objectSpread({}, filteredProps), defaultProps.key);
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
    return /*#__PURE__*/_jsx(MliFormDatePicker, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是日期範圍的值
  if (valueType === 'dateRange') {
    return /*#__PURE__*/_jsx(MliFormDateRangePicker, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是日期加時間類型的值
  if (valueType === 'dateTime') {
    return /*#__PURE__*/_jsx(MliFormDateTimePicker, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是日期加時間類型的值的值
  if (valueType === 'dateTimeRange') {
    return /*#__PURE__*/_jsx(MliFormDateRangePicker, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是時間類型的值
  if (valueType === 'time') {
    return /*#__PURE__*/_jsx(MliFormTimePicker, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是時間類型的值
  if (valueType === 'timeRange') {
    return /*#__PURE__*/_jsx(MliFormTimeRangePicker, _objectSpread({}, filteredProps), defaultProps.key);
  }

  // 如果是時間類型的值
  if (valueType === 'autoComplete') {
    return /*#__PURE__*/_jsx(MliFormAutoComplete, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'textarea') {
    return /*#__PURE__*/_jsx(MliFormTextArea, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'digit') {
    return /*#__PURE__*/_jsx(MliFormDigit, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'select' || valueType === 'text' && (defaultProps.valueEnum || defaultProps.request)) {
    return /*#__PURE__*/_jsx(MliFormSelect, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'checkbox') {
    return /*#__PURE__*/_jsx(MliFormCheckbox, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'radio') {
    return /*#__PURE__*/_jsx(MliFormRadio, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'radioButton') {
    return /*#__PURE__*/_jsx(MliFormRadio.Button, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'switch') {
    return /*#__PURE__*/_jsx(MliFormSwitch, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'password') {
    return /*#__PURE__*/_jsx(MliFormPassword, _objectSpread({}, filteredProps), defaultProps.key);
  }
  if (valueType === 'treeSelect') {
    return /*#__PURE__*/_jsx(MliFormTreeSelect, _objectSpread({}, filteredProps), defaultProps.key);
  }
  return /*#__PURE__*/_jsx(MliFormText, _objectSpread({}, filteredProps), defaultProps.key);
};
export default defaultRenderText;