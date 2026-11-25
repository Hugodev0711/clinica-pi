package br.com.clinicaSp.procedimentoServlet;

import br.com.clinicaSp.dao.FuncionarioDao;
import br.com.clinicaSp.dao.ProcedimentoDao;
import br.com.clinicaSp.dao.UnidadeDao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/listar-procedimentos")
public class ListProcedimentoServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("procedimentos", new ProcedimentoDao().listarProcedimentos());
        req.setAttribute("unidades", new UnidadeDao().listarUnidades());
        req.setAttribute("funcionarios", new FuncionarioDao().listarFuncionario());
        req.getRequestDispatcher("/procedimentos.jsp").forward(req, resp);
    }
}
