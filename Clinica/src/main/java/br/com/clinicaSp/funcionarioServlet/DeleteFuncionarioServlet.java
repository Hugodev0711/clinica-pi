package br.com.clinicaSp.funcionarioServlet;

import br.com.clinicaSp.dao.FuncionarioDao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/deletar-funcionario")
public class DeleteFuncionarioServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        new FuncionarioDao().deletarFuncionario(req.getParameter("idFuncionario"));
        resp.sendRedirect(req.getContextPath() + "/listar-funcionarios");
    }
}
