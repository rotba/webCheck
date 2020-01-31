import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';
import {ScanService} from '../scan.service';
import { Observable} from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  constructor(
    private location: Location,
    private scanService: ScanService,
    private sanitizer: DomSanitizer
  ) { }

  @Input() exam: File;
  @Input() template: File;
  result: File;

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
  matchTemplate() {
    this.scanService.matchTemplate(this.exam, this.template)
      .subscribe(
        (result) => this.showResult(result)
        );
  }
}
