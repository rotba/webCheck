import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Location} from '@angular/common';
import {ScanService} from '../scan-server/scan.service';
import { Observable} from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from '../alert';

@Component({
  selector: 'app-scan-exam',
  templateUrl: './scan-exam.component.html',
  styleUrls: ['./scan-exam.component.css']
})

export class ScanExamComponent implements OnInit {
  constructor(
    private location: Location,
    private scanService: ScanService,
    private sanitizer: DomSanitizer,
    private alertService: AlertService
  ) { }

  exam: File;
  template: File;
  result: File;
  doneEditing: boolean = false;
  @Output() resolvedAnswer = new EventEmitter<ReolvedExamScan>();

  ngOnInit() {
  }
  goBack(): void {
    this.location.back();
  }
  handleExamPic(file: File) {
    this.exam = file;
  }
  handleTemplatePic(file: File) {
    this.template = file;
  }
  showResult(result) {
    this.result=result;
  }
  scanExam() {
    this.scanService.scanExam(this.exam, this.template)
      .subscribe(
        (result) => this.showResult(result)
        );
  }
  edit() {
    this.alertService.success("Done editing!");
    this.doneEditing = true;
    this.resolvedAnswer.emit(new ReolvedExamScan([],0));
  }
  foo() {
    this.scanService.foo(this.exam, this.template)
      .subscribe(
        (result) => this.showResult(result)
        );
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
