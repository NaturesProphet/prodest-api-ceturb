import { Injectable } from '@nestjs/common';
import { Gtfs } from '../models/gtfs.model.Dto';
import * as shell from 'shelljs';

@Injectable()
export class GtfsService {
    private files: Gtfs[] = [];
    private readonly minioAddress = 'http://127.0.0.1:9000/gtfs';

    constructor(){  //Cria array de GTFS que já contem todas as informações
        let out = shell.exec('./mc ls minio/gtfs').stdout;
        let results = out.split("\n");

        results.pop(); // Retira a string vazia criada no split
        
        results.map(line => {
            let result = line.split('-');
            let split1 = result[2].split(" "); // Separacao do dia e da hora
            let split2 = result[3].split(" "); // Separacao do tamanho
            result[0] = result[0].substring(1); // Retirada do colchetes
            let url = this.minioAddress + '/' + split2[split2.length-1];  
            
            let gtfs = {
                year : result[0],
                month : result[1],
                day : split1[0],
                hour : split1[1],
                size : split2[split2.length-2],
                filename : split2[split2.length-1],
                url: url
            }
            this.files.push(gtfs);
        });
    }

    public async getAll () {
        return this.files;
    }

    public async getByYear(year: String){
        let files: Gtfs[] = [];

        this.files.map(line => {
            if(line.year == year){
                files.push(line);
            }
        })
        return files;
    }

    public async getByYearMonth(year: String, month: String){
        let files: Gtfs[] = [];

        this.files.map(line => {
            if(line.year == year && line.month == month){
                files.push(line);
            }
        })
        return files;
    }

    public async getByYearMonthDay(year: String, month: String, day: String){
        let files: Gtfs[] = [];

        this.files.map(line => {
            if(line.year == year && line.month == month && line.day == day){
                files.push(line);
            }
        })
        return files;
    }
}

