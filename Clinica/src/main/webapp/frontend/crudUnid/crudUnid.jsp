
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
                <a href="${pageContext.request.contextPath}/listar-funcionarios">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/funcionarios.svg" alt="Funcionários">
                    <span>Funcionários</span>
                </a>

                <a href="${pageContext.request.contextPath}/frontend/crudProc/crudProc.jsp">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/procedimentos.svg" alt="Procedimentos">
                    <span>Procedimentos</span>
                </a>

                <a href="${pageContext.request.contextPath}/listar-unidades" class="selecionado">
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
            <h1>Gestão de Unidades</h1>

            <button class="btn-adicionar" onclick="adicionarUnidade()">
                Adicionar Unidade
            </button>

            <div class="tabela-unidades">
                <table>
                    <thead>
                        <tr>
                            <th>ID <button onclick="abrirFiltro('id', this)">▼</button></th>
                            <th>Nome <button onclick="abrirFiltro('nome', this)">▼</button></th>
                            <th>CEP <button onclick="abrirFiltro('cep', this)">▼</button></th>
                            <th>CNPJ <button onclick="abrirFiltro('cnpj', this)">▼</button></th>
                            <th>Número <button onclick="abrirFiltro('numero', this)">▼</button></th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody id="tabela-unidades">
                        <c:forEach var="unidade" items="${unidades}">
                            <tr>
                                <td><c:out value="${unidade.idUnidade}"/></td>
                                <td><c:out value="${unidade.nome}"/></td>
                                <td><c:out value="${unidade.cep}"/></td>
                                <td><c:out value="${unidade.cnpj}"/></td>
                                <td><c:out value="${unidade.numero}"/></td>

                                <td class="acoes">
                                    <button
                                        class="btn-acao visualizar"
                                        onclick="visualizarUnidade(this)">
                                        Ver
                                    </button>

                                    <button
                                        class="btn-acao editar"
                                        data-id="${unidade.idUnidade}"
                                        data-nome="${unidade.nome}"
                                        data-cep="${unidade.cep}"
                                        data-cnpj="${unidade.cnpj}"
                                        data-numero="${unidade.numero}"
                                        onclick="editarUnidade(this)">
                                        Editar
                                    </button>

                                    <button
                                        class="btn-acao excluir"
                                        data-id="${unidade.idUnidade}"
                                        onclick="excluirUnidade(this.dataset.id)">
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        </c:forEach>

                        <c:if test="${empty unidades}">
                            <tr>
                                <td colspan="6" class="sem-registros">
                                    Nenhuma unidade cadastrada.
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
                    onkeyup="mostrarOpcoes()">

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

    <script src="${pageContext.request.contextPath}/frontend/crudUnid/crudUnid.js"></script>
</body>
</html>
