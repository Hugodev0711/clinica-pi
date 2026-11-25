package br.com.clinicaSp.clienteServlet;

import br.com.clinicaSp.dao.ClienteDao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/deletar-cliente")
public class DeleteClienteServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        new ClienteDao().deletarCliente(req.getParameter("idCliente"));
        resp.sendRedirect(req.getContextPath() + "/listar-clientes");
    }
}
