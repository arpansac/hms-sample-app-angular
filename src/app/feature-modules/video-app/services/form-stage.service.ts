import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum FORM_STAGES {
  ROOM = 'ROOM',
  JOIN_ROOM = 'JOIN_ROOM',
  CREATE_ROOM = 'CREATE_ROOM',
  PERMISSION = 'PERMISSION',
  PREVIEW = 'PREVIEW'
}

@Injectable({
  providedIn: 'root'
})
export class FormStageService {

  private formStage: BehaviorSubject<any> = new BehaviorSubject(FORM_STAGES.ROOM);
  public formStage$ = this.formStage.asObservable();


  constructor() { }

  setStage(stage: any) {
    this.formStage.next(stage);
  }
}
