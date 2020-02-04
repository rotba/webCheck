import { ExamScanResult } from './exam-scan-result';
export class Scanner {
    matchTemplate(exam: File, template: File) : ExamScanResult {
        return new ExamScanResult([]);
      }
}
