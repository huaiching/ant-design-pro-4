var MENU_LOCALE_BEGIN = 'menu';
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
var getPathName = function getPathName(route, routes) {
  var pathName = MENU_LOCALE_BEGIN;
  pathName += getParentName(route, routes);
  return pathName;
};
export { MENU_LOCALE_BEGIN, getPathName };