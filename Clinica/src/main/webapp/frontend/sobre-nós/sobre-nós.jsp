<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sobre Nós</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/frontend/sobre-nós/sobre-nós.css">
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

    <nav>
        <div class="barra">
            <a class="btn btn-cheio" href="${pageContext.request.contextPath}/frontend/consultas/consultas.jsp">Consultas</a>
            <a href="${pageContext.request.contextPath}/frontend/exames/exames.jsp">Exames</a>
            <a href="${pageContext.request.contextPath}/frontend/unidades/unidades.jsp">Unidades</a>
            <a href="${pageContext.request.contextPath}/frontend/sobre-nós/sobre-nós.jsp">Sobre Nós</a>
        </div>
    </nav>
    <div class="barra2">
        <h2>Quem somos</h2>
    </div>
    <main>
        <section class="banner">
            <div class="imagem"></div>
            <div class="banner-content">
            <div>
                <h3>Sobre Nós</h3>
                <h4>Cuidar é nossa missão!</h4>
                <p>Fundada em 1988, temos a missão de cuidar dos pacientes a 
                    partir de um tratamento completo e humanizado.</p>
                <p>Somos pioneiros no atendimento médico acessível e estamos 
                    em constante evolução para cuidar da saúde dos nossos pacientes, 
                    oferecendo mais de 44 especialidades médicas, mais de 2 mil 
                    tipos exames, cirurgias de pequeno, médio e grande porte, procedimentos 
                    e terapias.</p>
                <p>Atualmente contamos com um corpo clínico com mais de 200 médicos especialistas 
                    e mais de 400 colaboradores.</p>
            </div>
        </section>

        <section>
            <h1>Convênios Aceitos</h1>
            <p>As principais parcerias para lhe atender melhor.</p>
            <div class="linha">
                <div class="elementos">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/convBradesco.svg" alt="Bradesco">
                </div>
                <div class="elementos">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/convCareplus.svg" alt="Careplus">
                </div>
                <div class="elementos">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/convEconomus.svg" alt="Economus">
                </div>
                <div class="elementos">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/convItau.svg" alt="Itau">
                </div>
                <div class="elementos">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/convNotredame.svg" alt="Notredame">
                </div>
                <div class="elementos">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/convOmint.svg" alt="Omint">
                </div>
            </div>
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
                <a href="${pageContext.request.contextPath}/login">Login</a>
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

    <script src="${pageContext.request.contextPath}/frontend/sobre-nós/sobre-nós.js"></script>
    <script src="${pageContext.request.contextPath}/frontend/header.js"></script>
</body>
</html>