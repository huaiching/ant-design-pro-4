import CryptoJS from 'crypto-js'

/**
 * 加密函數
 * @param content 欲加密值 
 * @returns 加密內容
 */
export function encrypted(content?: string) {
  if (content === undefined) {
    return ''
  }
  
  const mem = 'BZ/fBTxUhGP0@3l@'

  const refined = mem.replace(/[.+]/g, "");
  const key = CryptoJS.enc.Utf8.parse(refined.slice(0, 16));
  const iv = CryptoJS.enc.Utf8.parse(refined.slice(0, 16));

  const source = CryptoJS.enc.Utf8.parse(content)

  const encrypted = CryptoJS.AES.encrypt(source, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC
  })

  return encrypted.toString();
}

/**
 * 解密函數
 * @param content 欲解密值 
 * @returns 解密內容
 */
export function decrypted(content: string) {
  if (content === undefined) {
    console.info('Undefined')
    
    return ''
  }
  
  const mem = 'BZ/fBTxUhGP0@3l@'

  const refined = mem.replace(/[.+]/g, "");
  const key = CryptoJS.enc.Utf8.parse(refined.slice(0, 16));
  const iv = CryptoJS.enc.Utf8.parse(refined.slice(0, 16));

  const decrypted = CryptoJS.AES.decrypt(content, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC
  })

  return decrypted.toString(CryptoJS.enc.Utf8);
}