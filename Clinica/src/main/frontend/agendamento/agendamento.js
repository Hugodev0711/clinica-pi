let form = document.getElementById("form-agendamento");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let exame = document.getElementById("exame").value;
    let unidade = document.getElementById("unidade").value;
    let horario = document.getElementById("horario").value;
    let cpf = document.getElementById("cpf");
let telefone = document.getElementById("telefone")
let data = document.getElementById("data")

    if(nome.trim() === "") {
        alert("Digite seu nome");
        return;
    }

    if(cpf.trim() === "") {
        alert("Digite seu CPF");
        return;
    }

    if(telefone.trim() === "") {
        alert("Digite seu telefone");
        return;
    }

    if(data.value.trim() === "") {
        alert("Digite uma data");
        return;
    }

    if(exame === "") {
        alert("Selecione um exame");
        return;
    }

    if(unidade === "") {
        alert("Selecione uma unidade");
        return;
    }

    if(horario === "") {
        alert("Selecione uma horario");
        return;
    }

    alert("Agendamento confirmado \n\n" + "Paciente: " + nome + "\n" + "Exame: " + exame + "\n" + 
        "Unidade: " + unidade + "\n" + "Data: " + data.value + "\n" + "Horario: " + horario
    );

    form.reset();
});