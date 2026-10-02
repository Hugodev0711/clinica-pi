package br.com.clinicaSp.dao;

import br.com.clinicaSp.model.TipoUsuario;
import br.com.clinicaSp.model.Usuario;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class UsuarioDao {

    public void criarUsuario(Usuario usuario){
        String SQL = "INSERT INTO usuario(cpf, nome, dataNascimento, email, senha, tipo_usuario, telefone) VALUES (?, ?, ?, ?, ?, ?, ?)";

        try{
            Connection con = DriverManager.getConnection("jdbc:h2:~/test", "sa","sa");

            System.out.println("Sucesso ao conectar");

            PreparedStatement stmt = con.prepareStatement(SQL);

            stmt.setString(1, usuario.getCpf());
            stmt.setString(2, usuario.getNome());
            stmt.setString(3, usuario.getDataNascimento().toString());
            stmt.setString(4, usuario.getEmail());
            stmt.setString(5, usuario.getSenha());
            stmt.setString(6, usuario.getTipoUsuario().toString());
            stmt.setString(7, usuario.getTelefone());

            stmt.execute();

            System.out.println("Sucesso ao inserir usuário");

            con.close();

        }catch (Exception e){

            System.out.println(e);
        }
    }

    public List<Usuario> listarUsuarios(){

        String SQL = "SELECT * FROM usuario";

        try {
            Connection con = DriverManager.getConnection("jdbc:h2:~/test", "sa", "sa");

            System.out.println("Sucesso ao conectar");

            PreparedStatement stmt = con.prepareStatement(SQL);
            ResultSet rSet = stmt.executeQuery();

            List<Usuario> usuarios = new ArrayList<>();

            while(rSet.next()){
                String nome = rSet.getString("nome");
                String cpf = rSet.getString("cpf");
                LocalDate dataNascimento = (rSet.getDate("dataNascimento").toLocalDate());
                String email = rSet.getString("email");
                String senha = rSet.getString("senha");
                TipoUsuario tipoUsuario = TipoUsuario.valueOf(rSet.getString("tipo_usuario"));
                String telefone = rSet.getString("telefone");

                Usuario usuario = new Usuario(cpf, nome, dataNascimento, email, senha, tipoUsuario, telefone);

                usuarios.add (usuario);
            }

            System.out.println("Sucesso no select");

            con.close();
            return usuarios;

        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
}
