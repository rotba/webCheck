import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { CheckComponent } from './check/check.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'check', component: CheckComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
