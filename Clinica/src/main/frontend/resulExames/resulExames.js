let form = document.getElementById("form-exames");
let cpf = document.getElementById("cpf");
let nascimento = document.getElementById("nascimento");
let protocolo = document.getElementById("protocolo");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if(cpf.value.trim() === "") {
        alert("Digite seu CPF");
        return;
    }

    if(nascimento.value.trim() === "") {
        alert("Digite sua data de nascimento");
        return;
    }

    if(protocolo.value.trim() === "") {
        alert("Digite o numero do protocolo");
        return;
    }

    alert("Resultado localizado com sucesso");

});