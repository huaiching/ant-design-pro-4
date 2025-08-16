var _excluded = ["key", "name"];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import { menuOverlayCompatible } from '@ant-design/pro-utils';
import { Button, ConfigProvider, Dropdown } from 'antd';
import classnames from 'classnames';
import React, { useContext } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
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
  var _useContext = useContext(ConfigProvider.ConfigContext),
    getPrefixCls = _useContext.getPrefixCls;
  var tempClassName = getPrefixCls('pro-table-dropdown');
  var dropdownProps = menuOverlayCompatible({
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
  return /*#__PURE__*/_jsx(Dropdown, _objectSpread(_objectSpread({}, dropdownProps), {}, {
    className: classnames(tempClassName, className),
    children: /*#__PURE__*/_jsxs(Button, {
      style: style,
      children: [children, " ", /*#__PURE__*/_jsx(DownOutlined, {})]
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
  var _useContext2 = useContext(ConfigProvider.ConfigContext),
    getPrefixCls = _useContext2.getPrefixCls;
  var className = getPrefixCls('pro-table-dropdown');
  var dropdownProps = menuOverlayCompatible({
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
  return /*#__PURE__*/_jsx(Dropdown, _objectSpread(_objectSpread({}, dropdownProps), {}, {
    className: classnames(className, propsClassName),
    children: /*#__PURE__*/_jsx("a", {
      style: style,
      children: children || /*#__PURE__*/_jsx(EllipsisOutlined, {})
    })
  }));
};
TableDropdown.Button = DropdownButton;
export default TableDropdown;