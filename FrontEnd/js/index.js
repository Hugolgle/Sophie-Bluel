// _________________________________________APPEL_API_________________________________________
const fetchWorks = fetch("http://localhost:5678/api/works").then(works => works.json());
fetchWorks.then((works) => {

    // ________________________________________GENERER_TRAVAUX________________________________________

    function genererWorks(works) {
        for (let i = 0; i < works.length; i++) {
            const gallery = document.querySelector("div.gallery");
            const figureElement = document.createElement("figure");
            figureElement.classList.add("work");
            const imgElement = document.createElement("img");
            const figCaptionElement = document.createElement("figCaption");
            imgElement.src = works[i].imageUrl;
            imgElement.alt = works[i].title;
            figCaptionElement.innerText = works[i].title;
            figureElement.appendChild(imgElement);
            figureElement.appendChild(figCaptionElement);
            gallery.appendChild(figureElement);
        }
    }

    genererWorks(works);

    // ____________________________________________FILTRES____________________________________________

    function btnFilter(index) {
        const btnFilter = document.querySelectorAll("div.filter button");
        btnFilter.forEach((btn) => {
            if (btn.id === `btnFilter${index}`) {
                btn.classList.add('btnFilterActive');
            } else {
                btn.classList.remove('btnFilterActive');
            }
        });
    }

    const btnAll = document.getElementById("btnFilter0");
    btnAll.addEventListener("click", () => {
        const categorie = "0";
        const figures = document.querySelectorAll("figure.work");
        figures.forEach(figure => figure.remove());
        genererWorks(works);
        btnFilter(categorie)
    });

    const btnObj = document.getElementById("btnFilter1");
    btnObj.addEventListener("click", () => {
        const categorie = "1";
        const filterObj = works.filter(work => work.categoryId == categorie);
        const figures = document.querySelectorAll("figure.work");
        figures.forEach(figure => figure.remove());
        genererWorks(filterObj);
        btnFilter(categorie)
    });

    const btnAppart = document.getElementById("btnFilter2");
    btnAppart.addEventListener("click", () => {
        const categorie = "2";
        const filterAppart = works.filter(work => work.categoryId == categorie);
        const figures = document.querySelectorAll("figure.work");
        figures.forEach(figure => figure.remove());
        genererWorks(filterAppart);
        btnFilter(categorie)
    });

    const btnHotel = document.getElementById("btnFilter3");
    btnHotel.addEventListener("click", () => {
        const categorie = "3";
        const filterHotel = works.filter(work => work.categoryId == categorie);
        const figures = document.querySelectorAll("figure.work");
        figures.forEach(figure => figure.remove());
        genererWorks(filterHotel);
        btnFilter(categorie)
    });
})

// _______________________________________________ADMIN_______________________________________________

function admin() {
    const leToken = window.localStorage.getItem("token");
    if (leToken) {
        const btnLogOut = document.querySelector("li:nth-child(3)>a");
        btnLogOut.innerHTML = "logout";
        btnLogOut.addEventListener("click", () => {
            window.localStorage.removeItem("token");
        })
        const btnModif = document.querySelector("button.modal-btn");
        btnModif.style.display = "flex";
        const divFilter = document.querySelector("div.filter");
        divFilter.style.display = "none";
        const btnHeaderModif = document.querySelector("button.btnHeaderModif");
        btnHeaderModif.style.display = "flex";
    } else {
        return false;
    }
}

admin();

// _______________________________________________MODAL_______________________________________________

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));
function toggleModal() {
    modalContainer.classList.toggle("active");
}

// _______________________________________AFFICHAGE_WORKS_MODAL_______________________________________

function genererWorksModal() {
    fetchWorks.then((works) => {
        // foreach
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
                deleteWorks(idWorks, token);
            });
        }
    })
}
genererWorksModal();

// _______________________________________SUPPRIMER_WORKS_MODAL_______________________________________

function deleteWorks(idWorks, token) {
    fetch(`http://localhost:5678/api/works/${idWorks}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    const figureDelete = document.getElementById(`${idWorks}`);
    figureDelete.style.display = "none";
}