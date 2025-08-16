function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { isDeepEqualReact, omitUndefined } from '@ant-design/pro-utils';
import omit from 'omit.js';
import React from 'react';
import { isBordered } from "../../utils/index";
import FormRender from "./FormRender";
import { jsx as _jsx } from "react/jsx-runtime";
var FormSearch = /*#__PURE__*/function (_React$Component) {
  _inherits(FormSearch, _React$Component);
  var _super = _createSuper(FormSearch);
  function FormSearch() {
    var _this;
    _classCallCheck(this, FormSearch);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    /**
     * 查詢表單相關的配置
     */
    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (value, firstLoad) {
      var _this$props = _this.props,
        pagination = _this$props.pagination,
        _this$props$beforeSea = _this$props.beforeSearchSubmit,
        beforeSearchSubmit = _this$props$beforeSea === void 0 ? function (searchParams) {
          return searchParams;
        } : _this$props$beforeSea,
        action = _this$props.action,
        onSubmit = _this$props.onSubmit,
        onFormSearchSubmit = _this$props.onFormSearchSubmit;
      // 只傳入 pagination 中的 current 和 pageSize 參數
      var pageInfo = pagination ? omitUndefined({
        current: pagination.current,
        pageSize: pagination.pageSize
      }) : {};
      var submitParams = _objectSpread(_objectSpread({}, value), {}, {
        _timestamp: Date.now()
      }, pageInfo);
      var omitParams = omit(beforeSearchSubmit(submitParams), Object.keys(pageInfo));
      onFormSearchSubmit(omitParams);
      if (!firstLoad) {
        var _action$current, _action$current$setPa;
        (_action$current = action.current) === null || _action$current === void 0 || (_action$current$setPa = _action$current.setPageInfo) === null || _action$current$setPa === void 0 || _action$current$setPa.call(_action$current, {
          current: 1
        });
      }
      // 不是第一次提交就不觸發，第一次提交是 js 觸發的
      if (onSubmit && !firstLoad) {
        onSubmit === null || onSubmit === void 0 || onSubmit(value);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onReset", function (value) {
      var _action$current2, _action$current2$setP;
      var _this$props2 = _this.props,
        pagination = _this$props2.pagination,
        _this$props2$beforeSe = _this$props2.beforeSearchSubmit,
        beforeSearchSubmit = _this$props2$beforeSe === void 0 ? function (searchParams) {
          return searchParams;
        } : _this$props2$beforeSe,
        action = _this$props2.action,
        onFormSearchSubmit = _this$props2.onFormSearchSubmit,
        onReset = _this$props2.onReset;
      var pageInfo = pagination ? omitUndefined({
        current: pagination.current,
        pageSize: pagination.pageSize
      }) : {};
      var omitParams = omit(beforeSearchSubmit(_objectSpread(_objectSpread({}, value), pageInfo)), Object.keys(pageInfo));
      onFormSearchSubmit(omitParams);
      (_action$current2 = action.current) === null || _action$current2 === void 0 || (_action$current2$setP = _action$current2.setPageInfo) === null || _action$current2$setP === void 0 || _action$current2$setP.call(_action$current2, {
        current: 1
      });
      onReset === null || onReset === void 0 || onReset();
    });
    /**
     * 只 Diff 需要用的 props，能減少 5 次左右的 render
     *
     * @param next
     * @see 因為 hooks 每次的 setFormSearch 都是新的，所以每次都觸發 render
     * @see action 也是同樣的原因
     * @returns
     */
    _defineProperty(_assertThisInitialized(_this), "isEqual", function (next) {
      var _this$props3 = _this.props,
        columns = _this$props3.columns,
        loading = _this$props3.loading,
        formRef = _this$props3.formRef,
        type = _this$props3.type,
        cardBordered = _this$props3.cardBordered,
        dateFormatter = _this$props3.dateFormatter,
        form = _this$props3.form,
        search = _this$props3.search,
        manualRequest = _this$props3.manualRequest,
        collapsed = _this$props3.collapsed;
      var diffProps = {
        columns: columns,
        loading: loading,
        formRef: formRef,
        type: type,
        cardBordered: cardBordered,
        dateFormatter: dateFormatter,
        form: form,
        search: search,
        manualRequest: manualRequest,
        collapsed: collapsed
      };
      return !isDeepEqualReact(diffProps, {
        columns: next.columns,
        formRef: next.formRef,
        loading: next.loading,
        type: next.type,
        cardBordered: next.cardBordered,
        dateFormatter: next.dateFormatter,
        form: next.form,
        search: next.search,
        manualRequest: next.manualRequest,
        collapsed: next.collapsed
      });
    });
    _defineProperty(_assertThisInitialized(_this), "shouldComponentUpdate", function (next) {
      return _this.isEqual(next);
    });
    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var _this$props4 = _this.props,
        moduleName = _this$props4.moduleName,
        columns = _this$props4.columns,
        loading = _this$props4.loading,
        formRef = _this$props4.formRef,
        type = _this$props4.type,
        action = _this$props4.action,
        cardBordered = _this$props4.cardBordered,
        dateFormatter = _this$props4.dateFormatter,
        form = _this$props4.form,
        search = _this$props4.search,
        pagination = _this$props4.pagination,
        ghost = _this$props4.ghost,
        manualRequest = _this$props4.manualRequest,
        collapsed = _this$props4.collapsed,
        setNeedCollapsed = _this$props4.setNeedCollapsed,
        onValuesChange = _this$props4.onValuesChange,
        onInit = _this$props4.onInit;
      var pageInfo = pagination ? omitUndefined({
        current: pagination.current,
        pageSize: pagination.pageSize
      }) : {};
      return /*#__PURE__*/_jsx(FormRender, {
        submitButtonLoading: loading,
        columns: columns,
        type: type,
        ghost: ghost,
        formRef: formRef,
        onSubmit: _this.onSubmit,
        manualRequest: manualRequest,
        onReset: _this.onReset,
        dateFormatter: dateFormatter,
        search: search,
        form: _objectSpread(_objectSpread({
          autoFocusFirstInput: false
        }, form), {}, {
          extraUrlParams: _objectSpread(_objectSpread({}, pageInfo), form === null || form === void 0 ? void 0 : form.extraUrlParams)
        }),
        action: action,
        bordered: isBordered('search', cardBordered),
        collapsed: collapsed,
        moduleName: moduleName,
        onValuesChange: onValuesChange,
        onInit: onInit,
        setNeedCollapsed: setNeedCollapsed
      });
    });
    return _this;
  }
  return _createClass(FormSearch);
}(React.Component);
export default FormSearch;