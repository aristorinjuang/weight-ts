import mysql, { Connection } from 'mysql';
import sinon, { SinonMock } from 'sinon';
import Repository from '../../repository/Repository';
import MySQL from './MySQL';
import Weight from '../../entity/Weight';
import Weights from '../../entity/Weights';

describe('test MySQL repository', () => {
  let connection: Connection = mysql.createConnection({host: 'localhost'});
  let mock: SinonMock = sinon.mock(connection);
  let repository: Repository = new MySQL(connection);
  let date: Date = new Date();
  let results = [{date: date, max: 2, min: 1}];
  let fields = ['date', 'max', 'min'];

  it('should return weights', async () => {
    mock.expects('query')
      .withArgs('SELECT date, max, min FROM weights ORDER BY date DESC')
      .callsArgWith(1, null, results, fields);

      let weights: Weights = await repository.list()

      expect(weights).toBeDefined()
  })

  it('should return an error when got rejected', async () => {
    mock.expects('query').once().callsArgWith(1, new Error(), null, null);

    try {
      await repository.list();
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
    }
  })

  it('should insert weight', () => {
    mock.expects('query').withArgs('INSERT INTO weights (date, max, min, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())');

    repository.create(new Weight(date, 2, 1))
  })

  it('should return an error when got failed to create', async () => {
    mock.expects('query').once().callsArgWith(2, new Error(), null, null);

    try {
      await repository.create(new Weight(date, 2, 1));
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
    }
  })

  it('should return weight', async () => {
    mock.expects('query')
      .withArgs('SELECT max, min FROM weights WHERE date = ? LIMIT 1')
      .callsArgWith(2, null, results, fields)

    let weight: Weight = await repository.read(date)

    expect(weight.date).toBe(date);
    expect(weight.max).toBe(2);
    expect(weight.min).toBe(1);
  })

  it('should not return weight entity when got failed', async () => {
    mock.expects('query')
      .withArgs('SELECT max, min FROM weights WHERE date = ? LIMIT 1')
      .callsArgWith(2, null, null, fields)

    let weight: Weight = await repository.read(date)

    expect(weight).toBeUndefined();
  })

  it('should return an error when got failed to read an entity', async () => {
    mock.expects('query').once().callsArgWith(2, new Error(), null, null);

    try {
      await repository.read(date);
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
    }
  })

  it('should update weight entity', () => {
    mock.expects('query').withArgs('UPDATE weights SET updated_at = NOW(), max = ?, min = ? WHERE date = ?');

    repository.update(new Weight(date, 2, 1))
  })

  it('should return an error when got failed to update an entity', async () => {
    mock.expects('query').once().callsArgWith(2, new Error(), null, null);

    try {
      await repository.update(new Weight(date, 2, 1));
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
    }
  })

  it('should delete weight entity', () => {
    mock.expects('query').withArgs('DELETE FROM weights WHERE date = ?');

    repository.delete(date)
  })

  it('should return an error when got failed to delete an entity', async () => {
    mock.expects('query').once().callsArgWith(2, new Error(), null, null);

    try {
      await repository.delete(date);
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
    }
  })
})