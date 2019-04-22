/*
EXECUTE OS CREATES ABAIXO UM DE CADA VEZ NO DBEAVER.
*/

/*
	VERSÃO DO DESENVOLVIMENTO DO BANCO: 2.1.5
*/

CREATE TRIGGER TGR_INSERT_agencia
ON GoogleTransit.dbo.agencia
AFTER INSERT
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE agencia SET dataregistro = @DATA, atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_INSERT_contato
ON GoogleTransit.dbo.contato
AFTER INSERT
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE contato SET dataregistro = @DATA, atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_INSERT_estimativa
ON GoogleTransit.dbo.estimativa
AFTER INSERT
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE estimativa SET dataregistro = @DATA, atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_INSERT_feriado
ON GoogleTransit.dbo.feriado
AFTER INSERT
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE feriado SET dataregistro = @DATA, atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_INSERT_itinerario_ponto
ON GoogleTransit.dbo.itinerario_ponto
AFTER INSERT
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE itinerario_ponto SET dataregistro = @DATA, atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_INSERT_itinerario
ON GoogleTransit.dbo.itinerario
AFTER INSERT
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE itinerario SET dataregistro = @DATA, atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_INSERT_linha
ON GoogleTransit.dbo.linha
AFTER INSERT
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE linha SET dataregistro = @DATA, atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_INSERT_linha_tarifa_vigencia
ON GoogleTransit.dbo.linha_tarifa_vigencia
AFTER INSERT
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE linha_tarifa_vigencia SET dataregistro = @DATA, atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_INSERT_ponto
ON GoogleTransit.dbo.ponto
AFTER INSERT
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE ponto SET dataregistro = @DATA, atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_INSERT_pontogeografico
ON GoogleTransit.dbo.pontogeografico
AFTER INSERT
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE pontogeografico SET dataregistro = @DATA, atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_INSERT_tarifa
ON GoogleTransit.dbo.tarifa
AFTER INSERT
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE tarifa SET dataregistro = @DATA, atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_INSERT_viagem
ON GoogleTransit.dbo.viagem
AFTER INSERT
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE viagem SET dataregistro = @DATA, atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_INSERT_vigencia
ON GoogleTransit.dbo.vigencia
AFTER INSERT
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE vigencia SET dataregistro = @DATA, atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_UPDATE_agencia
ON GoogleTransit.dbo.agencia
FOR UPDATE
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE agencia SET atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_UPDATE_contato
ON GoogleTransit.dbo.contato
FOR UPDATE
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE contato SET atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_UPDATE_estimativa
ON GoogleTransit.dbo.estimativa
FOR UPDATE
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE estimativa SET atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_UPDATE_historico
ON GoogleTransit.dbo.historico
FOR UPDATE
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE historico SET atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_UPDATE_feriado
ON GoogleTransit.dbo.feriado
FOR UPDATE
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE feriado SET atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_UPDATE_itinerario_ponto
ON GoogleTransit.dbo.itinerario_ponto
FOR UPDATE
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE itinerario_ponto SET atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_UPDATE_itinerario
ON GoogleTransit.dbo.itinerario
FOR UPDATE
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE itinerario SET atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_UPDATE_linha
ON GoogleTransit.dbo.linha
FOR UPDATE
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE linha SET atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_UPDATE_linha_tarifa_vigencia
ON GoogleTransit.dbo.linha_tarifa_vigencia
FOR UPDATE
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE linha_tarifa_vigencia SET atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_UPDATE_ponto
ON GoogleTransit.dbo.ponto
FOR UPDATE
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE ponto SET atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_UPDATE_pontogeografico
ON GoogleTransit.dbo.pontogeografico
FOR UPDATE
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE pontogeografico SET atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_UPDATE_tarifa
ON GoogleTransit.dbo.tarifa
FOR UPDATE
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE tarifa SET atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_UPDATE_viagem
ON GoogleTransit.dbo.viagem
FOR UPDATE
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE viagem SET atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

CREATE TRIGGER TGR_UPDATE_vigencia
ON GoogleTransit.dbo.vigencia
FOR UPDATE
AS
BEGIN
    DECLARE
    @DATA   bigint
    DECLARE
    @ID     int
    SELECT @DATA = cast(Datediff(s, '1970-01-01', GETDATE()) AS bigint)*1000 - 10800000
    SELECT @ID = id
    FROM inserted
    UPDATE vigencia SET atualizadoem = @DATA
    WHERE id = @ID
END
GO
-----------------------------------------------------------------------
-----------------------------------------------------------------------

