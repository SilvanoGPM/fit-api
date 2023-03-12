import { randomUUID } from 'node:crypto';

export class BaseEntity<T> {
  protected props: T;
  protected _id: string;

  constructor(id?: string) {
    this._id = id ?? randomUUID();
  }

  public get id() {
    return this._id;
  }

  toJSON() {
    return { _id: this.id, ...this.props };
  }
}
