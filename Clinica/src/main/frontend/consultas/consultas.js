let campoBusca = document.querySelector("header input");
let cards = document.querySelectorAll(".banner-content");

campoBusca.addEventListener("input", function() {

    let texto = campoBusca.value.trim().toLowerCase();

    cards.forEach(function(card) {
        let conteudo = card.textContent.toLowerCase();

        if(conteudo.includes(texto)) {
            card.style.display = "";
        }
        else {
            card.style.display = "none";
        }

    });

});