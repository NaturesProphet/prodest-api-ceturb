import { Injectable } from '@nestjs/common';
import * as shell from 'shelljs';

@Injectable()
export class MinioService {
    private readonly MINIO_ADDRESS:string  = process.env.MINIO_ADDRESS || 'http://172.17.0.1:9000';
    private readonly MINIO_SECRETKEY: string = process.env.MINIO_SECRETKEY || 'admin123';
    private readonly MINIO_KEY: string = process.env.MINIO_KEY || 'admin';

    public async config(){
        shell.exec(`./mc config host add minio ${this.MINIO_ADDRESS} ${this.MINIO_KEY} ${this.MINIO_SECRETKEY}`);
        shell.exec(`./mc policy download minio/gtfs`);
    }

    public async getAddress(): Promise<string>{
        return await this.MINIO_ADDRESS;
    }

    public async ls(): Promise<string>{
        return await shell.exec('./mc ls minio/gtfs').stdout;
    }
}