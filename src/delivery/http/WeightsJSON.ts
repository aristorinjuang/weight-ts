import { Weights } from '../../repository/Repository';

type weight = {
  date: Date,
  max: number,
  min: number,
  difference: number
}

type weights = weight[]

export default class WeightsJSON {
  private _weights: weights

  constructor(weights: Weights) {
    this._weights = Array<weight>()
  
    for (let w of weights) {
      this._weights.push({
        date: w.date,
        max: w.max,
        min: w.min,
        difference: w.difference()
      })
    }
  }

  public json(): weights {
    return this._weights
  }
}