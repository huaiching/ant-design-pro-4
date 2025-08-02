"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _proUtils = require("@ant-design/pro-utils");
var _react = require("react");
var _reactDom = require("react-dom");
var _index = require("./utils/index");
var _excluded = ["data", "success", "total"];
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * 組合用戶的配置和默認值
 *
 * @param param0
 */
var mergeOptionAndPageInfo = function mergeOptionAndPageInfo(_ref) {
  var pageInfo = _ref.pageInfo;
  if (pageInfo) {
    var current = pageInfo.current,
      defaultCurrent = pageInfo.defaultCurrent,
      pageSize = pageInfo.pageSize,
      defaultPageSize = pageInfo.defaultPageSize;
    return {
      current: current || defaultCurrent || 1,
      total: 0,
      pageSize: pageSize || defaultPageSize || 20
    };
  }
  return {
    current: 1,
    total: 0,
    pageSize: 20
  };
};

/**
 * useFetchData hook 用來獲取數據並控制數據的狀態和分頁
 * @template T
 * @param {(undefined | ((params?: { pageSize: number; current: number }) => Promise<DataSource>))} getData - 獲取數據的函數，參數為分頁參數，
 * 返回一個 Promise 類型的 T 類型的數據
 * @param {(undefined | any[])} defaultData - 預設的數據
 * @param {UseFetchProps} options - 配置項，包括了預設的分頁參數、格式化數據的函數等
 * @returns {UseFetchDataAction} 返回一個物件，包含當前的數據列表、loading 狀態、error、以及可控制的分頁參數等
 */
var useFetchData = function useFetchData(getData, defaultData, options) {
  var _options$loading;
  /**
   * 用於保存組件是否被卸載的狀態的引用
   * @type {React.MutableRefObject<boolean>}
   */
  var umountRef = (0, _react.useRef)(false);
  /**
   * 用於保存 AbortController 實例的引用，方便需要時進行請求的取消操作
   * @type {React.MutableRefObject<AbortController | null>}
   */
  var abortRef = (0, _react.useRef)(null);
  /**
   * useFetchData 鉤子的配置項
   * @typedef {object} UseFetchProps
   * @property {boolean} [onLoad=false] 是否在頁面加載時執行請求，預設為 false
   * @property {boolean} [manual=false] 是否手動觸發請求，預設為 false
   * @property {number | boolean} [polling=false] 是否開啟輪詢，可以為數字表示輪詢的時間間隔，也可以為 true 表示開啟預設时间为 1s 的輪詢
   * @property {function} [onRequestError] 請求錯誤的回呼函數
   * @property {number} [debounceTime=20] 防抖時間，單位為毫秒，預設為 20ms
   */
  var _ref2 = options || {},
    onLoad = _ref2.onLoad,
    manual = _ref2.manual,
    polling = _ref2.polling,
    onRequestError = _ref2.onRequestError,
    _ref2$debounceTime = _ref2.debounceTime,
    debounceTime = _ref2$debounceTime === void 0 ? 20 : _ref2$debounceTime,
    _ref2$effects = _ref2.effects,
    effects = _ref2$effects === void 0 ? [] : _ref2$effects;

  // 是否首次加載的指示器
  var manualRequestRef = (0, _react.useRef)(manual);

  // 輪詢的setTime ID 儲存
  var pollingSetTimeRef = (0, _react.useRef)();

  // 用於儲存最新的數據，這樣可以在切換的時候保持數據的一致性
  var _useMountMergeState = (0, _proUtils.useMountMergeState)(defaultData, {
      value: options === null || options === void 0 ? void 0 : options.dataSource,
      onChange: options === null || options === void 0 ? void 0 : options.onDataSourceChange
    }),
    _useMountMergeState2 = _slicedToArray(_useMountMergeState, 2),
    tableDataList = _useMountMergeState2[0],
    setTableDataList = _useMountMergeState2[1];

  /**
   * 表格的加載狀態
   */
  var _useMountMergeState3 = (0, _proUtils.useMountMergeState)(false, {
      value: _typeof(options === null || options === void 0 ? void 0 : options.loading) === 'object' ? options === null || options === void 0 || (_options$loading = options.loading) === null || _options$loading === void 0 ? void 0 : _options$loading.spinning : options === null || options === void 0 ? void 0 : options.loading,
      onChange: options === null || options === void 0 ? void 0 : options.onLoadingChange
    }),
    _useMountMergeState4 = _slicedToArray(_useMountMergeState3, 2),
    tableLoading = _useMountMergeState4[0],
    setTableLoading = _useMountMergeState4[1];

  /**
   * 表示頁面資訊的類型  useMountMergeState 鉤子的初始值和參數
   * @typedef {object} PageInfo
   * @property {number} current 當前頁碼
   * @property {number} pageSize 頁面大小
   * @property {number} total 數據總量
   * @type {[PageInfo, React.Dispatch<React.SetStateAction<PageInfo>>]}
   */
  var _useMountMergeState5 = (0, _proUtils.useMountMergeState)(function () {
      return mergeOptionAndPageInfo(options);
    }, {
      onChange: options === null || options === void 0 ? void 0 : options.onPageInfoChange
    }),
    _useMountMergeState6 = _slicedToArray(_useMountMergeState5, 2),
    pageInfo = _useMountMergeState6[0],
    setPageInfoState = _useMountMergeState6[1];

  /**
   * 用於比較並設置頁面資訊和回呼函數的引用更新
   * @type {React.MutableRefObject<(changePageInfo: PageInfo) => void>}
   */
  var _setPageInfo = (0, _proUtils.useRefFunction)(function (changePageInfo) {
    if (changePageInfo.current !== pageInfo.current || changePageInfo.pageSize !== pageInfo.pageSize || changePageInfo.total !== pageInfo.total) {
      setPageInfoState(changePageInfo);
    }
  });
  var _useMountMergeState7 = (0, _proUtils.useMountMergeState)(false),
    _useMountMergeState8 = _slicedToArray(_useMountMergeState7, 2),
    pollingLoading = _useMountMergeState8[0],
    setPollingLoading = _useMountMergeState8[1];
  var setDataAndLoading = function setDataAndLoading(newData, dataTotal) {
    (0, _reactDom.unstable_batchedUpdates)(function () {
      setTableDataList(newData);
      if ((pageInfo === null || pageInfo === void 0 ? void 0 : pageInfo.total) !== dataTotal) {
        _setPageInfo(_objectSpread(_objectSpread({}, pageInfo), {}, {
          total: dataTotal || newData.length
        }));
      }
    });
  };

  // 上一頁的頁碼
  var prePage = (0, _proUtils.usePrevious)(pageInfo === null || pageInfo === void 0 ? void 0 : pageInfo.current);

  // 上一頁的頁面大小
  var prePageSize = (0, _proUtils.usePrevious)(pageInfo === null || pageInfo === void 0 ? void 0 : pageInfo.pageSize);

  // 上一頁的輪詢時間
  var prePolling = (0, _proUtils.usePrevious)(polling);

  // 不這樣做會導致狀態不更新
  var requestFinally = (0, _proUtils.useRefFunction)(function () {
    (0, _reactDom.unstable_batchedUpdates)(function () {
      setTableLoading(false);
      setPollingLoading(false);
    });
  });
  // 請求數據
  var fetchList = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(isPolling) {
      var _ref4, pageSize, current, pageParams, _ref5, _ref5$data, data, success, _ref5$total, total, rest, responseData;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!manualRequestRef.current) {
              _context.next = 3;
              break;
            }
            manualRequestRef.current = false;
            return _context.abrupt("return");
          case 3:
            if (!isPolling) {
              setTableLoading(true);
            } else {
              setPollingLoading(true);
            }
            _ref4 = pageInfo || {}, pageSize = _ref4.pageSize, current = _ref4.current;
            _context.prev = 5;
            pageParams = (options === null || options === void 0 ? void 0 : options.pageInfo) !== false ? {
              current: current,
              pageSize: pageSize
            } : undefined;
            _context.next = 9;
            return getData === null || getData === void 0 ? void 0 : getData(pageParams);
          case 9:
            _context.t0 = _context.sent;
            if (_context.t0) {
              _context.next = 12;
              break;
            }
            _context.t0 = {};
          case 12:
            _ref5 = _context.t0;
            _ref5$data = _ref5.data;
            data = _ref5$data === void 0 ? [] : _ref5$data;
            success = _ref5.success;
            _ref5$total = _ref5.total;
            total = _ref5$total === void 0 ? 0 : _ref5$total;
            rest = _objectWithoutProperties(_ref5, _excluded);
            if (!(success === false)) {
              _context.next = 21;
              break;
            }
            return _context.abrupt("return", []);
          case 21:
            responseData = (0, _index.postDataPipeline)(data, [options.postData].filter(function (item) {
              return item;
            })); // 設定表格數據
            setDataAndLoading(responseData, total);
            onLoad === null || onLoad === void 0 || onLoad(responseData, rest);
            return _context.abrupt("return", responseData);
          case 27:
            _context.prev = 27;
            _context.t1 = _context["catch"](5);
            if (!(onRequestError === undefined)) {
              _context.next = 31;
              break;
            }
            throw new Error(_context.t1);
          case 31:
            if (tableDataList === undefined) setTableDataList([]);
            onRequestError(_context.t1);
          case 33:
            _context.prev = 33;
            requestFinally();
            return _context.finish(33);
          case 36:
            return _context.abrupt("return", []);
          case 37:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[5, 27, 33, 36]]);
    }));
    return function fetchList(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  /**
   * 該函數用於進行數據請求，可以用於輪詢或單次請求。
   * 通過使用 AbortController 取消之前的請求，避免出現請求堆積。
   * 若需要輪詢，則在一定時間後再次調用該函數，最小時間為 200ms，避免一直处于 loading 狀態。
   * 如果請求被取消，則返回空。
   */
  var fetchListDebounce = (0, _proUtils.useDebounceFn)( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(isPolling) {
      var abort, msg, needPolling;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (pollingSetTimeRef.current) {
              clearTimeout(pollingSetTimeRef.current);
            }
            if (getData) {
              _context2.next = 3;
              break;
            }
            return _context2.abrupt("return");
          case 3:
            abort = new AbortController();
            abortRef.current = abort;
            _context2.prev = 5;
            _context2.next = 8;
            return Promise.race([fetchList(isPolling), new Promise(function (_, reject) {
              var _abortRef$current, _abortRef$current$add;
              (_abortRef$current = abortRef.current) === null || _abortRef$current === void 0 || (_abortRef$current = _abortRef$current.signal) === null || _abortRef$current === void 0 || (_abortRef$current$add = _abortRef$current.addEventListener) === null || _abortRef$current$add === void 0 || _abortRef$current$add.call(_abortRef$current, 'abort', function () {
                reject('aborted');
                // 結束請求，並且清空loading控制
                fetchListDebounce.cancel();
                requestFinally();
              });
            })]);
          case 8:
            msg = _context2.sent;
            if (!abort.signal.aborted) {
              _context2.next = 11;
              break;
            }
            return _context2.abrupt("return");
          case 11:
            // 放到請求前面會導致數據是上一次的
            needPolling = (0, _proUtils.runFunction)(polling, msg);
            /*
             * 這段程式碼是用於控制輪詢的。其中，needPolling 參數表明當前是否需要進行輪詢，umountRef 是一個 ref，用來記錄組件是否被卸載。
             * 如果需要輪詢並且組件沒有被卸載，就會調用 setTimeout，等待一定的時間，然後再次調用 fetchListDebounce 函數，並傳入需要輪詢的時間參數。
             * 其中 Math.max(needPolling, 2000) 用於確定最小的輪詢時間為 2000ms，避免頻繁請求導致一直處於 loading 狀態。
             */
            if (needPolling && !umountRef.current) {
              pollingSetTimeRef.current = setTimeout(function () {
                fetchListDebounce.run(needPolling);
                // 這裡判斷最小要2000ms，不然一直loading
              }, Math.max(needPolling, 2000));
            }
            return _context2.abrupt("return", msg);
          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](5);
            if (!(_context2.t0 === 'aborted')) {
              _context2.next = 20;
              break;
            }
            return _context2.abrupt("return");
          case 20:
            throw _context2.t0;
          case 21:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[5, 16]]);
    }));
    return function (_x2) {
      return _ref6.apply(this, arguments);
    };
  }(), debounceTime || 30);

  /**
   * 取消請求
   */
  var abortFetch = function abortFetch() {
    var _abortRef$current2;
    (_abortRef$current2 = abortRef.current) === null || _abortRef$current2 === void 0 || _abortRef$current2.abort();
    fetchListDebounce.cancel();
    requestFinally();
  };

  // 如果輪詢結束了，直接銷毀計時器
  (0, _react.useEffect)(function () {
    if (!polling) {
      clearTimeout(pollingSetTimeRef.current);
    }
    if (!prePolling && polling) {
      fetchListDebounce.run(true);
    }
    return function () {
      clearTimeout(pollingSetTimeRef.current);
    };
  }, [polling]);
  (0, _react.useEffect)(function () {
    umountRef.current = false;
    return function () {
      umountRef.current = true;
    };
  }, []);

  // PageIndex 改變的時候自動重新加載
  (0, _react.useEffect)(function () {
    var _ref7 = pageInfo || {},
      current = _ref7.current,
      pageSize = _ref7.pageSize;
    // 如果上次的頁碼為空或者兩次頁碼等於是没必要查詢的
    // 如果 pageSize 發生變化是需要查詢的，所以又加了 prePageSize
    if ((!prePage || prePage === current) && (!prePageSize || prePageSize === pageSize)) {
      return;
    }
    if (options.pageInfo && tableDataList && (tableDataList === null || tableDataList === void 0 ? void 0 : tableDataList.length) > pageSize || 0) {
      return;
    }

    // 如果 list 的長度大於 pageSize 的長度
    // 說明是一個假分頁
    // (pageIndex - 1 || 1) 至少要第一頁
    // 在第一頁大於 10
    // 第二頁也應該是大於 10
    if (current !== undefined && tableDataList && tableDataList.length <= pageSize) {
      abortFetch();
      fetchListDebounce.run(false);
    }
  }, [pageInfo === null || pageInfo === void 0 ? void 0 : pageInfo.current]);

  // pageSize 修改後返回第一頁
  (0, _react.useEffect)(function () {
    if (!prePageSize) {
      return;
    }
    abortFetch();
    fetchListDebounce.run(false);
  }, [pageInfo === null || pageInfo === void 0 ? void 0 : pageInfo.pageSize]);

  /**
   * 檢查是否有正在進行的請求需要被中止。如果是，則使用 abortRef 中的方法來中止請求。
   * 接下來，使用名為 fetchListDebounce 的防抖函數並傳入 false 參數。這個函數可以防止請求過於頻繁地發出，通過延遲執行傳遞給它的函數來實現。
   * 最後，檢查是否有正在進行的請求，如果有，則中止它。
   */
  (0, _proUtils.useDeepCompareEffect)(function () {
    abortFetch();
    fetchListDebounce.run(false);
    if (!manual) {
      // 如果 manual 標誌未設定，則將 manualRequestRef 設定為 false。
      // 用於追蹤當前的請求是否是手動發起的。
      manualRequestRef.current = false;
    }
    return function () {
      abortFetch();
    };
  }, [].concat(_toConsumableArray(effects), [manual]));
  return {
    /**
     * 表格的數據列表。
     * @type {DataSource[]}
     */
    dataSource: tableDataList,
    /**
     * 用於設定表格數據列表的 setter 函數。
     * @type {function}
     * @param {DataSource[]} list - 更新後的表格數據列表。
     */
    setDataSource: setTableDataList,
    /**
     * 表示表格是否正在加載數據的標誌。
     * @type {boolean}
     */
    loading: _typeof(options === null || options === void 0 ? void 0 : options.loading) === 'object' ? _objectSpread(_objectSpread({}, options === null || options === void 0 ? void 0 : options.loading), {}, {
      spinning: tableLoading
    }) : tableLoading,
    /**
     * 重新加載表格數據的函數。
     * @type {function}
     * @async
     * @returns {Promise<boolean>} - 數據重新加載完成後解決為 true 的 Promise。
     */
    reload: function () {
      var _reload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              abortFetch();
              return _context3.abrupt("return", fetchListDebounce.run(false));
            case 2:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function reload() {
        return _reload.apply(this, arguments);
      }
      return reload;
    }(),
    /**
     * 當前的分頁資訊。
     * @type {Object}
     * @prop {number} current - 當前頁碼。
     * @prop {number} total - 總數據數量。
     * @prop {number} pageSize - 每頁數據數量。
     */
    pageInfo: pageInfo,
    /**
     *
     * @type {boolean}
     */
    pollingLoading: pollingLoading,
    /**
     * 重置分頁資訊為其初始值的函數。
     * @type {function}
     * @async
     * @returns {Promise<void>} - 重置完成後解決的 Promise。
     */
    reset: function () {
      var _reset = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var _ref8, optionPageInfo, _ref9, _ref9$defaultCurrent, defaultCurrent, _ref9$defaultPageSize, defaultPageSize, initialPageInfo;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _ref8 = options || {}, optionPageInfo = _ref8.pageInfo;
              _ref9 = optionPageInfo || {}, _ref9$defaultCurrent = _ref9.defaultCurrent, defaultCurrent = _ref9$defaultCurrent === void 0 ? 1 : _ref9$defaultCurrent, _ref9$defaultPageSize = _ref9.defaultPageSize, defaultPageSize = _ref9$defaultPageSize === void 0 ? 20 : _ref9$defaultPageSize;
              initialPageInfo = {
                current: defaultCurrent,
                total: 0,
                pageSize: defaultPageSize
              };
              _setPageInfo(initialPageInfo);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function reset() {
        return _reset.apply(this, arguments);
      }
      return reset;
    }(),
    /**
     * 更新分頁資訊的函數。
     * @type {function}
     * @async
     * @param {Object} info - 新的分頁資訊。
     * @prop {number} [current] - 新的當前頁碼。
     * @prop {number} [total] - 新的總數據數量。
     * @prop {number} [pageSize] - 新的每頁數據數量。
     * @returns {Promise<void>} - 更新完成後解決的 Promise。
     */
    setPageInfo: function () {
      var _setPageInfo2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(info) {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _setPageInfo(_objectSpread(_objectSpread({}, pageInfo), info));
            case 1:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function setPageInfo(_x3) {
        return _setPageInfo2.apply(this, arguments);
      }
      return setPageInfo;
    }()
  };
};
var _default = exports.default = useFetchData;