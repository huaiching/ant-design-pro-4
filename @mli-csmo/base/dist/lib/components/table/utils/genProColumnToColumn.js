"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genProColumnToColumn = genProColumnToColumn;
var _proField = require("@ant-design/pro-field");
var _proUtils = require("@ant-design/pro-utils");
var _antd = require("antd");
var _columnRender = require("./columnRender");
var _index = require("./index");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * 轉換 columns 到 pro 的格式 主要是 render 方法的自行實現
 *
 * @param columns
 * @param map
 * @param columnEmptyText
 */
function genProColumnToColumn(params, parents) {
  var _columns$map;
  var columns = params.columns,
    counter = params.counter,
    columnEmptyText = params.columnEmptyText,
    type = params.type,
    editableUtils = params.editableUtils,
    marginSM = params.marginSM,
    _params$rowKey = params.rowKey,
    rowKey = _params$rowKey === void 0 ? 'id' : _params$rowKey,
    _params$childrenColum = params.childrenColumnName,
    childrenColumnName = _params$childrenColum === void 0 ? 'children' : _params$childrenColum;
  var subNameRecord = new Map();
  return columns === null || columns === void 0 || (_columns$map = columns.map(function (columnProps, columnsIndex) {
    if (columnProps === _antd.Table.EXPAND_COLUMN) return columnProps;
    if (columnProps === _antd.Table.SELECTION_COLUMN) return columnProps;
    var _ref = columnProps,
      key = _ref.key,
      columnName = _ref.columnName,
      dataIndex = _ref.dataIndex,
      valueEnum = _ref.valueEnum,
      _ref$valueType = _ref.valueType,
      valueType = _ref$valueType === void 0 ? 'text' : _ref$valueType,
      children = _ref.children,
      onFilter = _ref.onFilter,
      _ref$filters = _ref.filters,
      filters = _ref$filters === void 0 ? [] : _ref$filters;
    var columnKey = (0, _index.genColumnKey)(key || (dataIndex === null || dataIndex === void 0 ? void 0 : dataIndex.toString()), [parents === null || parents === void 0 ? void 0 : parents.key, columnsIndex].filter(Boolean).join('-'));
    // 這些都沒有，說明是普通的表格不需要 pro 管理
    var noNeedPro = !valueEnum && !valueType && !children;
    if (noNeedPro) {
      return _objectSpread({
        index: columnsIndex
      }, columnProps);
    }

    // 是不是展開行和多選按鈕
    var isExtraColumns = columnProps === _antd.Table.EXPAND_COLUMN || columnProps === _antd.Table.SELECTION_COLUMN;
    if (isExtraColumns) {
      return {
        index: columnsIndex,
        isExtraColumns: true,
        hideInSearch: true,
        hideInTable: false,
        hideInForm: true,
        hideInSetting: true,
        extraColumn: columnProps
      };
    }
    var config = counter.columnsMap[columnKey] || {
      fixed: columnProps.fixed
    };
    var genOnFilter = function genOnFilter() {
      if (onFilter === true) {
        return function (value, row) {
          return (0, _columnRender.defaultOnFilter)(value, row, dataIndex);
        };
      }
      return (0, _proUtils.omitBoolean)(onFilter);
    };
    var keyName = rowKey;
    var tempColumns = _objectSpread(_objectSpread({
      valueType: valueType,
      columnName: columnName,
      index: columnsIndex,
      key: columnKey
    }, columnProps), {}, {
      title: (0, _columnRender.renderColumnsTitle)(columnProps, {
        titleMaskStatus: counter.titleMaskStatus,
        handleMaskStatusChange: counter.switchTitleMaskStatus
      }),
      valueEnum: valueEnum,
      filters: filters === true ? (0, _proField.proFieldParsingValueEnumToArray)((0, _proUtils.runFunction)(valueEnum, undefined)).filter(function (valueItem) {
        return valueItem && valueItem.value !== 'all';
      }) : filters,
      onFilter: genOnFilter(),
      fixed: config.fixed,
      width: columnProps.width || (columnProps.fixed ? 200 : undefined),
      children: columnProps.children ? genProColumnToColumn(_objectSpread(_objectSpread({}, params), {}, {
        columns: (columnProps === null || columnProps === void 0 ? void 0 : columnProps.children) || []
      }), _objectSpread(_objectSpread({}, columnProps), {}, {
        key: columnKey
      })) : undefined,
      render: function render(text, rowData, index) {
        if (typeof rowKey === 'function') {
          keyName = rowKey(rowData, index);
        }
        var uniqueKey;
        if (_typeof(rowData) === 'object' && rowData !== null && Reflect.has(rowData, keyName)) {
          var _childrenColumnName;
          uniqueKey = rowData[keyName];
          var parentInfo = subNameRecord.get(uniqueKey) || [];
          (_childrenColumnName = rowData[childrenColumnName]) === null || _childrenColumnName === void 0 || _childrenColumnName.forEach(function (item) {
            var itemUniqueKey = item[keyName];
            if (!subNameRecord.has(itemUniqueKey)) {
              subNameRecord.set(itemUniqueKey, parentInfo.concat([index, childrenColumnName]));
            }
          });
        }
        var renderProps = {
          columnProps: columnProps,
          text: text,
          rowData: rowData,
          index: index,
          columnEmptyText: columnEmptyText,
          counter: counter,
          type: type,
          marginSM: marginSM,
          subName: subNameRecord.get(uniqueKey),
          editableUtils: editableUtils
        };
        return (0, _columnRender.columnRender)(renderProps);
      }
    });
    return (0, _proUtils.omitUndefinedAndEmptyArr)(tempColumns);
  })) === null || _columns$map === void 0 ? void 0 : _columns$map.filter(function (item) {
    return !item.hideInTable;
  });
}