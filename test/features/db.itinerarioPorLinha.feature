#language: pt
Funcionalidade: Listar os itinerarios de uma linha especifica pelo seu codigo

Endpoint que retorna uma lsita de itinerarios de uma linha


Cenário: Itinerarios encontrados
Dado quero ver a lista de itinerarios para uma linha
Quando eu pesquisar
Então recebo a lista de itinerarios desta linha


Cenário: Itinerarios não encontrados
Dado quero ver a lista de itinerarios para uma linha
E Não há registros
Quando eu pesquisar
Então recebo uma mensagem de erro
