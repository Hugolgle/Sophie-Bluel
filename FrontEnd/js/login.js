const url = "http://localhost:5678/api/users/login";
async function login() {
    const email = document.querySelector("input#email").value;
    const password = document.querySelector("input#password").value;
    const messageErr = document.querySelector("p.error");
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
            window.location.href = "../FrontEnd/index.html";
        } else if (email === "" || password === "") {
            messageErr.innerHTML = ("Renseigner votre e-mail et votre mdp !");
        } else {
            messageErr.innerHTML = ("Erreur dans l'identifiant ou le mot de passe");
        }
    } catch (err) {
        messageErr.innerHTML = ("Le serveur ne répond pas !");
    }
}

const btnSeConnecter = document.querySelector("input#seConnecter");
btnSeConnecter.addEventListener("click", (event) => {
    event.preventDefault();
    login();
})