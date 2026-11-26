<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/frontend/login/login.css">
</head>
<body>
    <header class="topo">
        <a href="${pageContext.request.contextPath}/frontend/inicial/inicial.jsp" class="topo_voltar"><img class="seta" src="${pageContext.request.contextPath}/frontend/imagens/seta.svg" alt="Seta">Voltar para o site</a>
        <img src="${pageContext.request.contextPath}/frontend/imagens/logo.novo.png" alt="Clínica SP" class="topo_logo">
        <div class="topo_cadeado">
            <img src="${pageContext.request.contextPath}/frontend/imagens/cadeado.svg" alt="Cadeado">
            <span>Ambiente 100% Seguro</span>
        </div>
    </header>
    <main>
        <section class="login-container">
            <h3>Entrar com e-mail e senha</h3>
            <form action="${pageContext.request.contextPath}/login" method="POST" onsubmit="return validateForm()">
                <label for="email">Email</label>
                <input type="email" placeholder="Digite seu e-mail" id="email" name="email" required>

                <label for="senha">Senha</label>
                <input type="password" placeholder="Digite sua senha" id="senha" name="senha" required>

                <% if (request.getAttribute("erro") != null) { %>
                    <p class="mensagem-erro">
                        <%= request.getAttribute("erro") %>
                    </p>
                <% } %>

                <button type="submit">Entrar</button>

            </form>
            <a href="${pageContext.request.contextPath}/frontend/cadastro/cadastro.jsp">Cadastrar-se</a>
        </section>
    </main>
    <footer>
        <div class="footer-bloco">
            <div class="footer-colunas">
                <img src="${pageContext.request.contextPath}/frontend/imagens/logo.novo.png" alt="Logo" class="footer-logo">
            </div>
            <div class="footer-colunas">
                <h3>Pacientes</h3>
                <a href="${pageContext.request.contextPath}/frontend/login/login.html">Login</a>
            </div>
            <div class="footer-colunas">
                <h3>Clínica</h3>
                <a href="${pageContext.request.contextPath}/frontend/unidades/unidades.html">Unidades</a>
                <a href="${pageContext.request.contextPath}/frontend/sobreNos/sobreNos.html">Sobre nós</a>
            </div>
            <div class="footer-colunas">
                <h3>Fale Conosco</h3>
                <p>WhatsApp: (11) 91234-5678</p>
                <p>Segunda a Sexta: 7h às 20h</p>
                <p>Sábado: 8h às 18h</p>
                <p>ou ligue para (11) 1234-5678</p>
            </div>
        </div>
        <div class="footer-bloco2">
            <div class="footer-pagamentos">
                <p>Formas de Pagamento</p>
                <img src="${pageContext.request.contextPath}/frontend/imagens/pagamentos.svg" alt="Formas de Pagamento">
            </div>
            <div class="footer-selo">
                <p>Site Seguro</p>
                <img src="${pageContext.request.contextPath}/frontend/imagens/selo_security.svg" alt="Site Seguro">
            </div>
        </div>
    </footer>

    <script src="${pageContext.request.contextPath}/frontend/login/login.js"></script>
    
</body>
</html>