const User = (()=> {
    class User {
        /** @type {number} */ id;
        /** @type {string} */ username;
        /** @type {string} */ email;
        /** @type {string} */ password;
        /** @type {bool} */ isAuthenticated;

        /**
         * @param {number} id 
         * @param {string} username 
         * @param {string} email 
         * @param {string} password 
         * @param {bool} isAuthenticated 
         */
        constructor(id, username, email, password, isAuthenticated){
            this.id = id;
            this.username = username;
            this.email = email;
            this.password = password;
            this.isAuthenticated = isAuthenticated;
        }
    }

    return User;
})();