//Création de fonction qui vérifie si les champs sont bien remplis
function verificationInputEmailString() {
    const inputEmail = document.querySelector("[name=email]")
    inputEmail.addEventListener("change", function() {   
        const valueEmail = inputEmail.value
        const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
        const resultat = emailRegExp.test(valueEmail)
        if(resultat === false) {
            console.log("L'émail est mal remplis")
            inputEmail.style.boxShadow = "0px 4px 14px 0px rgba(250, 0, 0, 0.7)"
        } else {
            inputEmail.style.boxShadow = "0px 4px 14px 0px rgba(0, 0, 0, 0.09)"
        }

    })
}




//Création de la fonction qui valide ou non le login (si elle le valide elle enregistre le token dans sessionStorage)
function formListenerTryLogin() {
    const formLogin = document.querySelector(".formLogin")
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
        //On traduit la reponse de JSON en javascript
        const reponseLogin = await reponse.json()
        //On séléctionne uniquement le token et on le stock dans la sessionsStorage
        const goodToken = reponseLogin.token
        sessionStorage.setItem("token", goodToken);
        console.log(sessionStorage.getItem("token"))
        if (goodToken === undefined) {
            const baliseErreurP = document.createElement("p")
            const baliseDiv = document.querySelector(".insertErreur")
            baliseErreurP.innerText = "Email ou mot de passe incorrect, veuilliez recommencer."
            baliseDiv.appendChild(baliseErreurP)
        } else {
            document.location.replace("index.html")
        }
    })
}
//on appel la fonction pour écouter le submit formulaire
verificationInputEmailString()
formListenerTryLogin()

