import  { Weights } from '../repository/Repository';
import Weight from '../entity/Weight';

export default class Usecase {
  private _weights: Weights;
  private maxs: number;
  private mins: number;
  private differences: number;

  constructor() {
    this._weights = new Array<Weight>();
    this.maxs = 0;
    this.mins = 0;
    this.differences = 0;
  }

  public get weights(): Weights {
    return this._weights;
  }

  public set weights(weights: Weights) {
    this._weights = weights;
    this.maxs = 0;
    this.mins = 0;
    this.differences = 0;

    for (let weight of weights) {
      this.maxs += weight.max;
      this.mins += weight.min;
      this.differences += weight.difference();
    }
  }

  public averageMax(): number {
    return this.maxs / this._weights.length;
  }

  public averageMin(): number {
    return this.mins / this._weights.length;
  }

  public averageDifference(): number {
    return this.differences / this._weights.length;
  }
}