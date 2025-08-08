function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { proTheme } from '@ant-design/pro-provider';
import { LabelIconTip, compareVersions } from '@ant-design/pro-utils';
import { Button, ConfigProvider, Input, Tabs, Tooltip, version } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import ResizeObserver from 'rc-resize-observer';
import React, { useContext, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import Actions from "./Actions";
import HeaderMenu from "./HeaderMenu";
import { useStyle } from "./style";

// Antd 預設直接導出了 rc 組件中的 Tab.Pane 組件。
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 獲取配置區域 DOM Item
 *
 * @param setting 配置項
 */
function getSettingItem(setting) {
  if ( /*#__PURE__*/React.isValidElement(setting)) {
    return setting;
  }
  if (setting) {
    var settingConfig = setting;
    var icon = settingConfig.icon,
      tooltip = settingConfig.tooltip,
      _onClick = settingConfig.onClick,
      _key = settingConfig.key;
    if (icon && tooltip) {
      return /*#__PURE__*/_jsx(Tooltip, {
        title: tooltip,
        children: /*#__PURE__*/_jsx("span", {
          onClick: function onClick() {
            if (_onClick) {
              _onClick(_key);
            }
          },
          children: icon
        }, _key)
      });
    }
    return /*#__PURE__*/_jsx("span", {
      onClick: function onClick() {
        if (_onClick) {
          _onClick(_key);
        }
      },
      children: icon
    }, _key);
  }
  return null;
}
var ListToolBarTabBar = function ListToolBarTabBar(_ref) {
  var _tabs$items;
  var prefixCls = _ref.prefixCls,
    tabs = _ref.tabs,
    multipleLine = _ref.multipleLine,
    filtersNode = _ref.filtersNode;
  if (!multipleLine) return null;
  return /*#__PURE__*/_jsx("div", {
    className: "".concat(prefixCls, "-extra-line"),
    children: tabs !== null && tabs !== void 0 && tabs.items && tabs !== null && tabs !== void 0 && tabs.items.length ? /*#__PURE__*/_jsx(Tabs, {
      style: {
        width: '100%'
      },
      defaultActiveKey: tabs.defaultActiveKey,
      activeKey: tabs.activeKey,
      items: tabs.items.map(function (item, index) {
        var _item$key;
        return _objectSpread(_objectSpread({
          label: item.tab
        }, item), {}, {
          key: ((_item$key = item.key) === null || _item$key === void 0 ? void 0 : _item$key.toString()) || (index === null || index === void 0 ? void 0 : index.toString())
        });
      }),
      onChange: tabs.onChange,
      tabBarExtraContent: filtersNode,
      children: (_tabs$items = tabs.items) === null || _tabs$items === void 0 ? void 0 : _tabs$items.filter(function () {
        return compareVersions(version, '4.23.0') < 0;
      }).map(function (item, index) {
        return /*#__PURE__*/_createElement(Tabs.TabPane, _objectSpread(_objectSpread({}, item), {}, {
          key: item.key || index,
          tab: item.tab
        }));
      })
    }) : filtersNode
  });
};
var ListToolBar = function ListToolBar(_ref2) {
  var _action$current4, _action$current5;
  var customizePrefixCls = _ref2.prefixCls,
    title = _ref2.title,
    subTitle = _ref2.subTitle,
    tooltip = _ref2.tooltip,
    className = _ref2.className,
    style = _ref2.style,
    search = _ref2.search,
    onSearch = _ref2.onSearch,
    _ref2$multipleLine = _ref2.multipleLine,
    multipleLine = _ref2$multipleLine === void 0 ? false : _ref2$multipleLine,
    filter = _ref2.filter,
    action = _ref2.action,
    _ref2$actions = _ref2.actions,
    actions = _ref2$actions === void 0 ? [] : _ref2$actions,
    _ref2$settings = _ref2.settings,
    settings = _ref2$settings === void 0 ? [] : _ref2$settings,
    tabs = _ref2.tabs,
    menu = _ref2.menu,
    moduleName = _ref2.moduleName,
    hasSearch = _ref2.hasSearch,
    exportOptions = _ref2.exportOptions,
    collapsed = _ref2.collapsed,
    needCollapsed = _ref2.needCollapsed,
    _setCollapsed = _ref2.setCollapsed;
  var _ref3 = exportOptions || {},
    _ref3$defaultWaterMar = _ref3.defaultWaterMark,
    defaultWaterMark = _ref3$defaultWaterMar === void 0 ? '' : _ref3$defaultWaterMar,
    exportFileName = _ref3.exportFileName,
    exportTitle = _ref3.exportTitle,
    props = _ref3.props,
    _ref3$enableDateName = _ref3.enableDateName,
    enableDateName = _ref3$enableDateName === void 0 ? true : _ref3$enableDateName,
    _ref3$enableDefaultMa = _ref3.enableDefaultMark,
    enableDefaultMark = _ref3$enableDefaultMa === void 0 ? true : _ref3$enableDefaultMa,
    _ref3$enableSetWaterM = _ref3.enableSetWaterMark,
    enableSetWaterMark = _ref3$enableSetWaterM === void 0 ? true : _ref3$enableSetWaterM,
    exportFunction = _ref3.exportFunction,
    exportRequest = _ref3.exportRequest,
    exportBtnProp = _ref3.exportBtnProp,
    fieldsFilter = _ref3.fieldsFilter,
    _ref3$exportFileType = _ref3.exportFileType,
    exportFileType = _ref3$exportFileType === void 0 ? 'ALL' : _ref3$exportFileType,
    exportDisabled = _ref3.disabled,
    waterMarkFieldProps = _ref3.waterMarkFieldProps;
  var _useIntl = useIntl(),
    formatMessage = _useIntl.formatMessage;
  var _useContext = useContext(ConfigProvider.ConfigContext),
    getPrefixCls = _useContext.getPrefixCls;
  var _proTheme$useToken = proTheme.useToken(),
    token = _proTheme$useToken.token;
  var prefixCls = getPrefixCls('pro-table-list-toolbar', customizePrefixCls);
  var _useStyle = useStyle(prefixCls),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isMobile = _useState2[0],
    setIsMobile = _useState2[1];
  var placeholder = formatMessage({
    id: 'tableForm.inputPlaceholder',
    defaultMessage: '請輸入'
  });
  var defaultWaterMarkContent = useMemo(function () {
    if (enableDefaultMark) {
      return defaultWaterMark ? defaultWaterMark : formatMessage({
        id: 'component.table.tooltip.export.defaultWaterMark'
      });
    } else {
      return '';
    }
  }, [defaultWaterMark, enableDefaultMark]);

  /**
   * 取得搜尋欄 DOM
   *
   * @param search 搜尋框相關配置
   */
  var searchNode = useMemo(function () {
    if (!search) {
      return null;
    }
    if ( /*#__PURE__*/React.isValidElement(search)) {
      return search;
    }
    return /*#__PURE__*/_jsx(Input.Search, _objectSpread(_objectSpread({
      style: {
        width: 200
      },
      placeholder: placeholder
    }, search), {}, {
      onSearch: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _onSearch, _ref5;
        var _len,
          restParams,
          _key2,
          success,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              for (_len = _args.length, restParams = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
                restParams[_key2] = _args[_key2];
              }
              _context.next = 3;
              return (_onSearch = (_ref5 = search).onSearch) === null || _onSearch === void 0 ? void 0 : _onSearch.call.apply(_onSearch, [_ref5].concat(restParams));
            case 3:
              success = _context.sent;
              if (success !== false) {
                onSearch === null || onSearch === void 0 || onSearch(restParams === null || restParams === void 0 ? void 0 : restParams[0]);
              }
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))
    }));
  }, [placeholder, onSearch, search]);

  // 輕量篩選組件
  var filtersNode = useMemo(function () {
    if (filter) return /*#__PURE__*/_jsx("div", {
      className: "".concat(prefixCls, "-filter ").concat(hashId).trim(),
      children: filter
    });
    return null;
  }, [filter, hashId, prefixCls]);

  // 有沒有 title，需要結合多個場景判斷
  var hasTitle = useMemo(function () {
    return menu || title || subTitle || tooltip;
  }, [menu, subTitle, title, tooltip]);
  var exportDom = useMemo(function () {
    if (!exportRequest && !exportFunction) return /*#__PURE__*/_jsx(_Fragment, {});
    var options = [{
      label: 'PDF',
      value: 'PDF'
    }, {
      label: 'EXCEL',
      value: 'EXCEL'
    }];
    if (exportFileType === 'EXCEL') {
      options = [{
        label: 'EXCEL',
        value: 'EXCEL'
      }];
    } else if (exportFileType === 'PDF') {
      options = [{
        label: 'PDF',
        value: 'PDF'
      }];
    }
    return /*#__PURE__*/_jsxs(ModalForm, {
      colon: false,
      modalProps: {
        maskClosable: false
      },
      title: formatMessage({
        id: 'component.table.toolbar.export',
        defaultMessage: '匯出'
      }),
      width: "500px",
      trigger: /*#__PURE__*/_jsx(Button, _objectSpread(_objectSpread({
        disabled: exportDisabled
      }, exportBtnProp), {}, {
        children: (exportBtnProp === null || exportBtnProp === void 0 ? void 0 : exportBtnProp.children) || formatMessage({
          id: 'component.table.toolbar.export',
          defaultMessage: '匯出'
        })
      }), "export-btn"),
      onFinish: ( /*#__PURE__*/function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(values) {
          var _action$current, _action$current$getSe, _action$current2, _action$current2$getS;
          var searchParams, sorts, _action$current3, fileTypeMap, tableColumns, exportBody, fileResponse, bl, link, fileName;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                searchParams = action === null || action === void 0 || (_action$current = action.current) === null || _action$current === void 0 || (_action$current$getSe = _action$current.getSearchTransformParams) === null || _action$current$getSe === void 0 ? void 0 : _action$current$getSe.call(_action$current);
                sorts = action === null || action === void 0 || (_action$current2 = action.current) === null || _action$current2 === void 0 || (_action$current2$getS = _action$current2.getSorts) === null || _action$current2$getS === void 0 ? void 0 : _action$current2$getS.call(_action$current2);
                if (!searchParams) {
                  _context2.next = 31;
                  break;
                }
                // 如果 transform 沒有值，就把 sort 放進查詢條件
                if (sorts && (sorts === null || sorts === void 0 ? void 0 : sorts.length) !== 0 && isEmpty(searchParams.sorts)) {
                  searchParams.sorts = _toConsumableArray(sorts);
                }
                fileTypeMap = {
                  PDF: 'pdf',
                  EXCEL: 'xlsx'
                };
                tableColumns = action === null || action === void 0 || (_action$current3 = action.current) === null || _action$current3 === void 0 ? void 0 : _action$current3.getTableColumns();
                exportBody = Object.assign({}, {
                  fields: typeof fieldsFilter === 'function' ? fieldsFilter(tableColumns.split(',')) : tableColumns.split(','),
                  criterion: searchParams,
                  limit: 50000
                }, values);
                exportBody.title = exportTitle;
                exportBody.props = _objectSpread({
                  reportCode: 'xxxxxx-x',
                  securityLevel: '內部資訊',
                  pageSize: '210mm 297mm'
                }, props);
                if (!(exportFunction && typeof exportFunction === 'function')) {
                  _context2.next = 15;
                  break;
                }
                _context2.next = 12;
                return exportFunction(exportBody);
              case 12:
                return _context2.abrupt("return", _context2.sent);
              case 15:
                _context2.next = 17;
                return exportRequest === null || exportRequest === void 0 ? void 0 : exportRequest({
                  page: 1,
                  size: 50000
                }, exportBody, {
                  responseType: 'blob'
                });
              case 17:
                fileResponse = _context2.sent;
                if (!fileResponse) {
                  _context2.next = 30;
                  break;
                }
                bl = new Blob([fileResponse]);
                link = document.createElement('a');
                link.href = window.URL.createObjectURL(bl);
                if (exportFileName) {
                  fileName = "".concat(exportFileName).concat(enableDateName ? '.' + dayjs().format('TTTMMDD') : '');
                } else {
                  fileName = moduleName || '';
                }
                link.download = fileName + '.' + fileTypeMap[values.outputType];
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(link.href);
                return _context2.abrupt("return", true);
              case 30:
                return _context2.abrupt("return", false);
              case 31:
                return _context2.abrupt("return", true);
              case 32:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        return function (_x) {
          return _ref6.apply(this, arguments);
        };
      }()),
      layout: "horizontal",
      labelCol: {
        style: {
          width: '10em'
        }
      },
      submitter: {
        searchConfig: {
          submitText: formatMessage({
            id: 'component.table.toolbar.export',
            defaultMessage: '匯出'
          })
        }
      },
      children: [/*#__PURE__*/_jsx(ProFormRadio.Group, {
        initialValue: exportFileType === 'EXCEL' ? 'EXCEL' : 'PDF',
        name: "outputType",
        label: formatMessage({
          id: 'component.export.outputType',
          defaultMessage: '文件類型'
        }),
        options: options
      }), enableSetWaterMark &&
      /*#__PURE__*/
      // @ts-ignore
      _jsx(ProFormText, _objectSpread({
        name: "waterMark",
        label: formatMessage({
          id: 'component.export.waterMark',
          defaultMessage: '水印內容'
        }),
        initialValue: enableDefaultMark ? defaultWaterMarkContent : ''
      }, waterMarkFieldProps))]
    });
  }, [action, action === null || action === void 0 || (_action$current4 = action.current) === null || _action$current4 === void 0 ? void 0 : _action$current4.pageInfo, action === null || action === void 0 || (_action$current5 = action.current) === null || _action$current5 === void 0 || (_action$current5 = _action$current5.pageInfo) === null || _action$current5 === void 0 ? void 0 : _action$current5.total, exportRequest, defaultWaterMarkContent, enableDateName, exportFileName, exportTitle, exportDisabled, exportFileType]);
  var actionDom = useMemo(function () {
    if (!Array.isArray(actions)) {
      return actions;
    }
    if (actions.length < 1) {
      return exportDom;
    }
    return /*#__PURE__*/_jsxs("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: token.marginXS
      },
      children: [actions.map(function (actionItem, index) {
        if (! /*#__PURE__*/React.isValidElement(actionItem)) {
          return /*#__PURE__*/_jsx(React.Fragment, {
            children: actionItem
          }, index);
        }
        return /*#__PURE__*/React.cloneElement(actionItem, _objectSpread({
          key: index
        }, actionItem === null || actionItem === void 0 ? void 0 : actionItem.props));
      }), exportDom]
    });
  }, [actions]);
  var SearchBtn = useMemo(function () {
    if (!hasSearch) {
      return null;
    }
    var buttons = /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Button, {
        type: "primary",
        onClick: function onClick() {
          var _action$current6;
          action === null || action === void 0 || (_action$current6 = action.current) === null || _action$current6 === void 0 || _action$current6.reload(true);
        },
        children: formatMessage({
          id: 'component.table.form.search',
          defaultMessage: '查詢'
        })
      }), /*#__PURE__*/_jsx(Button, {
        onClick: function onClick() {
          var _action$current7, _action$current7$rese;
          return action === null || action === void 0 || (_action$current7 = action.current) === null || _action$current7 === void 0 || (_action$current7$rese = _action$current7.resetSearch) === null || _action$current7$rese === void 0 ? void 0 : _action$current7$rese.call(_action$current7);
        },
        children: formatMessage({
          id: 'component.table.form.reset',
          defaultMessage: '重置'
        })
      })]
    });
    return /*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx(Actions, {
        submitter: buttons,
        collapsed: collapsed,
        needCollapse: needCollapsed,
        setCollapsed: function setCollapsed(value) {
          return _setCollapsed === null || _setCollapsed === void 0 ? void 0 : _setCollapsed(value);
        }
      })
    });
  }, [onSearch, search, collapsed, needCollapsed, _setCollapsed, hasSearch]);
  var hasRight = useMemo(function () {
    return !!(hasTitle && searchNode || !multipleLine && filtersNode || actionDom || settings !== null && settings !== void 0 && settings.length);
  }, [actionDom, filtersNode, hasTitle, multipleLine, searchNode, settings === null || settings === void 0 ? void 0 : settings.length]);
  var hasLeft = useMemo(function () {
    return tooltip || title || subTitle || menu || !hasTitle && searchNode || hasSearch;
  }, [hasTitle, menu, searchNode, subTitle, title, tooltip, hasSearch]);
  var leftTitleDom = useMemo(function () {
    // 保留 DOM 是為了佔位，不然 right 就變到左邊了
    if (!hasLeft && hasRight) {
      return /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-left ").concat(hashId).trim()
      });
    }

    // 減少 space 的 DOM，渲染的時候能節省點性能
    if (!menu && (hasTitle || !searchNode) && !hasSearch) {
      return /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-left ").concat(hashId).trim(),
        children: /*#__PURE__*/_jsx("div", {
          className: "".concat(prefixCls, "-title ").concat(hashId).trim(),
          children: /*#__PURE__*/_jsx(LabelIconTip, {
            tooltip: tooltip,
            label: title,
            subTitle: subTitle
          })
        })
      });
    }
    return /*#__PURE__*/_jsxs("div", {
      className: classNames("".concat(prefixCls, "-left"), hashId, _defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-left-has-tabs"), (menu === null || menu === void 0 ? void 0 : menu.type) === 'tab'), "".concat(prefixCls, "-left-has-dropdown"), (menu === null || menu === void 0 ? void 0 : menu.type) === 'dropdown'), "".concat(prefixCls, "-left-has-inline-menu"), (menu === null || menu === void 0 ? void 0 : menu.type) === 'inline')),
      children: [SearchBtn, hasTitle && !menu && /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-title ").concat(hashId).trim(),
        children: /*#__PURE__*/_jsx(LabelIconTip, {
          tooltip: tooltip,
          label: title,
          subTitle: subTitle
        })
      }), menu &&
      /*#__PURE__*/
      // 這裡實現了 tabs 的邏輯
      _jsx(HeaderMenu, _objectSpread(_objectSpread({}, menu), {}, {
        prefixCls: prefixCls
      })), !hasTitle && searchNode ? /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-search ").concat(hashId).trim(),
        children: searchNode
      }) : null]
    });
  }, [hasLeft, hasRight, hasTitle, hashId, menu, prefixCls, searchNode, subTitle, title, tooltip, SearchBtn]);
  var rightTitleDom = useMemo(function () {
    if (!hasRight) return null;
    return /*#__PURE__*/_jsxs("div", {
      className: "".concat(prefixCls, "-right ").concat(hashId).trim(),
      style: isMobile ? {} : {
        alignItems: 'center'
      },
      children: [!multipleLine ? filtersNode : null, hasTitle && searchNode ? /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-search ").concat(hashId).trim(),
        children: searchNode
      }) : null, actionDom, settings !== null && settings !== void 0 && settings.length ? /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-setting-items ").concat(hashId).trim(),
        children: settings.map(function (setting, index) {
          var settingItem = getSettingItem(setting);
          return /*#__PURE__*/_jsx("div", {
            className: "".concat(prefixCls, "-setting-item ").concat(hashId).trim(),
            children: settingItem
          }, index);
        })
      }) : null]
    });
  }, [hasRight, prefixCls, hashId, isMobile, hasTitle, searchNode, multipleLine, filtersNode, actionDom, settings]);
  var titleNode = useMemo(function () {
    if (!hasRight && !hasLeft) return null;
    var containerClassName = classNames("".concat(prefixCls, "-container"), hashId, _defineProperty({}, "".concat(prefixCls, "-container-mobile"), isMobile));
    return /*#__PURE__*/_jsxs("div", {
      className: containerClassName,
      children: [leftTitleDom, rightTitleDom]
    });
  }, [hasLeft, hasRight, hashId, isMobile, leftTitleDom, prefixCls, rightTitleDom]);
  return wrapSSR( /*#__PURE__*/_jsx(ResizeObserver, {
    onResize: function onResize(size) {
      if (size.width < 375 !== isMobile) {
        setIsMobile(size.width < 375);
      }
    },
    children: /*#__PURE__*/_jsxs("div", {
      style: style,
      className: classNames(prefixCls, hashId, className),
      children: [titleNode, /*#__PURE__*/_jsx(ListToolBarTabBar, {
        filtersNode: filtersNode,
        prefixCls: prefixCls,
        tabs: tabs,
        multipleLine: multipleLine
      })]
    })
  }));
};
export default ListToolBar;