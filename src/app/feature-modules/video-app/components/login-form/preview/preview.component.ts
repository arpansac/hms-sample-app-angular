import { HmsApiService } from './../../../services/hms-api.service';
import { Component, OnInit } from '@angular/core';
import { HmsClientService } from '../../../services/hms-client.service';
import { Router } from '@angular/router';
import { LocalMediaService } from '../../../services/local-media.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  roomId = null;
  audioDevices = null;
  videoDevices = null;

  selectedVideoDevice = null;
  selectedAudioDevice = null;

  localMediaStream = null;

  constructor(
    private hmsClientService: HmsClientService,
    private HmsApiService: HmsApiService,
    private localMediaService: LocalMediaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.roomId = this.hmsClientService.roomId;

    this.localMediaService.localMediaStream$.subscribe(
      data => this.localMediaStream = data
    );

    this.localMediaService.audioDevices$.subscribe(
      data => {
        this.audioDevices = data;
      }
    );

    this.localMediaService.videoDevices$.subscribe(
      data => {
        this.videoDevices = data;
      }
    );

    this.localMediaService.selectedAudioDevice$.subscribe(
      data => this.selectedAudioDevice = data
    );

    this.localMediaService.selectedVideoDevice$.subscribe(
      data => this.selectedVideoDevice = data
    );
  }


  setSelectedDevices() {
    this.localMediaService.selectDevices(this.selectedAudioDevice, this.selectedVideoDevice);
  }


}
