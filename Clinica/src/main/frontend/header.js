let usuarioLogado = localStorage.getItem("usuarioLogado");
let areaLogin = document.getElementById("area-login");

if(areaLogin) {
    if(usuarioLogado == "true") {
    areaLogin.innerHTML = `
        <div class="usuario-logado">
            <div class="info-usuario">
                <img src="../imagens/login.svg" alt="Usuário">
                <span>Minha Conta</span>
            </div>

            <button onclick="logout()">Sair</button>
        </div>
    `;
    }
}

function logout() {

    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("emailUsuario");

    alert("Logout realizado com sucesso!");

    window.location.href = "../inicial/inicial.html";

}