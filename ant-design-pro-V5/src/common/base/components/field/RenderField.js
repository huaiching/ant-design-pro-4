function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { dependency } from '@ant-design/pro-form/es/components/SchemaForm/valueType/dependency';
import { divider } from '@ant-design/pro-form/es/components/SchemaForm/valueType/divider';
import { formList } from '@ant-design/pro-form/es/components/SchemaForm/valueType/formList';
import { formSet } from '@ant-design/pro-form/es/components/SchemaForm/valueType/formSet';
import { group } from '@ant-design/pro-form/es/components/SchemaForm/valueType/group';
import { ignore } from '@ant-design/pro-form/es/components/SchemaForm/valueType/ignore';
import { runFunction } from '@ant-design/pro-utils';
import FormItem from 'antd/es/form/FormItem';
import React from 'react';
import defaultRenderText from "./Field";
import { jsx as _jsx } from "react/jsx-runtime";
var tasks = [ignore, group, formList, formSet, divider, dependency];
export var renderValueType = function renderValueType(item, helpers, formatMessage) {
  for (var cur = 0; cur < tasks.length; cur++) {
    var task = tasks[cur];
    var dom = task(item, helpers);
    if (dom === true) {
      continue;
    } else {
      return dom;
    }
  }
  var fieldRenderProps = {
    moduleName: item.moduleName,
    columnName: item.columnName,
    valueType: item.valueType,
    fieldProps: item.fieldProps,
    formItemProps: item.getFormItemProps ? item.getFormItemProps() : undefined,
    valueEnum: runFunction(item.valueEnum),
    initialValue: item.initialValue,
    request: item.request,
    options: item.options,
    itemKey: item.proFieldProps.proFieldKey,
    colSize: item.colSize,
    colSpan: item.colSpan,
    collapsed: item.collapsed,
    hidden: item.hidden,
    key: item.key,
    rules: item.rules,
    startColumnName: item.startColumnName,
    endColumnName: item.endColumnName
  };
  var renderCustomizeSearch = function renderCustomizeSearch() {
    var _item$columnName;
    var newDom = item.renderFormItem({
      item: item,
      config: {
        value: item.value,
        type: item.type,
        defaultRender: defaultRenderText
      }
    });
    if ( /*#__PURE__*/React.isValidElement(newDom)) return /*#__PURE__*/_jsx(FormItem, _objectSpread(_objectSpread({
      name: (_item$columnName = item.columnName) === null || _item$columnName === void 0 ? void 0 : _item$columnName.split('.'),
      label: formatMessage({
        id: "".concat(item.moduleName, ".columns.").concat(item.columnName)
      })
    }, item.formItemProps), {}, {
      children: /*#__PURE__*/React.cloneElement(newDom, _objectSpread(_objectSpread({
        placeholder: item.placeholder || formatMessage({
          id: 'common.input.placeholder'
        }, {
          columnName: formatMessage({
            id: "".concat(item.moduleName, ".columns.").concat(item.columnName)
          })
        })
      }, item.fieldProps), newDom.props || {}))
    }), item.key);
    return newDom;
  };
  return item.renderFormItem ? renderCustomizeSearch() : defaultRenderText(item.valueType, fieldRenderProps);
};