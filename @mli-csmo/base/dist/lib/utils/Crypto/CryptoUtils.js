"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
;
(function (root, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
    // CommonJS 模組系統
    module.exports = exports = factory();
  } else if (typeof define === "function" && define.amd) {
    // AMD 模組系統
    define([], factory);
  } else {
    // 瀏覽器全局變量
    root.CryptoJS = factory();
  }
})(void 0, function () {
  /*globals window, global, require*/

  /**
   * CryptoJS 核心組件
   */
  var CryptoJS = CryptoJS || function (Math, undefined) {
    var crypto;

    // 從 window 獲取原生加密對象 (瀏覽器環境)
    if (typeof window !== 'undefined' && window.crypto) {
      crypto = window.crypto;
    }

    // 在 Web Worker 中獲取原生加密對象 (瀏覽器環境)
    if (typeof self !== 'undefined' && self.crypto) {
      crypto = self.crypto;
    }

    // 從 globalThis 獲取原生加密對象
    if (typeof globalThis !== 'undefined' && globalThis.crypto) {
      crypto = globalThis.crypto;
    }

    // 從 window 獲取 IE 11 的原生加密對象 (實驗性)
    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
      crypto = window.msCrypto;
    }

    // 從 global 獲取原生加密對象 (NodeJS 環境)
    if (!crypto && typeof global !== 'undefined' && global.crypto) {
      crypto = global.crypto;
    }

    // 通過 require 導入原生加密模組 (NodeJS 環境)
    if (!crypto && typeof require === 'function') {
      try {
        crypto = require('crypto');
      } catch (err) {}
    }

    /*
     * 加密安全的偽隨機數生成器
     *
     * 由於 Math.random() 在加密方面不夠安全
     */
    var cryptoSecureRandomInt = function cryptoSecureRandomInt() {
      if (crypto) {
        // 使用 getRandomValues 方法 (瀏覽器環境)
        if (typeof crypto.getRandomValues === 'function') {
          try {
            return crypto.getRandomValues(new Uint32Array(1))[0];
          } catch (err) {}
        }

        // 使用 randomBytes 方法 (NodeJS 環境)
        if (typeof crypto.randomBytes === 'function') {
          try {
            return crypto.randomBytes(4).readInt32LE();
          } catch (err) {}
        }
      }
      throw new Error('無法使用原生加密模組獲取安全隨機數');
    };

    /*
     * Object.create 的本地 polyfill
     */
    var create = Object.create || function () {
      function F() {}
      return function (obj) {
        var subtype;
        F.prototype = obj;
        subtype = new F();
        F.prototype = null;
        return subtype;
      };
    }();

    /**
     * CryptoJS 命名空間
     */
    var C = {};

    /**
     * 庫命名空間
     */
    var C_lib = C.lib = {};

    /**
     * 用於原型繼承的基礎對象
     */
    var Base = C_lib.Base = function () {
      return {
        /**
         * 創建一個繼承自當前對象的新對象
         *
         * @param {Object} overrides 要複製到新對象中的屬性
         *
         * @return {Object} 新創建的對象
         *
         * @static
         *
         * @example
         *
         *     var MyType = CryptoJS.lib.Base.extend({
         *         field: 'value',
         *
         *         method: function () {
         *         }
         *     });
         */
        extend: function extend(overrides) {
          // 創建子類型
          var subtype = create(this);

          // 添加覆寫屬性
          if (overrides) {
            subtype.mixIn(overrides);
          }

          // 創建默認初始化器
          if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
            subtype.init = function () {
              subtype.$super.init.apply(this, arguments);
            };
          }

          // 初始化器的原型是子類型對象
          subtype.init.prototype = subtype;

          // 引用父類型
          subtype.$super = this;
          return subtype;
        },
        /**
         * 擴展此對象並運行 init 方法
         * 傳遞給 create() 的參數將傳遞給 init()
         *
         * @return {Object} 新創建的對象
         *
         * @static
         *
         * @example
         *
         *     var instance = MyType.create();
         */
        create: function create() {
          var instance = this.extend();
          instance.init.apply(instance, arguments);
          return instance;
        },
        /**
         * 初始化新創建的對象
         * 重寫此方法以在對象創建時添加邏輯
         *
         * @example
         *
         *     var MyType = CryptoJS.lib.Base.extend({
         *         init: function () {
         *             // ...
         *         }
         *     });
         */
        init: function init() {},
        /**
         * 將屬性混入當前對象
         *
         * @param {Object} properties 要混入的屬性
         *
         * @example
         *
         *     MyType.mixIn({
         *         field: 'value'
         *     });
         */
        mixIn: function mixIn(properties) {
          for (var propertyName in properties) {
            if (properties.hasOwnProperty(propertyName)) {
              this[propertyName] = properties[propertyName];
            }
          }

          // IE 不會通過上述循環複製 toString
          if (properties.hasOwnProperty('toString')) {
            this.toString = properties.toString;
          }
        },
        /**
         * 創建此對象的副本
         *
         * @return {Object} 克隆的對象
         *
         * @example
         *
         *     var clone = instance.clone();
         */
        clone: function clone() {
          return this.init.prototype.extend(this);
        }
      };
    }();

    /**
     * 32位字組成的數組
     *
     * @property {Array} words 32位字的數組
     * @property {number} sigBytes 此字數組中的有效字節數
     */
    var WordArray = C_lib.WordArray = Base.extend({
      /**
       * 初始化新創建的字數組
       *
       * @param {Array} words (可選) 32位字的數組
       * @param {number} sigBytes (可選) 字中的有效字節數
       *
       * @example
       *
       *     var wordArray = CryptoJS.lib.WordArray.create();
       *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
       *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
       */
      init: function init(words, sigBytes) {
        words = this.words = words || [];
        if (sigBytes != undefined) {
          this.sigBytes = sigBytes;
        } else {
          this.sigBytes = words.length * 4;
        }
      },
      /**
       * 將此字數組轉換為字符串
       *
       * @param {Encoder} encoder (可選) 要使用的編碼策略。默認: CryptoJS.enc.Hex
       *
       * @return {string} 字符串化的字數組
       *
       * @example
       *
       *     var string = wordArray + '';
       *     var string = wordArray.toString();
       *     var string = wordArray.toString(CryptoJS.enc.Utf8);
       */
      toString: function toString(encoder) {
        return (encoder || Hex).stringify(this);
      },
      /**
       * 將一個字數組連接到此字數組
       *
       * @param {WordArray} wordArray 要追加的字數組
       *
       * @return {WordArray} 此字數組
       *
       * @example
       *
       *     wordArray1.concat(wordArray2);
       */
      concat: function concat(wordArray) {
        // 變量設定
        var thisWords = this.words;
        var thatWords = wordArray.words;
        var thisSigBytes = this.sigBytes;
        var thatSigBytes = wordArray.sigBytes;

        // 截斷多餘位
        this.clamp();

        // 連接
        if (thisSigBytes % 4) {
          // 一次複製一個字節
          for (var i = 0; i < thatSigBytes; i++) {
            var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
            thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
          }
        } else {
          // 一次複製一個字
          for (var j = 0; j < thatSigBytes; j += 4) {
            thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
          }
        }
        this.sigBytes += thatSigBytes;

        // 支持鏈式調用
        return this;
      },
      /**
       * 移除無效位
       *
       * @example
       *
       *     wordArray.clamp();
       */
      clamp: function clamp() {
        // 變量設定
        var words = this.words;
        var sigBytes = this.sigBytes;

        // 截斷
        words[sigBytes >>> 2] &= 0xffffffff << 32 - sigBytes % 4 * 8;
        words.length = Math.ceil(sigBytes / 4);
      },
      /**
       * 創建此字數組的副本
       *
       * @return {WordArray} 克隆的字數組
       *
       * @example
       *
       *     var clone = wordArray.clone();
       */
      clone: function clone() {
        var clone = Base.clone.call(this);
        clone.words = this.words.slice(0);
        return clone;
      },
      /**
       * 創建填充隨機字節的字數組
       *
       * @param {number} nBytes 要生成的隨機字節數
       *
       * @return {WordArray} 隨機字數組
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.lib.WordArray.random(16);
       */
      random: function random(nBytes) {
        var words = [];
        for (var i = 0; i < nBytes; i += 4) {
          words.push(cryptoSecureRandomInt());
        }
        return new WordArray.init(words, nBytes);
      }
    });

    /**
     * 編碼器命名空間
     */
    var C_enc = C.enc = {};

    /**
     * 十六進制編碼策略
     */
    var Hex = C_enc.Hex = {
      /**
       * 將字數組轉換為十六進制字符串
       *
       * @param {WordArray} wordArray 字數組
       *
       * @return {string} 十六進制字符串
       *
       * @static
       *
       * @example
       *
       *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
       */
      stringify: function stringify(wordArray) {
        // 變量設定
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // 轉換
        var hexChars = [];
        for (var i = 0; i < sigBytes; i++) {
          var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
          hexChars.push((bite >>> 4).toString(16));
          hexChars.push((bite & 0x0f).toString(16));
        }
        return hexChars.join('');
      },
      /**
       * 將十六進制字符串轉換為字數組
       *
       * @param {string} hexStr 十六進制字符串
       *
       * @return {WordArray} 字數組
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
       */
      parse: function parse(hexStr) {
        // 變量設定
        var hexStrLength = hexStr.length;

        // 轉換
        var words = [];
        for (var i = 0; i < hexStrLength; i += 2) {
          words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
        }
        return new WordArray.init(words, hexStrLength / 2);
      }
    };

    /**
     * Latin1 編碼策略
     */
    var Latin1 = C_enc.Latin1 = {
      /**
       * 將字數組轉換為 Latin1 字符串
       *
       * @param {WordArray} wordArray 字數組
       *
       * @return {string} Latin1 字符串
       *
       * @static
       *
       * @example
       *
       *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
       */
      stringify: function stringify(wordArray) {
        // 變量設定
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // 轉換
        var latin1Chars = [];
        for (var i = 0; i < sigBytes; i++) {
          var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
          latin1Chars.push(String.fromCharCode(bite));
        }
        return latin1Chars.join('');
      },
      /**
       * 將 Latin1 字符串轉換為字數組
       *
       * @param {string} latin1Str Latin1 字符串
       *
       * @return {WordArray} 字數組
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
       */
      parse: function parse(latin1Str) {
        // 變量設定
        var latin1StrLength = latin1Str.length;

        // 轉換
        var words = [];
        for (var i = 0; i < latin1StrLength; i++) {
          words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << 24 - i % 4 * 8;
        }
        return new WordArray.init(words, latin1StrLength);
      }
    };

    /**
     * UTF-8 編碼策略
     */
    var Utf8 = C_enc.Utf8 = {
      /**
       * 將字數組轉換為 UTF-8 字符串
       *
       * @param {WordArray} wordArray 字數組
       *
       * @return {string} UTF-8 字符串
       *
       * @static
       *
       * @example
       *
       *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
       */
      stringify: function stringify(wordArray) {
        try {
          return decodeURIComponent(escape(Latin1.stringify(wordArray)));
        } catch (e) {
          throw new Error('格式錯誤的 UTF-8 數據');
        }
      },
      /**
       * 將 UTF-8 字符串轉換為字數組
       *
       * @param {string} utf8Str UTF-8 字符串
       *
       * @return {WordArray} 字數組
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
       */
      parse: function parse(utf8Str) {
        return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
      }
    };

    /**
     * 抽象緩衝區塊算法模板
     *
     * 具體子類型必須實現 blockSize 屬性
     *
     * @property {number} _minBufferSize 應在緩衝區中保持未處理的塊數。默認: 0
     */
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
      /**
       * 將此塊算法的數據緩衝區重置為初始狀態
       *
       * @example
       *
       *     bufferedBlockAlgorithm.reset();
       */
      reset: function reset() {
        // 初始值
        this._data = new WordArray.init();
        this._nDataBytes = 0;
      },
      /**
       * 向此塊算法的緩衝區添加新數據
       *
       * @param {WordArray|string} data 要追加的數據。字符串使用 UTF-8 轉換為 WordArray
       *
       * @example
       *
       *     bufferedBlockAlgorithm._append('data');
       *     bufferedBlockAlgorithm._append(wordArray);
       */
      _append: function _append(data) {
        // 將字符串轉換為 WordArray，否則假設已經是 WordArray
        if (typeof data == 'string') {
          data = Utf8.parse(data);
        }

        // 追加
        this._data.concat(data);
        this._nDataBytes += data.sigBytes;
      },
      /**
       * 處理可用數據塊
       *
       * 此方法調用 _doProcessBlock(offset)，必須由具體子類型實現
       *
       * @param {boolean} doFlush 是否處理所有塊和部分塊
       *
       * @return {WordArray} 處理後的數據
       *
       * @example
       *
       *     var processedData = bufferedBlockAlgorithm._process();
       *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
       */
      _process: function _process(doFlush) {
        var processedWords;

        // 變量設定
        var data = this._data;
        var dataWords = data.words;
        var dataSigBytes = data.sigBytes;
        var blockSize = this.blockSize;
        var blockSizeBytes = blockSize * 4;

        // 計算準備好的塊數
        var nBlocksReady = dataSigBytes / blockSizeBytes;
        if (doFlush) {
          // 向上取整以包含部分塊
          nBlocksReady = Math.ceil(nBlocksReady);
        } else {
          // 向下取整只包含完整塊，
          // 減去必須保留在緩衝區中的塊數
          nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
        }

        // 計算準備好的字數
        var nWordsReady = nBlocksReady * blockSize;

        // 計算準備好的字節數
        var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

        // 處理塊
        if (nWordsReady) {
          for (var offset = 0; offset < nWordsReady; offset += blockSize) {
            // 執行具體算法邏輯
            this._doProcessBlock(dataWords, offset);
          }

          // 移除已處理的字
          processedWords = dataWords.splice(0, nWordsReady);
          data.sigBytes -= nBytesReady;
        }

        // 返回處理後的字
        return new WordArray.init(processedWords, nBytesReady);
      },
      /**
       * 創建此對象的副本
       *
       * @return {Object} 克隆的對象
       *
       * @example
       *
       *     var clone = bufferedBlockAlgorithm.clone();
       */
      clone: function clone() {
        var clone = Base.clone.call(this);
        clone._data = this._data.clone();
        return clone;
      },
      _minBufferSize: 0
    });

    /**
     * 抽象哈希器模板
     *
     * @property {number} blockSize 此哈希器操作的32位字數。默認: 16 (512位)
     */
    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
      /**
       * 配置選項
       */
      cfg: Base.extend(),
      /**
       * 初始化新創建的哈希器
       *
       * @param {Object} cfg (可選) 用於此哈希計算的配置選項
       *
       * @example
       *
       *     var hasher = CryptoJS.algo.SHA256.create();
       */
      init: function init(cfg) {
        // 應用配置默認值
        this.cfg = this.cfg.extend(cfg);

        // 設置初始值
        this.reset();
      },
      /**
       * 將此哈希器重置為初始狀態
       *
       * @example
       *
       *     hasher.reset();
       */
      reset: function reset() {
        // 重置數據緩衝區
        BufferedBlockAlgorithm.reset.call(this);

        // 執行具體哈希器邏輯
        this._doReset();
      },
      /**
       * 使用消息更新此哈希器
       *
       * @param {WordArray|string} messageUpdate 要追加的消息
       *
       * @return {Hasher} 此哈希器
       *
       * @example
       *
       *     hasher.update('message');
       *     hasher.update(wordArray);
       */
      update: function update(messageUpdate) {
        // 追加
        this._append(messageUpdate);

        // 更新哈希
        this._process();

        // 支持鏈式調用
        return this;
      },
      /**
       * 完成哈希計算
       * 注意 finalize 操作實際上是一個破壞性的、一次性讀取操作
       *
       * @param {WordArray|string} messageUpdate (可選) 最後的消息更新
       *
       * @return {WordArray} 哈希值
       *
       * @example
       *
       *     var hash = hasher.finalize();
       *     var hash = hasher.finalize('message');
       *     var hash = hasher.finalize(wordArray);
       */
      finalize: function finalize(messageUpdate) {
        // 最後的消息更新
        if (messageUpdate) {
          this._append(messageUpdate);
        }

        // 執行具體哈希器邏輯
        var hash = this._doFinalize();
        return hash;
      },
      blockSize: 512 / 32,
      /**
       * 創建一個快捷函數到哈希器的對象接口
       *
       * @param {Hasher} hasher 要創建幫助函數的哈希器
       *
       * @return {Function} 快捷函數
       *
       * @static
       *
       * @example
       *
       *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
       */
      _createHelper: function _createHelper(hasher) {
        return function (message, cfg) {
          return new hasher.init(cfg).finalize(message);
        };
      },
      /**
       * 創建一個快捷函數到 HMAC 的對象接口
       *
       * @param {Hasher} hasher 在此 HMAC 幫助函數中使用的哈希器
       *
       * @return {Function} 快捷函數
       *
       * @static
       *
       * @example
       *
       *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
       */
      _createHmacHelper: function _createHmacHelper(hasher) {
        return function (message, key) {
          return new C_algo.HMAC.init(hasher, key).finalize(message);
        };
      }
    });

    /**
     * 算法命名空間
     */
    var C_algo = C.algo = {};
    return C;
  }(Math);
  (function (undefined) {
    // 變量設定
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var X32WordArray = C_lib.WordArray;

    /**
     * x64 命名空間。
     */
    var C_x64 = C.x64 = {};

    /**
     * 64 位元字。
     */
    var X64Word = C_x64.Word = Base.extend({
      /**
       * 初始化新建立的 64 位元字。
       *
       * @param {number} high 高 32 位元。
       * @param {number} low 低 32 位元。
       *
       * @example
       *
       *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
       */
      init: function init(high, low) {
        this.high = high;
        this.low = low;
      }

      /**
       * 對此字進行位元 NOT 運算。
       *
       * @return {X64Word} 執行 NOT 運算後的新 x64-Word 物件。
       *
       * @example
       *
       *     var negated = x64Word.not();
       */
      // not: function () {
      //     var high = ~this.high;
      //     var low = ~this.low;

      //     return X64Word.create(high, low);
      // },

      /**
       * 對此字進行位元 AND 運算。
       *
       * @param {X64Word} word 要與此字進行 AND 運算的 x64-Word 物件。
       *
       * @return {X64Word} 執行 AND 運算後的新 x64-Word 物件。
       *
       * @example
       *
       *     var anded = x64Word.and(anotherX64Word);
       */
      // and: function (word) {
      //     var high = this.high & word.high;
      //     var low = this.low & word.low;

      //     return X64Word.create(high, low);
      // },

      /**
       * 對此字進行位元 OR 運算。
       *
       * @param {X64Word} word 要與此字進行 OR 運算的 x64-Word 物件。
       *
       * @return {X64Word} 執行 OR 運算後的新 x64-Word 物件。
       *
       * @example
       *
       *     var ored = x64Word.or(anotherX64Word);
       */
      // or: function (word) {
      //     var high = this.high | word.high;
      //     var low = this.low | word.low;

      //     return X64Word.create(high, low);
      // },

      /**
       * 對此字進行位元 XOR 運算。
       *
       * @param {X64Word} word 要與此字進行 XOR 運算的 x64-Word 物件。
       *
       * @return {X64Word} 執行 XOR 運算後的新 x64-Word 物件。
       *
       * @example
       *
       *     var xored = x64Word.xor(anotherX64Word);
       */
      // xor: function (word) {
      //     var high = this.high ^ word.high;
      //     var low = this.low ^ word.low;

      //     return X64Word.create(high, low);
      // },

      /**
       * 將此字向左移位 n 位元。
       *
       * @param {number} n 要移位的位元數。
       *
       * @return {X64Word} 執行左移位後的新 x64-Word 物件。
       *
       * @example
       *
       *     var shifted = x64Word.shiftL(25);
       */
      // shiftL: function (n) {
      //     if (n < 32) {
      //         var high = (this.high << n) | (this.low >>> (32 - n));
      //         var low = this.low << n;
      //     } else {
      //         var high = this.low << (n - 32);
      //         var low = 0;
      //     }

      //     return X64Word.create(high, low);
      // },

      /**
       * 將此字向右移位 n 位元。
       *
       * @param {number} n 要移位的位元數。
       *
       * @return {X64Word} 執行右移位後的新 x64-Word 物件。
       *
       * @example
       *
       *     var shifted = x64Word.shiftR(7);
       */
      // shiftR: function (n) {
      //     if (n < 32) {
      //         var low = (this.low >>> n) | (this.high << (32 - n));
      //         var high = this.high >>> n;
      //     } else {
      //         var low = this.high >>> (n - 32);
      //         var high = 0;
      //     }

      //     return X64Word.create(high, low);
      // },

      /**
       * 將此字向左旋轉 n 位元。
       *
       * @param {number} n 要旋轉的位元數。
       *
       * @return {X64Word} 執行左旋轉後的新 x64-Word 物件。
       *
       * @example
       *
       *     var rotated = x64Word.rotL(25);
       */
      // rotL: function (n) {
      //     return this.shiftL(n).or(this.shiftR(64 - n));
      // },

      /**
       * 將此字向右旋轉 n 位元。
       *
       * @param {number} n 要旋轉的位元數。
       *
       * @return {X64Word} 執行右旋轉後的新 x64-Word 物件。
       *
       * @example
       *
       *     var rotated = x64Word.rotR(7);
       */
      // rotR: function (n) {
      //     return this.shiftR(n).or(this.shiftL(64 - n));
      // },

      /**
       * 將此字與傳入的字相加。
       *
       * @param {X64Word} word 要與此字相加的 x64-Word 物件。
       *
       * @return {X64Word} 相加後的新 x64-Word 物件。
       *
       * @example
       *
       *     var added = x64Word.add(anotherX64Word);
       */
      // add: function (word) {
      //     var low = (this.low + word.low) | 0;
      //     var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
      //     var high = (this.high + word.high + carry) | 0;

      //     return X64Word.create(high, low);
      // }
    });

    /**
     * 64 位元字的陣列。
     *
     * @property {Array} words 64 位元字的陣列。
     * @property {number} sigBytes 陣列中有效位元的數量。
     */
    var X64WordArray = C_x64.WordArray = Base.extend({
      /**
       * 初始化新建立的字數組。
       *
       * @param {Array} words (選擇性) 64 位元字的陣列。
       * @param {number} sigBytes (選擇性) 陣列中有效位元的數量。
       *
       * @example
       *
       *     var wordArray = CryptoJS.x64.WordArray.create();
       *
       *     var wordArray = CryptoJS.x64.WordArray.create([
       *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
       *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
       *     ]);
       *
       *     var wordArray = CryptoJS.x64.WordArray.create([
       *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
       *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
       *     ], 10);
       */
      init: function init(words, sigBytes) {
        words = this.words = words || [];
        if (sigBytes != undefined) {
          this.sigBytes = sigBytes;
        } else {
          this.sigBytes = words.length * 8;
        }
      },
      /**
       * 將此 64 位元字數組轉換為 32 位元字數組。
       *
       * @return {CryptoJS.lib.WordArray} 此字數組的資料作為 32 位元字數組。
       *
       * @example
       *
       *     var x32WordArray = x64WordArray.toX32();
       */
      toX32: function toX32() {
        // 變量設定
        var x64Words = this.words;
        var x64WordsLength = x64Words.length;

        // 轉換
        var x32Words = [];
        for (var i = 0; i < x64WordsLength; i++) {
          var x64Word = x64Words[i];
          x32Words.push(x64Word.high);
          x32Words.push(x64Word.low);
        }
        return X32WordArray.create(x32Words, this.sigBytes);
      },
      /**
       * 創建此字數組的複製。
       *
       * @return {X64WordArray} 複製的字數組。
       *
       * @example
       *
       *     var clone = x64WordArray.clone();
       */
      clone: function clone() {
        var clone = Base.clone.call(this);

        // 複製 "words" 陣列
        var words = clone.words = this.words.slice(0);

        // 複製每個 X64Word 物件
        var wordsLength = words.length;
        for (var i = 0; i < wordsLength; i++) {
          words[i] = words[i].clone();
        }
        return clone;
      }
    });
  })();
  (function () {
    // 檢查是否支援 Typed Arrays
    if (typeof ArrayBuffer != 'function') {
      return;
    }

    // 變量設定
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;

    // 參考原始的 init 方法
    var superInit = WordArray.init;

    // 增強 WordArray.init 以處理 Typed Arrays
    var subInit = WordArray.init = function (typedArray) {
      // 將緩衝區轉換為 Uint8Array
      if (typedArray instanceof ArrayBuffer) {
        typedArray = new Uint8Array(typedArray);
      }

      // 將其他陣列視圖轉換為 Uint8Array
      if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
        typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
      }

      // 處理 Uint8Array
      if (typedArray instanceof Uint8Array) {
        // 變量設定
        var typedArrayByteLength = typedArray.byteLength;

        // 提取位元
        var words = [];
        for (var i = 0; i < typedArrayByteLength; i++) {
          words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
        }

        // 初始化此字數組
        superInit.call(this, words, typedArrayByteLength);
      } else {
        // 否則呼叫正常的 init 方法
        superInit.apply(this, arguments);
      }
    };

    // 設定 subInit 的原型為 WordArray
    subInit.prototype = WordArray;
  })();
  (function () {
    // 變量設定
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;

    /**
     * UTF-16 BE 編碼策略。
     */
    var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
      /**
       * 將字數組轉換為 UTF-16 BE 字符串。
       *
       * @param {WordArray} wordArray 字數組。
       *
       * @return {string} UTF-16 BE 字符串。
       *
       * @static
       *
       * @example
       *
       *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
       */
      stringify: function stringify(wordArray) {
        // 變量設定
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // 轉換
        var utf16Chars = [];
        for (var i = 0; i < sigBytes; i += 2) {
          // 從 words 陣列中取出字，並根據索引 i 取出相應的 16 位元字元
          var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 0xffff;
          // 將取出的 16 位元字元轉換為字元，並加入 utf16Chars 陣列
          utf16Chars.push(String.fromCharCode(codePoint));
        }

        // 將陣列中的字元連接成一個字串並返回
        return utf16Chars.join('');
      },
      /**
       * 將 UTF-16 BE 字符串轉換為字數組。
       *
       * @param {string} utf16Str UTF-16 BE 字符串。
       *
       * @return {WordArray} 字數組。
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
       */
      parse: function parse(utf16Str) {
        // 變量設定
        var utf16StrLength = utf16Str.length;

        // 轉換
        var words = [];
        for (var i = 0; i < utf16StrLength; i++) {
          // 將字串中的每個字元轉換為 Unicode 編碼，並根據索引 i 將其放入 words 陣列中
          words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
        }

        // 創建並返回一個新的 WordArray 物件
        return WordArray.create(words, utf16StrLength * 2);
      }
    };

    /**
     * UTF-16 LE 編碼策略。
     */
    C_enc.Utf16LE = {
      /**
       * 將字數組轉換為 UTF-16 LE 字符串。
       *
       * @param {WordArray} wordArray 字數組。
       *
       * @return {string} UTF-16 LE 字符串。
       *
       * @static
       *
       * @example
       *
       *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
       */
      stringify: function stringify(wordArray) {
        // 變量設定
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // 轉換
        var utf16Chars = [];
        for (var i = 0; i < sigBytes; i += 2) {
          // 從 words 陣列中取出字，並根據索引 i 取出相應的 16 位元字元
          var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 0xffff);
          // 將取出的 16 位元字元轉換為字元，並加入 utf16Chars 陣列
          utf16Chars.push(String.fromCharCode(codePoint));
        }

        // 將陣列中的字元連接成一個字串並返回
        return utf16Chars.join('');
      },
      /**
       * 將 UTF-16 LE 字符串轉換為字數組。
       *
       * @param {string} utf16Str UTF-16 LE 字符串。
       *
       * @return {WordArray} 字數組。
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
       */
      parse: function parse(utf16Str) {
        // 變量設定
        var utf16StrLength = utf16Str.length;

        // 轉換
        var words = [];
        for (var i = 0; i < utf16StrLength; i++) {
          // 將字串中的每個字元轉換為 Unicode 編碼，並根據索引 i 將其放入 words 陣列中
          words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
        }

        // 創建並返回一個新的 WordArray 物件
        return WordArray.create(words, utf16StrLength * 2);
      }
    };

    /**
     * 交換字元的高低位元。
     *
     * @param {number} word 要交換的字。
     *
     * @return {number} 交換後的字。
     */
    function swapEndian(word) {
      // 將字的高低位元交換
      return word << 8 & 0xff00ff00 | word >>> 8 & 0x00ff00ff;
    }
  })();
  (function () {
    // 變量設定
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;

    /**
     * Base64 編碼策略。
     */
    var Base64 = C_enc.Base64 = {
      /**
       * 將字數組轉換為 Base64 字符串。
       *
       * @param {WordArray} wordArray 字數組。
       *
       * @return {string} Base64 字符串。
       *
       * @static
       *
       * @example
       *
       *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
       */
      stringify: function stringify(wordArray) {
        // 變量設定
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;
        var map = this._map;

        // 截斷多餘的位元
        wordArray.clamp();

        // 轉換
        var base64Chars = [];
        for (var i = 0; i < sigBytes; i += 3) {
          // 從 words 陣列中取出字，並根據索引 i 取出相應的 8 位元字元
          var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
          var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 0xff;
          var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 0xff;

          // 將三個 8 位元字元組合成一個 24 位元的三元組
          var triplet = byte1 << 16 | byte2 << 8 | byte3;

          // 將三元組轉換為 Base64 字元，並加入 base64Chars 陣列
          for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
            base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 0x3f));
          }
        }

        // 添加填充字元
        var paddingChar = map.charAt(64);
        if (paddingChar) {
          while (base64Chars.length % 4) {
            base64Chars.push(paddingChar);
          }
        }

        // 將陣列中的字元連接成一個字串並返回
        return base64Chars.join('');
      },
      /**
       * 將 Base64 字符串轉換為字數組。
       *
       * @param {string} base64Str Base64 字符串。
       *
       * @return {WordArray} 字數組。
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
       */
      parse: function parse(base64Str) {
        // 變量設定
        var base64StrLength = base64Str.length;
        var map = this._map;
        var reverseMap = this._reverseMap;

        // 如果 reverseMap 尚未建立，則建立之
        if (!reverseMap) {
          reverseMap = this._reverseMap = [];
          for (var j = 0; j < map.length; j++) {
            reverseMap[map.charCodeAt(j)] = j;
          }
        }

        // 忽略填充字元
        var paddingChar = map.charAt(64);
        if (paddingChar) {
          var paddingIndex = base64Str.indexOf(paddingChar);
          if (paddingIndex !== -1) {
            base64StrLength = paddingIndex;
          }
        }

        // 轉換
        return parseLoop(base64Str, base64StrLength, reverseMap);
      },
      // Base64 字符映射表
      _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    };

    /**
     * 解析 Base64 字符串並轉換為字數組。
     *
     * @param {string} base64Str Base64 字符串。
     * @param {number} base64StrLength Base64 字符串的有效長度。
     * @param {Array} reverseMap 反向映射表。
     *
     * @return {WordArray} 字數組。
     */
    function parseLoop(base64Str, base64StrLength, reverseMap) {
      var words = [];
      var nBytes = 0;
      for (var i = 0; i < base64StrLength; i++) {
        if (i % 4) {
          // 從 reverseMap 中取出 Base64 字符對應的值
          var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
          var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
          // 將取出的值組合成一個 24 位元的三元組
          var bitsCombined = bits1 | bits2;
          // 將三元組放入 words 陣列中
          words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
          nBytes++;
        }
      }
      // 創建並返回一個新的 WordArray 物件
      return WordArray.create(words, nBytes);
    }
  })();
  (function () {
    // 變量設定
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;

    /**
     * Base64url 編碼策略。
     */
    var Base64url = C_enc.Base64url = {
      /**
       * 將字數組轉換為 Base64url 字符串。
       *
       * @param {WordArray} wordArray 字數組。
       *
       * @param {boolean} urlSafe 是否使用 URL 安全字符集
       *
       * @return {string} Base64url 字符串。
       *
       * @static
       *
       * @example
       *
       *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);
       */
      stringify: function stringify(wordArray) {
        var urlSafe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        // 變量設定
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;
        // 根據 urlSafe 參數選擇使用安全或標準的 Base64 字符映射表
        var map = urlSafe ? this._safe_map : this._map;

        // 截斷多餘的位元
        wordArray.clamp();

        // 轉換
        var base64Chars = [];
        for (var i = 0; i < sigBytes; i += 3) {
          // 從 words 陣列中取出字，並根據索引 i 取出相應的 8 位元字元
          var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
          var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 0xff;
          var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 0xff;

          // 將三個 8 位元字元組合成一個 24 位元的三元組
          var triplet = byte1 << 16 | byte2 << 8 | byte3;

          // 將三元組轉換為 Base64 字元，並加入 base64Chars 陣列
          for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
            base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 0x3f));
          }
        }

        // 添加填充字元
        var paddingChar = map.charAt(64);
        if (paddingChar) {
          while (base64Chars.length % 4) {
            base64Chars.push(paddingChar);
          }
        }

        // 將陣列中的字元連接成一個字串並返回
        return base64Chars.join('');
      },
      /**
       * 將 Base64url 字符串轉換為字數組。
       *
       * @param {string} base64Str Base64url 字符串。
       *
       * @param {boolean} urlSafe 是否使用 URL 安全字符集
       *
       * @return {WordArray} 字數組。
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);
       */
      parse: function parse(base64Str) {
        var urlSafe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        // 變量設定
        var base64StrLength = base64Str.length;
        // 根據 urlSafe 參數選擇使用安全或標準的 Base64 字符映射表
        var map = urlSafe ? this._safe_map : this._map;
        var reverseMap = this._reverseMap;

        // 如果 reverseMap 尚未建立，則建立之
        if (!reverseMap) {
          reverseMap = this._reverseMap = [];
          for (var j = 0; j < map.length; j++) {
            reverseMap[map.charCodeAt(j)] = j;
          }
        }

        // 忽略填充字元
        var paddingChar = map.charAt(64);
        if (paddingChar) {
          var paddingIndex = base64Str.indexOf(paddingChar);
          if (paddingIndex !== -1) {
            base64StrLength = paddingIndex;
          }
        }

        // 轉換
        return parseLoop(base64Str, base64StrLength, reverseMap);
      },
      // 標準 Base64 字符映射表
      _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      // URL 安全的 Base64 字符映射表
      _safe_map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
    };

    /**
     * 解析 Base64url 字符串並轉換為字數組。
     *
     * @param {string} base64Str Base64url 字符串。
     * @param {number} base64StrLength Base64url 字符串的有效長度。
     * @param {Array} reverseMap 反向映射表。
     *
     * @return {WordArray} 字數組。
     */
    function parseLoop(base64Str, base64StrLength, reverseMap) {
      var words = [];
      var nBytes = 0;
      for (var i = 0; i < base64StrLength; i++) {
        if (i % 4) {
          // 從 reverseMap 中取出 Base64 字符對應的值
          var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
          var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
          // 將取出的值組合成一個 24 位元的三元組
          var bitsCombined = bits1 | bits2;
          // 將三元組放入 words 陣列中
          words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
          nBytes++;
        }
      }
      // 創建並返回一個新的 WordArray 物件
      return WordArray.create(words, nBytes);
    }
  })();
  (function (Math) {
    // 變量設定
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // 常數表
    var T = [];

    // 計算常數
    (function () {
      for (var i = 0; i < 64; i++) {
        T[i] = Math.abs(Math.sin(i + 1)) * 0x100000000 | 0;
      }
    })();

    /**
     * MD5 雜湊算法。
     */
    var MD5 = C_algo.MD5 = Hasher.extend({
      /**
       * 重置雜湊值。
       *
       * @example
       *
       *     md5Hasher._doReset();
       */
      _doReset: function _doReset() {
        this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]);
      },
      /**
       * 處理一個 512 位元的數據塊。
       *
       * @param {Array} M 32 位元字的陣列，表示 512 位元的數據塊。
       * @param {number} offset 數據塊在 M 中的起始偏移量。
       *
       * @example
       *
       *     md5Hasher._doProcessBlock(M, offset);
       */
      _doProcessBlock: function _doProcessBlock(M, offset) {
        // 交換字元序
        for (var i = 0; i < 16; i++) {
          // 變量設定
          var offset_i = offset + i;
          var M_offset_i = M[offset_i];
          M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 0x00ff00ff | (M_offset_i << 24 | M_offset_i >>> 8) & 0xff00ff00;
        }

        // 變量設定
        var H = this._hash.words;
        var M_offset_0 = M[offset + 0];
        var M_offset_1 = M[offset + 1];
        var M_offset_2 = M[offset + 2];
        var M_offset_3 = M[offset + 3];
        var M_offset_4 = M[offset + 4];
        var M_offset_5 = M[offset + 5];
        var M_offset_6 = M[offset + 6];
        var M_offset_7 = M[offset + 7];
        var M_offset_8 = M[offset + 8];
        var M_offset_9 = M[offset + 9];
        var M_offset_10 = M[offset + 10];
        var M_offset_11 = M[offset + 11];
        var M_offset_12 = M[offset + 12];
        var M_offset_13 = M[offset + 13];
        var M_offset_14 = M[offset + 14];
        var M_offset_15 = M[offset + 15];

        // 工作變數
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];

        // 計算
        a = FF(a, b, c, d, M_offset_0, 7, T[0]);
        d = FF(d, a, b, c, M_offset_1, 12, T[1]);
        c = FF(c, d, a, b, M_offset_2, 17, T[2]);
        b = FF(b, c, d, a, M_offset_3, 22, T[3]);
        a = FF(a, b, c, d, M_offset_4, 7, T[4]);
        d = FF(d, a, b, c, M_offset_5, 12, T[5]);
        c = FF(c, d, a, b, M_offset_6, 17, T[6]);
        b = FF(b, c, d, a, M_offset_7, 22, T[7]);
        a = FF(a, b, c, d, M_offset_8, 7, T[8]);
        d = FF(d, a, b, c, M_offset_9, 12, T[9]);
        c = FF(c, d, a, b, M_offset_10, 17, T[10]);
        b = FF(b, c, d, a, M_offset_11, 22, T[11]);
        a = FF(a, b, c, d, M_offset_12, 7, T[12]);
        d = FF(d, a, b, c, M_offset_13, 12, T[13]);
        c = FF(c, d, a, b, M_offset_14, 17, T[14]);
        b = FF(b, c, d, a, M_offset_15, 22, T[15]);
        a = GG(a, b, c, d, M_offset_1, 5, T[16]);
        d = GG(d, a, b, c, M_offset_6, 9, T[17]);
        c = GG(c, d, a, b, M_offset_11, 14, T[18]);
        b = GG(b, c, d, a, M_offset_0, 20, T[19]);
        a = GG(a, b, c, d, M_offset_5, 5, T[20]);
        d = GG(d, a, b, c, M_offset_10, 9, T[21]);
        c = GG(c, d, a, b, M_offset_15, 14, T[22]);
        b = GG(b, c, d, a, M_offset_4, 20, T[23]);
        a = GG(a, b, c, d, M_offset_9, 5, T[24]);
        d = GG(d, a, b, c, M_offset_14, 9, T[25]);
        c = GG(c, d, a, b, M_offset_3, 14, T[26]);
        b = GG(b, c, d, a, M_offset_8, 20, T[27]);
        a = GG(a, b, c, d, M_offset_13, 5, T[28]);
        d = GG(d, a, b, c, M_offset_2, 9, T[29]);
        c = GG(c, d, a, b, M_offset_7, 14, T[30]);
        b = GG(b, c, d, a, M_offset_12, 20, T[31]);
        a = HH(a, b, c, d, M_offset_5, 4, T[32]);
        d = HH(d, a, b, c, M_offset_8, 11, T[33]);
        c = HH(c, d, a, b, M_offset_11, 16, T[34]);
        b = HH(b, c, d, a, M_offset_14, 23, T[35]);
        a = HH(a, b, c, d, M_offset_1, 4, T[36]);
        d = HH(d, a, b, c, M_offset_4, 11, T[37]);
        c = HH(c, d, a, b, M_offset_7, 16, T[38]);
        b = HH(b, c, d, a, M_offset_10, 23, T[39]);
        a = HH(a, b, c, d, M_offset_13, 4, T[40]);
        d = HH(d, a, b, c, M_offset_0, 11, T[41]);
        c = HH(c, d, a, b, M_offset_3, 16, T[42]);
        b = HH(b, c, d, a, M_offset_6, 23, T[43]);
        a = HH(a, b, c, d, M_offset_9, 4, T[44]);
        d = HH(d, a, b, c, M_offset_12, 11, T[45]);
        c = HH(c, d, a, b, M_offset_15, 16, T[46]);
        b = HH(b, c, d, a, M_offset_2, 23, T[47]);
        a = II(a, b, c, d, M_offset_0, 6, T[48]);
        d = II(d, a, b, c, M_offset_7, 10, T[49]);
        c = II(c, d, a, b, M_offset_14, 15, T[50]);
        b = II(b, c, d, a, M_offset_5, 21, T[51]);
        a = II(a, b, c, d, M_offset_12, 6, T[52]);
        d = II(d, a, b, c, M_offset_3, 10, T[53]);
        c = II(c, d, a, b, M_offset_10, 15, T[54]);
        b = II(b, c, d, a, M_offset_1, 21, T[55]);
        a = II(a, b, c, d, M_offset_8, 6, T[56]);
        d = II(d, a, b, c, M_offset_15, 10, T[57]);
        c = II(c, d, a, b, M_offset_6, 15, T[58]);
        b = II(b, c, d, a, M_offset_13, 21, T[59]);
        a = II(a, b, c, d, M_offset_4, 6, T[60]);
        d = II(d, a, b, c, M_offset_11, 10, T[61]);
        c = II(c, d, a, b, M_offset_2, 15, T[62]);
        b = II(b, c, d, a, M_offset_9, 21, T[63]);

        // 中間雜湊值
        H[0] = H[0] + a | 0;
        H[1] = H[1] + b | 0;
        H[2] = H[2] + c | 0;
        H[3] = H[3] + d | 0;
      },
      /**
       * 完成雜湊計算。
       *
       * @example
       *
       *     md5Hasher._doFinalize();
       */
      _doFinalize: function _doFinalize() {
        // 變量設定
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;

        // 添加填充
        dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
        var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
        var nBitsTotalL = nBitsTotal;
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 0x00ff00ff | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 0xff00ff00;
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 0x00ff00ff | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 0xff00ff00;
        data.sigBytes = (dataWords.length + 1) * 4;

        // 雜湊最後的數據塊
        this._process();

        // 變量設定
        var hash = this._hash;
        var H = hash.words;

        // 交換字元序
        for (var i = 0; i < 4; i++) {
          // 變量設定
          var H_i = H[i];
          H[i] = (H_i << 8 | H_i >>> 24) & 0x00ff00ff | (H_i << 24 | H_i >>> 8) & 0xff00ff00;
        }

        // 返回最終計算的雜湊值
        return hash;
      },
      /**
       * 創建此雜湊器的副本。
       *
       * @return {Hasher} 複製的雜湊器。
       *
       * @example
       *
       *     var clone = md5Hasher.clone();
       */
      clone: function clone() {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
      }
    });

    /**
     * MD5 計算中的 FF 函數。
     *
     * @param {number} a 第一個 32 位元字。
     * @param {number} b 第二個 32 位元字。
     * @param {number} c 第三個 32 位元字。
     * @param {number} d 第四個 32 位元字。
     * @param {number} x 輸入的 32 位元字。
     * @param {number} s 旋轉位數。
     * @param {number} t 常數。
     *
     * @return {number} 計算結果。
     */
    function FF(a, b, c, d, x, s, t) {
      var n = a + (b & c | ~b & d) + x + t;
      return (n << s | n >>> 32 - s) + b;
    }

    /**
     * MD5 計算中的 GG 函數。
     *
     * @param {number} a 第一個 32 位元字。
     * @param {number} b 第二個 32 位元字。
     * @param {number} c 第三個 32 位元字。
     * @param {number} d 第四個 32 位元字。
     * @param {number} x 輸入的 32 位元字。
     * @param {number} s 旋轉位數。
     * @param {number} t 常數。
     *
     * @return {number} 計算結果。
     */
    function GG(a, b, c, d, x, s, t) {
      var n = a + (b & d | c & ~d) + x + t;
      return (n << s | n >>> 32 - s) + b;
    }

    /**
     * MD5 計算中的 HH 函數。
     *
     * @param {number} a 第一個 32 位元字。
     * @param {number} b 第二個 32 位元字。
     * @param {number} c 第三個 32 位元字。
     * @param {number} d 第四個 32 位元字。
     * @param {number} x 輸入的 32 位元字。
     * @param {number} s 旋轉位數。
     * @param {number} t 常數。
     *
     * @return {number} 計算結果。
     */
    function HH(a, b, c, d, x, s, t) {
      var n = a + (b ^ c ^ d) + x + t;
      return (n << s | n >>> 32 - s) + b;
    }

    /**
     * MD5 計算中的 II 函數。
     *
     * @param {number} a 第一個 32 位元字。
     * @param {number} b 第二個 32 位元字。
     * @param {number} c 第三個 32 位元字。
     * @param {number} d 第四個 32 位元字。
     * @param {number} x 輸入的 32 位元字。
     * @param {number} s 旋轉位數。
     * @param {number} t 常數。
     *
     * @return {number} 計算結果。
     */
    function II(a, b, c, d, x, s, t) {
      var n = a + (c ^ (b | ~d)) + x + t;
      return (n << s | n >>> 32 - s) + b;
    }

    /**
     * 快捷方式函數，用於呼叫 MD5 雜湊器的物件介面。
     *
     * @param {WordArray|string} message 要雜湊的訊息，可以是 WordArray 或字串格式。
     *
     * @return {WordArray} 雜湊結果，以 WordArray 格式返回。
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.MD5('message'); // 使用字串作為輸入
     *     var hash = CryptoJS.MD5(wordArray); // 使用 WordArray 作為輸入
     */
    C.MD5 = Hasher._createHelper(MD5);

    /**
     * 快捷方式函數，用於呼叫 HMAC 的物件介面。
     *
     * @param {WordArray|string} message 要進行雜湊運算的訊息，可以是 WordArray 或字串格式。
     *   - 如果輸入是字串，會自動使用 UTF-8 編碼轉換為 WordArray。
     *   - 如果輸入是 WordArray，則直接處理。
     *
     * @param {WordArray|string} key 用於生成 HMAC 的密鑰，可以是 WordArray 或字串格式。
     *   - 密鑰會根據 HMAC 演算法的要求進行處理。
     *
     * @return {WordArray} 返回計算後的 HMAC 值，以 WordArray 格式表示。
     *
     * @static
     *
     * @example
     *
     *     // 使用字串作為訊息和密鑰
     *     var hmac = CryptoJS.HmacMD5(message, key);
     */
    C.HmacMD5 = Hasher._createHmacHelper(MD5);
  })(Math);
  (function () {
    // 變量設定
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // 可重用對象
    var W = [];

    /**
     * SHA-1 雜湊算法。
     */
    var SHA1 = C_algo.SHA1 = Hasher.extend({
      /**
       * 重置雜湊值為初始狀態。
       *
       * @example
       *
       *     sha1Hasher._doReset();
       */
      _doReset: function _doReset() {
        this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]);
      },
      /**
       * 處理一個 512 位元的數據塊。
       *
       * @param {Array} M 包含 32 位元字的陣列，表示 512 位元的數據塊。
       * @param {number} offset 數據塊在 M 中的起始偏移量。
       *
       * @example
       *
       *     sha1Hasher._doProcessBlock(M, offset);
       */
      _doProcessBlock: function _doProcessBlock(M, offset) {
        // 變量設定
        var H = this._hash.words;

        // 工作變數
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];
        var e = H[4];

        // 計算
        for (var i = 0; i < 80; i++) {
          if (i < 16) {
            // 將輸入數據填充到 W 數組中
            W[i] = M[offset + i] | 0;
          } else {
            // 根據公式生成新的 W[i]
            var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
            W[i] = n << 1 | n >>> 31; // 左移一位並循環
          }

          // 計算中間變數 t
          var t = (a << 5 | a >>> 27) + e + W[i]; // a 左移 5 位並加上 e 和 W[i]

          if (i < 20) {
            // 第一輪計算
            t += (b & c | ~b & d) + 0x5a827999;
          } else if (i < 40) {
            // 第二輪計算
            t += (b ^ c ^ d) + 0x6ed9eba1;
          } else if (i < 60) {
            // 第三輪計算
            t += (b & c | b & d | c & d) - 0x70e44324;
          } else /* if (i < 80) */{
              // 第四輪計算
              t += (b ^ c ^ d) - 0x359d3e2a;
            }

          // 更新工作變數
          e = d;
          d = c;
          c = b << 30 | b >>> 2; // b 左移 30 位並循環
          b = a;
          a = t;
        }

        // 更新中間雜湊值
        H[0] = H[0] + a | 0;
        H[1] = H[1] + b | 0;
        H[2] = H[2] + c | 0;
        H[3] = H[3] + d | 0;
        H[4] = H[4] + e | 0;
      },
      /**
       * 完成雜湊計算。
       *
       * @example
       *
       *     sha1Hasher._doFinalize();
       */
      _doFinalize: function _doFinalize() {
        // 變量設定
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;

        // 添加填充
        dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
        data.sigBytes = dataWords.length * 4;

        // 處理最後的數據塊
        this._process();

        // 返回最終計算的雜湊值
        return this._hash;
      },
      /**
       * 創建此雜湊器的副本。
       *
       * @return {Hasher} 複製的雜湊器。
       *
       * @example
       *
       *     var clone = sha1Hasher.clone();
       */
      clone: function clone() {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
      }
    });

    /**
     * 快捷方式函數，用於呼叫 SHA-1 雜湊器的物件介面。
     *
     * @param {WordArray|string} message 要進行雜湊運算的訊息，可以是 WordArray 或字串格式。
     *
     * @return {WordArray} 雜湊結果，以 WordArray 格式返回。
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA1('message'); // 使用字串作為輸入
     *     var hash = CryptoJS.SHA1(wordArray); // 使用 WordArray 作為輸入
     */
    C.SHA1 = Hasher._createHelper(SHA1);

    /**
     * 快捷方式函數，用於呼叫 HMAC 的物件介面。
     *
     * @param {WordArray|string} message 要進行雜湊運算的訊息，可以是 WordArray 或字串格式。
     * @param {WordArray|string} key 用於生成 HMAC 的密鑰，可以是 WordArray 或字串格式。
     *
     * @return {WordArray} HMAC 值，以 WordArray 格式返回。
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA1(message, key);
     */
    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
  })();
  (function (Math) {
    // 變量設定
    var C = CryptoJS; // CryptoJS 命名空間
    var C_lib = C.lib; // 庫命名空間
    var WordArray = C_lib.WordArray; // 32位字數組類
    var Hasher = C_lib.Hasher; // 哈希器基類
    var C_algo = C.algo; // 算法命名空間

    // 初始化雜湊值和輪次常數表。
    var H = []; // 初始雜湊值表，用於 SHA-256 的初始化
    var K = []; // 輪次常數表，用於 SHA-256 的計算

    /**
     * 計算 SHA-256 的初始雜湊值和輪次常數。
     */
    (function () {
      /**
       * 檢查數字是否為質數。
       *
       * @param {number} n 要檢查的數字。
       * @return {boolean} 如果是質數返回 true，否則返回 false。
       */
      function isPrime(n) {
        var sqrtN = Math.sqrt(n); // 計算平方根以減少檢查範圍
        for (var factor = 2; factor <= sqrtN; factor++) {
          if (!(n % factor)) {
            // 如果能被整除，則不是質數
            return false;
          }
        }
        return true; // 否則是質數
      }

      /**
       * 提取數字的小數部分並將其轉換為整數。
       *
       * @param {number} n 要處理的數字。
       * @return {number} 小數部分轉換後的整數。
       */
      function getFractionalBits(n) {
        return (n - (n | 0)) * 0x100000000 | 0; // 提取小數部分並放大為整數
      }
      var n = 2; // 從 2 開始檢查質數
      var nPrime = 0; // 質數計數器
      while (nPrime < 64) {
        // 需要生成 64 個常數
        if (isPrime(n)) {
          // 如果當前數字是質數
          if (nPrime < 8) {
            H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2)); // 取平方根的小數部分作為初始雜湊值
          }
          K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3)); // 取立方根的小數部分作為輪次常數

          nPrime++; // 增加質數計數器
        }
        n++; // 檢查下一個數字
      }
    })();

    // 可重用對象，用於暫存工作數據。
    var W = []; // 工作數組，用於處理數據塊

    /**
     * SHA-256 雜湊算法。
     */
    var SHA256 = C_algo.SHA256 = Hasher.extend({
      /**
       * 重置雜湊值為初始狀態。
       *
       * @example
       *
       *     sha256Hasher._doReset();
       */
      _doReset: function _doReset() {
        this._hash = new WordArray.init(H.slice(0)); // 初始化雜湊值，使用 H 表的副本
      },
      /**
       * 處理一個 512 位元的數據塊。
       *
       * @param {Array} M 包含 32 位元字的陣列，表示 512 位元的數據塊。
       * @param {number} offset 數據塊在 M 中的起始偏移量。
       *
       * @example
       *
       *     sha256Hasher._doProcessBlock(M, offset);
       */
      _doProcessBlock: function _doProcessBlock(M, offset) {
        // 變量設定
        var H = this._hash.words; // 當前的雜湊值

        // 工作變數
        var a = H[0]; // 第一個工作變數
        var b = H[1];
        var c = H[2];
        var d = H[3];
        var e = H[4];
        var f = H[5];
        var g = H[6];
        var h = H[7];

        // 計算
        for (var i = 0; i < 64; i++) {
          if (i < 16) {
            // 直接從輸入數據中提取字
            W[i] = M[offset + i] | 0;
          } else {
            // 根據公式生成新的 W[i]
            var gamma0x = W[i - 15]; // 取前 15 個字
            var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (
            // 左移 25 位或右移 7 位
            gamma0x << 14 | gamma0x >>> 18) ^
            // 左移 14 位或右移 18 位
            gamma0x >>> 3; // 右移 3 位

            var gamma1x = W[i - 2]; // 取前 2 個字
            var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (
            // 左移 15 位或右移 17 位
            gamma1x << 13 | gamma1x >>> 19) ^
            // 左移 13 位或右移 19 位
            gamma1x >>> 10; // 右移 10 位

            // 更新 W[i]
            W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
          }

          // 計算中間變數
          var ch = e & f ^ ~e & g; // Ch 函數：條件函數
          var maj = a & b ^ a & c ^ b & c; // Maj 函數：多數函數

          var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22); // Sigma0 函數：循環移位
          var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25); // Sigma1 函數：循環移位

          // 計算 t1 和 t2
          var t1 = h + sigma1 + ch + K[i] + W[i];
          var t2 = sigma0 + maj;

          // 更新工作變數
          h = g; // 更新 h
          g = f; // 更新 g
          f = e; // 更新 f
          e = d + t1 | 0; // 更新 e
          d = c; // 更新 d
          c = b; // 更新 c
          b = a; // 更新 b
          a = t1 + t2 | 0; // 更新 a
        }

        // 更新中間雜湊值
        H[0] = H[0] + a | 0; // 將 a 加到第一個雜湊值
        H[1] = H[1] + b | 0;
        H[2] = H[2] + c | 0;
        H[3] = H[3] + d | 0;
        H[4] = H[4] + e | 0;
        H[5] = H[5] + f | 0;
        H[6] = H[6] + g | 0;
        H[7] = H[7] + h | 0;
      },
      /**
       * 完成雜湊計算。
       *
       * @example
       *
       *     sha256Hasher._doFinalize();
       */
      _doFinalize: function _doFinalize() {
        // 變量設定
        var data = this._data; // 當前數據緩衝區
        var dataWords = data.words; // 緩衝區中的字數組

        var nBitsTotal = this._nDataBytes * 8; // 總位元數
        var nBitsLeft = data.sigBytes * 8; // 剩餘的有效位元數

        // 添加填充
        dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32; // 添加 1 位元作為填充標記
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000); // 添加高位元長度
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal; // 添加低位元長度
        data.sigBytes = dataWords.length * 4; // 更新有效字節數

        // 處理最後的數據塊
        this._process();

        // 返回最終計算的雜湊值
        return this._hash;
      },
      /**
       * 創建此雜湊器的副本。
       *
       * @return {Hasher} 複製的雜湊器。
       *
       * @example
       *
       *     var clone = sha256Hasher.clone();
       */
      clone: function clone() {
        var clone = Hasher.clone.call(this); // 複製父類型
        clone._hash = this._hash.clone(); // 複製當前雜湊值

        return clone;
      }
    });

    /**
     * 快捷方式函數，用於呼叫 SHA-256 雜湊器的物件介面。
     *
     * @param {WordArray|string} message 要進行雜湊運算的訊息，可以是 WordArray 或字串格式。
     *
     * @return {WordArray} 雜湊結果，以 WordArray 格式返回。
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA256('message');
     *     var hash = CryptoJS.SHA256(wordArray);
     */
    C.SHA256 = Hasher._createHelper(SHA256);

    /**
     * 快捷方式函數，用於呼叫 HMAC 的物件介面。
     *
     * @param {WordArray|string} message 要進行雜湊運算的訊息，可以是 WordArray 或字串格式。
     * @param {WordArray|string} key 用於生成 HMAC 的密鑰，可以是 WordArray 或字串格式。
     *
     * @return {WordArray} HMAC 值，以 WordArray 格式返回。
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA256(message, key);
     */
    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
  })(Math);
  (function () {
    // 變量設定
    var C = CryptoJS; // CryptoJS 命名空間
    var C_lib = C.lib; // 庫命名空間
    var WordArray = C_lib.WordArray; // 32位字數組類
    var C_algo = C.algo; // 算法命名空間
    var SHA256 = C_algo.SHA256; // SHA-256 雜湊算法

    /**
     * SHA-224 雜湊算法。
     */
    var SHA224 = C_algo.SHA224 = SHA256.extend({
      /**
       * 重置雜湊值為初始狀態。
       *
       * @example
       *
       *     sha224Hasher._doReset();
       */
      _doReset: function _doReset() {
        this._hash = new WordArray.init([0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4]);
      },
      /**
       * 完成雜湊計算。
       *
       * @example
       *
       *     sha224Hasher._doFinalize();
       */
      _doFinalize: function _doFinalize() {
        // 呼叫 SHA-256 的 _doFinalize 方法
        var hash = SHA256._doFinalize.call(this);

        // 減少 4 個字節以符合 SHA-224 的輸出長度要求
        hash.sigBytes -= 4;

        // 返回最終計算的雜湊值
        return hash;
      }
    });

    /**
     * 快捷方式函數，用於呼叫 SHA-224 雜湊器的物件介面。
     *
     * @param {WordArray|string} message 要進行雜湊運算的訊息，可以是 WordArray 或字串格式。
     *
     * @return {WordArray} 雜湊結果，以 WordArray 格式返回。
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA224('message');
     *     var hash = CryptoJS.SHA224(wordArray);
     */
    C.SHA224 = SHA256._createHelper(SHA224);

    /**
     * 快捷方式函數，用於呼叫 HMAC 的物件介面。
     *
     * @param {WordArray|string} message 要進行雜湊運算的訊息，可以是 WordArray 或字串格式。
     * @param {WordArray|string} key 用於生成 HMAC 的密鑰，可以是 WordArray 或字串格式。
     *
     * @return {WordArray} HMAC 值，以 WordArray 格式返回。
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA224(message, key);
     */
    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
  })();
  (function () {
    // 變量設定
    var C = CryptoJS; // CryptoJS 命名空間
    var C_lib = C.lib; // 庫命名空間
    var WordArray = C_lib.WordArray; // 32位字數組類
    var Hasher = C_lib.Hasher; // 哈希器基類
    var C_x64 = C.x64;
    var X64Word = C_x64.Word; // 64位元字類
    var X64WordArray = C_x64.WordArray; // 64位元字數組類
    var C_algo = C.algo; // 算法命名空間

    // 創建 X64Word 的快捷方式函數
    function X64Word_create() {
      return X64Word.create.apply(X64Word, arguments);
    }

    // 常數表 K，用於 SHA-512 的計算
    var K = [X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd), X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc), X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019), X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118), X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe), X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2), X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1), X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694), X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3), X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65), X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483), X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5), X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210), X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4), X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725), X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70), X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926), X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df), X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8), X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b), X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001), X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30), X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910), X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8), X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53), X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8), X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb), X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3), X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60), X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec), X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9), X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b), X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207), X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178), X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6), X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b), X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493), X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c), X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a), X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)];

    // 可重用的 W 陣列，用於暫存工作數據
    var W = [];
    (function () {
      for (var i = 0; i < 80; i++) {
        W[i] = X64Word_create();
      }
    })();

    /**
     * SHA-512 雜湊算法。
     */
    var SHA512 = C_algo.SHA512 = Hasher.extend({
      /**
       * 重置雜湊值為初始狀態。
       *
       * @example
       *
       *     sha512Hasher._doReset();
       */
      _doReset: function _doReset() {
        this._hash = new X64WordArray.init([new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b), new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1), new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f), new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)]);
      },
      /**
       * 處理一個 1024 位元的數據塊。
       *
       * @param {Array} M 包含 64 位元字的陣列，表示 1024 位元的數據塊。
       * @param {number} offset 數據塊在 M 中的起始偏移量。
       *
       * @example
       *
       *     sha512Hasher._doProcessBlock(M, offset);
       */
      _doProcessBlock: function _doProcessBlock(M, offset) {
        // 變量設定
        var H = this._hash.words; // 當前的雜湊值

        // 分別取出高 32 位元和低 32 位元
        var H0 = H[0];
        var H1 = H[1];
        var H2 = H[2];
        var H3 = H[3];
        var H4 = H[4];
        var H5 = H[5];
        var H6 = H[6];
        var H7 = H[7];
        var H0h = H0.high;
        var H0l = H0.low;
        var H1h = H1.high;
        var H1l = H1.low;
        var H2h = H2.high;
        var H2l = H2.low;
        var H3h = H3.high;
        var H3l = H3.low;
        var H4h = H4.high;
        var H4l = H4.low;
        var H5h = H5.high;
        var H5l = H5.low;
        var H6h = H6.high;
        var H6l = H6.low;
        var H7h = H7.high;
        var H7l = H7.low;

        // 工作變數
        var ah = H0h;
        var al = H0l;
        var bh = H1h;
        var bl = H1l;
        var ch = H2h;
        var cl = H2l;
        var dh = H3h;
        var dl = H3l;
        var eh = H4h;
        var el = H4l;
        var fh = H5h;
        var fl = H5l;
        var gh = H6h;
        var gl = H6l;
        var hh = H7h;
        var hl = H7l;

        // 計算循環
        for (var i = 0; i < 80; i++) {
          var Wil; // 定義 W[i] 的低 32 位元
          var Wih; // 定義 W[i] 的高 32 位元

          // 變量設定
          var Wi = W[i]; // 取出 W 數組中的第 i 個元素

          // 延伸消息
          if (i < 16) {
            // 直接從輸入數據 M 中提取第 i 個 64 位元字
            Wih = Wi.high = M[offset + i * 2] | 0; // 提取高 32 位元
            Wil = Wi.low = M[offset + i * 2 + 1] | 0; // 提取低 32 位元
          } else {
            // 計算 Gamma0
            var gamma0x = W[i - 15]; // 取出 W 數組中的第 i-15 個元素
            var gamma0xh = gamma0x.high; // 取出高 32 位元
            var gamma0xl = gamma0x.low; // 取出低 32 位元
            var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (
            // 右移 1 位元或左移 31 位元
            gamma0xh >>> 8 | gamma0xl << 24) ^
            // 右移 8 位元或左移 24 位元
            gamma0xh >>> 7; // 右移 7 位元
            var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (
            // 右移 1 位元或左移 31 位元
            gamma0xl >>> 8 | gamma0xh << 24) ^ (
            // 右移 8 位元或左移 24 位元
            gamma0xl >>> 7 | gamma0xh << 25); // 右移 7 位元或左移 25 位元

            // 計算 Gamma1
            var gamma1x = W[i - 2]; // 取出 W 數組中的第 i-2 個元素
            var gamma1xh = gamma1x.high; // 取出高 32 位元
            var gamma1xl = gamma1x.low; // 取出低 32 位元
            var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (
            // 右移 19 位元或左移 13 位元
            gamma1xh << 3 | gamma1xl >>> 29) ^
            // 左移 3 位元或右移 29 位元
            gamma1xh >>> 6; // 右移 6 位元
            var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (
            // 右移 19 位元或左移 13 位元
            gamma1xl << 3 | gamma1xh >>> 29) ^ (
            // 左移 3 位元或右移 29 位元
            gamma1xl >>> 6 | gamma1xh << 26); // 右移 6 位元或左移 26 位元

            // 計算 W[i]
            var Wi7 = W[i - 7]; // 取出 W 數組中的第 i-7 個元素
            var Wi7h = Wi7.high; // 取出高 32 位元
            var Wi7l = Wi7.low; // 取出低 32 位元

            var Wi16 = W[i - 16]; // 取出 W 數組中的第 i-16 個元素
            var Wi16h = Wi16.high; // 取出高 32 位元
            var Wi16l = Wi16.low; // 取出低 32 位元

            Wil = gamma0l + Wi7l; // 計算 gamma0l 和 Wi7l 的和
            Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0); // 計算 gamma0h 和 Wi7h 的和，並處理進位
            Wil = Wil + gamma1l; // 加上 gamma1l
            Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0); // 加上 gamma1h，並處理進位
            Wil = Wil + Wi16l; // 加上 Wi16l
            Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0); // 加上 Wi16h，並處理進位

            Wi.high = Wih; // 更新 W[i] 的高 32 位元
            Wi.low = Wil; // 更新 W[i] 的低 32 位元
          }

          // 計算 Ch 函數
          var chh = eh & fh ^ ~eh & gh; // Ch 函數的高 32 位元：(eh AND fh) XOR (NOT eh AND gh)
          var chl = el & fl ^ ~el & gl; // Ch 函數的低 32 位元：(el AND fl) XOR (NOT el AND gl)

          // 計算 Maj 函數
          var majh = ah & bh ^ ah & ch ^ bh & ch; // Maj 函數的高 32 位元：(ah AND bh) XOR (ah AND ch) XOR (bh AND ch)
          var majl = al & bl ^ al & cl ^ bl & cl; // Maj 函數的低 32 位元：(al AND bl) XOR (al AND cl) XOR (bl AND cl)

          // 計算 Sigma0 函數
          var sigma0h = (ah >>> 28 | al << 4) ^ (
          // 右移 28 位元或左移 4 位元
          ah << 30 | al >>> 2) ^ (
          // 左移 30 位元或右移 2 位元
          ah << 25 | al >>> 7); // 左移 25 位元或右移 7 位元
          var sigma0l = (al >>> 28 | ah << 4) ^ (
          // 右移 28 位元或左移 4 位元
          al << 30 | ah >>> 2) ^ (
          // 左移 30 位元或右移 2 位元
          al << 25 | ah >>> 7); // 左移 25 位元或右移 7 位元

          // 計算 Sigma1 函數
          var sigma1h = (eh >>> 14 | el << 18) ^ (
          // 右移 14 位元或左移 18 位元
          eh >>> 18 | el << 14) ^ (
          // 右移 18 位元或左移 14 位元
          eh << 23 | el >>> 9); // 左移 23 位元或右移 9 位元
          var sigma1l = (el >>> 14 | eh << 18) ^ (
          // 右移 14 位元或左移 18 位元
          el >>> 18 | eh << 14) ^ (
          // 右移 18 位元或左移 14 位元
          el << 23 | eh >>> 9); // 左移 23 位元或右移 9 位元

          // 計算 t1
          var Ki = K[i]; // 取出常數表 K 中的第 i 個元素
          var Kih = Ki.high; // 取出高 32 位元
          var Kil = Ki.low; // 取出低 32 位元

          var t1l = hl + sigma1l; // 計算 hl 和 sigma1l 的和
          var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0); // 計算 hh 和 sigma1h 的和，並處理進位
          var t1l = t1l + chl; // 加上 chl
          var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0); // 加上 chh，並處理進位
          var t1l = t1l + Kil; // 加上 Kil
          var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0); // 加上 Kih，並處理進位
          var t1l = t1l + Wil; // 加上 Wil
          var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0); // 加上 Wih，並處理進位

          // 計算 t2
          var t2l = sigma0l + majl; // 計算 sigma0l 和 majl 的和
          var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0); // 計算 sigma0h 和 majh 的和，並處理進位

          // 更新工作變數
          hh = gh; // 更新 hh 為 gh
          hl = gl; // 更新 hl 為 gl
          gh = fh; // 更新 gh 為 fh
          gl = fl; // 更新 gl 為 fl
          fh = eh; // 更新 fh 為 eh
          fl = el; // 更新 fl 為 el
          el = dl + t1l | 0; // 更新 el 為 dl 和 t1l 的和，並截斷為 32 位元
          eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0; // 更新 eh 為 dh 和 t1h 的和，並處理進位，截斷為 32 位元
          dh = ch; // 更新 dh 為 ch
          dl = cl; // 更新 dl 為 cl
          ch = bh; // 更新 ch 為 bh
          cl = bl; // 更新 cl 為 bl
          bh = ah; // 更新 bh 為 ah
          bl = al; // 更新 bl 為 al
          al = t1l + t2l | 0; // 更新 al 為 t1l 和 t2l 的和，並截斷為 32 位元
          ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0; // 更新 ah 為 t1h 和 t2h 的和，並處理進位，截斷為 32 位元
        }

        // 更新哈希狀態
        H0l = H0.low = H0l + al;
        H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
        H1l = H1.low = H1l + bl;
        H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
        H2l = H2.low = H2l + cl;
        H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
        H3l = H3.low = H3l + dl;
        H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
        H4l = H4.low = H4l + el;
        H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
        H5l = H5.low = H5l + fl;
        H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
        H6l = H6.low = H6l + gl;
        H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
        H7l = H7.low = H7l + hl;
        H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
      },
      /**
       * 完成哈希計算，處理填充並返回最終結果
       */
      _doFinalize: function _doFinalize() {
        // 獲取數據緩衝區
        var data = this._data;
        var dataWords = data.words;

        // 計算總位數
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;

        // 添加填充
        dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
        dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
        dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
        data.sigBytes = dataWords.length * 4;

        // 處理最後的數據塊
        this._process();

        // 將雜湊值轉換為 32 位元字數組
        var hash = this._hash.toX32();

        // 返回最終計算的雜湊值
        return hash;
      },
      clone: function clone() {
        // 創建此雜湊器的副本
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
      },
      // 處理的數據塊大小，以 32 位元字為單位
      blockSize: 1024 / 32
    });

    /**
     * 快捷方式函數，用於呼叫 SHA-512 雜湊器的物件介面。
     *
     * @param {WordArray|string} message 要進行雜湊運算的訊息，可以是 WordArray 或字串格式。
     *
     * @return {WordArray} 雜湊結果，以 WordArray 格式返回。
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA512('message');
     *     var hash = CryptoJS.SHA512(wordArray);
     */
    C.SHA512 = Hasher._createHelper(SHA512);

    /**
     * 快捷方式函數，用於呼叫 HMAC 的物件介面。
     *
     * @param {WordArray|string} message 要進行雜湊運算的訊息，可以是 WordArray 或字串格式。
     * @param {WordArray|string} key 用於生成 HMAC 的密鑰，可以是 WordArray 或字串格式。
     *
     * @return {WordArray} HMAC 值，以 WordArray 格式返回。
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA512(message, key);
     */
    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
  })();
  (function () {
    // 變量設定
    var C = CryptoJS;
    var C_x64 = C.x64;
    var X64Word = C_x64.Word;
    var X64WordArray = C_x64.WordArray;
    var C_algo = C.algo;
    var SHA512 = C_algo.SHA512;

    /**
     * SHA-384 雜湊算法。
     */
    var SHA384 = C_algo.SHA384 = SHA512.extend({
      /**
       * 重置雜湊值為初始狀態。
       *
       * @example
       *
       *     sha384Hasher._doReset();
       */
      _doReset: function _doReset() {
        this._hash = new X64WordArray.init([new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507), new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939), new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511), new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)]);
      },
      /**
       * 完成雜湊計算。
       *
       * @example
       *
       *     sha384Hasher._doFinalize();
       */
      _doFinalize: function _doFinalize() {
        var hash = SHA512._doFinalize.call(this);
        hash.sigBytes -= 16;
        return hash;
      }
    });

    /**
     * 快捷方式函數，用於呼叫 SHA-384 雜湊器的物件介面。
     *
     * @param {WordArray|string} message 要進行雜湊運算的訊息，可以是 WordArray 或字串格式。
     *
     * @return {WordArray} 雜湊結果，以 WordArray 格式返回。
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA384('message');
     *     var hash = CryptoJS.SHA384(wordArray);
     */
    C.SHA384 = SHA512._createHelper(SHA384);

    /**
     * 快捷方式函數，用於呼叫 HMAC 的物件介面。
     *
     * @param {WordArray|string} message 要進行雜湊運算的訊息，可以是 WordArray 或字串格式。
     * @param {WordArray|string} key 用於生成 HMAC 的密鑰，可以是 WordArray 或字串格式。
     *
     * @return {WordArray} HMAC 值，以 WordArray 格式返回。
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA384(message, key);
     */
    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
  })();
  (function (Math) {
    // 變量設定
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_x64 = C.x64;
    var X64Word = C_x64.Word;
    var C_algo = C.algo;

    // 常數表
    var RHO_OFFSETS = [];
    var PI_INDEXES = [];
    var ROUND_CONSTANTS = [];

    // 計算常數
    (function () {
      // 計算 rho 位移常數
      var x = 1,
        y = 0;
      for (var t = 0; t < 24; t++) {
        RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
        var newX = y % 5;
        var newY = (2 * x + 3 * y) % 5;
        x = newX;
        y = newY;
      }

      // 計算 pi 索引常數
      for (var x = 0; x < 5; x++) {
        for (var y = 0; y < 5; y++) {
          PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
        }
      }

      // 計算輪次常數
      var LFSR = 0x01;
      for (var i = 0; i < 24; i++) {
        var roundConstantMsw = 0;
        var roundConstantLsw = 0;
        for (var j = 0; j < 7; j++) {
          if (LFSR & 0x01) {
            var bitPosition = (1 << j) - 1;
            if (bitPosition < 32) {
              roundConstantLsw ^= 1 << bitPosition;
            } else /* if (bitPosition >= 32) */{
                roundConstantMsw ^= 1 << bitPosition - 32;
              }
          }

          // 計算下一個 LFSR
          if (LFSR & 0x80) {
            // 原始多項式在 GF(2): x^8 + x^6 + x^5 + x^4 + 1
            LFSR = LFSR << 1 ^ 0x71;
          } else {
            LFSR <<= 1;
          }
        }
        ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
      }
    })();

    // 用於暫存臨時值的可重用物件
    var T = [];
    (function () {
      for (var i = 0; i < 25; i++) {
        T[i] = X64Word.create();
      }
    })();

    /**
     * SHA-3 雜湊算法。
     */
    var SHA3 = C_algo.SHA3 = Hasher.extend({
      /**
       * 配置選項。
       *
       * @property {number} outputLength
       *   輸出雜湊所需的位數。
       *   唯一允許的值為：224, 256, 384, 512。
       *   預設值: 512
       */
      cfg: Hasher.cfg.extend({
        outputLength: 512
      }),
      /**
       * 重置雜湊值為初始狀態。
       *
       * @example
       *
       *     sha3Hasher._doReset();
       */
      _doReset: function _doReset() {
        var state = this._state = [];
        for (var i = 0; i < 25; i++) {
          state[i] = new X64Word.init();
        }
        this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
      },
      /**
       * 處理一個 1600 位元的數據塊。
       *
       * @param {Array} M 包含 64 位元字的陣列，表示 1600 位元的數據塊。
       * @param {number} offset 數據塊在 M 中的起始偏移量。
       *
       * @example
       *
       *     sha3Hasher._doProcessBlock(M, offset);
       */
      _doProcessBlock: function _doProcessBlock(M, offset) {
        // 變量設定
        var state = this._state;
        var nBlockSizeLanes = this.blockSize / 2;

        // 吸收
        for (var i = 0; i < nBlockSizeLanes; i++) {
          // 變量設定
          var M2i = M[offset + 2 * i];
          var M2i1 = M[offset + 2 * i + 1];

          // 交換字元序
          M2i = (M2i << 8 | M2i >>> 24) & 0x00ff00ff | (M2i << 24 | M2i >>> 8) & 0xff00ff00;
          M2i1 = (M2i1 << 8 | M2i1 >>> 24) & 0x00ff00ff | (M2i1 << 24 | M2i1 >>> 8) & 0xff00ff00;

          // 將消息吸收至狀態
          var lane = state[i];
          lane.high ^= M2i1;
          lane.low ^= M2i;
        }

        // 輪次
        for (var round = 0; round < 24; round++) {
          // Theta
          for (var x = 0; x < 5; x++) {
            // 混合列通道
            var tMsw = 0,
              tLsw = 0;
            for (var y = 0; y < 5; y++) {
              var lane = state[x + 5 * y];
              tMsw ^= lane.high;
              tLsw ^= lane.low;
            }

            // 暫存值
            var Tx = T[x];
            Tx.high = tMsw;
            Tx.low = tLsw;
          }
          for (var x = 0; x < 5; x++) {
            // 變量設定
            var Tx4 = T[(x + 4) % 5];
            var Tx1 = T[(x + 1) % 5];
            var Tx1Msw = Tx1.high;
            var Tx1Lsw = Tx1.low;

            // 混合周圍的列
            var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
            var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
            for (var y = 0; y < 5; y++) {
              var lane = state[x + 5 * y];
              lane.high ^= tMsw;
              lane.low ^= tLsw;
            }
          }

          // Rho Pi
          for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
            var tMsw;
            var tLsw;

            // 變量設定
            var lane = state[laneIndex];
            var laneMsw = lane.high;
            var laneLsw = lane.low;
            var rhoOffset = RHO_OFFSETS[laneIndex];

            // 旋轉通道
            if (rhoOffset < 32) {
              tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
              tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
            } else /* if (rhoOffset >= 32) */{
                tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
                tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
              }

            // 轉置通道
            var TPiLane = T[PI_INDEXES[laneIndex]];
            TPiLane.high = tMsw;
            TPiLane.low = tLsw;
          }

          // Rho pi 在 x = y = 0 時
          var T0 = T[0];
          var state0 = state[0];
          T0.high = state0.high;
          T0.low = state0.low;

          // Chi
          for (var x = 0; x < 5; x++) {
            for (var y = 0; y < 5; y++) {
              // 變量設定
              var laneIndex = x + 5 * y;
              var lane = state[laneIndex];
              var TLane = T[laneIndex];
              var Tx1Lane = T[(x + 1) % 5 + 5 * y];
              var Tx2Lane = T[(x + 2) % 5 + 5 * y];

              // 混合行
              lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
              lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
            }
          }

          // Iota
          var lane = state[0];
          var roundConstant = ROUND_CONSTANTS[round];
          lane.high ^= roundConstant.high;
          lane.low ^= roundConstant.low;
        }
      },
      /**
       * 完成雜湊計算。
       *
       * @example
       *
       *     sha3Hasher._doFinalize();
       */
      _doFinalize: function _doFinalize() {
        // 變量設定
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;
        var blockSizeBits = this.blockSize * 32;

        // 添加填充
        dataWords[nBitsLeft >>> 5] |= 0x1 << 24 - nBitsLeft % 32;
        dataWords[(Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 0x80;
        data.sigBytes = dataWords.length * 4;

        // 雜湊最後的數據塊
        this._process();

        // 變量設定
        var state = this._state;
        var outputLengthBytes = this.cfg.outputLength / 8;
        var outputLengthLanes = outputLengthBytes / 8;

        // 壓縮
        var hashWords = [];
        for (var i = 0; i < outputLengthLanes; i++) {
          // 變量設定
          var lane = state[i];
          var laneMsw = lane.high;
          var laneLsw = lane.low;

          // 交換字元序
          laneMsw = (laneMsw << 8 | laneMsw >>> 24) & 0x00ff00ff | (laneMsw << 24 | laneMsw >>> 8) & 0xff00ff00;
          laneLsw = (laneLsw << 8 | laneLsw >>> 24) & 0x00ff00ff | (laneLsw << 24 | laneLsw >>> 8) & 0xff00ff00;

          // 壓縮狀態以獲取雜湊
          hashWords.push(laneLsw);
          hashWords.push(laneMsw);
        }

        // 返回最終計算的雜湊值
        return new WordArray.init(hashWords, outputLengthBytes);
      },
      /**
       * 創建此雜湊器的副本。
       *
       * @return {Hasher} 複製的雜湊器。
       *
       * @example
       *
       *     var clone = sha3Hasher.clone();
       */
      clone: function clone() {
        var clone = Hasher.clone.call(this);
        var state = clone._state = this._state.slice(0);
        for (var i = 0; i < 25; i++) {
          state[i] = state[i].clone();
        }
        return clone;
      }
    });

    /**
     * 快捷方式函數，用於呼叫 SHA-3 雜湊器的物件介面。
     *
     * @param {WordArray|string} message 要進行雜湊運算的訊息，可以是 WordArray 或字串格式。
     *
     * @return {WordArray} 雜湊結果，以 WordArray 格式返回。
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA3('message');
     *     var hash = CryptoJS.SHA3(wordArray);
     */
    C.SHA3 = Hasher._createHelper(SHA3);

    /**
     * 快捷方式函數，用於呼叫 HMAC 的物件介面。
     *
     * @param {WordArray|string} message 要進行雜湊運算的訊息，可以是 WordArray 或字串格式。
     * @param {WordArray|string} key 用於生成 HMAC 的密鑰，可以是 WordArray 或字串格式。
     *
     * @return {WordArray} HMAC 值，以 WordArray 格式返回。
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA3(message, key);
     */
    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
  })(Math);

  /** @preserve
   (c) 2012 by Cédric Mesnil. All rights reserved.
    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
   - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */

  (function (Math) {
    // 變量設定
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // 常數表
    var _zl = WordArray.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]);
    var _zr = WordArray.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]);
    var _sl = WordArray.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]);
    var _sr = WordArray.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]);
    var _hl = WordArray.create([0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
    var _hr = WordArray.create([0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

    /**
     * RIPEMD160 雜湊算法。
     */
    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
      /**
       * 重置雜湊值為初始狀態。
       *
       * @example
       *
       *     ripemd160Hasher._doReset();
       */
      _doReset: function _doReset() {
        this._hash = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
      },
      /**
       * 處理一個 512 位元的數據塊。
       *
       * @param {Array} M 包含 32 位元字的陣列，表示 512 位元的數據塊。
       * @param {number} offset 數據塊在 M 中的起始偏移量。
       *
       * @example
       *
       *     ripemd160Hasher._doProcessBlock(M, offset);
       */
      _doProcessBlock: function _doProcessBlock(M, offset) {
        // 交換字元序
        for (var i = 0; i < 16; i++) {
          // 變量設定
          var offset_i = offset + i;
          var M_offset_i = M[offset_i];

          // 交換
          M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 0x00ff00ff | (M_offset_i << 24 | M_offset_i >>> 8) & 0xff00ff00;
        }
        // 變量設定
        var H = this._hash.words;
        var hl = _hl.words;
        var hr = _hr.words;
        var zl = _zl.words;
        var zr = _zr.words;
        var sl = _sl.words;
        var sr = _sr.words;

        // 工作變數
        var al, bl, cl, dl, el;
        var ar, br, cr, dr, er;
        ar = al = H[0];
        br = bl = H[1];
        cr = cl = H[2];
        dr = dl = H[3];
        er = el = H[4];
        // 計算
        var t;
        for (var i = 0; i < 80; i += 1) {
          t = al + M[offset + zl[i]] | 0;
          if (i < 16) {
            t += f1(bl, cl, dl) + hl[0];
          } else if (i < 32) {
            t += f2(bl, cl, dl) + hl[1];
          } else if (i < 48) {
            t += f3(bl, cl, dl) + hl[2];
          } else if (i < 64) {
            t += f4(bl, cl, dl) + hl[3];
          } else {
            // if (i<80) {
            t += f5(bl, cl, dl) + hl[4];
          }
          t = t | 0;
          t = rotl(t, sl[i]);
          t = t + el | 0;
          al = el;
          el = dl;
          dl = rotl(cl, 10);
          cl = bl;
          bl = t;
          t = ar + M[offset + zr[i]] | 0;
          if (i < 16) {
            t += f5(br, cr, dr) + hr[0];
          } else if (i < 32) {
            t += f4(br, cr, dr) + hr[1];
          } else if (i < 48) {
            t += f3(br, cr, dr) + hr[2];
          } else if (i < 64) {
            t += f2(br, cr, dr) + hr[3];
          } else {
            // if (i<80) {
            t += f1(br, cr, dr) + hr[4];
          }
          t = t | 0;
          t = rotl(t, sr[i]);
          t = t + er | 0;
          ar = er;
          er = dr;
          dr = rotl(cr, 10);
          cr = br;
          br = t;
        }
        // 中間雜湊值
        t = H[1] + cl + dr | 0;
        H[1] = H[2] + dl + er | 0;
        H[2] = H[3] + el + ar | 0;
        H[3] = H[4] + al + br | 0;
        H[4] = H[0] + bl + cr | 0;
        H[0] = t;
      },
      /**
       * 完成雜湊計算。
       *
       * @example
       *
       *     ripemd160Hasher._doFinalize();
       */
      _doFinalize: function _doFinalize() {
        // 變量設定
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;

        // 添加填充
        dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 0x00ff00ff | (nBitsTotal << 24 | nBitsTotal >>> 8) & 0xff00ff00;
        data.sigBytes = (dataWords.length + 1) * 4;

        // 雜湊最後的數據塊
        this._process();

        // 變量設定
        var hash = this._hash;
        var H = hash.words;

        // 交換字元序
        for (var i = 0; i < 5; i++) {
          // 變量設定
          var H_i = H[i];

          // 交換
          H[i] = (H_i << 8 | H_i >>> 24) & 0x00ff00ff | (H_i << 24 | H_i >>> 8) & 0xff00ff00;
        }

        // 返回最終計算的雜湊值
        return hash;
      },
      /**
       * 創建此雜湊器的副本。
       *
       * @return {Hasher} 複製的雜湊器。
       *
       * @example
       *
       *     var clone = ripemd160Hasher.clone();
       */
      clone: function clone() {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
      }
    });
    function f1(x, y, z) {
      // 計算 x 與 y 的 XOR，再與 z 進行 XOR 運算
      return x ^ y ^ z;
    }
    function f2(x, y, z) {
      // 計算 (x 與 y 的 AND) 與 (x 的 NOT 與 z 的 AND) 的 OR 運算
      return x & y | ~x & z;
    }
    function f3(x, y, z) {
      // 計算 (x 與 y 的 NOT 的 OR) 與 z 的 XOR 運算
      return (x | ~y) ^ z;
    }
    function f4(x, y, z) {
      // 計算 (x 與 z 的 AND) 與 (y 與 z 的 NOT 的 AND) 的 OR 運算
      return x & z | y & ~z;
    }
    function f5(x, y, z) {
      // 計算 x 與 (y 與 z 的 NOT 的 OR) 的 XOR 運算
      return x ^ (y | ~z);
    }
    function rotl(x, n) {
      // 將 x 向左旋轉 n 位元
      return x << n | x >>> 32 - n;
    }

    /**
     * 快捷方式函數，用於呼叫 RIPEMD160 雜湊器的物件介面。
     *
     * @param {WordArray|string} message 要進行雜湊運算的訊息，可以是 WordArray 或字串格式。
     *
     * @return {WordArray} 雜湊結果，以 WordArray 格式返回。
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.RIPEMD160('message');
     *     var hash = CryptoJS.RIPEMD160(wordArray);
     */
    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);

    /**
     * 快捷方式函數，用於呼叫 HMAC 的物件介面。
     *
     * @param {WordArray|string} message 要進行雜湊運算的訊息，可以是 WordArray 或字串格式。
     * @param {WordArray|string} key 用於生成 HMAC 的密鑰，可以是 WordArray 或字串格式。
     *
     * @return {WordArray} HMAC 值，以 WordArray 格式返回。
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
     */
    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
  })(Math);
  (function () {
    // 變量設定
    var C = CryptoJS; // CryptoJS 命名空間
    var C_lib = C.lib; // 庫命名空間
    var Base = C_lib.Base; // 基礎對象
    var C_enc = C.enc; // 編碼器命名空間
    var Utf8 = C_enc.Utf8; // UTF-8 編碼策略
    var C_algo = C.algo; // 算法命名空間

    /**
     * HMAC 演算法。
     */
    var HMAC = C_algo.HMAC = Base.extend({
      /**
       * 初始化新創建的 HMAC。
       *
       * @param {Hasher} hasher 要使用的雜湊算法。
       * @param {WordArray|string} key 秘密金鑰。
       *
       * @example
       *
       *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
       */
      init: function init(hasher, key) {
        // 初始化雜湊算法
        hasher = this._hasher = new hasher.init();

        // 將字串轉換為 WordArray，否則假設已經是 WordArray
        if (typeof key == 'string') {
          key = Utf8.parse(key);
        }

        // 變量設定
        var hasherBlockSize = hasher.blockSize; // 雜湊算法的區塊大小
        var hasherBlockSizeBytes = hasherBlockSize * 4; // 雜湊算法的區塊大小（以位元組為單位）

        // 允許任意長度的金鑰
        if (key.sigBytes > hasherBlockSizeBytes) {
          key = hasher.finalize(key);
        }

        // 截斷多餘的位元
        key.clamp();

        // 複製金鑰以供內外填充使用
        var oKey = this._oKey = key.clone();
        var iKey = this._iKey = key.clone();

        // 變量設定
        var oKeyWords = oKey.words;
        var iKeyWords = iKey.words;

        // 將金鑰與填充常數進行 XOR 運算
        for (var i = 0; i < hasherBlockSize; i++) {
          oKeyWords[i] ^= 0x5c5c5c5c;
          iKeyWords[i] ^= 0x36363636;
        }
        oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

        // 設定初始值
        this.reset();
      },
      /**
       * 將此 HMAC 重置為初始狀態。
       *
       * @example
       *
       *     hmacHasher.reset();
       */
      reset: function reset() {
        // 變量設定
        var hasher = this._hasher;

        // 重置
        hasher.reset();
        hasher.update(this._iKey);
      },
      /**
       * 使用消息更新此 HMAC。
       *
       * @param {WordArray|string} messageUpdate 要追加的消息。
       *
       * @return {HMAC} 此 HMAC 實例。
       *
       * @example
       *
       *     hmacHasher.update('message');
       *     hmacHasher.update(wordArray);
       */
      update: function update(messageUpdate) {
        this._hasher.update(messageUpdate);

        // 支持鏈式調用
        return this;
      },
      /**
       * 完成 HMAC 計算。
       * 請注意，finalize 操作實際上是一個破壞性的、一次性讀取操作。
       *
       * @param {WordArray|string} messageUpdate (選擇性) 最後的消息更新。
       *
       * @return {WordArray} HMAC 值。
       *
       * @example
       *
       *     var hmac = hmacHasher.finalize();
       *     var hmac = hmacHasher.finalize('message');
       *     var hmac = hmacHasher.finalize(wordArray);
       */
      finalize: function finalize(messageUpdate) {
        // 變量設定
        var hasher = this._hasher;

        // 計算 HMAC
        var innerHash = hasher.finalize(messageUpdate);
        hasher.reset();
        var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
        return hmac;
      }
    });
  })();
  (function () {
    // 變量設定
    var C = CryptoJS; // CryptoJS 命名空間
    var C_lib = C.lib; // 庫命名空間
    var Base = C_lib.Base; // 基礎對象
    var WordArray = C_lib.WordArray; // 32位字數組類
    var C_algo = C.algo; // 算法命名空間
    var SHA1 = C_algo.SHA1; // SHA1 雜湊算法
    var HMAC = C_algo.HMAC; // HMAC 雜湊算法

    /**
     * 基於密碼的金鑰派生函數2 (PBKDF2) 算法實作
     * 用於從密碼和鹽值生成加密金鑰
     */
    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
      /**
       * 配置選項。
       *
       * @property {number} keySize 要生成的密鑰大小（以字為單位）。默認: 4 (128 位)
       * @property {Hasher} hasher 要使用的雜湊算法。默認: SHA1
       * @property {number} iterations 要執行的迭代次數。默認: 1
       */
      cfg: Base.extend({
        keySize: 128 / 32,
        hasher: SHA1,
        iterations: 1
      }),
      /**
       * 初始化新創建的金鑰派生函數
       *
       * @param {Object} cfg (選擇性) 用於衍生的配置選項。
       *
       * @example
       *
       *     var kdf = CryptoJS.algo.PBKDF2.create();
       *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
       *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
       */
      init: function init(cfg) {
        this.cfg = this.cfg.extend(cfg);
      },
      /**
       * 計算基於密碼的金鑰派生函數2 (PBKDF2)
       *
       * @param {WordArray|string} password 密碼。
       * @param {WordArray|string} salt 盐值。
       *
       * @return {WordArray} 導出的密鑰。
       *
       * @example
       *
       *     var key = kdf.compute(password, salt);
       */
      compute: function compute(password, salt) {
        // 變量設定
        var cfg = this.cfg;

        // 初始化 HMAC
        var hmac = HMAC.create(cfg.hasher, password);

        // 初始值
        var derivedKey = WordArray.create();
        var blockIndex = WordArray.create([0x00000001]);

        // 變量設定
        var derivedKeyWords = derivedKey.words;
        var blockIndexWords = blockIndex.words;
        var keySize = cfg.keySize;
        var iterations = cfg.iterations;

        // 生成密鑰
        while (derivedKeyWords.length < keySize) {
          var block = hmac.update(salt).finalize(blockIndex);
          hmac.reset();

          // 變量設定
          var blockWords = block.words;
          var blockWordsLength = blockWords.length;

          // 迭代
          var intermediate = block;
          for (var i = 1; i < iterations; i++) {
            intermediate = hmac.finalize(intermediate);
            hmac.reset();

            // 變量設定
            var intermediateWords = intermediate.words;

            // XOR 中間結果與 block
            for (var j = 0; j < blockWordsLength; j++) {
              blockWords[j] ^= intermediateWords[j];
            }
          }

          // 將處理後的區塊加入最終金鑰
          derivedKey.concat(block);
          // 增加區塊索引
          blockIndexWords[0]++;
        }
        // 設置最終金鑰的位元組長度
        derivedKey.sigBytes = keySize * 4;
        return derivedKey;
      }
    });

    /**
     * 計算基於密碼的金鑰派生函數2 (PBKDF2) 的快捷方法
     *
     * @param {WordArray|string} password 密碼。
     * @param {WordArray|string} salt 盐值。
     * @param {Object} cfg (選擇性) 用於此計算的配置選項。
     *
     * @return {WordArray} 導出的密鑰。
     *
     * @static
     *
     * @example
     *
     *     var key = CryptoJS.PBKDF2(password, salt);
     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
     */
    C.PBKDF2 = function (password, salt, cfg) {
      return PBKDF2.create(cfg).compute(password, salt);
    };
  })();
  (function () {
    // 變量設定
    var C = CryptoJS; // CryptoJS 命名空間
    var C_lib = C.lib; // 庫命名空間
    var Base = C_lib.Base; // 基礎對象
    var WordArray = C_lib.WordArray; // 32位字數組類
    var C_algo = C.algo; // 算法命名空間
    var MD5 = C_algo.MD5; // MD5 雜湊算法

    /**
     * 此密鑰衍生函數旨在符合 EVP_BytesToKey。
     * 請參考：www.openssl.org/docs/crypto/EVP_BytesToKey.html
     */
    var EvpKDF = C_algo.EvpKDF = Base.extend({
      /**
       * 配置選項。
       *
       * @property {number} keySize 要生成的密鑰大小（以字為單位）。默認: 4 (128 位)
       * @property {Hasher} hasher 要使用的雜湊算法。默認: MD5
       * @property {number} iterations 要執行的迭代次數。默認: 1
       */
      cfg: Base.extend({
        keySize: 128 / 32,
        hasher: MD5,
        iterations: 1
      }),
      /**
       * 初始化新創建的密鑰衍生函數。
       *
       * @param {Object} cfg (選擇性) 用於衍生的配置選項。
       *
       * @example
       *
       *     var kdf = CryptoJS.algo.EvpKDF.create();
       *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
       *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
       */
      init: function init(cfg) {
        this.cfg = this.cfg.extend(cfg);
      },
      /**
       * 從密碼導出密鑰。
       *
       * @param {WordArray|string} password 密碼。
       * @param {WordArray|string} salt 盐值。
       *
       * @return {WordArray} 導出的密鑰。
       *
       * @example
       *
       *     var key = kdf.compute(password, salt);
       */
      compute: function compute(password, salt) {
        var block;

        // 變量設定
        var cfg = this.cfg;

        // 初始化雜湊器
        var hasher = cfg.hasher.create();

        // 初始值
        var derivedKey = WordArray.create();

        // 變量設定
        var derivedKeyWords = derivedKey.words;
        var keySize = cfg.keySize;
        var iterations = cfg.iterations;

        // 生成密鑰
        while (derivedKeyWords.length < keySize) {
          if (block) {
            hasher.update(block);
          }
          block = hasher.update(password).finalize(salt);
          hasher.reset();

          // 迭代
          for (var i = 1; i < iterations; i++) {
            block = hasher.finalize(block);
            hasher.reset();
          }
          derivedKey.concat(block);
        }
        derivedKey.sigBytes = keySize * 4;
        return derivedKey;
      }
    });

    /**
     * 從密碼導出密鑰。
     *
     * @param {WordArray|string} password 密碼。
     * @param {WordArray|string} salt 盐值。
     * @param {Object} cfg (選擇性) 用於此計算的配置選項。
     *
     * @return {WordArray} 導出的密鑰。
     *
     * @static
     *
     * @example
     *
     *     var key = CryptoJS.EvpKDF(password, salt);
     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
     */
    C.EvpKDF = function (password, salt, cfg) {
      return EvpKDF.create(cfg).compute(password, salt);
    };
  })();

  /**
   * 密碼核心組件。
   */
  CryptoJS.lib.Cipher || function (undefined) {
    // 變量設定
    var C = CryptoJS; // CryptoJS 命名空間
    var C_lib = C.lib; // 庫命名空間
    var Base = C_lib.Base; // 基礎對象
    var WordArray = C_lib.WordArray; // 32位字數組類
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm; // 緩衝區塊算法基類
    var C_enc = C.enc; // 編碼器命名空間
    var Utf8 = C_enc.Utf8; // UTF-8 編碼策略
    var Base64 = C_enc.Base64; // Base64 編碼策略
    var C_algo = C.algo; // 算法命名空間
    var EvpKDF = C_algo.EvpKDF; // EVP 密鑰導出函數

    /**
     * 抽象基底密碼模板。
     *
     * @property {number} keySize 這個密碼的金鑰大小。預設: 4 (128 位元)
     * @property {number} ivSize 這個密碼的初始向量大小。預設: 4 (128 位元)
     * @property {number} _ENC_XFORM_MODE 一個常數，表示加密模式。
     * @property {number} _DEC_XFORM_MODE 一個常數，表示解密模式。
     */
    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
      /**
       * 設定選項。
       *
       * @property {WordArray} iv 用於此操作的初始向量。
       */
      cfg: Base.extend(),
      /**
       * 創建此密碼的加密器。
       *
       * @param {WordArray} key 金鑰。
       * @param {Object} cfg (選擇性) 用於此操作的設定選項。
       *
       * @return {Cipher} 密碼實例。
       *
       * @static
       *
       * @example
       *
       *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
       */
      createEncryptor: function createEncryptor(key, cfg) {
        return this.create(this._ENC_XFORM_MODE, key, cfg);
      },
      /**
       * 創建此密碼的解密器。
       *
       * @param {WordArray} key 金鑰。
       * @param {Object} cfg (選擇性) 用於此操作的設定選項。
       *
       * @return {Cipher} 密碼實例。
       *
       * @static
       *
       * @example
       *
       *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
       */
      createDecryptor: function createDecryptor(key, cfg) {
        return this.create(this._DEC_XFORM_MODE, key, cfg);
      },
      /**
       * 初始化新建立的密碼。
       *
       * @param {number} xformMode 加密或解密的轉換模式常數。
       * @param {WordArray} key 金鑰。
       * @param {Object} cfg (選擇性) 用於此操作的設定選項。
       *
       * @example
       *
       *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
       */
      init: function init(xformMode, key, cfg) {
        // 套用設定預設值
        this.cfg = this.cfg.extend(cfg);

        // 儲存轉換模式和金鑰
        this._xformMode = xformMode;
        this._key = key;

        // 設定初始值
        this.reset();
      },
      /**
       * 將此密碼重設為初始狀態。
       *
       * @example
       *
       *     cipher.reset();
       */
      reset: function reset() {
        // 重設資料緩衝區
        BufferedBlockAlgorithm.reset.call(this);

        // 執行具體密碼邏輯
        this._doReset();
      },
      /**
       * 加入要加密或解密的資料。
       *
       * @param {WordArray|string} dataUpdate 要加密或解密的資料。
       *
       * @return {WordArray} 處理後的資料。
       *
       * @example
       *
       *     var encrypted = cipher.process('data');
       *     var encrypted = cipher.process(wordArray);
       */
      process: function process(dataUpdate) {
        // 加入
        this._append(dataUpdate);

        // 處理可用的區塊
        return this._process();
      },
      /**
       * 完成加密或解密的過程。
       * 請注意，finalize 操作實際上是一個破壞性的、一次性讀取操作。
       *
       * @param {WordArray|string} dataUpdate 最終的要加密或解密的資料。
       *
       * @return {WordArray} 最終處理後的資料。
       *
       * @example
       *
       *     var encrypted = cipher.finalize();
       *     var encrypted = cipher.finalize('data');
       *     var encrypted = cipher.finalize(wordArray);
       */
      finalize: function finalize(dataUpdate) {
        // 最終資料更新
        if (dataUpdate) {
          this._append(dataUpdate);
        }

        // 執行具體密碼邏輯
        var finalProcessedData = this._doFinalize();
        return finalProcessedData;
      },
      keySize: 128 / 32,
      // 金鑰大小，以 32 位元字為單位

      ivSize: 128 / 32,
      // 初始向量大小，以 32 位元字為單位

      _ENC_XFORM_MODE: 1,
      // 加密轉換模式常數

      _DEC_XFORM_MODE: 2,
      // 解密轉換模式常數

      /**
       * 創建密碼物件介面的捷徑函數。
       *
       * @param {Cipher} cipher 要建立捷徑的密碼。
       *
       * @return {Object} 包含 encrypt 和 decrypt 捷徑函數的物件。
       *
       * @static
       *
       * @example
       *
       *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
       */
      _createHelper: function () {
        function selectCipherStrategy(key) {
          if (typeof key == 'string') {
            return PasswordBasedCipher;
          } else {
            return SerializableCipher;
          }
        }
        return function (cipher) {
          return {
            encrypt: function encrypt(message, key, cfg) {
              return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
            },
            decrypt: function decrypt(ciphertext, key, cfg) {
              return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
            }
          };
        };
      }()
    });

    /**
     * 抽象基底串流密碼模板。
     *
     * @property {number} blockSize 這個密碼操作的 32 位元字數。預設: 1 (32 位元)
     */
    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
      _doFinalize: function _doFinalize() {
        // 處理部分區塊
        var finalProcessedBlocks = this._process(!!'flush');
        return finalProcessedBlocks;
      },
      blockSize: 1
    });

    /**
     * 模式命名空間。
     */
    var C_mode = C.mode = {};

    /**
     * 抽象基底區塊密碼模式模板。
     */
    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
      /**
       * 創建此模式的加密器。
       *
       * @param {Cipher} cipher 區塊密碼實例。
       * @param {Array} iv IV 字。
       *
       * @static
       *
       * @example
       *
       *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
       */
      createEncryptor: function createEncryptor(cipher, iv) {
        return this.Encryptor.create(cipher, iv);
      },
      /**
       * 創建此模式的解密器。
       *
       * @param {Cipher} cipher 區塊密碼實例。
       * @param {Array} iv IV 字。
       *
       * @static
       *
       * @example
       *
       *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
       */
      createDecryptor: function createDecryptor(cipher, iv) {
        return this.Decryptor.create(cipher, iv);
      },
      /**
       * 初始化新建立的模式。
       *
       * @param {Cipher} cipher 區塊密碼實例。
       * @param {Array} iv IV 字。
       *
       * @example
       *
       *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
       */
      init: function init(cipher, iv) {
        this._cipher = cipher;
        this._iv = iv;
      }
    });

    /**
     * 密碼區塊鏈結模式。
     */
    var CBC = C_mode.CBC = function () {
      /**
       * 抽象基底 CBC 模式。
       */
      var CBC = BlockCipherMode.extend();

      /**
       * CBC 加密器。
       */
      CBC.Encryptor = CBC.extend({
        /**
         * 處理位於偏移量的數據區塊。
         *
         * @param {Array} words 要操作的數據字。
         * @param {number} offset 區塊開始的偏移量。
         *
         * @example
         *
         *     mode.processBlock(data.words, offset);
         */
        processBlock: function processBlock(words, offset) {
          // 變量設定
          var cipher = this._cipher;
          var blockSize = cipher.blockSize;

          // XOR 和加密
          xorBlock.call(this, words, offset, blockSize);
          cipher.encryptBlock(words, offset);

          // 記住此區塊以便與下一個區塊使用
          this._prevBlock = words.slice(offset, offset + blockSize);
        }
      });

      /**
       * CBC 解密器。
       */
      CBC.Decryptor = CBC.extend({
        /**
         * 處理位於偏移量的數據區塊。
         *
         * @param {Array} words 要操作的數據字。
         * @param {number} offset 區塊開始的偏移量。
         *
         * @example
         *
         *     mode.processBlock(data.words, offset);
         */
        processBlock: function processBlock(words, offset) {
          // 變量設定
          var cipher = this._cipher;
          var blockSize = cipher.blockSize;

          // 記住此區塊以便與下一個區塊使用
          var thisBlock = words.slice(offset, offset + blockSize);

          // 解密和 XOR
          cipher.decryptBlock(words, offset);
          xorBlock.call(this, words, offset, blockSize);

          // 此區塊成為前一個區塊
          this._prevBlock = thisBlock;
        }
      });
      function xorBlock(words, offset, blockSize) {
        var block;

        // 變量設定
        var iv = this._iv;

        // 選擇混合區塊
        if (iv) {
          block = iv;

          // 移除 IV 以便後續區塊使用
          this._iv = undefined;
        } else {
          block = this._prevBlock;
        }

        // XOR 區塊
        for (var i = 0; i < blockSize; i++) {
          words[offset + i] ^= block[i];
        }
      }
      return CBC;
    }();

    /**
     * 填充命名空間。
     */
    var C_pad = C.pad = {};

    /**
     * PKCS #5/7 填充策略。
     */
    var Pkcs7 = C_pad.Pkcs7 = {
      /**
       * 使用 PKCS #5/7 定義的演算法填充數據。
       *
       * @param {WordArray} data 要填充的數據。
       * @param {number} blockSize 數據應該填充到的倍數。
       *
       * @static
       *
       * @example
       *
       *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
       */
      pad: function pad(data, blockSize) {
        // 變量設定
        var blockSizeBytes = blockSize * 4;

        // 計算填充位元數
        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

        // 創建填充字
        var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;

        // 創建填充
        var paddingWords = [];
        for (var i = 0; i < nPaddingBytes; i += 4) {
          paddingWords.push(paddingWord);
        }
        var padding = WordArray.create(paddingWords, nPaddingBytes);

        // 添加填充
        data.concat(padding);
      },
      /**
       * 移除使用 PKCS #5/7 定義的演算法填充的數據。
       *
       * @param {WordArray} data 要移除填充的數據。
       *
       * @static
       *
       * @example
       *
       *     CryptoJS.pad.Pkcs7.unpad(wordArray);
       */
      unpad: function unpad(data) {
        // 從最後一個位元取出填充位元數
        var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 0xff;

        // 移除填充
        data.sigBytes -= nPaddingBytes;
      }
    };

    /**
     * 抽象區塊密碼模板。
     *
     * @property {number} blockSize 這個密碼運算的 32 位元字數。預設: 4 (128 位元)
     */
    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
      /**
       * 設定選項。
       *
       * @property {Mode} mode 要使用的區塊模式。預設: CBC
       * @property {Padding} padding 要使用的填充策略。預設: Pkcs7
       */
      cfg: Cipher.cfg.extend({
        mode: CBC,
        padding: Pkcs7
      }),
      reset: function reset() {
        var modeCreator;

        // 重設密碼
        Cipher.reset.call(this);

        // 變量設定
        var cfg = this.cfg;
        var iv = cfg.iv;
        var mode = cfg.mode;

        // 重設區塊模式
        if (this._xformMode == this._ENC_XFORM_MODE) {
          modeCreator = mode.createEncryptor;
        } else /* if (this._xformMode == this._DEC_XFORM_MODE) */{
            modeCreator = mode.createDecryptor;
            // 至少在緩衝區中保留一個區塊以供去除填充使用
            this._minBufferSize = 1;
          }
        if (this._mode && this._mode.__creator == modeCreator) {
          this._mode.init(this, iv && iv.words);
        } else {
          this._mode = modeCreator.call(mode, this, iv && iv.words);
          this._mode.__creator = modeCreator;
        }
      },
      _doProcessBlock: function _doProcessBlock(words, offset) {
        this._mode.processBlock(words, offset);
      },
      _doFinalize: function _doFinalize() {
        var finalProcessedBlocks;

        // 變量設定
        var padding = this.cfg.padding;

        // 最終處理
        if (this._xformMode == this._ENC_XFORM_MODE) {
          // 填充數據
          padding.pad(this._data, this.blockSize);

          // 處理最後的區塊
          finalProcessedBlocks = this._process(!!'flush');
        } else /* if (this._xformMode == this._DEC_XFORM_MODE) */{
            // 處理最後的區塊
            finalProcessedBlocks = this._process(!!'flush');

            // 去除填充
            padding.unpad(finalProcessedBlocks);
          }
        return finalProcessedBlocks;
      },
      blockSize: 128 / 32
    });

    /**
     * 密碼參數的集合。
     *
     * @property {WordArray} ciphertext 原始的密文。
     * @property {WordArray} key 這個密文的金鑰。
     * @property {WordArray} iv 用於密碼運算的初始向量。
     * @property {WordArray} salt 用於金鑰導出函數的鹽值。
     * @property {Cipher} algorithm 用於密碼運算的密碼演算法。
     * @property {Mode} mode 用於密碼運算的區塊模式。
     * @property {Padding} padding 用於密碼運算的填充方案。
     * @property {number} blockSize 密碼的區塊大小。
     * @property {Format} formatter 將此密碼參數物件轉換為字串的預設格式化策略。
     */
    var CipherParams = C_lib.CipherParams = Base.extend({
      /**
       * 初始化新建立的密碼參數物件。
       *
       * @param {Object} cipherParams 包含可能的密碼參數的物件。
       *
       * @example
       *
       *     var cipherParams = CryptoJS.lib.CipherParams.create({
       *         ciphertext: ciphertextWordArray,
       *         key: keyWordArray,
       *         iv: ivWordArray,
       *         salt: saltWordArray,
       *         algorithm: CryptoJS.algo.AES,
       *         mode: CryptoJS.mode.CBC,
       *         padding: CryptoJS.pad.PKCS7,
       *         blockSize: 4,
       *         formatter: CryptoJS.format.OpenSSL
       *     });
       */
      init: function init(cipherParams) {
        this.mixIn(cipherParams);
      },
      /**
       * 將此密碼參數物件轉換為字串。
       *
       * @param {Format} formatter (選擇性) 要使用的格式化策略。
       *
       * @return {string} 字串化的密碼參數。
       *
       * @throws Error 如果未設定格式化策略或預設格式化策略。
       *
       * @example
       *
       *     var string = cipherParams + '';
       *     var string = cipherParams.toString();
       *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
       */
      toString: function toString(formatter) {
        return (formatter || this.formatter).stringify(this);
      }
    });

    /**
     * 格式命名空間。
     */
    var C_format = C.format = {};

    /**
     * OpenSSL 格式化策略。
     */
    var OpenSSLFormatter = C_format.OpenSSL = {
      /**
       * 將加密參數物件轉換為與 OpenSSL 兼容的字串。
       *
       * @param {CipherParams} cipherParams 加密參數物件。
       *
       * @return {string} 與 OpenSSL 兼容的字串。
       *
       * @static
       *
       * @example
       *
       *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
       */
      stringify: function stringify(cipherParams) {
        var wordArray;

        // 變量設定
        var ciphertext = cipherParams.ciphertext;
        var salt = cipherParams.salt;

        // 格式化
        if (salt) {
          wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
        } else {
          wordArray = ciphertext;
        }
        return wordArray.toString(Base64);
      },
      /**
       * 將與 OpenSSL 兼容的字串轉換為加密參數物件。
       *
       * @param {string} openSSLStr 與 OpenSSL 兼容的字串。
       *
       * @return {CipherParams} 加密參數物件。
       *
       * @static
       *
       * @example
       *
       *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
       */
      parse: function parse(openSSLStr) {
        var salt;

        // 解析 base64
        var ciphertext = Base64.parse(openSSLStr);

        // 變量設定
        var ciphertextWords = ciphertext.words;

        // 測試是否有 salt
        if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
          // 提取 salt
          salt = WordArray.create(ciphertextWords.slice(2, 4));

          // 從 ciphertext 中移除 salt
          ciphertextWords.splice(0, 4);
          ciphertext.sigBytes -= 16;
        }
        return CipherParams.create({
          ciphertext: ciphertext,
          salt: salt
        });
      }
    };

    /**
     * 一個加密包裝器，返回可序列化的加密參數物件。
     */
    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
      /**
       * 設定選項。
       *
       * @property {Formatter} format 用於將加密參數物件轉換為和從字串轉換的格式化策略。預設: OpenSSL
       */
      cfg: Base.extend({
        format: OpenSSLFormatter
      }),
      /**
       * 加密消息。
       *
       * @param {Cipher} cipher 用於加密的加密演算法。
       * @param {WordArray|string} message 要加密的消息。
       * @param {WordArray} key 金鑰。
       * @param {Object} cfg (選擇性) 用於此操作的設定選項。
       *
       * @return {CipherParams} 加密參數物件。
       *
       * @static
       *
       * @example
       *
       *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
       *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
       *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
       */
      encrypt: function encrypt(cipher, message, key, cfg) {
        // 套用設定預設值
        cfg = this.cfg.extend(cfg);

        // 加密
        var encryptor = cipher.createEncryptor(key, cfg);
        var ciphertext = encryptor.finalize(message);

        // 變量設定
        var cipherCfg = encryptor.cfg;

        // 創建並返回可序列化的加密參數
        return CipherParams.create({
          ciphertext: ciphertext,
          key: key,
          iv: cipherCfg.iv,
          algorithm: cipher,
          mode: cipherCfg.mode,
          padding: cipherCfg.padding,
          blockSize: cipher.blockSize,
          formatter: cfg.format
        });
      },
      /**
       * 解密序列化的密文。
       *
       * @param {Cipher} cipher 用於解密的加密演算法。
       * @param {CipherParams|string} ciphertext 要解密的密文。
       * @param {WordArray} key 金鑰。
       * @param {Object} cfg (選擇性) 用於此操作的設定選項。
       *
       * @return {WordArray} 明文。
       *
       * @static
       *
       * @example
       *
       *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
       *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
       */
      decrypt: function decrypt(cipher, ciphertext, key, cfg) {
        // 套用設定預設值
        cfg = this.cfg.extend(cfg);

        // 將字串轉換為 CipherParams
        ciphertext = this._parse(ciphertext, cfg.format);

        // 解密
        var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
        return plaintext;
      },
      /**
       * 將序列化的密文轉換為 CipherParams，
       * 否則假設已經是 CipherParams 並返回不變的密文。
       *
       * @param {CipherParams|string} ciphertext 密文。
       * @param {Formatter} format 用於解析序列化密文的格式化策略。
       *
       * @return {CipherParams} 未序列化的密文。
       *
       * @static
       *
       * @example
       *
       *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
       */
      _parse: function _parse(ciphertext, format) {
        if (typeof ciphertext == 'string') {
          return format.parse(ciphertext, this);
        } else {
          return ciphertext;
        }
      }
    });

    /**
     * 金鑰導出函數命名空間。
     */
    var C_kdf = C.kdf = {};

    /**
     * OpenSSL 金鑰導出函數。
     */
    var OpenSSLKdf = C_kdf.OpenSSL = {
      /**
       * 從密碼衍生出金鑰和 IV。
       *
       * @param {string} password 用於衍生的密碼。
       * @param {number} keySize 要生成的金鑰大小（以字為單位）。
       * @param {number} ivSize 要生成的 IV 大小（以字為單位）。
       * @param {WordArray|string} salt (選擇性) 用於衍生的 64 位元鹽值。如果省略，將會隨機生成一個鹽值。
       *
       * @return {CipherParams} 包含衍生出的金鑰、IV 和鹽值的加密參數物件。
       *
       * @static
       *
       * @example
       *
       *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
       *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
       */
      execute: function execute(password, keySize, ivSize, salt) {
        // 生成隨機鹽值
        if (!salt) {
          salt = WordArray.random(64 / 8);
        }

        // 從密碼衍生出金鑰和 IV
        var key = EvpKDF.create({
          keySize: keySize + ivSize
        }).compute(password, salt);

        // 分離金鑰和 IV
        var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
        key.sigBytes = keySize * 4;

        // 返回參數
        return CipherParams.create({
          key: key,
          iv: iv,
          salt: salt
        });
      }
    };

    /**
     * 可序列化的密碼基加密封裝器，從密碼衍生出金鑰，
     * 並返回可序列化的密文參數物件。
     */
    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
      /**
       * 設定選項。
       *
       * @property {KDF} kdf 用於從密碼生成金鑰和 IV 的金鑰導出函數。預設: OpenSSL
       */
      cfg: SerializableCipher.cfg.extend({
        kdf: OpenSSLKdf
      }),
      /**
       * 使用密碼加密訊息。
       *
       * @param {Cipher} cipher 用於加密的加密演算法。
       * @param {WordArray|string} message 要加密的訊息。
       * @param {string} password 用於加密的密碼。
       * @param {Object} cfg (選擇性) 用於此操作的設定選項。
       *
       * @return {CipherParams} 包含密文的加密參數物件。
       *
       * @static
       *
       * @example
       *
       *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
       *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
       */
      encrypt: function encrypt(cipher, message, password, cfg) {
        // 套用預設設定
        cfg = this.cfg.extend(cfg);

        // 從密碼衍生出金鑰和其他參數
        var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

        // 將 IV 加入設定
        cfg.iv = derivedParams.iv;

        // 加密
        var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

        // 將衍生出的參數混入
        ciphertext.mixIn(derivedParams);
        return ciphertext;
      },
      /**
       * 使用密碼解密序列化的密文。
       *
       * @param {Cipher} cipher 用於解密的加密演算法。
       * @param {CipherParams|string} ciphertext 要解密的密文。
       * @param {string} password 用於解密的密碼。
       * @param {Object} cfg (選擇性) 用於此操作的設定選項。
       *
       * @return {WordArray} 明文。
       *
       * @static
       *
       * @example
       *
       *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
       *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
       */
      decrypt: function decrypt(cipher, ciphertext, password, cfg) {
        // 套用預設設定
        cfg = this.cfg.extend(cfg);

        // 將字串轉換為 CipherParams
        ciphertext = this._parse(ciphertext, cfg.format);

        // 從密碼衍生出金鑰和其他參數
        var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

        // 將 IV 加入設定
        cfg.iv = derivedParams.iv;

        // 解密
        var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
        return plaintext;
      }
    });
  }();

  /**
   * 密文反饋塊模式。
   */
  CryptoJS.mode.CFB = function () {
    var CFB = CryptoJS.lib.BlockCipherMode.extend();
    CFB.Encryptor = CFB.extend({
      processBlock: function processBlock(words, offset) {
        // 變量設定
        var cipher = this._cipher;
        var blockSize = cipher.blockSize;

        // 生成密鑰流並加密
        generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

        // 記住此塊以便用於下一塊
        this._prevBlock = words.slice(offset, offset + blockSize);
      }
    });
    CFB.Decryptor = CFB.extend({
      processBlock: function processBlock(words, offset) {
        // 變量設定
        var cipher = this._cipher;
        var blockSize = cipher.blockSize;

        // 記住此塊以便用於下一塊
        var thisBlock = words.slice(offset, offset + blockSize);

        // 生成密鑰流並加密
        generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

        // 此塊成為前一塊
        this._prevBlock = thisBlock;
      }
    });

    // 生成密鑰流並加密
    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
      var keystream;

      // 變量設定
      var iv = this._iv;

      // 生成密鑰流
      if (iv) {
        keystream = iv.slice(0);

        // 移除後續塊的 IV
        this._iv = undefined;
      } else {
        keystream = this._prevBlock;
      }
      cipher.encryptBlock(keystream, 0);

      // 加密
      for (var i = 0; i < blockSize; i++) {
        words[offset + i] ^= keystream[i];
      }
    }
    return CFB;
  }();

  /**
   * 計數器塊模式。
   */
  CryptoJS.mode.CTR = function () {
    var CTR = CryptoJS.lib.BlockCipherMode.extend();
    var Encryptor = CTR.Encryptor = CTR.extend({
      processBlock: function processBlock(words, offset) {
        // 變量設定
        var cipher = this._cipher;
        var blockSize = cipher.blockSize;
        var iv = this._iv;
        var counter = this._counter;

        // 生成密鑰流
        if (iv) {
          counter = this._counter = iv.slice(0);

          // 移除後續塊的 IV
          this._iv = undefined;
        }
        var keystream = counter.slice(0);
        cipher.encryptBlock(keystream, 0);

        // 增加計數器
        counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;

        // 加密
        for (var i = 0; i < blockSize; i++) {
          words[offset + i] ^= keystream[i];
        }
      }
    });
    CTR.Decryptor = Encryptor;
    return CTR;
  }();

  /** @preserve
   * Counter block mode compatible with  Dr Brian Gladman fileenc.c
   * derived from CryptoJS.mode.CTR
   * Jan Hruby jhruby.web@gmail.com
   */
  CryptoJS.mode.CTRGladman = function () {
    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

    // 增加單字
    function incWord(word) {
      if ((word >> 24 & 0xff) === 0xff) {
        // 溢位
        var b1 = word >> 16 & 0xff;
        var b2 = word >> 8 & 0xff;
        var b3 = word & 0xff;
        if (b1 === 0xff) {
          // b1 溢位
          b1 = 0;
          if (b2 === 0xff) {
            b2 = 0;
            if (b3 === 0xff) {
              b3 = 0;
            } else {
              ++b3;
            }
          } else {
            ++b2;
          }
        } else {
          ++b1;
        }
        word = 0;
        word += b1 << 16;
        word += b2 << 8;
        word += b3;
      } else {
        word += 0x01 << 24;
      }
      return word;
    }

    // 增加計數器
    function incCounter(counter) {
      if ((counter[0] = incWord(counter[0])) === 0) {
        // fileenc.c 中的 encr_data 從 Dr Brian Gladman 的文件計數僅當 DWORD j < 8 時
        counter[1] = incWord(counter[1]);
      }
      return counter;
    }
    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
      processBlock: function processBlock(words, offset) {
        // 變量設定
        var cipher = this._cipher;
        var blockSize = cipher.blockSize;
        var iv = this._iv;
        var counter = this._counter;

        // 生成密鑰流
        if (iv) {
          counter = this._counter = iv.slice(0);

          // 移除後續塊的 IV
          this._iv = undefined;
        }
        incCounter(counter);
        var keystream = counter.slice(0);
        cipher.encryptBlock(keystream, 0);

        // 加密
        for (var i = 0; i < blockSize; i++) {
          words[offset + i] ^= keystream[i];
        }
      }
    });
    CTRGladman.Decryptor = Encryptor;
    return CTRGladman;
  }();

  /**
   * 輸出反饋塊模式。
   */
  CryptoJS.mode.OFB = function () {
    var OFB = CryptoJS.lib.BlockCipherMode.extend();
    var Encryptor = OFB.Encryptor = OFB.extend({
      processBlock: function processBlock(words, offset) {
        // 變量設定
        var cipher = this._cipher;
        var blockSize = cipher.blockSize;
        var iv = this._iv;
        var keystream = this._keystream;

        // 生成密鑰流
        if (iv) {
          keystream = this._keystream = iv.slice(0);

          // 移除後續塊的 IV
          this._iv = undefined;
        }
        cipher.encryptBlock(keystream, 0);

        // 加密
        for (var i = 0; i < blockSize; i++) {
          words[offset + i] ^= keystream[i];
        }
      }
    });
    OFB.Decryptor = Encryptor;
    return OFB;
  }();

  /**
   * 電子密碼本塊模式。
   */
  CryptoJS.mode.ECB = function () {
    var ECB = CryptoJS.lib.BlockCipherMode.extend();
    ECB.Encryptor = ECB.extend({
      processBlock: function processBlock(words, offset) {
        this._cipher.encryptBlock(words, offset);
      }
    });
    ECB.Decryptor = ECB.extend({
      processBlock: function processBlock(words, offset) {
        this._cipher.decryptBlock(words, offset);
      }
    });
    return ECB;
  }();

  /**
   * ANSI X.923 填充策略。
   */
  CryptoJS.pad.AnsiX923 = {
    pad: function pad(data, blockSize) {
      // 變量設定
      var dataSigBytes = data.sigBytes;
      var blockSizeBytes = blockSize * 4;

      // 計算填充字節數
      var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;

      // 計算最後一個字節的位置
      var lastBytePos = dataSigBytes + nPaddingBytes - 1;

      // 填充
      data.clamp();
      data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
      data.sigBytes += nPaddingBytes;
    },
    unpad: function unpad(data) {
      // 從最後一個字節獲取填充字節數
      var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 0xff;

      // 移除填充
      data.sigBytes -= nPaddingBytes;
    }
  };

  /**
   * ISO 10126 填充策略。
   */
  CryptoJS.pad.Iso10126 = {
    pad: function pad(data, blockSize) {
      // 變量設定
      var blockSizeBytes = blockSize * 4;

      // 計算填充字節數
      var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

      // 填充
      data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
    },
    unpad: function unpad(data) {
      // 從最後一個字節獲取填充字節數
      var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 0xff;

      // 移除填充
      data.sigBytes -= nPaddingBytes;
    }
  };

  /**
   * ISO/IEC 9797-1 填充方法 2。
   */
  CryptoJS.pad.Iso97971 = {
    pad: function pad(data, blockSize) {
      // 添加 0x80 字節
      data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

      // 使用零填充其餘部分
      CryptoJS.pad.ZeroPadding.pad(data, blockSize);
    },
    unpad: function unpad(data) {
      // 移除零填充
      CryptoJS.pad.ZeroPadding.unpad(data);

      // 再移除一個字節 -- 0x80 字節
      data.sigBytes--;
    }
  };

  /**
   * 零填充策略。
   */
  CryptoJS.pad.ZeroPadding = {
    pad: function pad(data, blockSize) {
      // 變量設定
      var blockSizeBytes = blockSize * 4;

      // 填充
      data.clamp();
      data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
    },
    unpad: function unpad(data) {
      // 變量設定
      var dataWords = data.words;

      // 移除填充
      var i = data.sigBytes - 1;
      for (var i = data.sigBytes - 1; i >= 0; i--) {
        if (dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff) {
          data.sigBytes = i + 1;
          break;
        }
      }
    }
  };

  /**
   * 一個無操作的填充策略。
   */
  CryptoJS.pad.NoPadding = {
    pad: function pad() {},
    unpad: function unpad() {}
  };
  (function (undefined) {
    // 變量設定
    var C = CryptoJS;
    var C_lib = C.lib;
    var CipherParams = C_lib.CipherParams;
    var C_enc = C.enc;
    var Hex = C_enc.Hex;
    var C_format = C.format;
    var HexFormatter = C_format.Hex = {
      /**
       * 將 CipherParams 對象的密文轉換為十六進制編碼的字符串。
       *
       * @param {CipherParams} cipherParams CipherParams 對象。
       *
       * @return {string} 十六進制編碼的字符串。
       *
       * @static
       *
       * @example
       *
       *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
       */
      stringify: function stringify(cipherParams) {
        return cipherParams.ciphertext.toString(Hex);
      },
      /**
       * 將十六進制編碼的密文字符串轉換為 CipherParams 對象。
       *
       * @param {string} input 十六進制編碼的字符串。
       *
       * @return {CipherParams} CipherParams 對象。
       *
       * @static
       *
       * @example
       *
       *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
       */
      parse: function parse(input) {
        var ciphertext = Hex.parse(input);
        return CipherParams.create({
          ciphertext: ciphertext
        });
      }
    };
  })();
  (function () {
    // 變量設定
    var C = CryptoJS;
    var C_lib = C.lib;
    var BlockCipher = C_lib.BlockCipher;
    var C_algo = C.algo;

    // 查找表
    var SBOX = [];
    var INV_SBOX = [];
    var SUB_MIX_0 = [];
    var SUB_MIX_1 = [];
    var SUB_MIX_2 = [];
    var SUB_MIX_3 = [];
    var INV_SUB_MIX_0 = [];
    var INV_SUB_MIX_1 = [];
    var INV_SUB_MIX_2 = [];
    var INV_SUB_MIX_3 = [];

    // 計算查找表
    (function () {
      // 計算倍增表
      var d = [];
      for (var i = 0; i < 256; i++) {
        if (i < 128) {
          d[i] = i << 1;
        } else {
          d[i] = i << 1 ^ 0x11b;
        }
      }

      // 遍歷 GF(2^8)
      var x = 0;
      var xi = 0;
      for (var i = 0; i < 256; i++) {
        // 計算 SBOX
        var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
        sx = sx >>> 8 ^ sx & 0xff ^ 0x63;
        SBOX[x] = sx;
        INV_SBOX[sx] = x;

        // 計算乘法
        var x2 = d[x];
        var x4 = d[x2];
        var x8 = d[x4];

        // 計算子節，混合列表
        var t = d[sx] * 0x101 ^ sx * 0x1010100;
        SUB_MIX_0[x] = t << 24 | t >>> 8;
        SUB_MIX_1[x] = t << 16 | t >>> 16;
        SUB_MIX_2[x] = t << 8 | t >>> 24;
        SUB_MIX_3[x] = t;

        // 計算逆向子節，逆向混合列表
        var t = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
        INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
        INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
        INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
        INV_SUB_MIX_3[sx] = t;

        // 計算下一個計數器
        if (!x) {
          x = xi = 1;
        } else {
          x = x2 ^ d[d[d[x8 ^ x2]]];
          xi ^= d[d[xi]];
        }
      }
    })();

    // 預先計算的 Rcon 查找表
    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

    /**
     * AES 區塊加密演算法。
     */
    var AES = C_algo.AES = BlockCipher.extend({
      _doReset: function _doReset() {
        var t;

        // 如果 nRounds 已經設定且密鑰未變更，則跳過重置
        if (this._nRounds && this._keyPriorReset === this._key) {
          return;
        }

        // 變量設定
        var key = this._keyPriorReset = this._key;
        var keyWords = key.words;
        var keySize = key.sigBytes / 4;

        // 計算輪數
        var nRounds = this._nRounds = keySize + 6;

        // 計算金鑰排程表的行數
        var ksRows = (nRounds + 1) * 4;

        // 計算金鑰排程表
        var keySchedule = this._keySchedule = [];
        for (var ksRow = 0; ksRow < ksRows; ksRow++) {
          if (ksRow < keySize) {
            keySchedule[ksRow] = keyWords[ksRow];
          } else {
            t = keySchedule[ksRow - 1];
            if (!(ksRow % keySize)) {
              // 旋轉字
              t = t << 8 | t >>> 24;

              // 替換字
              t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 0xff] << 16 | SBOX[t >>> 8 & 0xff] << 8 | SBOX[t & 0xff];

              // 混合 Rcon
              t ^= RCON[ksRow / keySize | 0] << 24;
            } else if (keySize > 6 && ksRow % keySize == 4) {
              // 替換字
              t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 0xff] << 16 | SBOX[t >>> 8 & 0xff] << 8 | SBOX[t & 0xff];
            }
            keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
          }
        }

        // 計算逆向金鑰排程表
        var invKeySchedule = this._invKeySchedule = [];
        for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
          var ksRow = ksRows - invKsRow;
          if (invKsRow % 4) {
            var t = keySchedule[ksRow];
          } else {
            var t = keySchedule[ksRow - 4];
          }
          if (invKsRow < 4 || ksRow <= 4) {
            invKeySchedule[invKsRow] = t;
          } else {
            invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 0xff]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
          }
        }
      },
      encryptBlock: function encryptBlock(M, offset) {
        this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
      },
      decryptBlock: function decryptBlock(M, offset) {
        // 交換第二和第四行
        var t = M[offset + 1];
        M[offset + 1] = M[offset + 3];
        M[offset + 3] = t;
        this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

        // 反向交換第二和第四行
        var t = M[offset + 1];
        M[offset + 1] = M[offset + 3];
        M[offset + 3] = t;
      },
      _doCryptBlock: function _doCryptBlock(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
        // 變量設定
        var nRounds = this._nRounds;

        // 取得輸入，加上輪密鑰
        var s0 = M[offset] ^ keySchedule[0];
        var s1 = M[offset + 1] ^ keySchedule[1];
        var s2 = M[offset + 2] ^ keySchedule[2];
        var s3 = M[offset + 3] ^ keySchedule[3];

        // 金鑰排程表行計數器
        var ksRow = 4;

        // 輪次
        for (var round = 1; round < nRounds; round++) {
          // 旋轉行，替換字元，混合列，加上輪密鑰
          var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[s1 >>> 16 & 0xff] ^ SUB_MIX_2[s2 >>> 8 & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
          var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[s2 >>> 16 & 0xff] ^ SUB_MIX_2[s3 >>> 8 & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
          var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[s3 >>> 16 & 0xff] ^ SUB_MIX_2[s0 >>> 8 & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
          var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[s0 >>> 16 & 0xff] ^ SUB_MIX_2[s1 >>> 8 & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

          // 更新狀態
          s0 = t0;
          s1 = t1;
          s2 = t2;
          s3 = t3;
        }

        // 旋轉行，替換字元，加上輪密鑰
        var t0 = (SBOX[s0 >>> 24] << 24 | SBOX[s1 >>> 16 & 0xff] << 16 | SBOX[s2 >>> 8 & 0xff] << 8 | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
        var t1 = (SBOX[s1 >>> 24] << 24 | SBOX[s2 >>> 16 & 0xff] << 16 | SBOX[s3 >>> 8 & 0xff] << 8 | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
        var t2 = (SBOX[s2 >>> 24] << 24 | SBOX[s3 >>> 16 & 0xff] << 16 | SBOX[s0 >>> 8 & 0xff] << 8 | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
        var t3 = (SBOX[s3 >>> 24] << 24 | SBOX[s0 >>> 16 & 0xff] << 16 | SBOX[s1 >>> 8 & 0xff] << 8 | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

        // 設定輸出
        M[offset] = t0;
        M[offset + 1] = t1;
        M[offset + 2] = t2;
        M[offset + 3] = t3;
      },
      keySize: 256 / 32
    });

    /**
     * 快捷方式函數，用於呼叫 AES 加密器的物件介面。
     *
     * @example
     *
     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
     */
    C.AES = BlockCipher._createHelper(AES);
  })();
  (function () {
    // 變量設定
    var C = CryptoJS; // CryptoJS 命名空間
    var C_lib = C.lib; // 庫命名空間
    var WordArray = C_lib.WordArray; // 32位字數組類
    var BlockCipher = C_lib.BlockCipher; // 區塊加密基類
    var C_algo = C.algo; // 算法命名空間

    // 選擇排列 1 的常數
    var PC1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];

    // 選擇排列 2 的常數
    var PC2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];

    // 累積位元移位常數
    var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

    // SBOX 和輪次排列常數
    var SBOX_P = [{
      0x0: 0x808200,
      0x10000000: 0x8000,
      0x20000000: 0x808002,
      0x30000000: 0x2,
      0x40000000: 0x200,
      0x50000000: 0x808202,
      0x60000000: 0x800202,
      0x70000000: 0x800000,
      0x80000000: 0x202,
      0x90000000: 0x800200,
      0xa0000000: 0x8200,
      0xb0000000: 0x808000,
      0xc0000000: 0x8002,
      0xd0000000: 0x800002,
      0xe0000000: 0x0,
      0xf0000000: 0x8202,
      0x8000000: 0x0,
      0x18000000: 0x808202,
      0x28000000: 0x8202,
      0x38000000: 0x8000,
      0x48000000: 0x808200,
      0x58000000: 0x200,
      0x68000000: 0x808002,
      0x78000000: 0x2,
      0x88000000: 0x800200,
      0x98000000: 0x8200,
      0xa8000000: 0x808000,
      0xb8000000: 0x800202,
      0xc8000000: 0x800002,
      0xd8000000: 0x8002,
      0xe8000000: 0x202,
      0xf8000000: 0x800000,
      0x1: 0x8000,
      0x10000001: 0x2,
      0x20000001: 0x808200,
      0x30000001: 0x800000,
      0x40000001: 0x808002,
      0x50000001: 0x8200,
      0x60000001: 0x200,
      0x70000001: 0x800202,
      0x80000001: 0x808202,
      0x90000001: 0x808000,
      0xa0000001: 0x800002,
      0xb0000001: 0x8202,
      0xc0000001: 0x202,
      0xd0000001: 0x800200,
      0xe0000001: 0x8002,
      0xf0000001: 0x0,
      0x8000001: 0x808202,
      0x18000001: 0x808000,
      0x28000001: 0x800000,
      0x38000001: 0x200,
      0x48000001: 0x8000,
      0x58000001: 0x800002,
      0x68000001: 0x2,
      0x78000001: 0x8202,
      0x88000001: 0x8002,
      0x98000001: 0x800202,
      0xa8000001: 0x202,
      0xb8000001: 0x808200,
      0xc8000001: 0x800200,
      0xd8000001: 0x0,
      0xe8000001: 0x8200,
      0xf8000001: 0x808002
    }, {
      0x0: 0x40084010,
      0x1000000: 0x4000,
      0x2000000: 0x80000,
      0x3000000: 0x40080010,
      0x4000000: 0x40000010,
      0x5000000: 0x40084000,
      0x6000000: 0x40004000,
      0x7000000: 0x10,
      0x8000000: 0x84000,
      0x9000000: 0x40004010,
      0xa000000: 0x40000000,
      0xb000000: 0x84010,
      0xc000000: 0x80010,
      0xd000000: 0x0,
      0xe000000: 0x4010,
      0xf000000: 0x40080000,
      0x800000: 0x40004000,
      0x1800000: 0x84010,
      0x2800000: 0x10,
      0x3800000: 0x40004010,
      0x4800000: 0x40084010,
      0x5800000: 0x40000000,
      0x6800000: 0x80000,
      0x7800000: 0x40080010,
      0x8800000: 0x80010,
      0x9800000: 0x0,
      0xa800000: 0x4000,
      0xb800000: 0x40080000,
      0xc800000: 0x40000010,
      0xd800000: 0x84000,
      0xe800000: 0x40084000,
      0xf800000: 0x4010,
      0x10000000: 0x0,
      0x11000000: 0x40080010,
      0x12000000: 0x40004010,
      0x13000000: 0x40084000,
      0x14000000: 0x40080000,
      0x15000000: 0x10,
      0x16000000: 0x84010,
      0x17000000: 0x4000,
      0x18000000: 0x4010,
      0x19000000: 0x80000,
      0x1a000000: 0x80010,
      0x1b000000: 0x40000010,
      0x1c000000: 0x84000,
      0x1d000000: 0x40004000,
      0x1e000000: 0x40000000,
      0x1f000000: 0x40084010,
      0x10800000: 0x84010,
      0x11800000: 0x80000,
      0x12800000: 0x40080000,
      0x13800000: 0x4000,
      0x14800000: 0x40004000,
      0x15800000: 0x40084010,
      0x16800000: 0x10,
      0x17800000: 0x40000000,
      0x18800000: 0x40084000,
      0x19800000: 0x40000010,
      0x1a800000: 0x40004010,
      0x1b800000: 0x80010,
      0x1c800000: 0x0,
      0x1d800000: 0x4010,
      0x1e800000: 0x40080010,
      0x1f800000: 0x84000
    }, {
      0x0: 0x104,
      0x100000: 0x0,
      0x200000: 0x4000100,
      0x300000: 0x10104,
      0x400000: 0x10004,
      0x500000: 0x4000004,
      0x600000: 0x4010104,
      0x700000: 0x4010000,
      0x800000: 0x4000000,
      0x900000: 0x4010100,
      0xa00000: 0x10100,
      0xb00000: 0x4010004,
      0xc00000: 0x4000104,
      0xd00000: 0x10000,
      0xe00000: 0x4,
      0xf00000: 0x100,
      0x80000: 0x4010100,
      0x180000: 0x4010004,
      0x280000: 0x0,
      0x380000: 0x4000100,
      0x480000: 0x4000004,
      0x580000: 0x10000,
      0x680000: 0x10004,
      0x780000: 0x104,
      0x880000: 0x4,
      0x980000: 0x100,
      0xa80000: 0x4010000,
      0xb80000: 0x10104,
      0xc80000: 0x10100,
      0xd80000: 0x4000104,
      0xe80000: 0x4010104,
      0xf80000: 0x4000000,
      0x1000000: 0x4010100,
      0x1100000: 0x10004,
      0x1200000: 0x10000,
      0x1300000: 0x4000100,
      0x1400000: 0x100,
      0x1500000: 0x4010104,
      0x1600000: 0x4000004,
      0x1700000: 0x0,
      0x1800000: 0x4000104,
      0x1900000: 0x4000000,
      0x1a00000: 0x4,
      0x1b00000: 0x10100,
      0x1c00000: 0x4010000,
      0x1d00000: 0x104,
      0x1e00000: 0x10104,
      0x1f00000: 0x4010004,
      0x1080000: 0x4000000,
      0x1180000: 0x104,
      0x1280000: 0x4010100,
      0x1380000: 0x0,
      0x1480000: 0x10004,
      0x1580000: 0x4000100,
      0x1680000: 0x100,
      0x1780000: 0x4010004,
      0x1880000: 0x10000,
      0x1980000: 0x4010104,
      0x1a80000: 0x10104,
      0x1b80000: 0x4000004,
      0x1c80000: 0x4000104,
      0x1d80000: 0x4010000,
      0x1e80000: 0x4,
      0x1f80000: 0x10100
    }, {
      0x0: 0x80401000,
      0x10000: 0x80001040,
      0x20000: 0x401040,
      0x30000: 0x80400000,
      0x40000: 0x0,
      0x50000: 0x401000,
      0x60000: 0x80000040,
      0x70000: 0x400040,
      0x80000: 0x80000000,
      0x90000: 0x400000,
      0xa0000: 0x40,
      0xb0000: 0x80001000,
      0xc0000: 0x80400040,
      0xd0000: 0x1040,
      0xe0000: 0x1000,
      0xf0000: 0x80401040,
      0x8000: 0x80001040,
      0x18000: 0x40,
      0x28000: 0x80400040,
      0x38000: 0x80001000,
      0x48000: 0x401000,
      0x58000: 0x80401040,
      0x68000: 0x0,
      0x78000: 0x80400000,
      0x88000: 0x1000,
      0x98000: 0x80401000,
      0xa8000: 0x400000,
      0xb8000: 0x1040,
      0xc8000: 0x80000000,
      0xd8000: 0x400040,
      0xe8000: 0x401040,
      0xf8000: 0x80000040,
      0x100000: 0x400040,
      0x110000: 0x401000,
      0x120000: 0x80000040,
      0x130000: 0x0,
      0x140000: 0x1040,
      0x150000: 0x80400040,
      0x160000: 0x80401000,
      0x170000: 0x80001040,
      0x180000: 0x80401040,
      0x190000: 0x80000000,
      0x1a0000: 0x80400000,
      0x1b0000: 0x401040,
      0x1c0000: 0x80001000,
      0x1d0000: 0x400000,
      0x1e0000: 0x40,
      0x1f0000: 0x1000,
      0x108000: 0x80400000,
      0x118000: 0x80401040,
      0x128000: 0x0,
      0x138000: 0x401000,
      0x148000: 0x400040,
      0x158000: 0x80000000,
      0x168000: 0x80001040,
      0x178000: 0x40,
      0x188000: 0x80000040,
      0x198000: 0x1000,
      0x1a8000: 0x80001000,
      0x1b8000: 0x80400040,
      0x1c8000: 0x1040,
      0x1d8000: 0x80401000,
      0x1e8000: 0x400000,
      0x1f8000: 0x401040
    }, {
      0x0: 0x80,
      0x1000: 0x1040000,
      0x2000: 0x40000,
      0x3000: 0x20000000,
      0x4000: 0x20040080,
      0x5000: 0x1000080,
      0x6000: 0x21000080,
      0x7000: 0x40080,
      0x8000: 0x1000000,
      0x9000: 0x20040000,
      0xa000: 0x20000080,
      0xb000: 0x21040080,
      0xc000: 0x21040000,
      0xd000: 0x0,
      0xe000: 0x1040080,
      0xf000: 0x21000000,
      0x800: 0x1040080,
      0x1800: 0x21000080,
      0x2800: 0x80,
      0x3800: 0x1040000,
      0x4800: 0x40000,
      0x5800: 0x20040080,
      0x6800: 0x21040000,
      0x7800: 0x20000000,
      0x8800: 0x20040000,
      0x9800: 0x0,
      0xa800: 0x21040080,
      0xb800: 0x1000080,
      0xc800: 0x20000080,
      0xd800: 0x21000000,
      0xe800: 0x1000000,
      0xf800: 0x40080,
      0x10000: 0x40000,
      0x11000: 0x80,
      0x12000: 0x20000000,
      0x13000: 0x21000080,
      0x14000: 0x1000080,
      0x15000: 0x21040000,
      0x16000: 0x20040080,
      0x17000: 0x1000000,
      0x18000: 0x21040080,
      0x19000: 0x21000000,
      0x1a000: 0x1040000,
      0x1b000: 0x20040000,
      0x1c000: 0x40080,
      0x1d000: 0x20000080,
      0x1e000: 0x0,
      0x1f000: 0x1040080,
      0x10800: 0x21000080,
      0x11800: 0x1000000,
      0x12800: 0x1040000,
      0x13800: 0x20040080,
      0x14800: 0x20000000,
      0x15800: 0x1040080,
      0x16800: 0x80,
      0x17800: 0x21040000,
      0x18800: 0x40080,
      0x19800: 0x21040080,
      0x1a800: 0x0,
      0x1b800: 0x21000000,
      0x1c800: 0x1000080,
      0x1d800: 0x40000,
      0x1e800: 0x20040000,
      0x1f800: 0x20000080
    }, {
      0x0: 0x10000008,
      0x100: 0x2000,
      0x200: 0x10200000,
      0x300: 0x10202008,
      0x400: 0x10002000,
      0x500: 0x200000,
      0x600: 0x200008,
      0x700: 0x10000000,
      0x800: 0x0,
      0x900: 0x10002008,
      0xa00: 0x202000,
      0xb00: 0x8,
      0xc00: 0x10200008,
      0xd00: 0x202008,
      0xe00: 0x2008,
      0xf00: 0x10202000,
      0x80: 0x10200000,
      0x180: 0x10202008,
      0x280: 0x8,
      0x380: 0x200000,
      0x480: 0x202008,
      0x580: 0x10000008,
      0x680: 0x10002000,
      0x780: 0x2008,
      0x880: 0x200008,
      0x980: 0x2000,
      0xa80: 0x10002008,
      0xb80: 0x10200008,
      0xc80: 0x0,
      0xd80: 0x10202000,
      0xe80: 0x202000,
      0xf80: 0x10000000,
      0x1000: 0x10002000,
      0x1100: 0x10200008,
      0x1200: 0x10202008,
      0x1300: 0x2008,
      0x1400: 0x200000,
      0x1500: 0x10000000,
      0x1600: 0x10000008,
      0x1700: 0x202000,
      0x1800: 0x202008,
      0x1900: 0x0,
      0x1a00: 0x8,
      0x1b00: 0x10200000,
      0x1c00: 0x2000,
      0x1d00: 0x10002008,
      0x1e00: 0x10202000,
      0x1f00: 0x200008,
      0x1080: 0x8,
      0x1180: 0x202000,
      0x1280: 0x200000,
      0x1380: 0x10000008,
      0x1480: 0x10002000,
      0x1580: 0x2008,
      0x1680: 0x10202008,
      0x1780: 0x10200000,
      0x1880: 0x10202000,
      0x1980: 0x10200008,
      0x1a80: 0x2000,
      0x1b80: 0x202008,
      0x1c80: 0x200008,
      0x1d80: 0x0,
      0x1e80: 0x10000000,
      0x1f80: 0x10002008
    }, {
      0x0: 0x100000,
      0x10: 0x2000401,
      0x20: 0x400,
      0x30: 0x100401,
      0x40: 0x2100401,
      0x50: 0x0,
      0x60: 0x1,
      0x70: 0x2100001,
      0x80: 0x2000400,
      0x90: 0x100001,
      0xa0: 0x2000001,
      0xb0: 0x2100400,
      0xc0: 0x2100000,
      0xd0: 0x401,
      0xe0: 0x100400,
      0xf0: 0x2000000,
      0x8: 0x2100001,
      0x18: 0x0,
      0x28: 0x2000401,
      0x38: 0x2100400,
      0x48: 0x100000,
      0x58: 0x2000001,
      0x68: 0x2000000,
      0x78: 0x401,
      0x88: 0x100401,
      0x98: 0x2000400,
      0xa8: 0x2100000,
      0xb8: 0x100001,
      0xc8: 0x400,
      0xd8: 0x2100401,
      0xe8: 0x1,
      0xf8: 0x100400,
      0x100: 0x2000000,
      0x110: 0x100000,
      0x120: 0x2000401,
      0x130: 0x2100001,
      0x140: 0x100001,
      0x150: 0x2000400,
      0x160: 0x2100400,
      0x170: 0x100401,
      0x180: 0x401,
      0x190: 0x2100401,
      0x1a0: 0x100400,
      0x1b0: 0x1,
      0x1c0: 0x0,
      0x1d0: 0x2100000,
      0x1e0: 0x2000001,
      0x1f0: 0x400,
      0x108: 0x100400,
      0x118: 0x2000401,
      0x128: 0x2100001,
      0x138: 0x1,
      0x148: 0x2000000,
      0x158: 0x100000,
      0x168: 0x401,
      0x178: 0x2100400,
      0x188: 0x2000001,
      0x198: 0x2100000,
      0x1a8: 0x0,
      0x1b8: 0x2100401,
      0x1c8: 0x100401,
      0x1d8: 0x400,
      0x1e8: 0x2000400,
      0x1f8: 0x100001
    }, {
      0x0: 0x8000820,
      0x1: 0x20000,
      0x2: 0x8000000,
      0x3: 0x20,
      0x4: 0x20020,
      0x5: 0x8020820,
      0x6: 0x8020800,
      0x7: 0x800,
      0x8: 0x8020000,
      0x9: 0x8000800,
      0xa: 0x20800,
      0xb: 0x8020020,
      0xc: 0x820,
      0xd: 0x0,
      0xe: 0x8000020,
      0xf: 0x20820,
      0x80000000: 0x800,
      0x80000001: 0x8020820,
      0x80000002: 0x8000820,
      0x80000003: 0x8000000,
      0x80000004: 0x8020000,
      0x80000005: 0x20800,
      0x80000006: 0x20820,
      0x80000007: 0x20,
      0x80000008: 0x8000020,
      0x80000009: 0x820,
      0x8000000a: 0x20020,
      0x8000000b: 0x8020800,
      0x8000000c: 0x0,
      0x8000000d: 0x8020020,
      0x8000000e: 0x8000800,
      0x8000000f: 0x20000,
      0x10: 0x20820,
      0x11: 0x8020800,
      0x12: 0x20,
      0x13: 0x800,
      0x14: 0x8000800,
      0x15: 0x8000020,
      0x16: 0x8020020,
      0x17: 0x20000,
      0x18: 0x0,
      0x19: 0x20020,
      0x1a: 0x8020000,
      0x1b: 0x8000820,
      0x1c: 0x8020820,
      0x1d: 0x20800,
      0x1e: 0x820,
      0x1f: 0x8000000,
      0x80000010: 0x20000,
      0x80000011: 0x800,
      0x80000012: 0x8020020,
      0x80000013: 0x20820,
      0x80000014: 0x20,
      0x80000015: 0x8020000,
      0x80000016: 0x8000000,
      0x80000017: 0x8000820,
      0x80000018: 0x8020820,
      0x80000019: 0x8000020,
      0x8000001a: 0x8000800,
      0x8000001b: 0x0,
      0x8000001c: 0x20800,
      0x8000001d: 0x820,
      0x8000001e: 0x20020,
      0x8000001f: 0x8020800
    }];

    // 選擇 SBOX 輸入的遮罩
    var SBOX_MASK = [0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000, 0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f];

    /**
     * DES 分組密碼演算法。
     */
    var DES = C_algo.DES = BlockCipher.extend({
      _doReset: function _doReset() {
        // 變量設定
        var key = this._key;
        var keyWords = key.words;

        // 根據 PC1 選擇 56 位元
        var keyBits = [];
        for (var i = 0; i < 56; i++) {
          var keyBitPos = PC1[i] - 1;
          keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
        }

        // 組裝 16 個子金鑰
        var subKeys = this._subKeys = [];
        for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
          // 創建子金鑰
          var subKey = subKeys[nSubKey] = [];

          // 變量設定
          var bitShift = BIT_SHIFTS[nSubKey];

          // 根據 PC2 選擇 48 位元
          for (var i = 0; i < 24; i++) {
            // 從左側 28 位元金鑰位元中選擇
            subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6;

            // 從右側 28 位元金鑰位元中選擇
            subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6;
          }

          // 由於每個子金鑰應用於一個擴展的 32 位元輸入，
          // 子金鑰可以分解為 8 個值，每個值擴展到 32 位元，
          // 這允許在不進行擴展的情況下使用金鑰
          subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
          for (var i = 1; i < 7; i++) {
            subKey[i] = subKey[i] >>> (i - 1) * 4 + 3;
          }
          subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
        }

        // 計算反向子金鑰
        var invSubKeys = this._invSubKeys = [];
        for (var i = 0; i < 16; i++) {
          invSubKeys[i] = subKeys[15 - i];
        }
      },
      encryptBlock: function encryptBlock(M, offset) {
        this._doCryptBlock(M, offset, this._subKeys);
      },
      decryptBlock: function decryptBlock(M, offset) {
        this._doCryptBlock(M, offset, this._invSubKeys);
      },
      _doCryptBlock: function _doCryptBlock(M, offset, subKeys) {
        // 取得輸入
        this._lBlock = M[offset];
        this._rBlock = M[offset + 1];

        // 初始排列
        exchangeLR.call(this, 4, 0x0f0f0f0f);
        exchangeLR.call(this, 16, 0x0000ffff);
        exchangeRL.call(this, 2, 0x33333333);
        exchangeRL.call(this, 8, 0x00ff00ff);
        exchangeLR.call(this, 1, 0x55555555);

        // 輪次
        for (var round = 0; round < 16; round++) {
          // 變量設定
          var subKey = subKeys[round];
          var lBlock = this._lBlock;
          var rBlock = this._rBlock;

          // Feistel 函數
          var f = 0;
          for (var i = 0; i < 8; i++) {
            f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
          }
          this._lBlock = rBlock;
          this._rBlock = lBlock ^ f;
        }

        // 取消最後一輪的交換
        var t = this._lBlock;
        this._lBlock = this._rBlock;
        this._rBlock = t;

        // 最終排列
        exchangeLR.call(this, 1, 0x55555555);
        exchangeRL.call(this, 8, 0x00ff00ff);
        exchangeRL.call(this, 2, 0x33333333);
        exchangeLR.call(this, 16, 0x0000ffff);
        exchangeLR.call(this, 4, 0x0f0f0f0f);

        // 設定輸出
        M[offset] = this._lBlock;
        M[offset + 1] = this._rBlock;
      },
      keySize: 64 / 32,
      // 金鑰大小，以 32 位元字為單位

      ivSize: 64 / 32,
      // 初始化向量大小，以 32 位元字為單位

      blockSize: 64 / 32 // 塊大小，以 32 位元字為單位
    });

    /**
     * 交換左右兩字的位元
     */
    function exchangeLR(offset, mask) {
      var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
      this._rBlock ^= t;
      this._lBlock ^= t << offset;
    }

    /**
     * 交換右左兩字的位元
     */
    function exchangeRL(offset, mask) {
      var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
      this._lBlock ^= t;
      this._rBlock ^= t << offset;
    }

    /**
     * 快捷方式函數，用於呼叫 DES 雜湊器的物件介面。
     *
     * @example
     *
     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
     */
    C.DES = BlockCipher._createHelper(DES);

    /**
     * Triple-DES 塊加密演算法。
     */
    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
      _doReset: function _doReset() {
        // 變量設定
        var key = this._key;
        var keyWords = key.words;
        // 確保密鑰長度有效 (64, 128 或 >= 192 位元)
        if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
          throw new Error('無效的密鑰長度 - 3DES 需要的密鑰長度為 64, 128, 192 或 >192 位元。');
        }

        // 根據 3DES 標準定義的密鑰選項擴展密鑰
        var key1 = keyWords.slice(0, 2);
        var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
        var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);

        // 創建 DES 實例
        this._des1 = DES.createEncryptor(WordArray.create(key1));
        this._des2 = DES.createEncryptor(WordArray.create(key2));
        this._des3 = DES.createEncryptor(WordArray.create(key3));
      },
      encryptBlock: function encryptBlock(M, offset) {
        this._des1.encryptBlock(M, offset);
        this._des2.decryptBlock(M, offset);
        this._des3.encryptBlock(M, offset);
      },
      decryptBlock: function decryptBlock(M, offset) {
        this._des3.decryptBlock(M, offset);
        this._des2.encryptBlock(M, offset);
        this._des1.decryptBlock(M, offset);
      },
      keySize: 192 / 32,
      // 金鑰大小，以 32 位元字為單位

      ivSize: 64 / 32,
      // 初始化向量大小，以 32 位元字為單位

      blockSize: 64 / 32 // 塊大小，以 32 位元字為單位
    });

    /**
     * 快捷方式函數，用於呼叫 TripleDES 雜湊器的物件介面。
     *
     * @example
     *
     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
     */
    C.TripleDES = BlockCipher._createHelper(TripleDES);
  })();
  (function () {
    // 變量設定
    var C = CryptoJS; // CryptoJS 命名空間
    var C_lib = C.lib; // 庫命名空間
    var StreamCipher = C_lib.StreamCipher; // 流加密基類
    var C_algo = C.algo; // 算法命名空間

    /**
     * RC4 流加密算法。
     */
    var RC4 = C_algo.RC4 = StreamCipher.extend({
      _doReset: function _doReset() {
        // 變量設定
        var key = this._key; // key
        var keyWords = key.words; // key的字數組
        var keySigBytes = key.sigBytes; // key的有效字節數

        // 初始化 sbox
        var S = this._S = []; // sbox 數組
        for (var i = 0; i < 256; i++) {
          S[i] = i; // 填充 sbox 數據
        }

        // key設置
        for (var i = 0, j = 0; i < 256; i++) {
          var keyByteIndex = i % keySigBytes; // 計算key字節索引
          var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 0xff; // 提取key字節

          j = (j + S[i] + keyByte) % 256; // 更新 j 計數器

          // 交換 S[i] 和 S[j]
          var t = S[i];
          S[i] = S[j];
          S[j] = t;
        }

        // 計數器
        this._i = this._j = 0; // 初始化 i 和 j 計數器
      },
      _doProcessBlock: function _doProcessBlock(M, offset) {
        M[offset] ^= generateKeystreamWord.call(this); // 使用密鑰流字進行 XOR 運算
      },
      keySize: 256 / 32,
      // 金鑰大小，以 32 位元字為單位

      ivSize: 0 // 初始化向量大小，RC4 不使用初始化向量
    });
    function generateKeystreamWord() {
      // 變量設定
      var S = this._S; // S 狀態陣列
      var i = this._i; // i 計數器
      var j = this._j; // j 計數器

      // 生成密鑰流字
      var keystreamWord = 0;
      for (var n = 0; n < 4; n++) {
        i = (i + 1) % 256; // 更新 i 計數器
        j = (j + S[i]) % 256; // 更新 j 計數器

        // 交換 S[i] 和 S[j]
        var t = S[i];
        S[i] = S[j];
        S[j] = t;
        keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - n * 8; // 計算密鑰流字
      }

      // 更新計數器
      this._i = i;
      this._j = j;
      return keystreamWord;
    }

    /**
     * 快捷方式函數，用於呼叫 RC4 加密器的物件介面。
     *
     * @example
     *
     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
     */
    C.RC4 = StreamCipher._createHelper(RC4);

    /**
     * 修改後的 RC4 流加密算法。
     */
    var RC4Drop = C_algo.RC4Drop = RC4.extend({
      /**
       * 配置選項。
       *
       * @property {number} drop 要丟棄的密鑰流字數。默認 192
       */
      cfg: RC4.cfg.extend({
        drop: 192
      }),
      _doReset: function _doReset() {
        RC4._doReset.call(this);

        // 丟棄指定數量的密鑰流字
        for (var i = this.cfg.drop; i > 0; i--) {
          generateKeystreamWord.call(this);
        }
      }
    });

    /**
     * 快捷方式函數，用於呼叫 RC4Drop 加密器的物件介面。
     *
     * @example
     *
     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
     */
    C.RC4Drop = StreamCipher._createHelper(RC4Drop);
  })();
  (function () {
    // 變量設定
    var C = CryptoJS; // CryptoJS 命名空間
    var C_lib = C.lib; // 庫命名空間
    var StreamCipher = C_lib.StreamCipher; // 流加密基類
    var C_algo = C.algo; // 算法命名空間

    // 可重用物件
    var S = []; // 用於存放 S 狀態陣列
    var C_ = []; // 用於存放 C 狀態陣列
    var G = []; // 用於存放 G 狀態陣列

    /**
     * Rabbit 流加密演算法
     */
    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
      _doReset: function _doReset() {
        // 變量設定
        var K = this._key.words;
        var iv = this.cfg.iv;

        // 交換字元序
        for (var i = 0; i < 4; i++) {
          K[i] = (K[i] << 8 | K[i] >>> 24) & 0x00ff00ff | (K[i] << 24 | K[i] >>> 8) & 0xff00ff00;
        }

        // 生成初始狀態值
        var X = this._X = [K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16];

        // 生成初始計數器值
        var C = this._C = [K[2] << 16 | K[2] >>> 16, K[0] & 0xffff0000 | K[1] & 0x0000ffff, K[3] << 16 | K[3] >>> 16, K[1] & 0xffff0000 | K[2] & 0x0000ffff, K[0] << 16 | K[0] >>> 16, K[2] & 0xffff0000 | K[3] & 0x0000ffff, K[1] << 16 | K[1] >>> 16, K[3] & 0xffff0000 | K[0] & 0x0000ffff];

        // 進位位
        this._b = 0;

        // 迭代系統四次
        for (var i = 0; i < 4; i++) {
          nextState.call(this);
        }

        // 修改計數器值
        for (var i = 0; i < 8; i++) {
          C[i] ^= X[i + 4 & 7];
        }

        // IV 設定
        if (iv) {
          // 變量設定
          var IV = iv.words;
          var IV_0 = IV[0];
          var IV_1 = IV[1];

          // 生成四個子向量
          var i0 = (IV_0 << 8 | IV_0 >>> 24) & 0x00ff00ff | (IV_0 << 24 | IV_0 >>> 8) & 0xff00ff00;
          var i2 = (IV_1 << 8 | IV_1 >>> 24) & 0x00ff00ff | (IV_1 << 24 | IV_1 >>> 8) & 0xff00ff00;
          var i1 = i0 >>> 16 | i2 & 0xffff0000;
          var i3 = i2 << 16 | i0 & 0x0000ffff;

          // 修改計數器值
          C[0] ^= i0;
          C[1] ^= i1;
          C[2] ^= i2;
          C[3] ^= i3;
          C[4] ^= i0;
          C[5] ^= i1;
          C[6] ^= i2;
          C[7] ^= i3;

          // 迭代系統四次
          for (var i = 0; i < 4; i++) {
            nextState.call(this);
          }
        }
      },
      _doProcessBlock: function _doProcessBlock(M, offset) {
        // 變量設定
        var X = this._X;

        // 迭代系統
        nextState.call(this);

        // 生成四個 keystream 字
        S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
        S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
        S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
        S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
        for (var i = 0; i < 4; i++) {
          // 交換字元序
          S[i] = (S[i] << 8 | S[i] >>> 24) & 0x00ff00ff | (S[i] << 24 | S[i] >>> 8) & 0xff00ff00;

          // 加密
          M[offset + i] ^= S[i];
        }
      },
      blockSize: 128 / 32,
      // 資料區塊大小，以 32 位元字為單位

      ivSize: 64 / 32 // 初始化向量大小，以 32 位元字為單位
    });
    function nextState() {
      // 變量設定
      var X = this._X;
      var C = this._C;

      // 儲存舊的計數器值
      for (var i = 0; i < 8; i++) {
        C_[i] = C[i];
      }

      // 計算新的計數器值
      C[0] = C[0] + 0x4d34d34d + this._b | 0;
      C[1] = C[1] + 0xd34d34d3 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
      C[2] = C[2] + 0x34d34d34 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
      C[3] = C[3] + 0x4d34d34d + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
      C[4] = C[4] + 0xd34d34d3 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
      C[5] = C[5] + 0x34d34d34 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
      C[6] = C[6] + 0x4d34d34d + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
      C[7] = C[7] + 0xd34d34d3 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
      this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;

      // 計算 g 值
      for (var i = 0; i < 8; i++) {
        var gx = X[i] + C[i];

        // 建構平方的高和低參數
        var ga = gx & 0xffff;
        var gb = gx >>> 16;

        // 計算平方的高和低結果
        var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
        var gl = ((gx & 0xffff0000) * gx | 0) + ((gx & 0x0000ffff) * gx | 0);

        // 高 XOR 低
        G[i] = gh ^ gl;
      }

      // 計算新的狀態值
      X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
      X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
      X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
      X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
      X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
      X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
      X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
      X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
    }

    /**
     * 快捷方式函數，用於呼叫 Rabbit 加密演算法的物件介面。
     *
     * @example
     *
     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
     */
    C.Rabbit = StreamCipher._createHelper(Rabbit);
  })();
  (function () {
    // 變量設定
    var C = CryptoJS;
    var C_lib = C.lib;
    var StreamCipher = C_lib.StreamCipher;
    var C_algo = C.algo;

    // 可重用的物件
    var S = [];
    var C_ = [];
    var G = [];

    /**
     * Rabbit 流加密演算法。
     *
     * 這是個遺留版本，未將金鑰轉換為小端序。
     * 這個錯誤不會影響加密演算法的安全性，
     * 但會影響其與其他實現的相容性。
     */
    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
      _doReset: function _doReset() {
        // 變量設定
        var K = this._key.words;
        var iv = this.cfg.iv;

        // 生成初始狀態值
        var X = this._X = [K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16];

        // 生成初始計數器值
        var C = this._C = [K[2] << 16 | K[2] >>> 16, K[0] & 0xffff0000 | K[1] & 0x0000ffff, K[3] << 16 | K[3] >>> 16, K[1] & 0xffff0000 | K[2] & 0x0000ffff, K[0] << 16 | K[0] >>> 16, K[2] & 0xffff0000 | K[3] & 0x0000ffff, K[1] << 16 | K[1] >>> 16, K[3] & 0xffff0000 | K[0] & 0x0000ffff];

        // 進位位
        this._b = 0;

        // 迭代系統四次
        for (var i = 0; i < 4; i++) {
          nextState.call(this);
        }

        // 修改計數器
        for (var i = 0; i < 8; i++) {
          C[i] ^= X[i + 4 & 7];
        }

        // IV 設定
        if (iv) {
          // 變量設定
          var IV = iv.words;
          var IV_0 = IV[0];
          var IV_1 = IV[1];

          // 生成四個子向量
          var i0 = (IV_0 << 8 | IV_0 >>> 24) & 0x00ff00ff | (IV_0 << 24 | IV_0 >>> 8) & 0xff00ff00;
          var i2 = (IV_1 << 8 | IV_1 >>> 24) & 0x00ff00ff | (IV_1 << 24 | IV_1 >>> 8) & 0xff00ff00;
          var i1 = i0 >>> 16 | i2 & 0xffff0000;
          var i3 = i2 << 16 | i0 & 0x0000ffff;

          // 修改計數器值
          C[0] ^= i0;
          C[1] ^= i1;
          C[2] ^= i2;
          C[3] ^= i3;
          C[4] ^= i0;
          C[5] ^= i1;
          C[6] ^= i2;
          C[7] ^= i3;

          // 迭代系統四次
          for (var i = 0; i < 4; i++) {
            nextState.call(this);
          }
        }
      },
      /**
       * 该方法用于处理数据块，它将对加密器内部状态进行更新以反映新数据
       * 这个方法通常在加密过程中被调用，用于处理输入数据块
       *
       * @param {Array} M - 包含要处理的数据块的数组
       * @param {number} offset - 数组中数据块的起始位置
       */
      _doProcessBlock: function _doProcessBlock(M, offset) {
        // 變量設定
        var X = this._X;

        // 迭代系統
        nextState.call(this);

        // 生成四個密鑰流字
        S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
        S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
        S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
        S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
        for (var i = 0; i < 4; i++) {
          // 交換字元序
          S[i] = (S[i] << 8 | S[i] >>> 24) & 0x00ff00ff | (S[i] << 24 | S[i] >>> 8) & 0xff00ff00;

          // 加密
          M[offset + i] ^= S[i];
        }
      },
      blockSize: 128 / 32,
      ivSize: 64 / 32
    });

    /**
     * 計算下一個狀態
     * 該方法用於更新內部計數器和狀態，以進行後續的加密或解密操作
     */
    function nextState() {
      // 變量設定
      var X = this._X;
      var C = this._C;

      // 儲存舊的計數器值
      for (var i = 0; i < 8; i++) {
        C_[i] = C[i];
      }

      // 計算新的計數器值
      C[0] = C[0] + 0x4d34d34d + this._b | 0;
      C[1] = C[1] + 0xd34d34d3 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
      C[2] = C[2] + 0x34d34d34 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
      C[3] = C[3] + 0x4d34d34d + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
      C[4] = C[4] + 0xd34d34d3 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
      C[5] = C[5] + 0x34d34d34 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
      C[6] = C[6] + 0x4d34d34d + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
      C[7] = C[7] + 0xd34d34d3 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
      this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;

      // 計算 g 值
      for (var i = 0; i < 8; i++) {
        var gx = X[i] + C[i];

        // 建構平方的高和低參數
        var ga = gx & 0xffff;
        var gb = gx >>> 16;

        // 計算平方的高和低結果
        var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
        var gl = ((gx & 0xffff0000) * gx | 0) + ((gx & 0x0000ffff) * gx | 0);

        // 高 XOR 低
        G[i] = gh ^ gl;
      }

      // 計算新的狀態值
      X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
      X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
      X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
      X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
      X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
      X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
      X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
      X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
    }

    /**
     * 快捷方式函數，用於呼叫 RabbitLegacy 加密器的物件介面。
     *
     * @example
     *
     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
     */
    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
  })();
  return CryptoJS;
});

/**
 * 使用 AES 加密演算法加密內容
 * 本函數用於加密給定的內容，使用 AES 加密演算法。本加密過程使用固定的密鑰和初始向量
 *
 * @param {string} content - 需要加密的內容
 * @returns {string} 加密後的結果
 */
function setValue(content) {
  // 定義加密密鑰和初始向量的字串表示
  var mem = 'BZ/fBTxUhGP0@3l@';

  // 從 mem 字串中提取密鑰，去除所有 '.' 和 '+'，並取前 16 個字元
  var key = CryptoJS.enc.Utf8.parse(mem.replace(/\./g, '').replace(/\+/g, '').substr(0, 16));

  // 從 mem 字串中提取初始向量，處理方式與密鑰相同
  var iv = CryptoJS.enc.Utf8.parse(mem.replace(/\./g, '').replace(/\+/g, '').substr(0, 16));

  // 將需要加密的內容轉換為位元組序列
  var src = CryptoJS.enc.Utf8.parse(content);

  // 使用 AES 加密演算法加密內容，使用 CBC 模式並指定密鑰和初始向量
  var encrypted = CryptoJS.AES.encrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC
  });

  // 返回加密後的結果的字串表示
  return encrypted.toString();
}

/**
 * 解密給定的內容並返回解密後的字串
 * 該函數使用AES加密演算法在CBC模式下進行解密操作
 *
 * @param {string} content - 需要解密的內容，應為AES加密後的密文
 * @returns {string} - 解密後的字串
 */
function getValue(content) {
  // 定義一個包含特殊字元的字串，用於生成加密密鑰和初始向量
  var mem = 'BZ/fBTxUhGP0@3l@';

  // 生成加密密鑰，使用UTF-8編碼解析，去除字串中的'.'和'+'，並截取前16個字元
  var key = CryptoJS.enc.Utf8.parse(mem.replace(/\./g, '').replace(/\+/g, '').substr(0, 16));

  // 生成初始向量，使用UTF-8編碼解析，去除字串中的'.'和'+'，並截取前16個字元
  var iv = CryptoJS.enc.Utf8.parse(mem.replace(/\./g, '').replace(/\+/g, '').substr(0, 16));

  // 使用AES加密演算法在CBC模式下解密內容，使用之前生成的密鑰和初始向量
  var encrypted = CryptoJS.AES.decrypt(content, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC
  });

  // 將解密後的資料轉換為UTF-8編碼的字串並返回
  return encrypted.toString(CryptoJS.enc.Utf8);
}