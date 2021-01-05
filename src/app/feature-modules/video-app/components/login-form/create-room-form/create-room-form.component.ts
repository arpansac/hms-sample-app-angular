import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormStageService, FORM_STAGES } from '../../../services/form-stage.service';

@Component({
  selector: 'app-create-room-form',
  templateUrl: './create-room-form.component.html',
  styleUrls: ['./create-room-form.component.scss']
})
export class CreateRoomFormComponent implements OnInit {
  formStages = FORM_STAGES;


  createRoomForm = this.fb.group({
    room_name: ['', Validators.required],
    username: ['', Validators.required],
    role: ['', Validators.required],
    record: [false, Validators.required]
  });


  constructor(
    private formStageService: FormStageService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  setStage(stage: string) {
    this.formStageService.setStage(stage);
  }


  createRoom() {
    
  }

}
