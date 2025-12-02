"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderValueType = void 0;
var _dependency = require("@ant-design/pro-form/lib/components/SchemaForm/valueType/dependency");
var _divider = require("@ant-design/pro-form/lib/components/SchemaForm/valueType/divider");
var _formList = require("@ant-design/pro-form/lib/components/SchemaForm/valueType/formList");
var _formSet = require("@ant-design/pro-form/lib/components/SchemaForm/valueType/formSet");
var _group = require("@ant-design/pro-form/lib/components/SchemaForm/valueType/group");
var _ignore = require("@ant-design/pro-form/lib/components/SchemaForm/valueType/ignore");
var _proUtils = require("@ant-design/pro-utils");
var _FormItem = _interopRequireDefault(require("antd/lib/form/FormItem"));
var _react = _interopRequireDefault(require("react"));
var _Field = _interopRequireDefault(require("./Field"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var tasks = [_ignore.ignore, _group.group, _formList.formList, _formSet.formSet, _divider.divider, _dependency.dependency];
var renderValueType = exports.renderValueType = function renderValueType(item, helpers, formatMessage) {
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
    valueEnum: (0, _proUtils.runFunction)(item.valueEnum),
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
        defaultRender: _Field.default
      }
    });
    if ( /*#__PURE__*/_react.default.isValidElement(newDom)) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormItem.default, _objectSpread(_objectSpread({
      name: (_item$columnName = item.columnName) === null || _item$columnName === void 0 ? void 0 : _item$columnName.split('.'),
      label: formatMessage({
        id: "".concat(item.moduleName, ".columns.").concat(item.columnName)
      })
    }, item.formItemProps), {}, {
      children: /*#__PURE__*/_react.default.cloneElement(newDom, _objectSpread(_objectSpread({
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
  return item.renderFormItem ? renderCustomizeSearch() : (0, _Field.default)(item.valueType, fieldRenderProps);
};