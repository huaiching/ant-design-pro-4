function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { Col, TreeSelect } from 'antd';
import Form from 'antd/es/form';
import { cloneDeep, isArray, isString, map } from 'lodash';
import * as React from 'react';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { treeDataFlatten } from "../../../utils/transform";
import { jsx as _jsx } from "react/jsx-runtime";
var MliFormTreeSelect = function MliFormTreeSelect(props) {
  var _defaultProps$hidden;
  var _useIntl = useIntl(),
    formatMessage = _useIntl.formatMessage;
  var moduleName = props.moduleName,
    _props$columnName = props.columnName,
    columnName = _props$columnName === void 0 ? '' : _props$columnName,
    colSpan = props.colSpan,
    readonly = props.readonly;
  var defaultProps = cloneDeep(props);
  var formInstance = Form.useFormInstance();
  var columnValue = Form.useWatch(columnName === null || columnName === void 0 ? void 0 : columnName.split('.'), formInstance);
  if (props.required) {
    var requiredRule = {
      required: true,
      message: formatMessage({
        id: 'common.input.requiredMessage'
      }, {
        columnName: formatMessage({
          id: "".concat(moduleName, ".columns.").concat(columnName)
        })
      })
    };
    if (defaultProps.rules) {
      defaultProps.rules.unshift(requiredRule);
    } else {
      defaultProps.rules = [requiredRule];
    }
  }
  var _ref = defaultProps.fieldProps || {},
    treeData = _ref.treeData,
    _ref$fieldNames = _ref.fieldNames,
    fieldNames = _ref$fieldNames === void 0 ? {} : _ref$fieldNames;
  var _fieldNames$label = fieldNames.label,
    label = _fieldNames$label === void 0 ? 'label' : _fieldNames$label;
  var flatTreeData = useMemo(function () {
    return treeDataFlatten(treeData, fieldNames);
  }, [treeData, fieldNames]);
  var readonlyContent = useMemo(function () {
    if (readonly) {
      if (isString(columnValue)) {
        var _flatTreeData$columnV;
        return ((_flatTreeData$columnV = flatTreeData[columnValue]) === null || _flatTreeData$columnV === void 0 ? void 0 : _flatTreeData$columnV[label]) || columnValue;
      } else if (isArray(columnValue)) {
        return map(columnValue || [], function (item) {
          var _flatTreeData$item;
          return ((_flatTreeData$item = flatTreeData[item]) === null || _flatTreeData$item === void 0 ? void 0 : _flatTreeData$item[label]) || item;
        }).join(',');
      }
    }
  }, [columnValue, flatTreeData, label, readonly]);
  return /*#__PURE__*/_jsx(Col, _objectSpread(_objectSpread({
    span: colSpan ? colSpan : 8
  }, defaultProps.colProps), {}, {
    hidden: (_defaultProps$hidden = defaultProps.hidden) !== null && _defaultProps$hidden !== void 0 ? _defaultProps$hidden : false,
    children: /*#__PURE__*/_jsx(Form.Item, _objectSpread(_objectSpread({
      name: columnName === null || columnName === void 0 ? void 0 : columnName.split('.'),
      label: formatMessage({
        id: "".concat(moduleName, ".columns.").concat(columnName)
      })
    }, defaultProps.formItemProps), {}, {
      children: readonly ? /*#__PURE__*/_jsx("div", {
        title: readonlyContent,
        children: readonlyContent
      }) : /*#__PURE__*/_jsx(TreeSelect, _objectSpread(_objectSpread({
        placeholder: formatMessage({
          id: 'common.select.placeholder'
        }, {
          columnName: formatMessage({
            id: "".concat(moduleName, ".columns.").concat(columnName)
          })
        }),
        maxTagCount: "responsive"
      }, defaultProps.fieldProps), {}, {
        children: defaultProps.children
      }))
    }))
  }));
};
export default MliFormTreeSelect;