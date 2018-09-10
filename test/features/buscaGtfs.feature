Feature: retornar_gtfs

    Responsável por retornar as informações dos arquivos GTFS criados.


    Scenario: Existem arquivos GTFS registrados
        Given Eu quero saber as informações dos arquivos GTFS criados
        When eu pesquisar
        Then recebo as informações

    Scenario: Não existem arquivos GTFS registrados
        Given Eu quero saber as informações dos arquivos GTFS criados
        And Não há informações sobre esses arquivos
        When eu pesquisar
        Then teste
