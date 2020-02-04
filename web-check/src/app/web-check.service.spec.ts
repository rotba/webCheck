import { TestBed } from '@angular/core/testing';

import { WebCheckService } from './web-check.service';

describe('WebCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebCheckService = TestBed.get(WebCheckService);
    expect(service).toBeTruthy();
  });
});
