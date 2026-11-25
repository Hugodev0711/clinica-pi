package br.com.clinicaSp.vagaServlet;

import br.com.clinicaSp.dao.VagaDao;
import br.com.clinicaSp.model.Procedimento;
import br.com.clinicaSp.model.Unidade;
import br.com.clinicaSp.model.Vaga;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;

@WebServlet("/create-vaga")
public class CreateVagaServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = req.getParameter("idVaga");
        try {
            LocalDate data = LocalDate.parse(req.getParameter("dataVaga"));
            LocalTime hora = LocalTime.parse(req.getParameter("horaVaga"));
            Procedimento p = new Procedimento(req.getParameter("idProcedimento"), null, null, 0.0, null, null);
            Unidade un = new Unidade(req.getParameter("idUnidade"), null, null, null, 0);
            Vaga vaga = new Vaga(id, data, hora, p, un);
            VagaDao dao = new VagaDao();
            if (id == null || id.isBlank()) dao.inserirVaga(vaga);
            else dao.atualizarVaga(vaga);
        } catch (DateTimeParseException | NullPointerException e) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Data ou hora inválida");
            return;
        }
        resp.sendRedirect(req.getContextPath() + "/listar-vagas");
    }
}
