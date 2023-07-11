

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
    baliseButtonHotelRestaurant.innerText = "Hôtels & restaurants"
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


function generatePageAdmin() {

    // Génération du html de la baniere
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
    baliseP.insertAdjacentText("beforeend", textBaliseP) //on utilise insertAdjacentHTML pour ajouter du text dans la balise p sans supprimer l'intérieur de la balise
    baliseButton.innerText = "publier les changements"
    baliseBanner.appendChild(baliseP)
    baliseBanner.appendChild(baliseButton)
    baliseHeader.prepend(baliseBanner)

    //Génération du html pour le modification 1
    const baliseIntroduction = document.querySelector("#introduction div")
    const baliseAFirstModif = document.createElement("a")
    const baliseIFirstModif = document.createElement("i")
    const textBaliseAModif = "modifier"
    baliseAFirstModif.classList.add("modification")
    baliseAFirstModif.classList.add("first-modification")
    baliseAFirstModif.setAttribute("href", "#modal")
    baliseIFirstModif.classList.add("fa-regular")
    baliseIFirstModif.classList.add("fa-pen-to-square")
    baliseAFirstModif.appendChild(baliseIFirstModif)
    baliseAFirstModif.insertAdjacentText("beforeend", textBaliseAModif)
    baliseIntroduction.insertAdjacentElement("afterend", baliseAFirstModif)

    //Génération du html pour le modification 2
    const baliseMyProject = document.querySelector(".my-project")
    const balisePSecondModif = document.createElement("p")
    const baliseISecondModif = document.createElement("i")
    balisePSecondModif.classList.add("modification")
    balisePSecondModif.classList.add("Second-modification")
    baliseISecondModif.classList.add("fa-regular")
    baliseISecondModif.classList.add("fa-pen-to-square")
    balisePSecondModif.appendChild(baliseISecondModif)
    balisePSecondModif.insertAdjacentText("beforeend", textBaliseAModif)
    baliseMyProject.appendChild(balisePSecondModif)
}

//Création de la fonction pour la fenêtre modal
function generateModal() {
    const baliseIntroduction = document.querySelector("#introduction")
    const baliseAside = document.createElement("aside")
    const baliseDivWrapper = document.createElement("div")
    const baliseButtonClose = document.createElement("button")
    const baliseIClose = document.createElement("i")
    const baliseH1 = document.createElement("h1")
    const baliseDivGallery = document.createElement("div")
    const baliseButtonAdd = document.createElement("button")
    const baliseButtonDelete = document.createElement("button")
    const baliseDivButtonAddDelete = document.createElement("div")
    baliseAside.setAttribute("id", "modal")
    baliseDivWrapper.classList.add("modal-wrapper")
    baliseAside.setAttribute("aria-hidden", "true")
    baliseAside.setAttribute("role", "dialogue")
    baliseIClose.classList.add("fa-solid")
    baliseIClose.classList.add("fa-xmark")
    baliseDivGallery.classList.add("gallery-modal")
    baliseButtonClose.classList.add("button-close")
    baliseButtonAdd.classList.add("button-add-img")
    baliseButtonDelete.classList.add("button-delete-all")
    baliseDivButtonAddDelete.classList.add("button-add-delete")
    baliseH1.setAttribute("id", "titleModal")
    baliseAside.setAttribute("aria-labelledby", "titleModal")
    baliseH1.innerText = "Galerie photo"
    baliseButtonAdd.innerText = "Ajouter une photo"
    baliseButtonDelete.innerText = "Supprimer la galerie"
    baliseButtonClose.appendChild(baliseIClose)
    baliseDivButtonAddDelete.appendChild(baliseButtonAdd)
    baliseDivButtonAddDelete.appendChild(baliseButtonDelete)
    baliseDivWrapper.appendChild(baliseButtonClose)
    baliseDivWrapper.appendChild(baliseH1)
    baliseDivWrapper.appendChild(baliseDivGallery)
    baliseDivWrapper.appendChild(baliseDivButtonAddDelete)
    baliseAside.appendChild(baliseDivWrapper)
    baliseIntroduction.insertAdjacentElement("afterend", baliseAside)
}
generateModal()

// On génére les cards de la modal
function generateWorkModal() {
    for (let i = 0; i < works.length; i++) {
        // Création d'une carte de la liste works
        const card = works[i]
        // Création des élément du DOM pour les projets
        const baliseFigure = document.createElement("figure")
        const baliseImg = document.createElement("img")
        baliseImg.src = card.imageUrl
        const baliseFigcaption = document.createElement("figcaption")
        baliseFigcaption.innerText = "éditer"
        const baliseDivIcons = document.createElement("div")
        const baliseTrash = document.createElement("i")
        const baliseArrow = document.createElement("i")
        baliseTrash.classList.add("fa-solid")
        baliseTrash.classList.add("fa-trash-can")
        baliseArrow.classList.add("fa-solid")
        baliseArrow.classList.add("fa-arrows-up-down-left-right")
        baliseFigure.appendChild(baliseImg)
        baliseFigure.appendChild(baliseFigcaption)
        baliseDivIcons.appendChild(baliseTrash)
        baliseDivIcons.appendChild(baliseArrow)
        baliseFigure.appendChild(baliseDivIcons)

        const baliseDivParent = document.querySelector(".modal-wrapper div")
        baliseDivParent.appendChild(baliseFigure)

}
}

generateWorkModal()



//fonction pour génèrer la page admin
function generateAdminWebPage() {
    const token = sessionStorage.getItem("token")
    if (token !== null) {
        document.querySelector(".loginLogout").innerHTML = ""
        //création du bouton logout
        const baliseLoginLogout = document.querySelector(".loginLogout")
        baliseLoginLogout.innerText = "Logout"
        //On écoute le bouton logout pour supprimer le token dans le sessionstorage lorsque on click dessus donc on se déconnecte de l'administrateur
        baliseLoginLogout.addEventListener("click", function () {
            sessionStorage.removeItem("token")
            //rechargement de la page pour mettre à jour le storage
            location.reload()
            console.log(token)
        })
        //on génére la bannière
        generatePageAdmin()

    }
}

//On génère la page admin
generateAdminWebPage()










