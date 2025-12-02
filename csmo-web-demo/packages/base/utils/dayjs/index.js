"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Dayjs", {
  enumerable: true,
  get: function get() {
    return _dayjs.Dayjs;
  }
});
exports.default = void 0;
var _dayjs = _interopRequireWildcard(require("dayjs"));
require("dayjs/locale/zh-tw");
var _customParseFormat = _interopRequireDefault(require("dayjs/plugin/customParseFormat"));
var _isSameOrAfter = _interopRequireDefault(require("dayjs/plugin/isSameOrAfter"));
var _isSameOrBefore = _interopRequireDefault(require("dayjs/plugin/isSameOrBefore"));
var _minguoEra = _interopRequireDefault(require("./minguoEra"));
var _minguoEraParse = _interopRequireDefault(require("./minguoEraParse"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
_dayjs.default.locale('zh-tw');
_dayjs.default.extend(_customParseFormat.default);
_dayjs.default.extend(_minguoEra.default);
_dayjs.default.extend(_minguoEraParse.default);
_dayjs.default.extend(_isSameOrBefore.default);
_dayjs.default.extend(_isSameOrAfter.default);
var _default = exports.default = _dayjs.default;