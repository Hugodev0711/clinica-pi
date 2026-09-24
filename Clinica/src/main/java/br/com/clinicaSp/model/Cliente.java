package br.com.clinicaSp.model;

public class Cliente {
    private int idCliente;
    private Usuario usuario;

    public Cliente(int idCliente, Usuario usuario) {
        this.idCliente = idCliente;
        this.usuario = usuario;
    }

    public int getIdCliente() {return idCliente;}
    public void getUsuario(Usuario usuario) {this.usuario = usuario;}
}
