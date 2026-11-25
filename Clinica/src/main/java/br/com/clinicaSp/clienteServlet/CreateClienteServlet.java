package br.com.clinicaSp.clienteServlet;

import br.com.clinicaSp.dao.ClienteDao;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/create-cliente")
public class CreateClienteServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String idUsuario = req.getParameter("idUsuario");
        if (idUsuario.isBlank()) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Selecione um usuário");
            return;
        }

        new ClienteDao().inserirCliente(idUsuario);

        resp.sendRedirect("/listar-clientes");
    }
}