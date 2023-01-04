export class User {

  private _id: number;
  private _name: string;
  private _surname: string;
  private _age: number;
  private _email: string;
  private _password: string;
  private _admin: boolean;


  constructor(id: number, name: string, surname: string, age: number, email: string, password: string, admin:boolean) {
    this._id = id;
    this._name = name;
    this._surname = surname;
    this._age = age;
    this._email = email;
    this._password = password;
    this._admin = admin;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get admin(): boolean {
    return this._admin;
  }

  set admin(value: boolean) {
    this._admin = value;
  }
}
