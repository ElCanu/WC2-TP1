function afficherContact(conteneurMain){
    user = users.find(u => u.isAuthenticated === true)
    conteneurMain.innerHTML =
    `
    <div id="div-main" class="f-box bullseye f-col">
        <div class="carre f-box f-col bullseye animated-scale-div">
            <form id="form-contact" class="f-box f-col f-cross-left">
                <h2>Nous contacter:</h2>
                <label for="email" class="form-label">Courriel:</label>
                <input type="email" id="email" name="email" class="form-input" required>
                <label for="message" class="form-label">Message:</label>
                <textarea name="message" id="message" placeholder="Laissez-nous un message ici!" cols="100" rows="15" required></textarea>
                <div class="f-box f-self-end">
                    <button type="submit" class="btn-gap">Envoyer</button>
                </div>
            </form>
        </div>
    </div>
    `;

    if (user){
        document.querySelector("#email").value = user.email;
    }

    document.getElementById("form-contact").addEventListener('submit', (e) => {
        e.preventDefault();

        let email = document.getElementsByName('email')[0].value;
        let message = document.getElementsByName('message')[0].value;
        console.log(`Courriel: ${email}\nMessage:${message}\nMessage envoyé!(fictif pour tp)`)
        alert("Message Envoyé! voir console")
        
        document.getElementsByName('email')[0].value = "";
        document.getElementsByName('message')[0].value = "";

        let mainContent = document.getElementById("site-main-content");
        mainContent.innerHTML = pageHome
    });

    
};



