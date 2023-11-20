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

    genererWorks(works);

    // Filtres
    const btnAll = document.querySelector("button.all");
    btnAll.addEventListener("click", () => {
        const figures = document.querySelectorAll("figure.work");
        figures.forEach(figure => figure.remove());
        genererWorks(works);
    });

    const btnObj = document.querySelector("button.object");
    btnObj.addEventListener("click", () => {
        const filterObj = works.filter(work => work.categoryId == 1);
        const figures = document.querySelectorAll("figure.work");
        figures.forEach(figure => figure.remove());
        genererWorks(filterObj);
    });

    const btnAppart = document.querySelector("button.appart");
    btnAppart.addEventListener("click", () => {
        const filterAppart = works.filter(work => work.categoryId == 2);
        const figures = document.querySelectorAll("figure.work");
        figures.forEach(figure => figure.remove());
        genererWorks(filterAppart);
    });

    const btnHotel = document.querySelector("button.hotel");
    btnHotel.addEventListener("click", () => {
        const filterHotel = works.filter(work => work.categoryId == 3);
        const figures = document.querySelectorAll("figure.work");
        figures.forEach(figure => figure.remove());
        genererWorks(filterHotel);
    });
})