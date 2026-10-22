let funcionarios = [
    {
        id: 1,
        nome: "João Silva",
        cargo: "Enfermeiro",
        especialidade: "Enfermagem",
        status: "Ativo"
    },
    {
        id: 2,
        nome: "Maria Oliveira",
        cargo: "Médica",
        especialidade: "Clínica Geral",
        status: "Ativo"
    }
];

let proximoId = 3;


function listarFuncionarios() {

    let tabela = document.getElementById("tabela-funcionarios");
    let pesquisa = document.getElementById("pesquisa").value.toLowerCase();

    tabela.innerHTML = "";

    for(let i = 0; i < funcionarios.length; i++) {

        let funcionario = funcionarios[i];

        let correspondePesquisa = funcionario.nome
            .toLowerCase().includes(pesquisa);

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

            linha.insertCell().textContent = funcionario.id;
            linha.insertCell().textContent = funcionario.nome;
            linha.insertCell().textContent = funcionario.cargo;
            linha.insertCell().textContent = funcionario.especialidade;
            linha.insertCell().textContent = funcionario.status;

            let acoes = linha.insertCell();

            let editar = document.createElement("button");
            editar.textContent = "Editar";

            editar.onclick = function() {
                editarFuncionario(funcionario.id);
            };

            let excluir = document.createElement("button");
            excluir.textContent = "Excluir";

            excluir.onclick = function() {
                excluirFuncionario(funcionario.id);
            };

            acoes.appendChild(editar);
            acoes.appendChild(excluir);
        }
    }
}


function adicionarFuncionario() {

    let nome = prompt("Nome do funcionário:");
    if(nome == null || nome.trim() == "") {
        return;
    }

    let cargo = prompt("Cargo:");
    if(cargo == null || cargo.trim() == "") {
        return;
    }

    let especialidade = prompt("Especialidade:");
    if(especialidade == null || especialidade.trim() == "") {
        return;
    }

    let novoFuncionario = {
        id: proximoId,
        nome: nome,
        cargo: cargo,
        especialidade: especialidade,
        status: "Ativo"
    };

    funcionarios.push(novoFuncionario);
    proximoId++;

    listarFuncionarios();

}


function editarFuncionario(id) {

    for(let i = 0; i < funcionarios.length; i++) {
        if(funcionarios[i].id == id) {

            let nome = prompt("Novo nome:", funcionarios[i].nome);
            if(nome == null || nome.trim() == "") {
                return;
            }

            let cargo = prompt("Novo cargo:", funcionarios[i].cargo);
            if(cargo == null || cargo.trim() == "") {
                return;
            }

            funcionarios[i].nome = nome;
            funcionarios[i].cargo = cargo;

            listarFuncionarios();
            return;
        }
    }
}

function excluirFuncionario(id) {

    let confirmar = confirm("Deseja excluir este funcionário?");

    if(confirmar == false) {
        return;
    }

    for(let i = 0; i < funcionarios.length; i++) {
        if(funcionarios[i].id == id) {
            funcionarios.splice(i, 1);
            listarFuncionarios();
            return;
        }

    }

}

let colunaAtual = "";
let filtros = {
    id: null,
    nome: null,
    cargo: null,
    especialidade: null,
    status: null
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

    for(let i = 0; i < funcionarios.length; i++) {
        let valor = String(funcionarios[i][coluna]);

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
    listarFuncionarios();
    fecharFiltro();

}

function limparFiltro() {
    filtros[colunaAtual] = null;
    listarFuncionarios();
    fecharFiltro();
}

function fecharFiltro() {
    document.getElementById("caixa-filtro").style.display = "none";
}

console.log("Quantidade de funcionários:", funcionarios.length);

listarFuncionarios();