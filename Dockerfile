FROM registry.es.gov.br/espm/infraestrutura/containers/node:10.15.3

RUN mkdir -p /usr/app/src
WORKDIR /usr/app

COPY package.json tsconfig.json /usr/app/
RUN npm install --prod
COPY src/ /usr/app/src
COPY swagger.json /usr/app
COPY mc /usr/app/

EXPOSE 3000

CMD ["npm","run", "start"]