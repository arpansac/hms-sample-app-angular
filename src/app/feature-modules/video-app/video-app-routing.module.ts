import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';

import { VideoAppComponent } from './components/video-app/video-app.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: ':room_id', component: VideoAppComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoAppRoutingModule { }
