Feature: retornar_linhas

    Função responsável por buscar as linhas na API da geocontrol


    Scenario: Existem linhas registradas
        Given Eu quero saber as informações das linhas registrados
        When eu pesquisar
        Then retorna as linhas cadastradas


    Scenario: Não existem linhas registradas
        Given Eu quero saber as informações das linhas registrados
        And não há linhas registradas
        When eu pesquisar
        Then retorna uma mensagem informando que não há registros