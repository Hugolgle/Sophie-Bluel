const url = "http://localhost:5678/api/users/login";
async function login() {
    const email = document.querySelector("input#email").value;
    const password = document.querySelector("input#password").value;
    try {
        const reponse = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
        }).then((response) => response.json());
        const token = reponse.token;
        if (token) {
            window.localStorage.setItem("token", token);
            window.location.href = "index.html";
        } else if (email === "" || password === "") {
            alert("Renseigner votre e-mail et votre mdp !");
        } else {
            alert("Erreur dans l'identifiant ou le mot de passe");
        }
    } catch (err) {
        alert("Le serveur ne répond pas !");
    }
}

const btnSeConnecter = document.querySelector("input#seConnecter");
btnSeConnecter.addEventListener("click", (event) => {
    event.preventDefault();
    login();
})