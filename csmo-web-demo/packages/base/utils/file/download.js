/**
 * 將base64轉換爲blob對象
 * @param base64
 * @returns
 */
export var base64ToBlob = function base64ToBlob(base64) {
  var bytes = window.atob(base64);
  var ab = new ArrayBuffer(bytes.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab]);
};

/**
 * 下載文件
 * @param fileResponse
 * @param name
 */
export var downloadFile = function downloadFile(fileResponse, name, blobOption) {
  var bl = new Blob([fileResponse], blobOption);
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(bl);
  link.download = name;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(link.href);
};

/**
 * 文件讀取為base64格式或txt格式 Promise
 */
export var fileRead = function fileRead(file) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dataUrl';
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var _event$target;
      resolve((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.result);
    };
    reader.onerror = function (event) {
      reject(event);
    };
    if (type === 'text') {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  });
};