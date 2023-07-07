// Récupération des objet projets dans l'api
const works = await fetch('http://localhost:5678/api/works').then(works => works.json())

// Création des bouttons
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

//Premier affichage de la partie Projets
generateWorks(works)

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






