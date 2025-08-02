function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, message, Modal, Row, Upload } from 'antd';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { read, utils, writeFile } from 'xlsx';
import "./MliExcelUploadModal.less";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var MliExcelUploadModal = function MliExcelUploadModal(_ref) {
  var _response$failedRecor;
  var visible = _ref.visible,
    setVisible = _ref.setVisible,
    fileHeaders = _ref.fileHeaders,
    columnWidths = _ref.columnWidths,
    request = _ref.request,
    failedFileName = _ref.failedFileName,
    modalTitle = _ref.modalTitle,
    modalOnCancel = _ref.modalOnCancel,
    modalOnOk = _ref.modalOnOk,
    topSlot = _ref.topSlot,
    rightSlot = _ref.rightSlot,
    failLabel = _ref.failLabel,
    modalProps = _ref.modalProps,
    _ref$range = _ref.range,
    range = _ref$range === void 0 ? 1 : _ref$range,
    needOnOk = _ref.needOnOk,
    _ref$noFailedReason = _ref.noFailedReason,
    noFailedReason = _ref$noFailedReason === void 0 ? false : _ref$noFailedReason,
    _ref$needImportOrder = _ref.needImportOrder,
    needImportOrder = _ref$needImportOrder === void 0 ? false : _ref$needImportOrder,
    _ref$keepModalOpen = _ref.keepModalOpen,
    keepModalOpen = _ref$keepModalOpen === void 0 ? false : _ref$keepModalOpen,
    extraAddFailedInfo = _ref.extraAddFailedInfo;
  var _useIntl = useIntl(),
    formatMessage = _useIntl.formatMessage;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    uploadFileList = _useState2[0],
    setUploadFileList = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    uploading = _useState4[0],
    setUploading = _useState4[1];
  var _useState5 = useState({}),
    _useState6 = _slicedToArray(_useState5, 2),
    response = _useState6[0],
    setResponse = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    uploaded = _useState8[0],
    setUploaded = _useState8[1];
  // 存入所有數據，包含table中和excel上傳的。目的是組件中需要用（下標+1）和recordNo對比拼接上錯誤消息
  var _useState9 = useState([]),
    _useState10 = _slicedToArray(_useState9, 2),
    excelResult = _useState10[0],
    setExcelResult = _useState10[1];
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    notExcelFile = _useState12[0],
    setNotExcelFile = _useState12[1];
  var uploadProps = {
    iconRender: function iconRender() {
      return /*#__PURE__*/_jsx(UploadOutlined, {});
    },
    onRemove: function onRemove(file) {
      if (file) {
        setUploadFileList([]);
        setUploaded(false);
        setResponse({});
      }
    },
    beforeUpload: function beforeUpload(file) {
      // 判斷後綴名是否為xlsx
      var arr = file.name.split('.');
      if (!['xlsx', 'xls'].includes(arr[arr.length - 1])) {
        setNotExcelFile(true);
        message.warning(formatMessage({
          id: 'common.upload.check.excel'
        }));
        return false;
      }
      setNotExcelFile(false);
      return false;
    },
    onChange: function onChange(_ref2) {
      var fileList = _ref2.fileList;
      setUploadFileList(fileList);
      setUploaded(false);
      setResponse({});
    }
  };

  // 點選匯入按鈕
  var handleParse = function handleParse() {
    setUploading(true);
    // 解析excel資料成json
    var reader = new FileReader();
    reader.readAsArrayBuffer(uploadFileList[0].originFileObj);
    reader.onload = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
        var _e$target;
        var workbook, sheet, sheetJson, result, _loop, i, res, _res;
        return _regeneratorRuntime().wrap(function _callee$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              workbook = read((_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.result);
              sheet = workbook.Sheets[workbook.SheetNames[0]];
              /**
               * fix header
               * range: 1  跳過第一行標題
               * raw: 數據轉成string
               */
              sheetJson = utils.sheet_to_json(sheet, {
                defval: '',
                header: fileHeaders.map(function (item) {
                  return item.label;
                }),
                range: range,
                raw: false
              });
              result = [];
              _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                var row, rowObject;
                return _regeneratorRuntime().wrap(function _loop$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      row = sheetJson[i];
                      rowObject = {};
                      Object.keys(row).forEach(function (item) {
                        var index = findIndex(fileHeaders, function (o) {
                          return o.label === item;
                        });
                        if (index !== -1) {
                          rowObject[fileHeaders[index].key] = row[item];
                        }
                      });
                      result.push(rowObject);
                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }, _loop);
              });
              i = 0;
            case 6:
              if (!(i < sheetJson.length)) {
                _context2.next = 11;
                break;
              }
              return _context2.delegateYield(_loop(), "t0", 8);
            case 8:
              i++;
              _context2.next = 6;
              break;
            case 11:
              setExcelResult(result);

              // 解析后调用校验接口
              res = {};
              _context2.prev = 13;
              _context2.next = 16;
              return request(result);
            case 16:
              res = _context2.sent;
              if (noFailedReason) {
                setExcelResult((_res = res) === null || _res === void 0 ? void 0 : _res.data);
              }
              setUploaded(true);
              setResponse(res);
            case 20:
              _context2.prev = 20;
              setUploading(false);
              return _context2.finish(20);
            case 23:
            case "end":
              return _context2.stop();
          }
        }, _callee, null, [[13,, 20, 23]]);
      }));
      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }();
    reader.onerror = function () {
      setUploading(false);
      message.error(formatMessage({
        id: 'component.upload.failed'
      }));
    };
  };
  var handleDownloadFailedExcel = function handleDownloadFailedExcel() {
    var transformResult = [];
    var headers = _toConsumableArray(fileHeaders);
    var finalResult = [];
    if (!needImportOrder) {
      if (response && response.data && response.data.length > 0) {
        // 這個循環只處理錯誤數據
        response.data.forEach(function (item) {
          var rowObject = {};
          if (item.failedReason) {
            var index = findIndex(excelResult, function (_o, i) {
              return i + 1 === item.recordNo;
            });
            if (index !== -1) {
              var _item$failedReason;
              var failedReason = (_item$failedReason = item.failedReason) === null || _item$failedReason === void 0 ? void 0 : _item$failedReason.split('\n');
              if (failedReason && failedReason.length === 1) {
                var _failedReason;
                failedReason = (_failedReason = failedReason) === null || _failedReason === void 0 ? void 0 : _failedReason.join('\n');
              } else {
                var _failedReason2;
                // 錯誤原因之前加上序號
                failedReason = (_failedReason2 = failedReason) === null || _failedReason2 === void 0 || (_failedReason2 = _failedReason2.map(function (fr, i) {
                  return "".concat(i + 1, ".").concat(fr);
                })) === null || _failedReason2 === void 0 ? void 0 : _failedReason2.join('\n');
              }
              rowObject = _objectSpread(_objectSpread({}, excelResult[index]), {}, {
                failedReason: failedReason
              });
              finalResult.push(rowObject);
            }
          }
        });
        // 將成功的數據也在失敗附件中返回
        var successData = response.data.filter(function (item) {
          return !item.failedReason;
        }).map(function (item) {
          var index = findIndex(excelResult, function (_o, i) {
            return i + 1 === item.recordNo;
          });
          if (index !== -1) {
            return excelResult[index];
          } else {
            return {};
          }
        });
        if (successData.length > 0) {
          // @ts-ignore
          finalResult.push.apply(finalResult, _toConsumableArray(successData));
        }
      }
      if (!noFailedReason) {
        // 頭部標題增加錯誤原因
        headers.push({
          key: 'failedReason',
          label: failLabel ? failLabel : formatMessage({
            id: 'component.upload.fail.reason'
          })
        });
      }
      var _loop2 = function _loop2() {
        var row = finalResult[i];
        var rowObject = {};
        // 把失敗檔的內容對應到表頭
        headers.forEach(function (item) {
          rowObject[item.label] = row[item.key];
        });
        transformResult.push(rowObject);
      };
      for (var i = 0; i < finalResult.length; i++) {
        _loop2();
      }
      extraAddFailedInfo === null || extraAddFailedInfo === void 0 || extraAddFailedInfo(transformResult, fileHeaders);
    } else {
      if (!noFailedReason) {
        // 頭部標題增加錯誤原因
        headers.push({
          key: 'failedReason',
          label: failLabel ? failLabel : formatMessage({
            id: 'component.upload.fail.reason'
          })
        });
      }
      if (response && response.data && response.data.length > 0) {
        var _successData = response.data.map(function (item) {
          var _item$failedReason2;
          var failedReason = (_item$failedReason2 = item.failedReason) === null || _item$failedReason2 === void 0 ? void 0 : _item$failedReason2.split('\n');
          if (failedReason && failedReason.length === 1) {
            var _failedReason3;
            failedReason = (_failedReason3 = failedReason) === null || _failedReason3 === void 0 ? void 0 : _failedReason3.join('\n');
          } else {
            var _failedReason4;
            // 錯誤原因之前加上序號
            failedReason = (_failedReason4 = failedReason) === null || _failedReason4 === void 0 || (_failedReason4 = _failedReason4.map(function (fr, i) {
              return "".concat(i + 1, ".").concat(fr);
            })) === null || _failedReason4 === void 0 ? void 0 : _failedReason4.join('\n');
          }
          return _objectSpread(_objectSpread({}, item), {}, {
            failedReason: failedReason
          });
        });
        if (_successData.length > 0) {
          // @ts-ignore
          finalResult.push.apply(finalResult, _toConsumableArray(_successData));
        }
        var _loop3 = function _loop3() {
          var row = finalResult[_i];
          var rowObject = {};
          // 把失敗檔的內容對應到表頭
          headers.forEach(function (item) {
            rowObject[item.label] = row[item.key];
          });
          transformResult.push(rowObject);
        };
        for (var _i = 0; _i < finalResult.length; _i++) {
          _loop3();
        }
      }
    }
    var worksheet = utils.json_to_sheet(transformResult);
    var workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, formatMessage({
      id: 'component.upload.excel.sheet.name'
    }));
    // 設定列寬
    if (columnWidths && columnWidths.length > 0) {
      worksheet['!cols'] = columnWidths;
    }
    utils.sheet_add_aoa(worksheet, [fileHeaders.map(function (item) {
      return item.label;
    })], {
      origin: 'A1'
    });
    writeFile(workbook, failedFileName + '.xlsx');
  };
  return /*#__PURE__*/_jsxs(Modal, _objectSpread(_objectSpread({
    className: "uploadExcelForm",
    title: modalTitle ? modalTitle : formatMessage({
      id: 'component.upload.modal.default.title'
    }),
    open: visible,
    width: 640,
    onCancel: function onCancel(e) {
      setUploadFileList([]);
      setUploaded(false);
      setResponse({});
      if (modalOnCancel) {
        modalOnCancel(e);
      }
    },
    destroyOnClose: true,
    footer: [/*#__PURE__*/_jsx(Button, {
      onClick: function onClick(e) {
        setUploadFileList([]);
        setUploaded(false);
        setResponse({});
        if (modalOnCancel) {
          modalOnCancel(e);
        }
      },
      children: formatMessage({
        id: 'common.confirm.btn.cancel'
      })
    }, "cancel"), /*#__PURE__*/_jsx(Button, {
      type: "primary",
      disabled: isEmpty(response) || response.successRecords !== response.totalRecords,
      loading: modalProps === null || modalProps === void 0 ? void 0 : modalProps.confirmLoading,
      onClick: function onClick() {
        if (!uploaded) {
          setUploadFileList([]);
          setUploaded(false);
          setResponse({});
          setVisible(false);
        }
        if (uploaded && response.failedRecords && response.failedRecords > 0) {
          setUploadFileList([]);
          setUploaded(false);
          setResponse({});
          setVisible(false);
        }
        if (uploaded && response.successRecords === response.totalRecords && modalOnOk && keepModalOpen) {
          modalOnOk(excelResult, response.data, uploadFileList);
          return;
        }
        if (uploaded && response.successRecords === response.totalRecords && modalOnOk) {
          setUploadFileList([]);
          setUploaded(false);
          setResponse({});
          setVisible(false);
          modalOnOk(excelResult, response.data);
        }
        if (needOnOk) {
          modalOnOk(excelResult, response.data);
        }
      },
      children: formatMessage({
        id: 'component.upload.import'
      })
    }, "ok")]
  }, modalProps), {}, {
    children: [/*#__PURE__*/_jsx(Row, {
      gutter: [16, 60],
      style: {
        width: '100%'
      },
      children: topSlot
    }), /*#__PURE__*/_jsxs(Row, {
      gutter: [16, 60],
      style: {
        width: '100%',
        alignItems: 'center'
      },
      children: [/*#__PURE__*/_jsx(Col, {
        span: 5,
        style: {
          height: '32px'
        },
        children: /*#__PURE__*/_jsx(Upload, _objectSpread(_objectSpread({}, uploadProps), {}, {
          maxCount: 1,
          fileList: uploadFileList,
          showUploadList: true,
          accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
          children: /*#__PURE__*/_jsx(Button, {
            icon: /*#__PURE__*/_jsx(UploadOutlined, {}),
            children: formatMessage({
              id: 'component.upload.selectFile'
            })
          })
        }))
      }), /*#__PURE__*/_jsx(Col, {
        span: 19,
        children: rightSlot
      })]
    }), /*#__PURE__*/_jsx(Row, {
      gutter: [16, 60],
      style: {
        width: '100%'
      },
      children: /*#__PURE__*/_jsx(Col, {
        span: 5,
        offset: 19,
        children: uploadFileList.length !== 0 && /*#__PURE__*/_jsx(Button, {
          type: "primary",
          onClick: handleParse,
          disabled: uploaded || notExcelFile,
          loading: uploading,
          children: formatMessage({
            id: 'component.upload.check'
          })
        })
      })
    }), uploaded && /*#__PURE__*/_jsx(Row, {
      gutter: [16, 60],
      style: {
        width: '100%'
      },
      children: /*#__PURE__*/_jsx(Col, {
        span: 24,
        children: /*#__PURE__*/_jsxs("label", {
          children: [/*#__PURE__*/_jsx("span", {
            style: {
              display: response.failedRecords > 0 ? 'inline' : 'none'
            },
            children: formatMessage({
              id: 'component.upload.failed.result.text'
            }, {
              success: response.successRecords,
              failed: response.failedRecords
            })
          }), /*#__PURE__*/_jsx("span", {
            style: {
              display: response.successRecords === response.totalRecords ? 'inline' : 'none'
            },
            children: formatMessage({
              id: 'component.upload.success.result.text'
            }, {
              success: response.successRecords
            })
          })]
        })
      })
    }), !!((_response$failedRecor = response.failedRecords) !== null && _response$failedRecor !== void 0 ? _response$failedRecor : 0 > 0) && /*#__PURE__*/_jsx(Row, {
      gutter: [16, 60],
      style: {
        width: '100%'
      },
      children: /*#__PURE__*/_jsx(Col, {
        span: 24,
        children: /*#__PURE__*/_jsx(Button, {
          icon: /*#__PURE__*/_jsx(DownloadOutlined, {}),
          onClick: handleDownloadFailedExcel,
          className: "failedDocumentDownload",
          children: formatMessage({
            id: 'component.upload.failedDocumentDownload2'
          })
        })
      })
    })]
  }));
};
export default MliExcelUploadModal;