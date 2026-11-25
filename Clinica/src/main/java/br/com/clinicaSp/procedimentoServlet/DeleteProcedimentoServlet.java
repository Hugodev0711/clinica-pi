package br.com.clinicaSp.procedimentoServlet;

import br.com.clinicaSp.dao.ProcedimentoDao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/deletar-procedimento")
public class DeleteProcedimentoServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        new ProcedimentoDao().deletarProcedimento(req.getParameter("idProcedimento"));
        resp.sendRedirect(req.getContextPath() + "/listar-procedimentos");
    }
}
