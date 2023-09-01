const crypto = require('crypto');

module.exports = class {
    
    constructor(data) {
        validateData(data)
        this.id = data.id;
        this.username = data.username;
        this.salt = data.salt;
        this.password_hash = data.password_hash;
        this.handicap = data.handicap;
    }

    validateData(data) {
        let requiredKeys = ['id', 'username', 'salt', 'password_hash', 'handicap'];
        requiredKeys.forEach(key => {
            if (!(key in data)) {
                throw new Error("Invalid data object");
            }
        });

        if (typeof data.id !== 'number' || typeof data.username !== 'string' || typeof data.salt !== 'string' || typeof data.password_hash !== 'string' || typeof data.handicap !== 'number') {
            throw new Error("Invalid data object");
        }

        if (data.id < 0 || data.handicap < 0) {
            throw new Error("Invalid data object");
        }


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
            id: this.id,
            username: this.username,
            salt: this.salt,
            password_hash: this.password_hash,
            handicap: this.handicap,

        }
    }


};

