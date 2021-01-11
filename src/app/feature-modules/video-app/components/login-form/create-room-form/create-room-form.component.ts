import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { FormStageService, FORM_STAGES } from '../../../services/form-stage.service';
import { HmsApiService } from '../../../services/hms-api.service';
import { HmsClientService } from '../../../services/hms-client.service';

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
    private hmsApiService: HmsApiService,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private hmsClientService: HmsClientService
  ) { }

  ngOnInit(): void {
  }

  setStage(stage: string) {
    this.formStageService.setStage(stage);
  }


  createRoom() {
    this.hmsClientService.role = this.createRoomForm.value.role;
    this.hmsClientService.username = this.createRoomForm.value.username;

    this.hmsApiService.createRoom(this.createRoomForm.value.room_name, this.createRoomForm.value.record).subscribe(
      data => {

        this.hmsClientService.roomId = data.id;
        this.formStageService.setStage(FORM_STAGES.PERMISSION);
        const iconConfig: NbIconConfig = { icon: 'checkmark-outline', pack: 'eva' };
        this.toastrService.success(
          'Success',
          "Room Created",
          {
            icon: iconConfig,
            status: 'success',
            duration: 3000
          }
        );
      }
    );
  }


}
