function formListenerTryLogin() {
    const formLogin = document.querySelector("button")
    formLogin.addEventListener("submit", async function(event) {
        event.preventDefault()
        //Création de l'objet du test login (mail+mdp)
        const valueLogin = {
            email: event.target.getElementById(email).value,
            password: event.target.getElementById(password).value
        }

        //Création charge utile au format JSON
        const chargeUtile = JSON.stringify(valueLogin)

        //appel de la fonction fetch pour fair un Post
        const reponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: chargeUtile
        })
        const reponseLogin = await reponse.json()
        
    })
}
//on appel la fonction pour ajouter le listener du formulaire
formListenerTryLogin()