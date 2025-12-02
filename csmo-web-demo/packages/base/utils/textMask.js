"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchData = switchData;
exports.switchText = void 0;
/*數據遮罩*/
var switchText = exports.switchText = {
  /*保單號碼*/
  policyNo: function policyNo() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var newText = String(text);
    return newText.replace(/(\w{4})\w{4}(\w+)/, '$1****$2');
  },
  /*姓名*/
  name: function name() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var newText = String(text);
    return newText.replace(/([\s\S])\S([\s\S]*)/, '$1○$2');
  },
  /*英文名*/
  englishName: function englishName() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var newText = String(text);
    return newText.replace(/(\w{2})\w{2}(\w*)/g, '$1**$2');
  },
  /*身份證號*/
  IDCard: function IDCard() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var newText = String(text);
    return newText.replace(/(\w*)\w{3}/, '$1***');
  },
  /*支票號碼*/
  checkNo: function checkNo() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var newText = String(text);
    return newText.replace(/(\w{7})\w{2}(\w+)/, '$1**$2');
  },
  /*匯款賬號*/
  remitNo: function remitNo() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var newText = String(text);
    return newText.replace(/(\w*)\w{3}/, '$1***');
  },
  /*信用卡號*/
  creditCardNo: function creditCardNo() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var newText = String(text);
    return newText.replace(/(\w{8})\w{6}(\w+)/, '$1******$2');
  },
  /*email*/
  email: function email() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var newText = String(text);
    return newText.replace(/\w{3}(?=@)/, '***');
  },
  /*手機號|電話號*/
  phone: function phone() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var newText = String(text);
    return newText.replace(/(\w*)\w{3}/, '$1***');
  },
  /*收費地址*/
  charge: function charge() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var newText = String(text);
    return newText.replace(/([\s\S]*)[\s\S]{8}/g, '$1********');
  },
  /*M報件碼*/
  mCode: function mCode() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var newText = String(text);
    return newText.replace(/(\w{2})\w{3}(\w+)/g, '$1***$2');
  }
};
/*遮罩數據轉換*/
function switchData(text, type) {
  if (!type) return text;
  return switchText[type](text);
}