function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/* eslint-disable no-continue */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import memoizee from 'memoizee';
import * as utils from "./utils";
import primitives from "./primitives";
var getDateByName = function getDateByName(name, parentsKey) {
  if (!name || name.length < 1) {
    return 'string';
  }
  if (Array.isArray(name)) {
    // @ts-ignore
    return getDateByName(_toConsumableArray(name).pop(), name);
  }
  if (['nickname', 'name'].includes(name)) {
    return 'cname';
  }
  if (['owner', 'firstName', 'lastName', 'username'].includes(name)) {
    return 'name';
  }
  if (['avatar'].includes(name)) {
    return 'avatar';
  }
  if (['group'].includes(name)) {
    return 'group';
  }
  if (name.toLocaleLowerCase().endsWith('id')) {
    return 'uuid';
  }
  if (name.toLocaleLowerCase().endsWith('type') || name.toLocaleLowerCase().endsWith('key') || ['key'].includes(name)) {
    return 'id';
  }
  if (name.toLocaleLowerCase().endsWith('label') || ['label'].includes(name)) {
    // @ts-ignore
    var newParents = _toConsumableArray(parentsKey);
    newParents.pop();
    var newType = getDateByName(newParents);
    if (newType !== 'string' && newType !== 'csentence') {
      return newType;
    }
    return 'label';
  }
  if (['email'].includes(name)) {
    return 'email';
  }
  if (['password'].includes(name)) {
    return 'string(16)';
  }
  if (['phone'].includes(name)) {
    return 'phone';
  }
  if (['province'].includes(name)) {
    return 'province';
  }
  if (['city'].includes(name)) {
    return 'city';
  }
  if (['addr', 'address'].includes(name)) {
    return 'county';
  }
  if (['country'].includes(name)) {
    return 'country';
  }
  if (['url', 'imageUrl', 'href'].includes(name) || name.toLocaleLowerCase().endsWith('url') || name.toLocaleLowerCase().endsWith('urls') || name.toLocaleLowerCase().endsWith('image') || name.toLocaleLowerCase().endsWith('link')) {
    return 'href';
  }
  if (name.toLocaleLowerCase().endsWith('errorcode')) {
    return 'errorCode';
  }
  if (['type', 'status'].includes(name) || name.toLocaleLowerCase().endsWith('status') || name.toLocaleLowerCase().endsWith('type')) {
    return 'status';
  }
  if (name.toLocaleLowerCase().endsWith('authority')) {
    return 'authority';
  }
  return 'csentence';
};
function primitive(schemaParams, propsName) {
  var schema = utils.objectify(schemaParams);
  var type = schema.type,
    format = schema.format;
  var value = primitives["".concat(type, "_").concat(format || getDateByName(propsName))] || primitives[type];
  if (typeof schema.example === 'undefined') {
    return value || "Unknown Type: ".concat(schema.type);
  }
  return schema.example;
}
var OpenAPIGeneratorMockJs = /*#__PURE__*/_createClass(function OpenAPIGeneratorMockJs(_openAPI) {
  var _this = this;
  _classCallCheck(this, OpenAPIGeneratorMockJs);
  _defineProperty(this, "openAPI", void 0);
  _defineProperty(this, "sampleFromSchema", function (schema, propsName) {
    var localSchema = schema.$ref ? utils.get(_this.openAPI, schema.$ref.replace('#/', '').split('/')) : utils.objectify(schema);
    var type = localSchema.type;
    var properties = localSchema.properties,
      additionalProperties = localSchema.additionalProperties,
      items = localSchema.items;
    if (!type) {
      if (properties) {
        type = 'object';
      } else if (items) {
        type = 'array';
      } else {
        return null;
      }
    }
    if (type === 'object') {
      var props = utils.objectify(properties);
      var obj = {};
      for (var name in props) {
        obj[name] = _this.sampleFromSchema(props[name], [].concat(_toConsumableArray(propsName || []), [name]));
      }
      if (additionalProperties === true) {
        obj.additionalProp1 = {};
        return obj;
      }
      if (additionalProperties) {
        var additionalProps = utils.objectify(additionalProperties);
        var additionalPropVal = _this.sampleFromSchema(additionalProps, propsName);
        for (var i = 1; i < 4; i += 1) {
          obj["additionalProp".concat(i)] = additionalPropVal;
        }
      }
      return obj;
    }
    if (type === 'array') {
      var item = _this.sampleFromSchema(items, propsName);
      return new Array(parseInt((Math.random() * 20).toFixed(0), 10)).fill(item);
    }
    if (localSchema.enum) {
      if (localSchema.default) return localSchema.default;
      return utils.normalizeArray(localSchema.enum)[0];
    }
    if (type === 'file') {
      return null;
    }
    return primitive(localSchema, propsName);
  });
  _defineProperty(this, "parser", function () {
    var openAPI = _objectSpread({}, _this.openAPI);
    for (var path in openAPI.paths) {
      for (var method in openAPI.paths[path]) {
        var api = openAPI.paths[path][method];
        for (var code in api.responses) {
          var response = api.responses[code];
          var schema = response.content && response.content['application/json'] && utils.inferSchema(response.content['application/json']);
          if (schema) {
            response.example = schema ? _this.sampleFromSchema(schema) : null;
          }
        }
        if (!api.parameters) continue;
        var _iterator = _createForOfIteratorHelper(api.parameters),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var parameter = _step.value;
            var _schema = utils.inferSchema(parameter);
            parameter.example = _schema ? _this.sampleFromSchema(_schema) : null;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
    return openAPI;
  });
  this.openAPI = _openAPI;
  this.sampleFromSchema = memoizee(this.sampleFromSchema);
});
export default OpenAPIGeneratorMockJs;