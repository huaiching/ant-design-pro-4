"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _icons = require("@ant-design/icons");
var _reactIntl = require("react-intl");
var _proUtils = require("@ant-design/pro-utils");
var _antd = require("antd");
var _react = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * FormFooter 的組件，可以自動進行一些配置
 *
 * @param props
 */
var Actions = function Actions(props) {
  var setCollapsed = props.setCollapsed,
    _props$collapsed = props.collapsed,
    collapsed = _props$collapsed === void 0 ? false : _props$collapsed,
    needCollapse = props.needCollapse,
    submitter = props.submitter,
    style = props.style,
    hiddenNum = props.hiddenNum;
  var _useContext = (0, _react.useContext)(_antd.ConfigProvider.ConfigContext),
    getPrefixCls = _useContext.getPrefixCls;
  var _useIntl = (0, _reactIntl.useIntl)(),
    formatMessage = _useIntl.formatMessage;
  var collapseRender = (0, _proUtils.omitBoolean)(props.collapseRender);
  var defaultCollapseRender = (0, _react.useMemo)(function () {
    if (collapsed) {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [formatMessage({
          id: 'component.tagSelect.expand'
        }), hiddenNum && "(".concat(hiddenNum, ")"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.DownOutlined, {
          style: {
            marginLeft: '0.5em',
            transition: '0.3s all',
            transform: "rotate(".concat(collapsed ? 0 : 0.5, "turn)")
          }
        })]
      });
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [formatMessage({
        id: 'component.tagSelect.collapse'
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.DownOutlined, {
        style: {
          marginLeft: '0.5em',
          transition: '0.3s all',
          transform: "rotate(".concat(collapsed ? 0 : 0.5, "turn)")
        }
      })]
    });
  }, [collapsed, hiddenNum]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_antd.Space, {
    style: style,
    size: 8,
    children: [submitter, props.collapseRender !== false && needCollapse && /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
      className: getPrefixCls('pro-form-collapse-button'),
      onClick: function onClick() {
        return setCollapsed(!collapsed);
      },
      children: collapseRender ? collapseRender(collapsed, props, formatMessage, hiddenNum) : defaultCollapseRender
    })]
  });
};
var _default = exports.default = Actions;