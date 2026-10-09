function validateForm() {

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    if(email.trim() == "") {
        alert("Digite seu email!");
        return false;
    }

    if(!email.includes("@") || !email.includes(".")) {
        alert("Digite um email válido!");
        return false;
    }

    if(senha.trim() == "") {
        alert("Digite sua senha!");
        return false;
    }

    if(senha.length < 8) {
        alert("A senha deve ter pelo menos 8 caracteres!");
        return false;
    }

    return true;

}