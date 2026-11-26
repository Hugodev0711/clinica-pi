<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exames</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/frontend/exames/exames.css">
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
        <h2>Conheça nossas unidades</h2>
    </div>
    <main>
        <section class="banner">
            <div class="banner-content">
                <h3>Entero Tomografia</h3>
                <p>Em até 12x de R$ 107,50</p>
                <p>ou R$ 1225,50 no Pix</p>
                <a href="${pageContext.request.contextPath}/frontend/agendamento/agendamento.jsp">Agendar</a>
            </div>
            <div class="banner-content">
                <h3>Densitometria Ossea</h3>
                <p>Em até 5x de R$ 53,80</p>
                <p>ou R$ 255,55 no Pix</p>
                <a href="${pageContext.request.contextPath}/frontend/agendamento/agendamento.jsp">Agendar</a>
            </div>
            <div class="banner-content">
                <h3>Linfocintilografia</h3>
                <p>Em até 11x de R$ 52,73</p>
                <p>ou R$ 551,00 no Pix</p>
                <a href="${pageContext.request.contextPath}/frontend/agendamento/agendamento.jsp">Agendar</a>
            </div>
            <div class="banner-content">
                <h3>Fluxo Sanguíneo Osseo</h3>
                <p>Em até 12x de R$ 65,00</p>
                <p>ou R$ 741,00 no Pix</p>
                <a href="${pageContext.request.contextPath}/frontend/agendamento/agendamento.jsp">Agendar</a>
            </div>
            <div class="banner-content">
                <h3>Ecocardiograma</h3>
                <p>Em até 8x de R$ 50,00</p>
                <p>ou R$ 380,00 no Pix</p>
                <a href="${pageContext.request.contextPath}/frontend/agendamento/agendamento.jsp">Agendar</a>
            </div>
            <div class="banner-content">
                <h3>Raio-X</h3>
                <p>Em até 3x de R$ 6,50</p>
                <p>ou R$ 15,00 no Pix</p>
                <a href="${pageContext.request.contextPath}/frontend/agendamento/agendamento.jsp">Agendar</a>
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

    <script src="${pageContext.request.contextPath}/frontend/exames/exames.js"></script>
    <script src="${pageContext.request.contextPath}/frontend/header.js"></script>
</body>
</html>