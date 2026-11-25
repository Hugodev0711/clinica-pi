package br.com.clinicaSp.agendamentoServlet;

import br.com.clinicaSp.dao.AgendamentoDao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/deletar-agendamento")
public class DeleteAgendamentoServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        new AgendamentoDao().deletarAgendamento(req.getParameter("idAgendamento"));
        resp.sendRedirect(req.getContextPath() + "/listar-agendamentos");
    }
}
