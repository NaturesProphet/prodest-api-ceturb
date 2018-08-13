Feature: retornar_agencias

    Responsável por retornar as informações das agencias de transporte público do estado.


    Scenario: Existem agencias registradas
        Given Eu quero saber as informações das agencias públicas de transporte
        When eu pesquisar
        Then recebo as informações

    Scenario: Não existem agencias registradas
        Given Eu quero saber as informações das agencias públicas de transporte
        And Não há informações sobre essas
        When eu pesquisar
        Then recebo uma mensagem informando que não há agencias
