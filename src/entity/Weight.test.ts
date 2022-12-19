import Weight from './Weight';

describe('test weight', () => {
  let date: Date = new Date();
  let weight: Weight = new Weight(date, 2, 1);

  test('date, max, and min should be equal with params', () => {
    expect(weight.date).toBe(date);
    expect(weight.max).toBe(2);
    expect(weight.min).toBe(1);
  })

  test('max is 2, min is 1, difference should be 1', () => {
    expect(weight.difference()).toBe(1)
  })

  test('max cannot be equal or lower than min', () => {
    expect(() => new Weight(date, 1, 2)).toThrowError()
  })
})