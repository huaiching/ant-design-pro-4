"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _proForm = require("@ant-design/pro-form");
var _lodash = require("lodash");
var _omit = _interopRequireDefault(require("omit.js"));
var React = _interopRequireWildcard(require("react"));
var _reactIntl = require("react-intl");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MliFormDateRangePicker = function MliFormDateRangePicker(props) {
  var _useIntl = (0, _reactIntl.useIntl)(),
    formatMessage = _useIntl.formatMessage;
  var moduleName = props.moduleName,
    columnName = props.columnName,
    colSpan = props.colSpan,
    startColumnName = props.startColumnName,
    endColumnName = props.endColumnName;
  var defaultProps = (0, _lodash.cloneDeep)(props);
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
      id: 'common.date'
    })
  }, defaultProps.fieldProps);
  defaultProps.formItemProps = _objectSpread({
    getValueProps: function getValueProps(value) {
      // @ts-ignore
      var picker = defaultProps.fieldProps.picker;
      var dayFormat = 'common.date';
      switch (picker) {
        case 'month':
          dayFormat = 'common.month';
          break;
        case 'quarter':
          dayFormat = 'common.quarter';
          break;
        case 'week':
          dayFormat = 'common.week';
          break;
        case 'year':
          dayFormat = 'common.year';
          break;
      }
      var defaultValue = value && value.map(function (item) {
        return item && (typeof item === 'string' ? (0, _dayjs.default)(item, formatMessage({
          id: dayFormat
        })) : item);
      });
      return {
        value: defaultValue
      };
    }
  }, defaultProps.formItemProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_proForm.ProFormDateRangePicker, _objectSpread({
    colProps: {
      span: colSpan !== null && colSpan !== void 0 ? colSpan : 8
    },
    name: columnName === null || columnName === void 0 ? void 0 : columnName.split('.'),
    label: formatMessage({
      id: "".concat(moduleName, ".columns.").concat(columnName)
    }),
    placeholder: [formatMessage({
      id: 'common.input.placeholder'
    }, {
      columnName: formatMessage({
        id: "".concat(moduleName, ".columns.").concat(startColumnName)
      })
    }), formatMessage({
      id: 'common.input.placeholder'
    }, {
      columnName: formatMessage({
        id: "".concat(moduleName, ".columns.").concat(endColumnName)
      })
    })]
  }, (0, _omit.default)(defaultProps, ['moduleName', 'columnName', 'colSpan', 'startColumnName', 'endColumnName'])));
};
var _default = exports.default = MliFormDateRangePicker;