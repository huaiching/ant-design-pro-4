var _excluded = ["onTableChange", "maxLength", "formItemProps", "recordCreatorProps", "rowKey", "controlled", "defaultValue", "onChange", "editableFormRef"],
  _excluded2 = ["record", "position", "creatorButtonText", "newRecordType", "parentKey", "style"];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { PlusOutlined } from '@ant-design/icons';
import ProForm, { ProFormDependency } from '@ant-design/pro-form';
import { useIntl } from '@ant-design/pro-provider';
import { isDeepEqualReact, runFunction, stringify, useRefFunction } from '@ant-design/pro-utils';
import { Button, Form } from 'antd';
import useMergedState from "rc-util/es/hooks/useMergedState";
import get from "rc-util/es/utils/get";
import set from "rc-util/es/utils/set";
import React, { useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import ProTable from "../../Table";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var EditableTableActionContext = /*#__PURE__*/React.createContext(undefined);

/**
 * 可編輯表格的按鈕
 */
function RecordCreator(props) {
  var children = props.children,
    record = props.record,
    position = props.position,
    newRecordType = props.newRecordType,
    parentKey = props.parentKey;
  var actionRef = useContext(EditableTableActionContext);
  return /*#__PURE__*/React.cloneElement(children, _objectSpread(_objectSpread({}, children.props), {}, {
    onClick: function () {
      var _onClick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
        var _children$props$onCli, _children$props, _actionRef$current;
        var isOk;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (_children$props$onCli = (_children$props = children.props).onClick) === null || _children$props$onCli === void 0 ? void 0 : _children$props$onCli.call(_children$props, e);
            case 2:
              isOk = _context.sent;
              if (!(isOk === false)) {
                _context.next = 5;
                break;
              }
              return _context.abrupt("return");
            case 5:
              actionRef === null || actionRef === void 0 || (_actionRef$current = actionRef.current) === null || _actionRef$current === void 0 || _actionRef$current.addEditRecord(record, {
                position: position,
                newRecordType: newRecordType,
                parentKey: parentKey
              });
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function onClick(_x) {
        return _onClick.apply(this, arguments);
      }
      return onClick;
    }()
  }));
}

/**
 * 可以直接放到 Form 中的可編輯表格
 * @param props
 */
function EditableTable(props) {
  var _props$editable2, _props$editable4;
  var intl = useIntl();
  var onTableChange = props.onTableChange,
    maxLength = props.maxLength,
    formItemProps = props.formItemProps,
    recordCreatorProps = props.recordCreatorProps,
    rowKey = props.rowKey,
    controlled = props.controlled,
    defaultValue = props.defaultValue,
    onChange = props.onChange,
    editableFormRef = props.editableFormRef,
    rest = _objectWithoutProperties(props, _excluded);
  var preData = useRef(undefined);
  var actionRef = useRef();
  var formRef = useRef();

  // 設置 ref
  useImperativeHandle(rest.actionRef, function () {
    return actionRef.current;
  }, [actionRef.current]);
  var _useMergedState = useMergedState(function () {
      return props.value || defaultValue || [];
    }, {
      value: props.value,
      onChange: props.onChange
    }),
    _useMergedState2 = _slicedToArray(_useMergedState, 2),
    value = _useMergedState2[0],
    setValue = _useMergedState2[1];
  var getRowKey = React.useMemo(function () {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return function (record, index) {
      return record[rowKey] || index;
    };
  }, [rowKey]);

  /**
   * 根據不同的情況返回不同的 rowKey
   * @param finlayRowKey
   * @returns string | number
   */
  var coverRowKey = useRefFunction(function (finlayRowKey) {
    // 如果是 prop.name 的模式，就需要把行號轉化成具體的rowKey
    if (typeof finlayRowKey === 'number' && !props.name) {
      if (finlayRowKey >= value.length) return finlayRowKey;
      var rowData = value && value[finlayRowKey];
      return getRowKey === null || getRowKey === void 0 ? void 0 : getRowKey(rowData, finlayRowKey);
    }

    // 如果是 prop.name 的模式，就直接返回行號
    if ((typeof finlayRowKey === 'string' || finlayRowKey >= value.length) && props.name) {
      var _rowIndex = value.findIndex(function (item, index) {
        var _getRowKey;
        return (getRowKey === null || getRowKey === void 0 || (_getRowKey = getRowKey(item, index)) === null || _getRowKey === void 0 ? void 0 : _getRowKey.toString()) === (finlayRowKey === null || finlayRowKey === void 0 ? void 0 : finlayRowKey.toString());
      });
      if (_rowIndex !== -1) return _rowIndex;
    }
    return finlayRowKey;
  });

  // 設置 editableFormRef
  useImperativeHandle(editableFormRef, function () {
    /**
     * 獲取一行數據的
     * @param rowIndex
     * @returns T | undefined
     */
    var getRowData = function getRowData(rowIndex) {
      var _finlayRowKey$toStrin, _formRef$current;
      if (rowIndex == undefined) {
        throw new Error('rowIndex is required');
      }
      var finlayRowKey = coverRowKey(rowIndex);
      var rowKeyName = [props.name, (_finlayRowKey$toStrin = finlayRowKey === null || finlayRowKey === void 0 ? void 0 : finlayRowKey.toString()) !== null && _finlayRowKey$toStrin !== void 0 ? _finlayRowKey$toStrin : ''].flat(1).filter(Boolean);
      return (_formRef$current = formRef.current) === null || _formRef$current === void 0 ? void 0 : _formRef$current.getFieldValue(rowKeyName);
    };

    /**
     * 獲取整個 table 的數據
     * @returns T[] | undefined
     */
    var getRowsData = function getRowsData() {
      var _formRef$current3;
      var rowKeyName = [props.name].flat(1).filter(Boolean);
      if (Array.isArray(rowKeyName) && rowKeyName.length === 0) {
        var _formRef$current2;
        var rowData = (_formRef$current2 = formRef.current) === null || _formRef$current2 === void 0 ? void 0 : _formRef$current2.getFieldsValue();
        if (Array.isArray(rowData)) return rowData;
        return Object.keys(rowData).map(function (key) {
          return rowData[key];
        });
      }
      return (_formRef$current3 = formRef.current) === null || _formRef$current3 === void 0 ? void 0 : _formRef$current3.getFieldValue(rowKeyName);
    };
    return _objectSpread(_objectSpread({}, formRef.current), {}, {
      getRowData: getRowData,
      getRowsData: getRowsData,
      /**
       * 設置一行的數據，會將數據進行簡單的 merge
       * @param rowIndex
       * @param data
       * @returns void
       */
      setRowData: function setRowData(rowIndex, data) {
        var _finlayRowKey$toStrin2, _formRef$current4;
        if (rowIndex == undefined) {
          throw new Error('rowIndex is required');
        }
        var finlayRowKey = coverRowKey(rowIndex);
        var rowKeyName = [props.name, (_finlayRowKey$toStrin2 = finlayRowKey === null || finlayRowKey === void 0 ? void 0 : finlayRowKey.toString()) !== null && _finlayRowKey$toStrin2 !== void 0 ? _finlayRowKey$toStrin2 : ''].flat(1).filter(Boolean);
        var newRowData = Object.assign({}, _objectSpread(_objectSpread({}, getRowData(rowIndex)), data || {}));
        var updateValues = set({}, rowKeyName, newRowData);
        (_formRef$current4 = formRef.current) === null || _formRef$current4 === void 0 || _formRef$current4.setFieldsValue(updateValues);
        return true;
      }
    });
  }, [coverRowKey, props.name, formRef.current]);
  useEffect(function () {
    if (!props.controlled) return;
    (value || []).forEach(function (current, index) {
      var _formRef$current5;
      (_formRef$current5 = formRef.current) === null || _formRef$current5 === void 0 || _formRef$current5.setFieldsValue(_defineProperty({}, "".concat(getRowKey(current, index)), current));
    }, {});
  }, [stringify(value), props.controlled]);
  useEffect(function () {
    if (props.name) {
      var _props$editable;
      formRef.current = props === null || props === void 0 || (_props$editable = props.editable) === null || _props$editable === void 0 ? void 0 : _props$editable.form;
    }
  }, [(_props$editable2 = props.editable) === null || _props$editable2 === void 0 ? void 0 : _props$editable2.form, props.name]);
  var _ref = recordCreatorProps || {},
    record = _ref.record,
    position = _ref.position,
    creatorButtonText = _ref.creatorButtonText,
    newRecordType = _ref.newRecordType,
    parentKey = _ref.parentKey,
    style = _ref.style,
    restButtonProps = _objectWithoutProperties(_ref, _excluded2);
  var isTop = position === 'top';
  var creatorButtonDom = useMemo(function () {
    if (typeof maxLength === 'number' && maxLength <= (value === null || value === void 0 ? void 0 : value.length)) {
      return false;
    }
    return recordCreatorProps !== false && /*#__PURE__*/_jsx(RecordCreator, {
      record: runFunction(record, value === null || value === void 0 ? void 0 : value.length, value) || {},
      position: position,
      parentKey: runFunction(parentKey, value === null || value === void 0 ? void 0 : value.length, value),
      newRecordType: newRecordType,
      children: /*#__PURE__*/_jsx(Button, _objectSpread(_objectSpread({
        type: "dashed",
        style: _objectSpread({
          display: 'block',
          margin: '10px 0',
          width: '100%'
        }, style),
        icon: /*#__PURE__*/_jsx(PlusOutlined, {})
      }, restButtonProps), {}, {
        children: creatorButtonText || intl.getMessage('editableTable.action.add', '添加一行數據')
      }))
    });
  }, [recordCreatorProps, maxLength, value === null || value === void 0 ? void 0 : value.length]);
  var buttonRenderProps = useMemo(function () {
    if (!creatorButtonDom) {
      return {};
    }
    if (isTop) {
      return {
        components: {
          header: {
            wrapper: function wrapper(_ref2) {
              var _rest$columns;
              var className = _ref2.className,
                children = _ref2.children;
              return /*#__PURE__*/_jsxs("thead", {
                className: className,
                children: [children, /*#__PURE__*/_jsxs("tr", {
                  style: {
                    position: 'relative'
                  },
                  children: [/*#__PURE__*/_jsx("td", {
                    colSpan: 0,
                    style: {
                      visibility: 'hidden'
                    },
                    children: creatorButtonDom
                  }), /*#__PURE__*/_jsx("td", {
                    style: {
                      position: 'absolute',
                      left: 0,
                      width: '100%'
                    },
                    colSpan: (_rest$columns = rest.columns) === null || _rest$columns === void 0 ? void 0 : _rest$columns.length,
                    children: creatorButtonDom
                  })]
                })]
              });
            }
          }
        }
      };
    }
    return {
      tableViewRender: function tableViewRender(_, dom) {
        var _props$tableViewRende, _props$tableViewRende2;
        return /*#__PURE__*/_jsxs(_Fragment, {
          children: [(_props$tableViewRende = (_props$tableViewRende2 = props.tableViewRender) === null || _props$tableViewRende2 === void 0 ? void 0 : _props$tableViewRende2.call(props, _, dom)) !== null && _props$tableViewRende !== void 0 ? _props$tableViewRende : dom, creatorButtonDom]
        });
      }
    };
  }, [isTop, creatorButtonDom]);
  var editableProps = _objectSpread({}, props.editable);

  /**
   * 防止閉包的onchange
   */
  var newOnValueChange = useRefFunction(function (r, dataSource) {
    var _props$editable3, _props$editable3$onVa, _props$onValuesChange;
    (_props$editable3 = props.editable) === null || _props$editable3 === void 0 || (_props$editable3$onVa = _props$editable3.onValuesChange) === null || _props$editable3$onVa === void 0 || _props$editable3$onVa.call(_props$editable3, r, dataSource);
    (_props$onValuesChange = props.onValuesChange) === null || _props$onValuesChange === void 0 || _props$onValuesChange.call(props, dataSource, r);
    if (props.controlled) {
      var _props$onChange;
      props === null || props === void 0 || (_props$onChange = props.onChange) === null || _props$onChange === void 0 || _props$onChange.call(props, dataSource);
    }
  });
  if (props !== null && props !== void 0 && props.onValuesChange || (_props$editable4 = props.editable) !== null && _props$editable4 !== void 0 && _props$editable4.onValuesChange ||
  // 受控模式需要觸發 onchange
  props.controlled && props !== null && props !== void 0 && props.onChange) {
    editableProps.onValuesChange = newOnValueChange;
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(EditableTableActionContext.Provider, {
      value: actionRef,
      children: /*#__PURE__*/_jsx(ProTable, _objectSpread(_objectSpread(_objectSpread({
        search: false,
        options: false,
        pagination: false,
        rowKey: rowKey,
        revalidateOnFocus: false
      }, rest), buttonRenderProps), {}, {
        tableLayout: "fixed",
        actionRef: actionRef,
        onChange: onTableChange,
        editable: _objectSpread(_objectSpread({}, editableProps), {}, {
          formProps: _objectSpread({
            formRef: formRef
          }, editableProps.formProps)
        }),
        dataSource: value,
        onDataSourceChange: function onDataSourceChange(dataSource) {
          setValue(dataSource);
          //  如果是top，需要重新設置一下 form，不然會導致 id 相同數據混淆
          if (props.name && position === 'top') {
            var _formRef$current6;
            var newValue = set({}, [props.name].flat(1).filter(Boolean), dataSource);
            (_formRef$current6 = formRef.current) === null || _formRef$current6 === void 0 || _formRef$current6.setFieldsValue(newValue);
          }
        }
      }))
    }), props.name ? /*#__PURE__*/_jsx(ProFormDependency, {
      name: [props.name],
      children: function children(changeValue) {
        var _props$editable5, _props$editable5$onVa;
        if (!preData.current) {
          preData.current = value;
          return null;
        }
        var list = get(changeValue, [props.name].flat(1));
        var changeItem = list === null || list === void 0 ? void 0 : list.find(function (item, index) {
          var _preData$current;
          return !isDeepEqualReact(item, (_preData$current = preData.current) === null || _preData$current === void 0 ? void 0 : _preData$current[index]);
        });
        preData.current = value;
        if (!changeItem) return null;
        // 如果不存在 preData 說明是初始化，此時不需要觸發 onValuesChange
        props === null || props === void 0 || (_props$editable5 = props.editable) === null || _props$editable5 === void 0 || (_props$editable5$onVa = _props$editable5.onValuesChange) === null || _props$editable5$onVa === void 0 || _props$editable5$onVa.call(_props$editable5, changeItem, list);
        return null;
      }
    }) : null]
  });
}

/**
 * 可以直接放到 Form 中的可編輯表格
 * A React component that is used to create a table.
 * @param props
 */
function FieldEditableTable(props) {
  var form = ProForm.useFormInstance();
  if (!props.name) return /*#__PURE__*/_jsx(EditableTable, _objectSpread({
    tableLayout: "fixed",
    scroll: {
      x: 'max-content'
    }
  }, props));
  return /*#__PURE__*/_jsx(Form.Item, _objectSpread(_objectSpread({
    style: {
      maxWidth: '100%'
    }
  }, props === null || props === void 0 ? void 0 : props.formItemProps), {}, {
    name: props.name,
    shouldUpdate: function shouldUpdate(prev, next) {
      var name = [props.name].flat(1);
      try {
        return JSON.stringify(get(prev, name)) !== JSON.stringify(get(next, name));
      } catch (_error) {
        return true;
      }
    },
    children: /*#__PURE__*/_jsx(EditableTable, _objectSpread(_objectSpread({
      tableLayout: "fixed",
      scroll: {
        x: 'max-content'
      }
    }, props), {}, {
      editable: _objectSpread(_objectSpread({}, props.editable), {}, {
        form: form
      })
    }))
  }));
}
FieldEditableTable.RecordCreator = RecordCreator;
export default FieldEditableTable;