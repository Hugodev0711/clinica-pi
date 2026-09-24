package br.com.clinicaSp.model;

public class Unidade {
    private int idUnidade;
    private String cnpj;
    private String nome;
    private String cep;
    private int numero;

    public Unidade(int idUnidade, String cnpj, String nome, String cep, int numero) {
        this.idUnidade = idUnidade;
        this.cnpj = cnpj;
        this.nome = nome;
        this.cep = cep;
        this.numero = numero;
    }

    public int getIdUnidade() {return idUnidade;}

    public String getCnpj() {return cnpj;}

    public String getNome() {return nome;}
    public void setNome(String nome) {this.nome = nome;}

    public String getCep() {return cep;}
    public void setCep(String cep) {this.cep = cep;}

    public int getNumero() {return numero;}
    public void setNumero(int numero) {this.numero = numero;}
}
