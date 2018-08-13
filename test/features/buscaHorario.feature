Feature: retornar_horarios

    Função responsável por buscar os horários de uma linha


    Scenario: Existem horários de linhas registradas
        Given que a API da geoControl funciona
        When eu pesquisar uma linha
        Then retornará os horários cadastradas daquela linha
