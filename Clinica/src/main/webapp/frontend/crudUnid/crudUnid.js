
const URL_LISTAR = contextPath + "/listar-unidades";
const URL_CADASTRAR = contextPath + "/create-unidade";
const URL_EXCLUIR = contextPath + "/delete-unidade";

let colunaAtual = "";

let filtros = {
    id: null,
    nome: null,
    cep: null,
    cnpj: null,
    numero: null
};

function obterUnidadesDaTabela() {
    const linhas = document.querySelectorAll("#tabela-unidades tr");

    return Array.from(linhas)
        .filter(linha => linha.cells.length >= 6)
        .map(linha => ({
            elemento: linha,
            id: linha.cells[0].textContent.trim(),
            nome: linha.cells[1].textContent.trim(),
            cep: linha.cells[2].textContent.trim(),
            cnpj: linha.cells[3].textContent.trim(),
            numero: linha.cells[4].textContent.trim()
        }));
}

function listarUnidades() {
    const tabela = document.getElementById("tabela-unidades");
    const pesquisa = document.getElementById("pesquisa").value.trim().toLowerCase();

    const unidades = obterUnidadesDaTabela();

    let encontrados = 0;

    unidades.forEach(unidade => {
        const correspondePesquisa = unidade.nome.toLowerCase().includes(pesquisa);

        const valores = {
            id: unidade.id,
            nome: unidade.nome,
            cep: unidade.cep,
            cnpj: unidade.cnpj,
            numero: unidade.numero
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

        unidade.elemento.style.display = exibir ? "" : "none";

        if (exibir) {
            encontrados++;
        }
    });

    const mensagemExistente = tabela.querySelector(".resultado-filtro");

    if (mensagemExistente) {
        mensagemExistente.remove();
    }

    if (encontrados === 0 && unidades.length > 0) {
        const linha = document.createElement("tr");
        linha.className = "resultado-filtro";

        const celula = document.createElement("td");
        celula.colSpan = 6;
        celula.className = "sem-registros";
        celula.textContent = "Nenhuma unidade encontrada.";

        linha.appendChild(celula);
        tabela.appendChild(linha);
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

async function adicionarUnidade() {
    const nome = prompt("Nome da unidade:");

    if (nome === null || nome.trim() === "") return;

    const cep = prompt("CEP:");

    if (cep === null || cep.trim() === "") return;

    const cnpj = prompt("CNPJ:");

    if (cnpj === null || cnpj.trim() === "") return;

    const numero = prompt("Número do endereço:");

    if (numero === null || numero.trim() === "") return;

    const dados = new URLSearchParams();

    dados.append("idUnidade", "");
    dados.append("nome", nome.trim());
    dados.append("cep", cep.trim());
    dados.append("cnpj", cnpj.trim());
    dados.append("numero", numero.trim());

    try {
        await enviarFormulario(
            URL_CADASTRAR,
            dados,
            "Não foi possível cadastrar a unidade."
        );
    } catch (erro) {
        console.error(erro);
        alert("Erro ao cadastrar unidade. Verifique os dados e tente novamente.");
    }
}

function visualizarUnidade(botao) {
    const linha = botao.closest("tr");

    if (!linha) return;

    const celulas = linha.cells;

    alert(
        "ID: " + celulas[0].textContent.trim() +
        "\nNome: " + celulas[1].textContent.trim() +
        "\nCEP: " + celulas[2].textContent.trim() +
        "\nCNPJ: " + celulas[3].textContent.trim() +
        "\nNúmero: " + celulas[4].textContent.trim()
    );
}

async function editarUnidade(botao) {
    const id = botao.dataset.id;

    if (!id) {
        alert("Não foi possível identificar a unidade.");
        return;
    }

    const nome = prompt("Novo nome:", botao.dataset.nome);

    if (nome === null || nome.trim() === "") return;

    const cep = prompt("Novo CEP:", botao.dataset.cep);

    if (cep === null || cep.trim() === "") return;

    const cnpj = prompt("Novo CNPJ:", botao.dataset.cnpj);

    if (cnpj === null || cnpj.trim() === "") return;

    const numero = prompt("Novo número:", botao.dataset.numero);

    if (numero === null || numero.trim() === "") return;

    const dados = new URLSearchParams();

    dados.append("idUnidade", id);
    dados.append("nome", nome.trim());
    dados.append("cep", cep.trim());
    dados.append("cnpj", cnpj.trim());
    dados.append("numero", numero.trim());

    try {
        await enviarFormulario(
            URL_CADASTRAR,
            dados,
            "Não foi possível atualizar a unidade."
        );
    } catch (erro) {
        console.error(erro);
        alert("Erro ao atualizar unidade. Verifique os dados e tente novamente.");
    }
}

async function excluirUnidade(id) {
    if (!id) {
        alert("Não foi possível identificar a unidade.");
        return;
    }

    const confirmar = confirm("Deseja realmente excluir esta unidade?");

    if (!confirmar) return;

    const dados = new URLSearchParams();

    dados.append("idUnidade", id);

    try {
        await enviarFormulario(
            URL_EXCLUIR,
            dados,
            "Não foi possível excluir a unidade."
        );
    } catch (erro) {
        console.error(erro);
        alert("Erro ao excluir unidade.");
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

    const unidades = obterUnidadesDaTabela();
    const valores = [];

    unidades.forEach(unidade => {
        const valor = String(unidade[coluna] ?? "");

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

    listarUnidades();
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

document.addEventListener("DOMContentLoaded", () => {
    listarUnidades();
});
