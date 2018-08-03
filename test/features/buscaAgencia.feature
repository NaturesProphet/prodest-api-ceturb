Feature: retornar_agencias

    Função responsável por buscar as agencias


    Scenario: Existem agencias registradas
        Given que a API da geocontrol funciona
        When eu pesquisar
        Then retorna as agencias cadastradas
