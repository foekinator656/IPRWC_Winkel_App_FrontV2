import { TestBed } from '@angular/core/testing';

import { OrderReportingService } from './order-reporting.service';

describe('OrdersService', () => {
  let service: OrderReportingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderReportingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
