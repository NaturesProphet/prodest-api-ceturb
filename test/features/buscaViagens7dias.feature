Feature: retornar_viagens7dias

    Função responsável por buscar as viagens para os próximos 7 dias na API da geocontrol


    Scenario: Existem viagens registradas para os próximos 7 dias
        Given Eu quero saber as informações das viagens cadastradas para os próximos 7 dias
        When eu pesquisar viagens
        Then retorna as viagens cadastradas para os próximos 7 dias

    Scenario: Não existem viagens registradas para os próximos 7 dias
        Given Eu quero saber as informações das viagens cadastradas para os próximos 7 dias
        And Não há registros disponíveis
        When eu pesquisar viagens
        Then retorna uma mensagem informando que não há informações disponíveis
