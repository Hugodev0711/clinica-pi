#CREATE DATABASE clinica;
#DROP DATABASE clinica;

USE clinica;

CREATE TABLE IF NOT EXISTS usuario(
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    nome varchar(50) NOT NULL,
    data_nascimento DATE NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL,
    tipo_usuario VARCHAR(15) NOT NULL,
    telefone VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS unidade(
	id_unidade INT PRIMARY KEY AUTO_INCREMENT,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    nome VARCHAR(50) NOT NULL,
    cep VARCHAR(11) NOT NULL,
    numero INT NOT NULL
);

CREATE TABLE IF NOT EXISTS funcionario(
	id_funcionario INT PRIMARY KEY AUTO_INCREMENT,
    especialidade VARCHAR(50),
    cargo VARCHAR(50) NOT NULL,
    salario DOUBLE NOT NULL,
    id_usuario INT,
    CONSTRAINT fk_usuarioFun FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
);

CREATE TABLE IF NOT EXISTS cliente(
	id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    CONSTRAINT fk_usuarioCli FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
);

CREATE TABLE IF NOT EXISTS procedimento(
	id_procedimento INT PRIMARY KEY AUTO_INCREMENT,
    duracao TIME NOT NULL,
    nome VARCHAR(50) NOT NULL,
    preco DOUBLE NOT NULL,
    id_unidade int,
    id_funcionario int,
    CONSTRAINT fk_unidadePro FOREIGN KEY (id_unidade) REFERENCES unidade (id_unidade),
    CONSTRAINT fk_funcionarioPro FOREIGN KEY (id_funcionario) REFERENCES funcionario (id_funcionario)
);

CREATE TABLE IF NOT EXISTS vagas(
    id_vaga INT PRIMARY KEY AUTO_INCREMENT,
	hora TIME NOT NULL,
    data_vaga DATE NOT NULL,
    id_procedimento INT,
    id_unidade INT,
    CONSTRAINT fk_procedimentoVag FOREIGN KEY (id_procedimento) REFERENCES procedimento (id_procedimento),
    CONSTRAINT fk_unidadeVag FOREIGN KEY (id_unidade) REFERENCES unidade (id_unidade)
);

CREATE TABLE IF NOT EXISTS agendamentos(
	id_agendamento INT PRIMARY KEY AUTO_INCREMENT,
    data_agendamento DATE NOT NULL,
    hora TIME NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT "ATIVO",
    id_unidade INT,
	id_procedimento INT,
    id_cliente INT,
    id_funcionario INT,
    CONSTRAINT fk_unidadeAge FOREIGN KEY (id_unidade) REFERENCES unidade (id_unidade),
    CONSTRAINT fk_procedimentoAge FOREIGN KEY (id_procedimento) REFERENCES procedimento (id_procedimento),
    CONSTRAINT fk_clienteAge FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente),
    CONSTRAINT fk_funcionarioAge FOREIGN KEY (id_funcionario) REFERENCES funcionario (id_funcionario)
);

INSERT INTO usuario (cpf, nome, idade, email, senha, telefone)
VALUES("54231218846", "Hugo", 19, "mhugocosta@gmail.com", "senha123" ,"11998206651"),
("12345678911", "Roberto", 21, "roberto@gmail.com", "senha1234", "11123456789");

INSERT INTO funcionario(id_usuario, salario, cargo)
VALUES(1, 15000.00, "Desenvolvedor"),
(2, 15000.0, "Desenvolvedor");

UPDATE usuario SET tipo_usuario = "FUNCIONARIO" WHERE id_usuario = 1 OR id_usuario = 2;


SELECT * FROM funcionario