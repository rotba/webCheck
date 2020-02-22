import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckComponent } from './check/check.component';
import { CreateKeyComponent } from './create-key/create-key.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelloComponent } from './hello/hello.component';
import { FaceDetectionComponent } from './face-detection/face-detection.component';
import { ExampleListComponent } from './example-list/example-list.component';


const routes: Routes = [
  { path: 'create-key', component: CreateKeyComponent },
  { path: 'check', component: CheckComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'hello', component: HelloComponent },
  { path: 'face-detection', component: FaceDetectionComponent },
  { path: 'example-list', component: ExampleListComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
