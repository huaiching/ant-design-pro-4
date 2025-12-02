"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yearBias = exports.default = void 0;
var yearBias = exports.yearBias = 1911;
var minguoEra = function minguoEra(_o, c) {
  var prototype = c.prototype;
  var oldFormat = prototype.format;
  prototype.format = function (formatStr) {
    var _this = this;
    var str = formatStr;
    var result = str.replace(/(\[[^\]]+])|TTT/g, function (_match, a) {
      var _this$$utils;
      // @ts-ignore
      var year = String(_this.$y - yearBias);
      var args = [year, 3, '0'];
      // @ts-ignore
      // return a || year
      return a || (_this$$utils = _this.$utils()).s.apply(_this$$utils, args.concat(['']));
    });
    return oldFormat.bind(this)(result);
  };
};
var _default = exports.default = minguoEra;