function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { ProFormDigit } from '@ant-design/pro-form';
import { merge } from 'lodash';
import omit from 'omit.js';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { toCDB } from "../../../utils";
import { jsx as _jsx } from "react/jsx-runtime";
var MliFormMoney = function MliFormMoney(props) {
  var _defaultProps$label, _defaultProps$placeho;
  var _useIntl = useIntl(),
    formatMessage = _useIntl.formatMessage;
  var moduleName = props.moduleName,
    columnName = props.columnName,
    colSpan = props.colSpan;
  var defaultProps = merge({
    fieldProps: {
      precision: 2,
      maxLength: 15,
      parser: function parser(value) {
        return toCDB(value);
      },
      addonAfter: formatMessage({
        id: 'common.money.unit'
      })
    }
  }, props);
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
  return /*#__PURE__*/_jsx(ProFormDigit, _objectSpread({
    colProps: {
      span: colSpan !== null && colSpan !== void 0 ? colSpan : 8
    },
    name: columnName === null || columnName === void 0 ? void 0 : columnName.split('.'),
    label: (_defaultProps$label = defaultProps.label) !== null && _defaultProps$label !== void 0 ? _defaultProps$label : formatMessage({
      id: "".concat(moduleName, ".columns.").concat(columnName)
    }),
    placeholder: (_defaultProps$placeho = defaultProps.placeholder) !== null && _defaultProps$placeho !== void 0 ? _defaultProps$placeho : formatMessage({
      id: 'common.input.placeholder'
    }, {
      columnName: formatMessage({
        id: "".concat(moduleName, ".columns.").concat(columnName)
      })
    })
  }, omit(defaultProps, ['moduleName', 'columnName', 'colSpan'])));
};
export default MliFormMoney;