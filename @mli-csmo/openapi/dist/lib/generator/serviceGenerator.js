"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPath = exports.getGenInfo = exports.ServiceGenerator = void 0;
var _fs = require("fs");
var _path = require("path");
var _glob = _interopRequireDefault(require("glob"));
var nunjucks = _interopRequireWildcard(require("nunjucks"));
var _reservedWords = _interopRequireDefault(require("reserved-words"));
var _rimraf = _interopRequireDefault(require("rimraf"));
var _tinyPinyin = _interopRequireDefault(require("tiny-pinyin"));
var _log = _interopRequireDefault(require("../log"));
var _util = require("../util");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var BASE_DIRS = ['service', 'services'];
var getPath = exports.getPath = function getPath() {
  var cwd = process.cwd();
  return (0, _fs.existsSync)((0, _path.join)(cwd, 'src')) ? (0, _path.join)(cwd, 'src') : cwd;
};

// 類型宣告過濾關鍵字
var resolveTypeName = function resolveTypeName(typeName) {
  var _typeName$split$pop;
  if (_reservedWords.default.check(typeName)) {
    return "__openAPI__".concat(typeName);
  }
  var typeLastName = (typeName === null || typeName === void 0 || (_typeName$split$pop = typeName.split('/').pop()) === null || _typeName$split$pop === void 0 ? void 0 : _typeName$split$pop.split('.').pop()) || '';
  var name = typeLastName.replace(/[-_ ](\w)/g, function (_all, letter) {
    return letter.toUpperCase();
  }).replace(/[^\w^\s^\u4e00-\u9fa5]/gi, '');
  if (!/[\u3220-\uFA29]/.test(name)) {
    return name;
  }
  return _tinyPinyin.default.convertToPinyin(name, '', true);
};
function getRefName(refObject) {
  if (_typeof(refObject) !== 'object' || !refObject.$ref) {
    return refObject;
  }
  var refPaths = refObject.$ref.split('/');
  return resolveTypeName(refPaths[refPaths.length - 1]);
}
var getType = function getType(schemaObject) {
  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  if (schemaObject === undefined || schemaObject === null) {
    return 'any';
  }
  if (_typeof(schemaObject) !== 'object') {
    return schemaObject;
  }
  if (schemaObject.$ref) {
    return [namespace, getRefName(schemaObject)].filter(function (s) {
      return s;
    }).join('.');
  }
  var _ref = schemaObject,
    type = _ref.type;
  var numberEnum = ['int64', 'integer', 'long', 'float', 'double', 'number', 'int', 'float', 'double', 'int32', 'int64'];
  var dateEnum = ['Date', 'date', 'dateTime', 'date-time', 'datetime'];
  var stringEnum = ['string', 'email', 'password', 'url', 'byte', 'binary'];
  if (schemaObject.format && numberEnum.includes(schemaObject.format)) {
    type = 'number';
  }
  if (schemaObject.enum) {
    type = 'enum';
  }
  if (numberEnum.includes(type)) {
    return 'number';
  }
  if (dateEnum.includes(type)) {
    return 'Date';
  }
  if (stringEnum.includes(type)) {
    return 'string';
  }
  if (type === 'boolean') {
    return 'boolean';
  }
  if (type === 'array') {
    var items = schemaObject.items;
    if (schemaObject.schema) {
      items = schemaObject.schema.items;
    }
    if (Array.isArray(items)) {
      var arrayItemType = items.map(function (subType) {
        return getType(subType.schema || subType, namespace);
      }).toString();
      return "[".concat(arrayItemType, "]");
    }
    var arrayType = getType(items, namespace);
    return arrayType.includes(' | ') ? "(".concat(arrayType, ")[]") : "".concat(arrayType, "[]");
  }
  if (type === 'enum') {
    return Array.isArray(schemaObject.enum) ? Array.from(new Set(schemaObject.enum.map(function (v) {
      return typeof v === 'string' ? "\"".concat(v.replace(/"/g, '"'), "\"") : getType(v);
    }))).join(' | ') : 'string';
  }
  if (schemaObject.oneOf && schemaObject.oneOf.length) {
    return schemaObject.oneOf.map(function (item) {
      return getType(item, namespace);
    }).join(' | ');
  }
  if (schemaObject.allOf && schemaObject.allOf.length) {
    return "(".concat(schemaObject.allOf.map(function (item) {
      return getType(item, namespace);
    }).join(' & '), ")");
  }
  if (schemaObject.type === 'object' || schemaObject.properties) {
    if (!Object.keys(schemaObject.properties || {}).length) {
      return 'Record<string, any>';
    }
    return "{ ".concat(Object.keys(schemaObject.properties || {}).map(function (key) {
      var _schemaObject$propert, _schemaObject$propert2;
      var required = 'required' in ((schemaObject === null || schemaObject === void 0 || (_schemaObject$propert = schemaObject.properties) === null || _schemaObject$propert === void 0 ? void 0 : _schemaObject$propert[key]) || {}) ? ((schemaObject === null || schemaObject === void 0 || (_schemaObject$propert2 = schemaObject.properties) === null || _schemaObject$propert2 === void 0 ? void 0 : _schemaObject$propert2[key]) || {}).required : false;
      /**
       * 將類型屬性變為字串，兼容錯誤格式如：
       * 3d_tile(數字開頭)等錯誤命名，
       * 在後面進行格式化的時候會將正確的字串轉換為正常形式，
       * 錯誤的繼續保留字串。
       * */
      return "'".concat(key, "'").concat(required ? '' : '?', ": ").concat(getType(schemaObject.properties && schemaObject.properties[key], namespace), "; ");
    }).join(''), "}");
  }
  return 'any';
};
var getGenInfo = exports.getGenInfo = function getGenInfo(isDirExist, appName, absSrcPath) {
  // dir 不存在，則沒有佔用，且為第一次
  if (!isDirExist) {
    return [false, true];
  }
  var indexList = _glob.default.sync("@(".concat(BASE_DIRS.join('|'), ")/").concat(appName, "/index.@(js|ts)"), {
    cwd: absSrcPath
  });
  // dir 存在，且 index 存在
  if (indexList && indexList.length) {
    var indexFile = (0, _path.join)(absSrcPath, indexList[0]);
    try {
      var line = ((0, _fs.readFileSync)(indexFile, 'utf-8') || '').split(/\r?\n/).slice(0, 3).join('');
      // dir 存在，index 存在， 且 index 是我們生成的。則未佔用，且不是第一次
      if (line.includes('// API 更新時間：')) {
        return [false, false];
      }
      // dir 存在，index 存在，且 index 內容不是我們生成的。此時如果 openAPI 子檔案存在，就不是第一次，否則是第一次
      return [true, !(0, _fs.existsSync)((0, _path.join)(indexFile, 'openAPI'))];
    } catch (_e) {
      // 因為 glob 已經拿到了這個檔案，但沒權限讀，所以當作 dirUsed, 在子目錄重新新建，所以當作 firstTime
      return [true, true];
    }
  }
  // dir 存在，index 不存在, 尋求，第一次要看 dir 下有沒有 openAPI 檔案夾
  return [true, !((0, _fs.existsSync)((0, _path.join)(absSrcPath, BASE_DIRS[0], appName, 'openAPI')) || (0, _fs.existsSync)((0, _path.join)(absSrcPath, BASE_DIRS[1], appName, 'openAPI')))];
};
var DEFAULT_SCHEMA = {
  type: 'object',
  properties: {
    id: {
      type: 'number'
    }
  }
};
var DEFAULT_PATH_PARAM = {
  in: 'path',
  name: '',
  schema: {
    type: 'string'
  },
  required: true,
  isObject: false,
  type: 'string'
};
var ServiceGenerator = exports.ServiceGenerator = /*#__PURE__*/function () {
  function ServiceGenerator(config, openAPIData) {
    var _this = this;
    _classCallCheck(this, ServiceGenerator);
    _defineProperty(this, "apiData", {});
    _defineProperty(this, "classNameList", []);
    _defineProperty(this, "version", void 0);
    _defineProperty(this, "mappings", []);
    _defineProperty(this, "finalPath", void 0);
    _defineProperty(this, "config", void 0);
    _defineProperty(this, "openAPIData", void 0);
    _defineProperty(this, "concatOrNull", function () {
      var _ref2;
      for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
        arrays[_key] = arguments[_key];
      }
      var filteredArrays = arrays.filter(function (arr) {
        return Array.isArray(arr);
      });
      var c = (_ref2 = []).concat.apply(_ref2, _toConsumableArray(filteredArrays));
      return c.length > 0 ? c : null;
    });
    this.finalPath = '';
    this.config = _objectSpread({
      projectName: 'api',
      templatesFolder: (0, _path.join)(__dirname, '../', 'templates')
    }, config);
    this.openAPIData = openAPIData;
    var info = openAPIData.info;
    var basePath = '';
    this.version = info.version;
    Object.keys(openAPIData.paths || {}).forEach(function (p) {
      var pathItem = openAPIData.paths[p];
      ['get', 'put', 'post', 'delete', 'patch'].forEach(function (method) {
        var operationObject = pathItem[method];
        if (!operationObject) {
          return;
        }
        var tags = operationObject['x-swagger-router-controller'] ? [operationObject['x-swagger-router-controller']] : operationObject.tags || [operationObject.operationId] || [p.replace('/', '').split('/')[1]];
        tags.forEach(function (tagString) {
          var tag = resolveTypeName(tagString);
          if (!_this.apiData[tag]) {
            _this.apiData[tag] = [];
          }
          _this.apiData[tag].push(_objectSpread({
            path: "".concat(basePath).concat(p),
            method: method
          }, operationObject));
        });
      });
    });
  }
  _createClass(ServiceGenerator, [{
    key: "genFile",
    value: function genFile() {
      var _this2 = this;
      var basePath = this.config.serversPath || './src/service';
      try {
        var finalPath = (0, _path.join)(basePath, this.config.projectName || '');
        this.finalPath = finalPath;
        _glob.default.sync("".concat(finalPath, "/**/*")).filter(function (ele) {
          return !ele.includes('_deperated');
        }).forEach(function (ele) {
          _rimraf.default.sync(ele);
        });
      } catch (error) {
        (0, _log.default)("\uD83D\uDEA5 serves \u751F\u6210\u5931\u6557: ".concat(error));
      }

      // 生成 ts 類型宣告
      var interfaceTP = this.getInterfaceTP();
      this.genFileFromTemplate('typings.ts', 'interface', {
        namespace: this.config.namespace,
        list: interfaceTP,
        disableTypeCheck: false
      });
      // 生成 controller 檔案
      var prettierError = [];
      // 生成 service 統計
      var serviceTP = this.getServiceTP();
      serviceTP.forEach(function (tp) {
        // 根據當前資料源類型選擇恰當的 controller 模版
        var template = 'serviceController';
        var hasError = _this2.genFileFromTemplate(_this2.getFinalFileName("".concat(tp.className, ".ts")), template, _objectSpread({
          namespace: _this2.config.namespace,
          requestImportStatement: _this2.config.requestImportStatement,
          disableTypeCheck: false
        }, tp));
        if (hasError) {
          (0, _log.default)('🚥 格式化失敗', tp.className);
        }
        prettierError.push(hasError);
      });
      if (prettierError.includes(true)) {
        (0, _log.default)('🚥 格式化失敗，請檢查 service 檔案內可能存在的語法錯誤');
      }
      // 生成 index 檔案
      this.genFileFromTemplate('index.ts', 'serviceIndex', {
        list: this.classNameList,
        disableTypeCheck: false
      });

      // 打印日誌
      (0, _log.default)('✅ 成功生成 service 檔案');
      return {
        interfaceTP: interfaceTP,
        serviceTP: serviceTP
      };
    }
  }, {
    key: "getParamsTypeName",
    value: function getParamsTypeName(operationObject) {
      var _this$config, _this$config2, _customeTypeName;
      var customeTypeName = ((_this$config = this.config) === null || _this$config === void 0 || (_this$config = _this$config.hook) === null || _this$config === void 0 ? void 0 : _this$config.customTypeName) || ((_this$config2 = this.config) === null || _this$config2 === void 0 || (_this$config2 = _this$config2.hook) === null || _this$config2 === void 0 ? void 0 : _this$config2.customFunctionName);
      return resolveTypeName("".concat((_customeTypeName = customeTypeName === null || customeTypeName === void 0 ? void 0 : customeTypeName(operationObject)) !== null && _customeTypeName !== void 0 ? _customeTypeName : operationObject.operationId, "Params"));
    }
  }, {
    key: "getFuncationName",
    value: function getFuncationName(data) {
      // 獲取路徑相同部分
      var pathBasePrefix = this.getBasePrefix(Object.keys(this.openAPIData.paths));
      return this.config.hook && this.config.hook.customFunctionName ? this.config.hook.customFunctionName(data) : data.operationId ? this.resolveFunctionName((0, _util.stripDot)(data.operationId), data.method) : data.method + this.genDefaultFunctionName(data.path, pathBasePrefix);
    }

    // 介面數據獲取
  }, {
    key: "getServiceTP",
    value: function getServiceTP() {
      var _this3 = this;
      return Object.keys(this.apiData).map(function (tag) {
        // functionName tag 級別防重
        var tmpFunctionRD = {};
        var genParams = _this3.apiData[tag].filter(function (api) {
          return (
            // 暫不支持變數 排除掉deprecated
            !api.path.includes('${') && !api.deprecated
          );
        }).map(function (api) {
          var newApi = api;
          try {
            var allParams = _this3.getParamsTP(newApi.parameters, newApi.path);
            var body = _this3.getBodyTP(newApi.requestBody);
            var response = _this3.getResponseTP(newApi.responses);
            var params = allParams || {};
            var file = _this3.getFileTP(newApi.requestBody);
            var formData = false;
            if (body && (body.mediaType || '').includes('form') || file) {
              formData = true;
            }
            var functionName = _this3.getFuncationName(newApi);
            if (functionName && tmpFunctionRD[functionName]) {
              functionName = "".concat(functionName, "_").concat(tmpFunctionRD[functionName] += 1);
            } else if (functionName) {
              tmpFunctionRD[functionName] = 1;
            }
            var formattedPath = newApi.path.replace(/:([^/]*)|{([^}]*)}/gi, function (_, str, str2) {
              return "${".concat(str || str2, "}");
            });
            if (newApi.extensions && newApi.extensions['x-antTech-description']) {
              var extensions = newApi.extensions;
              var _extensions$xAntTech = extensions['x-antTech-description'],
                apiName = _extensions$xAntTech.apiName,
                antTechVersion = _extensions$xAntTech.antTechVersion,
                productCode = _extensions$xAntTech.productCode,
                antTechApiName = _extensions$xAntTech.antTechApiName;
              formattedPath = antTechApiName || formattedPath;
              _this3.mappings.push({
                antTechApi: formattedPath,
                popAction: apiName,
                popProduct: productCode,
                antTechVersion: antTechVersion
              });
              newApi.antTechVersion = antTechVersion;
            }

            // 為 path 中的 params 添加 alias
            var escapedPathParams = ((params || {}).path || []).map(function (ele, index) {
              return _objectSpread(_objectSpread({}, ele), {}, {
                alias: "param".concat(index)
              });
            });
            if (escapedPathParams.length) {
              escapedPathParams.forEach(function (param) {
                formattedPath = formattedPath.replace("${".concat(param.name, "}"), "${".concat(param.alias, "}"));
              });
            }
            var finalParams = escapedPathParams && escapedPathParams.length ? _objectSpread(_objectSpread({}, params), {}, {
              path: escapedPathParams
            }) : params;

            // 處理 query 中的複雜物件
            if (finalParams && finalParams.query) {
              finalParams.query = finalParams.query.map(function (ele) {
                return _objectSpread(_objectSpread({}, ele), {}, {
                  isComplexType: ele.isObject
                });
              });
            }
            var getPrefixPath = function getPrefixPath() {
              if (!_this3.config.apiPrefix) {
                return formattedPath;
              }
              // 靜態 apiPrefix
              var prefix = typeof _this3.config.apiPrefix === 'function' ? "".concat(_this3.config.apiPrefix({
                path: formattedPath,
                method: newApi.method,
                namespace: tag,
                functionName: functionName
              })).trim() : _this3.config.apiPrefix.trim();
              if (!prefix) {
                return formattedPath;
              }
              if (prefix.startsWith("'") || prefix.startsWith('"') || prefix.startsWith('`')) {
                var finalPrefix = prefix.slice(1, prefix.length - 1);
                if (formattedPath.startsWith(finalPrefix) || formattedPath.startsWith("/".concat(finalPrefix))) {
                  return formattedPath;
                }
                return "".concat(finalPrefix).concat(formattedPath);
              }
              // prefix 變數
              return "".concat(prefix).concat(formattedPath);
            };
            return _objectSpread(_objectSpread({}, newApi), {}, {
              // 對含有batch的介面特殊處理
              hasBatch: getPrefixPath().indexOf('/batch/') !== -1,
              functionName: functionName,
              typeName: _this3.getParamsTypeName(newApi),
              path: getPrefixPath(),
              pathInComment: formattedPath.replace(/\*/g, '&#42;'),
              hasPathVariables: formattedPath.includes('{'),
              hasApiPrefix: !!_this3.config.apiPrefix,
              method: newApi.method,
              // 如果 functionName 和 summary 相同，則不顯示 summary
              desc: functionName === newApi.summary ? newApi.description : [newApi.summary, newApi.description].filter(function (s) {
                return s;
              }).join(' '),
              hasHeader: !!(params && params.header) || !!(body && body.mediaType),
              params: finalParams,
              hasParams: Boolean(Object.keys(finalParams || {}).length),
              body: body,
              file: file,
              hasFormData: formData,
              response: response
            });
          } catch (error) {
            console.error('[GenSDK] gen service param error:', error);
            throw error;
          }
        }).sort(function (a, b) {
          return a.path.localeCompare(b.path);
        });
        var fileName = _this3.replaceDot(tag);
        var className = fileName;
        if (_this3.config.hook && _this3.config.hook.customClassName) {
          className = _this3.config.hook.customClassName(tag);
        }
        if (genParams.length) {
          _this3.classNameList.push({
            fileName: className,
            controllerName: className
          });
        }
        return {
          genType: 'ts',
          className: className,
          instanceName: "".concat(fileName[0].toLowerCase()).concat(fileName.substr(1)),
          list: genParams
        };
      }).filter(function (ele) {
        return !!ele.list.length;
      });
    }
  }, {
    key: "getBodyTP",
    value: function getBodyTP() {
      var _this4 = this;
      var requestBody = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var reqBody = this.resolveRefObject(requestBody);
      if (!reqBody) {
        return null;
      }
      var reqContent = reqBody.content;
      if (_typeof(reqContent) !== 'object') {
        return null;
      }
      var mediaType = Object.keys(reqContent)[0];
      var schema = reqContent[mediaType].schema || DEFAULT_SCHEMA;
      if (mediaType === '*/*') {
        mediaType = '';
      }
      // 如果 requestBody 有 required 屬性，則正常顯示；如果沒有，預設非必填
      var required = typeof requestBody.required === 'boolean' ? requestBody.required : false;
      if (schema.type === 'object' && schema.properties) {
        var propertiesList = Object.keys(schema.properties).map(function (p) {
          if (schema.properties && schema.properties[p] && !['binary', 'base64'].includes(schema.properties[p].format || '') && !(['string[]', 'array'].includes(schema.properties[p].type || '') && ['binary', 'base64'].includes(schema.properties[p].items.format || ''))) {
            var _schema$required$incl, _schema$required;
            return {
              key: p,
              schema: _objectSpread(_objectSpread({}, schema.properties[p]), {}, {
                type: getType(schema.properties[p], _this4.config.namespace),
                required: (_schema$required$incl = (_schema$required = schema.required) === null || _schema$required === void 0 ? void 0 : _schema$required.includes(p)) !== null && _schema$required$incl !== void 0 ? _schema$required$incl : false
              })
            };
          }
          return undefined;
        }).filter(function (p) {
          return p;
        });
        return _objectSpread(_objectSpread({
          mediaType: mediaType
        }, schema), {}, {
          required: required,
          propertiesList: propertiesList
        });
      }
      return {
        mediaType: mediaType,
        required: required,
        type: getType(schema, this.config.namespace)
      };
    }
  }, {
    key: "getFileTP",
    value: function getFileTP() {
      var requestBody = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (requestBody && requestBody.content && requestBody.content['multipart/form-data']) {
        var ret = this.resolveFileTP(requestBody.content['multipart/form-data'].schema);
        return ret.length > 0 ? ret : null;
      }
      return null;
    }
  }, {
    key: "resolveFileTP",
    value: function resolveFileTP(obj) {
      var ret = [];
      var resolved = this.resolveObject(obj);
      var props = resolved.props && resolved.props.length > 0 && resolved.props[0].filter(function (p) {
        return p.format === 'binary' || p.format === 'base64' || (p.type === 'string[]' || p.type === 'array') && (p.items.format === 'binary' || p.items.format === 'base64');
      }) || [];
      if (props.length > 0) {
        ret = props.map(function (p) {
          return {
            title: p.name,
            multiple: p.type === 'string[]' || p.type === 'array'
          };
        });
      }
      if (resolved.type) ret = [].concat(_toConsumableArray(ret), _toConsumableArray(this.resolveFileTP(resolved.type)));
      return ret;
    }
  }, {
    key: "getResponseTP",
    value: function getResponseTP() {
      var responses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var response = responses && this.resolveRefObject(responses.default || responses['200']);
      var defaultResponse = {
        mediaType: '*/*',
        type: 'any'
      };
      if (!response) {
        return defaultResponse;
      }
      var resContent = response.content;
      var mediaType = Object.keys(resContent || {})[0];
      if (_typeof(resContent) !== 'object' || !mediaType) {
        return defaultResponse;
      }
      var schema = resContent[mediaType].schema || DEFAULT_SCHEMA;
      if ('properties' in schema) {
        Object.keys(schema.properties || {}).map(function (fieldName) {
          var _schema$required$incl2, _schema$required2;
          // @ts-ignore
          schema.properties[fieldName]['required'] = (_schema$required$incl2 = (_schema$required2 = schema.required) === null || _schema$required2 === void 0 ? void 0 : _schema$required2.includes(fieldName)) !== null && _schema$required$incl2 !== void 0 ? _schema$required$incl2 : false;
        });
      }
      return {
        mediaType: mediaType,
        type: getType(schema, this.config.namespace)
      };
    }
  }, {
    key: "getParamsTP",
    value: function getParamsTP() {
      var _this5 = this;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var path = arguments.length > 1 ? arguments[1] : undefined;
      var templateParams = {};
      if (parameters && parameters.length) {
        ;
        ['query', 'header', 'path', 'cookie' /* , 'file' */].forEach(function (source) {
          var params = parameters.map(function (p) {
            return _this5.resolveRefObject(p);
          }).filter(function (p) {
            return p.in === source;
          }).map(function (p) {
            var isDirectObject = ((p.schema || {}).type || p.type) === 'object';
            var refList = ((p.schema || {}).$ref || p.$ref || '').split('/');
            var ref = refList[refList.length - 1];
            var deRefObj = Object.entries(_this5.openAPIData.components && _this5.openAPIData.components.schemas || {}).find(function (_ref3) {
              var _ref4 = _slicedToArray(_ref3, 1),
                k = _ref4[0];
              return k === ref;
            }) || [];
            var isRefObject = (deRefObj[1] || {}).type === 'object';
            return _objectSpread(_objectSpread({}, p), {}, {
              isObject: isDirectObject || isRefObject,
              type: getType(p.schema || DEFAULT_SCHEMA, _this5.config.namespace)
            });
          });
          if (params.length) {
            templateParams[source] = params;
          }
        });
      }
      if (path && path.length > 0) {
        var regex = /\{(\w+)\}/g;
        templateParams.path = templateParams.path || [];
        var match;
        var _loop = function _loop() {
          var pathName = match[1];
          if (!templateParams.path.some(function (p) {
            return p.name === pathName;
          })) {
            templateParams.path.push(_objectSpread(_objectSpread({}, DEFAULT_PATH_PARAM), {}, {
              name: match[1]
            }));
          }
        };
        while (match = regex.exec(path)) {
          _loop();
        }

        // 如果 path 沒有內容，則將刪除 path 參數，避免影響後續的 hasParams 判斷
        if (!templateParams.path.length) delete templateParams.path;
      }
      return templateParams;
    }

    /**
     * ts 類型數據轉換
     */
  }, {
    key: "getInterfaceTP",
    value: function getInterfaceTP() {
      var _this6 = this;
      var components = this.openAPIData.components;
      var data = components && [components.schemas].map(function (defines) {
        if (!defines) {
          return null;
        }
        return Object.keys(defines).map(function (typeName) {
          var result = _this6.resolveObject(defines[typeName]);
          var getDefinesType = function getDefinesType() {
            if (result.type) {
              return defines[typeName].type === 'object' || result.type;
            }
            return 'Record<string, any>';
          };
          return {
            typeName: resolveTypeName(typeName),
            type: getDefinesType(),
            parent: result.parent,
            props: result.props || [],
            isEnum: result.isEnum
          };
        });
      });

      // 強行替換掉請求參數params的類型，生成方法對應的 xxxxParams 類型
      Object.keys(this.openAPIData.paths || {}).forEach(function (p) {
        var pathItem = _this6.openAPIData.paths[p];
        ['get', 'put', 'post', 'delete', 'patch'].forEach(function (method) {
          var operationObject = pathItem[method];
          if (!operationObject) {
            return;
          }
          var props = [];
          if (operationObject.parameters) {
            operationObject.parameters.forEach(function (parameter) {
              var _parameter$descriptio;
              props.push({
                desc: (_parameter$descriptio = parameter.description) !== null && _parameter$descriptio !== void 0 ? _parameter$descriptio : '',
                name: parameter.name,
                required: parameter.required,
                type: getType(parameter.schema)
              });
            });
          }
          if (pathItem.parameters) {
            pathItem.parameters.forEach(function (parameter) {
              var _parameter$descriptio2;
              props.push({
                desc: (_parameter$descriptio2 = parameter.description) !== null && _parameter$descriptio2 !== void 0 ? _parameter$descriptio2 : '',
                name: parameter.name,
                required: parameter.required,
                type: getType(parameter.schema)
              });
            });
          }
          if (props.length > 0 && data) {
            data.push([{
              typeName: "".concat(_this6.getParamsTypeName(_objectSpread(_objectSpread({}, operationObject), {}, {
                method: method,
                path: p
              }))),
              type: 'Record<string, any>',
              parent: undefined,
              props: [props],
              isEnum: false
            }]);
          }
        });
      });
      return data &&
      // @ts-ignore
      data.reduce(function (p, c) {
        return p && c && p.concat(c);
      }, []).sort(function (a, b) {
        return a.typeName.localeCompare(b.typeName);
      });
    }
  }, {
    key: "genFileFromTemplate",
    value: function genFileFromTemplate(fileName, type, params) {
      try {
        var template = this.getTemplate(type);
        // 設置輸出不轉義
        nunjucks.configure({
          autoescape: false
        });
        return (0, _util.writeFile)(this.finalPath, fileName, nunjucks.renderString(template, params));
      } catch (error) {
        console.error('[GenSDK] file gen fail:', fileName, 'type:', type);
        throw error;
      }
    }
  }, {
    key: "getTemplate",
    value: function getTemplate(type) {
      return (0, _fs.readFileSync)((0, _path.join)(this.config.templatesFolder || '', "".concat(type, ".njk")), 'utf8');
    }

    /**
     * 獲取 TS 類型的屬性列表
     */
  }, {
    key: "getProps",
    value: function getProps(schemaObject) {
      var _schemaObject$require;
      var requiredPropKeys = (_schemaObject$require = schemaObject === null || schemaObject === void 0 ? void 0 : schemaObject.required) !== null && _schemaObject$require !== void 0 ? _schemaObject$require : false;
      return schemaObject.properties ? Object.keys(schemaObject.properties).map(function (propName) {
        var schema = schemaObject.properties && schemaObject.properties[propName] || DEFAULT_SCHEMA;
        return _objectSpread(_objectSpread({}, schema), {}, {
          name: propName,
          type: getType(schema),
          desc: [schema.title, schema.description].filter(function (s) {
            return s;
          }).join(' '),
          // 如果沒有 required 資訊，預設全部是非必填
          required: requiredPropKeys ? requiredPropKeys.some(function (key) {
            return key === propName;
          }) : false
        });
      }) : [];
    }
  }, {
    key: "resolveObject",
    value: function resolveObject(schemaObject) {
      // 引用類型
      if (schemaObject.$ref) {
        return this.resolveRefObject(schemaObject);
      }
      // 枚舉類型
      if (schemaObject.enum) {
        return this.resolveEnumObject(schemaObject);
      }
      // 繼承類型
      if (schemaObject.allOf && schemaObject.allOf.length) {
        return this.resolveAllOfObject(schemaObject);
      }
      // 對象類型
      if (schemaObject.properties) {
        return this.resolveProperties(schemaObject);
      }
      // 陣列類型
      if (schemaObject.items && schemaObject.type === 'array') {
        return this.resolveArray(schemaObject);
      }
      return schemaObject;
    }
  }, {
    key: "resolveArray",
    value: function resolveArray(schemaObject) {
      var _schemaObject$items;
      if ((_schemaObject$items = schemaObject.items) !== null && _schemaObject$items !== void 0 && _schemaObject$items.$ref) {
        var refObj = schemaObject.items.$ref.split('/');
        return {
          type: "".concat(refObj[refObj.length - 1], "[]")
        };
      }
      // TODO: 這裡需要解析出具體屬性，但由於 parser 層還不確定，所以暫時先返回 any
      return 'any[]';
    }
  }, {
    key: "resolveProperties",
    value: function resolveProperties(schemaObject) {
      return {
        props: [this.getProps(schemaObject)]
      };
    }
  }, {
    key: "resolveEnumObject",
    value: function resolveEnumObject(schemaObject) {
      var enumArray = schemaObject.enum;
      var enumStr;
      switch (this.config.enumStyle) {
        case 'enum':
          enumStr = "{".concat(enumArray === null || enumArray === void 0 ? void 0 : enumArray.map(function (v) {
            return "".concat(v, "=\"").concat(v, "\"");
          }).join(','), "}");
          break;
        case 'string-literal':
          enumStr = Array.from(new Set(enumArray === null || enumArray === void 0 ? void 0 : enumArray.map(function (v) {
            return typeof v === 'string' ? "\"".concat(v.replace(/"/g, '"'), "\"") : getType(v);
          }))).join(' | ');
          break;
        default:
          break;
      }
      return {
        isEnum: this.config.enumStyle == 'enum',
        type: Array.isArray(enumArray) ? enumStr : 'string'
      };
    }
  }, {
    key: "resolveAllOfObject",
    value: function resolveAllOfObject(schemaObject) {
      var _this7 = this;
      var props = (schemaObject.allOf || []).map(function (item) {
        return item.$ref ? [_objectSpread(_objectSpread({}, item), {}, {
          type: getType(item).split('/').pop()
        })] : _this7.getProps(item);
      });
      return {
        props: props
      };
    }

    /**
     * 將地址path路徑轉為大駝峰
     */
  }, {
    key: "genDefaultFunctionName",
    value: function genDefaultFunctionName(path, pathBasePrefix) {
      // 首字母轉大寫
      function toUpperFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
      }
      return path === null || path === void 0 ? void 0 : path.replace(pathBasePrefix, '').split('/').map(function (str) {
        // 兼容錯誤命名如 /user/:id/:name 因為是typeName，所以直接進行轉換
        var s = resolveTypeName(str);
        if (s.includes('-')) {
          s = s.replace(/(-\w)+/g, function (_match, p1) {
            return p1 === null || p1 === void 0 ? void 0 : p1.slice(1).toUpperCase();
          });
        }
        if (s.match(/^{.+}$/gim)) {
          return "By".concat(toUpperFirstLetter(s.slice(1, s.length - 1)));
        }
        return toUpperFirstLetter(s);
      }).join('');
    }

    /**
     * 檢測所有path重複區域（prefix）
     */
  }, {
    key: "getBasePrefix",
    value: function getBasePrefix(paths) {
      var arr = [];
      paths.map(function (item) {
        return item.split('/');
      }).forEach(function (pathItem) {
        pathItem.forEach(function (item, key) {
          if (arr.length <= key) {
            arr[key] = [];
          }
          arr[key].push(item);
        });
      });
      var res = [];
      arr.map(function (item) {
        return Array.from(new Set(item));
      }).every(function (item) {
        var b = item.length === 1;
        if (b) {
          res.push(item);
        }
        return b;
      });
      return "".concat(res.join('/'), "/");
    }
  }, {
    key: "resolveRefObject",
    value: function resolveRefObject(refObject) {
      if (!refObject || !refObject.$ref) {
        return refObject;
      }
      var refPaths = refObject.$ref.split('/');
      if (refPaths[0] === '#') {
        refPaths.shift();
        var obj = this.openAPIData;
        refPaths.forEach(function (node) {
          obj = obj[node];
        });
        if (!obj) {
          throw new Error("[GenSDK] Data Error! Notfoud: ".concat(refObject.$ref));
        }
        return _objectSpread(_objectSpread({}, this.resolveRefObject(obj)), {}, {
          type: obj.$ref ? this.resolveRefObject(obj).type : obj
        });
      }
      return refObject;
    }
  }, {
    key: "getFinalFileName",
    value: function getFinalFileName(s) {
      // 支援下劃線、中劃線和空格分隔符，注意分隔符列舉值的順序不能改變，否則正則匹配會報錯
      return s.replace(/[-_ ](\w)/g, function (_all, letter) {
        return letter.toUpperCase();
      });
    }
  }, {
    key: "replaceDot",
    value: function replaceDot(s) {
      return s.replace(/\./g, '_').replace(/[-_ ](\w)/g, function (_all, letter) {
        return letter.toUpperCase();
      });
    }
  }, {
    key: "resolveFunctionName",
    value: function resolveFunctionName(functionName, methodName) {
      // 類型宣告過濾關鍵字
      if (_reservedWords.default.check(functionName)) {
        return "".concat(functionName, "Using").concat(methodName.toUpperCase());
      }
      return functionName;
    }
  }]);
  return ServiceGenerator;
}();