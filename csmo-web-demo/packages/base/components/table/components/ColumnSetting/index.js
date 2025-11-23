var _excluded = ["key", "dataIndex", "children"],
  _excluded2 = ["disabled"];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { SettingOutlined, VerticalAlignBottomOutlined, VerticalAlignMiddleOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import { ProProvider, useIntl } from '@ant-design/pro-provider';
import { runFunction, useRefFunction } from '@ant-design/pro-utils';
import { Checkbox, ConfigProvider, Popover, Space, Tooltip, Tree, Typography } from 'antd';
import classNames from 'classnames';
import omit from 'omit.js';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { TableContext } from "../../Store/Provide";
import { genColumnKey } from "../../utils/index";
import { useStyle } from "./style";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var ToolTipIcon = function ToolTipIcon(_ref) {
  var title = _ref.title,
    show = _ref.show,
    children = _ref.children,
    columnKey = _ref.columnKey,
    fixed = _ref.fixed;
  var _useContext = useContext(TableContext),
    columnsMap = _useContext.columnsMap,
    setColumnsMap = _useContext.setColumnsMap;
  if (!show) {
    return null;
  }
  return /*#__PURE__*/_jsx(Tooltip, {
    title: title,
    children: /*#__PURE__*/_jsx("span", {
      onClick: function onClick(e) {
        e.stopPropagation();
        e.preventDefault();
        var config = columnsMap[columnKey] || {};
        var columnKeyMap = _objectSpread(_objectSpread({}, columnsMap), {}, _defineProperty({}, columnKey, _objectSpread(_objectSpread({}, config), {}, {
          fixed: fixed
        })));
        setColumnsMap(columnKeyMap);
      },
      children: children
    })
  });
};
var CheckboxListItem = function CheckboxListItem(_ref2) {
  var columnKey = _ref2.columnKey,
    isLeaf = _ref2.isLeaf,
    title = _ref2.title,
    className = _ref2.className,
    fixed = _ref2.fixed,
    showListItemOption = _ref2.showListItemOption;
  var intl = useIntl();
  var _useContext2 = useContext(ProProvider),
    hashId = _useContext2.hashId;
  var dom = /*#__PURE__*/_jsxs("span", {
    className: "".concat(className, "-list-item-option ").concat(hashId).trim(),
    children: [/*#__PURE__*/_jsx(ToolTipIcon, {
      columnKey: columnKey,
      fixed: "left",
      title: intl.getMessage('tableToolBar.leftPin', '固定在列首'),
      show: fixed !== 'left',
      children: /*#__PURE__*/_jsx(VerticalAlignTopOutlined, {})
    }), /*#__PURE__*/_jsx(ToolTipIcon, {
      columnKey: columnKey,
      fixed: undefined,
      title: intl.getMessage('tableToolBar.noPin', '不固定'),
      show: !!fixed,
      children: /*#__PURE__*/_jsx(VerticalAlignMiddleOutlined, {})
    }), /*#__PURE__*/_jsx(ToolTipIcon, {
      columnKey: columnKey,
      fixed: "right",
      title: intl.getMessage('tableToolBar.rightPin', '固定在列尾'),
      show: fixed !== 'right',
      children: /*#__PURE__*/_jsx(VerticalAlignBottomOutlined, {})
    })]
  });
  return /*#__PURE__*/_jsxs("span", {
    className: "".concat(className, "-list-item ").concat(hashId).trim(),
    children: [/*#__PURE__*/_jsx("div", {
      className: "".concat(className, "-list-item-title ").concat(hashId).trim(),
      children: title
    }), showListItemOption && !isLeaf ? dom : null]
  }, columnKey);
};
var CheckboxList = function CheckboxList(_ref3) {
  var _treeDataConfig$list, _treeDataConfig$list2, _treeDataConfig$list3;
  var list = _ref3.list,
    draggable = _ref3.draggable,
    checkable = _ref3.checkable,
    showListItemOption = _ref3.showListItemOption,
    className = _ref3.className,
    _ref3$showTitle = _ref3.showTitle,
    showTitle = _ref3$showTitle === void 0 ? true : _ref3$showTitle,
    listTitle = _ref3.title,
    _ref3$listHeight = _ref3.listHeight,
    listHeight = _ref3$listHeight === void 0 ? 280 : _ref3$listHeight;
  var _useContext3 = useContext(ProProvider),
    hashId = _useContext3.hashId;
  var _useContext4 = useContext(TableContext),
    columnsMap = _useContext4.columnsMap,
    setColumnsMap = _useContext4.setColumnsMap,
    sortKeyColumns = _useContext4.sortKeyColumns,
    setSortKeyColumns = _useContext4.setSortKeyColumns;
  var show = list && list.length > 0;
  var treeDataConfig = useMemo(function () {
    if (!show) return {};
    var checkedKeys = [];
    var treeMap = new Map();
    var loopData = function loopData(data, parentConfig) {
      return data.map(function (_ref4) {
        var _config$disable;
        var key = _ref4.key,
          dataIndex = _ref4.dataIndex,
          children = _ref4.children,
          rest = _objectWithoutProperties(_ref4, _excluded);
        var columnKey = genColumnKey(key, [parentConfig === null || parentConfig === void 0 ? void 0 : parentConfig.columnKey, rest.index].filter(Boolean).join('-'));
        var config = columnsMap[columnKey || 'null'] || {
          show: true
        };
        if (config.show !== false && !children) {
          checkedKeys.push(columnKey);
        }
        var item = _objectSpread(_objectSpread({
          key: columnKey
        }, omit(rest, ['className'])), {}, {
          selectable: false,
          disabled: config.disable === true,
          disableCheckbox: typeof config.disable === 'boolean' ? config.disable : (_config$disable = config.disable) === null || _config$disable === void 0 ? void 0 : _config$disable.checkbox,
          isLeaf: parentConfig ? true : undefined
        });
        if (children) {
          var _item$children;
          item.children = loopData(children, _objectSpread(_objectSpread({}, config), {}, {
            columnKey: columnKey
          }));
          // 如果children 已經全部是show了，把自己也設置為show
          if ((_item$children = item.children) !== null && _item$children !== void 0 && _item$children.every(function (childrenItem) {
            return checkedKeys === null || checkedKeys === void 0 ? void 0 : checkedKeys.includes(childrenItem.key);
          })) {
            checkedKeys.push(columnKey);
          }
        }
        treeMap.set(key, item);
        return item;
      });
    };
    return {
      list: loopData(list),
      keys: checkedKeys,
      map: treeMap
    };
  }, [columnsMap, list, show]);

  /**
   * 移動到指定的位置
   */
  var move = useRefFunction(function (id, targetId, dropPosition) {
    var newMap = _objectSpread({}, columnsMap);
    var newColumns = _toConsumableArray(sortKeyColumns);
    var findIndex = newColumns.findIndex(function (columnKey) {
      return columnKey === id;
    });
    var targetIndex = newColumns.findIndex(function (columnKey) {
      return columnKey === targetId;
    });
    var isDownWard = dropPosition >= findIndex;
    if (findIndex < 0) return;
    var targetItem = newColumns[findIndex];
    newColumns.splice(findIndex, 1);
    if (dropPosition === 0) {
      newColumns.unshift(targetItem);
    } else {
      newColumns.splice(isDownWard ? targetIndex : targetIndex + 1, 0, targetItem);
    }
    // 重新生成排序數組
    newColumns.forEach(function (key, order) {
      newMap[key] = _objectSpread(_objectSpread({}, newMap[key] || {}), {}, {
        order: order
      });
    });
    // 更新數組
    setColumnsMap(newMap);
    setSortKeyColumns(newColumns);
  });

  /**
   * 選中反選功能
   */
  var onCheckTree = useRefFunction(function (e) {
    var newColumnMap = _objectSpread({}, columnsMap);
    var loopSetShow = function loopSetShow(key) {
      var _treeDataConfig$map;
      var newSetting = _objectSpread({}, newColumnMap[key]);
      newSetting.show = e.checked;
      // 如果含有子節點，也要選中
      if ((_treeDataConfig$map = treeDataConfig.map) !== null && _treeDataConfig$map !== void 0 && (_treeDataConfig$map = _treeDataConfig$map.get(key)) !== null && _treeDataConfig$map !== void 0 && _treeDataConfig$map.children) {
        var _treeDataConfig$map$g;
        (_treeDataConfig$map$g = treeDataConfig.map.get(key)) === null || _treeDataConfig$map$g === void 0 || (_treeDataConfig$map$g = _treeDataConfig$map$g.children) === null || _treeDataConfig$map$g === void 0 || _treeDataConfig$map$g.forEach(function (item) {
          return loopSetShow(item.key);
        });
      }
      newColumnMap[key] = newSetting;
    };
    loopSetShow(e.node.key);
    setColumnsMap(_objectSpread({}, newColumnMap));
  });
  if (!show) {
    return null;
  }
  var listDom = /*#__PURE__*/_jsx(Tree, {
    itemHeight: 24,
    draggable: draggable && !!((_treeDataConfig$list = treeDataConfig.list) !== null && _treeDataConfig$list !== void 0 && _treeDataConfig$list.length) && ((_treeDataConfig$list2 = treeDataConfig.list) === null || _treeDataConfig$list2 === void 0 ? void 0 : _treeDataConfig$list2.length) > 1,
    checkable: checkable,
    onDrop: function onDrop(info) {
      var dropKey = info.node.key;
      var dragKey = info.dragNode.key;
      var dropPosition = info.dropPosition,
        dropToGap = info.dropToGap;
      var position = dropPosition === -1 || !dropToGap ? dropPosition + 1 : dropPosition;
      move(dragKey, dropKey, position);
    },
    blockNode: true,
    onCheck: function onCheck(_, e) {
      return onCheckTree(e);
    },
    checkedKeys: treeDataConfig.keys,
    showLine: false,
    titleRender: function titleRender(_node) {
      var node = _objectSpread(_objectSpread({}, _node), {}, {
        children: undefined
      });
      if (!node.title) return null;
      var normalizedTitle = runFunction(node.title, node);
      var wrappedTitle = /*#__PURE__*/_jsx(Typography.Text, {
        style: {
          width: 80
        },
        ellipsis: {
          tooltip: normalizedTitle
        },
        children: normalizedTitle
      });
      return /*#__PURE__*/_jsx(CheckboxListItem, _objectSpread(_objectSpread({
        className: className
      }, omit(node, ['key'])), {}, {
        showListItemOption: showListItemOption,
        title: wrappedTitle,
        columnKey: node.key
      }));
    },
    height: listHeight,
    treeData: (_treeDataConfig$list3 = treeDataConfig.list) === null || _treeDataConfig$list3 === void 0 ? void 0 : _treeDataConfig$list3.map(function (_ref5) {
      var disabled = _ref5.disabled,
        config = _objectWithoutProperties(_ref5, _excluded2);
      return config;
    })
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [showTitle && /*#__PURE__*/_jsx("span", {
      className: "".concat(className, "-list-title ").concat(hashId).trim(),
      children: listTitle
    }), listDom]
  });
};
var GroupCheckboxList = function GroupCheckboxList(_ref6) {
  var localColumns = _ref6.localColumns,
    className = _ref6.className,
    draggable = _ref6.draggable,
    checkable = _ref6.checkable,
    showListItemOption = _ref6.showListItemOption,
    listsHeight = _ref6.listsHeight;
  var _useContext5 = useContext(ProProvider),
    hashId = _useContext5.hashId;
  var rightList = [];
  var leftList = [];
  var list = [];
  var intl = useIntl();
  localColumns.forEach(function (item) {
    // 不在 setting 中展示的
    if (item.hideInSetting) {
      return;
    }
    var fixed = item.fixed;
    if (fixed === 'left') {
      leftList.push(item);
      return;
    }
    if (fixed === 'right') {
      rightList.push(item);
      return;
    }
    list.push(item);
  });
  var showRight = rightList && rightList.length > 0;
  var showLeft = leftList && leftList.length > 0;
  return /*#__PURE__*/_jsxs("div", {
    className: classNames("".concat(className, "-list"), hashId, _defineProperty({}, "".concat(className, "-list-group"), showRight || showLeft)),
    children: [/*#__PURE__*/_jsx(CheckboxList, {
      title: intl.getMessage('tableToolBar.leftFixedTitle', '固定在左側'),
      list: leftList,
      draggable: draggable,
      checkable: checkable,
      showListItemOption: showListItemOption,
      className: className,
      listHeight: listsHeight
    }), /*#__PURE__*/_jsx(CheckboxList, {
      list: list,
      draggable: draggable,
      checkable: checkable,
      showListItemOption: showListItemOption,
      title: intl.getMessage('tableToolBar.noFixedTitle', '不固定'),
      showTitle: showLeft || showRight,
      className: className,
      listHeight: listsHeight
    }), /*#__PURE__*/_jsx(CheckboxList, {
      title: intl.getMessage('tableToolBar.rightFixedTitle', '固定在右側'),
      list: rightList,
      draggable: draggable,
      checkable: checkable,
      showListItemOption: showListItemOption,
      className: className,
      listHeight: listsHeight
    })]
  });
};
function ColumnSetting(props) {
  var _props$checkable, _props$draggable, _props$showListItemOp, _props$settingIcon;
  var columnRef = useRef(null);
  // 獲得當前上下文的 hashID
  var counter = useContext(TableContext);
  var localColumns = props.columns;
  var _props$checkedReset = props.checkedReset,
    checkedReset = _props$checkedReset === void 0 ? true : _props$checkedReset;
  var columnsMap = counter.columnsMap,
    setColumnsMap = counter.setColumnsMap,
    clearPersistenceStorage = counter.clearPersistenceStorage;
  useEffect(function () {
    var _counter$propsRef$cur;
    if ((_counter$propsRef$cur = counter.propsRef.current) !== null && _counter$propsRef$cur !== void 0 && (_counter$propsRef$cur = _counter$propsRef$cur.columnsState) !== null && _counter$propsRef$cur !== void 0 && _counter$propsRef$cur.value) {
      var _counter$propsRef$cur2;
      columnRef.current = JSON.parse(JSON.stringify(((_counter$propsRef$cur2 = counter.propsRef.current) === null || _counter$propsRef$cur2 === void 0 || (_counter$propsRef$cur2 = _counter$propsRef$cur2.columnsState) === null || _counter$propsRef$cur2 === void 0 ? void 0 : _counter$propsRef$cur2.value) || {}));
    }
  }, []);

  /**
   * 設置全部選中，或全部未選中
   *
   * @param show
   */
  var setAllSelectAction = useRefFunction(function () {
    var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var columnKeyMap = {};
    var loopColumns = function loopColumns(columns) {
      columns.forEach(function (_ref7) {
        var key = _ref7.key,
          fixed = _ref7.fixed,
          index = _ref7.index,
          children = _ref7.children,
          disable = _ref7.disable;
        var columnKey = genColumnKey(key, index);
        if (columnKey) {
          var _columnsMap$columnKey, _columnsMap$columnKey2;
          columnKeyMap[columnKey] = {
            // 子節點 disable 時，不修改節點顯示狀態
            show: disable ? (_columnsMap$columnKey = columnsMap[columnKey]) === null || _columnsMap$columnKey === void 0 ? void 0 : _columnsMap$columnKey.show : show,
            fixed: fixed,
            disable: disable,
            order: (_columnsMap$columnKey2 = columnsMap[columnKey]) === null || _columnsMap$columnKey2 === void 0 ? void 0 : _columnsMap$columnKey2.order
          };
        }
        if (children) {
          loopColumns(children);
        }
      });
    };
    loopColumns(localColumns);
    setColumnsMap(columnKeyMap);
  });

  // 全選和反選
  var checkedAll = useRefFunction(function (e) {
    if (e.target.checked) {
      setAllSelectAction();
    } else {
      setAllSelectAction(false);
    }
  });

  // 重置項目
  var clearClick = useRefFunction(function () {
    var _counter$propsRef$cur3;
    clearPersistenceStorage === null || clearPersistenceStorage === void 0 || clearPersistenceStorage();
    setColumnsMap(((_counter$propsRef$cur3 = counter.propsRef.current) === null || _counter$propsRef$cur3 === void 0 || (_counter$propsRef$cur3 = _counter$propsRef$cur3.columnsState) === null || _counter$propsRef$cur3 === void 0 ? void 0 : _counter$propsRef$cur3.defaultValue) || columnRef.current || counter.defaultColumnKeyMap);
  });

  // 未選中的 key 列表
  var unCheckedKeys = Object.values(columnsMap).filter(function (value) {
    return !value || value.show === false;
  });

  // 是否已經選中
  var indeterminate = unCheckedKeys.length > 0 && unCheckedKeys.length !== localColumns.length;
  var intl = useIntl();
  var _useContext6 = useContext(ConfigProvider.ConfigContext),
    getPrefixCls = _useContext6.getPrefixCls;
  var className = getPrefixCls('pro-table-column-setting');
  var _useStyle = useStyle(className),
    wrapSSR = _useStyle.wrapSSR,
    hashId = _useStyle.hashId;
  return wrapSSR( /*#__PURE__*/_jsx(Popover, {
    arrow: false,
    title: /*#__PURE__*/_jsxs("div", {
      className: "".concat(className, "-title ").concat(hashId).trim(),
      children: [props.checkable === false ? /*#__PURE__*/_jsx("div", {}) : /*#__PURE__*/_jsx(Checkbox, {
        indeterminate: indeterminate,
        checked: unCheckedKeys.length === 0 && unCheckedKeys.length !== localColumns.length,
        onChange: function onChange(e) {
          checkedAll(e);
        },
        children: intl.getMessage('tableToolBar.columnDisplay', '列展示')
      }), checkedReset ? /*#__PURE__*/_jsx("a", {
        onClick: clearClick,
        className: "".concat(className, "-action-rest-button ").concat(hashId).trim(),
        children: intl.getMessage('tableToolBar.reset', '重置')
      }) : null, props !== null && props !== void 0 && props.extra ? /*#__PURE__*/_jsx(Space, {
        size: 12,
        align: "center",
        children: props.extra
      }) : null]
    }),
    overlayClassName: "".concat(className, "-overlay ").concat(hashId).trim(),
    trigger: "click",
    placement: "bottomRight",
    content: /*#__PURE__*/_jsx(GroupCheckboxList, {
      checkable: (_props$checkable = props.checkable) !== null && _props$checkable !== void 0 ? _props$checkable : true,
      draggable: (_props$draggable = props.draggable) !== null && _props$draggable !== void 0 ? _props$draggable : true,
      showListItemOption: (_props$showListItemOp = props.showListItemOption) !== null && _props$showListItemOp !== void 0 ? _props$showListItemOp : true,
      className: className,
      localColumns: localColumns,
      listsHeight: props.listsHeight
    }),
    children: props.children || /*#__PURE__*/_jsx(Tooltip, {
      title: intl.getMessage('tableToolBar.columnSetting', '列設置'),
      children: (_props$settingIcon = props.settingIcon) !== null && _props$settingIcon !== void 0 ? _props$settingIcon : /*#__PURE__*/_jsx(SettingOutlined, {})
    })
  }));
}
export default ColumnSetting;