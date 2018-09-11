Feature: retornar_calendarios
    Responsável por retornar a lista dos calendarios


    Scenario: Existem registros de calendario
        Given Eu quero saber quais são os calendaris da semana
        When eu pesquisar
        Then recebo uma lista de calendarios

    Scenario: Não existem registros de calendario
        Given Eu quero saber quais são os calendaris da semana
        And Não há registros de calendario
        When eu pesquisar
        Then recebo uma mensagem informando que não há registros de calendario
