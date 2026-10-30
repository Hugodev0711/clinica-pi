package br.com.clinicaSp.dao;

import br.com.clinicaSp.config.ConnectionPoolConfig;
import br.com.clinicaSp.model.Cliente;
import br.com.clinicaSp.model.TipoUsuario;
import br.com.clinicaSp.model.Usuario;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ClienteDao {

    public void inserirCliente(String idUsuario) {
        String sql = "INSERT INTO cliente(id_usuario) VALUES (?)";

        try{
            Connection con = ConnectionPoolConfig.getConnection();

            PreparedStatement stmt = con.prepareStatement(sql);

            stmt.setString(1, idUsuario);
            stmt.execute();

            System.out.println("Cliente inserido com sucesso");

            con.close();

        }catch(Exception e){
            System.out.println("Erro ao conectar com servidor");
        }
    }

    public List<Cliente> listarClientes(){
        String sql = "SELECT * FROM cliente INNER JOIN usuario ON cliente.id_cliente = usuario.id_usuario";

        try{
            Connection con = ConnectionPoolConfig.getConnection();

            PreparedStatement stmt = con.prepareStatement(sql);
            ResultSet rSet = stmt.executeQuery();

            List<Cliente> clientes = new ArrayList<>();
            while(rSet.next()){
                String idCliente = rSet.getString("id_cliente");
                String id_usuario = rSet.getString("id_usuario");
                String nome = rSet.getString("nome");
                String cpf = rSet.getString("cpf");
                LocalDate dataNascimento = rSet.getDate("data_nascimento").toLocalDate();
                String email = rSet.getString("email");
                String senha = rSet.getString("senha");
                TipoUsuario tipoUsuario = TipoUsuario.valueOf(rSet.getString("tipo_usuario"));
                String telefone = rSet.getString("telefone");

                Usuario usuario = new Usuario(id_usuario, nome, cpf, dataNascimento, email, senha, tipoUsuario, telefone);
                Cliente cliente = new Cliente(idCliente, usuario);

                clientes.add(cliente);
            }
            System.out.println("Sucesso no select");

            con.close();
            return clientes;

        }catch(Exception e){
            System.out.println("Erro ao conectar com servidor");
            return null;
        }
    }

    public void deletarCliente(String idCliente){
        String sql = "DELETE FROM cliente WHERE id_cliente = ?";

        try{
            Connection con = ConnectionPoolConfig.getConnection();

            PreparedStatement stmt = con.prepareStatement(sql);
            stmt.setString(1, idCliente);
            stmt.execute();

            System.out.println("Cliente deletado com sucesso");

            con.close();

        }catch(Exception e){
            System.out.println("Erro ao conectar com servidor");
        }
    }

    //Tomei a decisão de não adicionar o método de atualizar cliente, pois ele não recebe nenhum parâmetro diferente do usuário.
}
