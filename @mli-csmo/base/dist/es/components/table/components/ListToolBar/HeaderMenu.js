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
import { DownOutlined } from '@ant-design/icons';
import { ProProvider } from '@ant-design/pro-provider';
import { compareVersions, menuOverlayCompatible } from '@ant-design/pro-utils';
import { Dropdown, Space, Tabs, version } from 'antd';
import classNames from 'classnames';
import useMergedState from "rc-util/es/hooks/useMergedState";
import React, { useContext } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { jsxs as _jsxs } from "react/jsx-runtime";
var HeaderMenu = function HeaderMenu(props) {
  var _useContext = useContext(ProProvider),
    hashId = _useContext.hashId;
  var _props$items = props.items,
    items = _props$items === void 0 ? [] : _props$items,
    _props$type = props.type,
    type = _props$type === void 0 ? 'inline' : _props$type,
    prefixCls = props.prefixCls,
    propActiveKey = props.activeKey,
    defaultActiveKey = props.defaultActiveKey;
  var _useMergedState = useMergedState(propActiveKey || defaultActiveKey, {
      value: propActiveKey,
      onChange: props.onChange
    }),
    _useMergedState2 = _slicedToArray(_useMergedState, 2),
    activeKey = _useMergedState2[0],
    setActiveKey = _useMergedState2[1];
  if (items.length < 1) {
    return null;
  }
  var activeItem = items.find(function (item) {
    return item.key === activeKey;
  }) || items[0];
  if (type === 'inline') {
    return /*#__PURE__*/_jsx("div", {
      className: classNames("".concat(prefixCls, "-menu"), "".concat(prefixCls, "-inline-menu"), hashId),
      children: items.map(function (item, index) {
        return /*#__PURE__*/_jsx("div", {
          onClick: function onClick() {
            setActiveKey(item.key);
          },
          className: classNames("".concat(prefixCls, "-inline-menu-item"), activeItem.key === item.key ? "".concat(prefixCls, "-inline-menu-item-active") : undefined, hashId),
          children: item.label
        }, item.key || index);
      })
    });
  }
  if (type === 'tab') {
    return /*#__PURE__*/_jsx(Tabs, {
      items: items.map(function (item) {
        var _item$key;
        return _objectSpread(_objectSpread({}, item), {}, {
          key: (_item$key = item.key) === null || _item$key === void 0 ? void 0 : _item$key.toString()
        });
      }),
      activeKey: activeItem.key,
      onTabClick: function onTabClick(key) {
        return setActiveKey(key);
      },
      children: compareVersions(version, '4.23.0') < 0 ? items === null || items === void 0 ? void 0 : items.map(function (item, index) {
        /* 如果版本低于 4.23.0，不支持 items */
        return /*#__PURE__*/_createElement(Tabs.TabPane, _objectSpread(_objectSpread({}, item), {}, {
          key: item.key || index,
          tab: item.label
        }));
      }) : null
    });
  }
  var dropdownProps = menuOverlayCompatible({
    selectedKeys: [activeItem.key],
    onClick: function onClick(item) {
      setActiveKey(item.key);
    },
    items: items.map(function (item, index) {
      return {
        key: item.key || index,
        disabled: item.disabled,
        label: item.label
      };
    })
  });
  return /*#__PURE__*/_jsx("div", {
    className: classNames("".concat(prefixCls, "-menu"), "".concat(prefixCls, "-dropdownmenu")),
    children: /*#__PURE__*/_jsx(Dropdown, _objectSpread(_objectSpread({
      trigger: ['click']
    }, dropdownProps), {}, {
      children: /*#__PURE__*/_jsxs(Space, {
        className: "".concat(prefixCls, "-dropdownmenu-label"),
        children: [activeItem.label, /*#__PURE__*/_jsx(DownOutlined, {})]
      })
    }))
  });
};
export default HeaderMenu;