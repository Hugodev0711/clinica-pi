function validarFormulario() {

    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let telefone = document.getElementById("telefone").value;

    if(nome.trim() == "") {
        alert("Preencha o nome!");
        return false;
    }

    if(cpf.length != 11) {
        alert("O CPF deve conter 11 números!");
        return false;
    }

    if(email.indexOf("@") == -1) {
        alert("Digite um email válido!");
        return false;
    }

    if(senha.length < 8) {
        alert("A senha deve ter pelo menos 8 caracters!");
        return false;
    }

    if(telefone.length < 10 || telefone.length > 11) {
        alert("Digite um telefone válido!");
        return false;
    }

    return true;

}