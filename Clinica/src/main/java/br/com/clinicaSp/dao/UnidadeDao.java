
package br.com.clinicaSp.dao;

import br.com.clinicaSp.config.ConnectionPoolConfig;
import br.com.clinicaSp.model.Unidade;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class UnidadeDao {

    public void inserirUnidade(Unidade unidade){
        String sql = "INSERT INTO unidade (cnpj, nome, cep, numero) VALUES (?, ?, ?, ?)";

        try{
            Connection con = ConnectionPoolConfig.getConnection();

            PreparedStatement stmt = con.prepareStatement(sql);

            stmt.setString(1, unidade.getCnpj());
            stmt.setString(2, unidade.getNome());
            stmt.setString(3, unidade.getCep());
            stmt.setInt(4, unidade.getNumero());

            stmt.execute();

            System.out.println("Sucesso ao cadastrar unidade");

            con.close();

        }catch(Exception e){
            System.out.println("Falha ao conectar");
        }
    }

    public List<Unidade> listarUnidades(){
        String sql = "SELECT * FROM unidade";

        try{
            Connection con = ConnectionPoolConfig.getConnection();

            PreparedStatement stmt = con.prepareStatement(sql);
            ResultSet rSet = stmt.executeQuery();

            List<Unidade> unidades = new ArrayList<>();

            while(rSet.next()){
                String idUnidade = rSet.getString("id_unidade");
                String cnpj = rSet.getString("cnpj");
                String nome = rSet.getString("nome");
                String cep = rSet.getString("cep");
                int numero = rSet.getInt("numero");

                Unidade unidade = new Unidade(idUnidade, cnpj, nome, cep, numero);

                unidades.add(unidade);
            }

            System.out.println("Sucesso no select");

            con.close();

            return unidades;

        }catch(Exception e){
            System.out.println("Falha ao conectar");
            return null;
        }
    }

    public void deletarUnidade(String idUnidade){
        String sql = "DELETE FROM unidade WHERE id_unidade = ?";

        try{
            Connection con = ConnectionPoolConfig.getConnection();

            PreparedStatement stmt = con.prepareStatement(sql);
            stmt.setString(1, idUnidade);

            stmt.execute();

            System.out.println("Sucesso ao deletar unidade");

            con.close();

        }catch(Exception e){
            System.out.println("Falha ao conectar");
        }
    }

    public void atualizarUnidade(Unidade unidade){
        String sql = "UPDATE unidade SET nome = ? WHERE id_unidade = ?";

        try{
            Connection con = ConnectionPoolConfig.getConnection();

            PreparedStatement stmt = con.prepareStatement(sql);

            stmt.setString(1, unidade.getNome());

            stmt.execute();

            System.out.println("Sucesso ao atualizar unidade");

            con.close();

        }catch(Exception e){
            System.out.println("Falha ao conectar");
        }
    }
}
