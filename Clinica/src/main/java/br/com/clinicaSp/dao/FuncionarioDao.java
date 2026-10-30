package br.com.clinicaSp.dao;

import br.com.clinicaSp.config.ConnectionPoolConfig;
import br.com.clinicaSp.model.Funcionario;
import br.com.clinicaSp.model.TipoUsuario;
import br.com.clinicaSp.model.Usuario;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class FuncionarioDao {
    public void inserirFuncionario(Funcionario funcionario){
        String sql = "INSERT INTO funcionario (especialidade, cargo, salario, id_usuario) VALUES (?, ?, ?, ?)";

        try{
            Connection con = ConnectionPoolConfig.getConnection();

            PreparedStatement stmt = con.prepareStatement(sql);

            stmt.setString(1, funcionario.getEspecialidade());
            stmt.setString(2, funcionario.getCargo());
            stmt.setDouble(3, funcionario.getSalario());
            stmt.setString(4, funcionario.getUsuario().getId());

            stmt.execute();

            System.out.println("Sucesso ao cadastrar funcionario");

            con.close();

        } catch (Exception e) {
            System.out.println("Erro ao conectar no servidor");
        }
    }

    public List<Funcionario> listarFuncionario(){
        String sql = "SELECT * FROM funcionario INNER JOIN usuario ON funcionario.id_funcionario = usuario.id_usuario";

        try{
            Connection con = ConnectionPoolConfig.getConnection();
            PreparedStatement stmt = con.prepareStatement(sql);
            ResultSet rSet = stmt.executeQuery();

            List<Funcionario> funcionarios = new ArrayList<>();
            while(rSet.next()){
                String id_usuario = rSet.getString("id_usuario");
                String nome = rSet.getString("nome");
                String cpf = rSet.getString("cpf");
                LocalDate dataNascimento = rSet.getDate("data_nascimento").toLocalDate();
                String email = rSet.getString("email");
                String senha = rSet.getString("senha");
                TipoUsuario tipoUsuario = TipoUsuario.valueOf(rSet.getString("tipo_usuario"));
                String telefone = rSet.getString("telefone");

                Usuario usuario = new Usuario(id_usuario, nome, cpf, dataNascimento, email, senha, tipoUsuario, telefone);

                String idFuncionario = rSet.getString("id_funcionario");
                String especialidade = rSet.getString("especialidade");
                String cargo = rSet.getString("cargo");
                Double salario = rSet.getDouble("salario");

                Funcionario funcionario = new Funcionario(idFuncionario, usuario, especialidade, cargo, salario);
                funcionarios.add(funcionario);
            }

            System.out.println("Sucesso no select");

            con.close();

            return funcionarios;
        }catch(Exception e){
            System.out.println("Erro ao conectar no servidor");
            return null;
        }
    }

    public void deletarFuncionario(String idFuncionario){
        String sql = "DELETE FROM funcionario WHERE id_funcionario = ?";

        try{
            Connection con = ConnectionPoolConfig.getConnection();
            PreparedStatement stmt = con.prepareStatement(sql);
            stmt.setString(1, idFuncionario);

            stmt.execute();

            System.out.println("Sucesso ao deletar funcionario");
            con.close();
        }catch(Exception e){
            System.out.println("Erro ao conectar no servidor");
        }
    }

    public void atualizarFuncionario(Funcionario funcionario){
        String sql = "UPDATE funcionario SET cargo = ? WHERE id_funcionario = ?";

        try{
            Connection con = ConnectionPoolConfig.getConnection();
            PreparedStatement stmt = con.prepareStatement(sql);
            stmt.setString(1, funcionario.getCargo());
            stmt.setString(2, funcionario.getIdFuncionario());
            stmt.execute();

            System.out.println("Sucesso ao atualizar funcionario");

            con.close();
        }catch(Exception e){
            System.out.println("Erro ao conectar no servidor");
        }
    }
}
