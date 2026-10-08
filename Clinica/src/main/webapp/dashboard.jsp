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
        </tr>
        <c:forEach var="usuario" items="${"${usuarios}"}">
        <tr>
            <td></td>
            <td>${usuario.nome}</td>
            <td>${usuario.cpf}</td>
            <td>${usuario.dataNascimento}</td>
            <td>${usuario.email}</td>
            <td>${usuario.tipoUsuario}</td>
            <td>${usuario.telefone}</td>
        </tr>
        </c:forEach>
    </table>
  </div>
</body>
</html>