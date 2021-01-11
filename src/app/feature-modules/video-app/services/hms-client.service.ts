import { Injectable } from '@angular/core';
import { HMSPeer, HMSClientConfig, HMSClient, LocalStream } from "@100mslive/hmsvideo-web";
import { HMS_CREDS } from 'src/environments/hms-cred';

@Injectable({
  providedIn: 'root'
})
export class HmsClientService {

  private _username: string;
  private _token: string;
  private _role: string;
  private _roomId: string;
  private _roomName: string;
  private _client: any;

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


  createClient() {
    const config = new HMSClientConfig({
      endpoint: HMS_CREDS.HMS_ENDPOINT
    });

    const peer = new HMSPeer(this.username, this.token);

    const client = new HMSClient(peer, config);
    return client;
  }

}
