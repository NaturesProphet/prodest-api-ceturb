#language: pt
Funcionalidade: getItinerarios

Endpoint que retorna itinerarios direto do banco de dados


Cenário: Itinerarios encontrados
Dado quero ver a lista de itinerarios
Quando eu pesquisar
Então recebo uma lista de itinerarios


Cenário: Itinerarios não encontrados
Dado quero ver a lista de itinerarios
E O banco de dados está vazio
Quando eu pesquisar
Então recebo uma mensagem de erro


Cenário: Erro na busca
Dado quero ver a lista de itinerarios
E algum problema lógico ou de infra ocorreu
Quando eu pesquisar
Então recebo uma mensagem de erro