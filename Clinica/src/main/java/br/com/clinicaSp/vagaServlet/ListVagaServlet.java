package br.com.clinicaSp.vagaServlet;

import br.com.clinicaSp.dao.ProcedimentoDao;
import br.com.clinicaSp.dao.UnidadeDao;
import br.com.clinicaSp.dao.VagaDao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/listar-vagas")
public class ListVagaServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("vagas", new VagaDao().listarVagas());
        req.setAttribute("procedimentos", new ProcedimentoDao().listarProcedimentos());
        req.setAttribute("unidades", new UnidadeDao().listarUnidades());
        req.getRequestDispatcher("/vagas.jsp").forward(req, resp);
    }
}
