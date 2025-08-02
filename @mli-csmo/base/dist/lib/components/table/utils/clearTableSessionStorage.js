"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearTableSessionStorage = exports.TABLE_SESSION_KEY = void 0;
var TABLE_SESSION_KEY = exports.TABLE_SESSION_KEY = 'tableStorage';
var clearTableSessionStorage = exports.clearTableSessionStorage = function clearTableSessionStorage() {
  var sessionKeys = Object.keys(sessionStorage);
  for (var _i = 0, _sessionKeys = sessionKeys; _i < _sessionKeys.length; _i++) {
    var sessionKey = _sessionKeys[_i];
    if (sessionKey.startsWith(TABLE_SESSION_KEY)) {
      sessionStorage.removeItem(sessionKey);
    }
  }
};