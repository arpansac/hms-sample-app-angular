import { Component, OnInit } from '@angular/core';
import { FormStageService, FORM_STAGES } from '../../../services/form-stage.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit {

  formStages = FORM_STAGES;

  constructor(
    private formStageService: FormStageService
  ) { }

  ngOnInit(): void {
  }

  setStage(stage: string) {
    this.formStageService.setStage(stage);
  }
}
