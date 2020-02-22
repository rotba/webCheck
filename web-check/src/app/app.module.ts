import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { NgOpenCVModule } from 'ng-open-cv';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckComponent } from './check/check.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CreateKeyComponent } from './create-key/create-key.component';
import { ScanExamComponent } from './scan-exam/scan-exam.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { AlertModule } from './alert';
import { HelloComponent } from './hello/hello.component';
import { ExampleListComponent } from './example-list/example-list.component';
import { FaceDetectionComponent } from './face-detection/face-detection.component';
import { OpenCVOptions } from 'projects/ng-open-cv/src/public_api';

const openCVConfig: OpenCVOptions = {
  scriptUrl: `assets/opencv/opencv.js`,
  wasmBinaryFile: 'wasm/opencv_js.wasm',
  usingWasm: true
};

@NgModule({
  declarations: [
    AppComponent,
    CheckComponent,
    DashboardComponent,
    CreateKeyComponent,
    ScanExamComponent,
    HelloComponent,
    ExampleListComponent,
    FaceDetectionComponent
  ],
  imports: [
    HttpClientModule,
    NgOpenCVModule.forRoot(openCVConfig),
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
      ),
    BrowserModule,
    AppRoutingModule,
    AlertModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
