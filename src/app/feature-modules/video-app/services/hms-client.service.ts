import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HmsClientService {

  private _username = null;
  private _token = null;
  private _role = null;
  private _roomId = null;
  private _roomName = null;

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

  set roomName(value: any) {
    this._roomName = value;
  }

  get roomName() {
    return this._roomName;
  }

}
