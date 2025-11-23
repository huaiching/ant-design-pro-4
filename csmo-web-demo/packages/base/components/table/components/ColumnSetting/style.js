function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';
var genProStyle = function genProStyle(token) {
  return _defineProperty(_defineProperty(_defineProperty({}, token.componentCls, {
    width: 'auto',
    '&-title': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '32px'
    },
    '&-overlay': _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(token.antCls, "-popover-inner-content"), {
      width: '200px',
      paddingBlock: 0,
      paddingInline: 0,
      paddingBlockEnd: 8
    }), "".concat(token.antCls, "-tree-node-content-wrapper:hover"), {
      backgroundColor: 'transparent'
    }), "".concat(token.antCls, "-tree-draggable-icon"), {
      cursor: 'grab'
    }), "".concat(token.antCls, "-tree-treenode"), _defineProperty(_defineProperty({
      alignItems: 'center',
      '&:hover': _defineProperty({}, "".concat(token.componentCls, "-list-item-option"), {
        display: 'block'
      })
    }, "".concat(token.antCls, "-tree-checkbox"), {
      marginInlineEnd: '4px'
    }), "".concat(token.antCls, "-tree-title"), {
      width: '100%'
    }))
  }), "".concat(token.componentCls, "-action-rest-button"), {
    color: token.colorPrimary
  }), "".concat(token.componentCls, "-list"), _defineProperty(_defineProperty(_defineProperty({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingBlockStart: 8
  }, "&".concat(token.componentCls, "-list-group"), {
    paddingBlockStart: 0
  }), '&-title', {
    marginBlockStart: '6px',
    marginBlockEnd: '6px',
    paddingInlineStart: '24px',
    color: token.colorTextSecondary,
    fontSize: '12px'
  }), '&-item', {
    display: 'flex',
    alignItems: 'center',
    maxHeight: 24,
    justifyContent: 'space-between',
    '&-title': {
      flex: 1,
      maxWidth: 80,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      wordBreak: 'break-all',
      whiteSpace: 'nowrap'
    },
    '&-option': {
      display: 'none',
      float: 'right',
      cursor: 'pointer',
      '> span': {
        '> span.anticon': {
          color: token.colorPrimary
        }
      },
      '> span + span': {
        marginInlineStart: 4
      }
    }
  }));
};
export function useStyle(prefixCls) {
  return useAntdStyle('ColumnSetting', function (token) {
    var proToken = _objectSpread(_objectSpread({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProStyle(proToken)];
  });
}