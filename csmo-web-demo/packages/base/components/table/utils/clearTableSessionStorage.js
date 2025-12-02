"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearTableSessionStorage = exports.clearColumnSessionStorage = exports.TABLE_SESSION_KEY = exports.COLUMN_SESSION_KEY = void 0;
var TABLE_SESSION_KEY = exports.TABLE_SESSION_KEY = 'tableStorage';
var COLUMN_SESSION_KEY = exports.COLUMN_SESSION_KEY = 'SearchTerms';
var clearTableSessionStorage = exports.clearTableSessionStorage = function clearTableSessionStorage() {
  var sessionKeys = Object.keys(sessionStorage);
  for (var _i = 0, _sessionKeys = sessionKeys; _i < _sessionKeys.length; _i++) {
    var sessionKey = _sessionKeys[_i];
    if (sessionKey.startsWith(TABLE_SESSION_KEY)) {
      sessionStorage.removeItem(sessionKey);
    }
  }
};
var clearColumnSessionStorage = exports.clearColumnSessionStorage = function clearColumnSessionStorage() {
  var sessionKeys = Object.keys(sessionStorage);
  for (var _i2 = 0, _sessionKeys2 = sessionKeys; _i2 < _sessionKeys2.length; _i2++) {
    var sessionKey = _sessionKeys2[_i2];
    if (sessionKey.startsWith(COLUMN_SESSION_KEY)) {
      sessionStorage.removeItem(sessionKey);
    }
  }
};