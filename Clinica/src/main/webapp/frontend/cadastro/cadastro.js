
function validarCadastro(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value.trim();
    let cpf = document.getElementById("cpf").value.replace(/\D/g, "");
    let nascimento = document.getElementById("dataNascimento").value;
    let telefone = document.getElementById("telefone").value.replace(/\D/g, "");
    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value;
    let confirmarSenha = document.getElementById("confirmar-senha").value;
    let termos = event.currentTarget.elements.termos.checked;

    if (nome.length < 3) {
        alert("Digite seu nome completo.");
        return;
    }

    if (cpf.length !== 11) {
        alert("CPF invalido");
        return;
    }

    if (!nascimento) {
        alert("Informe sua data de nascimento");
        return;
    }

    let datNascimento = new Date(nascimento + "T00:00:00");
    let hoje = new Date();

    if (datNascimento > hoje || isNaN(datNascimento.getTime())) {
        alert("Data de nascimento invalida");
        return;
    }

    if (telefone.length !== 11) {
        alert("Telefone invalido");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Email invalido");
        return;
    }

    if (senha.length < 8) {
        alert("A senha deve ter pelo menos 8 caracteres");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem");
        return;
    }

    if (!termos) {
        alert("Você precisa aceitar os termos de uso");
        return;
    }

    document.getElementById("cpf").value = cpf;
    document.getElementById("telefone").value = telefone;

    event.currentTarget.submit();

}

document.querySelector(".formulario").addEventListener("submit", validarCadastro);
