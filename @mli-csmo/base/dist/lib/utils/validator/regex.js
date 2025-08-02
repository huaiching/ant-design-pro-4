"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REG_POS_AND_NEG_NUM = exports.REG_POINT_ZH_EN = exports.REG_PHONE = exports.REG_NUM_OR_ZERO = exports.REG_NEG_NUM_OR_ZERO = exports.REG_NEG_NUM = exports.REG_MAIL = exports.REG_LETTER_OR_NUM = exports.REG_LANDLINE = void 0;
var REG_POINT_ZH_EN = exports.REG_POINT_ZH_EN = /[^0-9\s]/;
var REG_PHONE = exports.REG_PHONE = /^09\d{8}$/;
var REG_LANDLINE = exports.REG_LANDLINE = /^\d{2,3}-?\d{7,8}$/;
var REG_MAIL = exports.REG_MAIL = /^\w{1,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,10}$/;
// 字母或數字
var REG_LETTER_OR_NUM = exports.REG_LETTER_OR_NUM = /^[a-zA-Z\d]+$/;
var REG_POS_AND_NEG_NUM = exports.REG_POS_AND_NEG_NUM = /^(\-)?\d+$/;
var REG_NEG_NUM = exports.REG_NEG_NUM = /^(\-)\d+$/;
var REG_NEG_NUM_OR_ZERO = exports.REG_NEG_NUM_OR_ZERO = /^0|(\-)\d+$/;
var REG_NUM_OR_ZERO = exports.REG_NUM_OR_ZERO = /^\d+$/;