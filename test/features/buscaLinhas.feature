Feature: retornar_linhas

    Função responsável por buscar as linhas na API da geocontrol


    Scenario: Existem linhas registradas
        Given que a API da geocontrol funciona
        When eu pesquisar
        Then retorna as linhas cadastradas
