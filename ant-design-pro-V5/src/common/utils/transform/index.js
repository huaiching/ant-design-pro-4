function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { chain, forEach, isEmpty, isNumber, nth, reduce } from 'lodash';
import { findIndex } from 'lodash';
import { isNationalIdentificationNumberValid, isResidentCertificateNumberValid } from 'taiwan-id-validator';
export var sortToArray = function sortToArray(sort) {
  var initDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var defaultSort = arguments.length > 2 ? arguments[2] : undefined;
  var sortArr = [];
  if (sort && JSON.stringify(sort) !== '{}') {
    var keys = Object.keys(sort);
    for (var i = 0; i < keys.length; i++) {
      if (sort[keys[i]] === 'ascend') {
        sortArr.push({
          field: keys[i].replace(/,/g, '.'),
          direction: 'asc'
        });
      } else if (sort[keys[i]] === 'descend') {
        sortArr.push({
          field: keys[i].replace(/,/g, '.'),
          direction: 'desc'
        });
      }
    }
  } else {
    if (initDefault) {
      // sortArr.push({
      //   field: 'accessTrackInfo.updatedOn',
      //   direction: 'desc'
      // })
    } else if (defaultSort) {
      sortArr = defaultSort;
    }
  }
  return sortArr;
};

/**
 * 數值改成字符串，適用於excel讀取數值但接口需要字符串的情況
 */
export var transformNumber2String = function transformNumber2String(sourceObj) {
  var keys = Object.keys(sourceObj);
  keys.map(function (key) {
    sourceObj[key] = typeof sourceObj[key] === 'number' ? sourceObj[key].toString() : sourceObj[key];
  });
  return sourceObj;
};
export var transformColumnSort2Dxp = function transformColumnSort2Dxp(sort) {
  var ORDER_SORT = {
    ascend: 'asc',
    descend: 'desc'
  };
  var sorts = chain(sort).toPairs().map(function (s) {
    var order = s[1];
    var field = chain(s).head().replace(',', '.').value();
    if (order && field) {
      return {
        field: field,
        direction: ORDER_SORT[order]
      };
    }
    return null;
  }).compact().value();
  if (isEmpty(sorts)) {
    return [{
      field: 'contractNumber',
      direction: 'desc'
    }];
  }
  return sorts;
};

//過濾列表查詢條件，處理後空值字段不做返回
export var filterUsefulParams = function filterUsefulParams(params) {
  var obj = {};
  var nested = [];
  if (params && params.nested && params.nested.length > 0) {
    params.nested.map(function (item) {
      if (item && item.nested) {
        var res = filterUsefulParams(item);
        if (Object.keys(res).length !== 0) {
          nested.push(res);
        }
      } else {
        if (item.value || item.values && item.values.length > 0 || String(item.value) === '0' || item.value === false || ['NULL', 'NOT_NULL'].includes(item.queryOperator)) {
          nested.push(item);
        }
      }
    });
  }
  if (nested.length > 0) {
    obj.compoundOperator = params.compoundOperator;
    obj.nested = nested;
  }
  if (params && params.sorts) {
    obj.sorts = params.sorts;
  }
  return obj;
};
export var transformMoney2String = function transformMoney2String(money, formatMessage) {
  var unitMessageId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'common.money.unit';
  if (!isNumber(money)) {
    return '-';
  }
  var value = (Math.round(money * 100) / 100).toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ',';
    });
  });
  var arrayNum = value.split('.');
  var numberString = value.toString();
  if (arrayNum.length == 1) {
    numberString = value.toString() + '.00';
  }
  if (arrayNum.length > 1) {
    if (arrayNum[1].length < 2) {
      numberString = value.toString() + '0';
    }
  }
  return numberString + formatMessage({
    id: unitMessageId
  });
};
export var resolverGenderById = function resolverGenderById(id) {
  if (isNationalIdentificationNumberValid(id)) {
    return nth(id, 1) === '1' ? 'male' : 'female';
  }
  if (isResidentCertificateNumberValid(id)) {
    return nth(id, 1) === '8' ? 'male' : 'female';
  }
  return '';
};
export var percentFormatter = function percentFormatter(value) {
  return "".concat(value, "%");
};
export var percentParser = function percentParser(value) {
  return value === null || value === void 0 ? void 0 : value.replace('%', '');
};

// 千分位
export var thousandthFormatter = function thousandthFormatter(value) {
  if (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return value;
};
export var thousandthParser = function thousandthParser(value) {
  return value === null || value === void 0 ? void 0 : value.replace(/\$\s?|(,*)/g, '');
};

// 半角轉全角
export var toDBC = function toDBC(str) {
  var tmp = '';
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) == 32) {
      tmp = tmp + String.fromCharCode(12288);
    } else if (str.charCodeAt(i) < 127) {
      tmp = tmp + String.fromCharCode(str.charCodeAt(i) + 65248);
    } else {
      tmp += String.fromCharCode(str.charCodeAt(i));
    }
  }
  return tmp;
};

// 全角轉半角
export var toCDB = function toCDB(str) {
  var tmp = '';
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else {
      tmp += String.fromCharCode(str.charCodeAt(i));
    }
  }
  return tmp;
};

/*返回文件大小，UI展示*/
export var getFileSize = function getFileSize(value) {
  if (value) {
    var unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var index = 0;
    var srcsize = Number(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    var size = srcsize / Math.pow(1024, index);
    var resSize = size.toFixed(2); //保留的小数位数
    return resSize + unitArr[index];
  } else {
    return '0 Bytes';
  }
};

/*根据文件后缀名,文件对应iconfont图标名称*/
export var getFileIconByName = function getFileIconByName(name) {
  var iconName = 'icon-word';
  var nameArr = String(name).split('.');
  var fileType = nameArr[nameArr.length - 1];
  if (['xls', 'xlsx'].includes(fileType)) {
    iconName = 'icon-excel';
  } else if (['doc', 'docx'].includes(fileType)) {
    iconName = 'icon-word';
  } else if (['ppt', 'pptx'].includes(fileType)) {
    iconName = 'icon-ppt';
  } else if (['zip', 'rar', 'arj', 'gz', 'z'].includes(fileType)) {
    iconName = 'icon-zip';
  } else if (['txt'].includes(fileType)) {
    iconName = 'icon-txt';
  } else if (['pdf'].includes(fileType)) {
    iconName = 'icon-pdf';
  } else if (['bm', 'gif', 'jpg', 'jepg', 'pic', 'png', 'tif'].includes(fileType)) {
    iconName = 'icon-pic';
  }
  return iconName;
};

/*金额每三位加逗号*/
export var addDotFormat4Money = function addDotFormat4Money(money) {
  return (money || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
};

/*根据lookup的value获取对应的label*/
export var getLookupLabel = function getLookupLabel(lookup, value) {
  if (lookup && lookup.length > 0 && value) {
    var _lookup$findIndex;
    if (findIndex(lookup, function (item) {
      return item.value === value;
    }) === -1) {
      return value;
    }
    return (_lookup$findIndex = lookup[findIndex(lookup, function (item) {
      return item.value === value;
    })]) === null || _lookup$findIndex === void 0 ? void 0 : _lookup$findIndex.label;
  }
  return value;
};
export var fileTypes = ['3gp', 'avi', 'bmp', 'caf', 'csv', 'doc', 'docx', 'gif', 'html', 'jpg', 'mov', 'mp3', 'mp4', 'mp5', 'mp6', 'mp7', 'msg', 'pdf', 'png', 'ppt', 'tiff', 'txt', 'url', 'wav', 'wma', 'xdp', 'xls', 'xlsx', 'xml', 'zip'];
/*限制文件上傳類型*/
export var canFileTypeUpload = function canFileTypeUpload(fileList) {
  var limitFileTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fileTypes;
  var validateFlag = true;
  var unPassType = '';
  if (fileList && fileList.length > 0) {
    fileList.some(function (item) {
      var fileNameArr = item.name.split('.');
      var extension = fileNameArr[fileNameArr.length - 1];
      if (!limitFileTypes.includes(extension)) {
        validateFlag = false;
        unPassType = extension;
        return true;
      } else if (!item.type) {
        validateFlag = false;
        unPassType = '';
        return true;
      }
      return false;
    });
  }
  return {
    validateFlag: validateFlag,
    unPassType: unPassType
  };
};
/**
 * 扁平化樹狀結構
 */
export var treeDataFlatten = function treeDataFlatten() {
  var treeData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var fieldName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _fieldName$value = fieldName.value,
    value = _fieldName$value === void 0 ? 'value' : _fieldName$value,
    _fieldName$children = fieldName.children,
    children = _fieldName$children === void 0 ? 'children' : _fieldName$children;
  var flattenData = {};
  forEach(treeData, function (item) {
    var childrenArr = item[children];
    if (childrenArr) {
      var data = treeDataFlatten(childrenArr, fieldName);
      flattenData = _objectSpread(_objectSpread({}, flattenData), data);
      flattenData[item[value]] = item;
    } else {
      flattenData[item[value]] = item;
    }
  });
  return flattenData;
};
/**
 * 生成查詢條件對象，增加了date的處理（queryOperator='DATE')
 * @param arr [][field, queryOperator, value, dateValueTo]
 * @param compoundOperator
 * @returns
 */
export var generateFieldCriterion = function generateFieldCriterion(arr, compoundOperator) {
  return filterUsefulParams(reduce(arr, function (result, element) {
    var _element = _slicedToArray(element, 4),
      field = _element[0],
      queryOperator = _element[1],
      value = _element[2],
      dateValueTo = _element[3];
    if (queryOperator === 'DATE') {
      if (value && dateValueTo) {
        result.nested.push({
          field: field,
          queryOperator: 'BETWEEN',
          values: [value.format('YYYY-MM-DD'), dateValueTo.format('YYYY-MM-DD')]
        });
      } else {
        result.nested.push({
          field: field,
          queryOperator: 'GREATER_THAN',
          value: value === null || value === void 0 ? void 0 : value.format('YYYY-MM-DD')
        }, {
          field: field,
          queryOperator: 'LESS_THAN',
          value: dateValueTo === null || dateValueTo === void 0 ? void 0 : dateValueTo.format('YYYY-MM-DD')
        });
      }
    } else if (queryOperator === 'IN' || queryOperator === 'NOT_IN' || queryOperator === 'BETWEEN') {
      result.nested.push({
        field: field,
        queryOperator: queryOperator,
        values: value
      });
    } else if (queryOperator === 'SORT') {
      result.sorts.push({
        field: field,
        direction: value
      });
    } else {
      result.nested.push({
        field: field,
        queryOperator: queryOperator,
        value: value
      });
    }
    return result;
  }, {
    compoundOperator: compoundOperator || 'AND',
    nested: [],
    sorts: []
  }));
};

// 如果使用者想自己排序，則使用使用者的排序，否則使用預設的按建立時間排序
export var transformColumnSort2DxpDefault = function transformColumnSort2DxpDefault(sort, defaultColumn, defaultDirection) {
  var sorts = sortToArray(sort);
  var defaultSortColumn = defaultColumn || 'createdOn';
  var defaultSortDirection = defaultDirection || 'desc';
  if (isEmpty(sorts)) {
    return [{
      field: defaultSortColumn,
      direction: defaultSortDirection
    }];
  }
  return sorts;
};
export * from "./date";