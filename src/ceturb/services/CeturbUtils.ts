import * as request from 'request-promise';

export class CeturbUtils {
    public static async getBody ( link: string ) {
        let req = await request.get( link, { json: true } );
        return req;
    }
}


