import crypto from 'crypto';

export const encryptCode = (seed, code) => {
    const hmac = crypto.createHmac('sha256', String(seed));
    hmac.update(String(code));
    return hmac.digest('hex');
};
