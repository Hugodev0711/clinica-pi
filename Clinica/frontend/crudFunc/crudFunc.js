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

        if(funcionario.nome.toLowerCase().includes(pesquisa)) {
            let linha = tabela.insertRow();

            linha.insertCell().textContent = funcionario.id;
            linha.insertCell().textContent = funcionario.nome;
            linha.insertCell().textContent = funcionario.cargo;
            linha.insertCell().textContent = funcionario.especialidade;
            linha.insertCell().textContent = funcionario.status;

            let acoes = linha.insertCell();

            let editar = document.creatElement("button");
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

            let nome = prompt("Novo nome:". funcionarios[i].nome);
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

listarFuncionarios();