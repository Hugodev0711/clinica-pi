package br.com.clinicaSp.funcionarioServlet;

import br.com.clinicaSp.dao.FuncionarioDao;
import br.com.clinicaSp.dao.UsuarioDao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/listar-funcionarios")
public class ListFuncionarioServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("funcionarios", new FuncionarioDao().listarFuncionario());
        req.setAttribute("usuarios", new UsuarioDao().listarUsuarios());
        req.getRequestDispatcher("/funcionarios.jsp").forward(req, resp);
    }
}
