// Note: This assumes CryptoJS is loaded in your environment

function getMd5Key(str) {
    return CryptoJS.MD5(str).toString().substring(0, 8).toUpperCase();
}

function encryptData(data, keyStr) {
    const keyHex = CryptoJS.enc.Utf8.parse(getMd5Key(keyStr));
    const ivHex = keyHex; // For simplicity, using the key as IV; consider using a proper IV for better security
    const options = {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: ivHex
    };
    const encrypted = CryptoJS.DES.encrypt(data, keyHex, options);
    return encrypted.toString().toUpperCase(); // Returns base64 encrypted string, convert as needed
}

function decryptData(encrypted, keyStr) {
    const keyHex = CryptoJS.enc.Utf8.parse(getMd5Key(keyStr));
    const ivHex = keyHex; // Using the key as IV for simplicity
    const options = {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: ivHex
    };
    const decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(encrypted)
    }, keyHex, options);
    return CryptoJS.enc.Utf8.stringify(decrypted); // Returns the original decrypted text
}

// Usage example:
const key = "27650099-564A-4869-99B3-363F8129C0CD";
const data = "Example Data";
const encrypted = encryptData(data, key);
console.log("Encrypted:", encrypted);
const decrypted = decryptData(encrypted, key);
console.log("Decrypted:", decrypted);
