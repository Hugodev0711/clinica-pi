
package br.com.clinicaSp.dao;

import br.com.clinicaSp.config.ConnectionPoolConfig;
import br.com.clinicaSp.model.Agendamento;
import br.com.clinicaSp.model.Unidade;
import br.com.clinicaSp.model.Procedimento;
import br.com.clinicaSp.model.Cliente;
import br.com.clinicaSp.model.Funcionario;
import br.com.clinicaSp.model.Usuario;
import br.com.clinicaSp.model.TipoUsuario;
import br.com.clinicaSp.model.StatusAgendamento;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Time;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class AgendamentoDao {

    public void inserirAgendamento(Agendamento agendamento) {

        String sql = "INSERT INTO agendamentos (data_agendamento, hora, status, id_unidade, id_procedimento, id_cliente, id_funcionario) VALUES (?, ?, ?, ?, ?, ?, ?)";

        try {
            Connection con = ConnectionPoolConfig.getConnection();
            PreparedStatement stmt = con.prepareStatement(sql);

            stmt.setString(1, agendamento.getDataAgendamento().toString());
            stmt.setTime(2, Time.valueOf(agendamento.getHoraAgendamento()));
            stmt.setString(3, agendamento.getStatusAgendamento().toString());
            stmt.setString(4, agendamento.getUnidade().getIdUnidade());
            stmt.setString(5, agendamento.getProcedimento().getIdProcedimento());
            stmt.setString(6, agendamento.getCliente().getIdCliente());
            stmt.setString(7, agendamento.getFuncionario().getIdFuncionario());

            stmt.execute();

            System.out.println("Agendamento cadastrado com sucesso!");

            con.close();

        } catch (Exception e) {
            System.out.println("Erro ao cadastrar agendamento: " + e);
        }
    }

    public List<Agendamento> listarAgendamentos() {

        String sql = "SELECT * FROM agendamentos " +
                "INNER JOIN unidade ON agendamentos.id_unidade = unidade.id_unidade " +
                "INNER JOIN procedimento ON agendamentos.id_procedimento = procedimento.id_procedimento " +
                "INNER JOIN cliente ON agendamentos.id_cliente = cliente.id_cliente " +
                "INNER JOIN funcionario ON agendamentos.id_funcionario = funcionario.id_funcionario " +
                "INNER JOIN usuario ON funcionario.id_usuario = usuario.id_usuario";

        String sqlCliente = "SELECT * FROM cliente " +
                "INNER JOIN usuario ON cliente.id_usuario = usuario.id_usuario " +
                "WHERE cliente.id_cliente = ?";

        try {
            Connection con = ConnectionPoolConfig.getConnection();
            PreparedStatement stmt = con.prepareStatement(sql);
            ResultSet rSet = stmt.executeQuery();

            List<Agendamento> agendamentos = new ArrayList<>();

            while (rSet.next()) {

                String idAgendamento = rSet.getString("id_agendamento");
                LocalDate dataAgendamento = rSet.getDate("data_agendamento").toLocalDate();
                LocalTime horaAgendamento = rSet.getTime("hora").toLocalTime();
                StatusAgendamento statusAgendamento = StatusAgendamento.valueOf(rSet.getString("status"));

                String idUnidade = rSet.getString("id_unidade");
                String cnpj = rSet.getString("cnpj");
                String nomeUnidade = rSet.getString("nome");
                String cep = rSet.getString("cep");
                int numero = rSet.getInt("numero");

                Unidade unidade = new Unidade(idUnidade, cnpj, nomeUnidade, cep, numero);

                String idProcedimento = rSet.getString("id_procedimento");
                Duration duracao = Duration.ofSeconds(rSet.getTime("duracao").toLocalTime().toSecondOfDay());
                String nomeProcedimento = rSet.getString("nome");
                double preco = rSet.getDouble("preco");

                String idUsuario = rSet.getString("id_usuario");
                String cpf = rSet.getString("cpf");
                String nome = rSet.getString("nome");
                LocalDate dataNascimento = rSet.getDate("data_nascimento").toLocalDate();
                String email = rSet.getString("email");
                String senha = rSet.getString("senha");
                TipoUsuario tipoUsuario = TipoUsuario.valueOf(rSet.getString("tipo_usuario"));
                String telefone = rSet.getString("telefone");

                Usuario usuarioFuncionario = new Usuario(idUsuario, cpf, nome, dataNascimento, email, senha, tipoUsuario, telefone);

                String idFuncionario = rSet.getString("id_funcionario");
                String especialidade = rSet.getString("especialidade");
                String cargo = rSet.getString("cargo");
                double salario = rSet.getDouble("salario");

                Funcionario funcionario = new Funcionario(idFuncionario, usuarioFuncionario, especialidade, cargo, salario);

                String idCliente = rSet.getString("id_cliente");

                PreparedStatement stmtCliente = con.prepareStatement(sqlCliente);
                stmtCliente.setString(1, idCliente);

                ResultSet rSetCliente = stmtCliente.executeQuery();

                Cliente cliente = null;

                if (rSetCliente.next()) {

                    String idUsuarioCliente = rSetCliente.getString("id_usuario");
                    String cpfCliente = rSetCliente.getString("cpf");
                    String nomeCliente = rSetCliente.getString("nome");
                    LocalDate nascimentoCliente = rSetCliente.getDate("data_nascimento").toLocalDate();
                    String emailCliente = rSetCliente.getString("email");
                    String senhaCliente = rSetCliente.getString("senha");
                    TipoUsuario tipoUsuarioCliente = TipoUsuario.valueOf(rSetCliente.getString("tipo_usuario"));
                    String telefoneCliente = rSetCliente.getString("telefone");

                    Usuario usuarioCliente = new Usuario(idUsuarioCliente, cpfCliente, nomeCliente, nascimentoCliente, emailCliente, senhaCliente, tipoUsuarioCliente, telefoneCliente);

                    cliente = new Cliente(idCliente, usuarioCliente);
                }

                rSetCliente.close();
                stmtCliente.close();

                Procedimento procedimento = new Procedimento(idProcedimento, duracao, nomeProcedimento, preco, unidade, funcionario);

                Agendamento agendamento = new Agendamento(idAgendamento, unidade, procedimento, cliente, funcionario, dataAgendamento, horaAgendamento, statusAgendamento);

                agendamentos.add(agendamento);
            }

            System.out.println("Agendamentos listados com sucesso!");

            con.close();

            return agendamentos;

        } catch (Exception e) {
            System.out.println("Falha ao conectar");
            return null;
        }
    }

    public void deletarAgendamento(String idAgendamento) {

        String sql = "DELETE FROM agendamentos WHERE id_agendamento = ?";

        try {
            Connection con = ConnectionPoolConfig.getConnection();
            PreparedStatement stmt = con.prepareStatement(sql);

            stmt.setString(1, idAgendamento);

            stmt.execute();

            System.out.println("Agendamento deletado com sucesso!");

            con.close();

        } catch (Exception e) {
            System.out.println("Falha ao conectar");
        }
    }

    public void atualizarAgendamento(Agendamento agendamento) {

        String sql = "UPDATE agendamentos SET data_agendamento = ? WHERE id_agendamento = ?";

        try {
            Connection con = ConnectionPoolConfig.getConnection();
            PreparedStatement stmt = con.prepareStatement(sql);

            stmt.setString(1, agendamento.getDataAgendamento().toString());

            stmt.execute();

            System.out.println("Agendamento atualizado com sucesso!");

            con.close();

        } catch (Exception e) {
            System.out.println("Falha ao conectar");
        }
    }
}
