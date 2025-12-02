"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMergeCell = exports.isBordered = exports.genColumnKey = exports.checkUndefinedOrNull = void 0;
exports.mergePagination = mergePagination;
exports.parseDefaultColumnConfig = parseDefaultColumnConfig;
exports.postDataPipeline = postDataPipeline;
exports.useActionType = useActionType;
var _clearTableSessionStorage = require("./clearTableSessionStorage");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * 檢查值是否存在 為了 避開 0 和 false
 *
 * @param value
 */
var checkUndefinedOrNull = exports.checkUndefinedOrNull = function checkUndefinedOrNull(value) {
  return value !== undefined && value !== null;
};

/**
 * 合併使用者 props 和 預設的 props
 *
 * @param pagination
 * @param action
 * @param intl
 */
function mergePagination(pagination, pageInfo, intl) {
  var _pagination$current, _pagination$pageSize;
  if (pagination === false) {
    return false;
  }
  var total = pageInfo.total,
    current = pageInfo.current,
    pageSize = pageInfo.pageSize,
    setPageInfo = pageInfo.setPageInfo;
  var defaultPagination = _typeof(pagination) === 'object' ? pagination : {};
  return _objectSpread(_objectSpread({
    showTotal: function showTotal(all, range) {
      return "".concat(intl.getMessage('pagination.total.range', '第'), " ").concat(range[0], "-").concat(range[1], " ").concat(intl.getMessage('pagination.total.total', '条/总共'), " ").concat(all, " ").concat(intl.getMessage('pagination.total.item', '条'));
    },
    total: total,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100']
  }, defaultPagination), {}, {
    current: pagination !== true && pagination ? (_pagination$current = pagination.current) !== null && _pagination$current !== void 0 ? _pagination$current : current : current,
    pageSize: pagination !== true && pagination ? (_pagination$pageSize = pagination.pageSize) !== null && _pagination$pageSize !== void 0 ? _pagination$pageSize : pageSize : pageSize,
    onChange: function onChange(page, newPageSize) {
      var _ref = pagination,
        onChange = _ref.onChange;
      onChange === null || onChange === void 0 || onChange(page, newPageSize || 10);
      // pageSize 改變之後就沒必要切換頁碼
      if (newPageSize !== pageSize || current !== page) {
        setPageInfo({
          pageSize: newPageSize,
          current: page
        });
      }
    }
  });
}

/**
 * 獲取使用者的 action 資訊
 *
 * @param ref
 * @param action
 * @param props
 */
function useActionType(ref, action, props) {
  // 這裡生成 action 的映射，保證 action 總是使用的是最新的 只需要渲染一次即可
  var userAction = _objectSpread(_objectSpread({}, props.editableUtils), {}, {
    clearSelected: function clearSelected() {
      return props.onCleanSelected();
    },
    createUrlState: function createUrlState(type) {
      var searchCondition = props.getSearchFormValues();
      var url = new URLSearchParams(searchCondition).toString();
      return type === 'encode' ? encodeURIComponent(window.btoa(url)) : url;
    },
    fullScreen: function fullScreen() {
      return props.fullScreen();
    },
    getSearchHistoryTransformParams: function getSearchHistoryTransformParams() {
      var _sessionStorage$getIt, _props$searchParamsTr, _props$searchParamsTr2;
      var searchform = JSON.parse((_sessionStorage$getIt = sessionStorage.getItem(props.moduleName)) !== null && _sessionStorage$getIt !== void 0 ? _sessionStorage$getIt : '{}');
      var sorts = props.getSorts();
      return (_props$searchParamsTr = props === null || props === void 0 || (_props$searchParamsTr2 = props.searchParamsTransform) === null || _props$searchParamsTr2 === void 0 ? void 0 : _props$searchParamsTr2.call(props, searchform, sorts)) !== null && _props$searchParamsTr !== void 0 ? _props$searchParamsTr : searchform;
    },
    getSearchParams: function getSearchParams() {
      return props.getSearchFormValues();
    },
    getSearchTransformParams: function getSearchTransformParams() {
      var _props$searchParamsTr3, _props$searchParamsTr4;
      var searchform = props.getSearchFormValues();
      var sorts = props.getSorts();
      return (_props$searchParamsTr3 = props === null || props === void 0 || (_props$searchParamsTr4 = props.searchParamsTransform) === null || _props$searchParamsTr4 === void 0 ? void 0 : _props$searchParamsTr4.call(props, searchform, sorts)) !== null && _props$searchParamsTr3 !== void 0 ? _props$searchParamsTr3 : searchform;
    },
    getSorts: function getSorts() {
      return props.getSorts();
    },
    getTableColumns: function getTableColumns() {
      return props === null || props === void 0 ? void 0 : props.tableColumnFields;
    },
    getSessionItem: function getSessionItem() {
      var value = sessionStorage.getItem(props.moduleName);
      try {
        return value ? JSON.parse(value) : null;
      } catch (_unused) {
        return value;
      }
    },
    ifSessionExisted: function ifSessionExisted() {
      if (sessionStorage.getItem(props.moduleName) === null) {
        sessionStorage.setItem(props.moduleName, '');
        return true;
      }
      return false;
    },
    pageInfo: action.pageInfo,
    reload: function () {
      var _reload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resetPageIndex) {
        var searchParams, memoSearchParams;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return props.validForm();
            case 2:
              if (!resetPageIndex) {
                _context.next = 5;
                break;
              }
              _context.next = 5;
              return action.setPageInfo({
                current: 1
              });
            case 5:
              props.setSearchFormValues();
              searchParams = props.getSearchFormValues();
              memoSearchParams = sessionStorage.getItem("".concat(_clearTableSessionStorage.COLUMN_SESSION_KEY, "_").concat(props.moduleName, "_").concat(location.pathname));
              if (!searchParams && memoSearchParams) {
                searchParams = JSON.parse(memoSearchParams);
              }
              if (searchParams === undefined) {
                sessionStorage.setItem(props.moduleName, '{}');
                sessionStorage.setItem("".concat(_clearTableSessionStorage.COLUMN_SESSION_KEY, "_").concat(props.moduleName, "_").concat(location.pathname), '{}');
              } else if (searchParams) {
                sessionStorage.setItem(props.moduleName, JSON.stringify(searchParams));
                sessionStorage.setItem("".concat(_clearTableSessionStorage.COLUMN_SESSION_KEY, "_").concat(props.moduleName, "_").concat(location.pathname), JSON.stringify(searchParams));
              }
              _context.next = 12;
              return action === null || action === void 0 ? void 0 : action.reload();
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function reload(_x) {
        return _reload.apply(this, arguments);
      }
      return reload;
    }(),
    reloadAndRest: function () {
      var _reloadAndRest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              // reload 之後大概率會切換數據，清空一下選擇。
              props.onCleanSelected();
              _context2.next = 3;
              return action.setPageInfo({
                current: 1
              });
            case 3:
              _context2.next = 5;
              return action === null || action === void 0 ? void 0 : action.reload();
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function reloadAndRest() {
        return _reloadAndRest.apply(this, arguments);
      }
      return reloadAndRest;
    }(),
    reset: function () {
      var _reset = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _action$reset;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return props.resetAll();
            case 2:
              _context3.next = 4;
              return action === null || action === void 0 || (_action$reset = action.reset) === null || _action$reset === void 0 ? void 0 : _action$reset.call(action);
            case 4:
              _context3.next = 6;
              return action === null || action === void 0 ? void 0 : action.reload();
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function reset() {
        return _reset.apply(this, arguments);
      }
      return reset;
    }(),
    resetForm: function () {
      var _resetForm = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return props.resetForm();
            case 2:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function resetForm() {
        return _resetForm.apply(this, arguments);
      }
      return resetForm;
    }(),
    resetSearch: function resetSearch() {
      props.resetSearch();
    },
    resetSearchFormValues: function () {
      var _resetSearchFormValues = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(values) {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return props.resetSearchFormValues(values);
            case 2:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function resetSearchFormValues(_x2) {
        return _resetSearchFormValues.apply(this, arguments);
      }
      return resetSearchFormValues;
    }(),
    resetWithOutSort: function () {
      var _resetWithOutSort = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var _action$reset2;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return props.resetWithOutSort();
            case 2:
              _context6.next = 4;
              return action === null || action === void 0 || (_action$reset2 = action.reset) === null || _action$reset2 === void 0 ? void 0 : _action$reset2.call(action);
            case 4:
              _context6.next = 6;
              return action === null || action === void 0 ? void 0 : action.reload();
            case 6:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function resetWithOutSort() {
        return _resetWithOutSort.apply(this, arguments);
      }
      return resetWithOutSort;
    }(),
    setPageInfo: function setPageInfo(rest) {
      return action.setPageInfo(rest);
    }
  });
  ref.current = userAction;
}
/**
 * 一個轉化的 pipeline 列表
 *
 * @param data
 * @param pipeline
 */
function postDataPipeline(data, pipeline) {
  if (pipeline.filter(function (item) {
    return item;
  }).length < 1) {
    return data;
  }
  return pipeline.reduce(function (pre, postData) {
    return postData(pre);
  }, data);
}
var isBordered = exports.isBordered = function isBordered(borderType, border) {
  if (border === undefined) {
    return false;
  }
  if (typeof border === 'boolean') {
    return border;
  }
  return border[borderType];
};
var isMergeCell = exports.isMergeCell = function isMergeCell(dom) {
  var _dom$props;
  return dom && _typeof(dom) === 'object' && (dom === null || dom === void 0 || (_dom$props = dom.props) === null || _dom$props === void 0 ? void 0 : _dom$props.colSpan);
};

/**
 * 根據 key 和 dataIndex 生成唯一 id
 *
 * @param key 使用者設定的 key
 * @param dataIndex 在物件中的數據
 * @param index 序列號，理論上唯一
 */
var genColumnKey = exports.genColumnKey = function genColumnKey(key, index) {
  if (key) {
    return Array.isArray(key) ? key.join('-') : key.toString();
  }
  return "".concat(index);
};

/**
 * 將 ProTable - column - dataIndex 轉為字串形式
 *
 * @param dataIndex Column 中的 dataIndex
 */
function parseDataIndex(dataIndex) {
  if (Array.isArray(dataIndex)) {
    return dataIndex.join(',');
  }
  return dataIndex === null || dataIndex === void 0 ? void 0 : dataIndex.toString();
}

/**
 * 從 ProColumns 數組中取出預設的排序和篩選數據
 *
 * @param columns ProColumns
 */
function parseDefaultColumnConfig(columns) {
  var filter = {};
  var sort = {};
  columns.forEach(function (column) {
    // 轉換 dataIndex
    var dataIndex = parseDataIndex(column.dataIndex);
    if (!dataIndex) {
      return;
    }
    // 當 column 啟用 filters 功能時，取出預設的篩選值
    if (column.filters) {
      var defaultFilteredValue = column.defaultFilteredValue;
      if (defaultFilteredValue === undefined) {
        filter[dataIndex] = null;
      } else {
        filter[dataIndex] = column.defaultFilteredValue;
      }
    }
    // 當 column 啟用 sorter 功能時，取出預設的排序值
    if (column.sorter && column.defaultSortOrder) {
      sort[dataIndex] = column.defaultSortOrder;
    }
  });
  return {
    sort: sort,
    filter: filter
  };
}