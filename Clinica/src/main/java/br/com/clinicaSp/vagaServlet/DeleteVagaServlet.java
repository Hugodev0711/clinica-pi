package br.com.clinicaSp.vagaServlet;

import br.com.clinicaSp.dao.VagaDao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/deletar-vaga")
public class DeleteVagaServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        new VagaDao().deletarVaga(req.getParameter("idVaga"));
        resp.sendRedirect(req.getContextPath() + "/listar-vagas");
    }
}
