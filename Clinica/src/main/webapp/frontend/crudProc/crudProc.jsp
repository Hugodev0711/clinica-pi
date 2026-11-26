
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel de Controle</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/frontend/crudProc/crudProc.css">
</head>
<body>
    <header>
        <img class="logo" src="${pageContext.request.contextPath}/frontend/imagens/logo.novo.png" alt="Logo">

        <input type="text" id="pesquisa" placeholder="Busque procedimentos..." oninput="listarProcedimentos()">

        <a class="login" href="${pageContext.request.contextPath}/login">
            <img src="${pageContext.request.contextPath}/frontend/imagens/login.svg" alt="Login">
            <span>Login</span>
        </a>
    </header>

    <div class="layout">
        <aside class="barra-lateral">
            <nav class="barra">
                <a href="${pageContext.request.contextPath}/listar-funcionarios">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/funcionarios.svg" alt="Funcionários">
                    <span>Funcionários</span>
                </a>

                <a href="${pageContext.request.contextPath}/listar-procedimentos" class="selecionado">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/procedimentos.svg" alt="Procedimentos">
                    <span>Procedimentos</span>
                </a>

                <a href="${pageContext.request.contextPath}/listar-unidades">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/unidades.svg" alt="Unidades">
                    <span>Unidades</span>
                </a>

                <a href="${pageContext.request.contextPath}/listar-agendamentos">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/agendamentos.svg" alt="Agendamentos">
                    <span>Agendamentos</span>
                </a>
            </nav>
        </aside>

        <section class="conteudo">
            <h1>Gestão de Procedimentos</h1>

            <button class="btn-adicionar" onclick="adicionarProcedimento()">
                Adicionar Procedimento
            </button>

            <div class="tabela-procedimentos">
                <table>
                    <thead>
                        <tr>
                            <th>ID <button onclick="abrirFiltro('id', this)">▼</button></th>
                            <th>Duração <button onclick="abrirFiltro('duracao', this)">▼</button></th>
                            <th>Nome <button onclick="abrirFiltro('nome', this)">▼</button></th>
                            <th>Preço <button onclick="abrirFiltro('preco', this)">▼</button></th>
                            <th>ID Unidade <button onclick="abrirFiltro('idUnidade', this)">▼</button></th>
                            <th>ID Funcionário <button onclick="abrirFiltro('idFuncionario', this)">▼</button></th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody id="tabela-procedimentos">
                        <c:forEach var="procedimento" items="${procedimentos}">
                            <tr>
                                <td><c:out value="${procedimento.idProcedimento}"/></td>
                                <td><c:out value="${procedimento.duracao}"/></td>
                                <td><c:out value="${procedimento.nomeProcedimento}"/></td>
                                <td><c:out value="${procedimento.preco}"/></td>
                                <td><c:out value="${procedimento.unidade.idUnidade}"/></td>
                                <td><c:out value="${procedimento.funcionario.idFuncionario}"/></td>

                                <td class="acoes">
                                    <button
                                        class="btn-acao visualizar"
                                        onclick="visualizarProcedimento(this)">
                                        Ver
                                    </button>

                                    <button
                                        class="btn-acao editar"
                                        data-id="${procedimento.idProcedimento}"
                                        data-duracao="${procedimento.duracao}"
                                        data-nome="${procedimento.nomeProcedimento}"
                                        data-preco="${procedimento.preco}"
                                        data-id-unidade="${procedimento.unidade.idUnidade}"
                                        data-id-funcionario="${procedimento.funcionario.idFuncionario}"
                                        onclick="editarProcedimento(this)">
                                        Editar
                                    </button>

                                    <button
                                        class="btn-acao excluir"
                                        data-id="${procedimento.idProcedimento}"
                                        onclick="excluirProcedimento(this.dataset.id)">
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        </c:forEach>

                        <c:if test="${empty procedimentos}">
                            <tr>
                                <td colspan="7" class="sem-registros">
                                    Nenhum procedimento cadastrado.
                                </td>
                            </tr>
                        </c:if>
                    </tbody>
                </table>
            </div>

            <div id="caixa-filtro" class="caixa-filtro">
                <h4 id="titulo-filtro">Filtrar</h4>

                <input
                    type="text"
                    id="pesquisa-filtro"
                    placeholder="Pesquisar..."
                    oninput="mostrarOpcoes()">

                <div id="opcoes-filtro"></div>

                <button onclick="aplicarFiltro()">Aplicar</button>
                <button onclick="limparFiltro()">Limpar</button>
                <button onclick="fecharFiltro()">Fechar</button>
            </div>
        </section>
    </div>

    <script>
        const contextPath = "${pageContext.request.contextPath}";
    </script>

    <script src="${pageContext.request.contextPath}/frontend/crudProc/crudProc.js"></script>
</body>
</html>
