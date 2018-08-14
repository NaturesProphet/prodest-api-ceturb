Feature: retornar_viagens

    Função responsável por buscar as viagens na API da geocontrol


    Scenario: Existem viagens registradas
        Given Eu quero saber as informações das viagens cadastradas
        When eu pesquisar viagens
        Then retorna as viagens cadastradas

    Scenario: Não existem viagens registradas
        Given Eu quero saber as informações das viagens cadastradas
        When eu pesquisar viagens
        Then retorna uma mensagem informando que não há informações disponíveis