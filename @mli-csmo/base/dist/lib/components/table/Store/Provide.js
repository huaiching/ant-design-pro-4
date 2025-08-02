"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableContext = exports.Container = void 0;
var _lodash = require("lodash");
var _merge = _interopRequireDefault(require("lodash/merge"));
var _useMergedState5 = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var _warning = require("rc-util/lib/warning");
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../utils");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
function useContainer() {
  var _props$columnsState6, _props$columnsState7, _props$columnsState10, _props$columnsState11, _props$columnsState15, _props$columnsState16;
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var actionRef = (0, _react.useRef)();
  var rootDomRef = (0, _react.useRef)(null);
  // 父 form item 的 name
  var prefixNameRef = (0, _react.useRef)();

  // 自己 props 的引用
  var propsRef = (0, _react.useRef)();

  // 共享狀態比較難，就放到這裡了
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    keyWords = _useState2[0],
    _setKeyWords = _useState2[1];
  // title 隱碼圖標狀態 false-開啓隱碼 true-關閉隱碼
  var _useState3 = (0, _react.useState)({}),
    _useState4 = _slicedToArray(_useState3, 2),
    titleMaskStatus = _useState4[0],
    setTitleMaskStatus = _useState4[1];
  // 用於排序的數組
  var sortKeyColumns = (0, _react.useRef)([]);
  var _useMergedState = (0, _useMergedState5.default)(function () {
      return props.size || props.defaultSize || 'middle';
    }, {
      value: props.size,
      onChange: props.onSizeChange
    }),
    _useMergedState2 = _slicedToArray(_useMergedState, 2),
    tableSize = _useMergedState2[0],
    setTableSize = _useMergedState2[1];

  // 預設全選中
  var defaultColumnKeyMap = (0, _react.useMemo)(function () {
    var _props$columnsState, _props$columns;
    if (props !== null && props !== void 0 && (_props$columnsState = props.columnsState) !== null && _props$columnsState !== void 0 && _props$columnsState.defaultValue) return props.columnsState.defaultValue;
    var columnKeyMap = {};
    (_props$columns = props.columns) === null || _props$columns === void 0 || _props$columns.forEach(
    //@ts-ignore
    function (_ref, index) {
      var _ref2;
      var key = _ref.key,
        dataIndex = _ref.dataIndex,
        fixed = _ref.fixed,
        disable = _ref.disable,
        mask = _ref.mask,
        columnName = _ref.columnName;
      if (mask && columnName && (0, _lodash.isUndefined)(titleMaskStatus[columnName])) {
        titleMaskStatus[columnName] = mask.defaultMaskStatus || false;
      }
      var columnKey = (0, _utils.genColumnKey)((_ref2 = key !== null && key !== void 0 ? key : columnName) !== null && _ref2 !== void 0 ? _ref2 : dataIndex, index);
      if (columnKey) {
        columnKeyMap[columnKey] = {
          show: true,
          fixed: fixed,
          disable: disable
        };
      }
    });
    setTitleMaskStatus(titleMaskStatus);
    return columnKeyMap;
  }, [props.columns]);
  var _useMergedState3 = (0, _useMergedState5.default)(function () {
      var _props$columnsState4, _props$columnsState5;
      var _ref3 = props.columnsState || {},
        persistenceType = _ref3.persistenceType,
        persistenceKey = _ref3.persistenceKey;
      if (persistenceKey && persistenceType && typeof window !== 'undefined') {
        // 從持久化中讀取數據
        var storage = window[persistenceType];
        try {
          var storageValue = storage === null || storage === void 0 ? void 0 : storage.getItem(persistenceKey);
          if (storageValue) {
            var _props$columnsState2;
            if (props !== null && props !== void 0 && (_props$columnsState2 = props.columnsState) !== null && _props$columnsState2 !== void 0 && _props$columnsState2.defaultValue) {
              var _props$columnsState3;
              // 實際生產中，defaultValue往往作為系統方默認配置，則優先級不應高於用戶配置的storageValue
              return (0, _merge.default)({}, props === null || props === void 0 || (_props$columnsState3 = props.columnsState) === null || _props$columnsState3 === void 0 ? void 0 : _props$columnsState3.defaultValue, JSON.parse(storageValue));
            }
            return JSON.parse(storageValue);
          }
        } catch (error) {
          console.warn(error);
        }
      }
      return props.columnsStateMap || ((_props$columnsState4 = props.columnsState) === null || _props$columnsState4 === void 0 ? void 0 : _props$columnsState4.value) || ((_props$columnsState5 = props.columnsState) === null || _props$columnsState5 === void 0 ? void 0 : _props$columnsState5.defaultValue) || defaultColumnKeyMap;
    }, {
      value: ((_props$columnsState6 = props.columnsState) === null || _props$columnsState6 === void 0 ? void 0 : _props$columnsState6.value) || props.columnsStateMap,
      onChange: ((_props$columnsState7 = props.columnsState) === null || _props$columnsState7 === void 0 ? void 0 : _props$columnsState7.onChange) || props.onColumnsStateChange
    }),
    _useMergedState4 = _slicedToArray(_useMergedState3, 2),
    columnsMap = _useMergedState4[0],
    setColumnsMap = _useMergedState4[1];

  // 配置或列更改時對columnsMap重新賦值
  (0, _react.useEffect)(function () {
    var _ref4 = props.columnsState || {},
      persistenceType = _ref4.persistenceType,
      persistenceKey = _ref4.persistenceKey;
    if (persistenceKey && persistenceType && typeof window !== 'undefined') {
      // 從持久化中讀取數據
      var storage = window[persistenceType];
      try {
        var storageValue = storage === null || storage === void 0 ? void 0 : storage.getItem(persistenceKey);
        if (storageValue) {
          var _props$columnsState8;
          if (props !== null && props !== void 0 && (_props$columnsState8 = props.columnsState) !== null && _props$columnsState8 !== void 0 && _props$columnsState8.defaultValue) {
            var _props$columnsState9;
            setColumnsMap((0, _merge.default)({}, props === null || props === void 0 || (_props$columnsState9 = props.columnsState) === null || _props$columnsState9 === void 0 ? void 0 : _props$columnsState9.defaultValue, JSON.parse(storageValue)));
          } else {
            setColumnsMap(JSON.parse(storageValue));
          }
        } else {
          setColumnsMap(defaultColumnKeyMap);
        }
      } catch (error) {
        console.warn(error);
      }
    }
  }, [(_props$columnsState10 = props.columnsState) === null || _props$columnsState10 === void 0 ? void 0 : _props$columnsState10.persistenceKey, (_props$columnsState11 = props.columnsState) === null || _props$columnsState11 === void 0 ? void 0 : _props$columnsState11.persistenceType, defaultColumnKeyMap]);
  (0, _warning.noteOnce)(!props.columnsStateMap, 'columnsStateMap已經廢棄，請使用 columnsState.value 替換');
  (0, _warning.noteOnce)(!props.columnsStateMap, 'columnsStateMap has been discarded, please use columnsState.value replacement');

  // 清空當前的 key
  var clearPersistenceStorage = (0, _react.useCallback)(function () {
    var _ref5 = props.columnsState || {},
      persistenceType = _ref5.persistenceType,
      persistenceKey = _ref5.persistenceKey;
    if (!persistenceKey || !persistenceType || typeof window === 'undefined') return;

    // 給持久化中設定數據
    var storage = window[persistenceType];
    try {
      storage === null || storage === void 0 || storage.removeItem(persistenceKey);
    } catch (error) {
      console.warn(error);
    }
  }, [props.columnsState]);
  (0, _react.useEffect)(function () {
    var _props$columnsState12, _props$columnsState13;
    if (!((_props$columnsState12 = props.columnsState) !== null && _props$columnsState12 !== void 0 && _props$columnsState12.persistenceKey) || !((_props$columnsState13 = props.columnsState) !== null && _props$columnsState13 !== void 0 && _props$columnsState13.persistenceType)) {
      return;
    }
    if (typeof window === 'undefined') return;
    // 給持久化中設定數據
    var _props$columnsState14 = props.columnsState,
      persistenceType = _props$columnsState14.persistenceType,
      persistenceKey = _props$columnsState14.persistenceKey;
    var storage = window[persistenceType];
    try {
      storage === null || storage === void 0 || storage.setItem(persistenceKey, JSON.stringify(columnsMap));
    } catch (error) {
      console.warn(error);
      clearPersistenceStorage();
    }
  }, [(_props$columnsState15 = props.columnsState) === null || _props$columnsState15 === void 0 ? void 0 : _props$columnsState15.persistenceKey, columnsMap, (_props$columnsState16 = props.columnsState) === null || _props$columnsState16 === void 0 ? void 0 : _props$columnsState16.persistenceType]);
  var renderValue = {
    action: actionRef.current,
    setAction: function setAction(newAction) {
      actionRef.current = newAction;
    },
    sortKeyColumns: sortKeyColumns.current,
    setSortKeyColumns: function setSortKeyColumns(keys) {
      sortKeyColumns.current = keys;
    },
    propsRef: propsRef,
    columnsMap: columnsMap,
    keyWords: keyWords,
    setKeyWords: function setKeyWords(k) {
      return _setKeyWords(k);
    },
    titleMaskStatus: titleMaskStatus,
    switchTitleMaskStatus: function switchTitleMaskStatus(columnName) {
      if (columnName) {
        setTitleMaskStatus(_objectSpread(_objectSpread({}, titleMaskStatus), {}, _defineProperty({}, columnName, !titleMaskStatus[columnName])));
      }
    },
    setTableSize: setTableSize,
    tableSize: tableSize,
    prefixName: prefixNameRef.current,
    setPrefixName: function setPrefixName(name) {
      prefixNameRef.current = name;
    },
    setColumnsMap: setColumnsMap,
    columns: props.columns,
    rootDomRef: rootDomRef,
    clearPersistenceStorage: clearPersistenceStorage,
    defaultColumnKeyMap: defaultColumnKeyMap
  };
  Object.defineProperty(renderValue, 'prefixName', {
    get: function get() {
      return prefixNameRef.current;
    }
  });
  Object.defineProperty(renderValue, 'sortKeyColumns', {
    get: function get() {
      return sortKeyColumns.current;
    }
  });
  Object.defineProperty(renderValue, 'action', {
    get: function get() {
      return actionRef.current;
    }
  });
  return renderValue;
}
var TableContext = exports.TableContext = /*#__PURE__*/(0, _react.createContext)({});
var Container = exports.Container = function Container(props) {
  var value = useContainer(props.initValue);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(TableContext.Provider, {
    value: value,
    children: props.children
  });
};