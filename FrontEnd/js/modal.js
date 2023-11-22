const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));
function toggleModal() {
    modalContainer.classList.toggle("active");
}

// Fonction recuperation des travaux
function genererWorks() {
    const fetchWorks = fetch("http://localhost:5678/api/works").then(works => works.json());
    fetchWorks.then((works) => {
        for (let i = 0; i < works.length; i++) {
            const gallery = document.querySelector("div.galleryModal");
            const figureElement = document.createElement("figure");
            figureElement.classList.add("workModal");
            const imgElement = document.createElement("img");
            imgElement.src = works[i].imageUrl;
            imgElement.alt = works[i].title;
            const p = document.createElement("p");
            p.classList.add(`${works[i].id}`);
            const elementSuppr = document.createElement("i");
            elementSuppr.classList.add("fa-solid", "fa-trash-can");
            figureElement.id = works[i].id;
            p.appendChild(elementSuppr);
            figureElement.appendChild(imgElement);
            figureElement.appendChild(p);
            gallery.appendChild(figureElement);
        }
        const btnTrash = document.querySelectorAll("p");
        for (let i = 0; i < btnTrash.length; i++) {
            btnTrash[i].addEventListener("click", () => {
                const idWorks = btnTrash[i].className;
                const token = window.localStorage.getItem("token");
                function deleteWorks() {
                    fetch(`http://localhost:5678/api/works/${idWorks}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    });
                    const figureDelete = document.getElementById(`${idWorks}`);
                    figureDelete.style.display = "none";
                }
                deleteWorks();
            });
        }
    })
}
genererWorks();