"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.turn = void 0;
exports.useStyle = useStyle;
var _cssinjs = require("@ant-design/cssinjs");
var _proProvider = require("@ant-design/pro-provider");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var turn = exports.turn = new _cssinjs.Keyframes('turn', {
  '0%': {
    transform: 'rotate(0deg)'
  },
  '25%': {
    transform: 'rotate(90deg)'
  },
  '50%': {
    transform: 'rotate(180deg)'
  },
  '75%': {
    transform: 'rotate(270deg)'
  },
  '100%': {
    transform: 'rotate(360deg)'
  }
});
var genProListStyle = function genProListStyle(token) {
  return _defineProperty(_defineProperty(_defineProperty({}, token.componentCls, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    zIndex: 1
  }, "".concat(token.antCls, "-table-wrapper ").concat(token.antCls, "-table-pagination").concat(token.antCls, "-pagination"), {
    marginBlockEnd: 0
  }), '&:not(:root):fullscreen', {
    minHeight: '100vh',
    overflow: 'auto',
    background: token.colorBgContainer
  }), '&-extra', {
    marginBlockEnd: 16
  }), '&-polling', _defineProperty({}, "".concat(token.componentCls, "-list-toolbar-setting-item"), {
    '.anticon.anticon-reload': {
      transform: 'rotate(0deg)',
      animationName: turn,
      animationDuration: '1s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite'
    }
  })), "td".concat(token.antCls, "-table-cell"), {
    '>a': {
      fontSize: token.fontSize
    }
  }), "".concat(token.antCls, "-table").concat(token.antCls, "-table-tbody").concat(token.antCls, "-table-wrapper:only-child").concat(token.antCls, "-table"), {
    marginBlock: 0,
    marginInline: 0
  }), "".concat(token.antCls, "-table").concat(token.antCls, "-table-middle ").concat(token.componentCls), _defineProperty({
    marginBlock: 0,
    marginInline: -8
  }, "".concat(token.proComponentsCls, "-card"), {
    backgroundColor: 'initial'
  })), '& &-search', _defineProperty(_defineProperty(_defineProperty(_defineProperty({
    background: token.colorBgContainer,
    '&-ghost': {
      background: 'transparent'
    }
  }, "&".concat(token.componentCls, "-form"), {
    marginBlock: 0,
    marginInline: 0,
    paddingBlock: 0,
    paddingInline: 16,
    overflow: 'unset'
  }), '&-light-filter', {
    marginBlockEnd: 0,
    paddingBlock: 0,
    paddingInline: 0
  }), '&-form-option', _defineProperty(_defineProperty(_defineProperty({}, "".concat(token.antCls, "-form-item"), {}), "".concat(token.antCls, "-form-item-label"), {}), "".concat(token.antCls, "-form-item-control-input"), {})), '@media (max-width: 575px)', _defineProperty({}, token.componentCls, _defineProperty({
    height: 'auto !important',
    paddingBlockEnd: '24px'
  }, "".concat(token.antCls, "-form-item-label"), {
    minWidth: '80px',
    textAlign: 'start'
  })))), '&-toolbar', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
    paddingInline: 24,
    paddingBlock: 0,
    '&-option': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    '&-title': {
      flex: '1',
      color: token.colorTextLabel,
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '24px',
      opacity: '0.85'
    }
  })), "@media (max-width: ".concat(token.screenXS, ")px"), _defineProperty({}, token.componentCls, _defineProperty({}, "".concat(token.antCls, "-table"), {
    width: '100%',
    overflowX: 'auto',
    '&-thead > tr,&-tbody > tr': {
      '> th,> td': {
        whiteSpace: 'pre',
        '>span': {
          display: 'block'
        }
      }
    }
  }))), '@media (max-width: 575px)', _defineProperty({}, "".concat(token.componentCls, "-toolbar"), {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 'auto',
    marginBlockEnd: '16px',
    marginInlineStart: '16px',
    paddingBlock: 8,
    paddingInline: 8,
    paddingBlockStart: '16px',
    lineHeight: 'normal',
    '&-title': {
      marginBlockEnd: 16
    },
    '&-option': {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    },
    '&-default-option': {
      display: 'flex',
      flex: '1',
      alignItems: 'center',
      justifyContent: 'flex-end'
    }
  }));
};
function useStyle(prefixCls) {
  return (0, _proProvider.useStyle)('ProTable', function (token) {
    var proListToken = _objectSpread(_objectSpread({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProListStyle(proListToken)];
  });
}