const Weapon = (()=>{
    class Weapon{
    /** @type {number} */ id;
    /** @type {string} */ wType;
    /** @type {string} */ wName;
    /** @type {string} */ aType;
    /** @type {number} */ damage;
    /** @type {number} */ rpm;
    /**
     * 
     * @param {number} id 
     * @param {string} wType 
     * @param {string} wName 
     * @param {string} aType 
     * @param {number} damage 
     * @param {number} rpm 
     */
        constructor(id, wType, wName, aType, damage, rpm){
            this.id = id;
            this.wName = wName;
            this.wType = wType;
            this.aType = aType;
            this.damage = damage;
            this.rpm = rpm;
        }
    }
    return Weapon;
})();

