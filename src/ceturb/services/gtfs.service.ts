import { Injectable } from '@nestjs/common';
import { Gtfs } from '../models/gtfs.model.Dto';
import { MinioService } from './minio.service'

@Injectable()
export class GtfsService {
    private files: Gtfs[] = [];
    

    constructor(private minioService:MinioService){ //Configura o minio 
        this.minioService.config();
    }

    private async ls(){ //Cria array de GTFS que já contem todas as informações
        this.files = [];
        let out =  await this.minioService.ls();
        let results = out.split("\n");

        results.pop(); // Retira a string vazia criada no split
        
        results.map(line => {
            let date = line.substring(1,11)
            let calendar = date.split('-');

            let hour = line.substring(12,20);

            let result = line.substring(25);
            let results = result.split(" ");
            results = results.filter(n=>n);

            let url = this.minioService.getAddress() + '/gtfs/' + results[1];

            let gtfs = {
                year : calendar[0],
                month : calendar[1],
                day : calendar[2],
                hour : hour,
                size : results[0],
                filename : results[1],
                url: url
            }
            this.files.push(gtfs);
        });
    }

    public async getAll () {
        this.ls();
        return this.files;
    }

    public async getByYear(year: String){
        await this.ls();
        let files: Gtfs[] = [];

        this.files.map(line => {
            if(line.year == year){
                files.push(line);
            }
        })
        return files;
    }

    public async getByYearMonth(year: String, month: String){
        await this.ls();
        let files: Gtfs[] = [];

        this.files.map(line => {
            if(line.year == year && line.month == month){
                files.push(line);
            }
        })
        return files;
    }

    public async getByYearMonthDay(year: String, month: String, day: String){
        await this.ls();
        let files: Gtfs[] = [];

        this.files.map(line => {
            if(line.year == year && line.month == month && line.day == day){
                files.push(line);
            }
        })
        return files;
    }
}

