"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _icons = require("@ant-design/icons");
var _proProvider = require("@ant-design/pro-provider");
var _proUtils = require("@ant-design/pro-utils");
var _antd = require("antd");
var _react = _interopRequireWildcard(require("react"));
var _Provide = require("../../Store/Provide");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DensityIcon = function DensityIcon(props) {
  var _props$icon = props.icon,
    icon = _props$icon === void 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.ColumnHeightOutlined, {}) : _props$icon;
  var counter = (0, _react.useContext)(_Provide.TableContext);
  var intl = (0, _proProvider.useIntl)();
  var dropdownProps = (0, _proUtils.menuOverlayCompatible)({
    selectedKeys: [counter.tableSize],
    onClick: function onClick(_ref) {
      var _counter$setTableSize;
      var key = _ref.key;
      (_counter$setTableSize = counter.setTableSize) === null || _counter$setTableSize === void 0 || _counter$setTableSize.call(counter, key);
    },
    style: {
      width: 80
    },
    items: [{
      key: 'large',
      label: intl.getMessage('tableToolBar.densityLarger', '宽松')
    }, {
      key: 'middle',
      label: intl.getMessage('tableToolBar.densityMiddle', '中等')
    }, {
      key: 'small',
      label: intl.getMessage('tableToolBar.densitySmall', '紧凑')
    }]
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Dropdown, _objectSpread(_objectSpread({}, dropdownProps), {}, {
    trigger: ['click'],
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Tooltip, {
      title: intl.getMessage('tableToolBar.density', '表格密度'),
      children: icon
    })
  }));
};
var _default = exports.default = /*#__PURE__*/_react.default.memo(DensityIcon);