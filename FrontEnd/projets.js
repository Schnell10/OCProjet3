

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

//fonction pour modifier la page Admin
function generatePageAdmin() {
    // Génération du html de la baniere
    const baliseHeader = document.querySelector("header")
    const baliseBanner = document.createElement("div")
    baliseBanner.classList.add("banner")
    const baliseP = document.createElement("p")
    const baliseI = document.createElement("i")
    const baliseButton = document.createElement("button")
    baliseI.classList.add("fa-regular", "fa-pen-to-square")
    baliseP.appendChild(baliseI)
    const textBaliseP = "Mon édition"
    baliseP.insertAdjacentText("beforeend", textBaliseP) //on utilise insertAdjacentHTML pour ajouter du text dans la balise p sans supprimer l'intérieur de la balise
    baliseButton.innerText = "publier les changements"
    baliseBanner.appendChild(baliseP)
    baliseBanner.appendChild(baliseButton)
    baliseHeader.prepend(baliseBanner)

    //Génération du html pour le lien 1 vers modal 
    const baliseIntroduction = document.querySelector("#introduction div")
    const baliseAFirstModif = document.createElement("a")
    const baliseIFirstModif = document.createElement("i")
    const textBaliseAModif = "modifier"
    baliseAFirstModif.classList.add("modification")
    baliseAFirstModif.classList.add("first-modification")
    baliseAFirstModif.setAttribute("href", "#modal")
    baliseIFirstModif.classList.add("fa-regular", "fa-pen-to-square")
    baliseAFirstModif.appendChild(baliseIFirstModif)
    baliseAFirstModif.insertAdjacentText("beforeend", textBaliseAModif)
    baliseIntroduction.insertAdjacentElement("afterend", baliseAFirstModif)

    //Génération du html pour le 2 vers modal
    const baliseMyProject = document.querySelector(".my-project")
    const baliseASecondModif = document.createElement("a")
    const baliseISecondModif = document.createElement("i")
    baliseASecondModif.classList.add("modification")
    baliseASecondModif.classList.add("Second-modification")
    baliseASecondModif.setAttribute("href", "#modal")
    baliseISecondModif.classList.add("fa-regular", "fa-pen-to-square")
    baliseASecondModif.appendChild(baliseISecondModif)
    baliseASecondModif.insertAdjacentText("beforeend", textBaliseAModif)
    baliseMyProject.appendChild(baliseASecondModif)
}

//fonction pour génèrer la page admin
function generateAdminWebPage() {
    const token = sessionStorage.getItem("token")
    if (token !== null) {
        const baliseLoginLogout = document.querySelector(".loginLogout")
        //création du bouton logout
        baliseLoginLogout.innerText = ""
        baliseLoginLogout.innerText = "Logout"
        //On écoute le bouton logout pour supprimer le token dans le sessionstorage lorsque on click dessus donc on se déconnecte de l'administrateur
        baliseLoginLogout.addEventListener("click", function () {
            sessionStorage.removeItem("token")
            //rechargement de la page pour mettre à jour le storage
            location.reload()
            console.log(token)
        })
        //On appel les fonction qui vont générer la nouvelle page admin
        generatePageAdmin()

    }
}

//On génère la page admin
generateAdminWebPage()



//On créé la modal


function generateModal() {
    //Mise en place de la modal
    const baliseIntroduction = document.querySelector("#introduction")
    const baliseAside = document.createElement("aside")
    const baliseDivWrapper = document.createElement("div")
    baliseDivWrapper.classList.add("modal-wrapper")
    baliseAside.appendChild(baliseDivWrapper)
    baliseIntroduction.insertAdjacentElement("afterend", baliseAside)
    const baliseButtonCloseModal = document.createElement("button")
    const baliseIClose = document.createElement("i")
    const baliseH3 = document.createElement("h3")
    const baliseDivGallery = document.createElement("div")
    baliseIClose.classList.add("fa-solid", "fa-xmark")
    baliseButtonCloseModal.classList.add("js-close-modal")
    baliseH3.setAttribute("id", "titleModal")
    baliseDivGallery.classList.add("gallery-modal")
    baliseH3.innerText = "Galerie photo"
    baliseButtonCloseModal.appendChild(baliseIClose)
    baliseDivWrapper.appendChild(baliseButtonCloseModal)
    baliseDivWrapper.appendChild(baliseH3)
    baliseDivWrapper.appendChild(baliseDivGallery)
    const baliseButtonAdd = document.createElement("button")
    const baliseButtonDelete = document.createElement("button")
    const baliseDivButtonAddDelete = document.createElement("div")
    baliseAside.setAttribute("id", "modal")
    baliseAside.setAttribute("aria-hidden", "true")
    baliseAside.setAttribute("role", "dialogue")
    baliseAside.setAttribute("aria-modal", "false")
    baliseAside.setAttribute("aria-labelledby", "titleModal")
    baliseButtonAdd.classList.add("button-add-img")
    baliseButtonDelete.classList.add("button-delete-all")
    baliseDivButtonAddDelete.classList.add("button-add-delete")
    baliseButtonAdd.innerText = "Ajouter une photo"
    baliseButtonDelete.innerText = "Supprimer la galerie"
    baliseDivButtonAddDelete.appendChild(baliseButtonAdd)
    baliseDivButtonAddDelete.appendChild(baliseButtonDelete)
    baliseDivWrapper.appendChild(baliseDivButtonAddDelete)
}

//Modal2
function generateModal2() {
    const baliseAside = document.querySelector("aside")
    const baliseDivWrapperModal2 = document.createElement("div")
    const baliseButtonCloseModal = document.createElement("button")
    const baliseButtonArrow = document.createElement("button")
    const baliseIClose = document.createElement("i")
    const baliseIArrow = document.createElement("i")
    const baliseH3 = document.createElement("h3")
    const baliseForm = document.createElement("form")
    baliseDivWrapperModal2.classList.add("modal-wrapper-2")
    baliseDivWrapperModal2.classList.add("modal-2-invisible")
    baliseH3.innerText = "Ajouter une photo"
    baliseIClose.classList.add("fa-solid", "fa-xmark")
    baliseIArrow.classList.add("fa-solid", "fa-arrow-left")
    baliseButtonCloseModal.classList.add("js-close-modal2")
    baliseButtonArrow.classList.add("js-arrow-modal2")
    baliseButtonCloseModal.appendChild(baliseIClose)
    baliseButtonArrow.appendChild(baliseIArrow)
    baliseDivWrapperModal2.appendChild(baliseButtonArrow)
    baliseDivWrapperModal2.appendChild(baliseButtonCloseModal)
    baliseDivWrapperModal2.appendChild(baliseH3)
    baliseDivWrapperModal2.appendChild(baliseForm)
    baliseAside.appendChild(baliseDivWrapperModal2)
}

// Création du formulaire modal 2
function createFromModal2() {
const baliseForm= document.querySelector(".modal-wrapper-2 form")
const baliseFieldset = document.createElement("fieldset")
const baliseIMontain = document.createElement("i")
const baliseLabelFile = document.createElement("label")
const baliseInputFile = document.createElement("input")
const baliseP = document.createElement("p")
const baliseLabelTitle = document.createElement("label")
const baliseInputTitle = document.createElement("input")
const baliseLabelCategory = document.createElement("label")
const baliseSelect = document.createElement("select")
const baliseOptionObject = document.createElement("option")
const baliseOptionAppartment = document.createElement("option")
const baliseOptionHotel = document.createElement("option")
const baliseInputValidation = document.createElement("input")
const baliseDivInputSubmit = document.createElement("div")
baliseIMontain.classList.add("fa-regular", "fa-image")
baliseInputValidation.classList.add("button-submit-form")
baliseLabelFile.setAttribute("for", "imgUrl")
baliseInputFile.setAttribute("type", "file")
baliseInputFile.setAttribute("id", "imgUrl")
baliseInputFile.setAttribute("name", "imgUrl")
baliseInputFile.setAttribute("accept", ".jpg, .png")
baliseLabelTitle.setAttribute("for", "title")
baliseInputTitle.setAttribute("type", "text")
baliseInputTitle.setAttribute("id", "title")
baliseInputTitle.setAttribute("name", "title")
baliseLabelCategory.setAttribute("for", "categoryId")
baliseSelect.setAttribute("id", "categoryId")
baliseSelect.setAttribute("name", "categoryId")
baliseOptionObject.setAttribute("value", "Objets")
baliseOptionAppartment.setAttribute("value", "Appartements")
baliseOptionHotel.setAttribute("value", "Hôtels & Restaurants")
baliseInputValidation.setAttribute("type", "submit")
baliseInputValidation.setAttribute("value", "Valider")
baliseLabelFile.innerText = "+ Ajouter une photo"
baliseP.innerText = "jpg png: 4mo max"
baliseLabelTitle.innerText = "Titre"
baliseLabelCategory.innerText = "Catégorie"
baliseOptionObject.innerText = "Objets"
baliseOptionAppartment.innerText = "Appartements"
baliseOptionHotel.innerText = "Hôtels & Restaurants"
baliseFieldset.appendChild(baliseIMontain)
baliseFieldset.appendChild(baliseLabelFile)
baliseFieldset.appendChild(baliseInputFile)
baliseFieldset.appendChild(baliseP)
baliseSelect.appendChild(baliseOptionObject)
baliseSelect.appendChild(baliseOptionAppartment)
baliseSelect.appendChild(baliseOptionHotel)
baliseDivInputSubmit.appendChild(baliseInputValidation)
baliseForm.appendChild(baliseFieldset)
baliseForm.appendChild(baliseLabelTitle)
baliseForm.appendChild(baliseInputTitle)
baliseForm.appendChild(baliseLabelCategory)
baliseForm.appendChild(baliseSelect)
baliseForm.appendChild(baliseDivInputSubmit)
}

// On génére les cards de la modal1
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
        baliseTrash.classList.add("fa-solid", "fa-trash-can")
        baliseArrow.classList.add("fa-solid", "fa-arrows-up-down-left-right")
        baliseFigure.appendChild(baliseImg)
        baliseFigure.appendChild(baliseFigcaption)
        baliseDivIcons.appendChild(baliseTrash)
        baliseDivIcons.appendChild(baliseArrow)
        baliseFigure.appendChild(baliseDivIcons)

        const baliseDivParent = document.querySelector(".modal-wrapper div")
        baliseDivParent.appendChild(baliseFigure)

        //On rend la possibilité de supprimer une card en cliquant sur l'icone poubelle
        const token = window.sessionStorage.getItem("token")
        const id = card.id

        async function deleteWork() {
            await fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${token}`
                }
            })
                .then(reponse => {
                    if (reponse.ok) {
                        console.log("Card supprimé")
                    } else {
                        console.log("eErreur lors de la suppression")
                    }
                })
                .catch(error => {
                    console.log("Il y a une erreur")
                })
        }
        baliseTrash.addEventListener("click", () => {
            deleteWork()
            //On supprime les card dans la gallery sans rafraichir la page
            const baliseImgCardList = document.querySelectorAll(`img[src="${card.imageUrl}"]`)
            baliseImgCardList[0].parentNode.remove()
            baliseImgCardList[1].parentNode.remove()
        })
    }

}

//On lence les 3 fonctions afin de créer la base modal principal, d'y ajouter les work et de pouvoir les supprimer sans raffraichir

generateModal()
generateWorkModal()

generateModal2()
createFromModal2()

// On rend dynamique la page modal//

//création des fonction ouvrir/fermer modal//
let modal = null
function closeModal() {
    if (modal === null) return
    modal = document.querySelector("aside")
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal", "false")
    modal = null
}

function openCloseModal() {
    const listLienModal = document.querySelectorAll(".modification")
    //On ouvre la modal lorsqu'on click sur un lieu modifier
    listLienModal.forEach(a => {
        a.addEventListener("click", () => {
            if (modal === null) {
                modal = document.querySelector("aside")
                modal.removeAttribute("aria-hidden")
                modal.setAttribute("aria-modal", "true")
            }
        })
    })
    //On ferme la modal lorsque l'on clic sur la croix 
    const baliseListButtonCloseModal = document.querySelector(".js-close-modal")
    baliseListButtonCloseModal.addEventListener("click", () => {
        closeModal()
    })


    // On supprime la propagation pour que la modal ne se ferme pas lorsqu'on clic dessus
    document.querySelector(".modal-wrapper").addEventListener("click", (event) => {
        event.stopPropagation()
        //On la ferme lorsqu'on clic à l'extérieur
        document.querySelector("aside").addEventListener("click", () => {
            closeModal()
        })
    })
}
openCloseModal()

//On change la modal lorsque on clic sur "ajouter une photo" en rendant invisible la 1 pour rendre visible l  la 2

document.querySelector(".button-add-img").addEventListener("click", () => {
    const baliseModalWrapper = document.querySelector(".modal-wrapper")
    const baliseModalWrapper2 = document.querySelector(".modal-wrapper-2")
    baliseModalWrapper.classList.add("modal-1-invisible")
    baliseModalWrapper2.classList.remove("modal-2-invisible")

    //On ferme la modal lorsque l'on clic sur la croix 
    const baliseListButtonCloseModal = document.querySelector(".js-close-modal2")
    baliseListButtonCloseModal.addEventListener("click", () => {
        closeModal()
        //et on revient au début en rendant display none à la 2 et pas la 1
        baliseModalWrapper.classList.remove("modal-1-invisible")
        baliseModalWrapper2.classList.add("modal-2-invisible")
    })


    // On supprime la propagation pour que la modal ne se ferme pas lorsqu'on clic dessus
    document.querySelector(".modal-wrapper-2").addEventListener("click", (event) => {
        event.stopPropagation()
        //On la ferme lorsqu'on clic à l'extérieur
        document.querySelector("aside").addEventListener("click", () => {
            closeModal()
            //et on revient au début en rendant display none à la 2 et pas la 1
            baliseModalWrapper.classList.remove("modal-1-invisible")
            baliseModalWrapper2.classList.add("modal-2-invisible")
        })
    })

    //On revien à la modal 1 lorsqu'on clic sur la flèche

    document.querySelector(".js-arrow-modal2").addEventListener("click", () => {
        baliseModalWrapper.classList.remove("modal-1-invisible")
        baliseModalWrapper2.classList.add("modal-2-invisible")
    })

})







