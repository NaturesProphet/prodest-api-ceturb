-- REMOVER TODOS OS VÍNCULOS COM OS HISTÓRICOS
ALTER TABLE GoogleTransit.dbo.estimativa SET (SYSTEM_VERSIONING = OFF);
ALTER TABLE GoogleTransit.dbo.viagem SET (SYSTEM_VERSIONING = OFF);
ALTER TABLE GoogleTransit.dbo.horario SET (SYSTEM_VERSIONING = OFF);
ALTER TABLE GoogleTransit.dbo.itinerario_ponto SET (SYSTEM_VERSIONING = OFF);
ALTER TABLE GoogleTransit.dbo.ponto SET (SYSTEM_VERSIONING = OFF);
ALTER TABLE GoogleTransit.dbo.itinerario SET (SYSTEM_VERSIONING = OFF);
ALTER TABLE GoogleTransit.dbo.linha SET (SYSTEM_VERSIONING = OFF);
ALTER TABLE GoogleTransit.dbo.agencia SET (SYSTEM_VERSIONING = OFF);

-- REMOVER TABELAS DE HISTÓRICO
DROP TABLE IF EXISTS GoogleTransit.dbo.estimativa_historico;
DROP TABLE IF EXISTS GoogleTransit.dbo.viagem_historico;
DROP TABLE IF EXISTS GoogleTransit.dbo.horario_historico;
DROP TABLE IF EXISTS GoogleTransit.dbo.itinerario_ponto_historico;
DROP TABLE IF EXISTS GoogleTransit.dbo.ponto_historico;
DROP TABLE IF EXISTS GoogleTransit.dbo.itinerario_historico;
DROP TABLE IF EXISTS GoogleTransit.dbo.linha_historico;
DROP TABLE IF EXISTS GoogleTransit.dbo.agencia_historico;

-- REMOVER TABELAS DO MODELO
DROP TABLE IF EXISTS GoogleTransit.dbo.veiculo_ponto_viagem_historico_bruto;
DROP TABLE IF EXISTS GoogleTransit.dbo.historico_real;
DROP TABLE IF EXISTS GoogleTransit.dbo.estimativa;
DROP TABLE IF EXISTS GoogleTransit.dbo.viagem;
DROP TABLE IF EXISTS GoogleTransit.dbo.pontogeografico;
DROP TABLE IF EXISTS GoogleTransit.dbo.horario;
DROP TABLE IF EXISTS GoogleTransit.dbo.itinerario_ponto;
DROP TABLE IF EXISTS GoogleTransit.dbo.ponto;
DROP TABLE IF EXISTS GoogleTransit.dbo.itinerario;
DROP TABLE IF EXISTS GoogleTransit.dbo.linha_tarifa_vigencia;
DROP TABLE IF EXISTS GoogleTransit.dbo.vigencia;
DROP TABLE IF EXISTS GoogleTransit.dbo.tarifa;
DROP TABLE IF EXISTS GoogleTransit.dbo.linha;
DROP TABLE IF EXISTS GoogleTransit.dbo.feriado;
DROP TABLE IF EXISTS GoogleTransit.dbo.contato;
DROP TABLE IF EXISTS GoogleTransit.dbo.agencia;

-- CREATE AGENCIA
CREATE TABLE GoogleTransit.dbo.agencia (
	id int NOT NULL IDENTITY(1,1),
	inicio_vigencia datetime2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
	fim_vigencia datetime2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
	nome nvarchar(255) NOT NULL,
	url nvarchar(255) NOT NULL,
	telefone nvarchar(255) NOT NULL,
    PERIOD FOR SYSTEM_TIME (inicio_vigencia, fim_vigencia),
	CONSTRAINT PK_014a655a9dc72831c3712b7eb9b PRIMARY KEY (id)
) with ( SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.agencia_historico)) 
CREATE UNIQUE INDEX IDX_ae6f96e90d951e9e8c68e3930b ON GoogleTransit.dbo.agencia (url) 
CREATE UNIQUE INDEX IDX_c44350547be6b7a422fdfddc7b ON GoogleTransit.dbo.agencia (nome);

-- CREATE CONTATO
CREATE TABLE GoogleTransit.dbo.contato (
	id int NOT NULL IDENTITY(1,1),
	inicio_vigencia datetime2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
	fim_vigencia datetime2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
	nome nvarchar(255) NOT NULL,
	email nvarchar(255) NOT NULL,
	ativo bit NOT NULL,
	agencia_id int NOT NULL,
	PERIOD FOR SYSTEM_TIME (inicio_vigencia, fim_vigencia),
	CONSTRAINT PK_9592a5553a9dfaeebe7d0cd0e5b PRIMARY KEY (id),
	CONSTRAINT FK_97b3a1f6fbd85563941e496cd7e FOREIGN KEY (agencia_id) REFERENCES GoogleTransit.dbo.agencia(id)
)
CREATE UNIQUE INDEX IDX_44d7ccac6a07ce215335a3ade8 ON GoogleTransit.dbo.contato (nome)
CREATE UNIQUE INDEX IDX_f0323061835775208d577ffabc ON GoogleTransit.dbo.contato (email);

-- CREATE FERIADO
CREATE TABLE GoogleTransit.dbo.feriado (
	id int NOT NULL IDENTITY(1,1),
	inicio_vigencia datetime2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
	fim_vigencia datetime2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
	nome nvarchar(255) NOT NULL,
	[data] date NOT NULL,
	dataupload date NOT NULL,
	agencia_id int NOT NULL,
	PERIOD FOR SYSTEM_TIME (inicio_vigencia, fim_vigencia),
	CONSTRAINT PK_2072c517b28f6f679963493663e PRIMARY KEY (id),
	CONSTRAINT FK_feb513ac77758daba4301714e19 FOREIGN KEY (agencia_id) REFERENCES GoogleTransit.dbo.agencia(id)
);

-- CREATE LINHA
CREATE TABLE GoogleTransit.dbo.linha (
	id int NOT NULL IDENTITY(1,1),
	inicio_vigencia datetime2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
	fim_vigencia datetime2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
	id_geocontrol int NOT NULL,
	codigo nvarchar(255) NOT NULL,
	descricao nvarchar(255) NOT NULL,
	status bit NOT NULL,
	diautil bit DEFAULT ((0)) NOT NULL,
	sabado bit DEFAULT ((0)) NOT NULL,
	domingo bit DEFAULT ((0)) NOT NULL,
	agencia_id int NOT NULL,
    PERIOD FOR SYSTEM_TIME (inicio_vigencia, fim_vigencia),
	CONSTRAINT PK_0ffd987432071dbe15c6d4bf52b PRIMARY KEY (id),
	CONSTRAINT FK_ac2b1af8c82fd3914e391b056a1 FOREIGN KEY (agencia_id) REFERENCES GoogleTransit.dbo.agencia(id)
) with ( SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.linha_historico));

-- CREATE TARIFA
CREATE TABLE GoogleTransit.dbo.tarifa (
	id int NOT NULL IDENTITY(1,1),
	inicio_vigencia datetime2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
	fim_vigencia datetime2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
	preco float NOT NULL,
	dataupload date NOT NULL,
	agencia_id int NOT NULL,
	PERIOD FOR SYSTEM_TIME (inicio_vigencia, fim_vigencia),
	CONSTRAINT PK_d213dfbdddef2bfd7b47b6c1e24 PRIMARY KEY (id),
	CONSTRAINT FK_b5cbf67b1a9bf52beac00b79f2c FOREIGN KEY (agencia_id) REFERENCES GoogleTransit.dbo.agencia(id)
);

-- CREATE VIGENCIA
CREATE TABLE GoogleTransit.dbo.vigencia (
	id int NOT NULL IDENTITY(1,1),
	inicio_vigencia datetime2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
	fim_vigencia datetime2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
	domingo bit NOT NULL,
	segunda bit NOT NULL,
	terca bit NOT NULL,
	quarta bit NOT NULL,
	quinta bit NOT NULL,
	sexta bit NOT NULL,
	sabado bit NOT NULL,
	PERIOD FOR SYSTEM_TIME (inicio_vigencia, fim_vigencia),
	CONSTRAINT PK_1c8a4f959d6653320e43384ac55 PRIMARY KEY (id)
);

-- CREATE LINHA_TARIFA_VIGENCIA
CREATE TABLE GoogleTransit.dbo.linha_tarifa_vigencia (
	id int NOT NULL IDENTITY(1,1),
	inicio_vigencia datetime2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
	fim_vigencia datetime2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
	linha_id int NOT NULL,
	vigencia_id int NOT NULL,
	tarifa_id int NOT NULL,
	PERIOD FOR SYSTEM_TIME (inicio_vigencia, fim_vigencia),
	CONSTRAINT PK_656fe7742c3dcf4c4ce7c7ecf2f PRIMARY KEY (id),
	CONSTRAINT FK_3624a631eca97046e9c6641587a FOREIGN KEY (tarifa_id) REFERENCES GoogleTransit.dbo.tarifa(id),
	CONSTRAINT FK_8808e5cd05ad10200318bebac14 FOREIGN KEY (linha_id) REFERENCES GoogleTransit.dbo.linha(id),
	CONSTRAINT FK_e634a0138a0b393f096a9766ff9 FOREIGN KEY (vigencia_id) REFERENCES GoogleTransit.dbo.vigencia(id)
);

-- CREATE ITINERARIO
CREATE TABLE GoogleTransit.dbo.itinerario (
	id int NOT NULL IDENTITY(1,1),
	inicio_vigencia datetime2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
	fim_vigencia datetime2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
	id_geocontrol int NOT NULL,
	codigo nvarchar(255) NOT NULL,
	bandeira nvarchar(255) NOT NULL,
	linha_id int NOT NULL,
    PERIOD FOR SYSTEM_TIME (inicio_vigencia, fim_vigencia),
	CONSTRAINT PK_2baffe7dba24ce00639ec81f961 PRIMARY KEY (id),
	CONSTRAINT FK_d0685388290522e49d70b3637d0 FOREIGN KEY (linha_id) REFERENCES GoogleTransit.dbo.linha(id)
) with ( SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.itinerario_historico));

-- CREATE PONTO
CREATE TABLE GoogleTransit.dbo.ponto (
	id int NOT NULL IDENTITY(1,1),
	inicio_vigencia datetime2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
	fim_vigencia datetime2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
	id_geocontrol int,
	terminal bit NOT NULL,
	codigo nvarchar(255) NOT NULL,
	municipio nvarchar(255) NOT NULL,
	logradouro nvarchar(255),
	latitude nvarchar(255) NOT NULL,
	longitude nvarchar(255) NOT NULL,
	referencia nvarchar(255),
	azimute int NOT NULL,
    PERIOD FOR SYSTEM_TIME (inicio_vigencia, fim_vigencia),
	CONSTRAINT PK_5b69f3e93c4fbf077ad2050682f PRIMARY KEY (id)
) with ( SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.ponto_historico));

-- CREATE ITINERARIO_PONTO
CREATE TABLE GoogleTransit.dbo.itinerario_ponto (
	id int NOT NULL IDENTITY(1,1),
	inicio_vigencia datetime2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
	fim_vigencia datetime2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
	embarque bit NOT NULL,
	desembarque bit NOT NULL,
	ordem int NOT NULL,
	ponto_id int NOT NULL,
	itinerario_id int NOT NULL,
    PERIOD FOR SYSTEM_TIME (inicio_vigencia, fim_vigencia),
	CONSTRAINT PK_b67a74149ef5d05809af31c96d3 PRIMARY KEY (id),
	CONSTRAINT FK_962da8010635564fb00ac2e298a FOREIGN KEY (ponto_id) REFERENCES GoogleTransit.dbo.ponto(id),
	CONSTRAINT FK_db70adc54fcd4b9efb33f318f57 FOREIGN KEY (itinerario_id) REFERENCES GoogleTransit.dbo.itinerario(id)
) with ( SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.itinerario_ponto_historico));

-- CREATE PONTOGEOGRAFICO
CREATE TABLE GoogleTransit.dbo.pontogeografico (
	id int NOT NULL IDENTITY(1,1),
	inicio_vigencia datetime2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
	fim_vigencia datetime2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
	latitude nvarchar(255) NOT NULL,
	longitude nvarchar(255) NOT NULL,
	altitude nvarchar(255),
	sequencia int NOT NULL,
	dataupload date NOT NULL,
	itinerario_id int NOT NULL,
	PERIOD FOR SYSTEM_TIME (inicio_vigencia, fim_vigencia),
	CONSTRAINT PK_857df3651aaa565538448f9c0f7 PRIMARY KEY (id),
	CONSTRAINT FK_934fc10a9593a4d2b57ff6ce9df FOREIGN KEY (itinerario_id) REFERENCES GoogleTransit.dbo.itinerario(id)
);

-- CREATE HORARIO
CREATE TABLE GoogleTransit.dbo.horario (
	id int NOT NULL IDENTITY(1,1),
	inicio_vigencia datetime2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
	fim_vigencia datetime2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
	horadasaida time NOT NULL,
	horadachegada time NOT NULL,
	acessibilidade bit NOT NULL,
	diautil bit NOT NULL,
	sabado bit NOT NULL,
	domingo bit NOT NULL,
	itinerario_id int NOT NULL,
	PERIOD FOR SYSTEM_TIME (inicio_vigencia, fim_vigencia),
	CONSTRAINT PK_3c89ff4250bf835ce1f861313c7 PRIMARY KEY (id),
	CONSTRAINT FK_5cc8658a4202dce8b0797dac3f0 FOREIGN KEY (itinerario_id) REFERENCES GoogleTransit.dbo.itinerario(id)
) with ( SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.horario_historico));

-- CREATE ESTIMATIVA
CREATE TABLE GoogleTransit.dbo.estimativa (
	id int NOT NULL IDENTITY(1,1),
	inicio_vigencia datetime2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
	fim_vigencia datetime2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
	datadecoleta date NOT NULL,
	horarionoponto time NOT NULL,
	pontofinal bit,
	ponto_id int NOT NULL,
	horario_id int NOT NULL,
	PERIOD FOR SYSTEM_TIME (inicio_vigencia, fim_vigencia),
	CONSTRAINT PK_ca185d548979052034790fb497d PRIMARY KEY (id),
	CONSTRAINT FK_645f2f2f2bdaf7a76dcb9c4f5ed FOREIGN KEY (horario_id) REFERENCES GoogleTransit.dbo.horario(id),
	CONSTRAINT FK_c3aa9f12682c09fba4ac5581748 FOREIGN KEY (ponto_id) REFERENCES GoogleTransit.dbo.ponto(id)
) with ( SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.estimativa_historico));

-- CREATE VIAGEM
CREATE TABLE GoogleTransit.dbo.viagem (
	id int NOT NULL IDENTITY(1,1),
	inicio_vigencia datetime2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
	fim_vigencia datetime2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
	horadasaida datetime NOT NULL,
	horadachegada datetime NOT NULL,
	veiculo nvarchar(255) NOT NULL,
	acessibilidade bit NOT NULL,
	itinerario_id int NOT NULL,
	horario_id int NOT NULL,
    PERIOD FOR SYSTEM_TIME (inicio_vigencia, fim_vigencia),
	CONSTRAINT PK_a2191e12f865bbe656e9a958f72 PRIMARY KEY (id),
	CONSTRAINT FK_cb7e345eba623d8aaec01346122 FOREIGN KEY (horario_id) REFERENCES GoogleTransit.dbo.horario(id),
	CONSTRAINT FK_ef85306fdedfcb0440c71e8e132 FOREIGN KEY (itinerario_id) REFERENCES GoogleTransit.dbo.itinerario(id)
) with ( SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.viagem_historico));

-- CREATE HISTORICO_REAL
CREATE TABLE GoogleTransit.dbo.historico_real (
	id int NOT NULL IDENTITY(1,1),
	datadecoleta datetime NOT NULL,
	horarionoponto datetime,
	pontofinal bit,
	pontoinicial bit,
	velocidade float,
	veiculo nvarchar(255) NOT NULL,
	sequencia int,
	ponto_id int,
	viagem_id int NOT NULL,
	itinerario_id int NOT NULL,
	CONSTRAINT PK_0f199c6f49dd70c51b8bdf5b1ab PRIMARY KEY (id),
	CONSTRAINT FK_0999c76d394e93510f517477700 FOREIGN KEY (itinerario_id) REFERENCES GoogleTransit.dbo.itinerario(id),
	CONSTRAINT FK_59411e64020041fc6885048965a FOREIGN KEY (ponto_id) REFERENCES GoogleTransit.dbo.ponto(id),
	CONSTRAINT FK_afb0990ca29efc7a081bee80b1b FOREIGN KEY (viagem_id) REFERENCES GoogleTransit.dbo.viagem(id)
);

-- CREATE VEICULO_PONTO_VIAGEM_HISTORICO_BRUTO
CREATE TABLE GoogleTransit.dbo.veiculo_ponto_viagem_historico_bruto (
	id int NOT NULL IDENTITY(1,1),
	veiculo nvarchar(255) NOT NULL,
	datahora datetime NOT NULL,
	datahoraMillis bigint NOT NULL,
	velocidade float,
	ignicao bit NOT NULL,
	pontoInicial bit DEFAULT ((0)) NOT NULL,
	pontoFinal bit DEFAULT ((0)) NOT NULL,
	sequencia int,
	itinerario_id int NOT NULL,
	viagem_id int NOT NULL,
	ponto_id int,
	CONSTRAINT PK_889696d73a44b83bce0b4ff0a93 PRIMARY KEY (id),
	CONSTRAINT FK_d9644e392f47ff0610ae82bfc03 FOREIGN KEY (itinerario_id) REFERENCES GoogleTransit.dbo.itinerario(id),
	CONSTRAINT FK_ef1c7f95f79217d955f19b65181 FOREIGN KEY (ponto_id) REFERENCES GoogleTransit.dbo.ponto(id),
	CONSTRAINT FK_f6854f50dcbe1b0d7ea46c16124 FOREIGN KEY (viagem_id) REFERENCES GoogleTransit.dbo.viagem(id)
);

-- ÍNDICES SUGERIDOS PELO DBA
USE [GoogleTransit]
CREATE NONCLUSTERED INDEX [IDX_viagem__horadasaida_itinerario_id] ON [dbo].[viagem] ([horadasaida],[itinerario_id])
CREATE NONCLUSTERED INDEX [IDX_itinerario_ponto__itinerario_id] ON [dbo].[itinerario_ponto] ([itinerario_id])