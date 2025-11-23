import get from 'lodash/get';
import { utils, writeFile } from 'xlsx';

/**
 *
 * @param data 需要導出到excel的數據
 * @param title 文件名
 * @param headerMap 列標貼，{key字段名， value對應的中文列名稱
 * @param companyName 公司名稱
 */
export var exportExcel = function exportExcel(data, title, headerMap) {
  var workbook = utils.book_new();
  var formatedData = [];
  data.map(function (item) {
    if (headerMap) {
      var row = {};
      headerMap.forEach(function (header) {
        row[header.value] = get(item, header.key);
      });
      formatedData.push(row);
    } else {
      formatedData.push(item);
    }
  });
  var workSheet = utils.json_to_sheet(formatedData);
  workSheet['!cols'] = (headerMap || []).map(function () {
    return {
      wch: 16
    };
  });
  utils.book_append_sheet(workbook, workSheet, 'table1');
  writeFile(workbook, title + '.xlsx');
};