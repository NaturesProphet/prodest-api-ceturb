#language: pt
Funcionalidade: getPontoGeografico

Endpoint que retorna pontos geográficos direto do banco de dados


Cenário: Pontos geográficos encontrados
Dado quero ver a lista de pontos geográficos
Quando eu pesquisar
Então recebo uma lista de pontos geográficos


Cenário: Pontos geográficos não encontrados
Dado quero ver a lista de pontos geográficos
E O banco de dados está vazio
Quando eu pesquisar
Então recebo uma mensagem de erro


Cenário: Erro na busca
Dado quero ver a lista de pontos geográficos
E algum problema lógico ou de infra ocorreu
Quando eu pesquisar
Então recebo uma mensagem de erro