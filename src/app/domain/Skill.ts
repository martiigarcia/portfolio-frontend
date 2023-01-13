import {User} from "./User";

export class Skill {
  private _id: number;
  private _title: string;
  private _percentage: number;
  private _user: User;

  constructor(id: number, title: string, percentage: number, user: User) {
    this._id = id;
    this._title = title;
    this._percentage = percentage;
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

  get percentage(): number {
    return this._percentage;
  }

  set percentage(value: number) {
    this._percentage = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }
}
