"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _proForm = _interopRequireDefault(require("@ant-design/pro-form"));
var _proProvider = require("@ant-design/pro-provider");
var _proUtils = require("@ant-design/pro-utils");
var _antd = require("antd");
var _classnames = _interopRequireDefault(require("classnames"));
var _dayjs = _interopRequireDefault(require("dayjs"));
var _omit = _interopRequireDefault(require("omit.js"));
var _react = _interopRequireWildcard(require("react"));
var _reactIntl = require("react-intl");
var _RenderField = require("../../../field/RenderField");
var _clearTableSessionStorage = require("../../utils/clearTableSessionStorage");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function toLowerLine(str) {
  var temp = str.replace(/[A-Z]/g, function (match) {
    return "-".concat(match.toLowerCase());
  });
  if (temp.startsWith('-')) {
    // 如果首字母是大寫，執行replace時會多一個_，這裡需要去掉
    temp = temp.slice(1);
  }
  return temp;
}
/**
 * 獲取當前選擇的 Form Layout 配置
 *
 * @param isForm
 * @param searchConfig
 * @returns LightFilter | QueryFilter | ProForm
 */
var getFormCompetent = function getFormCompetent(isForm, searchConfig) {
  if (!isForm && searchConfig !== false) {
    if ((searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.filterType) === 'light') {
      return 'LightFilter';
    }
    return 'QueryFilter';
  }
  return 'Form';
};

/**
 * 獲取需要傳給相應表單的props
 *
 * @param searchConfig
 * @param name
 */
var getFromProps = function getFromProps(isForm, searchConfig, name) {
  if (!isForm && name === 'LightFilter') {
    // 傳給 lightFilter 的問題
    return (0, _omit.default)(_objectSpread({}, searchConfig), ['labelWidth', 'defaultCollapsed', 'filterType']);
  }
  if (!isForm) {
    // 傳給 QueryFilter 的配置
    return (0, _omit.default)(_objectSpread({
      labelWidth: searchConfig ? searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.labelWidth : undefined
    }, searchConfig), ['filterType']);
  }
  return {};
};

/**
 * 從formConfig中獲取傳給相應表單的配置
 *
 * @param isForm
 * @param formConfig
 */
var getFormConfigs = function getFormConfigs(_isForm, formConfig) {
  // 傳給Form的配置
  return (0, _omit.default)(formConfig, ['ignoreRules']);
};
/**
 * 這裡會把 列配置轉化為 form 表單
 *
 * @param param0
 * @returns
 */
var FormRender = function FormRender(_ref) {
  var onSubmit = _ref.onSubmit,
    formRef = _ref.formRef,
    _ref$dateFormatter = _ref.dateFormatter,
    dateFormatter = _ref$dateFormatter === void 0 ? 'string' : _ref$dateFormatter,
    type = _ref.type,
    columns = _ref.columns,
    action = _ref.action,
    ghost = _ref.ghost,
    manualRequest = _ref.manualRequest,
    _onReset = _ref.onReset,
    submitButtonLoading = _ref.submitButtonLoading,
    searchConfig = _ref.search,
    formConfig = _ref.form,
    bordered = _ref.bordered,
    moduleName = _ref.moduleName,
    collapsed = _ref.collapsed,
    setNeedCollapsed = _ref.setNeedCollapsed,
    onValuesChange = _ref.onValuesChange,
    _onInit = _ref.onInit;
  var _useContext = (0, _react.useContext)(_proProvider.ProProvider),
    hashId = _useContext.hashId;
  var isForm = type === 'form';
  /**
   * 提交表單，根據兩種模式不同，方法不相同
   */
  var submit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(values, firstLoad) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (onSubmit) {
              onSubmit(values, firstLoad);
            }
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function submit(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var _useContext2 = (0, _react.useContext)(_antd.ConfigProvider.ConfigContext),
    getPrefixCls = _useContext2.getPrefixCls;
  var columnsList = (0, _react.useMemo)(function () {
    return columns.filter(function (item) {
      if (item === _antd.Table.EXPAND_COLUMN || item === _antd.Table.SELECTION_COLUMN) {
        return false;
      }
      if ((item.hideInSearch || item.search === false) && type !== 'form') {
        return false;
      }
      if (['index', 'indexBorder', 'option'].includes(item === null || item === void 0 ? void 0 : item.valueType)) {
        return false;
      }
      if (type === 'form' && item.hideInForm) {
        return false;
      }
      return true;
    }).sort(function (a, b) {
      if (b.order || a.order) {
        return (b.order || 0) - (a.order || 0);
      }
      return (b.index || 0) - (a.index || 0);
    }).map(function (item) {
      var _item$dataIndex;
      var finalValueType = !item.valueType || ['textarea', 'jsonCode', 'code'].includes(item === null || item === void 0 ? void 0 : item.valueType) && type === 'table' ? 'text' : item === null || item === void 0 ? void 0 : item.valueType;
      var columnKey = (item === null || item === void 0 ? void 0 : item.key) || (item === null || item === void 0 || (_item$dataIndex = item.dataIndex) === null || _item$dataIndex === void 0 ? void 0 : _item$dataIndex.toString());
      return _objectSpread(_objectSpread(_objectSpread({}, item), {}, {
        width: undefined
      }, item.search && _typeof(item.search) === 'object' ? item.search : {}), {}, {
        valueType: finalValueType,
        key: columnKey,
        proFieldProps: _objectSpread(_objectSpread({}, item.proFieldProps), {}, {
          proFieldKey: columnKey ? "table-field-".concat(columnKey) : undefined
        })
      });
    });
  }, [columns, type]);
  var className = getPrefixCls('pro-table-search');
  var formClassName = getPrefixCls('pro-table-form');
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    genItems = _useState2[0],
    setGenItems = _useState2[1];
  var _useReactIntl = (0, _reactIntl.useIntl)(),
    formatMessage = _useReactIntl.formatMessage;
  (0, _react.useEffect)(function () {
    var totalSpan = 0;
    var formGenItems = columnsList.map(function (originItem) {
      var _originItem$colSize;
      var finalSpan = 4 * ((_originItem$colSize = originItem.colSize) !== null && _originItem$colSize !== void 0 ? _originItem$colSize : 1);
      totalSpan += finalSpan;
      var hidden = false;
      if (totalSpan > 24) {
        setNeedCollapsed(true);
        hidden = true;
      }
      var item = (0, _proUtils.omitUndefined)({
        label: '',
        collapsed: collapsed,
        hidden: hidden,
        colSpan: finalSpan,
        moduleName: originItem.moduleName,
        columnName: originItem.columnName,
        valueType: (0, _proUtils.runFunction)(originItem.valueType, {}),
        key: originItem.key,
        valueEnum: originItem.valueEnum,
        dataIndex: originItem.key || originItem.dataIndex,
        initialValue: originItem.initialValue,
        width: originItem.width,
        index: originItem.index,
        readonly: originItem.readonly,
        colSize: originItem.colSize,
        className: originItem.className,
        tooltip: originItem.tooltip,
        dependencies: originItem.dependencies,
        proFieldProps: originItem.proFieldProps,
        fieldProps: originItem.fieldProps,
        getFieldProps: originItem.fieldProps ? function () {
          return (0, _proUtils.runFunction)(originItem.fieldProps, formRef.current, originItem);
        } : undefined,
        getFormItemProps: originItem.formItemProps ? function () {
          return (0, _proUtils.runFunction)(originItem.formItemProps, formRef.current, originItem);
        } : undefined,
        render: originItem.render,
        renderFormItem: originItem.renderFormItem,
        renderText: originItem.renderText,
        request: originItem.request,
        params: originItem.params,
        transform: originItem.transform,
        rules: originItem.rules,
        startColumnName: originItem.startColumnName,
        endColumnName: originItem.endColumnName
      });
      return (0, _RenderField.renderValueType)(item, {
        action: action,
        type: type,
        originItem: originItem,
        formRef: formRef,
        columnsList: columnsList
      }, formatMessage);
    });
    setGenItems(formGenItems);
  }, [action, formRef, type, collapsed, columnsList]);
  var competentName = (0, _react.useMemo)(function () {
    return getFormCompetent(isForm, searchConfig);
  }, [searchConfig, isForm]);

  // 傳給每個表單的配置，理論上大家都需要
  var loadingProps = (0, _react.useMemo)(function () {
    return {
      submitter: {
        submitButtonProps: {
          loading: submitButtonLoading
        }
      }
    };
  }, [submitButtonLoading]);
  var storageData = sessionStorage.getItem("".concat(_clearTableSessionStorage.TABLE_SESSION_KEY, "_").concat(moduleName, "_").concat(location.pathname));
  var dateValueType = ['date', 'dateTime', 'dateMonth', 'dateQuarter', 'dateWeek', 'dateYear'];
  var initValue = (0, _react.useMemo)(function () {
    var initData = Object.assign({}, storageData ? JSON.parse(storageData) : formConfig === null || formConfig === void 0 ? void 0 : formConfig.initialValues);
    // 時間格式轉換成moment 對象
    Object.keys(initData).forEach(function (key) {
      var value = initData[key];
      if (isNaN(value) && !isNaN(Date.parse(value)) && !(value instanceof Array) && columnsList.find(function (item) {
        return item.columnName === key && dateValueType.includes(item.valueType);
      })) {
        initData[key] = (0, _dayjs.default)(value);
      }
    });
    return initData;
  }, [formConfig === null || formConfig === void 0 ? void 0 : formConfig.initialValues, storageData, columnsList]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: (0, _classnames.default)(hashId, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, getPrefixCls('pro-card'), true), "".concat(getPrefixCls('pro-card'), "-border"), !!bordered), "".concat(getPrefixCls('pro-card'), "-bordered"), !!bordered), "".concat(getPrefixCls('pro-card'), "-ghost"), !!ghost), className, true), formClassName, isForm), getPrefixCls("pro-table-search-".concat(toLowerLine(competentName))), true), "".concat(className, "-ghost"), ghost), searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.className, searchConfig !== false && (searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.className))),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_proForm.default, _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, loadingProps), getFromProps(isForm, searchConfig, competentName)), getFormConfigs(isForm, formConfig || {})), {}, {
      dateFormatter: dateFormatter,
      submitter: false,
      rowProps: {
        gutter: [8, 0]
      },
      autoFocusFirstInput: false,
      grid: true,
      formRef: formRef,
      onInit: function onInit(values) {
        var getValues = initValue;
        if (_onInit) {
          _onInit(getValues, Object.assign({}, formConfig === null || formConfig === void 0 ? void 0 : formConfig.initialValues, storageData ? JSON.parse(storageData) : {}));
        }
        // 觸發一個 submit，之所以這裡觸發是為了保證 value 都被 format了
        if (type !== 'form') {
          var _action$current, _action$current2, _action$current2$setP;
          // 修改 pageSize，變成從 url 中獲取的
          var pageInfo = (_action$current = action.current) === null || _action$current === void 0 ? void 0 : _action$current.pageInfo;
          // 從 values 裡獲取是因為有時候要從 url中獲取的 pageSize。
          var _ref3 = values,
            _ref3$current = _ref3.current,
            current = _ref3$current === void 0 ? pageInfo === null || pageInfo === void 0 ? void 0 : pageInfo.current : _ref3$current,
            _ref3$pageSize = _ref3.pageSize,
            pageSize = _ref3$pageSize === void 0 ? pageInfo === null || pageInfo === void 0 ? void 0 : pageInfo.pageSize : _ref3$pageSize;
          (_action$current2 = action.current) === null || _action$current2 === void 0 || (_action$current2$setP = _action$current2.setPageInfo) === null || _action$current2$setP === void 0 || _action$current2$setP.call(_action$current2, _objectSpread(_objectSpread({}, pageInfo), {}, {
            current: parseInt(current, 10),
            pageSize: parseInt(pageSize, 10)
          }));
          // 如果是手動模式不需要提交
          if (manualRequest) return;
          submit(getValues, true);
        }
      },
      onValuesChange: onValuesChange,
      onReset: function onReset(values) {
        _onReset === null || _onReset === void 0 || _onReset(values);
      },
      initialValues: initValue,
      children: genItems
    }))
  });
};
var _default = exports.default = FormRender;