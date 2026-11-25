package br.com.clinicaSp.agendamentoServlet;

import br.com.clinicaSp.dao.AgendamentoDao;
import br.com.clinicaSp.model.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;

@WebServlet("/create-agendamento")
public class CreateAgendamentoServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = req.getParameter("idAgendamento");

        try {
            LocalDate data = LocalDate.parse(req.getParameter("dataAgendamento"));
            LocalTime hora = LocalTime.parse(req.getParameter("horaAgendamento"));
            StatusAgendamento status = StatusAgendamento.valueOf(req.getParameter("status"));
            Unidade un = new Unidade(req.getParameter("idUnidade"), null, null, null, 0);
            Procedimento p = new Procedimento(req.getParameter("idProcedimento"), null, null, 0.0, null, null);
            Cliente c = new Cliente(req.getParameter("idCliente"), null);
            Funcionario f = new Funcionario(req.getParameter("idFuncionario"), null, null, null, 0.0);
            Agendamento a = new Agendamento(id, un, p, c, f, data, hora, status);
            AgendamentoDao dao = new AgendamentoDao();

            if (id.isBlank()) {
                dao.inserirAgendamento(a);
            }else{
                dao.atualizarAgendamento(a);
            }

        } catch (DateTimeParseException | IllegalArgumentException | NullPointerException e) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Dados inválidos (data, hora ou status)");
            return;
        }
        resp.sendRedirect(req.getContextPath() + "/listar-agendamentos");
    }
}
