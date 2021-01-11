import { IClientToken } from './../../../../models/client-token.model';
import { Component, OnInit } from '@angular/core';
import { HmsApiService } from '../../services/hms-api.service';
import { HmsClientService } from '../../services/hms-client.service';
import { NbIconConfig, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-conference-room',
  templateUrl: './conference-room.component.html',
  styleUrls: ['./conference-room.component.scss']
})
export class ConferenceRoomComponent implements OnInit {
  loading = true;
  client: any;

  constructor(
    private hmsApiService: HmsApiService,
    private hmsClientService: HmsClientService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.getClientToken();
  }

  getClientToken() {
    this.hmsApiService.getClientAuthtoken(this.hmsClientService.roomId, this.hmsClientService.username, this.hmsClientService.role).subscribe(
      data => {
        this.hmsClientService.token = data.token;
        this.setupClient();
      }
    );
  }

  setupClient() {

    this.client = this.hmsClientService.createClient();
    this.client.connect().catch((error) => {
      console.log('error in connecting to the client', error.message);
    });


    this.client.on('connect', () => {
      this.loading = false;
      this.toastrService.success(
        'Verified',
        "Joining the meeting...",
        {
          icon: { icon: 'checkmark-outline', pack: 'eva' },
          status: 'success',
          duration: 3000
        }
      );
    });

    this.client.on('disconnect', () => {
      this.loading = true;
      this.toastrService.success(
        '',
        "Reconnecting...",
        {
          icon: { icon: 'alert-triangle-outline', pack: 'eva' },
          status: 'basic',
          duration: 3000
        }
      );
    });

    this.client.on('peer-join', (room, peer) => {
      this.toastrService.success(
        '',
        `${peer.name} joined ${room.name}`,
        {
          icon: { icon: 'person-add-outline', pack: 'eva' },
          status: 'basic',
          duration: 3000
        }
      );
    });

    this.client.on('peer-leave', (room, peer) => {
      this.toastrService.success(
        '',
        `${peer.name} left ${room.name}`,
        {
          icon: { icon: 'person-removee-outline', pack: 'eva' },
          status: 'warning',
          duration: 3000
        }
      );
    });

    this.client.on('stream-add', (room,  peer, streamInfo) => {
        // subscribe to the stream if needed
    });

    this.client.on('stream-remove', (room, streamInfo) => {
        // Remove remote stream if needed
    });

    this.client.on('broadcast', (room, peer ,message) => {
        // Show a notification or update chat UI
    });

    this.client.on('disconnected', () => {
        // If there is a temporary websocket disconnection, then execute code
        // to re-publish and subscribe all streams. eg. location.reload();
    });


  }

}
