import { TestBed } from '@angular/core/testing';

import { UserReportingService } from './user-reporting.service';

describe('UserReportingService', () => {
  let service: UserReportingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserReportingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
