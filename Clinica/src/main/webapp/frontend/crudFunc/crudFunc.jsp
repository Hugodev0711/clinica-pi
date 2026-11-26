<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel de Controle</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/frontend/crudFunc/crudFunc.css">
</head>
<body>
    <header>
        <img class="logo" src="${pageContext.request.contextPath}/frontend/imagens/logo.novo.png" alt="Logo">

        <input type="text" id="pesquisa" placeholder="Busque funcionários..." oninput="listarFuncionarios()">

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

                <a href="${pageContext.request.contextPath}/listar-procedimentos">
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
            <h1>Gestão de Funcionários</h1>

            <button class="btn-adicionar" onclick="adicionarFuncionario()">
                Adicionar Funcionário
            </button>

            <div class="tabela-funcionarios">
                <table>
                    <thead>
                        <tr>
                            <th>ID <button onclick="abrirFiltro('idFuncionario', this)">▼</button></th>
                            <th>Nome Completo <button onclick="abrirFiltro('nome', this)">▼</button></th>
                            <th>Cargo <button onclick="abrirFiltro('cargo', this)">▼</button></th>
                            <th>Especialidade <button onclick="abrirFiltro('especialidade', this)">▼</button></th>
                            <th>Status <button onclick="abrirFiltro('status', this)">▼</button></th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody id="tabela-funcionarios">

                        <c:forEach var="funcionario" items="${funcionarios}">
                            <tr>
                                <td><c:out value="${funcionario.idFuncionario}"/></td>
                                <td><c:out value="${funcionario.usuario.nome}"/></td>
                                <td><c:out value="${funcionario.cargo}"/></td>
                                <td><c:out value="${funcionario.especialidade}"/></td>
                                <td>—</td>
                                <td class="acoes">
                                    <button
                                        class="btn-acao editar"
                                        data-id="${funcionario.idFuncionario}"
                                        data-id-usuario="${funcionario.usuario.id}"
                                        data-cargo="${funcionario.cargo}"
                                        data-especialidade="${funcionario.especialidade}"
                                        data-salario="${funcionario.salario}"
                                        onclick="editarFuncionario(this)">
                                        Editar
                                    </button>

                                    <button
                                        class="btn-acao excluir"
                                        data-id="${funcionario.idFuncionario}"
                                        onclick="excluirFuncionario(this.dataset.id)">
                                        Excluir
                                    </button>
                                </td>
                            </tr>

                        </c:forEach>
                        <c:if test="${empty funcionarios}">
                            <tr>
                                <td colspan="6" class="sem-registros">
                                    Nenhum funcionário cadastrado.
                                </td>
                            </tr>
                        </c:if>
                    </tbody>
                </table>
            </div>

            <div id="caixa-filtro" class="caixa-filtro">
                <h4 id="titulo-filtro">Filtrar</h4>

                <input type="text" id="pesquisa-filtro" placeholder="Pesquisar..." oninput="mostrarOpcoes()">

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

    <script src="${pageContext.request.contextPath}/frontend/crudFunc/crudFunc.js"></script>
</body>
</html>
