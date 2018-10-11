#language: pt
Funcionalidade: Listar as estimativas de viagems registradas para o ponto indicado

Endpoint que retorna estimativas de viagem em um ponto


Cenário: Estimativas encontradas
Dado quero ver a lista de estimativas de viagems registradas para um ponto
Quando eu pesquisar
Então recebo uma lista de estimativas


Cenário: Estimativas não encontradas
Dado quero ver a lista de estimativas de viagems registradas para um ponto
E não existem estiamtivas registradas
Quando eu pesquisar
Então recebo uma mensagem de erro