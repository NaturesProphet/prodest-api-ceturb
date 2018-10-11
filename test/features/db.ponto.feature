#language: pt
Funcionalidade: getPontos

Endpoint que retorna pontos direto do banco de dados


Cenário: Pontos encontrados
Dado quero ver a lista de pontos
Quando eu pesquisar
Então recebo uma lista de pontos


Cenário: Pontos não encontrados
Dado quero ver a lista de pontos
E O banco de dados está vazio
Quando eu pesquisar
Então recebo uma mensagem de erro


Cenário: Erro na busca
Dado quero ver a lista de pontos
E algum problema lógico ou de infra ocorreu
Quando eu pesquisar
Então recebo uma mensagem de erro