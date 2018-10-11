#language: pt
Funcionalidade: getLinhas

Endpoint que retorna linhas direto do banco de dados


Cenário: Linhas encontradas
Dado quero ver a lista de linhas
Quando eu pesquisar
Então recebo uma lista de linhas


Cenário: Linhas não encontradas
Dado quero ver a lista de linhas
E O banco de dados está vazio
Quando eu pesquisar
Então recebo uma mensagem de erro


Cenário: Erro na busca
Dado quero ver a lista de linhas
E algum problema lógico ou de infra ocorreu
Quando eu pesquisar
Então recebo uma mensagem de erro