package br.com.clinicaSp.unidadeServlet;

import br.com.clinicaSp.dao.UnidadeDao;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/deletar-unidade")
public class DeleteUnidadeServlet extends HttpServlet {
    protected void doPost (HttpServletRequest req, HttpServletResponse resp) throws IOException{
        String id = req.getParameter("idUnidade");

        new UnidadeDao().deletarUnidade(id);

        resp.sendRedirect("listar-unidade");
    }
}
