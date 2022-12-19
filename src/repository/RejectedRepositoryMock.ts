import Repository from './Repository';
import Weight from '../entity/Weight';
import Weights from '../entity/Weights';

export default class RejectedRepositoryMock implements Repository {
  public async list(): Promise<Weights> {
    let promise: Promise<Weights> = new Promise((_, reject) => {
      reject(new Error());
    })

    return promise;
  }

  public async create(weight: Weight): Promise<void> {
    let promise: Promise<void> = new Promise((_, reject) => {
      reject(new Error());
    })

    return promise;
  }

  public async read(date: Date): Promise<Weight> {
    let promise: Promise<Weight> = new Promise((_, reject) => {
      reject(new Error());
    })

    return promise;
  }

  public async update(weight: Weight): Promise<void> {
    let promise: Promise<void> = new Promise((_, reject) => {
      reject(new Error());
    })

    return promise;
  }

  public async delete(date: Date): Promise<void> {
    let promise: Promise<void> = new Promise((_, reject) => {
      reject(new Error());
    })

    return promise;
  }
}