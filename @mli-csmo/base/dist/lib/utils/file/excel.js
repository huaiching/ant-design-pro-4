"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportExcel = void 0;
var _get = _interopRequireDefault(require("lodash/get"));
var _xlsx = require("xlsx");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 *
 * @param data 需要導出到excel的數據
 * @param title 文件名
 * @param headerMap 列標貼，{key字段名， value對應的中文列名稱
 * @param companyName 公司名稱
 */
var exportExcel = exports.exportExcel = function exportExcel(data, title, headerMap) {
  var workbook = _xlsx.utils.book_new();
  var formatedData = [];
  data.map(function (item) {
    if (headerMap) {
      var row = {};
      headerMap.forEach(function (header) {
        row[header.value] = (0, _get.default)(item, header.key);
      });
      formatedData.push(row);
    } else {
      formatedData.push(item);
    }
  });
  var workSheet = _xlsx.utils.json_to_sheet(formatedData);
  workSheet['!cols'] = (headerMap || []).map(function () {
    return {
      wch: 16
    };
  });
  _xlsx.utils.book_append_sheet(workbook, workSheet, 'table1');
  (0, _xlsx.writeFile)(workbook, title + '.xlsx');
};