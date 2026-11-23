let form = document.getElementById("form-agendamento");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = form.elements.nome.value.trim();
    let cpf = form.elements.cpf.value.trim();
    let telefone = form.elements.telefone.value.trim();
    let exame = form.elements.exame.value;
    let unidade = form.elements.unidade.value;
    let data = form.elements.data.value;
    let horario = form.elements.horario.value;

    if(!nome || !cpf || !telefone || !exame || !unidade || !data || !horario) {
        alert("Preencha todos os campos do agendamento");
        return;
    }

    alert("Agendamento confirmado \n\n" + "Paciente: " + nome + "\n" + "Exame: " + exame + "\n" + 
        "Unidade: " + unidade + "\n" + "Data: " + data.value + "\n" + "Horario: " + horario
    );

    form.reset();
});