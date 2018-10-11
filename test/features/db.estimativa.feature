#language: pt
Funcionalidade: getEstimativas

Endpoint que retorna estimativas direto do banco de dados


Cenário: Estimativas encontradas
Dado quero ver a lista de estimativas
Quando eu pesquisar
Então recebo uma lista de estimativas


Cenário: Estimativas não encontradas
Dado quero ver a lista de estimativas
E O banco de dados está vazio
Quando eu pesquisar
Então recebo uma mensagem de erro


Cenário: Erro na busca
Dado quero ver a lista de estimativas
E algum problema lógico ou de infra ocorreu
Quando eu pesquisar
Então recebo uma mensagem de erro