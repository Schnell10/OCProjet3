//Création de la fonction qui valide ou non le login (si elle le valide elle enregistre le token dans sessionStorage)
function formListenerTryLogin() {
    //On crée la balise pour mettre par la suite le message d'erreur si l'email ou le mdp est incorrect
    const baliseErreurP = document.createElement("p")
    const baliseDiv = document.querySelector(".insertErreur")
    baliseDiv.appendChild(baliseErreurP)
    //On écoute le formulaire au click du submit
    const formLogin = document.querySelector(".formLogin")
    formLogin.addEventListener("submit", async function (event) {
        //On enlève le rechargement de la page par défaut
        event.preventDefault()
        //Création de l'objet du test login (mail+mdp)
        const valueLogin = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value
        }

        //Création charge utile au format JSON
        const chargeUtile = JSON.stringify(valueLogin)

        //appel de la fonction fetch pour fair un Post
        const reponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: chargeUtile
        })
        //On traduit la reponse de l'API reçu en JSON
        const reponseLogin = await reponse.json()
        //On séléctionne uniquement le token 
        const goodToken = reponseLogin.token
        
        if (goodToken === undefined || goodToken === null) {
            //Si le token n'est pas enregistré, c'est que le mot de passe ou l'email sont incorrect, on met donc un msg d'erreur
            baliseErreurP.innerText = "Erreur dans l’identifiant ou le mot de passe"
        } else {
            //Si les id sont correct on stock le token dans le sessionsStorage
            sessionStorage.setItem("token", goodToken);
            //Et on est redirigé vers le site
            document.location.replace("index.html")
        }
    })
    //On enlève le msg d'erreur lorsque l'on clic de nouveau sur l'un des deux input en écoutant les deux input à la fois
    const inputLogin = document.querySelectorAll("input")
    inputLogin.forEach(input => {
        input.addEventListener("click", () => {
            baliseErreurP.innerText = ""
        })
    })
}
//on appel la fonction
formListenerTryLogin()

