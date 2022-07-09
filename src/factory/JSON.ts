import { Weights } from '../repository/Repository';

type weight = {
  date: Date,
  max: number,
  min: number,
  difference: number
}

type weights = weight[]

export default class JSON {
  public static weights = (weights: Weights): weights => {
    let json: weights = [];

    for (let w of weights) {
      json.push({
        date: w.date,
        max: w.max,
        min: w.min,
        difference: w.difference()
      })
    }

    return json;
  }
}