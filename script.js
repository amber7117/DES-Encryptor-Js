class Des {
     constructor(k) {
        this.iv = this.getDesKey(k);
        this.key = CryptoJS.enc.Hex.parse(this.k);
        this.setupKey();
        
    }
    
  //  constructor(k) {
   //     this.iv = this.getDesKey(k);
  //      this.key = null;
  //      this.setupKey();
  //  }

    async setupKey() {
        const rawKey = new TextEncoder().encode(this.iv);
        this.key = await crypto.subtle.importKey(
            "raw",
            rawKey,
            { name: "DES-CBC" },
            false,
            ["encrypt", "decrypt"]
        );
    }

    async Encrypt(data) {
        if (!this.key || !data) {
            return '';
        }

        try {
            const encoded = new TextEncoder().encode(this.pkcs5Pad(data, 8));
            const encrypted = await crypto.subtle.encrypt(
                { name: "DES-CBC", iv: this.key },
                this.key,
                encoded
            );
            return this.toHex(new Uint8Array(encrypted)).toUpperCase();
        } catch (e) {
            console.error('Encryption failed:', e);
            return 'Encryption failed';
        }
    }

    async Decrypt(data) {
        if (!this.key || !data) {
            return '';
        }

        try {
            const encryptedData = this.hex2bin(data);
            const decrypted = await crypto.subtle.decrypt(
                { name: "DES-CBC", iv: this.key },
                this.key,
                encryptedData
            );
            return new TextDecoder().decode(new Uint8Array(decrypted)).trim();
        } catch (e) {
            console.error('Decryption failed:', e);
            return 'Decryption failed';
        }
    }

    getDesKey(k) {
        
        const hash =  CryptoJS.MD5(k).toString().substring(0, 8).toUpperCase();
        return hash.substring(0, 8).toUpperCase();
    }

    hex2bin(hex) {
        const bytes = new Uint8Array(Math.ceil(hex.length / 2));
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
        }
        return bytes;
    }

    toHex(buffer) {
        return [...buffer].map(b => b.toString(16).padStart(2, "0")).join("");
    }

    pkcs5Pad(text, blocksize) {
        const pad = blocksize - (text.length % blocksize);
        return text + String.fromCharCode(pad).repeat(pad);
    }

    pkcs5Unpad(text) {
        const pad = text.charCodeAt(text.length - 1);
        return text.substring(0, text.length - pad);
    }
}
