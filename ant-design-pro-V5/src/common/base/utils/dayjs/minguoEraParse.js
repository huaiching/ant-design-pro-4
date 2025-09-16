function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// @ts-nocheck

import { yearBias } from "./minguoEra";
var minguoEraParse = function minguoEraParse(_o, c) {
  var prototype = c.prototype;
  var oldParse = prototype.parse;
  prototype.parse = function (cfg) {
    var matchString = 'T{1,3}([-/])?';
    var regex = new RegExp("(\\[[^\\]]+])|".concat(matchString), 'g');
    var date = cfg.date,
      args = cfg.args;
    var transCfg = _objectSpread({}, cfg);
    if (date && typeof date === 'string' && date.length >= 3 && args) {
      var format = args[1];
      var match;
      var result = date;
      if ((match = regex.exec(format)) !== null) {
        // 獲取 'TTT' 的起始位置
        var index = match.index;
        var endIndex;
        var charAtdate;
        if (match[2]) {
          // 匹配到特殊符号 -或/ 可以支持輸入1-3位 92-11-11
          var formatArr = format.split(match[0]);
          var tttReg = new RegExp(formatArr.map(function (item) {
            return item.length === 0 ? '' : "(.{".concat(item.length, "})");
          }).join("([0-9]{1,3}[".concat(match[2], "])")));
          // 匹配對應的TTT值
          var dateMatch = tttReg.exec(date);
          if (dateMatch != null) {
            charAtdate = dateMatch[formatArr[0].length === 0 ? 1 : 2].split(match[2])[0];
            endIndex = formatArr[0].length + charAtdate.length;
          } else {
            return oldParse.bind(this)(transCfg);
          }
        } else {
          // TTT后無特殊符號，必須嚴格匹配T的數量
          endIndex = match.index + match[0].length;
          charAtdate = date.substring(index, endIndex);
        }
        // 獲取目標字符串中對應位置的文字
        var num = parseInt(charAtdate);
        if (!isNaN(num)) {
          num = num + yearBias;
          // 將結果轉換回字符串
          var newChar = num.toString();
          // 替換原文字
          result = result.slice(0, index) + newChar + result.slice(endIndex);
        }
        var transFormat = format.replace(regex, 'YYYY');
        transCfg = _objectSpread(_objectSpread({}, cfg), {}, {
          date: result,
          args: [result, transFormat]
        });
      }
    }
    return oldParse.bind(this)(transCfg);
  };
};
export default minguoEraParse;