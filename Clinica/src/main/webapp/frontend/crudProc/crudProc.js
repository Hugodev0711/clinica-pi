
const URL_LISTAR = contextPath + "/listar-procedimentos";
const URL_CADASTRAR = contextPath + "/create-procedimento";
const URL_EXCLUIR = contextPath + "/deletar-procedimento";

let colunaAtual = "";

let filtros = {
    id: null,
    duracao: null,
    nome: null,
    preco: null,
    idUnidade: null,
    idFuncionario: null
};

// Converte a duração ISO-8601 do Java para minutos.
// Exemplos: PT30M = 30, PT1H30M = 90.
function converterDuracaoParaMinutos(duracao) {
    const formato = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;

    const resultado = duracao.match(formato);

    if (!resultado) {
        return null;
    }

    const horas = Number(resultado[1] || 0);
    const minutos = Number(resultado[2] || 0);
    const segundos = Number(resultado[3] || 0);

    if (segundos !== 0 || (horas === 0 && minutos === 0)) {
        return null;
    }

    return horas * 60 + minutos;
}

function formatarDuracao(duracao) {
    const minutos = converterDuracaoParaMinutos(duracao);

    if (minutos === null) {
        return duracao;
    }

    if (minutos >= 60) {
        const horas = Math.floor(minutos / 60);
        const restante = minutos % 60;

        return restante > 0
            ? `${horas}h ${restante}min`
            : `${horas}h`;
    }

    return `${minutos} min`;
}

function obterProcedimentosDaTabela() {
    const linhas = document.querySelectorAll("#tabela-procedimentos tr");

    return Array.from(linhas)
        .filter(linha => linha.cells.length >= 7)
        .map(linha => {
            const duracaoOriginal = linha.querySelector(".editar").dataset.duracao;
            const duracaoMinutos = converterDuracaoParaMinutos(duracaoOriginal);

            return {
                elemento: linha,
                id: linha.cells[0].textContent.trim(),
                duracao: duracaoMinutos === null
                    ? duracaoOriginal
                    : String(duracaoMinutos),
                duracaoOriginal: duracaoOriginal,
                nome: linha.cells[2].textContent.trim(),
                preco: linha.cells[3].textContent.trim(),
                idUnidade: linha.cells[4].textContent.trim(),
                idFuncionario: linha.cells[5].textContent.trim()
            };
        });
}

function listarProcedimentos() {
    const tabela = document.getElementById("tabela-procedimentos");
    const pesquisa = document.getElementById("pesquisa").value.trim().toLowerCase();

    const procedimentos = obterProcedimentosDaTabela();

    let encontrados = 0;

    procedimentos.forEach(procedimento => {
        const correspondePesquisa =
            procedimento.nome.toLowerCase().includes(pesquisa);

        const valores = {
            id: procedimento.id,
            duracao: procedimento.duracao,
            nome: procedimento.nome,
            preco: procedimento.preco,
            idUnidade: procedimento.idUnidade,
            idFuncionario: procedimento.idFuncionario
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

        procedimento.elemento.style.display = exibir ? "" : "none";

        if (exibir) {
            encontrados++;
        }
    });

    const mensagemExistente = tabela.querySelector(".resultado-filtro");

    if (mensagemExistente) {
        mensagemExistente.remove();
    }

    if (encontrados === 0 && procedimentos.length > 0) {
        const linha = document.createElement("tr");
        linha.className = "resultado-filtro";

        const celula = document.createElement("td");
        celula.colSpan = 7;
        celula.className = "sem-registros";
        celula.textContent = "Nenhum procedimento encontrado.";

        linha.appendChild(celula);
        tabela.appendChild(linha);
    }
}

async function enviarFormulario(url, dados, mensagemErro) {
    const resposta = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: dados
    });

    if (!resposta.ok) {
        throw new Error(mensagemErro);
    }

    window.location.href = URL_LISTAR;
}

function lerDuracao(mensagem, valorAtual = "") {
    const entrada = prompt(mensagem, valorAtual);

    if (entrada === null) {
        return null;
    }

    const minutos = Number(entrada.trim());

    if (
        !Number.isInteger(minutos) ||
        minutos <= 0
    ) {
        alert("Informe uma duração válida em minutos.");
        return null;
    }

    return minutos;
}

function lerPreco(mensagem, valorAtual = "") {
    const entrada = prompt(mensagem, valorAtual);

    if (entrada === null) {
        return null;
    }

    const valor = entrada.trim().replace(",", ".");
    const preco = Number(valor);

    if (!Number.isFinite(preco) || preco < 0) {
        alert("Preço inválido.");
        return null;
    }

    return preco;
}

async function adicionarProcedimento() {
    const nome = prompt("Nome do procedimento:");

    if (nome === null || nome.trim() === "") return;

    const duracao = lerDuracao(
        "Duração do procedimento em minutos:"
    );

    if (duracao === null) return;

    const preco = lerPreco("Preço do procedimento:");

    if (preco === null) return;

    const idUnidade = prompt("ID da unidade:");

    if (idUnidade === null || idUnidade.trim() === "") return;

    const idFuncionario = prompt("ID do funcionário:");

    if (idFuncionario === null || idFuncionario.trim() === "") return;

    const dados = new URLSearchParams();

    dados.append("idProcedimento", "");
    dados.append("duracaoMinutos", duracao);
    dados.append("nome", nome.trim());
    dados.append("preco", preco);
    dados.append("idUnidade", idUnidade.trim());
    dados.append("idFuncionario", idFuncionario.trim());

    try {
        await enviarFormulario(
            URL_CADASTRAR,
            dados,
            "Não foi possível cadastrar o procedimento."
        );
    } catch (erro) {
        console.error(erro);
        alert("Erro ao cadastrar procedimento. Verifique os dados e tente novamente.");
    }
}

function visualizarProcedimento(botao) {
    const linha = botao.closest("tr");

    if (!linha) return;

    const celulas = linha.cells;

    const duracao = botao.closest("tr").querySelector(".editar").dataset.duracao;

    alert(
        "ID: " + celulas[0].textContent.trim() +
        "\nDuração: " + formatarDuracao(duracao) +
        "\nNome: " + celulas[2].textContent.trim() +
        "\nPreço: R$ " + celulas[3].textContent.trim() +
        "\nID Unidade: " + celulas[4].textContent.trim() +
        "\nID Funcionário: " + celulas[5].textContent.trim()
    );
}

async function editarProcedimento(botao) {
    const id = botao.dataset.id;

    if (!id) {
        alert("Não foi possível identificar o procedimento.");
        return;
    }

    const duracaoAtual = converterDuracaoParaMinutos(botao.dataset.duracao);

    if (duracaoAtual === null) {
        alert("Não foi possível interpretar a duração atual.");
        return;
    }

    const duracao = lerDuracao(
        "Nova duração em minutos:",
        String(duracaoAtual)
    );

    if (duracao === null) return;

    const nome = prompt("Novo nome:", botao.dataset.nome);

    if (nome === null || nome.trim() === "") return;

    const preco = lerPreco("Novo preço:", botao.dataset.preco);

    if (preco === null) return;

    const idUnidade = prompt(
        "Novo ID da unidade:",
        botao.dataset.idUnidade
    );

    if (idUnidade === null || idUnidade.trim() === "") return;

    const idFuncionario = prompt(
        "Novo ID do funcionário:",
        botao.dataset.idFuncionario
    );

    if (idFuncionario === null || idFuncionario.trim() === "") return;

    const dados = new URLSearchParams();

    dados.append("idProcedimento", id);
    dados.append("duracaoMinutos", duracao);
    dados.append("nome", nome.trim());
    dados.append("preco", preco);
    dados.append("idUnidade", idUnidade.trim());
    dados.append("idFuncionario", idFuncionario.trim());

    try {
        await enviarFormulario(
            URL_CADASTRAR,
            dados,
            "Não foi possível atualizar o procedimento."
        );
    } catch (erro) {
        console.error(erro);
        alert("Erro ao atualizar procedimento.");
    }
}

async function excluirProcedimento(id) {
    if (!id) {
        alert("Não foi possível identificar o procedimento.");
        return;
    }

    const confirmar = confirm(
        "Deseja realmente excluir este procedimento?"
    );

    if (!confirmar) return;

    const dados = new URLSearchParams();

    dados.append("idProcedimento", id);

    try {
        await enviarFormulario(
            URL_EXCLUIR,
            dados,
            "Não foi possível excluir o procedimento."
        );
    } catch (erro) {
        console.error(erro);
        alert("Erro ao excluir procedimento.");
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

    const procedimentos = obterProcedimentosDaTabela();
    const valores = [];

    procedimentos.forEach(procedimento => {
        const valor = String(procedimento[coluna] ?? "");

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

document.addEventListener("DOMContentLoaded", () => {
    listarProcedimentos();
});
