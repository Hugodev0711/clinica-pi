<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agendamento Confirmado</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/frontend/agendConf/agendConf.css">
</head>
<body>
    <header>
        <img class="logo" src="${pageContext.request.contextPath}/frontend/imagens/logo.novo.png" alt="Logo">
        <input type="text" placeholder="Busque em todo site...">
        <div class="login" id="area-login">
            <a href="${pageContext.request.contextPath}/login"><img src="${pageContext.request.contextPath}/frontend/imagens/login.svg" alt="Login">
            <span>Login</span>
            </a>
        </div>
        <button class="headerbutton1" onclick="location.href='${pageContext.request.contextPath}/frontend/resulExames/resulExames.jsp'">Resultado de Exames</button>
        <button class="headerbutton2" onclick="location.href='${pageContext.request.contextPath}/frontend/agendamento/agendamento.jsp'">Agendamento de Exames</button>
    </header>
    
    <main class="conteudo">
        <section class="cartao">
        <h3 class="titulo">Agendamento Confirmado</h3>
            <div class="bloco">
                <div class="campo">
                    <p><strong>Exame:</strong> <span id="conf-exame"></span></p>
                </div>
                <div class="campo">
                    <p><strong>Unidade:</strong> <span id="conf-unidade"></span></p>
                </div>
                <div class="campo">
                    <p><strong>Data:</strong> <span id="conf-data"></span></p>
                </div>
                <div class="campo">
                    <p><strong>Horário:</strong> <span id="conf-horario"></span></p>
                </div>
            </div>
        <a class="botao-principal" href="${pageContext.request.contextPath}/frontend/inicial/inicial.jsp">Voltar para o Início</a>
        </section>
    </main>
    <footer>
        <div class="footer-bloco">
            <div class="footer-colunas">
                <img src="${pageContext.request.contextPath}/frontend/imagens/logo.novo.png" alt="Logo" class="footer-logo">
            </div>
            <div class="footer-colunas">
                <h3>Serviços</h3>
                <a href="${pageContext.request.contextPath}/frontend/agendamento/agendamento.jsp">Agendar consulta</a>
                <a href="${pageContext.request.contextPath}/frontend/agendamento/agendamento.jsp">Agendar exame</a>
            </div>
            <div class="footer-colunas">
                <h3>Pacientes</h3>
                <a href="../login/login.jsp">Login</a>
                <a href="${pageContext.request.contextPath}/frontend/resulExames/resulExames.jsp">Resultado de exames</a>
            </div>
            <div class="footer-colunas">
                <h3>Clínica</h3>
                <a href="${pageContext.request.contextPath}/frontend/unidades/unidades.jsp">Unidades</a>
                <a href="${pageContext.request.contextPath}/frontend/sobre-nós/sobre-nós.jsp">Sobre nós</a>
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

    <script src="${pageContext.request.contextPath}/frontend/agendConf/agendConf.js"></script>
    <script src="${pageContext.request.contextPath}/frontend/header.js"></script>
</body>
</html>