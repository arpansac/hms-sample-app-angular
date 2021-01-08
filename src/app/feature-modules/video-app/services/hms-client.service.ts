import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HmsClientService {

  private _username: string;
  private _token: string;
  private _role: string;
  private _roomId: string;
  private _roomName: string;

  constructor() { }


  set username(value: any) {
    this._username = value;
  }

  set token(value: any) {
    this._token = value;
  }

  set role(value: any) {
    this._role = value;
  }

  set roomId(value: any) {
    this._roomId = value;
  }

  get roomId() {
    return this._roomId;
  }


  set roomName(value: any) {
    this._roomName = value;
  }

  get roomName() {
    return this._roomName;
  }

}
