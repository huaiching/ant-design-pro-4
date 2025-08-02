function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { ColumnHeightOutlined } from '@ant-design/icons';
import { useIntl } from '@ant-design/pro-provider';
import { menuOverlayCompatible } from '@ant-design/pro-utils';
import { Dropdown, Tooltip } from 'antd';
import React, { useContext } from 'react';
import { TableContext } from "../../Store/Provide";
import { jsx as _jsx } from "react/jsx-runtime";
var DensityIcon = function DensityIcon(props) {
  var _props$icon = props.icon,
    icon = _props$icon === void 0 ? /*#__PURE__*/_jsx(ColumnHeightOutlined, {}) : _props$icon;
  var counter = useContext(TableContext);
  var intl = useIntl();
  var dropdownProps = menuOverlayCompatible({
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
  return /*#__PURE__*/_jsx(Dropdown, _objectSpread(_objectSpread({}, dropdownProps), {}, {
    trigger: ['click'],
    children: /*#__PURE__*/_jsx(Tooltip, {
      title: intl.getMessage('tableToolBar.density', '表格密度'),
      children: icon
    })
  }));
};
export default /*#__PURE__*/React.memo(DensityIcon);