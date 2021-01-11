import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoAppRoutingModule } from './video-app-routing.module';
import { VideoAppComponent } from './components/video-app/video-app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbSelectModule, NbToastrModule } from '@nebular/theme';
import { RoomFormComponent } from './components/login-form/room-form/room-form.component';
import { JoinRoomFormComponent } from './components/login-form/join-room-form/join-room-form.component';
import { CreateRoomFormComponent } from './components/login-form/create-room-form/create-room-form.component';
import { PermissionFormComponent } from './components/login-form/permission-form/permission-form.component';
import { PreviewComponent } from './components/login-form/preview/preview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConferenceRoomComponent } from './components/conference-room/conference-room.component';
import { VideoPlayerComponent } from './components/conference-room/video-player/video-player.component';


@NgModule({
  declarations: [
    VideoAppComponent,
    LoginFormComponent,
    RoomFormComponent,
    JoinRoomFormComponent,
    CreateRoomFormComponent,
    PermissionFormComponent,
    PreviewComponent,
    ConferenceRoomComponent,
    VideoPlayerComponent],
  imports: [
    CommonModule,
    VideoAppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // Nebular
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbCheckboxModule,
    NbIconModule,
    NbSelectModule
  ]
})
export class VideoAppModule { }
