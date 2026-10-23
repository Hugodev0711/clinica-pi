let funcionarios = [
    {
        id: 1,
        paciente: "Cauan Lima",
        data: "25/10/2026",
        hora: "09:00",
        profissional: "Dra. Maria",
        status: "Agendado"
    },
    {
        id: 2,
        paciente: "Hugo Costa",
        data: "25/12/2026",
        hora: "15:00",
        profissional: "Dr. carlos",
        status: "Confirmado"
    }
];

let proximoId = 3;

let colunaAtual = "";
let filtros = {
    id: null,
    paciente: null,
    data: null,
    hora: null,
    profissional: null,
    status: null
}

function listarAgendamentos() {

    let tabela = document.getElementById("tabela-agendamentos");
    let pesquisa = document.getElementById("pesquisa").value.toLowerCase();

    tabela.innerHTML = "";

    for(let i = 0; i < agendamentos.length; i++) {

        let agendamento = agendamentos[i];

        let correspondePesquisa = agendamento.nome.toLowerCase().includes(pesquisa);

        let correspondeFiltros = true;

        for(let coluna in filtros) {

            if(filtros[coluna] != null) {

                let valor = String(agendamento[coluna]);

                if(!filtros[coluna].includes(valor)) {
                    correspondeFiltros = false;
                }
            }
        }

        if(correspondePesquisa && correspondeFiltros) {

            let linha = tabela.insertRow();

            linha.insertCell().textContent = unidade.id;
            linha.insertCell().textContent = unidade.paciente;
            linha.insertCell().textContent = unidade.data;
            linha.insertCell().textContent = unidade.hora;
            linha.insertCell().textContent = unidade.profissional;
            linha.insertCell().textContent = unidade.status;

            let acoes = linha.insertCell();

            let editar = document.createElement("button");
            editar.textContent = "Editar";

            editar.onclick = function() {
                editarProcedimento(agendamento.id);
            };

            let excluir = document.createElement("button");
            excluir.textContent = "Excluir";

            excluir.onclick = function() {
                excluirProcedimento(agendamento.id);
            };

            acoes.appendChild(editar);
            acoes.appendChild(excluir);
        }
    }
}


function adicionarAgendamento() {

    let nome = prompt("Nome do paciente:");
    if(nome == null || nome.trim() == "") {
        return;
    }

    let data = prompt("Data do agendamento:");
    if(data == null || data.trim() == "") {
        return;
    }

    let hora = prompt("Horario do agendamento:");
    if(hora == null || hora.trim() == "") {
        return;
    }

    let profissional = prompt("Profissional:");
    if(profissional == null || profissional.trim() == "") {
        return;
    }

    let status = prompt("Status:");
    if(status == null || status.trim() == "") {
        return;
    }

    let novoAgendamento = {
        id: proximoId,
        paciente: paciente,
        data: data,
        hora: hora,
        profissional: profissional,
        status: "Agendado"
    };

    unidades.push(novoAgendamento);
    proximoId++;

    listarAgendamentos();

}


function editarAgentamento(id) {

    for(let i = 0; i < agendamentos.length; i++) {
        if(agendamentos[i].id == id) {

            let paciente = prompt("Novo paciente:", agendamentos[i].paciente);
            if(paciente == null || paciente.trim() == "") {
                return;
            }

            let data = prompt("Nova data:", agendamentos[i].data);
            if(data == null || data.trim() == "") {
                return;
            }

            let hora = prompt("Novo horario:", agendamentos[i].hora);
            if(hora == null || hora.trim() == "") {
                return;
            }

            let profissional = prompt("Novo profissional:", agendamentos[i].profissional);
            if(profissional == null || profissional.trim() == "") {
                return;
            }

            let status = prompt("Novo status:", agendamentos[i].status);
            if(status == null || status.trim() == "") {
                return;
            }

            agendamentos[i].paciente = paciente;
            agendamentos[i].data = data;
            agendamentos[i].hora = hora;
            agendamentos[i].profissional = profissional;
            agendamentos[i].status = status;

            listarAgendamentos();
            return;
        }
    }
}

function excluirAgendamento(id) {

    let confirmar = confirm("Deseja excluir este agendamento?");

    if(confirmar == false) {
        return;
    }

    for(let i = 0; i < agendamentos.length; i++) {
        if(agendamentos[i].id == id) {
            agendamentos.splice(i, 1);
            listarAgendamentos();
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

    for(let i = 0; i < agendamentos.length; i++) {
        let valor = String(agendamentos[i][coluna]);

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
    listarAgendamentos();
    fecharFiltro();
}

function fecharFiltro() {
    document.getElementById("caixa-filtro").style.display = "none";
}

listarAgendamentos();