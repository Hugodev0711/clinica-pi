let campoBusca = document.querySelector("header input");


campoBusca.addEventListener("keydown", function(event) {

    if(event.key == "Enter") {
        event.preventDefault();

        let texto = campoBusca.value;

        if(texto == "") {
            return;
        }

        let encontrado = window.find(texto);

        if(!encontrado) {
            alert("Nenhum resultado encontrado")
        }
    }

});