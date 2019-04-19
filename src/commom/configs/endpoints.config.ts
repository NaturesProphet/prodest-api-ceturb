/*
Para fazer o deploy no Rancher de produção, é necessário fazer a configuração interna
das rotas da API via variavel de ambiente para que se adeque a rota raiz que lhe for 
dada pela configuração do rancher.
*/
import * as dotenv from 'dotenv';
if ( process.env.NODE_ENV != 'production' ) {
    dotenv.config();
}
export const rootEndPoint: string = process.env.CETURB_ROOT_ENDPOINT;
export const apiPort: number = Number( process.env.API_PORT ) || 3000;