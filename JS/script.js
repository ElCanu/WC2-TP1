// IIFE - Immediately Invoked Function Expression

(()=>{

    function naviguer(elemValue){
        let mainContent = document.getElementById("site-main-content");
        switch(elemValue){
            case 2: mainContent.innerHTML = pageHome; 
            //initEventPourHome()
            break;
            case 3: mainContent.innerHTML = pageApropos; break;
            case 4: mainContent.innerHTML = pageContact; break;
            //case 5: mainContent.innerHTML = pageApp; break;
            case 5: afficherItems(mainContent); break;
            default: console.log("Page introuvable");
        }
    }

    function initialiserEventListeners(){
        console.log("Initialisation des events listener")
        document.querySelectorAll(".nav-element").forEach(elem => {
            elem.addEventListener("click", () => {
                console.log(elem);
                naviguer(elem.value);
            });
        });
    }
    
    // Cet évènement se déclenche lorsque le DOM a terminé l'affichage
    document.addEventListener("DOMContentLoaded", function(){
        console.log("DOM Loaded");
        initialiserEventListeners();
    });
    

})();

