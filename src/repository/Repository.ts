import Weight from '../entity/Weight';
import Weights from '../entity/Weights';

export default interface Repository {
  list(): Promise<Weights>
  create(weight: Weight): Promise<void>
  read(date: Date): Promise<Weight>
  update(weight: Weight): Promise<void>
  delete(date: Date): Promise<void>
}