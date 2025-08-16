function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import "./style.less";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var getBase64 = function getBase64(img, callback) {
  var reader = new FileReader();
  reader.addEventListener('load', function () {
    return callback(reader.result);
  });
  reader.readAsDataURL(img);
};
var MliUploadImage = function MliUploadImage(props) {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = useState(),
    _useState4 = _slicedToArray(_useState3, 2),
    imageUrl = _useState4[0],
    setImageUrl = _useState4[1];
  var _useIntl = useIntl(),
    formatMessage = _useIntl.formatMessage;
  useEffect(function () {
    if (props.value) {
      setImageUrl(props.value);
    }
  }, [props.value]);
  var beforeUpload = function beforeUpload(file) {
    var isJpgOrPngOrBmp = file.type === 'image/jpeg' || file.type === 'image/png' || file.type == 'image/bmp';
    var isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJpgOrPngOrBmp || !isLt2M) {
      message.error(formatMessage({
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
  var uploadButton = /*#__PURE__*/_jsxs("div", {
    children: [loading ? /*#__PURE__*/_jsx(LoadingOutlined, {}) : /*#__PURE__*/_jsx(PlusOutlined, {}), /*#__PURE__*/_jsx("div", {
      style: {
        marginTop: 8
      },
      children: formatMessage({
        id: 'component.upload.imageButton'
      })
    })]
  });
  var token = 'Basic';
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx(Upload, {
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
      children: imageUrl ? /*#__PURE__*/_jsx("img", {
        src: imageUrl,
        alt: "avatar",
        style: {
          width: '100%'
        }
      }) : uploadButton
    }), /*#__PURE__*/_jsx("div", {
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
export default MliUploadImage;