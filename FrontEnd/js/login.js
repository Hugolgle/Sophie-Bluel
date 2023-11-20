// sophie.bluel@test.tld
// S0phie

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
        const idUser = reponse.userId;
        const token = reponse.token;
        if (email === "" || password === "") {
            messageErr.innerHTML = ("Renseigner votre e-mail et votre mdp !");
        } else if (reponse.ok == false) {
            messageErr.innerHTML = ("Erreur dans l'identifiant ou le mot de passe");
        } else {
            window.localStorage.setItem("id", idUser);
            window.localStorage.setItem("token", token);
            window.location = "../FrontEnd/index.html"
        }
    } catch (err) {
        messageErr.innerHTML = ("Le serveur ne repond pas !");
    }
}

const btnSeConnecter = document.querySelector("input#seConnecter");
btnSeConnecter.addEventListener("click", (event) => {
    event.preventDefault();
    login();
})



