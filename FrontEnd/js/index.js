const reponse = fetch("http://localhost:5678/api/works").then((response) => {
    return response.json();
})

reponse.then((works) => {
    for (const work of works) {
        const gallery = document.querySelector("div.gallery");
        const figureElement = document.createElement("figure");
        gallery.appendChild(figureElement);
        const imgElement = document.createElement("img");
        const figCaptionElement = document.createElement("figCaption");
        imgElement.src = work.imageUrl;
        imgElement.alt = work.title;
        figCaptionElement.innerText = work.title;
        figureElement.appendChild(imgElement);
        figureElement.appendChild(figCaptionElement);
    }
});






