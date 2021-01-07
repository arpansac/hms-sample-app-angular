import { FormStageService, FORM_STAGES } from './../../../services/form-stage.service';
import { Component, OnInit } from '@angular/core';
import { LocalMediaService } from '../../../services/local-media.service';

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss']
})
export class PermissionFormComponent implements OnInit {

  constructor(
    private localMediaService: LocalMediaService,
    private formStageService: FormStageService
  ) { }

  ngOnInit(): void {

    this.localMediaService.localMediaStream$.subscribe(
      data => {
        if (data) {
          this.formStageService.setStage(FORM_STAGES.PREVIEW);
        }
      },
      err => {
        console.log('errrrr', err);
      },

    );
  }


  getPermission() {
    this.localMediaService.getUserMedia({audio: true, video: true});
  }

}
