<!DOCTYPE html>
<html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
</head>
<body>
  <div>
    <h1>Cars</h1>
    <table>
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cpf</th>
            <th>Data de Nascimento</th>
            <th>Email</th>
            <th>Tipo Usuario</th>
            <th>Telefone</th>
            <th>Acoes</th>
        </tr>
        <c:forEach var="usuario" items="${usuarios}">
        <tr>
            <td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.cpf}</td>
            <td>${usuario.dataNascimento}</td>
            <td>${usuario.email}</td>
            <td>${usuario.tipoUsuario}</td>
            <td>${usuario.telefone}</td>
            <td>
                <form action="/deletar-usuario" method="post">
                    <input type="hidden" id="id" name="id" value="${usuario.id}">
                    <button type="submit">Delete</button>
                    <span> | </span>
                    <a href="index.jsp?id=${usuario.id}&nome=${usuario.nome}&cpf=${usuario.cpf}&dataNascimento=${usuario.dataNascimento}&email=${usuario.email}&tipoUsuario=${tipoUsuario}&telefone=${usuario.telefone}">Update</a>
                </form>
            </td>
        </tr>
        </c:forEach>
    </table>
  </div>
</body>
</html>