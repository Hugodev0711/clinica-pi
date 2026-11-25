package br.com.clinicaSp.procedimentoServlet;

import br.com.clinicaSp.dao.ProcedimentoDao;
import br.com.clinicaSp.model.Funcionario;
import br.com.clinicaSp.model.Procedimento;
import br.com.clinicaSp.model.Unidade;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.time.Duration;

@WebServlet("/create-procedimento")
public class CreateProcedimentoServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = req.getParameter("idProcedimento");

        try {
            Duration duracao = Duration.ofMinutes(Long.parseLong(req.getParameter("duracaoMinutos")));
            double preco = Double.parseDouble(req.getParameter("preco").replace(",", "."));
            Unidade unidade = new Unidade(req.getParameter("idUnidade"), null, null, null, 0);
            Funcionario func = new Funcionario(req.getParameter("idFuncionario"), null, null, null, 0.0);
            Procedimento p = new Procedimento(id, duracao, req.getParameter("nome"), preco, unidade, func);

            ProcedimentoDao dao = new ProcedimentoDao();

            if (id.isBlank()) {
                dao.inserirProcedimento(p);
            }else {
                dao.atualizarProcedimento(p);
            }

        } catch (NumberFormatException | NullPointerException e) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Duração ou preço inválido");
            return;
        }
        resp.sendRedirect("/listar-procedimentos");
    }
}
