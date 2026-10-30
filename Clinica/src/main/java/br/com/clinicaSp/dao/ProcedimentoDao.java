
package br.com.clinicaSp.dao;

import br.com.clinicaSp.config.ConnectionPoolConfig;
import br.com.clinicaSp.model.Procedimento;
import br.com.clinicaSp.model.Unidade;
import br.com.clinicaSp.model.Funcionario;
import br.com.clinicaSp.model.Usuario;
import br.com.clinicaSp.model.TipoUsuario;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Time;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class ProcedimentoDao {

    public void inserirProcedimento(Procedimento procedimento){
        String sql = "INSERT INTO procedimento (duracao, nome, preco, id_unidade, id_funcionario) VALUES (?, ?, ?, ?, ?)";

        try{
            Connection con = ConnectionPoolConfig.getConnection();

            PreparedStatement stmt = con.prepareStatement(sql);

            stmt.setTime(1, Time.valueOf(LocalTime.ofSecondOfDay(procedimento.getDuracao().getSeconds())));
            stmt.setString(2, procedimento.getNomeProcedimento());
            stmt.setDouble(3, procedimento.getPreco());
            stmt.setString(4, procedimento.getUnidade().getIdUnidade());
            stmt.setString(5, procedimento.getFuncionario().getIdFuncionario());

            stmt.execute();

            System.out.println("Sucesso ao cadastrar procedimento");

            con.close();

        }catch(Exception e){
            System.out.println(e);
        }
    }

    public List<Procedimento> listarProcedimentos(){
        String sql = "SELECT * FROM procedimento " +
                "INNER JOIN unidade ON procedimento.id_unidade = unidade.id_unidade " +
                "INNER JOIN funcionario ON procedimento.id_funcionario = funcionario.id_funcionario " +
                "INNER JOIN usuario ON funcionario.id_usuario = usuario.id_usuario";

        try{
            Connection con = ConnectionPoolConfig.getConnection();

            PreparedStatement stmt = con.prepareStatement(sql);
            ResultSet rSet = stmt.executeQuery();

            List<Procedimento> procedimentos = new ArrayList<>();

            while(rSet.next()){

                String idProcedimento = rSet.getString("id_procedimento");
                Duration duracao = Duration.ofSeconds(rSet.getTime("duracao").toLocalTime().toSecondOfDay());
                String nomeProcedimento = rSet.getString("nome");
                double preco = rSet.getDouble("preco");

                String idUnidade = rSet.getString("id_unidade");
                String cnpj = rSet.getString("cnpj");
                String nomeUnidade = rSet.getString("nome");
                String cep = rSet.getString("cep");
                int numero = rSet.getInt("numero");

                Unidade unidade = new Unidade(idUnidade, cnpj, nomeUnidade, cep, numero);

                String idUsuario = rSet.getString("id_usuario");
                String nome = rSet.getString("nome");
                String cpf = rSet.getString("cpf");
                LocalDate dataNascimento = rSet.getDate("data_nascimento").toLocalDate();
                String email = rSet.getString("email");
                String senha = rSet.getString("senha");
                TipoUsuario tipoUsuario = TipoUsuario.valueOf(rSet.getString("tipo_usuario"));
                String telefone = rSet.getString("telefone");

                Usuario usuario = new Usuario(idUsuario, nome, cpf, dataNascimento, email, senha, tipoUsuario, telefone);

                String idFuncionario = rSet.getString("id_funcionario");
                String especialidade = rSet.getString("especialidade");
                String cargo = rSet.getString("cargo");
                double salario = rSet.getDouble("salario");

                Funcionario funcionario = new Funcionario(idFuncionario, usuario, especialidade, cargo, salario);

                Procedimento procedimento = new Procedimento(idProcedimento, duracao, nomeProcedimento, preco, unidade, funcionario);

                procedimentos.add(procedimento);
            }

            System.out.println("Sucesso no select");

            con.close();

            return procedimentos;

        }catch(Exception e){
            System.out.println("Falha ao conectar");
            return null;
        }
    }

    public void deletarProcedimento(String idProcedimento){
        String sql = "DELETE FROM procedimento WHERE id_procedimento = ?";

        try{
            Connection con = ConnectionPoolConfig.getConnection();

            PreparedStatement stmt = con.prepareStatement(sql);
            stmt.setString(1, idProcedimento);

            stmt.execute();

            System.out.println("Sucesso ao deletar procedimento");

            con.close();

        }catch(Exception e){
            System.out.println("Falha ao conectar");
        }
    }

    public void atualizarProcedimento(Procedimento procedimento){
        String sql = "UPDATE procedimento SET nome = ? WHERE id_procedimento = ?";

        try{
            Connection con = ConnectionPoolConfig.getConnection();

            PreparedStatement stmt = con.prepareStatement(sql);

            stmt.setString(1, procedimento.getNomeProcedimento());

            stmt.execute();

            System.out.println("Sucesso ao atualizar procedimento");

            con.close();

        }catch(Exception e){
            System.out.println("Falha ao conectar");
        }
    }
}
