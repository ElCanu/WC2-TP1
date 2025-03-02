/**
     * @param {Element} conteneurMain 
     */
function afficherItems(conteneurMain){
    conteneurMain.innerHTML = 
    `
    <div id="div-main" class="f-box bullseye f-col">
        <div id="app" class="carre f-box f-col bullseye animated-scale-div">
            <label for="filter-prop">Filtrer par:</label>
            <select name="filter-prop" id="filter-prop">
            ${Weapons.length > 0 ? `
                ${Object.keys(Weapons[0]).map(prop => `
                    <option value="${prop}">${prop}</option>
                `).join('')}
            `
            : ``
            }
            </select>
            <input type="text" id="filter-value">
            <table id="table-weapon">
                <thead>
                    <tr> 
                        ${Weapons.length > 0 ? `
                            ${Object.keys(Weapons[0]).map(prop => `
                                <th class="sortable">${prop}<span class="sort-indicator">▼</span></th>
                            `).join('')}
                            <th>Actions<span class="sort-indicator"></span></th>
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
    </div>
    `;

    
    addEventForFilterInput();
    
    function addEventForFilterInput() {
        const input = document.getElementById('filter-value');
        const select = document.getElementById('filter-prop');
    
        input.addEventListener('input', () => {
            const selectedProp = select.value;
            const filterValue = input.value.trim().toLowerCase();
    
            const tbody = document.querySelector('#table-weapon tbody');
            const lignes = Array.from(tbody.rows);
    
            lignes.forEach(ligne => {
                const td = ligne.querySelector(`td[data-key="${selectedProp}"]`);
                const showTR = td && td.textContent.trim().toLowerCase().includes(filterValue);
                ligne.style.display = showTR ? '' : 'none';
            });
        });
    }

    const sortableHeaders = document.querySelectorAll('#table-weapon th.sortable');
            sortableHeaders.forEach(header => {
                addEventForHeaderSort(header);
            });

    /** @param {HTMLElement|null} header */
    function addEventForHeaderSort(header)
    {
        header.addEventListener('click', () => {
            const key = header.dataset.key;
            let order = header.dataset.order === 'asc' ? 'desc' : 'asc';
            header.dataset.order = order;
            
            const table = document.getElementById('table-weapon');
            const tbody = table.tBodies[0];
            const headers = Array.from(header.parentElement.children);
            for(i = 0, taille = headers.length - 1; i < taille; i++){ //fix erreur de la foreach(skip le dernier header.)
                let th = headers[i];
                th.querySelector('.sort-indicator').style = "color:rgb(176, 176, 176)";
            }
            //headers.forEach(th => th.querySelector('.sort-indicator').style = "color:black");
            header.querySelector('.sort-indicator').style = "color:rgb(0, 255, 64)";
            header.querySelector('.sort-indicator').textContent = order === 'asc' ? '▲' : '▼';
            
            const columnIndex = headers.indexOf(header);
            const lignes = Array.from(tbody.rows);
            lignes.sort((a, b) => {
                let aText = a.cells[columnIndex].textContent.trim();
                let bText = b.cells[columnIndex].textContent.trim();

                const aNum = parseFloat(aText);
                const bNum = parseFloat(bText);
                if (!isNaN(aNum) && !isNaN(bNum)) {
                    return order === 'asc' ? aNum - bNum : bNum - aNum;
                }

                return order === 'asc'
                    ? aText.localeCompare(bText)
                    : bText.localeCompare(aText);
            });

            lignes.forEach(ligne => tbody.appendChild(ligne));
        });
    }

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
        <div id="div-main" class="f-box bullseye f-col">
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
        <div id="div-main" class="f-box bullseye f-col">
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
    };

}