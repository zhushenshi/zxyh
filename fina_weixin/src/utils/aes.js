const CryptoJS = require('crypto-js');  //引用AES源码js
    // 默认的 KEY 与 iv 如果没有给
const key = CryptoJS.enc.Utf8.parse("1234123412689752");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('6875391234123412');   //十六位十六进制数作为密钥偏移量
//加密方法
export  var Encrypt = function (word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  var str=encrypted.ciphertext.toString().toUpperCase();
  // return btoa(encodeURI(str));
  return str
}
//解密方法
export  var Decrypt = function (word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}