const fetchCategory = fetch("http://localhost:5678/api/categories").then(works => works.json());
fetchCategory.then((category) => {
    for (let i = 0; i < category.length; i++) {
        const divFilter = document.querySelector("div.filter");
        const buttonElement = document.createElement("button");
        buttonElement.classList.add("btnFilter");
        buttonElement.type = "submit";
        buttonElement.id = `btnFilter${category[i].id}`;
        buttonElement.innerHTML = `${category[i].name}`
        divFilter.appendChild(buttonElement);
    }
})

// _________________________________________APPEL_API_________________________________________
const fetchWorks = fetch("http://localhost:5678/api/works").then(works => works.json());
fetchWorks.then((works) => {

    // ________________________________________GENERER_TRAVAUX________________________________________

    function genererWorks(works) {
        for (let i = 0; i < works.length; i++) {
            const gallery = document.querySelector("div.gallery");
            const figureElement = document.createElement("figure");
            figureElement.classList.add("work", `work${works[i].id}`);
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

const leToken = window.localStorage.getItem("token");
function admin() {
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


async function genererWorksModal(img, title, id) {
    try {

        const gallery = document.querySelector("div.galleryModal");
        const figureElement = document.createElement("figure");
        figureElement.classList.add("workModal");
        const imgElement = document.createElement("img");
        imgElement.src = img;
        imgElement.alt = title;
        const p = document.createElement("p");
        p.classList.add(`${id}`);
        const elementSuppr = document.createElement("i");
        elementSuppr.classList.add("fa-solid", "fa-trash-can");
        figureElement.id = id;
        p.appendChild(elementSuppr);
        figureElement.appendChild(imgElement);
        figureElement.appendChild(p);
        gallery.appendChild(figureElement);

        const btnTrash = document.querySelectorAll("p");

        btnTrash.forEach((btn) => btn.addEventListener("click", () => {
            const idWorks = id;
            const token = window.localStorage.getItem("token");
            deleteWorks(idWorks, token);
        }));

    } catch (err) {
        alert("Le serveur ne fonctionne pas !")
    }
}

const response = await fetch('http://localhost:5678/api/works');
const worksModal = await response.json();
for (let i = 0; i < worksModal.length; i++) {

    const img = worksModal[i].imageUrl;
    const title = worksModal[i].title;
    const id = worksModal[i].id;

    genererWorksModal(img, title, id);
}

// _________________________________________SUPPRIMER_WORKS_MODAL_______________________________________

function deleteWorks(idWorks, token) {
    fetch(`http://localhost:5678/api/works/${idWorks}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    alert(`Le travail d'id ${idWorks} a bien été supprimé !`);

    const figureDeleteModal = document.getElementById(`${idWorks}`);
    const figureDelete = document.querySelector(`.work${idWorks}`);
    figureDeleteModal.remove()
    figureDelete.remove()
}

// _________________________________________AJOUTER_WORKS_MODAL_______________________________________

// _______________________________________AFFICHAGE_PAGE_AJOUTER______________________________________
const btnArrowModal = document.querySelector("button.btnArrowModal")
const divDelete = document.querySelector("div.delete");
const divAdd = document.querySelector("div.add");
const btnAjouter = document.querySelector(".btnAjouter");
const btnValider = document.querySelector("button.btnValider");

btnAjouter.addEventListener("click", () => {
    divAdd.style.display = "flex";
    divDelete.style.display = "none";
    btnArrowModal.style.display = "flex";
})

btnArrowModal.addEventListener("click", () => {
    divAdd.style.display = "none";
    divDelete.style.display = "flex";
    btnArrowModal.style.display = "none";
})

// _______________________________________AFFICHAGE_MINIA_AJOUTER______________________________________

const iconeImg = document.querySelector("div.formImg i.fa-image");
const pImage = document.querySelector("div.formImg p");
const btnAjoutImg = document.querySelector("div.formImg input#image");
const labelAjoutImg = document.querySelector("div.formImg label");

function minia() {
    const files = btnAjoutImg.files;
    if (files.length > 0) {
        const fileName = files[0].name;
        const image = document.createElement("img")
        image.src = "./assets/images/" + fileName;
        const divFormImg = document.querySelector("div.formImg");
        divFormImg.appendChild(image)
        iconeImg.style.display = "none";
        pImage.style.display = "none";
        btnAjoutImg.style.display = "none";
        labelAjoutImg.style.display = "none"
    }
}

btnAjoutImg.addEventListener("change", minia)

// _______________________________________FONCTION_AJOUTER_WORKS______________________________________

async function addWorks() {
    const image = document.getElementById("image").files;
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;

    if (image.length === 0 || title === "" || category === "0") {
        alert("Remplisser tous les champs !")
    } else {
        try {
            const data = new FormData()
            data.append("image", image[0]);
            data.append("title", title);
            data.append("category", category);

            const response = await fetch("http://localhost:5678/api/works/", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${leToken}`
                },
                body: data,
            });


            if (response.status === 201) {

                const fetchAddWorks = await response.json();
                const img = fetchAddWorks.imageUrl;
                const title = fetchAddWorks.title;
                const id = fetchAddWorks.id;

                const gallery = document.querySelector("div.gallery");
                const figureElement = document.createElement("figure");
                figureElement.classList.add("work", `work${fetchAddWorks.id}`);
                const imgElement = document.createElement("img");
                const figCaptionElement = document.createElement("figCaption");
                imgElement.src = `./assets/images/${image[0].name}`;
                imgElement.alt = `${title}`;
                figCaptionElement.innerText = `${title}`;
                figureElement.appendChild(imgElement);
                figureElement.appendChild(figCaptionElement);
                gallery.appendChild(figureElement);

                genererWorksModal(img, title, id);
                alert(`${title} a bien été ajouté avec succès !`)
                document.getElementById("idFormModal").reset();
                iconeImg.style.display = "flex";
                pImage.style.display = "flex";
                labelAjoutImg.style.display = "flex";

                const imgMinia = document.querySelector("div.formImg img");
                imgMinia.remove()

            }
            else if (response.status === 401) {
                alert("Vous n'ètes pas connecté !");
                window.location.href = "login.html";
            }

        } catch (err) {
            console.log(err);
        }
    }

}

btnValider.addEventListener("click", () => {
    addWorks();

});

// _______________________________________FONCTION_ONCHANGE______________________________________

function verif() {
    const image = document.getElementById("image").files;
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const btnValider = document.querySelector("button.btnValider");

    if (image.length === 1 && title && category != 0) {
        btnValider.style.background = "#1D6154";
    } else {
        btnValider.style.background = "#A7A7A7";
    }
};

const form = document.getElementById("idFormModal")

form.addEventListener("change", () => {
    verif();
})