let caminhoHeader = document.currentScript.src;
let usuarioLogado = localStorage.getItem("usuarioLogado");
let areaLogin = document.getElementById("area-login");

if (areaLogin && usuarioLogado === "true") {
    let iconeLogin = new URL("imagens/login.svg", caminhoHeader).href;

    areaLogin.innerHTML = `
        <div class="usuario-logado">
            <div class="info-usuario">
                <img src="${iconeLogin}" alt="Usuário">
                <span>Minha Conta</span>
            </div>

            <button type="button" onclick="logout()">Sair</button>
        </div>
    `;
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("emailUsuario");

    alert("Logout realizado com sucesso!");

    window.location.href = new URL("inicial/inicial.jsp", caminhoHeader).href;
}