function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { ProFormTimePicker } from '@ant-design/pro-form';
import { cloneDeep } from 'lodash';
import omit from 'omit.js';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { jsx as _jsx } from "react/jsx-runtime";
var MliFormTimePicker = function MliFormTimePicker(props) {
  var _useIntl = useIntl(),
    formatMessage = _useIntl.formatMessage;
  var moduleName = props.moduleName,
    columnName = props.columnName,
    colSpan = props.colSpan;
  var defaultProps = cloneDeep(props);
  if (props.required) {
    var requiredRule = {
      required: true,
      message: formatMessage({
        id: 'common.input.requiredMessage'
      }, {
        columnName: formatMessage({
          id: "".concat(moduleName, ".columns.").concat(columnName)
        })
      })
    };
    if (defaultProps.rules) {
      defaultProps.rules.unshift(requiredRule);
    } else {
      defaultProps.rules = [requiredRule];
    }
  }
  defaultProps.fieldProps = _objectSpread({
    format: formatMessage({
      id: 'common.time'
    })
  }, defaultProps.fieldProps);
  return /*#__PURE__*/_jsx(ProFormTimePicker, _objectSpread({
    colProps: {
      span: colSpan !== null && colSpan !== void 0 ? colSpan : 8
    },
    name: columnName === null || columnName === void 0 ? void 0 : columnName.split('.'),
    label: formatMessage({
      id: "".concat(moduleName, ".columns.").concat(columnName)
    }),
    placeholder: formatMessage({
      id: 'common.input.placeholder'
    }, {
      columnName: formatMessage({
        id: "".concat(moduleName, ".columns.").concat(columnName)
      })
    })
  }, omit(defaultProps, ['moduleName', 'columnName', 'colSpan'])));
};
export default MliFormTimePicker;