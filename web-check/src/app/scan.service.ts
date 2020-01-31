import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScanService {

  constructor() { }
  matchTemplate (exam: File, template: File): Observable<File> {

    return new Observable(
      subscriber => {
        subscriber.next(require("./tmp_files/pic_0.jpg"));
      }
    );
  }
}
