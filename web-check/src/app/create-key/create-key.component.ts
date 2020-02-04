import { Component, OnInit } from '@angular/core';
import {ReolvedExamScan} from '../scan-exam/scan-exam.component';
import {WebCheckService} from '../web-check.service';
import {AlertService} from '../alert'

@Component({
  selector: 'app-create-key',
  templateUrl: './create-key.component.html',
  styleUrls: ['./create-key.component.css']
})
export class CreateKeyComponent implements OnInit {

  constructor(
    private webCheckService: WebCheckService,
    private alertService: AlertService
    ) { }
  ngOnInit() {
  }
  resolvedExamScan :ReolvedExamScan;
  onExamScanResolved(result: ReolvedExamScan) {
    this.resolvedExamScan = result
  }

  save(result: ReolvedExamScan) {
    this.resolvedExamScan = result;
    this.webCheckService.addExam(this.resolvedExamScan.anwers, this.resolvedExamScan.version).subscribe(
      success=>{
        if(success){
          this.alertService.success("Exam Saved!")
        }else{
          this.alertService.error("Fail Saving :-(")
        }
      }
    )
  }
}
