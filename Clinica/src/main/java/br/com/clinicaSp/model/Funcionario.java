package br.com.clinicaSp.model;

public class Funcionario {
    private String idFuncionario;
    private Usuario usuario;
    private String especialidade;
    private String cargo;
    private double salario;

    public Funcionario(String idFuncionario, Usuario usuario, String especialidade, String cargo, double salario) {
        this.idFuncionario = idFuncionario;
        this.usuario = usuario;
        this.especialidade = especialidade;
        this.cargo = cargo;
        this.salario = salario;
    }

    public String getIdFuncionario() {return idFuncionario;}

    public Usuario getUsuario() {return usuario;}

    public String getEspecialidade() {return especialidade;}
    public void setEspecialidade(String especialidade) {this.especialidade = especialidade;}

    public String getCargo() {return cargo;}
    public void setCargo(String cargo) {this.cargo = cargo;}

    public double getSalario() {return salario;}
    public void setSalario(double salario) {this.salario = salario;}
}
