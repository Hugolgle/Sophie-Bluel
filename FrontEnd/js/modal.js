const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));
function toggleModal() {
    modalContainer.classList.toggle("active");
}

const works = fetch("http://localhost:5678/api/works").then(works => works.json());
works.then((works) => {

    // Fonction recuperation des travaux
    function genererWorks(works) {
        for (let i = 0; i < works.length; i++) {
            const gallery = document.querySelector("div.galleryModal");
            const figureElement = document.createElement("figure");
            figureElement.classList.add("workModal");
            const imgElement = document.createElement("img");
            imgElement.src = works[i].imageUrl;
            imgElement.alt = works[i].title;
            const elementSuppr = document.createElement("i");
            elementSuppr.classList.add("fa-solid", "fa-trash-can");
            figureElement.appendChild(imgElement);
            figureElement.appendChild(elementSuppr);
            gallery.appendChild(figureElement);
        }
    }
    genererWorks(works);
})