
package br.com.clinicaSp.dao;

import br.com.clinicaSp.config.ConnectionPoolConfig;
import br.com.clinicaSp.model.Vaga;
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
import java.util.ArrayList;
import java.util.List;

public class VagaDao {

    public void inserirVaga(Vaga vaga){
        String sql = "INSERT INTO vagas (data_vaga, hora, id_procedimento, id_unidade) VALUES (?, ?, ?, ?)";

        try{
            Connection con = ConnectionPoolConfig.getConnection();

            PreparedStatement stmt = con.prepareStatement(sql);

            stmt.setString(1, vaga.getDataVaga().toString());
            stmt.setTime(2, Time.valueOf(vaga.getHoraVaga()));
            stmt.setString(3, vaga.getProcedimento().getIdProcedimento());
            stmt.setString(4, vaga.getUnidade().getIdUnidade());

            stmt.execute();

            System.out.println("Sucesso ao cadastrar vaga");

            con.close();

        }catch(Exception e){
            System.out.println("Falha ao conectar");
        }
    }

    public List<Vaga> listarVagas(){
        String sql = "SELECT * FROM vagas " +
                "INNER JOIN procedimento ON vagas.id_procedimento = procedimento.id_procedimento " +
                "INNER JOIN unidade ON vagas.id_unidade = unidade.id_unidade " +
                "INNER JOIN funcionario ON procedimento.id_funcionario = funcionario.id_funcionario " +
                "INNER JOIN usuario ON funcionario.id_usuario = usuario.id_usuario";

        try{
            Connection con = ConnectionPoolConfig.getConnection();

            PreparedStatement stmt = con.prepareStatement(sql);
            ResultSet rSet = stmt.executeQuery();

            List<Vaga> vagas = new ArrayList<>();

            while(rSet.next()){

                String idVaga = rSet.getString("id_vaga");
                LocalDate dataVaga = rSet.getDate("data_vaga").toLocalDate();
                java.time.LocalTime horaVaga = rSet.getTime("hora").toLocalTime();

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

                Vaga vaga = new Vaga(idVaga, dataVaga, horaVaga, procedimento, unidade);

                vagas.add(vaga);
            }

            System.out.println("Sucesso no select");

            con.close();

            return vagas;

        }catch(Exception e){
            System.out.println("Falha ao conectar");
            return null;
        }
    }

    public void deletarVaga(String idVaga){
        String sql = "DELETE FROM vagas WHERE id_vaga = ?";

        try{
            Connection con = ConnectionPoolConfig.getConnection();

            PreparedStatement stmt = con.prepareStatement(sql);
            stmt.setString(1, idVaga);

            stmt.execute();

            System.out.println("Sucesso ao deletar vaga");

            con.close();

        }catch(Exception e){
            System.out.println("Falha ao conectar");
        }
    }

    public void atualizarVaga(Vaga vaga){
        String sql = "UPDATE vagas SET data_vaga = ? WHERE id_vaga = ?";

        try{
            Connection con = ConnectionPoolConfig.getConnection();

            PreparedStatement stmt = con.prepareStatement(sql);

            stmt.setString(1, vaga.getDataVaga().toString());

            stmt.execute();

            System.out.println("Sucesso ao atualizar vaga");

            con.close();

        }catch(Exception e){
            System.out.println("Falha ao conectar");
        }
    }
}
