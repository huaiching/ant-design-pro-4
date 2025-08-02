"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnRender = columnRender;
exports.renderColumnsTitle = exports.defaultOnFilter = void 0;
var _proUtils = require("@ant-design/pro-utils");
var _get = _interopRequireDefault(require("rc-util/lib/utils/get"));
var _react = _interopRequireDefault(require("react"));
var _ = require(".");
var _utils = require("../../../utils");
var _cellRenderToFromItem = _interopRequireDefault(require("./cellRenderToFromItem"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // 轉換列的定義
/**
 * 增加了 icon 的功能 render title
 *
 * @param item
 */
var renderColumnsTitle = exports.renderColumnsTitle = function renderColumnsTitle(item) {
  var _item$ellipsis;
  var titleOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var title = item.title,
    _item$mask = item.mask,
    _item$mask2 = _item$mask === void 0 ? {} : _item$mask,
    titleMaskType = _item$mask2.titleMaskType,
    _item$columnName = item.columnName,
    columnName = _item$columnName === void 0 ? '' : _item$columnName;
  var _titleOption$titleMas = titleOption.titleMaskStatus,
    titleMaskStatus = _titleOption$titleMas === void 0 ? {} : _titleOption$titleMas,
    handleMaskStatusChange = titleOption.handleMaskStatusChange;
  var changeStatus = function changeStatus(e) {
    e.stopPropagation();
    handleMaskStatusChange === null || handleMaskStatusChange === void 0 || handleMaskStatusChange(columnName);
  };
  var ellipsis = typeof (item === null || item === void 0 ? void 0 : item.ellipsis) === 'boolean' ? item === null || item === void 0 ? void 0 : item.ellipsis : item === null || item === void 0 || (_item$ellipsis = item.ellipsis) === null || _item$ellipsis === void 0 ? void 0 : _item$ellipsis.showTitle;
  if (title && typeof title === 'function') {
    return title(item, 'table', /*#__PURE__*/(0, _jsxRuntime.jsx)(_proUtils.LabelIconTip, {
      label: null,
      tooltip: item.tooltip || item.tip
    }));
  } else if (titleMaskType) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_proUtils.LabelIconTip, {
        label: title,
        tooltip: item.tooltip || item.tip,
        ellipsis: item.ellipsis
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "title-mask-container",
        children: titleMaskStatus[columnName] ? /*#__PURE__*/(0, _jsxRuntime.jsx)("i", {
          onClick: changeStatus,
          className: "iconfont icon-preview-close"
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("i", {
          onClick: changeStatus,
          className: "iconfont icon-preview-open-one"
        })
      })]
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_proUtils.LabelIconTip, {
    label: title,
    tooltip: item.tooltip || item.tip,
    ellipsis: ellipsis
  });
};

/**
 * 判斷是否為不可編輯的單元格
 *
 * @param text
 * @param rowData
 * @param index
 * @param editable
 * @returns
 */
function isNotEditableCell(text, rowData, index, editable) {
  if (typeof editable === 'boolean') {
    return editable === false;
  }
  return (editable === null || editable === void 0 ? void 0 : editable(text, rowData, index)) === false;
}

/**
 * 預設的 filter 方法
 *
 * @param value
 * @param record
 * @param dataIndex
 * @returns
 */
var defaultOnFilter = exports.defaultOnFilter = function defaultOnFilter(value, record, dataIndex) {
  var recordElement = Array.isArray(dataIndex) ? (0, _get.default)(record, dataIndex) : record[dataIndex];
  var itemValue = String(recordElement);
  return String(itemValue) === String(value);
};

/**
 * 這個組件負責單元格的具体渲染
 *
 * @param param0
 */
function columnRender(_ref) {
  var columnProps = _ref.columnProps,
    text = _ref.text,
    rowData = _ref.rowData,
    index = _ref.index,
    columnEmptyText = _ref.columnEmptyText,
    counter = _ref.counter,
    type = _ref.type,
    subName = _ref.subName,
    marginSM = _ref.marginSM,
    editableUtils = _ref.editableUtils;
  var action = counter.action,
    prefixName = counter.prefixName;
  var _editableUtils$isEdit = editableUtils.isEditable(_objectSpread(_objectSpread({}, rowData), {}, {
      index: index
    })),
    isEditable = _editableUtils$isEdit.isEditable,
    recordKey = _editableUtils$isEdit.recordKey;
  var renderText = columnProps.renderText,
    _columnProps$columnNa = columnProps.columnName,
    columnName = _columnProps$columnNa === void 0 ? '' : _columnProps$columnNa,
    _columnProps$hideColu = columnProps.hideColumnToolTip,
    hideColumnToolTip = _columnProps$hideColu === void 0 ? false : _columnProps$hideColu,
    _columnProps$mask = columnProps.mask,
    _columnProps$mask2 = _columnProps$mask === void 0 ? {} : _columnProps$mask,
    titleMaskType = _columnProps$mask2.titleMaskType;
  var renderMaskText = function renderMaskText(val) {
    if (renderText) {
      // 如果有renderText先不處理隱碼
      return renderText(text, rowData, index, action);
    }
    if (titleMaskType && counter.titleMaskStatus[columnName]) {
      return (0, _utils.switchData)(val, titleMaskType);
    }
    return val;
  };
  var renderTextStr = renderText ? renderText(text, rowData, index, action) : text;
  var mode = isEditable && !isNotEditableCell(text, rowData, index, columnProps === null || columnProps === void 0 ? void 0 : columnProps.editable) ? 'edit' : 'read';
  var cellRenderParams = {
    valueType: columnProps.valueType || 'text',
    index: index,
    rowData: rowData,
    subName: subName,
    columnProps: _objectSpread(_objectSpread({}, columnProps), {}, {
      // @ts-ignore
      entry: rowData,
      entity: rowData
    }),
    counter: counter,
    columnEmptyText: columnEmptyText,
    type: type,
    recordKey: recordKey,
    mode: mode,
    prefixName: prefixName,
    editableUtils: editableUtils
  };
  var textDom = (0, _cellRenderToFromItem.default)(_objectSpread(_objectSpread({
    text: renderTextStr
  }, cellRenderParams), {}, {
    hideColumnToolTip: true
  }));

  // 如果是編輯模式，並且 renderFormItem 存在直接走 renderFormItem
  if (mode === 'edit') {
    if (columnProps.valueType === 'option') {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: marginSM,
          justifyContent: columnProps.align === 'center' ? 'center' : 'flex-start'
        },
        children: editableUtils.actionRender(_objectSpread(_objectSpread({}, rowData), {}, {
          index: columnProps.index || index
        }))
      });
    }
    return textDom;
  }
  var dom = (0, _proUtils.genCopyable)(textDom, columnProps, renderTextStr);
  if (!columnProps.render) {
    var maskableText = renderMaskText(text);
    var defaultDom = (0, _cellRenderToFromItem.default)(_objectSpread(_objectSpread({
      text: maskableText
    }, cellRenderParams), {}, {
      hideColumnToolTip: hideColumnToolTip
    }));
    var maskDom = (0, _proUtils.genCopyable)(defaultDom, _objectSpread(_objectSpread({}, columnProps), {}, {
      ellipsis: columnProps.copyable ? columnProps.ellipsis : false
    }), maskableText);
    var isReactRenderNode = /*#__PURE__*/_react.default.isValidElement(maskDom) || ['string', 'number'].includes(_typeof(dom));
    return !(0, _proUtils.isNil)(maskDom) && isReactRenderNode ? maskDom : null;
  }
  var renderDom = columnProps.render(dom, rowData, index, _objectSpread(_objectSpread({}, action), editableUtils), _objectSpread(_objectSpread({}, columnProps), {}, {
    isEditable: isEditable,
    type: 'table'
  }));

  // 如果是合併單元格的，直接返回對象
  if ((0, _.isMergeCell)(renderDom)) {
    return renderDom;
  }
  if (renderDom && columnProps.valueType === 'option' && Array.isArray(renderDom)) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8
      },
      children: renderDom
    });
  }
  return renderDom;
}