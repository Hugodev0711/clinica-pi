package br.com.clinicaSp.model;

import java.time.LocalDate;

public class Usuario {
    private String idUsuario;
    private String cpf;
    private String nome;
    private LocalDate dataNascimento;
    private String email;
    private String senha;
    private TipoUsuario tipoUsuario;
    private String telefone;

    public Usuario(String cpf, String nome, LocalDate dataNascimento, String email, String senha, TipoUsuario tipoUsuario, String telefone) {
        this.cpf = cpf;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.senha = senha;
        this.tipoUsuario = tipoUsuario;
        this.telefone = telefone;
    }

    public Usuario(String idUsuario, String cpf, String nome, LocalDate dataNascimento, String email, String senha, TipoUsuario tipoUsuario, String telefone) {
        this.idUsuario = idUsuario;
        this.cpf = cpf;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.senha = senha;
        this.tipoUsuario = tipoUsuario;
        this.telefone = telefone;
    }

    public Usuario(String nome, String email, String telefone, TipoUsuario tipoUsuario) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.tipoUsuario = tipoUsuario;
    }

    public String getId() {return idUsuario;}

    public String getCpf() {return cpf;}

    public String getNome() {return nome;}
    public void setNome(String nome) {this.nome = nome;}

    public LocalDate getDataNascimento() {return dataNascimento;}

    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}

    public String getSenha() {return senha;}
    public void setSenha(String senha) {this.senha = senha;}

    public TipoUsuario getTipoUsuario() {return tipoUsuario;}
    public void setTipoUsuario(TipoUsuario tipoUsuario) {this.tipoUsuario = tipoUsuario;}

    public String getTelefone() {return telefone;}
    public void setTelefone(String telefone) {this.telefone = telefone;}
}
