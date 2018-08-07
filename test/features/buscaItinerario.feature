Feature: retornar_itinerarios

   Função responsável pro buscar os itinerários na API da geoControl

   Scenario: Existem itinerários registrados
        Given que a API da geoControl funciona
        When Eu pesquisar
        Then retorna os itinerários cadastrados