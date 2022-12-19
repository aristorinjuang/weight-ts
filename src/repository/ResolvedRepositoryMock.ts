import Repository from './Repository';
import Weight from '../entity/Weight';
import Weights from '../entity/Weights';

export default class ResolvedRepositoryMock implements Repository {
  private date: Date;
  private weight: Weight;

  constructor() {
    this.date = new Date('2022-05-22');
    this.weight = new Weight(this.date, 2, 1);
  }

  public async list(): Promise<Weights> {
    let promise: Promise<Weights> = new Promise((resolve) => {
      let weights: Weights = new Weights(new Array<Weight>(this.weight));

      resolve(weights);
    })

    return promise;
  }

  public async create(weight: Weight): Promise<void> {
  }

  public async read(date: Date): Promise<Weight> {
    let weight: Weight;
    let promise: Promise<Weight> = new Promise((resolve) => {
      if (this.date.toJSON() === date.toJSON()) {
        resolve(this.weight);
      } else {
        resolve(weight);
      }
    })

    return promise;
  }

  public async update(weight: Weight): Promise<void> {
  }

  public async delete(date: Date): Promise<void> {
  }
}