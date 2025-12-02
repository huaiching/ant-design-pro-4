"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CellEditorTable = CellEditorTable;
var _react = _interopRequireDefault(require("react"));
var _index = _interopRequireDefault(require("./index"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
function CellEditorTable(props) {
  var _props$columns;
  var _React$useState = _react.default.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    editableKeys = _React$useState2[0],
    setEditableRowKeys = _React$useState2[1];
  var _React$useState3 = _react.default.useState([]),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    dataIndex = _React$useState4[0],
    setDataIndex = _React$useState4[1];
  var rowKey = props.rowKey || 'id';
  var getRowKey = _react.default.useMemo(function () {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return function (record, index) {
      var _ref;
      if (index === -1) {
        return record === null || record === void 0 ? void 0 : record[rowKey];
      }
      // 如果 props 中有 name 的話，用 index 來做行號，這樣方便轉化為index
      if (props.name) {
        return index === null || index === void 0 ? void 0 : index.toString();
      }
      return (_ref = record === null || record === void 0 ? void 0 : record[rowKey]) !== null && _ref !== void 0 ? _ref : index === null || index === void 0 ? void 0 : index.toString();
    };
  }, [props.name, rowKey]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, _objectSpread(_objectSpread({
    bordered: true,
    pagination: false
  }, props), {}, {
    editable: _objectSpread({
      editableKeys: editableKeys
    }, props.editable),
    columns: (props === null || props === void 0 || (_props$columns = props.columns) === null || _props$columns === void 0 ? void 0 : _props$columns.map(function (item) {
      return _objectSpread(_objectSpread({}, item), {}, {
        editable: dataIndex.flat(1).join('.') === [item.dataIndex || item.key].flat(1).join('.') ? undefined : false,
        onCell: function onCell(record, rowIndex) {
          return {
            onDoubleClick: function onDoubleClick() {
              setEditableRowKeys([getRowKey(record, rowIndex)]);
              setDataIndex([item.dataIndex || item.key]);
            },
            onBlur: function onBlur() {
              setEditableRowKeys([]);
            }
          };
        }
      });
    })) || []
  }));
}