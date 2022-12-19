import Weights from './Weights'
import Weight from './Weight'

describe('test weights', () => {
  describe('basic functions', () => {
    it('should be defined', () => {
      let weights = new Weights();

      expect(weights).toBeDefined();
    })
  
    it('could be defined with weights', () => {
      let weight = new Weight(new Date(), 2, 1);
      let weights = new Weights(new Array<Weight>(weight));
  
      expect(weights).toBeDefined();
    })
  
    it('could add weight', () => {
      let weights = new Weights();
      let weight = new Weight(new Date(), 2, 1);
  
      weights.addWeight(weight);
  
      expect(weights).toBeDefined();
    })
  })

  describe('average functions', () => {
    let date: Date = new Date();
    let w1: Weight = new Weight(date, 2, 1);
    let w2: Weight = new Weight(date, 3, 2);
    let w3: Weight = new Weight(date, 4, 3);
    let weights = new Weights(Array<Weight>(w1, w2, w3));

    test('average max', () => {
      expect(weights.averageMax()).toBe(3);
    })

    test('average min', () => {
      expect(weights.averageMin()).toBe(2);
    })
  
    test('average difference', () => {
      expect(weights.averageDifference()).toBe(1);
    })
  })

  describe('tests after added new weight', () => {
    let date: Date = new Date();
    let w1: Weight = new Weight(date, 2, 1);
    let w2: Weight = new Weight(date, 3, 2);
    let w3: Weight = new Weight(date, 4, 3);
    let w4: Weight = new Weight(date, 6, 5);
    let weights = new Weights(Array<Weight>(w1, w2, w3));

    weights.addWeight(w4);

    test('average max', () => {
      expect(weights.averageMax()).toBe(3.75);
    })

    test('average min', () => {
      expect(weights.averageMin()).toBe(2.75);
    })
  
    test('average difference', () => {
      expect(weights.averageDifference()).toBe(1);
    })
  })
})