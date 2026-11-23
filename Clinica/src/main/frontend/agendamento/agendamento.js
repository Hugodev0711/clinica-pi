let form = document.querySelector("main-form");

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

    let confirmacao = {
        exame: form.elements.exame.selectedOptions[0].textContent.trim(),
        exame: form.elements.unidade.selectedOptions[0].textContent.trim(),
        data: data.split("-").reverse().join("/"),
        horario: horario
    };

    sessionStorage.setItem("confirmacaoAgendamento", JSON.stringify(confirmacao));
    window.location.href = "../agendConf/agendConf.html";
});