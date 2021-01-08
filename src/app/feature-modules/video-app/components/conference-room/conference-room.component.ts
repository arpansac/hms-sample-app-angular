import { Component, OnInit } from '@angular/core';
import { HmsApiService } from '../../services/hms-api.service';
import { HmsClientService } from '../../services/hms-client.service';

@Component({
  selector: 'app-conference-room',
  templateUrl: './conference-room.component.html',
  styleUrls: ['./conference-room.component.scss']
})
export class ConferenceRoomComponent implements OnInit {
  loading = false;

  constructor(
    private hmsApiService: HmsApiService,
    private hmsClientService: HmsClientService
  ) { }

  ngOnInit(): void {
    this.getClient();
  }

  getClient() {
    this.hmsApiService.getClientAuthtoken(this.hmsClientService.roomId, this.hmsClientService.username, this.hmsClientService.role).subscribe(
      data => {
        console.log(data);
      }
    );
  }

}
