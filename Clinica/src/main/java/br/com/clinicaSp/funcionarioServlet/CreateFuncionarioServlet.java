package br.com.clinicaSp.funcionarioServlet;

import br.com.clinicaSp.dao.FuncionarioDao;
import br.com.clinicaSp.model.Funcionario;
import br.com.clinicaSp.model.Usuario;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/create-funcionario")
public class CreateFuncionarioServlet extends HttpServlet {
    @Override

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        req.setCharacterEncoding("UTF-8");
        String id = req.getParameter("idFuncionario");
        try {

            Usuario usuario = new Usuario(req.getParameter("idUsuario"), null, null, null, null, null, null, null);
            Funcionario f = new Funcionario(id, usuario, req.getParameter("especialidade"),
                    req.getParameter("cargo"), Double.parseDouble(req.getParameter("salario").replace(",", ".")));
            FuncionarioDao dao = new FuncionarioDao();

            if (id.isBlank()) {
                dao.inserirFuncionario(f);
            }else{
                dao.atualizarFuncionario(f);
            }

        } catch (NumberFormatException | NullPointerException e) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Salário inválido");
            return;
        }
        resp.sendRedirect(req.getContextPath() + "/listar-funcionarios");
    }
}
