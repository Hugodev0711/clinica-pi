let formAgendamento = document.getElementById("form-agendamento");
let tituloAgendamento = document.getElementById("titulo-form-agendamento");
let linhas = document.querySelectorAll("#tabela-agendamentos .linha-agendamento");

let caixaFiltro = document.getElementById("caixa-filtro");
let pesquisaFiltro = document.getElementById("pesquisa-filtro");
let opcoesFiltro = document.getElementById("opcoes-filtro");

let colunas = {
    paciente: 0,
    data: 1,
    hora: 2,
    profissional: 3,
    status: 4
};

let colunaAtual = "";
let filtros = {};

function adicionarAgendamento() {
    formAgendamento.reset();
    formAgendamento.elements.idAgendamento.value = "";
    tituloAgendamento.textContent = "Adicionar Agendamento";
    formAgendamento.hidden = false;
}

function editarAgendamento(botao) {
    adicionarAgendamento();

    let campos = formAgendamento.elements;
    let dados = botao.dataset;

    campos.idAgendamento.value = dados.id;
    campos.idCliente.value = dados.cliente;
    campos.idFuncionario.value = dados.funcionario;
    campos.idUnidade.value = dados.unidade;
    campos.idProcedimento.value = dados.procedimento;
    campos.dataAgendamento.value = dados.data;
    campos.horaAgendamento.value = dados.hora;
    campos.status.value = dados.status;

    tituloAgendamento.textContent = "Editar Agendamento";
}

function fecharFormularioAgendamento() {
    formAgendamento.hidden = true;
}

function listarAgendamentos() {
    let pesquisa = document.getElementById("pesquisa").value.trim().toLowerCase();

    linhas.forEach(function (linha) {
        let corresponde = linha.cells[colunas.paciente].textContent
            .toLowerCase().includes(pesquisa);

        for (let coluna in filtros) {
            let valor = linha.cells[colunas[coluna]].textContent.trim();

            if (!filtros[coluna].includes(valor)) {
                corresponde = false;
            }
        }

        linha.hidden = !corresponde;
    });
}

function abrirFiltro(coluna, botao) {
    colunaAtual = coluna;
    pesquisaFiltro.value = "";
    opcoesFiltro.textContent = "";
    document.getElementById("titulo-filtro").textContent = "Filtrar por " + coluna;

    let valores = [];

    linhas.forEach(function (linha) {
        let valor = linha.cells[colunas[coluna]].textContent.trim();

        if (!valores.includes(valor)) {
            valores.push(valor);
        }
    });

    valores.sort().forEach(function (valor) {
        let label = document.createElement("label");
        label.className = "opcao-filtro";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = valor;
        checkbox.checked = !filtros[coluna] || filtros[coluna].includes(valor);

        label.appendChild(checkbox);
        label.append(" " + valor);
        opcoesFiltro.appendChild(label);
    });

    caixaFiltro.style.display = "block";

    let posicao = botao.getBoundingClientRect();
    caixaFiltro.style.top = posicao.bottom + 5 + "px";
    caixaFiltro.style.left = Math.max(
        5, Math.min(posicao.left, window.innerWidth - caixaFiltro.offsetWidth - 5)
    ) + "px";
}

function mostrarOpcoes() {
    let pesquisa = pesquisaFiltro.value.trim().toLowerCase();

    opcoesFiltro.querySelectorAll(".opcao-filtro").forEach(function (opcao) {
        opcao.hidden = !opcao.textContent.toLowerCase().includes(pesquisa);
    });
}

function aplicarFiltro() {
    let selecionados = [];

    opcoesFiltro.querySelectorAll("input:checked").forEach(function (checkbox) {
        selecionados.push(checkbox.value);
    });

    filtros[colunaAtual] = selecionados;
    listarAgendamentos();
    fecharFiltro();
}

function limparFiltro() {
    delete filtros[colunaAtual];
    listarAgendamentos();
    fecharFiltro();
}

function fecharFiltro() {
    caixaFiltro.style.display = "none";
}