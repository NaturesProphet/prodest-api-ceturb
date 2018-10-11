#language: pt
Funcionalidade: getItinerarioPontos

Endpoint que retorna associações de itinerario/pontos direto do banco de dados


Cenário: Associações encontradas
Dado quero ver a lista de associações
Quando eu pesquisar
Então recebo uma lista de associações


Cenário:  Associações não encontradas
Dado quero ver a lista de associações
E O banco de dados está vazio
Quando eu pesquisar
Então recebo uma mensagem de erro


Cenário: Erro na busca
Dado quero ver a lista de associações
E algum problema lógico ou de infra ocorreu
Quando eu pesquisar
Então recebo uma mensagem de erro