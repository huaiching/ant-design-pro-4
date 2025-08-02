var _excluded = ["rowKey", "tableClassName", "defaultClassName", "action", "tableColumn", "type", "pagination", "rowSelection", "size", "defaultSize", "tableStyle", "toolbarDom", "toolbarAfterDom", "hideToolbar", "searchNode", "style", "cardProps", "alertDom", "name", "onSortChange", "onFilterChange", "options", "isLightFilter", "className", "cardBordered", "editableUtils", "getRowKey"],
  _excluded2 = ["cardBordered", "request", "className", "params", "defaultData", "headerTitle", "postData", "ghost", "pagination", "actionRef", "columns", "toolBarRender", "optionsRender", "onLoad", "onRequestError", "style", "cardProps", "tableStyle", "tableClassName", "columnsStateMap", "onColumnsStateChange", "options", "search", "name", "onLoadingChange", "rowSelection", "beforeSearchSubmit", "tableAlertRender", "defaultClassName", "formRef", "type", "columnEmptyText", "toolbar", "rowKey", "manualRequest", "polling", "tooltip", "revalidateOnFocus", "searchFormRender", "beforeReset", "beforeClean", "beforeSubmit", "onValuesChange", "toolbarAfterRender", "moduleName", "searchParamsTransform", "exportOptions"];
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import "antd/es/table/style";
import ProCard from '@ant-design/pro-card';
import ProForm, { GridContext } from '@ant-design/pro-form';
import { ProConfigProvider, proTheme, useIntl } from '@ant-design/pro-provider';
import { ErrorBoundary, editableRowByKey, omitUndefined, recordKeyToString, stringify, useDeepCompareEffect, useDeepCompareEffectDebounce, useEditableArray, useMountMergeState } from '@ant-design/pro-utils';
import { ConfigProvider, Empty, Table } from 'antd';
import classNames from 'classnames';
import { isEmpty, isEqual } from 'lodash';
import React, { useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useIntl as useReactIntl } from 'react-intl';
import { filterUsefulParams } from "../../";
import { sortToArray } from "../../utils";
import { TABLE_SESSION_KEY } from "../table/utils/clearTableSessionStorage";
import { Container, TableContext } from "./Store/Provide";
import Alert from "./components/Alert";
import FormRender from "./components/Form";
import Toolbar from "./components/ToolBar";
import { useStyle } from "./style";
import useFetchData from "./useFetchData";
import { genColumnKey, isBordered, mergePagination, parseDefaultColumnConfig, useActionType } from "./utils";
import { columnSort } from "./utils/columnSort";
import { genProColumnToColumn } from "./utils/genProColumnToColumn";
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function TableRender(props) {
  var _useReactIntl = useReactIntl(),
    formatMessage = _useReactIntl.formatMessage;
  var rowKey = props.rowKey,
    tableClassName = props.tableClassName,
    defaultClassName = props.defaultClassName,
    action = props.action,
    tableColumns = props.tableColumn,
    type = props.type,
    pagination = props.pagination,
    rowSelection = props.rowSelection,
    size = props.size,
    defaultSize = props.defaultSize,
    tableStyle = props.tableStyle,
    toolbarDom = props.toolbarDom,
    toolbarAfterDom = props.toolbarAfterDom,
    hideToolbar = props.hideToolbar,
    searchNode = props.searchNode,
    style = props.style,
    propsCardProps = props.cardProps,
    alertDom = props.alertDom,
    name = props.name,
    onSortChange = props.onSortChange,
    onFilterChange = props.onFilterChange,
    options = props.options,
    isLightFilter = props.isLightFilter,
    className = props.className,
    cardBordered = props.cardBordered,
    editableUtils = props.editableUtils,
    getRowKey = props.getRowKey,
    rest = _objectWithoutProperties(props, _excluded);
  var counter = useContext(TableContext);
  var columns = useMemo(function () {
    var loopFilter = function loopFilter(column) {
      return column.map(function (item) {
        // 刪掉不應該顯示的
        var columnKey = genColumnKey(item.key, item.index);
        var config = counter.columnsMap[columnKey];
        if (config && config.show === false) {
          return false;
        }
        if (item.children) {
          return _objectSpread(_objectSpread({}, item), {}, {
            children: loopFilter(item.children)
          });
        }
        return item;
      }).filter(Boolean);
    };
    return loopFilter(tableColumns);
  }, [counter.columnsMap, tableColumns]);
  var useLocaleFilter = useMemo(function () {
    var _columns = [];
    // 鋪所有 columns, 用於判斷是用的是本地篩選
    var loopColumns = function loopColumns(data) {
      for (var i = 0; i < data.length; i++) {
        var _curItem = data[i];
        if (_curItem.children) {
          loopColumns(_curItem.children);
        } else {
          _columns.push(_curItem);
        }
      }
    };
    loopColumns(columns);
    return _columns === null || _columns === void 0 ? void 0 : _columns.every(function (column) {
      return !!column.filters && !!column.onFilter || column.filters === undefined && column.onFilter === undefined;
    });
  }, [columns]);

  /**
   * 如果是分頁的新增，總是加到最後一行
   *
   * @returns
   */
  var editableDataSource = function editableDataSource(dataSource) {
    var _ref = editableUtils.newLineRecord || {},
      newLineOptions = _ref.options,
      row = _ref.defaultValue;
    var isNewLineRecordAtTop = (newLineOptions === null || newLineOptions === void 0 ? void 0 : newLineOptions.position) === 'top';
    if (newLineOptions !== null && newLineOptions !== void 0 && newLineOptions.parentKey) {
      var _recordKeyToString, _props$expandable;
      var actionProps = {
        data: dataSource,
        getRowKey: getRowKey,
        row: _objectSpread(_objectSpread({}, row), {}, {
          map_row_parentKey: (_recordKeyToString = recordKeyToString(newLineOptions.parentKey)) === null || _recordKeyToString === void 0 ? void 0 : _recordKeyToString.toString()
        }),
        key: newLineOptions === null || newLineOptions === void 0 ? void 0 : newLineOptions.recordKey,
        childrenColumnName: ((_props$expandable = props.expandable) === null || _props$expandable === void 0 ? void 0 : _props$expandable.childrenColumnName) || 'children'
      };
      return editableRowByKey(actionProps, isNewLineRecordAtTop ? 'top' : 'update');
    }
    if (isNewLineRecordAtTop) {
      return [row].concat(_toConsumableArray(action.dataSource));
    }
    // 如果是分頁的新增，總是加到最後一行
    if (pagination && pagination !== null && pagination !== void 0 && pagination.current && pagination !== null && pagination !== void 0 && pagination.pageSize) {
      var newDataSource = _toConsumableArray(action.dataSource);
      if ((pagination === null || pagination === void 0 ? void 0 : pagination.pageSize) > newDataSource.length) {
        newDataSource.push(row);
        return newDataSource;
      }
      newDataSource.splice((pagination === null || pagination === void 0 ? void 0 : pagination.current) * (pagination === null || pagination === void 0 ? void 0 : pagination.pageSize) - 1, 0, row);
      return newDataSource;
    }
    return [].concat(_toConsumableArray(action.dataSource), [row]);
  };
  var getTableProps = function getTableProps() {
    return _objectSpread(_objectSpread({}, rest), {}, {
      size: size,
      rowSelection: rowSelection === false ? undefined : rowSelection,
      className: tableClassName,
      style: tableStyle,
      columns: columns.map(function (item) {
        return item.isExtraColumns ? item.extraColumn : item;
      }),
      loading: action.loading,
      dataSource: editableUtils.newLineRecord ? editableDataSource(action.dataSource) : action.dataSource,
      pagination: pagination,
      onChange: function onChange(changePagination, filters, sorter, extra) {
        var _rest$onChange;
        (_rest$onChange = rest.onChange) === null || _rest$onChange === void 0 || _rest$onChange.call(rest, changePagination, filters, sorter, extra);
        if (!useLocaleFilter) {
          onFilterChange(omitUndefined(filters));
        }

        // 制造篩選的數據 制造一個排序的數據
        if (Array.isArray(sorter)) {
          var data = sorter.reduce(function (pre, value) {
            return _objectSpread(_objectSpread({}, pre), {}, _defineProperty({}, "".concat(value.field), value.order));
          }, {});
          onSortChange(omitUndefined(data));
        } else {
          var _sorter$column;
          var sorterOfColumn = (_sorter$column = sorter.column) === null || _sorter$column === void 0 ? void 0 : _sorter$column.sorter;
          var isSortByField = (sorterOfColumn === null || sorterOfColumn === void 0 ? void 0 : sorterOfColumn.toString()) === sorterOfColumn;
          onSortChange(omitUndefined(_defineProperty({}, "".concat(isSortByField ? sorterOfColumn : sorter.field), sorter.order)));
        }
      }
    });
  };

  // 是否需要 card 來包裹
  var notNeedCardDom = useMemo(function () {
    if (props.search === false && !props.headerTitle && props.toolBarRender === false) {
      return true;
    }
    return false;
  }, []);

  // 預設的 table dom，如果是編輯模式，外面還要包個 form
  var baseTableDom = /*#__PURE__*/_jsx(GridContext.Provider, {
    value: {
      grid: false,
      colProps: undefined,
      rowProps: undefined
    },
    children: /*#__PURE__*/_jsx(Table, _objectSpread(_objectSpread({}, getTableProps()), {}, {
      rowKey: rowKey
    }))
  });

  // 自訂的 render
  var tableDom = props.tableViewRender ? props.tableViewRender(_objectSpread(_objectSpread({}, getTableProps()), {}, {
    rowSelection: rowSelection !== false ? rowSelection : undefined
  }), baseTableDom) : baseTableDom;

  /**
   * 這段程式碼使用了 useMemo 進行了性能優化，根據 props.editable 和 props.name 的不同情況，渲染不同的頁面元件。
   * 當 props.editable 為 true 並且 props.name 不存在時，渲染一個帶有表單和工具列的頁面元件，否則只渲染工具列和表格元件。
   * renderContent 函數會在 alertDom、props.loading、props.editable、tableDom、toolbarDom 發生變化時重新執行。
   */
  var tableContentDom = useMemo(function () {
    if (props.editable && !props.name) {
      var _props$editable, _props$editable2, _props$editable3;
      return /*#__PURE__*/_jsxs(_Fragment, {
        children: [toolbarDom, toolbarAfterDom, alertDom, /*#__PURE__*/_createElement(ProForm, _objectSpread(_objectSpread({}, (_props$editable = props.editable) === null || _props$editable === void 0 ? void 0 : _props$editable.formProps), {}, {
          formRef: (_props$editable2 = props.editable) === null || _props$editable2 === void 0 || (_props$editable2 = _props$editable2.formProps) === null || _props$editable2 === void 0 ? void 0 : _props$editable2.formRef,
          component: false,
          form: (_props$editable3 = props.editable) === null || _props$editable3 === void 0 ? void 0 : _props$editable3.form,
          onValuesChange: editableUtils.onValuesChange,
          key: "table",
          submitter: false,
          omitNil: false,
          dateFormatter: props.dateFormatter
        }), tableDom)]
      });
    }
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [toolbarDom, toolbarAfterDom, alertDom, tableDom]
    });
  }, [alertDom, props.loading, !!props.editable, tableDom, toolbarDom, toolbarAfterDom]);
  var cardBodyStyle = useMemo(function () {
    if (propsCardProps === false || notNeedCardDom === true || !!props.name) return {};
    var defaultStyle = {
      paddingInline: 0
    };
    if (hideToolbar) {
      return _objectSpread({
        padding: 0
      }, defaultStyle);
    }
    if (toolbarDom) {
      return _objectSpread({
        paddingBlockStart: 0
      }, defaultStyle);
    }
    if (toolbarDom && pagination === false) {
      return _objectSpread({
        paddingBlockStart: 0
      }, defaultStyle);
    }
    return _objectSpread({
      padding: 0
    }, defaultStyle);
  }, [notNeedCardDom, pagination, props.name, propsCardProps, toolbarDom, hideToolbar]);

  // table 區域的 dom，為了方便 render
  var tableAreaDom =
  // cardProps 或者 有了 name 就不需要這個 padding 了，不然會導致不好對齊
  propsCardProps === false || notNeedCardDom === true || !!props.name ? tableContentDom : /*#__PURE__*/_jsx(ProCard, _objectSpread(_objectSpread({
    ghost: props.ghost,
    bordered: isBordered('table', cardBordered),
    style: {
      margin: 0
    },
    bodyStyle: cardBodyStyle
  }, propsCardProps), {}, {
    children: tableContentDom
  }));
  var renderTable = function renderTable() {
    if (props.tableRender) {
      return props.tableRender(props, tableAreaDom, {
        toolbar: toolbarDom || undefined,
        alert: alertDom || undefined,
        table: tableDom || undefined
      });
    }
    return tableAreaDom;
  };
  var proTableDom = /*#__PURE__*/_jsxs("div", {
    className: classNames(className, _defineProperty({}, "".concat(defaultClassName, "-polling"), action.pollingLoading)),
    style: style,
    ref: counter.rootDomRef,
    children: [isLightFilter ? null : searchNode, type !== 'form' && props.tableExtraRender && /*#__PURE__*/_jsx("div", {
      className: classNames(className, "".concat(defaultClassName, "-extra")),
      children: props.tableExtraRender(props, action.dataSource || [])
    }), type !== 'form' && renderTable()]
  });
  var renderEmpty = function renderEmpty() {
    return /*#__PURE__*/_jsx(Empty, {
      image: Empty.PRESENTED_IMAGE_SIMPLE,
      description: formatMessage({
        id: 'component.table.emptyText',
        defaultMessage: '無符合條件的紀錄'
      })
    });
  };
  return /*#__PURE__*/_jsx(ConfigProvider, {
    renderEmpty: renderEmpty,
    getPopupContainer: function getPopupContainer() {
      return counter.rootDomRef.current || document.body;
    },
    children: proTableDom
  });
}
var emptyObj = {};
var ProTable = function ProTable(props) {
  var _MliTable_ManualReqeu, _props$expandable2;
  var cardBordered = props.cardBordered,
    request = props.request,
    propsClassName = props.className,
    _props$params = props.params,
    params = _props$params === void 0 ? emptyObj : _props$params,
    defaultData = props.defaultData,
    headerTitle = props.headerTitle,
    postData = props.postData,
    ghost = props.ghost,
    propsPagination = props.pagination,
    propsActionRef = props.actionRef,
    _props$columns = props.columns,
    propsColumns = _props$columns === void 0 ? [] : _props$columns,
    toolBarRender = props.toolBarRender,
    optionsRender = props.optionsRender,
    onLoad = props.onLoad,
    onRequestError = props.onRequestError,
    style = props.style,
    cardProps = props.cardProps,
    tableStyle = props.tableStyle,
    tableClassName = props.tableClassName,
    columnsStateMap = props.columnsStateMap,
    onColumnsStateChange = props.onColumnsStateChange,
    options = props.options,
    search = props.search,
    isEditorTable = props.name,
    onLoadingChange = props.onLoadingChange,
    _props$rowSelection = props.rowSelection,
    propsRowSelection = _props$rowSelection === void 0 ? false : _props$rowSelection,
    beforeSearchSubmit = props.beforeSearchSubmit,
    tableAlertRender = props.tableAlertRender,
    defaultClassName = props.defaultClassName,
    propRef = props.formRef,
    _props$type = props.type,
    type = _props$type === void 0 ? 'table' : _props$type,
    _props$columnEmptyTex = props.columnEmptyText,
    columnEmptyText = _props$columnEmptyTex === void 0 ? '-' : _props$columnEmptyTex,
    toolbar = props.toolbar,
    rowKey = props.rowKey,
    _props$manualRequest = props.manualRequest,
    manualRequest = _props$manualRequest === void 0 ? typeof MliTable_ManualReqeust === 'undefined' || ((_MliTable_ManualReqeu = MliTable_ManualReqeust) !== null && _MliTable_ManualReqeu !== void 0 ? _MliTable_ManualReqeu : true) : _props$manualRequest,
    polling = props.polling,
    tooltip = props.tooltip,
    _props$revalidateOnFo = props.revalidateOnFocus,
    revalidateOnFocus = _props$revalidateOnFo === void 0 ? false : _props$revalidateOnFo,
    searchFormRender = props.searchFormRender,
    beforeReset = props.beforeReset,
    beforeClean = props.beforeClean,
    beforeSubmit = props.beforeSubmit,
    onValuesChange = props.onValuesChange,
    toolbarAfterRender = props.toolbarAfterRender,
    moduleName = props.moduleName,
    searchParamsTransform = props.searchParamsTransform,
    exportOptions = props.exportOptions,
    rest = _objectWithoutProperties(props, _excluded2);
  var _useStyle = useStyle(props.defaultClassName),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  var className = classNames(defaultClassName, propsClassName, hashId, 'mli-table', "".concat(moduleName, "-table"));

  // 通用的來操作子節點的工具類
  var actionRef = useRef();
  var defaultFormRef = useRef();
  var formRef = propRef || defaultFormRef;
  useImperativeHandle(propsActionRef, function () {
    return actionRef.current;
  });

  // 單選多選的相关邏輯
  var _useMountMergeState = useMountMergeState(propsRowSelection ? (propsRowSelection === null || propsRowSelection === void 0 ? void 0 : propsRowSelection.defaultSelectedRowKeys) || [] : undefined, {
      value: propsRowSelection ? propsRowSelection.selectedRowKeys : undefined
    }),
    _useMountMergeState2 = _slicedToArray(_useMountMergeState, 2),
    selectedRowKeys = _useMountMergeState2[0],
    setSelectedRowKeys = _useMountMergeState2[1];
  var _useMountMergeState3 = useMountMergeState(function () {
      // 如果手動模式，或者 search 不存在的時候設定為 undefined undefined 就不會觸發首次加載
      if (manualRequest || search !== false) {
        return undefined;
      }
      return {};
    }),
    _useMountMergeState4 = _slicedToArray(_useMountMergeState3, 2),
    formSearch = _useMountMergeState4[0],
    setFormSearch = _useMountMergeState4[1];
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    tableColumnFields = _useState2[0],
    setTableColumnFields = _useState2[1];
  var _useMountMergeState5 = useMountMergeState({}),
    _useMountMergeState6 = _slicedToArray(_useMountMergeState5, 2),
    proFilter = _useMountMergeState6[0],
    setProFilter = _useMountMergeState6[1];
  var _useMountMergeState7 = useMountMergeState({}),
    _useMountMergeState8 = _slicedToArray(_useMountMergeState7, 2),
    proSort = _useMountMergeState8[0],
    setProSort = _useMountMergeState8[1];
  var _useState3 = useState(true),
    _useState4 = _slicedToArray(_useState3, 2),
    collapsed = _useState4[0],
    setCollapsed = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    needCollapsed = _useState6[0],
    setNeedCollapsed = _useState6[1];
  useEffect(function () {
    var _parseDefaultColumnCo = parseDefaultColumnConfig(propsColumns),
      sort = _parseDefaultColumnCo.sort,
      filter = _parseDefaultColumnCo.filter;
    setProFilter(filter);
    setProSort(sort);
  }, []);
  var _useReactIntl2 = useReactIntl(),
    formatMessage = _useReactIntl2.formatMessage;
  var intl = useIntl();

  // 需要初始化 不然預設可能會報錯 這裡取了 defaultCurrent 和 current 為了保證不會重複刷新
  var fetchPagination = _typeof(propsPagination) === 'object' ? propsPagination : {
    defaultCurrent: 1,
    defaultPageSize: 10,
    pageSize: 10,
    current: 1
  };
  var counter = useContext(TableContext);
  var fetchData = useMemo(function () {
    if (!request) return undefined;
    return /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(pageParams) {
        var _filterUsefulParams;
        var actionParams, transformParams, response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              actionParams = _objectSpread(_objectSpread(_objectSpread({}, pageParams || {}), formSearch), params);
              delete actionParams._timestamp;
              transformParams = (_filterUsefulParams = filterUsefulParams(searchParamsTransform === null || searchParamsTransform === void 0 ? void 0 : searchParamsTransform(formSearch, sortToArray(proSort)))) !== null && _filterUsefulParams !== void 0 ? _filterUsefulParams : null;
              _context.next = 5;
              return request(actionParams, transformParams, proSort, proFilter);
            case 5:
              response = _context.sent;
              return _context.abrupt("return", response);
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();
  }, [formSearch, params, proFilter, proSort, request]);
  var action = useFetchData(fetchData, defaultData, {
    pageInfo: propsPagination === false ? false : fetchPagination,
    loading: props.loading,
    dataSource: props.dataSource,
    onDataSourceChange: props.onDataSourceChange,
    onLoad: onLoad,
    onLoadingChange: onLoadingChange,
    onRequestError: onRequestError,
    postData: postData,
    revalidateOnFocus: revalidateOnFocus,
    manual: formSearch === undefined,
    polling: polling,
    effects: [stringify(params), stringify(formSearch), stringify(proFilter), stringify(proSort)],
    debounceTime: props.debounceTime,
    onPageInfoChange: function onPageInfoChange(pageInfo) {
      var _propsPagination$onCh, _propsPagination$onSh;
      if (!propsPagination || !fetchData) return;

      // 常總是觸發一下 onChange 和 onShowSizeChange 目前只有 List 和 Table 支援分頁, List 有分頁的時候中斷 Table 的分頁
      propsPagination === null || propsPagination === void 0 || (_propsPagination$onCh = propsPagination.onChange) === null || _propsPagination$onCh === void 0 || _propsPagination$onCh.call(propsPagination, pageInfo.current, pageInfo.pageSize);
      propsPagination === null || propsPagination === void 0 || (_propsPagination$onSh = propsPagination.onShowSizeChange) === null || _propsPagination$onSh === void 0 || _propsPagination$onSh.call(propsPagination, pageInfo.current, pageInfo.pageSize);
    }
  });
  useEffect(function () {
    var _props$form;
    // 手動模式和 request 為空都不生效
    if (manualRequest || !props.request || !revalidateOnFocus || (_props$form = props.form) !== null && _props$form !== void 0 && _props$form.ignoreRules) return;

    /**
     * 焦點時重新請求事件
     */
    var visibilitychange = function visibilitychange() {
      if (document.visibilityState === 'visible') {
        action.reload();
      }
    };
    document.addEventListener('visibilitychange', visibilitychange);
    return function () {
      return document.removeEventListener('visibilitychange', visibilitychange);
    };
  }, []);
  var preserveRecordsRef = React.useRef(new Map());
  var getRowKey = React.useMemo(function () {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return function (record, index) {
      var _ref3;
      if (index === -1) {
        return record === null || record === void 0 ? void 0 : record[rowKey];
      }
      // 如果 props 中有 name 的話，用 index 來做行號，這樣方便轉化為 index
      if (props.name) {
        return index === null || index === void 0 ? void 0 : index.toString();
      }
      return (_ref3 = record === null || record === void 0 ? void 0 : record[rowKey]) !== null && _ref3 !== void 0 ? _ref3 : index === null || index === void 0 ? void 0 : index.toString();
    };
  }, [props.name, rowKey]);
  useMemo(function () {
    var _action$dataSource;
    if ((_action$dataSource = action.dataSource) !== null && _action$dataSource !== void 0 && _action$dataSource.length) {
      var keys = action.dataSource.map(function (data) {
        var dataRowKey = getRowKey(data, -1);
        preserveRecordsRef.current.set(dataRowKey, data);
        return dataRowKey;
      });
      return keys;
    }
    return [];
  }, [action.dataSource, getRowKey]);

  // 頁面編輯的計算
  var pagination = useMemo(function () {
    var newPropsPagination = propsPagination === false ? false : _objectSpread({}, propsPagination);
    var pageConfig = _objectSpread(_objectSpread({}, action.pageInfo), {}, {
      setPageInfo: function setPageInfo(_ref4) {
        var pageSize = _ref4.pageSize,
          current = _ref4.current;
        var pageInfo = action.pageInfo;

        // pageSize 發生改變，並且你不在第一页，切回到第一页，這樣可以防止出現 跳轉到一個空的數據頁的問題
        if (pageSize === pageInfo.pageSize || pageInfo.current === 1) {
          action.setPageInfo({
            pageSize: pageSize,
            current: current
          });
          return;
        }

        // 通過 request 的時候清空數據，然後刷新不然可能會導致 pageSize 沒有數據多
        if (request) action.setDataSource([]);
        action.setPageInfo({
          pageSize: pageSize,
          // 目前只有 List 和 Table 支持分頁，List 有分頁的時候還是使用之前的當前頁碼
          current: type === 'list' ? current : 1
        });
      }
    });
    if (request && newPropsPagination) {
      delete newPropsPagination.onChange;
      delete newPropsPagination.onShowSizeChange;
    }
    return mergePagination(newPropsPagination, pageConfig, intl);
  }, [propsPagination, action, intl]);
  useDeepCompareEffect(function () {
    var _action$pageInfo;
    // request 存在且 params 不為空，且已經請求過數據才需要設置。
    if (props.request && !isEmpty(params) && action.dataSource && !isEqual(action.dataSource, defaultData) && (action === null || action === void 0 || (_action$pageInfo = action.pageInfo) === null || _action$pageInfo === void 0 ? void 0 : _action$pageInfo.current) !== 1) {
      action.setPageInfo({
        current: 1
      });
    }
  }, [params]);

  // 設置 name 到 store 中，裡面用了 ref ，所以不用擔心直接 set
  counter.setPrefixName(props.name);
  var _onCleanSelected = useCallback(function () {
    if (propsRowSelection && propsRowSelection.onChange) {
      propsRowSelection.onChange([], [], {
        type: 'none'
      });
    }
    setSelectedRowKeys([]);
  }, [propsRowSelection, setSelectedRowKeys]);
  counter.propsRef.current = props;
  var editableUtils = useEditableArray(_objectSpread(_objectSpread({}, props.editable), {}, {
    tableName: props.name,
    getRowKey: getRowKey,
    childrenColumnName: ((_props$expandable2 = props.expandable) === null || _props$expandable2 === void 0 ? void 0 : _props$expandable2.childrenColumnName) || 'children',
    dataSource: action.dataSource || [],
    setDataSource: function setDataSource(data) {
      var _props$editable4, _props$editable4$onVa;
      (_props$editable4 = props.editable) === null || _props$editable4 === void 0 || (_props$editable4$onVa = _props$editable4.onValuesChange) === null || _props$editable4$onVa === void 0 || _props$editable4$onVa.call(_props$editable4, undefined, data);
      action.setDataSource(data);
    }
  }));
  var _proTheme$useToken = proTheme.useToken(),
    token = _proTheme$useToken.token;
  var resetSearch = function resetSearch() {
    var _formRef$current, _formRef$current2, _props$beforeReset, _props$onReset;
    var currentValue = formRef === null || formRef === void 0 || (_formRef$current = formRef.current) === null || _formRef$current === void 0 ? void 0 : _formRef$current.getFieldsValue();
    Object.keys(currentValue).forEach(function (key) {
      return currentValue[key] = undefined;
    });
    formRef === null || formRef === void 0 || (_formRef$current2 = formRef.current) === null || _formRef$current2 === void 0 || _formRef$current2.setFieldsValue(currentValue);
    props === null || props === void 0 || (_props$beforeReset = props.beforeReset) === null || _props$beforeReset === void 0 || _props$beforeReset.call(props);
    props === null || props === void 0 || (_props$onReset = props.onReset) === null || _props$onReset === void 0 || _props$onReset.call(props);
    sessionStorage.removeItem("".concat(TABLE_SESSION_KEY, "_").concat(moduleName, "_").concat(location.pathname));
  };
  useActionType(actionRef, action, {
    moduleName: moduleName,
    setSearchFormValues: function setSearchFormValues() {
      var _formRef$current3;
      var values = formRef === null || formRef === void 0 || (_formRef$current3 = formRef.current) === null || _formRef$current3 === void 0 ? void 0 : _formRef$current3.getFieldsValue();
      setFormSearch(omitUndefined(values));
    },
    searchParamsTransform: searchParamsTransform,
    getSearchFormValues: function getSearchFormValues() {
      var _formRef$current4;
      var values = formRef === null || formRef === void 0 || (_formRef$current4 = formRef.current) === null || _formRef$current4 === void 0 ? void 0 : _formRef$current4.getFieldsValue();
      return omitUndefined(values);
    },
    resetForm: function resetForm() {
      var _formRef$current5;
      beforeReset === null || beforeReset === void 0 || beforeReset();
      formRef === null || formRef === void 0 || (_formRef$current5 = formRef.current) === null || _formRef$current5 === void 0 || _formRef$current5.resetFields();
    },
    validForm: function () {
      var _validForm = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _formRef$current7;
        var _formRef$current6;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!beforeSubmit) {
                _context2.next = 3;
                break;
              }
              _context2.next = 3;
              return beforeSubmit === null || beforeSubmit === void 0 ? void 0 : beforeSubmit(formRef === null || formRef === void 0 || (_formRef$current6 = formRef.current) === null || _formRef$current6 === void 0 ? void 0 : _formRef$current6.getFieldsValue());
            case 3:
              return _context2.abrupt("return", formRef === null || formRef === void 0 || (_formRef$current7 = formRef.current) === null || _formRef$current7 === void 0 ? void 0 : _formRef$current7.validateFields());
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function validForm() {
        return _validForm.apply(this, arguments);
      }
      return validForm;
    }(),
    cleanForm: function cleanForm() {
      var _formRef$current8, _formRef$current9;
      beforeClean === null || beforeClean === void 0 || beforeClean();
      var currentValue = formRef === null || formRef === void 0 || (_formRef$current8 = formRef.current) === null || _formRef$current8 === void 0 ? void 0 : _formRef$current8.getFieldsValue();
      Object.keys(currentValue).forEach(function (key) {
        return currentValue[key] = undefined;
      });
      formRef === null || formRef === void 0 || (_formRef$current9 = formRef.current) === null || _formRef$current9 === void 0 || _formRef$current9.setFieldsValue(currentValue);
    },
    resetSearch: resetSearch,
    resetWithOutSort: function resetWithOutSort() {
      // 清空選中行
      _onCleanSelected();
      // 清空篩選
      setProFilter({});
      // 清空 toolbar 搜尋
      counter.setKeyWords(undefined);
      // 重置頁碼
      action.setPageInfo({
        current: 1
      });
      resetSearch();
    },
    resetSearchFormValues: function resetSearchFormValues(values) {
      var _formRef$current10;
      return (_formRef$current10 = formRef.current) === null || _formRef$current10 === void 0 ? void 0 : _formRef$current10.setFieldsValue(values);
    },
    getSorts: function getSorts() {
      return sortToArray(proSort);
    },
    tableColumnFields: tableColumnFields,
    fullScreen: function fullScreen() {
      var _counter$rootDomRef;
      if (!((_counter$rootDomRef = counter.rootDomRef) !== null && _counter$rootDomRef !== void 0 && _counter$rootDomRef.current) || !document.fullscreenEnabled) {
        return;
      }
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        var _counter$rootDomRef2;
        (_counter$rootDomRef2 = counter.rootDomRef) === null || _counter$rootDomRef2 === void 0 || _counter$rootDomRef2.current.requestFullscreen();
      }
    },
    onCleanSelected: function onCleanSelected() {
      // 清空選中行
      _onCleanSelected();
    },
    resetAll: function resetAll() {
      // 清空選中行
      _onCleanSelected();
      // 清空篩選
      setProFilter({});
      // 清空排序
      setProSort({});
      // 清空 toolbar 搜尋
      counter.setKeyWords(undefined);
      // 重置頁碼
      action.setPageInfo({
        current: 1
      });

      // 重置表單
      resetSearch();
    },
    editableUtils: editableUtils
  });
  counter.setAction(actionRef.current);

  // 列計算相關開始
  var tableColumn = useMemo(function () {
    var _props$expandable3;
    propsColumns.forEach(function (column) {
      var _column$title, _column$columnName;
      column.title = (_column$title = column.title) !== null && _column$title !== void 0 ? _column$title : column.columnName ? formatMessage({
        id: "".concat(column.moduleName, ".columns.").concat(column.columnName)
      }) : '';
      column.dataIndex = (_column$columnName = column.columnName) === null || _column$columnName === void 0 ? void 0 : _column$columnName.split('.');
      column.ellipsis = column.ellipsis || true;
    });
    var columns = genProColumnToColumn({
      columns: propsColumns,
      counter: counter,
      columnEmptyText: columnEmptyText,
      type: type,
      marginSM: token.marginSM,
      editableUtils: editableUtils,
      rowKey: rowKey,
      childrenColumnName: (_props$expandable3 = props.expandable) === null || _props$expandable3 === void 0 ? void 0 : _props$expandable3.childrenColumnName
    }).sort(columnSort(counter.columnsMap));
    var columnsFields = columns.map(function (item) {
      var _item$valueType;
      var columnKey = genColumnKey(item.key || item.columnName, item.index);
      var config = counter.columnsMap[columnKey];
      if (config && config.show === false) {
        return false;
      }
      if (['index', 'indexBorder', 'option'].includes((_item$valueType = item.valueType) !== null && _item$valueType !== void 0 ? _item$valueType : '')) {
        return false;
      }
      return item === null || item === void 0 ? void 0 : item.columnName;
    }).filter(Boolean).join(',');
    setTableColumnFields(columnsFields);
    return columns;
  }, [propsColumns, counter === null || counter === void 0 ? void 0 : counter.sortKeyColumns, counter === null || counter === void 0 ? void 0 : counter.columnsMap, counter === null || counter === void 0 ? void 0 : counter.titleMaskStatus, columnEmptyText, type, editableUtils.editableKeys && editableUtils.editableKeys.join(',')]);

  /**
   * Table Column 變化的時候更新一下，這個參數將會用於渲染
   */
  useDeepCompareEffectDebounce(function () {
    if (tableColumn && tableColumn.length > 0) {
      // 重新生成 key 的字串用於排序
      var columnKeys = tableColumn.map(function (item) {
        return genColumnKey(item.key, item.index);
      });
      counter.setSortKeyColumns(columnKeys);
    }
  }, [tableColumn], ['render', 'renderFormItem'], 100);

  /**
   * 同步 Pagination，支持受控的 頁碼 和 pageSize
   */
  useDeepCompareEffect(function () {
    var pageInfo = action.pageInfo;
    var _ref5 = propsPagination || {},
      _ref5$current = _ref5.current,
      current = _ref5$current === void 0 ? pageInfo === null || pageInfo === void 0 ? void 0 : pageInfo.current : _ref5$current,
      _ref5$pageSize = _ref5.pageSize,
      pageSize = _ref5$pageSize === void 0 ? pageInfo === null || pageInfo === void 0 ? void 0 : pageInfo.pageSize : _ref5$pageSize;
    if (propsPagination && (current || pageSize) && (pageSize !== (pageInfo === null || pageInfo === void 0 ? void 0 : pageInfo.pageSize) || current !== (pageInfo === null || pageInfo === void 0 ? void 0 : pageInfo.current))) {
      action.setPageInfo({
        pageSize: pageSize || pageInfo.pageSize,
        current: current || pageInfo.current
      });
    }
  }, [propsPagination && propsPagination.pageSize, propsPagination && propsPagination.current]);

  // 行選擇相關的問題
  var rowSelection = _objectSpread(_objectSpread({
    selectedRowKeys: selectedRowKeys
  }, propsRowSelection), {}, {
    onChange: function onChange(keys, rows, info) {
      if (propsRowSelection && propsRowSelection.onChange) {
        propsRowSelection.onChange(keys, rows, info);
      }
      setSelectedRowKeys(keys);
    }
  });

  // 是不是 LightFilter, LightFilter 有一些特殊的處理
  var isLightFilter = search !== false && (search === null || search === void 0 ? void 0 : search.filterType) === 'light';
  var _onFormSearchSubmit = useCallback(function (values) {
    // 判斷 search.onSearch 返回值決定是否更新 formSearch
    if (options && options.search) {
      var _options$search, _options$search$onSea;
      var _ref6 = options.search === true ? {} : options.search,
        _ref6$name = _ref6.name,
        name = _ref6$name === void 0 ? 'keyword' : _ref6$name;
      // 如果傳入的 onSearch 返回值為 false，則不要把 options.search.name 對應的值 set 到 formSearch
      var success = (_options$search = options.search) === null || _options$search === void 0 || (_options$search$onSea = _options$search.onSearch) === null || _options$search$onSea === void 0 ? void 0 : _options$search$onSea.call(_options$search, counter.keyWords);
      if (success !== false) {
        setFormSearch(_objectSpread(_objectSpread({}, values), {}, _defineProperty({}, name, counter.keyWords)));
        return;
      }
    }
    setFormSearch(values);
  }, [counter.keyWords, options, setFormSearch]);
  var loading = useMemo(function () {
    if (_typeof(action.loading) === 'object') {
      var _action$loading;
      return ((_action$loading = action.loading) === null || _action$loading === void 0 ? void 0 : _action$loading.spinning) || false;
    }
    return action.loading;
  }, [action.loading]);
  var searchNode = useMemo(function () {
    var node = search === false && type !== 'form' ? null : /*#__PURE__*/_jsx(FormRender, {
      pagination: pagination,
      beforeSearchSubmit: beforeSearchSubmit,
      action: actionRef,
      columns: propsColumns,
      onFormSearchSubmit: function onFormSearchSubmit(values) {
        _onFormSearchSubmit(values);
      },
      ghost: ghost,
      onReset: props.onReset,
      onSubmit: props.onSubmit,
      loading: !!loading,
      manualRequest: manualRequest,
      search: search,
      form: props.form,
      formRef: formRef,
      type: props.type || 'table',
      cardBordered: props.cardBordered,
      dateFormatter: props.dateFormatter,
      collapsed: collapsed,
      moduleName: moduleName,
      setNeedCollapsed: setNeedCollapsed
    });
    if (searchFormRender && node) {
      return /*#__PURE__*/_jsx(_Fragment, {
        children: searchFormRender(props, node)
      });
    } else {
      return node;
    }
  }, [beforeSearchSubmit, formRef, ghost, loading, manualRequest, _onFormSearchSubmit, pagination, props, propsColumns, search, searchFormRender, type]);
  var selectedRows = useMemo(function () {
    return selectedRowKeys === null || selectedRowKeys === void 0 ? void 0 : selectedRowKeys.map(function (key) {
      var _preserveRecordsRef$c;
      return (_preserveRecordsRef$c = preserveRecordsRef.current) === null || _preserveRecordsRef$c === void 0 ? void 0 : _preserveRecordsRef$c.get(key);
    });
  }, [action.dataSource, selectedRowKeys]);
  var hideToolbar = useMemo(function () {
    return options === false && !headerTitle && !toolBarRender && !toolbar && !isLightFilter;
  }, [options, headerTitle, toolBarRender, toolbar, isLightFilter]);

  // 內置的工具欄
  var toolbarDom = toolBarRender === false ? null : /*#__PURE__*/_jsx(Toolbar, {
    headerTitle: headerTitle,
    hideToolbar: hideToolbar,
    selectedRows: selectedRows,
    selectedRowKeys: selectedRowKeys,
    tableColumn: tableColumn,
    tooltip: tooltip,
    toolbar: toolbar,
    onFormSearchSubmit: function onFormSearchSubmit(newValues) {
      setFormSearch(_objectSpread(_objectSpread({}, formSearch), newValues));
    },
    hasSearch: search !== false,
    searchNode: isLightFilter ? searchNode : null,
    options: options,
    optionsRender: optionsRender,
    actionRef: actionRef,
    toolBarRender: toolBarRender,
    moduleName: moduleName,
    collapsed: collapsed,
    needCollapsed: needCollapsed,
    setCollapsed: setCollapsed,
    exportOptions: exportOptions
  });

  // 內置的多選操作欄
  var alertDom = propsRowSelection !== false ? /*#__PURE__*/_jsx(Alert, {
    selectedRowKeys: selectedRowKeys,
    selectedRows: selectedRows,
    onCleanSelected: _onCleanSelected,
    alertOptionRender: rest.tableAlertOptionRender,
    alertInfoRender: tableAlertRender,
    alwaysShowAlert: propsRowSelection === null || propsRowSelection === void 0 ? void 0 : propsRowSelection.alwaysShowAlert
  }) : null;
  return wrapSSR( /*#__PURE__*/_jsx(TableRender, _objectSpread(_objectSpread({}, props), {}, {
    name: isEditorTable,
    defaultClassName: defaultClassName,
    size: counter.tableSize,
    onSizeChange: counter.setTableSize,
    pagination: pagination,
    searchNode: searchNode,
    rowSelection: propsRowSelection !== false ? rowSelection : undefined,
    className: className,
    tableColumn: tableColumn,
    isLightFilter: isLightFilter,
    action: action,
    alertDom: alertDom,
    toolbarDom: toolbarDom,
    toolbarAfterDom: toolbarAfterRender,
    hideToolbar: hideToolbar,
    onSortChange: function onSortChange(sortConfig) {
      if (proSort === sortConfig) return;
      setProSort(sortConfig !== null && sortConfig !== void 0 ? sortConfig : {});
    },
    onFilterChange: function onFilterChange(filterConfig) {
      if (filterConfig === proFilter) return;
      setProFilter(filterConfig);
    },
    editableUtils: editableUtils,
    getRowKey: getRowKey
  })));
};
var ProviderTableContainer = function ProviderTableContainer(props) {
  var _useContext = useContext(ConfigProvider.ConfigContext),
    getPrefixCls = _useContext.getPrefixCls;
  var ErrorComponent = props.ErrorBoundary === false ? React.Fragment : props.ErrorBoundary || ErrorBoundary;
  var expandProps = _objectSpread(_objectSpread({}, props), {}, {
    columnsState: _objectSpread(_objectSpread({}, props.columnsState), {}, {
      persistenceKey: "MliTablePersistenceKey_".concat(props.moduleName, "_").concat(location.href),
      persistenceType: 'localStorage'
    })
  });
  return /*#__PURE__*/_jsx(Container, {
    initValue: expandProps,
    children: /*#__PURE__*/_jsx(ProConfigProvider, {
      needDeps: true,
      children: /*#__PURE__*/_jsx(ErrorComponent, {
        children: /*#__PURE__*/_jsx(ProTable, _objectSpread({
          defaultClassName: "".concat(getPrefixCls('pro-table'))
        }, props))
      })
    })
  });
};
ProviderTableContainer.Summary = Table.Summary;
export default ProviderTableContainer;