const URL_LISTAR = contextPath + "/listar-funcionarios";
const URL_CADASTRAR = contextPath + "/create-funcionario";
const URL_EXCLUIR = contextPath + "/deletar-funcionario";

let colunaAtual = "";

let filtros = {
    idFuncionario: null,
    nome: null,
    cargo: null,
    especialidade: null,
    status: null
};

function obterFuncionariosDaTabela() {
    const linhas = document.querySelectorAll("#tabela-funcionarios tr");

    return Array.from(linhas)
        .filter(linha => linha.cells.length >= 6)
        .map(linha => {
            const botaoEditar = linha.querySelector(".editar");

            return {
                elemento: linha,
                idFuncionario: linha.cells[0].textContent.trim(),
                nome: linha.cells[1].textContent.trim(),
                cargo: linha.cells[2].textContent.trim(),
                especialidade: linha.cells[3].textContent.trim(),
                status: linha.cells[4].textContent.trim(),
                idUsuario: botaoEditar?.dataset.idUsuario || "",
                salario: botaoEditar?.dataset.salario || ""
            };
        });
}

function listarFuncionarios() {
    const pesquisa = document.getElementById("pesquisa").value.trim().toLowerCase();
    const funcionarios = obterFuncionariosDaTabela();

    let encontrados = 0;

    funcionarios.forEach(funcionario => {
        const correspondePesquisa = funcionario.nome.toLowerCase().includes(pesquisa);

        const valores = {
            idFuncionario: funcionario.idFuncionario,
            nome: funcionario.nome,
            cargo: funcionario.cargo,
            especialidade: funcionario.especialidade,
            status: funcionario.status
        };

        let correspondeFiltros = true;

        for (const coluna in filtros) {
            if (
                filtros[coluna] !== null &&
                !filtros[coluna].includes(String(valores[coluna]))
            ) {
                correspondeFiltros = false;
                break;
            }
        }

        const exibir = correspondePesquisa && correspondeFiltros;

        funcionario.elemento.style.display = exibir ? "" : "none";

        if (exibir) {
            encontrados++;
        }
    });

    const mensagemExistente = document.querySelector(
        "#tabela-funcionarios .resultado-filtro"
    );

    if (mensagemExistente) {
        mensagemExistente.remove();
    }

    if (encontrados === 0 && funcionarios.length > 0) {
        const linha = document.createElement("tr");
        linha.className = "resultado-filtro";

        const celula = document.createElement("td");
        celula.colSpan = 6;
        celula.className = "sem-registros";
        celula.textContent = "Nenhum funcionário encontrado.";

        linha.appendChild(celula);

        document.getElementById("tabela-funcionarios").appendChild(linha);
    }
}

async function enviarFormulario(url, dados, mensagemErro) {
    const resposta = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: dados
    });

    if (!resposta.ok) {
        throw new Error(mensagemErro);
    }

    window.location.href = URL_LISTAR;
}

async function adicionarFuncionario() {
    const idUsuario = prompt("Digite o ID do usuário já cadastrado:");

    if (idUsuario === null || idUsuario.trim() === "") return;

    const cargo = prompt("Cargo do funcionário:");

    if (cargo === null || cargo.trim() === "") return;

    const especialidade = prompt("Especialidade:");

    if (especialidade === null || especialidade.trim() === "") return;

    const salario = prompt("Salário:");

    if (salario === null || salario.trim() === "") return;

    const salarioNumerico = Number(salario.trim().replace(",", "."));

    if (!Number.isFinite(salarioNumerico) || salarioNumerico < 0) {
        alert("Digite um salário válido.");
        return;
    }

    const dados = new URLSearchParams();

    dados.append("idFuncionario", "");
    dados.append("idUsuario", idUsuario.trim());
    dados.append("cargo", cargo.trim());
    dados.append("especialidade", especialidade.trim());
    dados.append("salario", String(salarioNumerico));

    try {
        await enviarFormulario(
            URL_CADASTRAR,
            dados,
            "Não foi possível cadastrar o funcionário."
        );
    } catch (erro) {
        console.error(erro);
        alert("Erro ao cadastrar funcionário. Verifique os dados e tente novamente.");
    }
}

function visualizarFuncionario(botao) {
    const linha = botao.closest("tr");

    if (!linha) return;

    const celulas = linha.cells;

    alert(
        "ID: " + celulas[0].textContent.trim() +
        "\nNome: " + celulas[1].textContent.trim() +
        "\nCargo: " + celulas[2].textContent.trim() +
        "\nEspecialidade: " + celulas[3].textContent.trim() +
        "\nStatus: " + celulas[4].textContent.trim()
    );
}

async function editarFuncionario(botao) {
    const idFuncionario = botao.dataset.id;
    const idUsuario = botao.dataset.idUsuario;
    const cargoAtual = botao.dataset.cargo || "";
    const especialidadeAtual = botao.dataset.especialidade || "";
    const salarioAtual = botao.dataset.salario || "";

    if (!idFuncionario || !idUsuario) {
        alert("Não foi possível identificar o funcionário ou o usuário vinculado.");
        return;
    }

    const cargo = prompt("Novo cargo:", cargoAtual);

    if (cargo === null || cargo.trim() === "") return;

    const especialidade = prompt("Nova especialidade:", especialidadeAtual);

    if (especialidade === null || especialidade.trim() === "") return;

    const salario = prompt("Novo salário:", salarioAtual);

    if (salario === null || salario.trim() === "") return;

    const salarioNumerico = Number(salario.trim().replace(",", "."));

    if (!Number.isFinite(salarioNumerico) || salarioNumerico < 0) {
        alert("Digite um salário válido.");
        return;
    }

    const dados = new URLSearchParams();

    dados.append("idFuncionario", idFuncionario);
    dados.append("idUsuario", idUsuario);
    dados.append("cargo", cargo.trim());
    dados.append("especialidade", especialidade.trim());
    dados.append("salario", String(salarioNumerico));

    try {
        await enviarFormulario(
            URL_CADASTRAR,
            dados,
            "Não foi possível atualizar o funcionário."
        );
    } catch (erro) {
        console.error(erro);
        alert("Erro ao atualizar funcionário. Verifique os dados e tente novamente.");
    }
}

async function excluirFuncionario(idFuncionario) {
    if (!idFuncionario) {
        alert("Não foi possível identificar o funcionário.");
        return;
    }

    const confirmar = confirm("Deseja realmente excluir este funcionário?");

    if (!confirmar) return;

    const dados = new URLSearchParams();

    dados.append("idFuncionario", idFuncionario);

    try {
        await enviarFormulario(
            URL_EXCLUIR,
            dados,
            "Não foi possível excluir o funcionário."
        );
    } catch (erro) {
        console.error(erro);
        alert("Erro ao excluir funcionário.");
    }
}

function abrirFiltro(coluna, botao) {
    colunaAtual = coluna;

    const caixa = document.getElementById("caixa-filtro");
    const titulo = document.getElementById("titulo-filtro");
    const pesquisa = document.getElementById("pesquisa-filtro");
    const opcoes = document.getElementById("opcoes-filtro");

    caixa.style.display = "block";

    const posicao = botao.getBoundingClientRect();

    caixa.style.top = posicao.bottom + 5 + "px";

    caixa.style.left = Math.max(
        5,
        Math.min(posicao.left, window.innerWidth - caixa.offsetWidth - 5)
    ) + "px";

    titulo.textContent = "Filtrar por " + coluna;

    pesquisa.value = "";
    opcoes.innerHTML = "";

    const funcionarios = obterFuncionariosDaTabela();
    const valores = [];

    funcionarios.forEach(funcionario => {
        const dados = {
            idFuncionario: funcionario.idFuncionario,
            nome: funcionario.nome,
            cargo: funcionario.cargo,
            especialidade: funcionario.especialidade,
            status: funcionario.status
        };

        const valor = String(dados[coluna] ?? "");

        if (valor && !valores.includes(valor)) {
            valores.push(valor);
        }
    });

    valores.sort();

    valores.forEach(valor => {
        const label = document.createElement("label");
        label.className = "opcao-filtro";

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.value = valor;

        checkbox.checked =
            filtros[coluna] === null || filtros[coluna].includes(valor);

        label.appendChild(checkbox);
        label.append(" " + valor);

        opcoes.appendChild(label);
    });
}

function mostrarOpcoes() {
    const pesquisa = document.getElementById("pesquisa-filtro").value.toLowerCase();
    const opcoes = document.querySelectorAll(".opcao-filtro");

    opcoes.forEach(opcao => {
        opcao.style.display = opcao.textContent.toLowerCase().includes(pesquisa)
            ? "block"
            : "none";
    });
}

function aplicarFiltro() {
    const checkboxes = document.querySelectorAll(
        "#opcoes-filtro input[type='checkbox']"
    );

    const selecionados = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selecionados.push(checkbox.value);
        }
    });

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

document.addEventListener("DOMContentLoaded", () => {
    listarFuncionarios();
});