function validarCadastro(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value.trim();
    let cpf = document.getElementById("cpf").value.trim();
    let nascimento = document.getElementById("nascimento").value;
    let telefone = document.getElementById("telefone").value.trim();
    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value;
    let confirmarSenha = document.getElementById("confirmar-senha").value;
    let termos = document.getElementById("input[name='termos']").ariaChecked;

    if(nome < 3) {
        alert("Digite seu nome completo.");
        return;
    }

    if(validarCpf(cpf)) {
        alert("CPF invalido");
        return;
    }

    if(nascimento == "") {
        alert("Informe sua data de nascimento");
        return;
    }

    let dataNascimento = new Date(nascimento);
    let hoje = new Date();
    if(dataNascimento > hoje || isNaN(dataNascimento.getTime())) {
        alert("Data de nascimento invalida");
        return;
    }

    if(telefone.length != 11) {
        alert("Telefone invalido");
        return;
    }

    if(!email.includes("@") || !email.includes(".")) {
        alert("Email invalido");
        return;
    }
    
    if(senha.length < 8) {
        alert("A senha deve ter pelo menos 8 caracteres");
        return;
    }

    if(senha != confirmarSenha) {
        alert("As senhas não coincidem");
        return;
    }

    if(!termos) {
        alert("Você precisa aceitar os termos de uso");
        return;
    }
    alert("Dados validados com sucesso!")

}

document.querySelector(".formulario").addEventListener("submit", validarCadastro);