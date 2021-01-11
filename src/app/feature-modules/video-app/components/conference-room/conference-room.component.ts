import { IClientToken } from './../../../../models/client-token.model';
import { Component, OnInit } from '@angular/core';
import { HmsApiService } from '../../services/hms-api.service';
import { HmsClientService } from '../../services/hms-client.service';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { LocalMediaService } from '../../services/local-media.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-conference-room',
  templateUrl: './conference-room.component.html',
  styleUrls: ['./conference-room.component.scss']
})
export class ConferenceRoomComponent implements OnInit {
  loading = true;
  client: any;
  localStream;
  isConnected = false;
  mic = true;
  camera = true;
  participants: {};

  constructor(
    private hmsApiService: HmsApiService,
    private hmsClientService: HmsClientService,
    private localMediaService: LocalMediaService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.getClientToken();
  }

  getClientToken() {
    this.hmsApiService.getClientAuthtoken(
      this.hmsClientService.roomId,
      this.hmsClientService.username,
      this.hmsClientService.role
      ).subscribe(
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
        console.log(`${peer.name} added stream`);
    });

    this.client.on('stream-remove', (room, streamInfo) => {
        // Remove remote stream if needed
        console.log(`stream removed`);
    });

    this.client.on('broadcast', (room, peer ,message) => {
        // Show a notification or update chat UI
        console.log(`message from ${peer.name} on ${room}: "${message}"`);
    });

    this.client.on('disconnected', () => {
      // If there is a temporary websocket disconnection, then execute code
      // to re-publish and subscribe all streams. eg. location.reload();
      console.log(`%c[APP] TEARING DOWN`, 'color:#fc0');
      // @NOTE: Implement a cleaner tear down logic for graceful UI transition instead of a page reload
      location.reload();
    });
  }


  async joinRoom() {
    try {
      await this.client.join(this.hmsClientService.roomId);
    } catch (err) {
      console.log(`Error in joining room: ${err.message}`);
    }
  }

  createLocalStream() {
    // tslint:disable-next-line: deprecation
    combineLatest(
      this.localMediaService.selectedAudioDevice$,
      this.localMediaService.selectedVideoDevice$,
      (audioDevice, videoDevice) => {
        this.localStream = this.getLocalStream(audioDevice, videoDevice);
        this.publishLocalStream();
      }
    );

  }

  async getLocalStream(audioDevice, videoDevice) {
    const localStream = await this.client.getLocalStream({
      resolution: "vga", //This defines the video height and width. Can be qqvga, qvga, shd, hd
      bitrate: 256, //This is the maximum bitrate to cap the video at
      codec: "VP8",
      frameRate: 20,
      shouldPublishAudio:true,
      shouldPublishVideo:true,
      advancedMediaConstraints: {
          video: {
              deviceId: audioDevice.deviceId
          },
          audio: {
              deviceId: audioDevice.deviceId
          }
      }
    });

    return localStream;
  }

  async publishLocalStream() {
    await this.client.publish(this.localStream, this.hmsClientService.roomId);
  }

  async updateLocalStreamQuality() {

  }

  async addStream() {

  }

  async removeStream() {

  }

  async screenShare() {

  }

  updateParticipants(username, stream) {
    // this.participants[]
  }

}
