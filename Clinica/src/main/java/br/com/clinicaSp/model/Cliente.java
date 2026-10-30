package br.com.clinicaSp.model;

public class Cliente {
    private String idCliente;
    private Usuario usuario;

    public Cliente(Usuario usuario) {}

    public Cliente(String idCliente, Usuario usuario) {
        this.idCliente = idCliente;
        this.usuario = usuario;
    }

    public String getIdCliente() {return idCliente;}
    public Usuario getUsuario() {return usuario;}
}
