package br.com.clinicaSp.unidadeServlet;

import br.com.clinicaSp.dao.UnidadeDao;
import br.com.clinicaSp.model.Unidade;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/create-unidade")
public class CreateUnidadeServlet extends HttpServlet {

    @Override
    protected void doPost (HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = req.getParameter("idUnidade");
        String cnpj = req.getParameter("cnpj");
        String nome = req.getParameter("nome");
        String cep = req.getParameter("cep");
        String numT = req.getParameter("numero");
        int numero = Integer.parseInt(numT);

        Unidade unidade = new Unidade(id, cnpj, nome, cep, numero);
        UnidadeDao unidadeDao = new UnidadeDao();

        if (id.isBlank()) {
            unidadeDao.inserirUnidade(unidade);
        } else {
            //atualizar
        }

        resp.sendRedirect("listar-unidade");
    }
}
