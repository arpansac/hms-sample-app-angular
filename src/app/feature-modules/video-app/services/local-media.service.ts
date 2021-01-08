import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalMediaService {

  private mediaDevices: BehaviorSubject<any> = new BehaviorSubject({});
  public mediaDevices$ = this.mediaDevices.asObservable();

  private localMediaStream: BehaviorSubject<any> = new BehaviorSubject(null);
  public localMediaStream$ = this.localMediaStream.asObservable();


  private selectedAudioDevice: BehaviorSubject<any> = new BehaviorSubject(null);
  public selectedAudioDevice$ = this.selectedAudioDevice.asObservable();

  private selectedVideoDevice: BehaviorSubject<any> = new BehaviorSubject(null);
  public selectedVideoDevice$ = this.selectedVideoDevice.asObservable();

  private constraints: BehaviorSubject<any> = new BehaviorSubject(null);
  public constraints$ = this.constraints.asObservable();

  constructor() { }


  getUserMedia(constraints: any)  {
    console.log(constraints);
    this.constraints.next(constraints);
    this.stopStream();
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream: MediaStream) => {
        this.localMediaStream.next(stream);
      })
      .catch((error: MediaStreamError) => {
        this.localMediaStream.error(error);
        console.log('stream access error', error);
      });
  }


  getDevices() {
    navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      let audio = [];
      let video = [];

      for (let dev of devices) {
        // skipping audiooutput devices
        switch (dev.kind) {
          case 'audioinput':
            audio.push(dev);
            break;
          case 'videoinput':
            video.push(dev);
            break;
          default:
            "";
        }
      }
      this.mediaDevices.next({
        audio: audio,
        video: video
      });
    }).catch(error => {
      console.log('media devices are not accessible');
    });
  }

  selectDevices(audioDevice: any, videoDevice: any) {

    this.selectedAudioDevice.next(audioDevice);
    this.selectedVideoDevice.next(videoDevice);

    let constraints = <any>{};

    constraints.audio = (audioDevice ? ({deviceId: {exact: audioDevice.deviceId}}) : false);
    constraints.video = (videoDevice ? ({deviceId: {exact: videoDevice.deviceId}}) : false);
    this.getUserMedia(constraints);
  }

  stopStream() {

    if (this.localMediaStream.getValue()) {
      let tracks = this.localMediaStream.getValue().getTracks();

      for (let track of tracks) {
        track.stop();
      }
    }

  }


}
