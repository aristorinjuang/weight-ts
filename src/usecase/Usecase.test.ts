import { Weights } from '../repository/Repository';
import Weight from '../entity/Weight';
import Usecase from './Usecase';

describe('test usecase', () => {
  let date: Date = new Date();
  let w1: Weight = new Weight(date, 2, 1);
  let w2: Weight = new Weight(date, 3, 2);
  let w3: Weight = new Weight(date, 4, 3);
  let weights: Weights = new Array<Weight>(w1, w2, w3);
  let usecase: Usecase = new Usecase();

  usecase.weights = weights;

  test('weights are correct', () => {
    expect(usecase.weights).toBe(weights)
  })

  test('average max is correct', () => {
    expect(usecase.averageMax()).toBe(3);
  })

  test('average min is correct', () => {
    expect(usecase.averageMin()).toBe(2);
  })

  test('average difference is correct', () => {
    expect(usecase.averageDifference()).toBe(1);
  })

  test('double set weights should be single', () => {
    usecase.weights = weights;

    expect(usecase.weights).toBe(weights)
    expect(usecase.averageMax()).toBe(3);
    expect(usecase.averageMin()).toBe(2);
    expect(usecase.averageDifference()).toBe(1);
  })

  test('multiple set weights should be single', () => {
    usecase.weights = weights;
    usecase.weights = weights;
    usecase.weights = weights;
    usecase.weights = weights;
    usecase.weights = weights;

    expect(usecase.weights).toBe(weights)
    expect(usecase.averageMax()).toBe(3);
    expect(usecase.averageMin()).toBe(2);
    expect(usecase.averageDifference()).toBe(1);
  })
})