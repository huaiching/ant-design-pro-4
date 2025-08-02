"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _icons = require("@ant-design/icons");
var _proProvider = require("@ant-design/pro-provider");
var _proUtils = require("@ant-design/pro-utils");
var _antd = require("antd");
var _react = _interopRequireWildcard(require("react"));
var _Provide = require("../../Store/Provide");
var _ColumnSetting = _interopRequireDefault(require("../ColumnSetting"));
var _ListToolBar = _interopRequireDefault(require("../ListToolBar"));
var _DensityIcon = _interopRequireDefault(require("./DensityIcon"));
var _FullscreenIcon = _interopRequireDefault(require("./FullscreenIcon"));
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["headerTitle", "tooltip", "toolBarRender", "action", "options", "selectedRowKeys", "selectedRows", "toolbar", "onSearch", "columns", "optionsRender", "moduleName", "hasSearch", "collapsed", "needCollapsed", "setCollapsed", "exportOptions"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function getButtonText(_ref, options) {
  var _options$reloadIcon;
  var intl = _ref.intl;
  return {
    reload: {
      text: intl.getMessage('tableToolBar.reload', '刷新'),
      icon: (_options$reloadIcon = options.reloadIcon) !== null && _options$reloadIcon !== void 0 ? _options$reloadIcon : /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.ReloadOutlined, {})
    },
    density: {
      text: intl.getMessage('tableToolBar.density', '表格密度'),
      icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DensityIcon.default, {
        icon: options.densityIcon
      })
    },
    fullScreen: {
      text: intl.getMessage('tableToolBar.fullScreen', '全屏'),
      icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FullscreenIcon.default, {})
    }
  };
}

/**
 * 渲染預設的 工具欄
 *
 * @param options
 * @param className
 */
function renderDefaultOption(options, defaultOptions, actions, columns) {
  return Object.keys(options).filter(function (item) {
    return item;
  }).map(function (key) {
    var value = options[key];
    if (!value) {
      return null;
    }
    var onClick = value === true ? function (_) {
      return defaultOptions[key];
    } : function (event) {
      value === null || value === void 0 || value(event, actions.current);
    };
    if (typeof onClick !== 'function') {
      // onClick = () => {}
    }
    if (key === 'setting') {
      return /*#__PURE__*/(0, _react.createElement)(_ColumnSetting.default, _objectSpread(_objectSpread({}, options[key]), {}, {
        columns: columns,
        key: key
      }));
    }
    if (key === 'fullScreen') {
      return (
        /*#__PURE__*/
        // @ts-ignore
        (0, _jsxRuntime.jsx)("span", {
          onClick: onClick,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FullscreenIcon.default, {})
        }, key)
      );
    }
    var optionItem = getButtonText(defaultOptions, options)[key];
    if (optionItem) {
      return (
        /*#__PURE__*/
        // @ts-ignore
        (0, _jsxRuntime.jsx)("span", {
          onClick: onClick,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Tooltip, {
            title: optionItem.text,
            children: optionItem.icon
          })
        }, key)
      );
    }
    return null;
  }).filter(function (item) {
    return item;
  });
}
function ToolBar(_ref2) {
  var headerTitle = _ref2.headerTitle,
    tooltip = _ref2.tooltip,
    toolBarRender = _ref2.toolBarRender,
    action = _ref2.action,
    propsOptions = _ref2.options,
    selectedRowKeys = _ref2.selectedRowKeys,
    selectedRows = _ref2.selectedRows,
    toolbar = _ref2.toolbar,
    onSearch = _ref2.onSearch,
    columns = _ref2.columns,
    optionsRender = _ref2.optionsRender,
    moduleName = _ref2.moduleName,
    hasSearch = _ref2.hasSearch,
    collapsed = _ref2.collapsed,
    needCollapsed = _ref2.needCollapsed,
    setCollapsed = _ref2.setCollapsed,
    exportOptions = _ref2.exportOptions,
    rest = _objectWithoutProperties(_ref2, _excluded);
  var counter = (0, _react.useContext)(_Provide.TableContext);
  var intl = (0, _proProvider.useIntl)();
  var optionDom = (0, _react.useMemo)(function () {
    var defaultOptions = {
      reload: function reload() {
        var _action$current;
        return action === null || action === void 0 || (_action$current = action.current) === null || _action$current === void 0 ? void 0 : _action$current.reload();
      },
      density: true,
      setting: true,
      search: false,
      fullScreen: function fullScreen() {
        var _action$current2, _action$current2$full;
        return action === null || action === void 0 || (_action$current2 = action.current) === null || _action$current2 === void 0 || (_action$current2$full = _action$current2.fullScreen) === null || _action$current2$full === void 0 ? void 0 : _action$current2$full.call(_action$current2);
      }
    };
    if (propsOptions === false) {
      return [];
    }
    var options = _objectSpread(_objectSpread({}, defaultOptions), {}, {
      fullScreen: false
    }, propsOptions);
    var settings = renderDefaultOption(options, _objectSpread(_objectSpread({}, defaultOptions), {}, {
      intl: intl
    }), action, columns);
    if (optionsRender) {
      return optionsRender(_objectSpread({
        headerTitle: headerTitle,
        tooltip: tooltip,
        toolBarRender: toolBarRender,
        action: action,
        options: propsOptions,
        selectedRowKeys: selectedRowKeys,
        selectedRows: selectedRows,
        toolbar: toolbar,
        onSearch: onSearch,
        columns: columns,
        optionsRender: optionsRender,
        moduleName: moduleName,
        hasSearch: hasSearch,
        collapsed: collapsed,
        needCollapsed: needCollapsed,
        setCollapsed: setCollapsed,
        exportOptions: exportOptions
      }, rest), settings);
    }
    return settings;
  }, [action, columns, headerTitle, intl, onSearch, optionsRender, propsOptions, rest, selectedRowKeys, selectedRows, toolBarRender, toolbar, tooltip]);
  // 操作清單
  var actions = toolBarRender ? toolBarRender(action === null || action === void 0 ? void 0 : action.current, {
    selectedRowKeys: selectedRowKeys,
    selectedRows: selectedRows
  }) : [];
  var searchConfig = (0, _react.useMemo)(function () {
    if (!propsOptions) {
      return false;
    }
    if (!propsOptions.search) return false;

    // 受控的value 和 onChange
    var defaultSearchConfig = {
      value: counter.keyWords,
      onChange: function onChange(e) {
        return counter.setKeyWords(e.target.value);
      }
    };
    if (propsOptions.search === true) return defaultSearchConfig;
    return _objectSpread(_objectSpread({}, defaultSearchConfig), propsOptions.search);
  }, [counter, propsOptions]);
  (0, _react.useEffect)(function () {
    if (counter.keyWords === undefined) {
      onSearch === null || onSearch === void 0 || onSearch('');
    }
  }, [counter.keyWords, onSearch]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListToolBar.default, _objectSpread({
    title: headerTitle,
    tooltip: tooltip || rest.tip,
    search: searchConfig,
    onSearch: onSearch,
    action: action,
    actions: actions,
    settings: optionDom,
    moduleName: moduleName,
    hasSearch: hasSearch,
    collapsed: collapsed,
    needCollapsed: needCollapsed,
    setCollapsed: setCollapsed,
    exportOptions: exportOptions
  }, toolbar));
}
/**
 * 這裡負責與 table 交互，並且減少 render 次數
 */
var ToolbarRender = /*#__PURE__*/function (_React$Component) {
  _inherits(ToolbarRender, _React$Component);
  var _super = _createSuper(ToolbarRender);
  function ToolbarRender() {
    var _this;
    _classCallCheck(this, ToolbarRender);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "onSearch", function (keyword) {
      var _options$search, _options$search$onSea, _actionRef$current, _actionRef$current$se;
      var _this$props = _this.props,
        options = _this$props.options,
        onFormSearchSubmit = _this$props.onFormSearchSubmit,
        actionRef = _this$props.actionRef;
      if (!options || !options.search) {
        return;
      }
      var _ref3 = options.search === true ? {} : options.search,
        _ref3$name = _ref3.name,
        name = _ref3$name === void 0 ? 'keyword' : _ref3$name;

      // 如果傳入的 onSearch 返回值為 false，應該直接攔截請求
      var success = (_options$search = options.search) === null || _options$search === void 0 || (_options$search$onSea = _options$search.onSearch) === null || _options$search$onSea === void 0 ? void 0 : _options$search$onSea.call(_options$search, keyword);
      if (success === false) return;

      // 查詢的時候的回到第一頁
      actionRef === null || actionRef === void 0 || (_actionRef$current = actionRef.current) === null || _actionRef$current === void 0 || (_actionRef$current$se = _actionRef$current.setPageInfo) === null || _actionRef$current$se === void 0 || _actionRef$current$se.call(_actionRef$current, {
        current: 1
      });
      onFormSearchSubmit((0, _proUtils.omitUndefined)(_defineProperty({
        _timestamp: Date.now()
      }, name, keyword)));
    });
    _defineProperty(_assertThisInitialized(_this), "isEquals", function (next) {
      var _this$props2 = _this.props,
        hideToolbar = _this$props2.hideToolbar,
        tableColumn = _this$props2.tableColumn,
        options = _this$props2.options,
        tooltip = _this$props2.tooltip,
        toolbar = _this$props2.toolbar,
        selectedRows = _this$props2.selectedRows,
        selectedRowKeys = _this$props2.selectedRowKeys,
        headerTitle = _this$props2.headerTitle,
        actionRef = _this$props2.actionRef,
        toolBarRender = _this$props2.toolBarRender,
        collapsed = _this$props2.collapsed,
        exportOptions = _this$props2.exportOptions,
        needCollapsed = _this$props2.needCollapsed;
      return (0, _proUtils.isDeepEqualReact)({
        hideToolbar: hideToolbar,
        tableColumn: tableColumn,
        options: options,
        tooltip: tooltip,
        toolbar: toolbar,
        selectedRows: selectedRows,
        selectedRowKeys: selectedRowKeys,
        headerTitle: headerTitle,
        actionRef: actionRef,
        toolBarRender: toolBarRender,
        collapsed: collapsed,
        exportOptions: exportOptions,
        needCollapsed: needCollapsed
      }, {
        hideToolbar: next.hideToolbar,
        tableColumn: next.tableColumn,
        options: next.options,
        tooltip: next.tooltip,
        toolbar: next.toolbar,
        selectedRows: next.selectedRows,
        selectedRowKeys: next.selectedRowKeys,
        headerTitle: next.headerTitle,
        actionRef: next.actionRef,
        toolBarRender: next.toolBarRender,
        collapsed: next.collapsed,
        exportOptions: next.exportOptions,
        needCollapsed: next.needCollapsed
      }, ['render', 'renderFormItem']);
    });
    _defineProperty(_assertThisInitialized(_this), "shouldComponentUpdate", function (next) {
      if (next.searchNode) {
        return true;
      }
      return !_this.isEquals(next);
    });
    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var _this$props3 = _this.props,
        hideToolbar = _this$props3.hideToolbar,
        tableColumn = _this$props3.tableColumn,
        options = _this$props3.options,
        searchNode = _this$props3.searchNode,
        tooltip = _this$props3.tooltip,
        toolbar = _this$props3.toolbar,
        selectedRows = _this$props3.selectedRows,
        selectedRowKeys = _this$props3.selectedRowKeys,
        headerTitle = _this$props3.headerTitle,
        actionRef = _this$props3.actionRef,
        toolBarRender = _this$props3.toolBarRender,
        optionsRender = _this$props3.optionsRender,
        moduleName = _this$props3.moduleName,
        hasSearch = _this$props3.hasSearch,
        collapsed = _this$props3.collapsed,
        needCollapsed = _this$props3.needCollapsed,
        setCollapsed = _this$props3.setCollapsed,
        exportOptions = _this$props3.exportOptions;

      // 不展示 toolbar
      if (hideToolbar) {
        return null;
      }
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(ToolBar, {
        tooltip: tooltip,
        columns: tableColumn,
        options: options,
        headerTitle: headerTitle,
        action: actionRef,
        onSearch: _this.onSearch,
        selectedRows: selectedRows,
        selectedRowKeys: selectedRowKeys,
        toolBarRender: toolBarRender,
        hasSearch: hasSearch,
        toolbar: _objectSpread({
          filter: searchNode
        }, toolbar),
        optionsRender: optionsRender,
        moduleName: moduleName,
        collapsed: collapsed,
        needCollapsed: needCollapsed,
        setCollapsed: setCollapsed,
        exportOptions: exportOptions
      });
    });
    return _this;
  }
  return _createClass(ToolbarRender);
}(_react.default.Component);
var _default = exports.default = ToolbarRender;