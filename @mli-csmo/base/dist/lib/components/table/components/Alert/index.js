"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _proProvider = require("@ant-design/pro-provider");
var _antd = require("antd");
var _react = _interopRequireWildcard(require("react"));
var _style = require("./style");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var defaultAlertOptionRender = function defaultAlertOptionRender(props) {
  var intl = props.intl,
    onCleanSelected = props.onCleanSelected;
  return [/*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    onClick: onCleanSelected,
    children: intl.getMessage('alert.clear', '清空')
  }, "0")];
};
function TableAlert(_ref) {
  var _ref$selectedRowKeys = _ref.selectedRowKeys,
    selectedRowKeys = _ref$selectedRowKeys === void 0 ? [] : _ref$selectedRowKeys,
    onCleanSelected = _ref.onCleanSelected,
    alwaysShowAlert = _ref.alwaysShowAlert,
    selectedRows = _ref.selectedRows,
    _ref$alertInfoRender = _ref.alertInfoRender,
    alertInfoRender = _ref$alertInfoRender === void 0 ? function (_ref2) {
      var intl = _ref2.intl;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_antd.Space, {
        children: [intl.getMessage('alert.selected', '已选择'), selectedRowKeys.length, intl.getMessage('alert.item', '项'), "\xA0\xA0"]
      });
    } : _ref$alertInfoRender,
    _ref$alertOptionRende = _ref.alertOptionRender,
    alertOptionRender = _ref$alertOptionRende === void 0 ? defaultAlertOptionRender : _ref$alertOptionRende;
  var intl = (0, _proProvider.useIntl)();
  var option = alertOptionRender && alertOptionRender({
    onCleanSelected: onCleanSelected,
    selectedRowKeys: selectedRowKeys,
    selectedRows: selectedRows,
    intl: intl
  });
  var _useContext = (0, _react.useContext)(_antd.ConfigProvider.ConfigContext),
    getPrefixCls = _useContext.getPrefixCls;
  var className = getPrefixCls('pro-table-alert');
  var _useStyle = (0, _style.useStyle)(className),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  if (alertInfoRender === false) {
    return null;
  }
  var dom = alertInfoRender({
    intl: intl,
    selectedRowKeys: selectedRowKeys,
    selectedRows: selectedRows,
    onCleanSelected: onCleanSelected
  });
  if (dom === false || selectedRowKeys.length < 1 && !alwaysShowAlert) {
    return null;
  }
  return wrapSSR( /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "".concat(className, " ").concat(hashId).trim(),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "".concat(className, "-container ").concat(hashId).trim(),
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "".concat(className, "-info ").concat(hashId).trim(),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "".concat(className, "-info-content ").concat(hashId).trim(),
          children: dom
        }), option ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "".concat(className, "-info-option ").concat(hashId).trim(),
          children: option
        }) : null]
      })
    })
  }));
}
var _default = exports.default = TableAlert;