import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanExamComponent } from './scan-exam.component';

describe('ScanExamComponent', () => {
  let component: ScanExamComponent;
  let fixture: ComponentFixture<ScanExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
