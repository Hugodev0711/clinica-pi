package br.com.clinicaSp.model;

import java.time.LocalDate;
import java.time.LocalTime;

public class Agendamento {
    private int idAgendamento;
    private Unidade unidade;
    private Procedimento procedimento;
    private Cliente cliente;
    private Funcionario funcionario;
    private LocalDate dataAgendamento;
    private LocalTime horaAgendamento;
    private StatusAgendamento statusAgendamento;

    public Agendamento(int idAgendamento, Unidade unidade, Procedimento procedimento, Cliente cliente, Funcionario funcionario, LocalDate dataAgendamento, LocalTime horaAgendamento, StatusAgendamento statusAgendamento) {
        this.idAgendamento = idAgendamento;
        this.unidade = unidade;
        this.procedimento = procedimento;
        this.cliente = cliente;
        this.funcionario = funcionario;
        this.dataAgendamento = dataAgendamento;
        this.horaAgendamento = horaAgendamento;
        this.statusAgendamento = statusAgendamento;
    }
    public int getIdAgendamento() {return idAgendamento;}

    public Unidade getUnidade() {return unidade;}
    public void setUnidade(Unidade unidade) {this.unidade = unidade;}

    public Procedimento getProcedimento() {return procedimento;}

    public Cliente getCliente() {return cliente;}

    public Funcionario getFuncionario() {return funcionario;}
    public void setFuncionario(Funcionario funcionario) {this.funcionario = funcionario;}

    public LocalDate getDataAgendamento() {return dataAgendamento;}
    public void setDataAgendamento(LocalDate dataAgendamento) {this.dataAgendamento = dataAgendamento;}

    public LocalTime getHoraAgendamento() {return horaAgendamento;}
    public void setHoraAgendamento(LocalTime horaAgendamento) {this.horaAgendamento = horaAgendamento;}

    public StatusAgendamento getStatusAgendamento() {return statusAgendamento;}
    public void setStatusAgendamento(StatusAgendamento statusAgendamento) {this.statusAgendamento = statusAgendamento;}
}
