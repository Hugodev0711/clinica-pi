package br.com.clinicaSp.unidadeServlet;

import br.com.clinicaSp.dao.UnidadeDao;
import br.com.clinicaSp.model.Unidade;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/listar-unidades")
public class ListUnidadeServlet extends HttpServlet {

    @Override
    protected void doGet (HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        List<Unidade> unidades = new UnidadeDao().listarUnidades();

        req.setAttribute("unidades", unidades);

        req.getRequestDispatcher("").forward(req, resp);
    }
}
