import Weight from './Weight'

export default class Weights {
  private _weights: Array<Weight>;
  private _maxs: number;
  private _mins: number;
  private _differences: number;

  constructor(weights?: Array<Weight>) {
    this._weights = new Array<Weight>();
    this._maxs = 0;
    this._mins = 0;
    this._differences = 0;

    if (weights !== undefined) {
      for (let weight of weights) {
        this.addWeight(weight);
      }
    }
  }

  public addWeight(weight: Weight): void {
    this._weights.push(weight);
    this._maxs += weight.max;
    this._mins += weight.min;
    this._differences += weight.difference();
  }

  public averageMax(): number {
    return this._maxs / this._weights.length;
  }

  public averageMin(): number {
    return this._mins / this._weights.length;
  }

  public averageDifference(): number {
    return this._differences / this._weights.length;
  }
}