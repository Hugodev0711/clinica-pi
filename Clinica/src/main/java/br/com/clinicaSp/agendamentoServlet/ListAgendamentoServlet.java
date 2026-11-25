package br.com.clinicaSp.agendamentoServlet;

import br.com.clinicaSp.dao.*;
import br.com.clinicaSp.model.StatusAgendamento;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/listar-agendamentos")
public class ListAgendamentoServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("agendamentos", new AgendamentoDao().listarAgendamentos());
        req.setAttribute("unidades", new UnidadeDao().listarUnidades());
        req.setAttribute("procedimentos", new ProcedimentoDao().listarProcedimentos());
        req.setAttribute("clientes", new ClienteDao().listarClientes());
        req.setAttribute("funcionarios", new FuncionarioDao().listarFuncionario());
        req.setAttribute("statuses", StatusAgendamento.values());
        req.getRequestDispatcher("/agendamentos.jsp").forward(req, resp);
    }
}
