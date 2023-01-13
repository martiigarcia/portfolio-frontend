import {User} from "./User";

export class WorkExperience {

  private _id: number;
  private _title: string;
  private _description: string;
  private _period: string;
  private _place: string;
  private _user: User;


  constructor(id: number, title: string, description: string, period: string, place: string, user: User) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._period = period;
    this._place = place;
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

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get period(): string {
    return this._period;
  }

  set period(value: string) {
    this._period = value;
  }

  get place(): string {
    return this._place;
  }

  set place(value: string) {
    this._place = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }
}
