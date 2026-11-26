<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestão de Agendamentos</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/frontend/crudAgend/crudAgend.css">
</head>
<body>
    <header>
        <img class="logo" src="${pageContext.request.contextPath}/frontend/imagens/logo.novo.png" alt="Logo">

        <input type="text" id="pesquisa"
               placeholder="Busque pelo ID do paciente..."
               aria-label="Buscar pelo ID do paciente"
               oninput="listarAgendamentos()">

        <a class="login" href="${pageContext.request.contextPath}/login">
            <img src="${pageContext.request.contextPath}/frontend/imagens/login.svg" alt="">
            <span>Login</span>
        </a>
    </header>

    <div class="layout">
        <aside class="barra-lateral">
            <nav class="barra">
                <a href="${pageContext.request.contextPath}/listar-funcionarios">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/funcionarios.svg" alt="">
                    <span>Funcionários</span>
                </a>

                <a href="${pageContext.request.contextPath}/frontend/crudProc/crudProc.jsp">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/procedimentos.svg" alt="">
                    <span>Procedimentos</span>
                </a>

                <a href="${pageContext.request.contextPath}/listar-unidades">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/unidades.svg" alt="">
                    <span>Unidades</span>
                </a>

                <a href="${pageContext.request.contextPath}/listar-agendamentos"
                   class="selecionado" aria-current="page">
                    <img src="${pageContext.request.contextPath}/frontend/imagens/agendamentos.svg" alt="">
                    <span>Agendamentos</span>
                </a>
            </nav>
        </aside>

        <section class="conteudo">
            <h1>Gestão de Agendamentos</h1>

            <button type="button" class="btn-adicionar" onclick="adicionarAgendamento()">
                Adicionar Agendamento
            </button>

            <form id="form-agendamento" method="post"
                  action="${pageContext.request.contextPath}/create-agendamento" hidden>
                <h2 id="titulo-form-agendamento">Adicionar Agendamento</h2>

                <input type="hidden" name="idAgendamento" value="">

                <label>Paciente (ID)
                    <input type="text" name="idCliente" required>
                </label>

                <label>Profissional (ID)
                    <input type="text" name="idFuncionario" required>
                </label>

                <label>Unidade (ID)
                    <input type="text" name="idUnidade" required>
                </label>

                <label>Procedimento (ID)
                    <input type="text" name="idProcedimento" required>
                </label>

                <label>Data
                    <input type="date" name="dataAgendamento" required>
                </label>

                <label>Hora
                    <input type="time" name="horaAgendamento" step="1" required>
                </label>

                <label>Status
                    <select name="status" required>
                        <option value="">Selecione</option>
                        <c:forEach var="status" items="${statusDisponiveis}">
                            <option value="<c:out value='${status.name()}' />">
                                <c:out value="${status}" />
                            </option>
                        </c:forEach>
                    </select>
                </label>

                <button type="submit">Salvar</button>
                <button type="button" onclick="fecharFormularioAgendamento()">Cancelar</button>
            </form>

            <div class="tabela-agendamentos">
                <table>
                    <thead>
                        <tr>
                            <th>Paciente (ID) <button type="button" onclick="abrirFiltro('paciente', this)">▼</button></th>
                            <th>Data <button type="button" onclick="abrirFiltro('data', this)">▼</button></th>
                            <th>Hora <button type="button" onclick="abrirFiltro('hora', this)">▼</button></th>
                            <th>Profissional (ID) <button type="button" onclick="abrirFiltro('profissional', this)">▼</button></th>
                            <th>Status <button type="button" onclick="abrirFiltro('status', this)">▼</button></th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody id="tabela-agendamentos">
                        <c:forEach var="a" items="${agendamentos}">
                            <tr class="linha-agendamento">
                                <td><c:out value="${a.cliente.idCliente}" /></td>
                                <td><c:out value="${a.dataAgendamento}" /></td>
                                <td><c:out value="${a.horaAgendamento}" /></td>
                                <td><c:out value="${a.funcionario.idFuncionario}" /></td>
                                <td><c:out value="${a.status}" /></td>

                                <td class="acoes">
                                    <button type="button" class="btn-acao editar"
                                            data-id="<c:out value='${a.idAgendamento}' />"
                                            data-cliente="<c:out value='${a.cliente.idCliente}' />"
                                            data-funcionario="<c:out value='${a.funcionario.idFuncionario}' />"
                                            data-unidade="<c:out value='${a.unidade.idUnidade}' />"
                                            data-procedimento="<c:out value='${a.procedimento.idProcedimento}' />"
                                            data-data="<c:out value='${a.dataAgendamento}' />"
                                            data-hora="<c:out value='${a.horaAgendamento}' />"
                                            data-status="<c:out value='${a.status.name()}' />"
                                            onclick="editarAgendamento(this)">
                                        Editar
                                    </button>

                                    <form method="post"
                                          action="${pageContext.request.contextPath}/deletar-agendamento"
                                          onsubmit="return confirm('Deseja excluir este agendamento?');">
                                        <input type="hidden" name="idAgendamento"
                                               value="<c:out value='${a.idAgendamento}' />">
                                        <button type="submit" class="btn-acao excluir">Excluir</button>
                                    </form>
                                </td>
                            </tr>
                        </c:forEach>

                        <c:if test="${empty agendamentos}">
                            <tr>
                                <td colspan="6" class="sem-registros">Nenhum agendamento cadastrado.</td>
                            </tr>
                        </c:if>
                    </tbody>
                </table>
            </div>

            <div id="caixa-filtro" class="caixa-filtro">
                <h4 id="titulo-filtro">Filtrar</h4>

                <input type="text" id="pesquisa-filtro"
                       placeholder="Pesquisar..."
                       aria-label="Pesquisar opções do filtro"
                       oninput="mostrarOpcoes()">

                <div id="opcoes-filtro"></div>

                <button type="button" onclick="aplicarFiltro()">Aplicar</button>
                <button type="button" onclick="limparFiltro()">Limpar</button>
                <button type="button" onclick="fecharFiltro()">Fechar</button>
            </div>
        </section>
    </div>

    <script src="${pageContext.request.contextPath}/frontend/crudAgend/crudAgend.js"></script>
</body>
</html>