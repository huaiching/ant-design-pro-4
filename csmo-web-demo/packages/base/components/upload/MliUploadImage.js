"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _icons = require("@ant-design/icons");
var _antd = require("antd");
var _react = _interopRequireWildcard(require("react"));
var _reactIntl = require("react-intl");
require("./style.less");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var getBase64 = function getBase64(img, callback) {
  var reader = new FileReader();
  reader.addEventListener('load', function () {
    return callback(reader.result);
  });
  reader.readAsDataURL(img);
};
var MliUploadImage = function MliUploadImage(props) {
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0, _react.useState)(),
    _useState4 = _slicedToArray(_useState3, 2),
    imageUrl = _useState4[0],
    setImageUrl = _useState4[1];
  var _useIntl = (0, _reactIntl.useIntl)(),
    formatMessage = _useIntl.formatMessage;
  (0, _react.useEffect)(function () {
    if (props.value) {
      setImageUrl(props.value);
    }
  }, [props.value]);
  var beforeUpload = function beforeUpload(file) {
    var isJpgOrPngOrBmp = file.type === 'image/jpeg' || file.type === 'image/png' || file.type == 'image/bmp';
    var isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJpgOrPngOrBmp || !isLt2M) {
      _antd.message.error(formatMessage({
        id: 'component.upload.invalidFile'
      }));
    }
    return isJpgOrPngOrBmp && isLt2M;
  };
  var handleChange = function handleChange(info) {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      var _props$onChange;
      getBase64(info.file.originFileObj, function (url) {
        setLoading(false);
        setImageUrl(url);
      });
      (_props$onChange = props.onChange) === null || _props$onChange === void 0 || _props$onChange.call(props, info.file.response.docId);
    }
  };
  var uploadButton = /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.LoadingOutlined, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.PlusOutlined, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        marginTop: 8
      },
      children: formatMessage({
        id: 'component.upload.imageButton'
      })
    })]
  });
  var token = 'Basic';
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_antd.Upload, {
      name: "file",
      listType: "picture-card",
      className: "avatar-uploader",
      showUploadList: false
      //Efolder尚未集成，臨時url 僅供展示
      ,
      beforeUpload: beforeUpload,
      action: props.action,
      headers: {
        Authorization: token
      },
      onChange: handleChange,
      children: imageUrl ? /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        src: imageUrl,
        alt: "avatar",
        style: {
          width: '100%'
        }
      }) : uploadButton
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        marginTop: 8,
        fontSize: 12,
        color: 'grey'
      },
      children: formatMessage({
        id: 'component.upload.imageTips'
      })
    })]
  });
};
var _default = exports.default = MliUploadImage;