import {User} from "./User";

export class AcademicExperience {

  private _id: number;
  private _title: string;
  private _place: string;
  private _period: string;
  private _type: string;
  private _user: User;

  constructor(id: number, title: string, place: string, period: string, type: string, user: User) {
    this._id = id;
    this._title = title;
    this._place = place;
    this._period = period;
    this._type = type;
    this._user = user;
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

  get place(): string {
    return this._place;
  }

  set place(value: string) {
    this._place = value;
  }

  get period(): string {
    return this._period;
  }

  set period(value: string) {
    this._period = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }
}
