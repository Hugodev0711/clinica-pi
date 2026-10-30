package br.com.clinicaSp.usuarioServlet;

import br.com.clinicaSp.dao.UsuarioDao;
import br.com.clinicaSp.model.TipoUsuario;
import br.com.clinicaSp.model.Usuario;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;

@WebServlet("/create-user")
public class CreateUsuarioServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String id = request.getParameter("id");
        String nome = request.getParameter("nome");
        String cpf = request.getParameter("cpf");
        String dataNascimento = request.getParameter("dataNascimento");
        String email = request.getParameter("email");
        String senha = request.getParameter("senha");
        String tipoUsuario = request.getParameter("tipoUsuario");
        String telefone = request.getParameter("telefone");

        Usuario usuario = new Usuario(id,cpf, nome, LocalDate.parse(dataNascimento), email, senha, TipoUsuario.valueOf(tipoUsuario), telefone);
        UsuarioDao usuarioDao = new UsuarioDao();

        if(id.isBlank()){
            usuarioDao.criarUsuario(usuario);
        }else{
            usuarioDao.AtualizarUsuario(usuario);
        }

        response.sendRedirect("/listar-usuarios");
    }
}
