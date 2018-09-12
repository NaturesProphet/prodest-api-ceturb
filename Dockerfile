FROM node:latest

RUN mkdir -p /usr/app/src
WORKDIR /usr/app

COPY package.json tsconfig.json /usr/app/
RUN npm install
COPY src/ /usr/app/src
COPY mc /usr/app/

EXPOSE 3000

CMD ["npm","run", "start"]