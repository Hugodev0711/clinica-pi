let banners = ["imagens/banner1","imagens/banner2","imagens/banner3"]

let indice = 0;

function mostrarBanner() {
    document.getElementById("banner").src = banners[indice];
}

function proximo() {

    indice++;

    if (indice >= banners.length) {
        indice = 0;
    }

    mostrarBanner();
}

function anterior() {
    indice--;

    if (indice < 0) {
        indice = banners.length - 1;
    }

    mostrarBanner();
}

function reset () {
    indice 
}

function logout() {

    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("emailUsuario");

    alert("Logout efetuado com sucesso");

    window.location.href = "../inicial/inicial.html"

}

setInterval(proximo, 8000);