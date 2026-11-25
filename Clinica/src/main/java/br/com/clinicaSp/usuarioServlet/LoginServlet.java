package br.com.clinicaSp.usuarioServlet;

import br.com.clinicaSp.dao.UsuarioDao;
import br.com.clinicaSp.model.Usuario;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/frontend/login/login.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String email = req.getParameter("email");
        String senha = req.getParameter("senha");

        UsuarioDao usuarioDao = new UsuarioDao();
        Usuario usuario = usuarioDao.buscarUsuario(email);

        if (usuario != null && usuario.getSenha().equals(senha)) {
            HttpSession session = req.getSession();
            session.setAttribute("usuarioLogado", usuario);

            resp.sendRedirect(req.getContextPath() + "/frontend/inicial/inicial.jsp");
        }else{
            req.setAttribute("erro", "E-mail ou senha incorretos.");
            req.getRequestDispatcher("/frontend/login/login.jsp").forward(req, resp);
        }
    }
}
