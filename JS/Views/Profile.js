function afficherProfile(conteneurMain){
    user = users.find(u => u.isAuthenticated === true)
    conteneurMain.innerHTML =
    `
    <div id="div-profile" class="div-lp f-box f-col f-cross-right">
        <h2>Profile</h2>
        <form id="form-login" class="f-box f-col">
            <label for="username" class="form-label">Username:</label>
            <input type="text" id="username" name="username" class="form-input" value='${user.username}' disabled>
            <label for="email" class="form-label">Email:</label>
            <input type="email" id="password" name="email" class="form-input" value='${user.email}' disabled>
        </form>
    </div>       
    `;
};