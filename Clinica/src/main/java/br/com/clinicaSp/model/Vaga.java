package br.com.clinicaSp.model;

import java.time.LocalDate;
import java.time.LocalTime;

public class Vaga {
    private int idVaga;
    private LocalDate dataVaga;
    private LocalTime horaVaga;
    private Procedimento procedimento;
    private Unidade unidade;

    public Vaga(int idVaga, LocalDate dataVaga, LocalTime horaVaga, Procedimento procedimento, Unidade unidade) {
        this.idVaga = idVaga;
        this.dataVaga = dataVaga;
        this.horaVaga = horaVaga;
        this.procedimento = procedimento;
        this.unidade = unidade;
    }

    public int getIdVaga() {return idVaga;}

    public LocalDate getDataVaga() {return dataVaga;}
    public void setDataVaga(LocalDate dataVaga) {this.dataVaga = dataVaga;}

    public LocalTime getHoraVaga() {return horaVaga;}
    public void setHoraVaga(LocalTime horaVaga) {this.horaVaga = horaVaga;}

    public Procedimento getProcedimento() {return procedimento;}
    public void setProcedimento(Procedimento procedimento) {this.procedimento = procedimento;}

    public Unidade getUnidade() {return unidade;}
    public void setUnidade(Unidade unidade) {this.unidade = unidade;}
}
