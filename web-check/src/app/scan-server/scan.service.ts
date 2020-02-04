import { Injectable } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import { Scanner } from './domain/scanner';
import { ExamScanResult } from './domain/exam-scan-result';
declare var require: any

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  constructor() { }
  scanner: Scanner = new Scanner();
  scanExam (exam: File, template: File): Observable<ExamScanResultOutputFormat> {
    return new Observable(
      subscriber =>{
        const result : ExamScanResult = this.scanner.matchTemplate(exam, template);
        return subscriber.next(
          makeExamScanResultOutputFormat([])
        );
      }
    );
  }
  scanExamineeID (pic: File): Observable<string> {
    return new Observable(
      subscriber =>{
        subscriber.next("496351");
      }
    );
  }
  foo (exam: File, template: File): Observable<File> {
    return new Observable(
      subscriber =>{
        return subscriber.next(
          require('./assets/test/pic_0.jpg')
        );
      }
    );
  }
}

export interface ExamScanResultOutputFormat{
  answers:AnswerOutputFormat[],
}
export const makeExamScanResultOutputFormat =
 (anwers:  AnswerOutputFormat[]): ExamScanResultOutputFormat => ({answers:anwers});

export interface AnswerOutputFormat{
  key:number,
  choice: number,
  rectangle: RectangleOutputFormat
}
export interface RectangleOutputFormat{
  upperLeft: PointFormat,
  bottomRight: PointFormat,
}

export interface PointFormat{
  x: number,  
  y: number
}

