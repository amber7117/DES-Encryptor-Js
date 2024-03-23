function getMd5Key(str) {
    // This mimics the getstrByte functionality, producing an MD5 hash in hexadecimal format.
    return CryptoJS.MD5(str).toString(CryptoJS.enc.Hex).substring(0, 8).toUpperCase();
}

function encryptData(data, keyStr, encoding = 'GBK', cipherMode = 'CBC') {
    const keyHex = CryptoJS.enc.Utf8.parse(getMd5Key(keyStr));
    // For the IV, this example uses the first 8 bytes of the MD5 hash as in the Java example. Adjust if needed.
    const ivHex = CryptoJS.enc.Utf8.parse(getMd5Key(keyStr));
    
    // Note: The encoding for the data to be encrypted needs to be handled as per your requirements.
    // This example assumes UTF-8 encoding for simplicity.
    const options = {
        mode: cipherMode === 'CBC' ? CryptoJS.mode.CBC : CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
        iv: ivHex
    };
    
    const encrypted = CryptoJS.DES.encrypt(CryptoJS.enc.Utf8.parse(data), keyHex, options);
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex).toUpperCase();
}

function decryptData(encryptedHex, keyStr, encoding = 'GBK', cipherMode = 'CBC') {
    const keyHex = CryptoJS.enc.Utf8.parse(getMd5Key(keyStr));
    const ivHex = CryptoJS.enc.Utf8.parse(getMd5Key(keyStr));
    
    const options = {
        mode: cipherMode === 'CBC' ? CryptoJS.mode.CBC : CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
        iv: ivHex
    };
    
    const decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Hex.parse(encryptedHex)
    }, keyHex, options);

    // Assuming GBK encoding in original, but JS commonly uses UTF-8. Adjust as needed.
    return decrypted.toString(CryptoJS.enc.Utf8);
}

// Example usage
const key = "your-key-here";
const data = "Hello, world!";
const encrypted = encryptData(data, key);
console.log("Encrypted:", encrypted);
const decrypted = decryptData(encrypted, key);
console.log("Decrypted:", decrypted);
