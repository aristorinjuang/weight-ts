import Repository, { Weights } from './Repository';
import { Connection, MysqlError } from 'mysql';
import Weight from '../entity/Weight';

export default class MySQL implements Repository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async list(): Promise<Weights> {
    let promise: Promise<Weights> = new Promise((resolve, reject) => {
      let weights: Weights = [];
      this.connection.query(
        'SELECT date, max, min FROM weights ORDER BY date DESC',
        (err: MysqlError | null, result: any,) => {
          if (err) {
            reject(err)
          }

          if (result !== undefined && result !== null && result.length) {
            for (let weight of result) {
              weights.push(new Weight(weight.date, weight.max, weight.min));
            }
          }

          resolve(weights);
        }
      );
    })

    return promise;
  }

  public async create(weight: Weight): Promise<void> {
    let promise: Promise<void> = new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO weights (date, max, min, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
        [weight.date, weight.max, weight.min],
        (err: MysqlError | null, result: any) => {
          if (err) {
            reject(err)
          }

          resolve(result);
        }
      )
    })

    return promise;
  }

  public async read(date: Date): Promise<Weight> {
    let promise: Promise<Weight> = new Promise((resolve, reject) => {
      let weight: Weight;
      this.connection.query(
        'SELECT max, min FROM weights WHERE date = ? LIMIT 1',
        [date.toISOString().split('T')[0]],
        (err: MysqlError | null, result: any) => {
          if (err) {
            reject(err)
          }

          if (result !== undefined && result !== null && result.length) {
            weight = new Weight(date, result[0].max, result[0].min);
          }

          resolve(weight);
        }
      )
    })

    return promise;
  }

  public async update(weight: Weight): Promise<void> {
    let promise: Promise<void> = new Promise((resolve, reject) => {
      this.connection.query(
        'UPDATE weights SET updated_at = NOW(), max = ?, min = ? WHERE date = ?',
        [weight.max, weight.min, weight.date.toISOString().split('T')[0]],
        (err: MysqlError | null, result: any) => {
          if (err) {
            reject(err)
          }

          resolve(result);
        }
      )
    })

    return promise;
  }

  public async delete(date: Date): Promise<void> {
    let promise: Promise<void> = new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM weights WHERE date = ?',
        [date.toISOString().split('T')[0]],
        (err: MysqlError | null, result: any) => {
          if (err) {
            reject(err)
          }

          resolve(result);
        }
      )
    })

    return promise;
  }
}