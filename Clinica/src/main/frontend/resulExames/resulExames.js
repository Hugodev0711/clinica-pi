let form = document.getElementById("form-exames");
let buscaExame = document.getElementById("busca-exame");
let filtroStatus = document.getElementById("filtro-status");
let exames = document.getElementById("lista-exame");
let semResultado = document.getElementById("sem-resultado");

function filtrarExames() {
    
    let busca = buscaExame.value.trim().toLowerCase();
    let status = filtroStatus.value;
    let encontrou = false;

    exames.array.forEach(function(exame) {
        let nome = exame.querySelector(".exame-nome").textContent.toLowerCase();

        if(nome.includes(busca) && (status === "" || exame.dataset.status === status)) {
            exame.style.display = "";
            encontrou = true;
        }
        else {
            exame.style.display = "none";
        }
    });

    semResultado.hidden = encontrou;
}

buscaExame.addEventListener("input", filtrarExames);
filtroStatus.addEventListener("change", filtrarExames);
filtrarExames();