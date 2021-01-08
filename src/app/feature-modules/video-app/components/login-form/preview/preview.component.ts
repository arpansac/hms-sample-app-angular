import { HmsApiService } from './../../../services/hms-api.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HmsClientService } from '../../../services/hms-client.service';
import { Router } from '@angular/router';
import { LocalMediaService } from '../../../services/local-media.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @ViewChild('previewVideo', {static: true}) previewVideo: ElementRef;

  roomId: string;
  audioDevices: Array<any>;
  videoDevices: Array<any>;

  selectedVideoDevice: any;
  selectedAudioDevice: any;

  localMediaStream: any;

  camera = true;
  mic = true;

  constructor(
    private hmsClientService: HmsClientService,
    private HmsApiService: HmsApiService,
    private localMediaService: LocalMediaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.roomId = this.hmsClientService.roomId;
    this.localMediaService.getDevices();
    this.localMediaService.localMediaStream$.subscribe(
      data => {
        if (data) {
          let video = this.previewVideo.nativeElement;
          video.srcObject = data;
        }
      }

    );

    this.localMediaService.mediaDevices$.subscribe(
      data => {
        this.audioDevices = data.audio;
        this.videoDevices = data.video;

        if (this.audioDevices) {
          this.selectedAudioDevice = this.audioDevices[0];
        }

        if (this.videoDevices) {
          this.selectedVideoDevice = this.videoDevices[0];
        }

        if (this.selectedAudioDevice || this.selectedVideoDevice) {
          this.setSelectedDevices();
        }
      }
    );

  }


  setSelectedDevices() {
    this.localMediaService.selectDevices(
      (this.mic ? this.selectedAudioDevice : null),
      (this.camera ? this.selectedVideoDevice : null)
    );
  }


  toggleMic() {
    this.mic = !this.mic;
    this.setSelectedDevices();
  }

  toggleCamera() {
    this.camera = !this.camera;
    this.setSelectedDevices();
  }


}
