// Appelle API
const works = fetch("http://localhost:5678/api/works").then(works => works.json());
works.then((works) => {

    // Fonction recuperation des travaux
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
    // if (btn.id === `btn${index}`) {
    //     btn.style.backgroundColor = "#1D6154";
    //     btn.style.color = "#fff";
    // } else {
    //     btn.style.backgroundColor = "#fff";
    //     btn.style.color = "#1D6154";
    // }

    genererWorks(works);

    // Filtres
    const btnAll = document.getElementById("btnFilter0");
    btnAll.addEventListener("click", () => {
        categorie = "0";
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
        const cat = "1"
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

function admin() {
    const leToken = window.localStorage.getItem("token");

    if (leToken) {
        const btnLogOut = document.querySelector("li:nth-child(3)>a");
        btnLogOut.innerHTML = "logout";
        btnLogOut.addEventListener("click", () => {
            window.localStorage.removeItem("token");
        })
        const btnModif = document.querySelector("button.admin");
        btnModif.style.display = "flex";
    } else {
        return false;
    }
}

admin();