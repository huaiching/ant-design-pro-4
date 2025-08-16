import { DownOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import { omitBoolean } from '@ant-design/pro-utils';
import { ConfigProvider, Space } from 'antd';
import React, { useContext, useMemo } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
/**
 * FormFooter 的組件，可以自動進行一些配置
 *
 * @param props
 */
var Actions = function Actions(props) {
  var setCollapsed = props.setCollapsed,
    _props$collapsed = props.collapsed,
    collapsed = _props$collapsed === void 0 ? false : _props$collapsed,
    needCollapse = props.needCollapse,
    submitter = props.submitter,
    style = props.style,
    hiddenNum = props.hiddenNum;
  var _useContext = useContext(ConfigProvider.ConfigContext),
    getPrefixCls = _useContext.getPrefixCls;
  var _useIntl = useIntl(),
    formatMessage = _useIntl.formatMessage;
  var collapseRender = omitBoolean(props.collapseRender);
  var defaultCollapseRender = useMemo(function () {
    if (collapsed) {
      return /*#__PURE__*/_jsxs(_Fragment, {
        children: [formatMessage({
          id: 'component.tagSelect.expand'
        }), hiddenNum && "(".concat(hiddenNum, ")"), /*#__PURE__*/_jsx(DownOutlined, {
          style: {
            marginLeft: '0.5em',
            transition: '0.3s all',
            transform: "rotate(".concat(collapsed ? 0 : 0.5, "turn)")
          }
        })]
      });
    }
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [formatMessage({
        id: 'component.tagSelect.collapse'
      }), /*#__PURE__*/_jsx(DownOutlined, {
        style: {
          marginLeft: '0.5em',
          transition: '0.3s all',
          transform: "rotate(".concat(collapsed ? 0 : 0.5, "turn)")
        }
      })]
    });
  }, [collapsed, hiddenNum]);
  return /*#__PURE__*/_jsxs(Space, {
    style: style,
    size: 8,
    children: [submitter, props.collapseRender !== false && needCollapse && /*#__PURE__*/_jsx("a", {
      className: getPrefixCls('pro-form-collapse-button'),
      onClick: function onClick() {
        return setCollapsed(!collapsed);
      },
      children: collapseRender ? collapseRender(collapsed, props, formatMessage, hiddenNum) : defaultCollapseRender
    })]
  });
};
export default Actions;