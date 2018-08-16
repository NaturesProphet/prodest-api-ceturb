#language: pt
Funcionalidade: Pegar relação da associação pontos x itinerários.

Essa funcionalidade tem como objetivo informar todas as associações entre pontos e itinerários presentes na api GVBUS.

Cenário: Retornar todas as associações entre pontos e itinerários.
Dado que existam associações entre pontos e itinerários registrados.
Quando o usuário solicitar as informações sobre as associações entre pontos e itinerários.
Então o sistema retorna todas as associações entre pontos e itinerários.


Cenário: Não há registros de associações entre pontos e itinerários.
Dado que não existam associações entre pontos e itinerários registrados.
Quando o usuário solicitar as informações sobre as associações entre pontos e itinerários.
Então o sistema retorna uma mensagem informando que não há registros