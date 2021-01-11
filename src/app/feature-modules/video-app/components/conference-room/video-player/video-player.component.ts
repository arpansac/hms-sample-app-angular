import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @ViewChild('videoPlayer', {static: true}) videoPlayer: ElementRef;

  @Input() stream: any;
  @Input() muted: boolean;
  constructor() { }

  ngOnInit(): void {
    this.videoPlayer.nativeElement.srcObject = this.stream;
  }

}
