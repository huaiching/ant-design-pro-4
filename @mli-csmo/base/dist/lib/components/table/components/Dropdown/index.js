"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _icons = require("@ant-design/icons");
var _proUtils = require("@ant-design/pro-utils");
var _antd = require("antd");
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["key", "name"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * 一個簡單的下拉選單
 *
 * @param param0
 */
var DropdownButton = function DropdownButton(_ref) {
  var children = _ref.children,
    menus = _ref.menus,
    onSelect = _ref.onSelect,
    className = _ref.className,
    style = _ref.style;
  var _useContext = (0, _react.useContext)(_antd.ConfigProvider.ConfigContext),
    getPrefixCls = _useContext.getPrefixCls;
  var tempClassName = getPrefixCls('pro-table-dropdown');
  var dropdownProps = (0, _proUtils.menuOverlayCompatible)({
    onClick: function onClick(params) {
      return onSelect && onSelect(params.key);
    },
    items: menus === null || menus === void 0 ? void 0 : menus.map(function (item) {
      return {
        label: item.name,
        key: item.key
      };
    })
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Dropdown, _objectSpread(_objectSpread({}, dropdownProps), {}, {
    className: (0, _classnames.default)(tempClassName, className),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_antd.Button, {
      style: style,
      children: [children, " ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.DownOutlined, {})]
    })
  }));
};
var TableDropdown = function TableDropdown(_ref2) {
  var propsClassName = _ref2.className,
    style = _ref2.style,
    onSelect = _ref2.onSelect,
    _ref2$menus = _ref2.menus,
    menus = _ref2$menus === void 0 ? [] : _ref2$menus,
    children = _ref2.children;
  var _useContext2 = (0, _react.useContext)(_antd.ConfigProvider.ConfigContext),
    getPrefixCls = _useContext2.getPrefixCls;
  var className = getPrefixCls('pro-table-dropdown');
  var dropdownProps = (0, _proUtils.menuOverlayCompatible)({
    onClick: function onClick(params) {
      onSelect === null || onSelect === void 0 || onSelect(params.key);
    },
    items: menus.map(function (_ref3) {
      var key = _ref3.key,
        name = _ref3.name,
        rest = _objectWithoutProperties(_ref3, _excluded);
      return _objectSpread(_objectSpread({
        key: key
      }, rest), {}, {
        title: rest.title,
        label: name
      });
    })
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Dropdown, _objectSpread(_objectSpread({}, dropdownProps), {}, {
    className: (0, _classnames.default)(className, propsClassName),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
      style: style,
      children: children || /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.EllipsisOutlined, {})
    })
  }));
};
TableDropdown.Button = DropdownButton;
var _default = exports.default = TableDropdown;