package br.com.clinicaSp.usuarioServlet;

import br.com.clinicaSp.dao.UsuarioDao;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/deletar-usuario")
public class DeleteUsuarioServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = req.getParameter("id");

        new UsuarioDao().deletarUsuario(id);

        resp.sendRedirect("/listar-usuarios");
    }
}
