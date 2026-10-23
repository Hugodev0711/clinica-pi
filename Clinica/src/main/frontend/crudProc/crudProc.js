let funcionarios = [
    {
        id: 1,
        nome: "Consulta Clínica",
        duracao: "30 min",
        preco: "150",
    },
    {
        id: 2,
        nome: "Exame de Sangue",
        duracao: "15 min",
        preco: "80",
    }
];

let proximoId = 3;

let colunaAtual = "";
let filtros = {
    id: null,
    nome: null,
    duracao: null,
    preco: null,
}

function listarProcedimentos() {

    let tabela = document.getElementById("tabela-procedimentos");
    let pesquisa = document.getElementById("pesquisa").value.toLowerCase();

    tabela.innerHTML = "";

    for(let i = 0; i < procedimentos.length; i++) {

        let procedimento = procedimentos[i];

        let correspondePesquisa = funcionario.nome.toLowerCase().includes(pesquisa);

        let correspondeFiltros = true;

        for(let coluna in filtros) {

            if(filtros[coluna] != null) {

                let valor = String(funcionario[coluna]);

                if(!filtros[coluna].includes(valor)) {
                    correspondeFiltros = false;
                }
            }
        }

        if(correspondePesquisa && correspondeFiltros) {

            let linha = tabela.insertRow();

            linha.insertCell().textContent = procedimento.id;
            linha.insertCell().textContent = procedimento.nome;
            linha.insertCell().textContent = procedimento.duracao;
            linha.insertCell().textContent = "R$ " + procedimento.preco;

            let acoes = linha.insertCell();

            let editar = document.createElement("button");
            editar.textContent = "Editar";

            editar.onclick = function() {
                editarProcedimento(procedimento.id);
            };

            let excluir = document.createElement("button");
            excluir.textContent = "Excluir";

            excluir.onclick = function() {
                excluirProcedimento(procedimento.id);
            };

            acoes.appendChild(editar);
            acoes.appendChild(excluir);
        }
    }
}


function adicionarProcedimento() {

    let nome = prompt("Nome do Procedimento:");
    if(nome == null || nome.trim() == "") {
        return;
    }

    let cargo = prompt("Duração do Procedimento:");
    if(cargo == null || cargo.trim() == "") {
        return;
    }

    let especialidade = prompt("Preço do procedimento:");
    if(especialidade == null || especialidade.trim() == "") {
        return;

        preco = Number(preco.replace(",", "."));

        if(!Number.isFinite(preco) || preco < 0) {
            alert("Preço invalido");
            return;
        }
    }

    let novoProcedimento = {
        id: proximoId,
        nome: nome,
        duracao: duracao,
        preco: preco
    };

    procedimentos.push(novoProcedimento);
    proximoId++;

    listarProcedimentos();

}


function editarProcedimento(id) {

    for(let i = 0; i < procedimentos.length; i++) {
        if(procedimentos[i].id == id) {

            let nome = prompt("Novo nome:", procedimentos[i].nome);
            if(nome == null || nome.trim() == "") {
                return;
            }

            let duracao = prompt("Nova duração:", procedimentos[i].duracao);
            if(duracao == null || duracao.trim() == "") {
                return;
            }

            let preco = prompt("Novo Preço:", procedimentos[i].preco);
            if(preco == null || preco.trim() == "") {
                return;
                preco = Number(preco.replace(",", "."));
                if(!Number.isFinite(preco) || preco < 0) {
                    alert("Preço invalido");
                    return;
                }
            }

            procedimentos[i].nome = nome;
            procedimentos[i].duracao = duracao;
            procedimentos[i].preco = preco;

            listarProcedimentos();
            return;
        }
    }
}

function excluirProcedimento(id) {

    let confirmar = confirm("Deseja excluir este procedimento?");

    if(confirmar == false) {
        return;
    }

    for(let i = 0; i < procedimentos.length; i++) {
        if(procedimentos[i].id == id) {
            procedimentos.splice(i, 1);
            listarProcedimentos();
            return;
        }

    }

}

function abrirFiltro(coluna, botao) {

    colunaAtual = coluna;

    let caixa = document.getElementById("caixa-filtro");
    let titulo = document.getElementById("titulo-filtro");
    let pesquisa = document.getElementById("pesquisa-filtro");
    let opcoes = document.getElementById("opcoes-filtro");

    caixa.style.display = "block";
    let posicao = botao.getBoundingClientRect();
    caixa.style.top = posicao.bottom + 5 + "px";
    caixa.style.left = Math.max(5, Math.min(posicao.left, window.innerWidth - caixa.offsetWidth - 5)) + "px";

    titulo.textContent = "Filtrar por " + coluna;
    pesquisa.value = "";
    opcoes.innerHTML = "";

    let valores = [];

    for(let i = 0; i < procedimentos.length; i++) {
        let valor = String(procedimentos[i][coluna]);

        if(!valores.includes(valor)) {
            valores.push(valor);
        }
    }

    valores.sort();

    for(let i = 0; i < valores.length; i++) {
    let label = document.createElement("label");
    label.className = "opcao-filtro";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = valores[i];

    if(filtros[coluna] == null ||
       filtros[coluna].includes(valores[i])) {
        checkbox.checked = true;
    }

    label.appendChild(checkbox);
    label.append(" " + valores[i]);

    opcoes.appendChild(label);
    }
}

function mostrarOpcoes() {

    let pesquisa = document.getElementById("pesquisa-filtro").value.toLowerCase();
    let opcoes = document.querySelectorAll(".opcao-filtro");

    for(let i = 0; i < opcoes.length; i++) {
        let texto = opcoes[i].textContent.toLowerCase();

        if(texto.includes(pesquisa)) {
            opcoes[i].style.display = "block";
        }
        else {
            opcoes[i].style.display = "none"
        }
    }
}

function aplicarFiltro() {

    let checkboxes = document.querySelectorAll("#opcoes-filtro input[type='checkbox']");
    let selecionados = [];

    for(let i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            selecionados.push(checkboxes[i].value);
        }
    }

    filtros[colunaAtual] = selecionados;
    listarProcedimentos();
    fecharFiltro();

}

function limparFiltro() {
    filtros[colunaAtual] = null;
    listarProcedimentos();
    fecharFiltro();
}

function fecharFiltro() {
    document.getElementById("caixa-filtro").style.display = "none";
}

listarProcedimentos();