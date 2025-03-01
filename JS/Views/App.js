/**
     * @param {Element} conteneurMain 
     */
function afficherItems(conteneurMain){
    conteneurMain.innerHTML = 
    `
    <div id="app" class="carre f-box f-col bullseye animated-scale-div">
        <table>
            <thead>
                <tr> 
                    ${Weapons.length > 0 ? `
                        ${Object.keys(Weapons[0]).map(prop => `
                            <th>${prop}</th>
                        `).join('')}
                        <th>Actions</th>
                    `
                    : `<p>Tableau Vide...</p>`
                    }
                    
                </tr>
            </thead>
            <tbody>
            ${Weapons.length > 0 ? `
            ${Weapons.map(weapon => `
                <tr>
                    ${Object.entries(weapon).map(([key, val]) => `
                    <td data-key=${key} data-val=${val}>${val}</td>
                    `).join('')}
                    <td>
                    <button id="edit-${weapon.id}">🖍️</button>
                    <button id="del-${weapon.id}">❎️</button>
                    </td>
                </tr>
            `).join('')}
            `
            : ``}
            </tbody>
        </table>
        <button id="btn-add-weapon" class="btn-gap">Ajouter un Weapon</button>
    </div>
    `;

    Weapons.forEach((weapon, index) => {
        let weapId = weapon.id;

        let delButton = document.getElementById(`del-${weapId}`);
        delButton.addEventListener("click", () => {
            console.log(`del id ${weapId}`);
            Weapons.splice(index, 1);
            afficherItems(conteneurMain);
        });

        let editButton = document.getElementById(`edit-${weapId}`);
        editButton.addEventListener("click", () => {
            console.log(`edit id ${weapId}`);
            afficherFormEdit(conteneurMain, weapId);
        });
    });

    document.getElementById("btn-add-weapon").addEventListener("click", () => {
        afficherFormAjout(conteneurMain);
    });

    function ajouterWeapon(id, wType, name, aType, damage, rpm){
        Weapons.push({id: id, wType: wType, name: name, aType: aType, damage: damage, rpm: rpm});
        afficherItems(document.getElementById("site-main-content"));
    }

    /**
     * @param {Element} conteneurMain 
     */
    function afficherFormAjout(conteneurMain, id = null){
        conteneurMain.innerHTML = 
        `
        <div class="carre f-box f-col bullseye animated-scale-div">
            <form id="form-ajout" class="f-box f-col">
            <legend>Ajout Arme:</legend>
            <label for="wType">Classe:</label>
            <input type="text" name="wType" id="wType" required>
            <label for="name">Nom:</label>
            <input type="text" name="name" id="name" required>
            <label for="aType">Ammo Type:</label>
            <input type="text" name="aType" id="aType" required>
            <label for="dmg">Damage:</label>
            <input type="text" name="dmg" id="dmg" required>
            <label for="rpm">RPM:</label>
            <input type="text" name="rpm" id="rpm" required>
            <div class="f-box f-main-right">
                <button type="submit" class="btn-gap">Add</button>
                <button type="button" id="btn-cancel" class="btn-gap">Cancel</button>
            </div>
            </form>
            
        </div>
        `;

        let lastID = Weapons[Weapons.length - 1].id;
        let newItemId = lastID + 1;

        document.getElementById("form-ajout").addEventListener('submit', (e) => {
            e.preventDefault();
            let wType = document.getElementsByName('wType')[0].value;
            let name = document.getElementsByName('name')[0].value;
            let aType = document.getElementsByName('aType')[0].value;
            let dmg = document.getElementsByName('dmg')[0].value;
            let rpm = document.getElementsByName('rpm')[0].value;

            //console.log(`wtype: ${wType}\ndesc: ${name}\npoids: ${aType}\nprops: ${dmg}`);

            ajouterWeapon(newItemId, wType, name, aType, dmg, rpm);
        });

        document.getElementById("btn-cancel").addEventListener('click', () => {
            afficherItems(document.getElementById("site-main-content"));
        });
    }

    /**
     * @param {Element} conteneurMain 
     */
    function afficherFormEdit(conteneurMain, id = null){
        conteneurMain.innerHTML = 
        `
        <div class="carre f-box f-col bullseye animated-scale-div">
            <form id="form-edit" class="f-box f-col">
            <legend>Ajout Arme:</legend>
            <label for="wType">Classe:</label>
            <input type="text" name="wType" id="wType" value='${Weapons[id - 1].wType}' required>
            <label for="wName">Nom:</label>
            <input type="text" name="wName" id="wName" value='${Weapons[id - 1].wName}' required>
            <label for="aType">Ammo Type:</label>
            <input type="text" name="aType" id="aType" value='${Weapons[id - 1].aType}' required>
            <label for="dmg">Damage:</label>
            <input type="text" name="dmg" id="dmg" value='${Weapons[id - 1].damage}' required>
            <label for="rpm">RPM:</label>
            <input type="text" name="rpm" id="rpm" value='${Weapons[id - 1].rpm}' required>
            <div class="f-box f-main-right">
                <button class="btn-gap">Edit</button>
                <button type="button" id="btn-cancel" class="btn-gap">Cancel</button>
            </div>
            
            </form>
            
            
        </div>
        `;

        document.getElementById("form-edit").addEventListener('submit', (e) => {
            e.preventDefault();
            let wType = document.getElementsByName('wType')[0].value;
            let wName = document.getElementsByName('wName')[0].value;
            let aType = document.getElementsByName('aType')[0].value;
            let dmg = document.getElementsByName('dmg')[0].value;
            let rpm = document.getElementsByName('rpm')[0].value;
            //console.log(id)
            let weapon = Weapons.find(w =>w.id === id);
            //console.log(weapon)
            if(weapon){
                weapon.wType = wType;
                weapon.wName = wName;
                weapon.aType = aType;
                weapon.damage = dmg;
                weapon.rpm = rpm;
                //console.log(wName)
            }

            afficherItems(document.getElementById("site-main-content"));

        });

        document.getElementById("btn-cancel").addEventListener('click', () => {
            afficherItems(document.getElementById("site-main-content"));
        });
    }

};