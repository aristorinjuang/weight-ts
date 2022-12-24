import express, { Express, Router as ExpressRouter } from 'express';
import Router from './Router';
import Handler from './Handler';
import Repository from '../../repository/Repository';
import request from 'supertest';
import Weight from '../../entity/Weight';
import Weights from '../../entity/Weights';

describe('test HTTP handler', () => {
  describe('test return 200 and 400', () => {
    const date: Date = new Date('2022-05-22');
    const weight: Weight = new Weight(date, 2, 1);
    const repository: Repository = {
      list: jest.fn().mockReturnValueOnce(new Weights(new Array<Weight>(weight))),
      create: jest.fn().mockResolvedValueOnce(() => Promise.resolve()),
      read: jest.fn().mockReturnValueOnce(weight),
      update: jest.fn().mockResolvedValueOnce(() => Promise.resolve()),
      delete: jest.fn().mockResolvedValueOnce(() => Promise.resolve())
    };
    const router: ExpressRouter = Router(Handler(repository));
    const app: Express = express();

    app.use(express.json());
    app.use('/', router);

    test('GET /v1/weights 200', async () => {
      const res = await request(app).get('/v1/weights');
  
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.message).toBe('');
      expect(res.body.data.weights.length).toBe(1);
      expect(res.body.data.weights[0].date).toBe(date.toJSON());
      expect(res.body.data.weights[0].max).toBe(2);
      expect(res.body.data.weights[0].min).toBe(1);
      expect(res.body.data.weights[0].difference).toBe(1);
      expect(res.body.data.average.max).toBe(2);
      expect(res.body.data.average.min).toBe(1);
      expect(res.body.data.average.difference).toBe(1);
    })

    test('POST /v1/weights 200', async () => {
      const data = {
        'date': '2022-05-22',
        'max': 3,
        'min': 2
      }
      const res = await request(app).post('/v1/weights').send(data);
  
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.message).toBe('');
      expect(res.body.data).toMatchObject({});
    })

    test('POST /v1/weights with no data should return 400', async () => {
      const res = await request(app).post('/v1/weights');
  
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(400);
      expect(res.body.status).toBe('error');
      expect(res.body.message.length).toBe(3);
      expect(res.body.data).toMatchObject({});
    })

    test('POST /v1/weights with max > min should return 400', async () => {
      const data = {
        'date': '2022-05-22',
        'max': 2,
        'min': 3
      }
      const res = await request(app).post('/v1/weights').send(data);
  
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(400);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('max should be greater than min');
      expect(res.body.data).toMatchObject({});
    })

    test('GET /v1/weights/:date 200', async () => {
      const res = await request(app).get('/v1/weights/2022-05-22');
  
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.message).toBe('');
      expect(res.body.data.weight.date).toBe(date.toJSON());
      expect(res.body.data.weight.max).toBe(2);
      expect(res.body.data.weight.min).toBe(1);
      expect(res.body.data.weight.difference).toBe(1);
    })

    test('GET /v1/weights/:date with invalid date format should return 400', async () => {
      const res = await request(app).get('/v1/weights/20220522');
  
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(400);
      expect(res.body.status).toBe('error');
      expect(res.body.message.length).toBe(1);
      expect(res.body.data).toMatchObject({});
    })

    test('PUT /v1/weights/:date 200', async () => {
      const data = {
        'max': 3,
        'min': 2
      }
      const res = await request(app).put('/v1/weights/2022-05-22').send(data);
  
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.message).toBe('');
      expect(res.body.data).toMatchObject({});
    })

    test('PUT /v1/weights/:date with no data should return 400', async () => {
      const res = await request(app).put('/v1/weights/20220522');
  
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(400);
      expect(res.body.status).toBe('error');
      expect(res.body.message.length).toBe(3);
      expect(res.body.data).toMatchObject({});
    })

    test('PUT /v1/weights with max > min should return 400', async () => {
      const data = {
        'max': 2,
        'min': 3
      }
      const res = await request(app).put('/v1/weights/2022-05-22').send(data);
  
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(400);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('max should be greater than min');
      expect(res.body.data).toMatchObject({});
    })

    test('DELETE /v1/weights/:date 200', async () => {
      const res = await request(app).delete('/v1/weights/2022-05-22');
  
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.message).toBe('');
      expect(res.body.data).toMatchObject({});
    })

    test('DELETE /v1/weights/:date with invalid date format should return 400', async () => {
      const res = await request(app).delete('/v1/weights/20220522');
  
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(400);
      expect(res.body.status).toBe('error');
      expect(res.body.message.length).toBe(1);
      expect(res.body.data).toMatchObject({});
    })
  })

  describe('test return 404', () => {
    const repository: Repository = {
      list: jest.fn(),
      create: jest.fn(),
      read: jest.fn().mockReturnValueOnce(null),
      update: jest.fn(),
      delete: jest.fn()
    };
    const router: ExpressRouter = Router(Handler(repository));
    const app: Express = express();

    app.use(express.json());
    app.use('/', router);

    test('GET /v1/weights/:date with no weight should return 404', async () => {
      const res = await request(app).get('/v1/weights/2022-05-23');
  
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(404);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('the weight does not exists');
      expect(res.body.data).toMatchObject({});
    })
  })

  describe('test return 500', () => {
    const repository: Repository = {
      list: jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error('failed to list weights'))),
      create: jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error('failed to create a weight'))),
      read: jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error('failed to read a weight'))),
      update: jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error('failed to update a weight'))),
      delete: jest.fn().mockRejectedValueOnce(() => Promise.reject(new Error('failed to delete a weight')))
    };
    const router: ExpressRouter = Router(Handler(repository));
    const app: Express = express();

    app.use(express.json());
    app.use('/', router);

    test('GET /v1/weights 500', async () => {
      const res = await request(app).get('/v1/weights');
  
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(500);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('failed to get weights');
      expect(res.body.data).toBeUndefined();
    })

    test('POST /v1/weights 500', async () => {
      const data = {
        'date': '2022-05-22',
        'max': 3,
        'min': 2
      }
      const res = await request(app).post('/v1/weights').send(data);
  
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(500);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('failed to create a weight');
      expect(res.body.data).toBeUndefined();
    })

    test('GET /v1/weights/:date 500', async () => {
      const res = await request(app).get('/v1/weights/2022-06-26');
  
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(500);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('failed to get the weight');
      expect(res.body.data).toBeUndefined();
    })

    test('PUT /v1/weights/:date 500', async () => {
      const data = {
        'max': 3,
        'min': 2
      }
      const res = await request(app).put('/v1/weights/2022-05-22').send(data);
  
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(500);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('failed to update the weight');
      expect(res.body.data).toBeUndefined();
    })

    test('DELETE /v1/weights/:date 500', async () => {
      const res = await request(app).delete('/v1/weights/2022-05-22');
  
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(500);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('failed to delete the weight');
      expect(res.body.data).toBeUndefined();
    })
  })
})