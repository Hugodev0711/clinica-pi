let dados = sessionStorage.getItem("confirmacaoAgendamento");

if(dados === null) {
    window.location.href = "../agendamento/agendamento.html";
}
else {
    let confirmacao = JSON.parse(dados);

    document.getElementById("conf-exame").textContent = confirmacao.exame;
    document.getElementById("conf-unidade").textContent = confirmacao.unidade;
    document.getElementById("conf-data").textContent = confirmacao.data;
    document.getElementById("conf-horario").textContent = confirmacao.horario;
}