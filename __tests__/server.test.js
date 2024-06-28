const app = require('../server/server');
const request = require('supertest');

beforeAll(done => {
  done();
});

afterAll(done => {
  done();
});

describe('POST /v1/api/tickets', () => {
  test('should respond with a 201 status code', async () => {
    const response = await request(app).post('/v1/api/tickets').send({
      status_id: 1,
      header: 'Issue Reported',
      body: 'Issue Detailed',
      urgent: true,
      first_name: 'Thomas',
      last_name: 'Anderson',
      email: 'thematrixhasyou@matrix.com'
  });
    expect(response.statusCode).toBe(201);
  });

  test('content type header should specify text', async () => {
    const response = await request(app).post('/v1/api/tickets').send({
      status_id: 1,
      header: 'Issue Reported',
      body: 'Issue Detailed',
      urgent: true,
      first_name: 'Thomas',
      last_name: 'Anderson',
      email: 'thematrixhasyou@matrix.com'
  });
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('text/html')
    );
  });

  test('response has success response', async () => {
    const response = await request(app).post('/v1/api/tickets').send({
      status_id: 1,
      header: 'Issue Reported',
      body: 'Issue Detailed',
      urgent: true,
      first_name: 'Thomas',
      last_name: 'Anderson',
      email: 'thematrixhasyou@matrix.com'
  });
    expect(response.text).toEqual(expect.stringContaining('ticket created succesfully'));
  });
});

describe('GET /v1/api/tickets', () => {
  test('response is in json format', async () => {
    const NEW = 1;
    const response = await request(app).get(
      `/v1/api/tickets?status_id=${NEW}`
    );
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });

  test('response has header property', async () => {
    const NEW = 1;
    const response = await request(app).get(
      `/v1/api/tickets?status_id=${NEW}`
    );
    expect(response.text).toEqual(expect.stringContaining('header'));
  });

  test('response has urgent property', async () => {
    const NEW = 1;
    const response = await request(app).get(
      `/v1/api/tickets?status_id=${NEW}`
    );
    expect(response.text).toEqual(expect.stringContaining('urgent'));
  });
});
  
