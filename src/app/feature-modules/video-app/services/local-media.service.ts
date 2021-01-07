import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalMediaService {

  private audioDevices: BehaviorSubject<any> = new BehaviorSubject([]);
  public audioDevices$ = this.audioDevices.asObservable();

  private videoDevices: BehaviorSubject<any> = new BehaviorSubject([]);
  public videoDevices$ = this.videoDevices.asObservable();

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
    this.constraints.next(constraints);
    console.log('asking for local media permission');
    navigator.mediaDevices
      .getUserMedia(this.constraints.getValue())
      .then((stream: MediaStream) => {
        this.localMediaStream.next(stream);
        console.log('stream accessed', stream);
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
      this.audioDevices.next(audio);
      this.videoDevices.next(video);
      this.selectDevices(audio[0], video[0]);
    }).catch(error => {
      console.log('media devices are not accessible');
    });
  }

  selectDevices(audioDevice: any, videoDevice: any) {
    this.selectedAudioDevice.next(audioDevice);
    this.selectedVideoDevice.next(videoDevice);

    let constraints = {
      audio: {
        deviceId: {
          exact: audioDevice.deviceId
        }
      },
      video: {
        deviceId: {
          exact: videoDevice.deviceId
        }
      },
    };

    this.getUserMedia(constraints);
  }


}
