[![Pipeline Tests](https://gitlab.es.gov.br/espm/apis/api-ceturb/badges/master/build.svg)](https://gitlab.es.gov.br/espm/apis/api-ceturb/pipelines)[![Quality Gate](http://sonar.10.243.9.12.xip.io/api/project_badges/measure?project=api-ceturb&metric=alert_status)](http://sonar.10.243.9.12.xip.io/dashboard?id=api-ceturb)[![Bugs](http://sonar.10.243.9.12.xip.io/api/project_badges/measure?project=api-ceturb&metric=bugs)](http://sonar.10.243.9.12.xip.io/dashboard?id=api-ceturb)[![Codesmells](http://sonar.10.243.9.12.xip.io/api/project_badges/measure?project=api-ceturb&metric=code_smells)](http://sonar.10.243.9.12.xip.io/dashboard?id=api-ceturb)[![Vulnerabilities](http://sonar.10.243.9.12.xip.io/api/project_badges/measure?project=api-ceturb&metric=vulnerabilities)](http://son[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)] (http://commitizen.github.io/cz-cli/) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)ar.10.243.9.12.xip.io/dashboard?id=api-ceturb)[![Security](http://sonar.10.243.9.12.xip.io/api/project_badges/measure?project=api-ceturb&metric=security_rating)](http://sonar.10.243.9.12.xip.io/dashboard?id=api-ceturb)[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)] (http://commitizen.github.io/cz-cli/)[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)


# API-CETURB

## Rotas
/docs - Abre o swagger <br><br>
/itinerarios - retorna todos os itinerarios cadastrados <br><br>
/itinerarios/500 - retorna o itinerario cadastrado da linha 500 <br><br>
/horarios/500 - retorna os horarios de saida cadastrados da linha 500 <br><br>
/horarios/obs/500 - retorna as observações cadastradas da linha 500 <br><br>
/linhas - retorna as linhas cadastradas <br><br>
/viagens - retorna as viagens cadastradas <br><br>
/agencias - retorna os dados da empresa responsavel pelo serviço <br><br>
/pontos - retorna todos os pontos cadastrados <br><br>
/pontositinerarios - retorna a relação de pontos e itinerarios <br><br>

## Description

Neste projeto estamos "re-construíndo" a API da ceturb, utilizando os dados da API da geocontrol como fonte primária de dados.  
A documentação das rotas está documentada com Swagger e se econtra disponível na rota /docs

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

