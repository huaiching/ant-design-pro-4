function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { Alert, Typography } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Footer } from "../footer";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useStyles = createStyles(function () {
  return {
    loginContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      background: '#f1f2f5'
    },
    loginContainerImg: {
      width: '195px',
      height: '40px',
      marginTop: '40px',
      marginLeft: '40px'
    },
    loginTitle: {
      color: '#262626'
    },
    content: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 0'
    }
  };
});
export var Login = function Login(_ref) {
  var actions = _ref.actions,
    submitLoading = _ref.submitLoading,
    onFinish = _ref.onFinish;
  var _useStyles = useStyles(),
    styles = _useStyles.styles;
  var _useState = useState({}),
    _useState2 = _slicedToArray(_useState, 1),
    userLoginState = _useState2[0];
  var _useIntl = useIntl(),
    formatMessage = _useIntl.formatMessage;
  var success = userLoginState.success;
  return /*#__PURE__*/_jsxs("div", {
    className: styles.loginContainer,
    children: [/*#__PURE__*/_jsx("div", {
      className: styles.loginContainer,
      children: /*#__PURE__*/_jsx("img", {
        alt: "Mercuries",
        src: "/logo.svg",
        className: styles.loginContainerImg
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: styles.content,
      children: [/*#__PURE__*/_jsx(Typography.Title, {
        className: styles.loginTitle,
        level: 2,
        children: /*#__PURE__*/_jsx(FormattedMessage, {
          id: "layout.header.title"
        })
      }), /*#__PURE__*/_jsx("div", {
        style: {
          flex: '1',
          padding: '32px 0'
        },
        children: /*#__PURE__*/_jsxs(LoginForm, {
          contentStyle: {
            minWidth: 280,
            maxWidth: '75vw'
          },
          actions: actions,
          submitter: {
            searchConfig: {
              submitText: formatMessage({
                id: 'component.login.button.submit'
              })
            },
            submitButtonProps: {
              loading: submitLoading
            }
          },
          onFinish: onFinish,
          children: [success === false && /*#__PURE__*/_jsx(Alert, {
            style: {
              marginBottom: 24
            },
            message: formatMessage({
              id: 'pages.Login.accountLogin.errorMessage',
              defaultMessage: 'username or password incorrect'
            }),
            type: "error",
            showIcon: true
          }), /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(ProFormText, {
              name: "username",
              fieldProps: {
                size: 'large'
              },
              placeholder: formatMessage({
                id: 'common.input.placeholder'
              }, {
                columnName: formatMessage({
                  id: 'component.login.username'
                })
              }),
              rules: [{
                required: true,
                message: formatMessage({
                  id: 'common.input.requiredMessage'
                }, {
                  columnName: formatMessage({
                    id: 'component.login.username'
                  })
                })
              }]
            }), /*#__PURE__*/_jsx(ProFormText.Password, {
              name: "password",
              fieldProps: {
                size: 'large'
              },
              placeholder: formatMessage({
                id: 'common.input.placeholder'
              }, {
                columnName: formatMessage({
                  id: 'component.login.password'
                })
              }),
              rules: [{
                required: true,
                message: formatMessage({
                  id: 'common.input.requiredMessage'
                }, {
                  columnName: formatMessage({
                    id: 'component.login.password'
                  })
                })
              }]
            })]
          }), /*#__PURE__*/_jsx("div", {
            style: {
              marginBottom: 28
            },
            children: /*#__PURE__*/_jsx(ProFormCheckbox, {
              noStyle: true,
              name: "autoLogin",
              children: /*#__PURE__*/_jsx(FormattedMessage, {
                id: "component.login.remember",
                defaultMessage: "Remember me ?"
              })
            })
          })]
        })
      })]
    }), /*#__PURE__*/_jsx(Footer, {})]
  });
};