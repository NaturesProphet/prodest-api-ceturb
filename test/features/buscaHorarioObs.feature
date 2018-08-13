Feature: retornar_horariosObs

    Função responsável por buscar as observações de horários de uma linha


    Scenario: Existem observações de horários de linhas registradas
        Given que a API da geoControl funciona
        When eu pesquisar as observações do horário de uma linha
        Then retornará as observações do horário cadastradas daquela linha
