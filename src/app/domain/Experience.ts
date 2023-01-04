export class Experience{

  private _id: number;
  private _title: string;
  private _description: string;


  constructor(id: number, title: string, description: string) {
    this._id = id;
    this._title = title;
    this._description = description;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
}
