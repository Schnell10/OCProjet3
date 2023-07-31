//Création de la fonction qui valide ou non le login (si elle le valide elle enregistre le token dans sessionStorage)
function formListenerTryLogin() {
    //On crée la balise pour mettre par la suite le message d'erreur si l'email ou le mdp est incorrect
    const baliseErreurP = document.createElement("p")
    const baliseDiv = document.querySelector(".insertErreur")
    baliseDiv.appendChild(baliseErreurP)
    const formLogin = document.querySelector(".formLogin")
    //On écoute le formulaire au click du submit
    formLogin.addEventListener("submit", async function (event) {
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
        //On séléctionne uniquement le token et on le stock dans le sessionsStorage
        const goodToken = reponseLogin.token
        sessionStorage.setItem("token", goodToken);
        console.log(sessionStorage.getItem("token"))

        if (goodToken === undefined || goodToken === null) {
            baliseErreurP.innerText = "Email ou mot de passe incorrect, veuilliez recommencer."
        } else {
            //Si les id sont correct on est redirigé vers le site
            document.location.replace("index.html")
        }
    })
}
//on appel la fonction
formListenerTryLogin()

