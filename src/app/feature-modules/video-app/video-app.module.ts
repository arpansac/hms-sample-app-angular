import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoAppRoutingModule } from './video-app-routing.module';
import { VideoAppComponent } from './components/video-app/video-app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NbButtonModule, NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [VideoAppComponent, LoginFormComponent],
  imports: [
    CommonModule,
    VideoAppRoutingModule,

    // Nebular
    NbButtonModule,
    NbCardModule
  ]
})
export class VideoAppModule { }
