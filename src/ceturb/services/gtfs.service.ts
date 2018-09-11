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
            let treatment = result[2].split(" "); // Separacao do dia e da hora
            result[0] = result[0].substring(1); // Retirada do colchetes
                        
            for(let i=5;i<treatment.length;i++){ //junta todas as partes do nome do arquivo que foram separadas no tratamento acima
                treatment[4]+=result[i];
                treatment.splice(i)
            }

            let url = this.minioAddress + '/' + treatment[4];

            let gtfs = {
                year : result[0],
                month : result[1],
                day : treatment[0],
                hour : treatment[1],
                size : treatment[3],
                filename : treatment[4],
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

