package br.com.clinicaSp.clienteServlet;

import br.com.clinicaSp.dao.ClienteDao;
import br.com.clinicaSp.dao.UsuarioDao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/listar-clientes")
public class ListClienteServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("clientes", new ClienteDao().listarClientes());
        req.setAttribute("usuarios", new UsuarioDao().listarUsuarios());
        req.getRequestDispatcher("/clientes.jsp").forward(req, resp);
    }
}
