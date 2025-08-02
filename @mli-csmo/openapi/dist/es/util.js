function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import path from 'path';
import fs from 'fs';
import * as prettier from 'prettier';
import { camelCase, upperFirst } from 'lodash';

// const { prettier: defaultPrettierOptions } = require('@umijs/fabric')

export var getAbsolutePath = function getAbsolutePath(filePath) {
  if (filePath && !path.isAbsolute(filePath)) {
    return path.join(process.cwd(), filePath);
  }
  return filePath;
};
export var mkdir = function mkdir(dir) {
  if (!fs.existsSync(dir)) {
    mkdir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
};
export var prettierFile = function prettierFile(content) {
  var result = content;
  var hasError = false;
  try {
    result = prettier.format(content, {
      // ...defaultPrettierOptions,
      semi: false,
      trailingComma: 'none',
      singleQuote: true,
      printWidth: 100,
      parser: 'typescript'
    });
  } catch (_error) {
    hasError = true;
  }
  return [result, hasError];
};
export var writeFile = function writeFile(folderPath, fileName, content) {
  var filePath = path.join(folderPath, fileName);
  mkdir(path.dirname(filePath));
  var _prettierFile = prettierFile(content),
    _prettierFile2 = _slicedToArray(_prettierFile, 2),
    prettierContent = _prettierFile2[0],
    hasError = _prettierFile2[1];
  fs.writeFileSync(filePath, prettierContent, {
    encoding: 'utf8'
  });
  return hasError;
};
export var getTagName = function getTagName(name) {
  var result = name.split('.');
  // 資料源中的 tag 等同於全量的 op API 名，確定為 4-5 段，如上格式 取中間的 1-2 段作為 tag，作為 serviceController 創建目錄的依據
  if (result.length === 4) {
    return result[2];
  }
  if (result.length === 5) {
    return result[2] + upperFirst(result[3]);
  }
  return name;
};

/**
 * 根據當前的資料源類型，對請求回來的 apiInfo 進行格式化
 * 如果是 op 資料源，對 tags 以及 path 中的 tags 進行處理
 * - before: 前綴（產品集.產品碼） + 操作對象（必填）+ 子操作對象（可選）+ 動作（必填）
 * - after: 操作對象（必填）+ 子操作對象（可選） ==> 駝峰
 */
export var formatApiInfo = function formatApiInfo(apiInfo) {
  if (!(apiInfo && apiInfo.schema.info && apiInfo.schema.info.extensions && apiInfo.schema.info.extensions['x-antTech-description'])) {
    // 非 OP 資料源，直接返回
    return apiInfo;
  }
  apiInfo.schema.tags = apiInfo.schema.tags.map(function (item) {
    return _objectSpread(_objectSpread({}, item), {}, {
      name: getTagName(item.name)
    });
  });
  for (var childPath in apiInfo.schema.paths) {
    apiInfo.schema.paths[childPath].post.tags = apiInfo.schema.paths[childPath].post.tags.map(function (tag) {
      return getTagName(tag);
    });
  }
  return apiInfo;
};
/**
 * 一方化場景下，由於 onex 會對請求的響應做處理
 *  1. 將 Response & Request 中的參數字段會變更為小駝峰寫法
 *  2. 另外要注意：
 *  op 返回的數據，請求參數的類型格式 需要做額外的處理
 *  - (name) key.n, (type) string  ==> key: string []
 *  - (name) key.m,  (type) string ===>  key: string []
 *  - (name) key.key1 , (type) string ==> key: {key1:string}
 *  - (name) key.n.key1 ,(type) string => key:{ key1 :string}[]
 *  - (name) key.n.key1.m,(type) string ==> key:{key1: string[]}[]
 */
export function formatParamsForYFH(params) {
  var paramsObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Object.keys(params).forEach(function (name) {
    var prop = params[name];
    var key = name;
    var nameList = name.split('.');
    var nameListLength = nameList.length;
    if (nameListLength === 1) {
      // 正常的 key
      paramsObject[key] = _objectSpread({}, prop);
    } else if (nameListLength === 2 && nameList[1] !== 'n' && nameList[1] !== 'm') {
      var _nameList = _slicedToArray(nameList, 1),
        childKey = _nameList[0];
      var keyChildKey = camelCase(nameList[1]);
      paramsObject[childKey] = combineParams(childKey, keyChildKey, prop, paramsObject);
    } else {
      if (nameList[nameListLength - 2] === 'n' || nameList[nameListLength - 2] === 'm') {
        var _childKey = camelCase(nameList.pop());
        nameList.pop();
        key = nameList.join('.');
        paramsObject[key] = combineParams(key, _childKey, prop, paramsObject, '.n.key');
      } else {
        var _childKey2 = camelCase(nameList.pop());
        key = nameList.join('.');
        if (_childKey2 === 'n' || _childKey2 === 'm') {
          if (nameList[nameList.length - 2] === 'n' || nameList[nameList.length - 2] === 'm') {
            var childChildKey = camelCase(nameList.pop());
            nameList.pop();
            key = nameList.join('.');
            paramsObject[key] = combineParams(key, childChildKey, prop, paramsObject, '.n.key.m');
          } else {
            prop.type = "".concat(prop.type, "[]");
            paramsObject[key] = _objectSpread({}, prop);
          }
        } else {
          paramsObject[key] = combineParams(key, _childKey2, prop, paramsObject);
        }
      }
    }
    paramsObject[key].name = camelCase(key);
  });
  var hasInvoke = Object.keys(paramsObject).filter(function (param) {
    return param.includes('.');
  }).length > 0;
  if (hasInvoke) {
    // 遞歸
    return formatParamsForYFH(paramsObject);
  }
  return paramsObject;
}
function combineParams(key, childKey, prop, paramsObject, type) {
  var typeSuffix = type === '.n.key.m' ? '[]' : '';
  var keySuffix = type === '.n.key' || type === '.n.key.m' ? '[]' : '';
  if (paramsObject[key]) {
    var childType = "{".concat(childKey, ":").concat(prop.type).concat(typeSuffix, ", ").concat(paramsObject[key].type.slice(1));
    paramsObject[key] = _objectSpread(_objectSpread({}, paramsObject[key]), {}, {
      type: childType
    });
  } else {
    paramsObject[key] = _objectSpread(_objectSpread({}, prop), {}, {
      type: "{".concat(childKey, ":").concat(prop.type, "\n      }").concat(keySuffix)
    });
  }
  return paramsObject[key];
}
export var stripDot = function stripDot(str) {
  return str.replace(/[-_ .](\w)/g, function (_all, letter) {
    return letter.toUpperCase();
  });
};