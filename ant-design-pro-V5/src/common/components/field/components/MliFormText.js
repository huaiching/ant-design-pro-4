function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { ProFormText } from '@ant-design/pro-form';
import { merge } from 'lodash';
import omit from 'omit.js';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { toCDB as TOCDB, toDBC as ToDBC } from "../../../utils";
import { jsx as _jsx } from "react/jsx-runtime";
var MliFormText = function MliFormText(props) {
  var _useIntl = useIntl(),
    formatMessage = _useIntl.formatMessage;
  var moduleName = props.moduleName,
    columnName = props.columnName,
    colSpan = props.colSpan,
    _props$toDBC = props.toDBC,
    toDBC = _props$toDBC === void 0 ? false : _props$toDBC,
    _props$toCDB = props.toCDB,
    toCDB = _props$toCDB === void 0 ? true : _props$toCDB;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    lock = _React$useState2[0],
    setLock = _React$useState2[1];
  var defaultProps = merge({
    fieldProps: {
      maxLength: 60,
      onCompositionStart: function onCompositionStart() {
        setLock(true);
      },
      onCompositionEnd: function onCompositionEnd() {
        setLock(false);
      }
    },
    formItemProps: {
      // 默認將全角內容轉換為半角內容
      normalize: function normalize(val) {
        if (typeof val !== 'string') {
          return val;
        }
        if (!lock) {
          return toDBC ? ToDBC(val) : toCDB ? TOCDB(val) : val;
        }
        return val;
      }
    }
  }, props);
  if (props.required) {
    var requiredRule = {
      required: true,
      message: formatMessage({
        id: 'common.input.requiredMessage'
      }, {
        columnName: formatMessage({
          id: moduleName ? "".concat(moduleName, ".columns.").concat(columnName) : "".concat(columnName)
        })
      })
    };
    if (defaultProps.rules) {
      defaultProps.rules.unshift(requiredRule);
    } else {
      defaultProps.rules = [requiredRule];
    }
  }
  return /*#__PURE__*/_jsx(ProFormText, _objectSpread({
    colProps: {
      span: colSpan !== null && colSpan !== void 0 ? colSpan : 8
    },
    name: columnName === null || columnName === void 0 ? void 0 : columnName.split('.'),
    label: props.hidden ? '' : formatMessage({
      id: moduleName ? "".concat(moduleName, ".columns.").concat(columnName) : "".concat(columnName)
    }),
    placeholder: props.hidden ? '' : formatMessage({
      id: 'common.input.placeholder'
    }, {
      columnName: formatMessage({
        id: moduleName ? "".concat(moduleName, ".columns.").concat(columnName) : "".concat(columnName)
      })
    })
  }, omit(defaultProps, ['moduleName', 'columnName', 'colSpan'])));
};
export default MliFormText;