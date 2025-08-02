"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _icons = require("@ant-design/icons");
var _antd = require("antd");
var _lodash = require("lodash");
var _react = _interopRequireWildcard(require("react"));
var _reactIntl = require("react-intl");
var _download = require("../../../utils/file/download");
var _transform = require("../../../utils/transform");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["errorMsg", "uploadRequest", "fieldProps", "formItemProps", "columnName", "moduleName", "readonly", "disabled", "asyncUpload", "showDownload", "handleDownload", "handleDelete", "beforeUpload"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var MliFormUpload = function MliFormUpload(props, ref) {
  var defaultProps = (0, _lodash.cloneDeep)(props);
  var errorMsg = defaultProps.errorMsg,
    _defaultProps$uploadR = defaultProps.uploadRequest,
    uploadRequest = _defaultProps$uploadR === void 0 ? function () {
      return Promise.resolve({
        result: true
      });
    } : _defaultProps$uploadR,
    fieldProps = defaultProps.fieldProps,
    _defaultProps$formIte = defaultProps.formItemProps,
    formItemProps = _defaultProps$formIte === void 0 ? {} : _defaultProps$formIte,
    columnName = defaultProps.columnName,
    moduleName = defaultProps.moduleName,
    readonly = defaultProps.readonly,
    disabled = defaultProps.disabled,
    _defaultProps$asyncUp = defaultProps.asyncUpload,
    asyncUpload = _defaultProps$asyncUp === void 0 ? false : _defaultProps$asyncUp,
    _defaultProps$showDow = defaultProps.showDownload,
    showDownload = _defaultProps$showDow === void 0 ? false : _defaultProps$showDow,
    handleDownload = defaultProps.handleDownload,
    handleDelete = defaultProps.handleDelete,
    beforeUpload = defaultProps.beforeUpload,
    restProps = _objectWithoutProperties(defaultProps, _excluded);
  var _useIntl = (0, _reactIntl.useIntl)(),
    formatMessage = _useIntl.formatMessage;
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    fileList = _useState2[0],
    setFileList = _useState2[1];
  var _useState3 = (0, _react.useState)(),
    _useState4 = _slicedToArray(_useState3, 2),
    onlyOneImage = _useState4[0],
    setOnlyOneImage = _useState4[1];
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getFileList: function getFileList() {
        return fileList;
      },
      setFileList: setFileList
    };
  });
  var isPictureCard = (0, _react.useMemo)(function () {
    return (fieldProps === null || fieldProps === void 0 ? void 0 : fieldProps.listType) === 'picture-card';
  }, [fieldProps === null || fieldProps === void 0 ? void 0 : fieldProps.listType]);
  var isDisableOrReadOnly = (0, _react.useMemo)(function () {
    return disabled || readonly;
  }, [disabled, readonly]);
  var isOnlyOne = (0, _react.useMemo)(function () {
    return (fieldProps === null || fieldProps === void 0 ? void 0 : fieldProps.maxCount) === 1;
  }, [fieldProps === null || fieldProps === void 0 ? void 0 : fieldProps.maxCount]);
  (0, _react.useEffect)(function () {
    if (isPictureCard && fileList && fileList.length !== 0) {
      (0, _download.fileRead)(fileList[0]).then(function (res) {
        setOnlyOneImage(res);
      });
    }
  }, [fileList, isPictureCard]);
  var requiredRule = {
    validator: function validator(_rule, value, callback) {
      // 上傳失敗暫定為未填
      if (value && value.length !== 0 && value.filter(function (item) {
        var _item$response;
        return ((_item$response = item.response) === null || _item$response === void 0 ? void 0 : _item$response.result) !== false;
      }).length !== 0) {
        callback();
        return;
      }
      return Promise.reject("".concat(columnName, " is required"));
    },
    validateTrigger: 'onSubmit',
    message: formatMessage({
      id: 'common.select.requiredMessage'
    }, {
      columnName: formatMessage({
        id: "".concat(moduleName, ".columns.").concat(columnName)
      })
    })
  };
  if (defaultProps.required) {
    if (formItemProps.rules) {
      formItemProps.rules.unshift(requiredRule);
    } else {
      formItemProps.rules = [requiredRule];
    }
  }
  var getValueForFile = function getValueForFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e === null || e === void 0 ? void 0 : e.fileList;
  };
  var renderItemDefault = function renderItemDefault(_originNode, file, _files, actions) {
    var _file$response, _file$response2, _file$response3;
    var icon = file.name ? /*#__PURE__*/(0, _jsxRuntime.jsx)("i", {
      className: "iconfont ".concat((0, _transform.getFileIconByName)(file.name))
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.FileOutlined, {});
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_antd.Row, {
        style: {
          width: '100%'
        },
        className: 'mli-upload-file-item-row',
        align: "middle",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Col, {
          className: "file-icon-container",
          children: icon
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Col, {
          flex: '1 1 0',
          className: "mli-ellipsis",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Typography.Text, {
            children: file.name
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_antd.Col, {
          className: "operation-container",
          children: [!isDisableOrReadOnly ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Button, {
            type: "link",
            className: "remove-btn",
            onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return handleDelete === null || handleDelete === void 0 ? void 0 : handleDelete(file);
                  case 2:
                    actions.remove();
                  case 3:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            })),
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("i", {
              className: 'iconfont icon-delete'
            })
          }) : null, showDownload ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Button, {
            type: "link",
            className: "download-icon-btn",
            onClick: function onClick() {
              return handleDownload === null || handleDownload === void 0 ? void 0 : handleDownload(file);
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("i", {
              className: 'iconfont icon-download'
            })
          }) : null]
        })]
      }), file.status === 'done' && !asyncUpload ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Row, {
        gutter: [16, 60],
        style: {
          width: '100%',
          marginTop: 5
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Col, {
          span: 24,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
            children: [formatMessage({
              id: 'component.upload.status'
            }), (_file$response = file.response) !== null && _file$response !== void 0 && _file$response.result ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "success-text",
              style: {
                color: '#88b742'
              },
              children: formatMessage({
                id: 'component.upload.uploadFile.success'
              })
            }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "error-text",
              style: {
                color: '#ff4d4f'
              },
              children: (_file$response2 = file.response) !== null && _file$response2 !== void 0 && _file$response2.errorMsg ? (_file$response3 = file.response) === null || _file$response3 === void 0 ? void 0 : _file$response3.errorMsg : errorMsg ? errorMsg : formatMessage({
                id: 'component.upload.uploadFile.error'
              })
            })]
          })
        })
      }) : null]
    });
  };
  var renderPictureCardButton = (0, _react.useCallback)(function () {
    var btnDom = /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.PlusOutlined, {});
    if ((fieldProps === null || fieldProps === void 0 ? void 0 : fieldProps.maxCount) === 1 && fileList && fileList.length !== 0) {
      btnDom = /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        src: onlyOneImage,
        style: {
          width: '100%',
          height: '100%'
        }
      });
    } else if ((fieldProps === null || fieldProps === void 0 ? void 0 : fieldProps.maxCount) === fileList.length) {
      btnDom = null;
    }
    return btnDom;
  }, [fieldProps === null || fieldProps === void 0 ? void 0 : fieldProps.maxCount, fileList, onlyOneImage]);
  var handleUpload = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(file, onSuccess, onError) {
      var uploadResponse;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return uploadRequest === null || uploadRequest === void 0 ? void 0 : uploadRequest(file);
          case 3:
            uploadResponse = _context2.sent;
            // 處理上傳結果
            file.response = uploadResponse;
            onSuccess(uploadResponse, file);
            _context2.next = 11;
            break;
          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            // 處理上傳結果
            onError(_context2.t0);
          case 11:
            _context2.prev = 11;
            setFileList((fieldProps === null || fieldProps === void 0 ? void 0 : fieldProps.maxCount) === 1 ? [file] : [].concat(_toConsumableArray(fileList), [file]));
            return _context2.finish(11);
          case 14:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 8, 11, 14]]);
    }));
    return function handleUpload(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleBeforeUpload = function handleBeforeUpload(file) {
    var isJpgOrPngOrBmp = file.type === 'image/jpeg' || file.type === 'image/png' || file.type == 'image/bmp';
    var isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJpgOrPngOrBmp || !isLt2M) {
      _antd.message.error(formatMessage({
        id: 'component.upload.invalidFile'
      }));
    }
    return isJpgOrPngOrBmp && isLt2M || _antd.Upload.LIST_IGNORE;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Form.Item, _objectSpread(_objectSpread(_objectSpread({
      style: {
        marginBottom: isPictureCard ? 0 : 24
      },
      name: columnName === null || columnName === void 0 ? void 0 : columnName.split('.'),
      valuePropName: "fileList",
      getValueFromEvent: getValueForFile,
      label: formatMessage({
        id: "".concat(moduleName, ".columns.").concat(columnName)
      })
    }, restProps), formItemProps), {}, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Upload, _objectSpread(_objectSpread({
        beforeUpload: isPictureCard ? handleBeforeUpload : beforeUpload,
        accept: isPictureCard ? 'image/jpeg,image/png,image/bmp' : props.acceptType ? props.acceptType : '*',
        itemRender: isPictureCard ? undefined : renderItemDefault,
        showUploadList: isPictureCard && isOnlyOne ? false : {
          showPreviewIcon: false
        },
        disabled: isDisableOrReadOnly,
        customRequest: ( /*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref3) {
            var file, onSuccess, onError;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  file = _ref3.file, onSuccess = _ref3.onSuccess, onError = _ref3.onError;
                  handleUpload(file, onSuccess, onError);
                case 2:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          }));
          return function (_x4) {
            return _ref4.apply(this, arguments);
          };
        }()),
        onRemove: function onRemove(file) {
          (0, _lodash.remove)(fileList, function (item) {
            return item.uid === file.uid;
          });
          setFileList(_toConsumableArray(fileList));
        }
      }, fieldProps), {}, {
        children: isPictureCard ? renderPictureCardButton() : !readonly ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Button, {
          icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.UploadOutlined, {}),
          disabled: disabled,
          children: formatMessage({
            id: 'component.upload.uploadFile'
          })
        }) : null
      }))
    })), isPictureCard ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        fontSize: 12,
        color: 'grey',
        marginBottom: 24
      },
      children: props.tip || formatMessage({
        id: 'component.upload.imageTips'
      })
    }) : null]
  });
};
var _default = exports.default = /*#__PURE__*/(0, _react.forwardRef)(MliFormUpload);