import {Answer} from './answer';
export class ExamScanResult {
    constructor(answers: Answer[]){
        this.answers=answers
    }
    answers: Answer[]
}