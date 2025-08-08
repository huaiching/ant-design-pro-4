function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { ProFormSelect } from '@ant-design/pro-form';
import omit from 'omit.js';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { jsx as _jsx } from "react/jsx-runtime";
var MliFormSelect = function MliFormSelect(props) {
  var _defaultProps$fieldPr, _defaultProps$labelTe2, _defaultProps$labelTe3;
  var _useIntl = useIntl(),
    formatMessage = _useIntl.formatMessage;
  var moduleName = props.moduleName,
    columnName = props.columnName,
    colSpan = props.colSpan;
  var defaultProps = _objectSpread({}, props);
  if (props.required) {
    var _defaultProps$labelTe;
    var requiredRule = {
      required: true,
      message: formatMessage({
        id: 'common.select.requiredMessage'
      }, {
        columnName: (_defaultProps$labelTe = defaultProps.labelText) !== null && _defaultProps$labelTe !== void 0 ? _defaultProps$labelTe : formatMessage({
          id: "".concat(moduleName, ".columns.").concat(columnName)
        })
      })
    };
    if (defaultProps.rules) {
      defaultProps.rules.unshift(requiredRule);
    } else {
      defaultProps.rules = [requiredRule];
    }
    if (defaultProps.showSearch !== false) {
      defaultProps.showSearch = true;
    }
  }
  if (defaultProps !== null && defaultProps !== void 0 && (_defaultProps$fieldPr = defaultProps.fieldProps) !== null && _defaultProps$fieldPr !== void 0 && _defaultProps$fieldPr.options || defaultProps !== null && defaultProps !== void 0 && defaultProps.options) {
    var _defaultProps$fieldPr2, _defaultProps$fieldPr3;
    var options = (defaultProps === null || defaultProps === void 0 || (_defaultProps$fieldPr2 = defaultProps.fieldProps) === null || _defaultProps$fieldPr2 === void 0 ? void 0 : _defaultProps$fieldPr2.options) || (defaultProps === null || defaultProps === void 0 ? void 0 : defaultProps.options);
    defaultProps.fieldProps = (_defaultProps$fieldPr3 = defaultProps === null || defaultProps === void 0 ? void 0 : defaultProps.fieldProps) !== null && _defaultProps$fieldPr3 !== void 0 ? _defaultProps$fieldPr3 : {};
    defaultProps.fieldProps.options = options === null || options === void 0 ? void 0 : options.map(function (item) {
      return omit(item, ['children']);
    });
  }
  return /*#__PURE__*/_jsx(ProFormSelect, _objectSpread({
    colProps: {
      span: colSpan !== null && colSpan !== void 0 ? colSpan : 8
    },
    name: columnName === null || columnName === void 0 ? void 0 : columnName.split('.'),
    label: (_defaultProps$labelTe2 = defaultProps.labelText) !== null && _defaultProps$labelTe2 !== void 0 ? _defaultProps$labelTe2 : formatMessage({
      id: "".concat(moduleName, ".columns.").concat(columnName)
    }),
    placeholder: formatMessage({
      id: 'common.select.placeholder'
    }, {
      columnName: (_defaultProps$labelTe3 = defaultProps.labelText) !== null && _defaultProps$labelTe3 !== void 0 ? _defaultProps$labelTe3 : formatMessage({
        id: "".concat(moduleName, ".columns.").concat(columnName)
      })
    })
  }, omit(defaultProps, ['moduleName', 'columnName', 'colSpan', 'options'])));
};
export default MliFormSelect;