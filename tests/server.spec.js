const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

  test("GET /cafes devuelve status 200 y un arreglo con al menos un objeto", async () => {
    const response = await request(server).get("/cafes");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("DELETE /cafes con ID inexistente debe retornar 404", async () => {
    const idInexistente = 9999;
    const response = await request(server)
      .delete(`/cafes/${idInexistente}`)
      .set("Authorization", "Bearer token");
      expect(response.statusCode).toBe(404);
});

  test("POST /cafes agrega un nuevo café y retorna 201", async () => {
    const nuevoCafe = { id: 20, nombre: "Latte Solar" };
    const response = await request(server).post("/cafes").send(nuevoCafe);
    expect(response.statusCode).toBe(201);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining(nuevoCafe)])
    );
  });

  test("PUT /cafes con ID inconsistente retorna 400", async () => {
    const idUrl = 10;
    const cafeActualizado = { id: 5, nombre: "Espresso Lunar" };
    const response = await request(server).put(`/cafes/${idUrl}`).send(cafeActualizado);
    expect(response.statusCode).toBe(400);
  });

});
