function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { AutoComplete, Col, Form } from 'antd';
import { cloneDeep } from 'lodash';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var MliFormAutoComplete = function MliFormAutoComplete(props) {
  var _defaultProps$hidden, _defaultProps$hidden2;
  var _useIntl = useIntl(),
    formatMessage = _useIntl.formatMessage;
  var moduleName = props.moduleName,
    columnName = props.columnName,
    colSpan = props.colSpan,
    _props$needCol = props.needCol,
    needCol = _props$needCol === void 0 ? true : _props$needCol;
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
  var filedContent =
  /*#__PURE__*/
  // @ts-ignore
  _jsx(Form.Item, _objectSpread(_objectSpread(_objectSpread({
    name: columnName === null || columnName === void 0 ? void 0 : columnName.split('.'),
    label: formatMessage({
      id: "".concat(moduleName, ".columns.").concat(columnName)
    })
  }, defaultProps.formItemProps), defaultProps.rules ? {
    rules: defaultProps.rules
  } : undefined), {}, {
    initialValue: defaultProps.initialValue,
    hidden: (_defaultProps$hidden = defaultProps.hidden) !== null && _defaultProps$hidden !== void 0 ? _defaultProps$hidden : false,
    children: /*#__PURE__*/_jsx(AutoComplete, _objectSpread({
      placeholder: formatMessage({
        id: 'common.input.placeholder'
      }, {
        columnName: formatMessage({
          id: "".concat(moduleName, ".columns.").concat(columnName)
        })
      })
    }, defaultProps.fieldProps))
  }));
  return needCol ? /*#__PURE__*/_jsx(Col, _objectSpread(_objectSpread({
    span: colSpan ? colSpan : 8
  }, defaultProps.colProps), {}, {
    hidden: (_defaultProps$hidden2 = defaultProps.hidden) !== null && _defaultProps$hidden2 !== void 0 ? _defaultProps$hidden2 : false,
    children: filedContent
  })) : /*#__PURE__*/_jsx(_Fragment, {
    children: filedContent
  });
};
export default MliFormAutoComplete;