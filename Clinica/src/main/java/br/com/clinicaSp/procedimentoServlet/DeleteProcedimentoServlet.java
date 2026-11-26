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
        String id = req.getParameter("idProcedimento");

        if (id.isBlank()) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "ID do procedimento não informado.");
            return;
        }

        new ProcedimentoDao().deletarProcedimento(id);

        resp.sendRedirect(req.getContextPath() + "/listar-procedimentos");
    }
}
