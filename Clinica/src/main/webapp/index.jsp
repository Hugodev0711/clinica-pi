<html>
<body>
<h2>Criar Usuario</h2>

    <form action="/create-user" method="post" onsubmit="return validarFormulario()">

        <label>Nome do usuário</label>
        <input type="hidden" id="id" name="id" value="${param.id}">
        <input type="text" name="nome" id="nome" value="${param.nome}">
        <input type="text" name="cpf" id="cpf" value="${param.cpf}">
        <input type="text" name="dataNascimento" id="dataNascimento" value="${param.dataNascimento}">
        <input type="text" name="email" id="email" value="${param.email}">
        <input type="text" name="senha" id="senha">
        <input type="text" name="tipoUsuario" id="tipoUsuario" value="${param.tipoUsuario}">
        <input type="text" name="telefone" id="telefone" value="${param.telefone}">

        <button type="submit">Register</button>

    </form>

    <script src = "js/validacao-cadastro.js"></script>

</body>
</html>