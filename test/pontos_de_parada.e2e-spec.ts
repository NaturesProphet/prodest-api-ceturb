import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature("./test/features/pontos_de_parada.feature");
import request from "supertest";

import { INestApplication, HttpModule } from "@nestjs/common";
import { AppModule } from "../src/app.module";

let pontos: any;

defineFeature(feature, test => {
  let module: TestingModule;
  let app: INestApplication;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [HttpModule, AppModule]
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  test("Retornar todos os pontos ativos registrados.", ({
    given,
    when,
    then
  }) => {
    given("que existam pontos de parada registrados.", () => {
      request(app.getHttpServer())
        .get("/v1/pontos")
        .expect(200);
    });

    when("o usuário solicitar as informações sobre os pontos.", async () => {
      pontos = await request(app.getHttpServer()).get("/v1/pontos");
    });

    then("o sistema retorna todos os pontos ativos.", () => {
      expect(pontos.lenght).toBeGreaterThan(0);
    });
  });
});
