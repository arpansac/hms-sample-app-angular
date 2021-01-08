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

  selectedVideoDevice: Object;
  selectedAudioDevice: Object;

  localMediaStream: any;

  constructor(
    private hmsClientService: HmsClientService,
    private HmsApiService: HmsApiService,
    private localMediaService: LocalMediaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.roomId = this.hmsClientService.roomId;
    this.localMediaService.getUserMedia({audio: true, video: true});
    this.localMediaService.getDevices();
    this.localMediaService.localMediaStream$.subscribe(
      data => {
        console.log(data);
        if (data) {
          let video = this.previewVideo.nativeElement;
          video.srcObject = data;
          // video.onloadedmetadata = () => {
          //   video.play();
          // };
        }
      }

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
