function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["children"];
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { FieldContext, ProForm, ProFormField } from '@ant-design/pro-form';
import { InlineErrorFormItem, getFieldPropsOrFormItemProps, runFunction } from '@ant-design/pro-utils';
import { Form, Tooltip } from 'antd';
import get from "rc-util/es/utils/get";
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var SHOW_EMPTY_TEXT_LIST = ['', null, undefined];

/**
 * 拼接用於編輯的 key
 */
export var spellNamePath = function spellNamePath() {
  for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
    rest[_key] = arguments[_key];
  }
  return rest.filter(function (index) {
    return index !== undefined;
  }).map(function (item) {
    if (typeof item === 'number') {
      return item.toString();
    }
    return item;
  }).flat(1);
};
var CellRenderFromItem = function CellRenderFromItem(props) {
  var formContext = useContext(FieldContext);
  var columnProps = props.columnProps,
    prefixName = props.prefixName,
    text = props.text,
    counter = props.counter,
    rowData = props.rowData,
    index = props.index,
    recordKey = props.recordKey,
    subName = props.subName,
    proFieldProps = props.proFieldProps,
    editableUtils = props.editableUtils;
  var editableForm = ProForm.useFormInstance();
  var key = recordKey || index;
  var realIndex = useMemo(function () {
    var _editableUtils$getRea, _editableUtils$getRea2;
    return (_editableUtils$getRea = editableUtils === null || editableUtils === void 0 || (_editableUtils$getRea2 = editableUtils.getRealIndex) === null || _editableUtils$getRea2 === void 0 ? void 0 : _editableUtils$getRea2.call(editableUtils, rowData)) !== null && _editableUtils$getRea !== void 0 ? _editableUtils$getRea : index;
  }, [editableUtils, index, rowData]);
  var _useState = useState(function () {
      var _ref, _columnProps$key;
      return spellNamePath(prefixName, prefixName ? subName : [], prefixName ? realIndex : key, (_ref = (_columnProps$key = columnProps === null || columnProps === void 0 ? void 0 : columnProps.key) !== null && _columnProps$key !== void 0 ? _columnProps$key : columnProps === null || columnProps === void 0 ? void 0 : columnProps.dataIndex) !== null && _ref !== void 0 ? _ref : index);
    }),
    _useState2 = _slicedToArray(_useState, 2),
    formItemName = _useState2[0],
    setName = _useState2[1];
  var rowName = useMemo(function () {
    return formItemName.slice(0, -1);
  }, [formItemName]);
  useEffect(function () {
    var _ref2, _columnProps$key2;
    var value = spellNamePath(prefixName, prefixName ? subName : [], prefixName ? realIndex : key, (_ref2 = (_columnProps$key2 = columnProps === null || columnProps === void 0 ? void 0 : columnProps.key) !== null && _columnProps$key2 !== void 0 ? _columnProps$key2 : columnProps === null || columnProps === void 0 ? void 0 : columnProps.dataIndex) !== null && _ref2 !== void 0 ? _ref2 : index);
    if (value.join('-') !== formItemName.join('-')) setName(value);
  }, [columnProps === null || columnProps === void 0 ? void 0 : columnProps.dataIndex, columnProps === null || columnProps === void 0 ? void 0 : columnProps.key, index, recordKey, prefixName, key, subName, formItemName, realIndex]);
  var needProps = useMemo(function () {
    return [editableForm, _objectSpread(_objectSpread({}, columnProps), {}, {
      rowKey: rowName,
      rowIndex: index,
      isEditable: true
    })];
  }, [columnProps, editableForm, index, rowName]);
  var InlineItem = useCallback(function (_ref3) {
    var children = _ref3.children,
      restProps = _objectWithoutProperties(_ref3, _excluded);
    return /*#__PURE__*/_jsx(InlineErrorFormItem, _objectSpread(_objectSpread({
      popoverProps: {
        getPopupContainer: formContext.getPopupContainer || function () {
          return counter.rootDomRef.current || document.body;
        }
      },
      errorType: "popover",
      name: formItemName
    }, restProps), {}, {
      children: children
    }), key);
  }, [key, formItemName]);
  var generateFormItem = useCallback(function () {
    var _ref4, _ref5;
    var formItemProps = _objectSpread({}, getFieldPropsOrFormItemProps.apply(void 0, [columnProps === null || columnProps === void 0 ? void 0 : columnProps.formItemProps].concat(_toConsumableArray(needProps))));
    formItemProps.messageVariables = _objectSpread({
      label: (columnProps === null || columnProps === void 0 ? void 0 : columnProps.title) || '此项',
      type: (columnProps === null || columnProps === void 0 ? void 0 : columnProps.valueType) || '文本'
    }, formItemProps === null || formItemProps === void 0 ? void 0 : formItemProps.messageVariables);
    formItemProps.initialValue = (_ref4 = (_ref5 = prefixName ? null : text) !== null && _ref5 !== void 0 ? _ref5 : formItemProps === null || formItemProps === void 0 ? void 0 : formItemProps.initialValue) !== null && _ref4 !== void 0 ? _ref4 : columnProps === null || columnProps === void 0 ? void 0 : columnProps.initialValue;
    var fieldDom = /*#__PURE__*/_jsx(ProFormField, _objectSpread({
      cacheForSwr: true,
      name: formItemName,
      proFormFieldKey: key,
      ignoreFormItem: true,
      fieldProps: getFieldPropsOrFormItemProps.apply(void 0, [columnProps === null || columnProps === void 0 ? void 0 : columnProps.fieldProps].concat(_toConsumableArray(needProps)))
    }, proFieldProps), formItemName.join('-'));
    // 如果沒有自定義直接返回
    if (columnProps !== null && columnProps !== void 0 && columnProps.renderFormItem) {
      fieldDom = columnProps.renderFormItem(_objectSpread(_objectSpread({}, columnProps), {}, {
        index: index,
        isEditable: true,
        type: 'table'
      }), {
        defaultRender: function defaultRender() {
          return /*#__PURE__*/_jsx(_Fragment, {
            children: fieldDom
          });
        },
        type: 'form',
        recordKey: recordKey,
        record: _objectSpread(_objectSpread({}, rowData), editableForm === null || editableForm === void 0 ? void 0 : editableForm.getFieldValue([key])),
        isEditable: true
      }, editableForm, props.editableUtils);
      // 如果需要完全自定義可以不要 name
      if (columnProps.ignoreFormItem) return /*#__PURE__*/_jsx(_Fragment, {
        children: fieldDom
      });
    }
    return /*#__PURE__*/_jsx(InlineItem, _objectSpread(_objectSpread({}, formItemProps), {}, {
      children: fieldDom
    }), formItemName.join('-'));
  }, [columnProps, needProps, prefixName, text, key, formItemName, proFieldProps, InlineItem, index, recordKey, rowData, editableForm, props.editableUtils]);
  if (formItemName.length === 0) return null;
  if (typeof (columnProps === null || columnProps === void 0 ? void 0 : columnProps.renderFormItem) === 'function' || typeof (columnProps === null || columnProps === void 0 ? void 0 : columnProps.fieldProps) === 'function' || typeof (columnProps === null || columnProps === void 0 ? void 0 : columnProps.formItemProps) === 'function') {
    return /*#__PURE__*/_jsx(Form.Item, {
      noStyle: true,
      shouldUpdate: function shouldUpdate(pre, next) {
        if (pre === next) return false;
        var shouldName = [rowName].flat(1);
        try {
          return JSON.stringify(get(pre, shouldName)) !== JSON.stringify(get(next, shouldName));
        } catch (_error) {
          return true;
        }
      },
      children: function children() {
        return generateFormItem();
      }
    });
  }
  return generateFormItem();
};

/**
 * 根據不同的類型來轉化數值
 *
 * @param text
 * @param valueType
 */
function cellRenderToFromItem(config) {
  var _columnProps$dataInde, _config$recordKey;
  var text = config.text,
    valueType = config.valueType,
    rowData = config.rowData,
    columnProps = config.columnProps,
    index = config.index,
    hideColumnToolTip = config.hideColumnToolTip;
  if ((!valueType || ['textarea', 'text'].includes(valueType.toString())) && !(columnProps !== null && columnProps !== void 0 && columnProps.valueEnum) && config.mode === 'read') {
    var className = columnProps !== null && columnProps !== void 0 && columnProps.ellipsis ? 'mli-ellipsis mli-table-item-content' : 'mli-table-item-content';
    if (valueType === 'digit' || valueType === 'money') {
      className += ' mli-table-item-content-number';
    }
    var domtext = SHOW_EMPTY_TEXT_LIST.includes(text) ? config.columnEmptyText : text;
    return hideColumnToolTip ? domtext : /*#__PURE__*/_jsx(Tooltip, {
      title: domtext,
      children: /*#__PURE__*/_jsx("span", {
        className: "".concat(className),
        children: domtext
      })
    });
  }
  if (typeof valueType === 'function' && rowData) {
    // 防止 valueType 是函數, 並且 text 是 ''、null、undefined 跳過顯式設定的 columnEmptyText
    return cellRenderToFromItem(_objectSpread(_objectSpread({}, config), {}, {
      valueType: valueType(rowData, config.type) || 'text'
    }));
  }
  var columnKey = (columnProps === null || columnProps === void 0 ? void 0 : columnProps.key) || (columnProps === null || columnProps === void 0 || (_columnProps$dataInde = columnProps.dataIndex) === null || _columnProps$dataInde === void 0 ? void 0 : _columnProps$dataInde.toString());
  var dependencies = columnProps !== null && columnProps !== void 0 && columnProps.dependencies ? [config.prefixName, config.prefixName ? index === null || index === void 0 ? void 0 : index.toString() : (_config$recordKey = config.recordKey) === null || _config$recordKey === void 0 ? void 0 : _config$recordKey.toString(), columnProps === null || columnProps === void 0 ? void 0 : columnProps.dependencies].filter(Boolean).flat(1) : [];
  /**
   * 產生公用的 proField dom 配置
   */
  var proFieldProps = {
    valueEnum: runFunction(columnProps === null || columnProps === void 0 ? void 0 : columnProps.valueEnum, rowData),
    request: columnProps === null || columnProps === void 0 ? void 0 : columnProps.request,
    dependencies: columnProps !== null && columnProps !== void 0 && columnProps.dependencies ? [dependencies] : undefined,
    originDependencies: columnProps !== null && columnProps !== void 0 && columnProps.dependencies ? [columnProps === null || columnProps === void 0 ? void 0 : columnProps.dependencies] : undefined,
    params: runFunction(columnProps === null || columnProps === void 0 ? void 0 : columnProps.params, rowData, columnProps),
    readonly: columnProps === null || columnProps === void 0 ? void 0 : columnProps.readonly,
    text: valueType === 'index' || valueType === 'indexBorder' ? config.index : text,
    mode: config.mode,
    renderFormItem: undefined,
    valueType: valueType,
    // @ts-ignore
    record: rowData,
    proFieldProps: {
      emptyText: config.columnEmptyText,
      proFieldKey: columnKey ? "table-field-".concat(columnKey) : undefined
    }
  };

  // 讀模式直接返回就好了，不需要處理 formItem
  if (config.mode !== 'edit') {
    return /*#__PURE__*/_jsx(ProFormField, _objectSpread({
      mode: "read",
      ignoreFormItem: true,
      fieldProps: getFieldPropsOrFormItemProps(columnProps === null || columnProps === void 0 ? void 0 : columnProps.fieldProps, null, columnProps)
    }, proFieldProps));
  }
  return /*#__PURE__*/_jsx(CellRenderFromItem, _objectSpread(_objectSpread({}, config), {}, {
    proFieldProps: proFieldProps
  }), config.recordKey);
}
export default cellRenderToFromItem;