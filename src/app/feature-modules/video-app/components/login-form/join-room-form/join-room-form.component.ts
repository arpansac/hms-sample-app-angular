import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormStageService, FORM_STAGES } from '../../../services/form-stage.service';

@Component({
  selector: 'app-join-room-form',
  templateUrl: './join-room-form.component.html',
  styleUrls: ['./join-room-form.component.scss']
})
export class JoinRoomFormComponent implements OnInit {
  formStages = FORM_STAGES;


  joinRoomForm = this.fb.group({
    room_id: ['', Validators.required],
    username: ['', Validators.required],
    role: ['', Validators.required],
  });


  constructor(
    private fb: FormBuilder,
    private formStageService: FormStageService
  ) { }

  ngOnInit(): void {
  }

  setStage(stage: string) {
    this.formStageService.setStage(stage);
  }


  joinRoom() {

  }


}
