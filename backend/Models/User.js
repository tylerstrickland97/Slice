const crypto = require('crypto');

module.exports = class {
    
    constructor(data) {
        this.username = data.username;
        this.salt = data.salt;
        this.password_hash = data.password_hash;
        this.handicap = data.handicap;
    }

    validatePassword(password) {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, this.salt, 100000, 64, 'sha512', (err, derivedKey) => {
                if (err) {
                    reject("Error: " + err)
                }
    
                const digest = derivedKey.toString('hex');
                if (this.password_hash == digest) {
                    resolve(this);
                }
                else {
                    reject("Invalid username or password");
                }
            });
        });
    };

    toJSON() {
        return {
            username: this.username,
            salt: this.salt,
            password_hash: this.password_hash,
            handicap: this.handicap,

        }
    }


};

