import { DefaultFooter } from '@ant-design/pro-layout';
import React from 'react';
import { useIntl } from 'react-intl';
import { jsx as _jsx } from "react/jsx-runtime";
export var Footer = function Footer() {
  var intl = useIntl();
  var currentYear = new Date().getFullYear();
  return /*#__PURE__*/_jsx(DefaultFooter, {
    style: {
      background: 'transparent'
    },
    copyright: "".concat(currentYear, " ").concat(intl.formatMessage({
      id: 'footer.copyright.description',
      defaultMessage: 'EIS all rights reserved'
    })),
    links: []
  });
};