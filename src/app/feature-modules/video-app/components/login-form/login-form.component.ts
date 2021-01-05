import { FormStageService, FORM_STAGES } from '../../services/form-stage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  formStage: any;
  formStages = FORM_STAGES;

  constructor(
    private formStageService: FormStageService
  ) { }

  ngOnInit(): void {

    // set the form stage for rendering the desired stage
    this.formStageService.formStage$.subscribe(
      data => this.formStage = data
    );

  }

  // form states
  // ROOM
  // JOIN_ROOM
  // CREATE ROOM
  // PERMISSION
  //

}
