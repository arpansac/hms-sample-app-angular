import { Injectable } from '@angular/core';
import { IRoom } from 'src/app/models/room.model';
import { HMS_CREDS } from 'src/environments/hms-cred';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IClientToken } from 'src/app/models/client-token.model';

@Injectable({
  providedIn: 'root'
})
export class HmsApiService {

  constructor(
    private http: HttpClient
  ) { }


  createRoom(roomName: string, recordRoom: boolean): Observable<IRoom> {
    return this.http.post<IRoom>(
      `${HMS_CREDS.TOKEN_ENDPOINT}?api=room`, {
        room_name: roomName,
        recording_info: {
          enabled: recordRoom
        },
      }
    );
  }


  getClientAuthtoken(roomId: string, username: string, role: string): Observable<IClientToken> {
    return this.http.post<IClientToken>(
      `${HMS_CREDS.TOKEN_ENDPOINT}?api=token`, {
        room_id: roomId,
        user_name: username,
        role: role
      }
    );
  }
}
