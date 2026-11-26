<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel de Controle</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/frontend/crudUnid/crudUnid.css">
</head>
<body>
    <header>
        <img class="logo" src="${pageContext.request.contextPath}/frontend/imagens/logo.novo.png" alt="Logo">
        <input type="text" id="pesquisa" placeholder="Busque unidades..." onkeyup="listarUnidades()">

        <a class="login" href="${pageContext.request.contextPath}/login">
            <img src="${pageContext.request.contextPath}/frontend/imagens/login.svg" alt="Login">
            <span>Login</span>
        </a>
    </header>

    <div class="layout">

        <aside class="barra-lateral">
            <nav class="barra">
                <a href="${pageContext.request.contextPath}/frontend/crudFunc/crudFunc.jsp">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/funcionários.svg" alt="Funcionários">
                    <span>Funcionários</span>
                </a>
                <a href="${pageContext.request.contextPath}/frontend/crudProc/crudProc.jsp">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/procedimentos.svg" alt="Procedimentos">
                    <span>Procedimentos</span>
                </a>
                <a href="${pageContext.request.contextPath}/frontend/crudUnid/crudUnid.jsp">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/unidades.svg" alt="Unidades">
                    <span>Unidades</span>
                </a>
                <a href="${pageContext.request.contextPath}/frontend/crudAgend/crudAgend.jsp" class="selecionado">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/agendamentos.svg" alt="Agendamentos">
                    <span>Agendamentos</span>
                </a>
            </nav>
        </aside>

        <section class="conteudo">

            <h1>Gestão de Unidades</h1>
            <button class="btn-adicionar" onclick="adicionarUnidade()">Adicionar Unidade</button>

            <div class="tabela-unidades">
            <table>
                <thead>
                    <tr>
                        <th>Id <button onclick="abrirFiltro('id', this)">▼</button></th>
                        <th>Nome <button onclick="abrirFiltro('nome', this)">▼</button></th>
                        <th>Endereço <button onclick="abrirFiltro('endereco', this)">▼</button></th>
                        <th>Telefone <button onclick="abrirFiltro('telefone', this)">▼</button></th>
                        <th>Horário <button onclick="abrirFiltro('horario', this)">▼</button></th>
                        <th>Status <button onclick="abrirFiltro('status', this)">▼</button></th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="tabela-unidades"></tbody>
            </table>
            </div>
            
            <div id="caixa-filtro" class ="caixa-filtro">

                    <h4 id="titulo-filtro">Filtrar</h4>
                    <input type="text" id="pesquisa-filtro" placeholder="Pesquisar..." onkeyup="mostrarOpcoes()">
                <div id="opcoes-filtro"></div>

                <button onclick="aplicarFiltro()">Aplicar</button>
                <button onclick="limparFiltro()">Limpar</button>
                <button onclick="fecharFiltro()">Fechar</button>

                </div>
            </section>
        </div>

    <script src = "${pageContext.request.contextPath}/frontend/crudUnid/crudUnid.js"></script>

</body>
</html>