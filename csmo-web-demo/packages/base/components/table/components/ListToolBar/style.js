function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';
var genProListStyle = function genProListStyle(token) {
  return _defineProperty({}, token.componentCls, _defineProperty(_defineProperty(_defineProperty({
    lineHeight: '1',
    '&-container': {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBlockStart: 0,
      paddingBlockEnd: token.padding,
      paddingInline: 0,
      '&-mobile': {
        flexDirection: 'column'
      }
    },
    '&-title': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      color: token.colorTextHeading,
      fontWeight: '500',
      fontSize: token.fontSizeLG
    },
    '&-search:not(:last-child)': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    '&-setting-item': {
      marginBlock: 0,
      marginInline: 4,
      color: token.colorIconHover,
      fontSize: token.fontSizeLG,
      cursor: 'pointer',
      '> span': {
        display: 'block',
        width: '100%',
        height: '100%'
      },
      '&:hover': {
        color: token.colorPrimary
      }
    },
    '&-left': _defineProperty(_defineProperty({
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: token.marginXS,
      justifyContent: 'flex-start',
      maxWidth: 'calc(100% - 200px)'
    }, "".concat(token.antCls, "-tabs"), {
      width: '100%'
    }), '&-has-tabs', {
      overflow: 'hidden'
    }),
    '&-right': {
      flex: 1,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      gap: token.marginXS
    },
    '&-extra-line': {
      marginBlockEnd: token.margin
    },
    '&-setting-items': {
      display: 'flex',
      gap: token.marginXS,
      lineHeight: '32px',
      alignItems: 'center'
    },
    '&-filter': _defineProperty({
      '&:not(:last-child)': {
        marginInlineEnd: token.margin
      },
      display: 'flex',
      alignItems: 'center'
    }, "div$".concat(token.antCls, "-pro-table-search"), {
      marginBlock: 0,
      marginInline: 0,
      paddingBlock: 0,
      paddingInline: 0
    }),
    '&-inline-menu-item': {
      display: 'inline-block',
      marginInlineEnd: token.marginLG,
      cursor: 'pointer',
      opacity: '0.75',
      '&-active': {
        fontWeight: 'bold',
        opacity: '1'
      }
    }
  }, "".concat(token.antCls, "-tabs-top > ").concat(token.antCls, "-tabs-nav"), _defineProperty({
    marginBlockEnd: 0,
    '&::before': {
      borderBlockEnd: 0
    }
  }, "".concat(token.antCls, "-tabs-nav-list"), {
    marginBlockStart: 0,
    '${token.antCls}-tabs-tab': {
      paddingBlockStart: 0
    }
  })), '&-dropdownmenu-label', {
    fontWeight: 'bold',
    fontSize: token.fontSizeIcon,
    textAlign: 'center',
    cursor: 'pointer'
  }), '@media (max-width: 768px)', _defineProperty({}, token.componentCls, {
    '&-container': {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column'
    },
    '&-left': {
      marginBlockEnd: '16px',
      maxWidth: '100%'
    }
  })));
};
export function useStyle(prefixCls) {
  return useAntdStyle('ProTableListToolBar', function (token) {
    var proListToken = _objectSpread(_objectSpread({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProListStyle(proListToken)];
  });
}