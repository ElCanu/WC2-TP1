function afficherLogin(conteneurMain){
    user = users.find(u => u.isAuthenticated === true)
    //console.log(user)
    if (!user)
    {
            conteneurMain.innerHTML =
        `
        <div id="div-login" class="div-lp f-box f-col f-cross-right">
            <h2>Login</h2>
            <form id="form-login" class="f-box f-col">
            <label for="username" class="form-label">Username:</label>
            <input type="text" id="username" name="username" class="form-input" required>
            <label for="password" class="form-label">Password:</label>
            <input type="password" id="password" name="password" class="form-input">
            <div class="f-box f-main-right">
                <button type="submit" class="btn-submit">Login</button>
            </div>
            </form>
        </div>
        `;

        document.getElementById("form-login").addEventListener('submit', (e) => {
            e.preventDefault();

            let username = document.getElementsByName('username')[0].value;
            let password = document.getElementsByName('password')[0].value;
            //console.log(username);
            //console.log(password);
        
            if (user = users.find(u => u.username === username && u.password === password)){
                //console.log(`${user.username} is log.`);
                document.querySelector("#nav-profil").textContent = "Profile";
                document.querySelector("#nav-login").textContent = "Logout";
                user.isAuthenticated = true;
                //retour page home
                let mainContent = document.getElementById("site-main-content");
                mainContent.innerHTML = pageHome;
            }
            else{
                alert("L'utilisateur ou mot de passe est incorrect.")
                //console.log("Wrong user name or password...")
                document.getElementsByName('username')[0].value = "";
                document.getElementsByName('password')[0].value = "";
            }
            //console.log(user)
        });

    }
    else{
        document.querySelector("#nav-login").textContent = "Login";
        document.querySelector("#nav-profil").textContent = "";
        user.isAuthenticated = false;
    }
};






    
