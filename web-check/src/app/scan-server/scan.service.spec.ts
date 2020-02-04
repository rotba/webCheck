import { TestBed } from '@angular/core/testing';
import { ScanService, ExamScanResultOutputFormat, makeExamScanResultOutputFormat} from './scan.service';
// import {rightAnswers as rightAnswers1} from './assets/test/scan.service/scanExam/test_case_png/expected-output';
// import {rightAnswers as rightAnswers2} from './assets/test/scan.service/scanExam/test_case_pdf/expected-output';
// import {rightAnswers as rightAnswers3} from './assets/test/scan.service/scanExam/test_case_student/expected-output';

declare var require: any
describe('ScanService scanExam', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  const testScanExam = function(exam : File, template: File, expected: number[]):void {
    const service: ScanService = TestBed.get(ScanService);
    service.scanExam(exam, template).subscribe(
      result =>{
        expect(result.answers.map(x=>x.choice)).toEqual(expected);
      });
    }

  it('should be created', () => {
    const service: ScanService = TestBed.get(ScanService);
    expect(service).toBeTruthy();
  });

  // it('should extract right answers given jpg', () => {
  //   testScanExam(
  //     require('./assets/test/scan.service/scanExam/test_case_png/exam.jpg'),
  //     require('./assets/test/scan.service/scanExam/test_case_png/template.jpg'),
  //     []
  //     // rightAnswers1
  //     );
  // });

  // it('should extract right answers given pdf', () => {
  //   testScanExam(
  //     require('./assets/test/scan.service/scanExam/test_case_pdf/exam.pdf'),
  //     require('./assets/test/scan.service/scanExam/test_case_pdf/template.jpg'),
  //     []
  //     // rightAnswers2
  //     );
  // });

  // it('should extract right answers student jpg', () => {
  //   testScanExam(
  //     require('./assets/test/scan.service/scanExam/test_case_student/exam.jpg'),
  //     require('./assets/test/scan.service/scanExam/test_case_student/template.jpg'),
  //     []
  //     // rightAnswers3
  //     );
  // });
});

describe('ScanService scanExamineeID', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  const testScanStudentID = function(pic : File, expected: string):void {
    const service: ScanService = TestBed.get(ScanService);
    service.scanExamineeID(pic).subscribe(
      result =>{
        expect(result).toEqual(expected);
      });
    }

  // it('should extract right student id given jpg', () => {
  //   const expected = "496351";
  //   testScanStudentID(
  //     require('./assets/test/scan.service/scanStudentID/test_case_png/exam.jpg'),
  //     expected
  //     );
  // });
});
