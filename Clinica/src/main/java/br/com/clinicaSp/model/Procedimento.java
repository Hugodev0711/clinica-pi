package br.com.clinicaSp.model;

import java.time.Duration;

public class Procedimento {
    private String idProcedimento;
    private Duration duracao;
    private String nomeProcedimento;
    private double preco;
    private Unidade unidade;
    private Funcionario funcionario;

    public Procedimento(String idProcedimento, Duration duracao, String nomeProcedimento, double preco, Unidade unidade, Funcionario funcionario) {
        this.idProcedimento = idProcedimento;
        this.duracao = duracao;
        this.nomeProcedimento = nomeProcedimento;
        this.preco = preco;
        this.unidade = unidade;
        this.funcionario = funcionario;
    }

    public Procedimento(Duration duracao, String nomeProcedimento, double preco, Unidade unidade, Funcionario funcionario) {
        this.duracao = duracao;
        this.nomeProcedimento = nomeProcedimento;
        this.preco = preco;
        this.unidade = unidade;
        this.funcionario = funcionario;
    }

    public String getIdProcedimento() {return idProcedimento;}

    public Duration getDuracao() {return duracao;}
    public void setDuracao(Duration duracao) {this.duracao = duracao;}

    public String getNomeProcedimento() {return nomeProcedimento;}
    public void setNomeProcedimento(String nomeProcedimento) {this.nomeProcedimento = nomeProcedimento;}

    public double getPreco() {return preco;}
    public void setPreco(double preco) {this.preco = preco;}

    public Unidade getUnidade() {return unidade;}
    public void setUnidade(Unidade unidade) {this.unidade = unidade;}

    public Funcionario getFuncionario() {return funcionario;}
    public void setFuncionario(Funcionario funcionario) {this.funcionario = funcionario;}
}
