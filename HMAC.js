import crypto from 'crypto';

class HMAC {
    constructor() {
        this.key = "";
        this.hmac = "";
        this.generateKey();
    }

    generateKey() {
        this.key = crypto.randomBytes(32).toString('hex');
    }

    getHMAC(message) {
        const hmac = crypto.createHmac('sha256', this.key);
        hmac.update(message);
        this.hmac = hmac.digest('hex');
    }
};

export default HMAC;