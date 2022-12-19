import Weight from '../../entity/Weight';
import WeightsJSON from './WeightsJSON';

describe('test JSON factory', () => {
  test('weights JSON should be equal with params of weight entities', () => {
    let date: Date = new Date();
    let w1: Weight = new Weight(date, 2, 1);
    let weights: Weight[] = new Array<Weight>(w1);
    let json = new WeightsJSON(weights).json()

    expect(json.length).toBe(1);
    expect(json[0].date).toBe(date);
    expect(json[0].max).toBe(2);
    expect(json[0].min).toBe(1);
    expect(json[0].difference).toBe(1);
  })
})