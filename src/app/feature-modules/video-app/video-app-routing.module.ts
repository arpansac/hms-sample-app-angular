import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';

import { VideoAppComponent } from './components/video-app/video-app.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoAppRoutingModule { }
