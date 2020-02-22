import { Component, OnInit, Input, EventEmitter, Output, ɵCodegenComponentFactoryResolver, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {Location} from '@angular/common';
import {ScanService} from '../scan-server/scan.service';
import { Observable, BehaviorSubject, fromEvent} from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from '../alert';
import { NgOpenCVService, OpenCVLoadResult } from 'ng-open-cv';
import { filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-scan-exam',
  templateUrl: './scan-exam.component.html',
  styleUrls: ['./scan-exam.component.css']
})

export class ScanExamComponent implements AfterViewInit , OnInit {
  constructor(
    private location: Location,
    private scanService: ScanService,
    private sanitizer: DomSanitizer,
    private alertService: AlertService,
    private ngOpenCVService: NgOpenCVService
  ) { }

  @ViewChild('examCanvas',{static:false})
  examCanvas: ElementRef;
  @ViewChild('templateCanvas',{static:false})
  templateCanvas: ElementRef;
  @ViewChild('examInput',{static:false})
  examInput: ElementRef;
  @ViewChild('templateInput',{static:false})
  templateInput: ElementRef;
  @ViewChild('canvasOutput',{static:false})
  canvasOutput: ElementRef;

  result: File;
  result2: any;
  doneEditing: boolean = false;
  templateUrl = 'assets/domain/pattern_empty.jpg';
  examUrl = 'assets/domain/test.jpg';
  @Output() resolvedAnswer = new EventEmitter<ReolvedExamScan>();
  private classifiersLoaded = new BehaviorSubject<boolean>(false);
  classifiersLoaded$ = this.classifiersLoaded.asObservable();
  ngOnInit() {
    this.ngOpenCVService.isReady$
      .pipe(
        // The OpenCV library has been successfully loaded if result.ready === true
        filter((result: OpenCVLoadResult) => result.ready)
      )
      .subscribe(() => {
        // The classifiers have been succesfully loaded
        this.classifiersLoaded.next(true);
      });
  }
  ngAfterViewInit(): void {
    // Here we just load our example image to the canvas
    this.ngOpenCVService.isReady$
      .pipe(
        filter((result: OpenCVLoadResult) => result.ready),
        tap((result: OpenCVLoadResult) => {
          this.ngOpenCVService.loadImageToHTMLCanvas(this.examUrl, this.examCanvas.nativeElement).subscribe();
          this.ngOpenCVService.loadImageToHTMLCanvas(this.templateUrl, this.templateCanvas.nativeElement).subscribe();
        })
      )
      .subscribe(() => {});
  }

  goBack(): void {
    this.location.back();
  }
  // handleExamPic(file: File) {
  //   this.exam = file;
  // }
  // handleTemplatePic(file: File) {
  //   this.template = file;
  // }
  showResult(result) {
    this.result=result;
  }
  showResult2(result) {
    this.result2=result;
    cv.imshow(this.canvasOutput.nativeElement.id, this.result2);
  }
  // scanExam() {
  //   this.scanService.scanExam(this.exam, this.template)
  //     .subscribe(
  //       (result) => this.showResult(result)
  //       );
  // }
  scanExam2() {
    this.ngOpenCVService.isReady$
      .pipe(
        filter((result: OpenCVLoadResult) => result.ready),
        switchMap(() => {
          return this.classifiersLoaded$;
        }),
        tap(() => {
          this.clearOutputCanvas();
          this.scanService.scanExam2(this.examCanvas.nativeElement.id, this.templateCanvas.nativeElement.id)
          .subscribe((result) => {
            this.showResult2(result);
            console.log('Exam scanned');
          });;
        })
      )
      .subscribe(() => {
        console.log('Scanning exam');
      });
    // this.scanService.scanExam2(this.exam, this.template)
    //   .subscribe(
    //     (result) => this.showResult2(result)
    //     );
  }
  clearOutputCanvas() {
    const context = this.canvasOutput.nativeElement.getContext('2d');
    context.clearRect(0, 0, this.canvasOutput.nativeElement.width, this.canvasOutput.nativeElement.height);
  }
  edit() {
    this.alertService.success("Done editing!");
    this.doneEditing = true;
    this.resolvedAnswer.emit(new ReolvedExamScan([],0));
  }
  // foo() {
  //   this.scanService.foo(this.exam, this.template)
  //     .subscribe(
  //       (result) => this.showResult(result)
  //       );
  // }
  readDataUrlExam(event) {
    if (event.target.files.length) {
      return this.readDataUrl(event , this.examCanvas);    
    }  
  }
  readDataUrlTemplate(event) {
    if (event.target.files.length) {
      return this.readDataUrl(event , this.templateCanvas);    
    }  
  }
  readDataUrl(event, canvas) {
    if (event.target.files.length) {
      const reader = new FileReader();
      const load$ = fromEvent(reader, 'load');
      load$
        .pipe(
          switchMap(() => {
            return this.ngOpenCVService.loadImageToHTMLCanvas(`${reader.result}`, canvas.nativeElement);
          })
        )
        .subscribe(
          () => {},
          err => {
            console.log('Error loading image', err);
          }
        );
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}

export class ReolvedExamScan{
  anwers:number[];
  version:number;
  constructor(answers: number[], version :number){
    this.anwers=answers;
    this.version= version
  }
}
