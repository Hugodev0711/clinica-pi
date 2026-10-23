let funcionarios = [
    {
        id: 1,
        nome: "Clinica Centro",
        endereco: "Rua Central, 100",
        telefone: "(11) 99999-1111",
        horario: "08:00 - 18:00",
        status: "Ativo"
    },
    {
        id: 2,
        nome: "Clinica Sul",
        endereco: "Rua Sul, 200",
        telefone: "(11) 99999-2222",
        horario: "08:00 - 18:00",
        status: "Ativo"
    }
];

let proximoId = 3;

let colunaAtual = "";
let filtros = {
    id: null,
    nome: null,
    endereco: null,
    telefone: null,
    horario: null,
    status: null
}

function listarUnidades() {

    let tabela = document.getElementById("tabela-unidades");
    let pesquisa = document.getElementById("pesquisa").value.toLowerCase();

    tabela.innerHTML = "";

    for(let i = 0; i < unidades.length; i++) {

        let unidade = unidades[i];

        let correspondePesquisa = unidade.nome.toLowerCase().includes(pesquisa);

        let correspondeFiltros = true;

        for(let coluna in filtros) {

            if(filtros[coluna] != null) {

                let valor = String(unidade[coluna]);

                if(!filtros[coluna].includes(valor)) {
                    correspondeFiltros = false;
                }
            }
        }

        if(correspondePesquisa && correspondeFiltros) {

            let linha = tabela.insertRow();

            linha.insertCell().textContent = unidade.id;
            linha.insertCell().textContent = unidade.nome;
            linha.insertCell().textContent = unidade.endereco;
            linha.insertCell().textContent = unidade.telefone;
            linha.insertCell().textContent = unidade.horario;
            linha.insertCell().textContent = unidade.status;

            let acoes = linha.insertCell();

            let editar = document.createElement("button");
            editar.textContent = "Editar";

            editar.onclick = function() {
                editarProcedimento(unidade.id);
            };

            let excluir = document.createElement("button");
            excluir.textContent = "Excluir";

            excluir.onclick = function() {
                excluirProcedimento(unidade.id);
            };

            acoes.appendChild(editar);
            acoes.appendChild(excluir);
        }
    }
}


function adicionarUnidade() {

    let nome = prompt("Nome da unidade:");
    if(nome == null || nome.trim() == "") {
        return;
    }

    let endereco = prompt("Endereço:");
    if(endereco == null || endereco.trim() == "") {
        return;
    }

    let telefone = prompt("Telefone:");
    if(telefone == null || telefone.trim() == "") {
        return;
    }

    let horario = prompt("Horario de funcionamento:");
    if(horario == null || horario.trim() == "") {
        return;
    }

    let novaUnidade = {
        id: proximoId,
        nome: nome,
        endereco: endereco,
        telefone: telefone,
        horario: horario,
        status: "Ativo"
    };

    unidades.push(novaUnidade);
    proximoId++;

    listarUnidades();

}


function editarUnidade(id) {

    for(let i = 0; i < unidades.length; i++) {
        if(unidades[i].id == id) {

            let nome = prompt("Novo nome:", unidades[i].nome);
            if(nome == null || nome.trim() == "") {
                return;
            }

            let endereco = prompt("Novo endereço:", unidades[i].endereco);
            if(endereco == null || endereco.trim() == "") {
                return;
            }

            let telefone = prompt("Novo telefone:", unidades[i].telefone);
            if(telefone == null || telefone.trim() == "") {
                return;
            }

            let horario = prompt("Novo horario:", unidades[i].horario);
            if(horario == null || horario.trim() == "") {
                return;
            }

            let status = prompt("Novo status:", unidades[i].status);
            if(status == null || status.trim() == "") {
                return;
            }

            unidades[i].nome = nome;
            unidades[i].endereco = endereco;
            unidades[i].telefone = telefone;
            unidades[i].horario = horario;
            unidades[i].status = status;

            listarUnidades();
            return;
        }
    }
}

function excluirUnidade(id) {

    let confirmar = confirm("Deseja excluir esta unidade?");

    if(confirmar == false) {
        return;
    }

    for(let i = 0; i < unidades.length; i++) {
        if(unidades[i].id == id) {
            unidades.splice(i, 1);
            listarUnidades();
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

    for(let i = 0; i < unidades.length; i++) {
        let valor = String(unidades[i][coluna]);

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
    listarUnidades();
    fecharFiltro();
}

function fecharFiltro() {
    document.getElementById("caixa-filtro").style.display = "none";
}

listarUnidades();