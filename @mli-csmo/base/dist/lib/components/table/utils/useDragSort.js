"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDragSort = useDragSort;
var _proUtils = require("@ant-design/pro-utils");
var _core = require("@dnd-kit/core");
var _modifiers = require("@dnd-kit/modifiers");
var _sortable = require("@dnd-kit/sortable");
var _utilities = require("@dnd-kit/utilities");
var _react = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["DragHandle", "dragSortKey"],
  _excluded2 = ["dragSortKey"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SortableItemContextValue = /*#__PURE__*/(0, _react.createContext)({
  handle: null
});

/**
 * 拖曳排序表格的行，
 * 如果有 DragHandle 回給 dragSortKey 所在的行注入 provide 和 handle
 * 如果沒有整個行都支援拖曳
 * @param props
 * @returns
 */
var SortableRow = function SortableRow(props) {
  var _useSortable = (0, _sortable.useSortable)({
      id: props.id
    }),
    attributes = _useSortable.attributes,
    listeners = _useSortable.listeners,
    setNodeRef = _useSortable.setNodeRef,
    transform = _useSortable.transform,
    transition = _useSortable.transition;
  var style = _objectSpread({
    transform: _utilities.CSS.Transform.toString(transform),
    transition: transition
  }, props === null || props === void 0 ? void 0 : props.style);
  var DragHandle = props.DragHandle,
    dragSortKey = props.dragSortKey,
    rest = _objectWithoutProperties(props, _excluded);
  if (dragSortKey) {
    var doms = [];
    _react.default.Children.forEach(rest.children, function (child, index) {
      if (child.key === dragSortKey) {
        var _child$props, _child$props2;
        doms.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(SortableItemContextValue.Provider, {
          value: {
            handle: /*#__PURE__*/(0, _jsxRuntime.jsx)(DragHandle, _objectSpread(_objectSpread({
              rowData: child === null || child === void 0 || (_child$props = child.props) === null || _child$props === void 0 ? void 0 : _child$props.record,
              index: child === null || child === void 0 || (_child$props2 = child.props) === null || _child$props2 === void 0 ? void 0 : _child$props2.index
            }, listeners), attributes))
          },
          children: child
        }, child.key || index));
        return;
      }
      doms.push(child);
    });
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", _objectSpread(_objectSpread({}, rest), {}, {
      ref: setNodeRef,
      style: style,
      children: doms
    }));
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", _objectSpread(_objectSpread(_objectSpread({}, rest), {}, {
    ref: setNodeRef,
    style: style
  }, attributes), listeners));
};

/**
 * 拖曳排序表格的 cell，用與判斷要不要展示 handle
 */
var SortableItemCell = /*#__PURE__*/_react.default.memo(function (props) {
  var dragSortKey = props.dragSortKey,
    rest = _objectWithoutProperties(props, _excluded2);
  var _useContext = (0, _react.useContext)(SortableItemContextValue),
    handle = _useContext.handle;
  if (handle) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("td", _objectSpread(_objectSpread({}, rest), {}, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          display: 'flex',
          alignItems: 'center'
        },
        children: [handle, " ", rest.children]
      })
    }));
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("td", _objectSpread({}, rest));
});
var SortContainer = function SortContainer(p) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", _objectSpread({}, p));
};
function useDragSort(props) {
  var _props$dataSource = props.dataSource,
    dataSource = _props$dataSource === void 0 ? [] : _props$dataSource,
    onDragSortEnd = props.onDragSortEnd,
    DragHandle = props.DragHandle,
    dragSortKey = props.dragSortKey;
  var sensors = (0, _core.useSensors)((0, _core.useSensor)(_core.PointerSensor), (0, _core.useSensor)(_core.MouseSensor));
  var handleDragEnd = (0, _react.useCallback)(function (event) {
    var _over$id;
    var active = event.active,
      over = event.over;
    if (over !== null && over !== void 0 && (_over$id = over.id) !== null && _over$id !== void 0 && _over$id.toString() && active.id !== (over === null || over === void 0 ? void 0 : over.id)) {
      var newData = (0, _sortable.arrayMove)(dataSource || [], parseInt(active.id), parseInt(over.id));
      onDragSortEnd === null || onDragSortEnd === void 0 || onDragSortEnd(parseInt(active.id), parseInt(over.id), newData || []);
    }
  }, [dataSource, onDragSortEnd]);
  var DraggableContainer = (0, _proUtils.useRefFunction)(function (p) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_sortable.SortableContext, {
      items: dataSource.map(function (_, index) {
        return index === null || index === void 0 ? void 0 : index.toString();
      }),
      strategy: _sortable.verticalListSortingStrategy,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SortContainer, _objectSpread({}, p))
    });
  });
  var DraggableBodyRow = (0, _proUtils.useRefFunction)(function (p) {
    var _dataSource$findIndex;
    var restProps = Object.assign({}, (_objectDestructuringEmpty(p), p));
    var index = (_dataSource$findIndex = dataSource.findIndex(function (item) {
      var _props$rowKey;
      return item[(_props$rowKey = props.rowKey) !== null && _props$rowKey !== void 0 ? _props$rowKey : 'index'] === restProps['data-row-key'];
    })) === null || _dataSource$findIndex === void 0 ? void 0 : _dataSource$findIndex.toString();
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(SortableRow, _objectSpread({
      id: index,
      dragSortKey: dragSortKey,
      DragHandle: DragHandle
    }, restProps), index);
  });
  var components = props.components || {};
  if (dragSortKey) {
    var _props$components;
    components.body = _objectSpread({
      wrapper: DraggableContainer,
      row: DraggableBodyRow,
      cell: SortableItemCell
    }, ((_props$components = props.components) === null || _props$components === void 0 ? void 0 : _props$components.body) || {});
  }
  var memoDndContext = (0, _react.useMemo)(function () {
    return function (contextProps) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_core.DndContext, {
        modifiers: [_modifiers.restrictToVerticalAxis],
        sensors: sensors,
        collisionDetection: _core.closestCenter,
        onDragEnd: handleDragEnd,
        children: contextProps.children
      });
    };
  }, [handleDragEnd, sensors]);
  return {
    DndContext: memoDndContext,
    components: components
  };
}