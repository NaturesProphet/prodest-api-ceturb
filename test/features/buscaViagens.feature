Feature: retornar_viagens

    Função responsável por buscar as viagens na API da geocontrol


    Scenario: Existem viagens registradas
        Given que a API da geocontrol funciona
        When eu pesquisar
        Then retorna as viagens cadastradas
