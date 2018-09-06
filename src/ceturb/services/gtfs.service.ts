import { Injectable } from '@nestjs/common';
import * as request from 'request-promise';
import * as shell from 'shelljs';

@Injectable()
export class GtfsService {
    private files: String[][];
    
    public async listAll () {
        let output = shell.exec('./mc ls minio/gtfs').stdout;
        /*
        let i:number = 0
        while(output.length > i){
            let fileInfo: String[];
            console.log("Testando0")
            while( output[i] != "\\" ){
                fileInfo.push(output[i]);
                i++
                console.log("TestandoX")
            }
            i+=2
            this.files.push(fileInfo);
            console.log("Testando1")
        }*/             
        return JSON.stringify(output)
    }
}

