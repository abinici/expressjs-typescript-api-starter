import * as request from "supertest";
import * as http from 'http';
import { ApiServer } from "../src/api.server";

const apiServer = new ApiServer();
let httpServer: http.Server;

beforeAll(async () => {
  httpServer = await apiServer.start();
});

afterAll(async () => {
  await apiServer.stop();
});

describe("Controller /heroes", () => {
  it("GET /heroes", async () => {
    const result = await request(httpServer).get("/heroes");
    const body: any[] = result.body;
    expect(result.status).toEqual(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(5);
  });

  it("GET /heroes/:id", async () => {
    const result = await request(httpServer).get("/heroes/1");
    const body: any = result.body;
    expect(result.status).toEqual(200);

    expect(body).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      aliases: expect.any(Array),
      occupation: expect.any(String),
      gender: expect.any(String),
      height: expect.any(Object),
      hair: expect.any(String),
      eyes: expect.any(String),
      powers: expect.any(Array)
    });
  });
});