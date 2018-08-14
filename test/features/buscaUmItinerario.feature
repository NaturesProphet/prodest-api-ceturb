Feature: retornar_itinerarios

    Função responsável por buscar o itinerários de uma linha na API da geoControl

    Scenario: Existem itinerários registrados de uma linha
        Given que a API da geoControl funciona
        When Eu pesquisar uma linha
        Then retorna o itinerários cadastrados de uma linha