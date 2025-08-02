"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _antd = require("antd");
var _form = _interopRequireDefault(require("antd/lib/form"));
var _lodash = require("lodash");
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _reactIntl = require("react-intl");
var _transform = require("../../../utils/transform");
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
var MliFormTreeSelect = function MliFormTreeSelect(props) {
  var _defaultProps$hidden;
  var _useIntl = (0, _reactIntl.useIntl)(),
    formatMessage = _useIntl.formatMessage;
  var moduleName = props.moduleName,
    _props$columnName = props.columnName,
    columnName = _props$columnName === void 0 ? '' : _props$columnName,
    colSpan = props.colSpan,
    readonly = props.readonly;
  var defaultProps = (0, _lodash.cloneDeep)(props);
  var formInstance = _form.default.useFormInstance();
  var columnValue = _form.default.useWatch(columnName === null || columnName === void 0 ? void 0 : columnName.split('.'), formInstance);
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
  var _ref = defaultProps.fieldProps || {},
    treeData = _ref.treeData,
    _ref$fieldNames = _ref.fieldNames,
    fieldNames = _ref$fieldNames === void 0 ? {} : _ref$fieldNames;
  var _fieldNames$label = fieldNames.label,
    label = _fieldNames$label === void 0 ? 'label' : _fieldNames$label;
  var flatTreeData = (0, _react.useMemo)(function () {
    return (0, _transform.treeDataFlatten)(treeData, fieldNames);
  }, [treeData, fieldNames]);
  var readonlyContent = (0, _react.useMemo)(function () {
    if (readonly) {
      if ((0, _lodash.isString)(columnValue)) {
        var _flatTreeData$columnV;
        return ((_flatTreeData$columnV = flatTreeData[columnValue]) === null || _flatTreeData$columnV === void 0 ? void 0 : _flatTreeData$columnV[label]) || columnValue;
      } else if ((0, _lodash.isArray)(columnValue)) {
        return (0, _lodash.map)(columnValue || [], function (item) {
          var _flatTreeData$item;
          return ((_flatTreeData$item = flatTreeData[item]) === null || _flatTreeData$item === void 0 ? void 0 : _flatTreeData$item[label]) || item;
        }).join(',');
      }
    }
  }, [columnValue, flatTreeData, label, readonly]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Col, _objectSpread(_objectSpread({
    span: colSpan ? colSpan : 8
  }, defaultProps.colProps), {}, {
    hidden: (_defaultProps$hidden = defaultProps.hidden) !== null && _defaultProps$hidden !== void 0 ? _defaultProps$hidden : false,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_form.default.Item, _objectSpread(_objectSpread({
      name: columnName === null || columnName === void 0 ? void 0 : columnName.split('.'),
      label: formatMessage({
        id: "".concat(moduleName, ".columns.").concat(columnName)
      })
    }, defaultProps.formItemProps), {}, {
      children: readonly ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        title: readonlyContent,
        children: readonlyContent
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.TreeSelect, _objectSpread(_objectSpread({
        placeholder: formatMessage({
          id: 'common.select.placeholder'
        }, {
          columnName: formatMessage({
            id: "".concat(moduleName, ".columns.").concat(columnName)
          })
        }),
        maxTagCount: "responsive"
      }, defaultProps.fieldProps), {}, {
        children: defaultProps.children
      }))
    }))
  }));
};
var _default = exports.default = MliFormTreeSelect;