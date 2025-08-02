"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footer = void 0;
var _proLayout = require("@ant-design/pro-layout");
var _react = _interopRequireDefault(require("react"));
var _reactIntl = require("react-intl");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var Footer = exports.Footer = function Footer() {
  var intl = (0, _reactIntl.useIntl)();
  var currentYear = new Date().getFullYear();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_proLayout.DefaultFooter, {
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