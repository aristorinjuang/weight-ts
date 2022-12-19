export default class Weight {
  private _date: Date;
  private _max: number;
  private _min: number;

  constructor(date: Date, max: number, min: number) {
    if (max <= min) {
      throw new Error('max cannot be equal or lower than min')
    }

    this._date = date;
    this._max = max;
    this._min = min;
  }

  public get date(): Date {
    return this._date;
  }

  public get max(): number {
    return this._max;
  }

  public get min(): number {
    return this._min;
  }

  public difference(): number {
    return this._max - this._min;
  }
}