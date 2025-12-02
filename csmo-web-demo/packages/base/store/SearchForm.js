"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ifSessionExisted = exports.getSessionItem = void 0;
// 透過傳入的moduleName來取得Session Storage存放的value
var getSessionItem = exports.getSessionItem = function getSessionItem(moduleName) {
  var value = sessionStorage.getItem(moduleName);
  try {
    return value ? JSON.parse(value) : null;
  } catch (_unused) {
    return value;
  }
};

// 判斷moduleName的Session是否存在
var ifSessionExisted = exports.ifSessionExisted = function ifSessionExisted(moduleName) {
  if (sessionStorage.getItem(moduleName) === null) {
    sessionStorage.setItem(moduleName, '');
    return true;
  }
  return false;
};