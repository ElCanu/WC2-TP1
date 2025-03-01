// IIFE - Immediately Invoked Function Expression

(()=>{

    function naviguer(elemValue){
        let mainContent = document.getElementById("site-main-content");
        switch(elemValue){
            case 2: mainContent.innerHTML = pageHome; 
            initEventPourHome();
            break;
            case 3: mainContent.innerHTML = pageApropos; break;
            case 4: afficherContact(mainContent); break;
            case 5: afficherItems(mainContent); break;
            case 6: afficherProfile(mainContent); break;
            case 7: afficherLogin(mainContent); break;
            default: console.log("Page introuvable");
        }
    }

    function initialiserEventListeners(){
        console.log("Initialisation des events listener")
        initEventPourHome();
        document.querySelectorAll(".nav-element").forEach(elem => {
            elem.addEventListener("click", () => {
                console.log(elem);
                naviguer(elem.value);
            });
        });
    }

    //test changer text sur page home pour future login
    function initEventPourHome(){
    
        document.querySelector("#btn").addEventListener("click", function() {
            document.querySelector("#message").textContent = "bonjour!";
        });
    
        document.querySelector("#btn2").addEventListener("click", function() {
            document.querySelector("#message2").textContent = "bonjour2!";
        });
    }
    
    // Cet évènement se déclenche lorsque le DOM a terminé l'affichage
    document.addEventListener("DOMContentLoaded", function(){
        console.log("DOM Loaded");
        initialiserEventListeners();
    });
    

})();

