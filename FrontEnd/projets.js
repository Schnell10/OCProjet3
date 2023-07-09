

// Récupération des objet projets dans l'api
const works = await fetch('http://localhost:5678/api/works').then(works => works.json())



// Fonction pour la création des bouttons
function createButton() {
const divButtons = document.querySelector(".buttons")
const baliseButtonAll = document.createElement("button")
const baliseButtonObject = document.createElement("button")
const baliseButtonApartment = document.createElement("button")
const baliseButtonHotelRestaurant = document.createElement("button")
baliseButtonAll.classList.add("all")
baliseButtonObject.classList.add("object")
baliseButtonApartment.classList.add("apartment")
baliseButtonHotelRestaurant.classList.add("hotel-and-restaurant")
baliseButtonAll.innerText = "Tous"
baliseButtonObject.innerText = "Objets"
baliseButtonApartment.innerText = "Appartements"
baliseButtonHotelRestaurant.innerText ="Hôtels & restaurants"
divButtons.appendChild(baliseButtonAll)
divButtons.appendChild(baliseButtonObject)
divButtons.appendChild(baliseButtonApartment)
divButtons.appendChild(baliseButtonHotelRestaurant)
}


//Création du visuel de la partie "Projets"
function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {
        // Création d'une carte de la liste works
        const card = works[i]
        // Création des élément du DOM pour les projets
        const baliseFigure = document.createElement("figure")
        const baliseImg = document.createElement("img")
        baliseImg.src = card.imageUrl
        const baliseFigcaption = document.createElement("figcaption")
        baliseFigcaption.innerText = card.title

        baliseFigure.appendChild(baliseImg)
        baliseFigure.appendChild(baliseFigcaption)

        //Insertion de ces élément sur l'élément parents
        const gallery = document.querySelector(".gallery")
        gallery.appendChild(baliseFigure)
    }
}

//Création de la fonction pour rendre les filtre fonctionnels

function buttonFunctional() {
//Boutons filtre all
const buttonAll = document.querySelector(".all")
buttonAll.addEventListener("click", () => {
    document.querySelector(".gallery").innerHTML = ""
    generateWorks(works)
})

//Bouton filtres objets
const buttonObject = document.querySelector(".object")
buttonObject.addEventListener("click", () => {
    const worksFilterObject = works.filter(function (work) {
        return work.category.name === "Objets"
    })
    document.querySelector(".gallery").innerHTML = ""
    generateWorks(worksFilterObject)
})

//Bouton filtres appartements
const buttonApartment = document.querySelector(".apartment")
buttonApartment.addEventListener("click", () => {
    const worksFilterApartment = works.filter(function (work) {
        return work.category.name === "Appartements"
    })
    document.querySelector(".gallery").innerHTML = ""
    generateWorks(worksFilterApartment)
})

//Bouton filtres Hôtels & restaurants
const buttonHotelRestaurant = document.querySelector(".hotel-and-restaurant")
buttonHotelRestaurant.addEventListener("click", () => {
    const worksFilterHotelRestaurant = works.filter(function (work) {
        return work.category.name === "Hotels & restaurants"
    })
    document.querySelector(".gallery").innerHTML = ""
    generateWorks(worksFilterHotelRestaurant)
})
}

//Premier affichage de la partie Projets
generateWorks(works)
//Créer les boutons
createButton()
//On les rend fonctionnels
buttonFunctional()

// Génération du html de la baniere
function generateBannerAdmin() {
    
    const baliseHeader = document.querySelector("header")
    const baliseBanner = document.createElement("div")
    baliseBanner.classList.add("banner")
    const baliseP = document.createElement("p")
    const baliseI = document.createElement("i")
    const baliseButton = document.createElement("button")
    baliseI.classList.add("fa-regular")
    baliseI.classList.add("fa-pen-to-square")
    baliseP.appendChild(baliseI)
    const textBaliseP = "Mon édition"
    baliseP.insertAdjacentHTML('beforeend', textBaliseP) //on utilise insertAdjacentHTML pour ajouter du text dans la balise p sans supprimer l'intérieur de la balise
    baliseButton.innerText = "publier les changements"
    baliseBanner.appendChild(baliseP)
    baliseBanner.appendChild(baliseButton)
    baliseHeader.prepend(baliseBanner)
}


function generateAdminWebPage() {
    const token = sessionStorage.getItem("token")
    if (token !== null) {
        document.querySelector(".loginLogout").innerHTML = ""
        //création du bouton logout
        const baliseLoginLogout = document.querySelector(".loginLogout")
        baliseLoginLogout.innerText = "Logout"
        //On écoute le bouton logout pour supprimer le token dans le sessionstorage lorsque on click dessus donc on se déconnecte de l'administrateur
        baliseLoginLogout.addEventListener("click", function() {
            sessionStorage.removeItem("token")
            //rechargement de la page pour mettre à jour le storage
            location.reload()
            console.log(token)
        })
        //on génére la bannière
        generateBannerAdmin()
        
    }
}
generateAdminWebPage()










