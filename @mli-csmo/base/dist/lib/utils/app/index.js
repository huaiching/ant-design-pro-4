"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPathName = exports.MENU_LOCALE_BEGIN = void 0;
var MENU_LOCALE_BEGIN = exports.MENU_LOCALE_BEGIN = 'menu';
var getParentName = function getParentName(route, routes) {
  var pathName = '';
  if (route) {
    if (route.parentId) {
      pathName = getParentName(routes[parseInt(route.parentId)], routes);
    }
    if (route.name) {
      pathName += ".".concat(route.name);
    }
  }
  return pathName;
};
var getPathName = exports.getPathName = function getPathName(route, routes) {
  var pathName = MENU_LOCALE_BEGIN;
  pathName += getParentName(route, routes);
  return pathName;
};